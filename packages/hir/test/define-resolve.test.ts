import { describe, test, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { FileUri } from "@pglambda/utils";
import { parseContent, AstStore } from "@pglambda/parser";
import {
  lowerAndResolve,
  type QueryDef,
  type Expr,
  type QueryBody,
  type SelectTarget,
  type TypeExpr,
  type HirId,
  type HirStore,
  type QueryDefinition,
} from "../src/index.js";

/**
 * Parse, lower, define, resolve, then format definitions and resolutions
 * as a snapshot string.
 */
function defineAndFormat(source: string, filename = "test.pgl"): string {
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

  const { module, store } = lowerAndResolve(parseResult.parseTree!, uri);

  const lines: string[] = [];

  // === definitions ===
  lines.push("=== definitions ===");
  for (const def of module.data.defs) {
    if (def.tag === "query") {
      formatQueryDef(def, store, lines);
    }
  }

  // === resolutions ===
  const resolutions: string[] = [];
  for (const def of module.data.defs) {
    if (def.tag === "query") {
      collectResolutions(def, store, resolutions);
    }
  }

  if (resolutions.length > 0) {
    lines.push("");
    lines.push("=== resolutions ===");
    resolutions.sort();
    lines.push(...resolutions);
  }

  return lines.join("\n") + "\n";
}

function formatQueryDef(q: QueryDef, store: HirStore, lines: string[]): void {
  const qDef = store.getDefinition(q.id as any) as QueryDefinition;
  lines.push(`query(${qDef.name})`);
  for (const tp of qDef.typeParams) {
    lines.push(`  typeParam(${tp.name})`);
  }
  for (const p of qDef.params) {
    lines.push(`  queryParam(${p.name})`);
  }
}

function collectResolutions(q: QueryDef, store: HirStore, out: string[]): void {
  // Check param type annotations
  for (const p of q.data.params) {
    if (p.data.typeAnnotation) {
      collectTypeExprResolutions(p.data.typeAnnotation, store, out);
    }
  }
  collectBodyResolutions(q.data.body, store, out);
}

function collectBodyResolutions(body: QueryBody, store: HirStore, out: string[]): void {
  switch (body.tag) {
    case "selectBody":
      for (const t of body.data.stmt.data.targets) {
        collectTargetResolutions(t, store, out);
      }
      break;
    case "pglExprBody":
      collectExprResolutions(body.data.expr, store, out);
      break;
    case "paramRefBody":
      checkResolution(body.data.name.data.text, body.data.name.id, store, out);
      break;
  }
}

function collectTargetResolutions(t: SelectTarget, store: HirStore, out: string[]): void {
  if (t.tag === "targetExpr") {
    collectExprResolutions(t.data.expr, store, out);
  }
}

function collectExprResolutions(expr: Expr, store: HirStore, out: string[]): void {
  switch (expr.tag) {
    case "paramRef":
      checkResolution(expr.data.name.data.text, expr.data.name.id, store, out);
      break;
    case "pglRef":
      if (expr.data.name.data.parts.length === 1) {
        checkResolution(expr.data.name.data.parts[0].data.text, expr.data.name.data.parts[0].id, store, out);
      }
      break;
    case "pglCall":
      if (expr.data.name.data.parts.length === 1) {
        checkResolution(expr.data.name.data.parts[0].data.text, expr.data.name.data.parts[0].id, store, out);
      }
      for (const ta of expr.data.typeArgs) {
        collectTypeExprResolutions(ta, store, out);
      }
      for (const arg of expr.data.args) {
        collectExprResolutions(arg, store, out);
      }
      break;
    case "binOp":
      collectExprResolutions(expr.data.left, store, out);
      collectExprResolutions(expr.data.right, store, out);
      break;
    case "unaryOp":
      collectExprResolutions(expr.data.operand, store, out);
      break;
    case "paren":
      collectExprResolutions(expr.data.inner, store, out);
      break;
  }
}

function collectTypeExprResolutions(te: TypeExpr, store: HirStore, out: string[]): void {
  if (te.data.name.data.parts.length === 1) {
    checkResolution(te.data.name.data.parts[0].data.text, te.data.name.data.parts[0].id, store, out);
  }
}

function checkResolution(label: string, nameId: HirId, store: HirStore, out: string[]): void {
  const defId = store.getResolution(nameId);
  if (defId !== undefined) {
    const def = store.getDefinition(defId);
    if (def) {
      out.push(`${label} -> ${def.tag}(${def.name})`);
    }
  }
}

// --- Tests ---

describe("Define + Resolve Snapshot Tests", () => {
  const inputDir = join(
    dirname(fileURLToPath(import.meta.url)),
    "fixtures",
    "resolve",
  );
  const fixtures = readdirSync(inputDir)
    .filter((f) => f.endsWith(".pgl"))
    .sort();

  test.each(fixtures)("resolves %s", async (filename: string) => {
    const filepath = join(inputDir, filename);
    const input = readFileSync(filepath, "utf-8");

    const snapshot = defineAndFormat(input, filename);

    await expect(snapshot).toMatchFileSnapshot(
      `fixtures/resolve/${filename}.snap`,
    );
  });

  test("has fixture files", () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });
});
