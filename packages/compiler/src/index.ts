import * as path from "node:path";
import { mkdir } from "node:fs/promises";
import { NodeVFS } from "@pglambda/vfs";
import { AstStore, formatParseTree } from "@pglambda/parser";
import { createTequilaDB } from "@pglambda/tequila";
import { pathToUri } from "./utils/uri.js";
import type { HostContext } from "./host/index.js";
import { type CompilerOptionsIn, defaultCompilerOptions } from "./options/index.js";
import { loadTextContent } from "./queries/inputs/text-content.js";
import { parseAST, parseASTSchema } from "./queries/ast/index.js";

export const main = async (optionsIn: CompilerOptionsIn, workspace: string) => {
  // todo: parse options from args
  const hostContext: HostContext = {
    options: {
      ...defaultCompilerOptions,
      outputOptions: {
        ...defaultCompilerOptions.outputOptions,
        ...optionsIn.outputOptions,
      },
    },
    vfs: new NodeVFS([workspace]),
    astStore: new AstStore(),
  };

  const db = createTequilaDB();

  // inputs
  db.defineInput(...loadTextContent(hostContext));

  // tracked queries
  db.defineTracked(...parseAST(hostContext));

  // discover .pgl files
  const { options, vfs } = hostContext;
  const filePaths = await vfs.glob(options.include, {
    cwd: workspace,
    exclude: options.exclude,
  });
  const pglFiles = filePaths.filter((f) => f.endsWith(".pgl"));

  if (pglFiles.length === 0) {
    console.error("No .pgl files found.");
    return;
  }

  // parse each file via the tequila pipeline
  const results = await Promise.all(
    pglFiles.map(async (filePath) => {
      const uri = pathToUri(filePath);
      const result = await db.get(parseASTSchema, uri);
      return { filePath, result };
    })
  );

  // report errors
  let hasErrors = false;
  for (const { filePath, result } of results) {
    if (!result.success) {
      hasErrors = true;
      for (const d of result.diagnostics) {
        console.error(
          `${filePath}:${d.span.start.line}:${d.span.start.column}: ${d.severity}: ${d.message}`
        );
      }
    }
  }

  // write AST output
  // FIXME: normalize output handling
  if (options.outputOptions.ast) {
    const distDir = path.resolve(workspace, "dist");

    for (const { filePath, result } of results) {
      if (result.parseTree) {
        const formatted = formatParseTree(result.parseTree);
        const relativePath = path.relative(workspace, filePath);
        const outputName = relativePath.replace(/\.pgl$/, ".ast");
        const outputPath = path.join(distDir, outputName);

        await mkdir(path.dirname(outputPath), { recursive: true });

        const writeResult = await vfs.writeFile(outputPath, formatted);
        if (writeResult.isErr()) {
          console.error(`Failed to write AST for ${filePath}: ${writeResult.error.type}`);
        }
      }
    }
  }

  if (hasErrors) {
    process.exitCode = 1;
  }
};
