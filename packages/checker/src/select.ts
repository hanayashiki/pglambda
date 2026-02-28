import type { SelectStmt, FromClause } from "@pglambda/hir";
import type { Type } from "@pglambda/types";
import { ctx } from "./ctx.js";
import { checkExpr } from "./expr.js";

export function checkSelect(s: SelectStmt): Type {
  return ctx.getOrInsert(s.id, () => {
    // Phase 1: Resolve FROM clause — validates table refs, builds scope for future column resolution
    if (s.data.from) resolveFromScope(s.data.from);

    // Phase 2: Process SELECT targets
    const fields: Record<string, Type> = {};

    for (const target of s.data.targets) {
      if (target.tag === "targetExpr") {
        const exprType = checkExpr(target.data.expr);
        const aliasName = target.data.alias.data.text;

        if (aliasName in fields) {
          ctx.addError(`Duplicate column alias: ${aliasName}`);
          continue;
        }

        const fieldType = ctx.typeStore.typevar();
        ctx.addEquality({ t1: fieldType, t2: exprType });
        fields[aliasName] = fieldType;
      } else {
        ctx.addError("SELECT * is not supported yet (no FROM scope)");
      }
    }

    return ctx.setOf(ctx.typeStore.record(fields));
  });
}

/**
 * Resolve FROM clause table references to their row types.
 * Returns a map of alias → row type for future column resolution.
 */
function resolveFromScope(from: FromClause): Map<string, Type> {
  const fromScope = new Map<string, Type>();

  for (const ref of from.data.refs) {
    const defId = ctx.hirStore.getResolution(ref.data.name.id);
    if (!defId) {
      const tableName = ref.data.name.data.parts
        .map((p) => p.data.text)
        .join(".");
      ctx.addError(`Unknown table "${tableName}"`);
      continue;
    }

    const tableType = ctx.getTableType(defId);
    if (!tableType) {
      const tableName = ref.data.name.data.parts
        .map((p) => p.data.text)
        .join(".");
      ctx.addError(`"${tableName}" is not a table`);
      continue;
    }

    const tableName =
      ref.data.alias?.data.text ?? ref.data.name.data.parts.at(-1)!.data.text;

    if (fromScope.has(tableName)) {
      ctx.addError(`Duplicate table alias "${tableName}" in FROM clause`);
      continue;
    }

    fromScope.set(tableName, tableType);
  }

  return fromScope;
}
