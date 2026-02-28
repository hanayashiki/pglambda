import type { QueryDef, HirId } from "@pglambda/hir";
import type { Type } from "@pglambda/types";
import { ctx } from "./ctx.js";
import { resolveTypeExpr, checkTypeParams } from "./type_syntax.js";
import { checkSelect } from "./select.js";
import { checkExpr } from "./expr.js";

export function checkQueryDef(q: QueryDef): Type {
  return ctx.getOrInsert(q.id, () => {
    let schemeBodyTypeVar: Type | undefined;

    if (q.data.typeParams.length > 0) {
      const schemeId = ctx.typeStore.schemes.freshId();
      schemeBodyTypeVar = checkTypeParams(q.data.typeParams, schemeId);
      ctx.setDefScheme(q.id, schemeId);
    }

    const paramNames: string[] = [];
    const paramTypes: Type[] = [];

    for (const param of q.data.params) {
      const paramType = ctx.getOrInsert(param.id, () => {
        const type = param.data.typeAnnotation
          ? resolveTypeExpr(param.data.typeAnnotation)
          : ctx.typeStore.typevar();
        // Store type on the param name node too
        ctx.getOrInsert(param.data.name.id, () => type);
        return type;
      });
      paramNames.push(param.data.name.data.text);
      paramTypes.push(paramType);
    }

    const bodyType = checkBody(q);

    const fnType = ctx.typeStore.fn(paramNames, paramTypes, bodyType);

    if (schemeBodyTypeVar) {
      ctx.addEquality({ t1: schemeBodyTypeVar, t2: fnType });
    }
    return fnType;
  });
}

function checkBody(q: QueryDef): Type {
  const body = q.data.body;
  switch (body.tag) {
    case "selectBody":
      return checkSelect(body.data.stmt);
    case "pglExprBody":
      return checkExpr(body.data.expr);
    case "paramRefBody": {
      const defId = ctx.hirStore.getResolution(body.data.name.id);
      if (!defId) return ctx.typeStore.error("Unresolved parameter reference");
      const defType = ctx.getOrCreateTypeVar(defId as HirId);
      ctx.getOrInsert(body.data.name.id, () => defType);
      return defType;
    }
  }
}
