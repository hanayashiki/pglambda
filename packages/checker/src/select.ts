import type { SelectStmt } from "@pglambda/hir";
import type { Type } from "@pglambda/types";
import { ctx } from "./ctx.js";
import { checkExpr } from "./expr.js";

export function checkSelect(s: SelectStmt): Type {
  return ctx.getOrInsert(s.id, () => {
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
        ctx.addError("SELECT * is not supported yet (no schema)");
      }
    }

    return ctx.setOf(ctx.typeStore.record(fields));
  });
}
