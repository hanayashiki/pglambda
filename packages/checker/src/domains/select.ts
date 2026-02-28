import { Target_labelContext, type Simple_selectContext } from "@pglambda/antlr";
import type { Type } from "@pglambda/types";
import { ctx } from "./ctx.js";
import { checkAExpr } from "./a_expr.js";

export function checkSimpleSelect(c: Simple_selectContext): Type {
  return ctx.getOrInsert(c.contentHash, () => {
    const fields: Record<string, Type> = {};

    for (const targetEl of c.target_list().target_el_list()) {
      if (targetEl instanceof Target_labelContext) {
        const exprType = checkAExpr(targetEl.a_expr());

        const alias = targetEl.colLabel() ?? targetEl.colid();
        if (!alias) {
          ctx.addError("Target expression requires an alias");
          continue;
        }

        const aliasName = alias.getText();
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
