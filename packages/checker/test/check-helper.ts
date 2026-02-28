import { parseContent, AstStore } from "@pglambda/parser";
import { type FileUri, spanContains } from "@pglambda/utils";
import { TypeStore } from "@pglambda/types";
import {
  lowerAndResolve,
  hirChildren,
  type HirNode,
  type DefinitionId,
} from "@pglambda/hir";
import { CheckContext, type CheckResult } from "../src/index.js";
import type { Type } from "@pglambda/types";

// --- HIR node position lookup ---

/**
 * Find the deepest HIR node whose span contains (line, column).
 * Line is 1-based, column is 0-based.
 */
function findHirNodeAtPosition(
  root: HirNode,
  line: number,
  column: number,
): HirNode | null {
  if (!spanContains(root.span, line, column)) return null;

  // Check children for a deeper match
  for (const child of hirChildren(root)) {
    const deeper = findHirNodeAtPosition(child, line, column);
    if (deeper) return deeper;
  }

  return root;
}

/**
 * Parse a .pgl source, lower to HIR, type-check, and return a snapshot string
 * mapping each marker label to its resolved type.
 */
export function checkAndExtractMarkers(
  source: string,
  filename = "test.pgl",
): string {
  const astStore = new AstStore();
  const store = new TypeStore();
  const uri = `file:///${filename}` as FileUri;

  // 1. Parse
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

  // 2. Lower to HIR + define + resolve
  const { module, store: hirStore } = lowerAndResolve(
    parseResult.parseTree!,
    uri,
  );

  // 3. Type-check
  const ctx = new CheckContext(module, hirStore, store);
  const result = ctx.check();

  // 4. Resolve markers to HIR nodes and look up types
  const lines: string[] = [];

  const markerEntries = parseResult.markers.map((m) => {
    const node = findHirNodeAtPosition(module, m.line, m.column);
    const type = node ? result.nodeTypes.get(node.id) : undefined;
    const typeStr = type ? store.typeToString(type) : "<unresolved>";
    return { label: m.label, typeStr };
  });

  for (const { label, typeStr } of markerEntries) {
    lines.push(`${label}: ${typeStr}`);
  }

  if (result.exportedTypeSchemes.length > 0) {
    lines.push("");
    lines.push("schemes:");
    for (const scheme of result.exportedTypeSchemes) {
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

/**
 * Parse, lower, and type-check a module. Returns the result and store
 * for programmatic inspection (imports/exports testing).
 */
export function checkModule(
  source: string,
  filename = "test.pgl",
  imports?: ReadonlyMap<DefinitionId, Type>,
): { result: CheckResult; store: TypeStore } {
  const astStore = new AstStore();
  const store = new TypeStore();
  const uri = `file:///${filename}` as FileUri;

  const parseResult = parseContent(
    { content: source, uri, success: true },
    { astStore },
  );

  if (!parseResult.success) {
    throw new Error(
      `Parse failed: ${parseResult.errors.map((e) => e.message).join(", ")}`,
    );
  }

  const { module, store: hirStore } = lowerAndResolve(
    parseResult.parseTree!,
    uri,
  );
  const ctx = new CheckContext(module, hirStore, store, imports);
  const result = ctx.check();

  return { result, store };
}
