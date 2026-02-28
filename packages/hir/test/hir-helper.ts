import { parseContent, AstStore } from "@pglambda/parser";
import type { FileUri } from "@pglambda/utils";
import { lowerToHir, printHir } from "../src/index.js";

/**
 * Parse PGL source, lower to HIR, and pretty-print.
 * Returns desugared source text for snapshot comparison.
 */
export function lowerAndPrint(source: string, filename = "test.pgl"): string {
  const astStore = new AstStore();
  const uri = `file:///${filename}` as FileUri;

  const parseResult = parseContent(
    { content: source, uri, success: true },
    { astStore },
  );

  if (!parseResult.success) {
    return (
      parseResult.errors.map((e) => `parse error: ${e.message}`).join("\n") +
      "\n"
    );
  }

  const { module } = lowerToHir(parseResult.parseTree!, uri);
  return printHir(module) + "\n";
}
