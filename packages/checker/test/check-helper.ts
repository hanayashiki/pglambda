import { parseContent, AstStore } from "@pglambda/parser";
import type { FileUri } from "@pglambda/utils";
import { TypeStore } from "@pglambda/types";
import { CheckContext } from "../src/check-context.js";
import type { SCCIn } from "../src/scc.js";

/**
 * Parse a .pgl source, type-check it, and return a snapshot string
 * mapping each marker label to its resolved type.
 */
export function checkAndExtractMarkers(source: string, filename = "test.pgl"): string {
  const astStore = new AstStore();
  const store = new TypeStore();

  // 1. Parse
  const parseResult = parseContent(
    { content: source, uri: `file:///${filename}` as FileUri, success: true },
    { astStore },
  );

  if (!parseResult.success) {
    return parseResult.errors.map((e) => `parse error: ${e.message}`).join("\n") + "\n";
  }

  const markers = parseResult.markers;

  // 2. Collect every node hash from the ast cache
  const allHashes = [...astStore];

  // 3. Build SCCIn with all nodes
  const sccIn: SCCIn = {
    nodes: allHashes,
    imports: new Map(),
    exportedNodes: allHashes,
  };

  const ctx = new CheckContext(sccIn, store, astStore);
  const result = ctx.check();

  // 4. Build snapshot lines
  const lines: string[] = [];

  const markerEntries = markers
    .filter((m) => m.node !== null)
    .map((m) => {
      const type = result.scc.exportedTypes.get(m.node!.contentHash);
      const typeStr = type ? store.typeToString(type) : "<unresolved>";
      return { label: m.label, typeStr };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  for (const { label, typeStr } of markerEntries) {
    lines.push(`${label}: ${typeStr}`);
  }

  if (result.scc.exportedTypeSchemes.length > 0) {
    lines.push("");
    lines.push("schemes:");
    for (const scheme of result.scc.exportedTypeSchemes) {
      lines.push(`  ${store.typeSchemeToString(scheme)}`);
    }
  }

  if (result.errors.length > 0) {
    lines.push("");
    for (const err of result.errors) {
      lines.push(`error: ${err.message}`);
    }
  }

  return lines.join("\n") + "\n";
}
