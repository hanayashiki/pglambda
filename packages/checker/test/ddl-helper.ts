import { parseContent, AstStore } from "@pglambda/parser";
import type { FileUri } from "@pglambda/utils";
import { TypeStore } from "@pglambda/types";
import { lowerAndResolve, type TableDefinition } from "@pglambda/hir";
import { CheckContext } from "../src/index.js";

/**
 * Parse a .pgl source with database blocks, type-check, and return a snapshot
 * string listing each table's resolved row type.
 */
export function checkDdlAndSnapshot(
  source: string,
  filename = "test.pgl",
): string {
  const astStore = new AstStore();
  const store = new TypeStore();
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

  const { module, store: hirStore } = lowerAndResolve(
    parseResult.parseTree!,
    uri,
  );

  const ctx = new CheckContext(module, hirStore, store);
  const result = ctx.check();

  const lines: string[] = [];

  for (const [defId, type] of result.tableTypes) {
    const def = hirStore.getDefinition(defId);
    const name = def && def.tag === "table" ? (def as TableDefinition).name : `<unknown:${defId}>`;
    lines.push(`${name}: ${store.typeToString(type)}`);
  }

  if (result.errors.length > 0) {
    lines.push("");
    for (const err of result.errors) {
      lines.push(`error: ${err.message}`);
    }
  }

  return lines.join("\n") + "\n";
}
