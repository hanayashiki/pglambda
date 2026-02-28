import {
  Simple_select_bodyContext,
  Pgl_dollar_ident_ref_bodyContext,
  Pgl_expr_bodyContext,
  type Query_bodyContext,
  type Query_defContext,
  type Query_parameterContext,
} from "@pglambda/antlr";
import type { Type } from "@pglambda/types";
import { ctx, propagateToColid } from "./ctx.js";
import { checkTypeParameterList, resolveTypeExpression } from "./type_syntax.js";
import { checkSimpleSelect } from "./select.js";
import { checkColumnref } from "./columnref.js";
import { checkPglExpr } from "./pgl.js";

export function checkQueryDef(c: Query_defContext): Type {
  return ctx.getOrInsert(c.contentHash, () => {
    let schemeBodyTypeVar: Type | undefined;
    const typeParamList = c.type_parameter_list();
    if (typeParamList) {
      const schemeId = ctx.typeStore.schemes.freshId();
      schemeBodyTypeVar = checkTypeParameterList(typeParamList, schemeId);
      ctx.setDefScheme(c.contentHash, schemeId);
    }

    const paramNames: string[] = [];
    const paramTypes: Type[] = [];
    for (const param of c.query_parameter_list().query_parameter_list()) {
      const paramType = checkQueryParameter(param);
      paramNames.push(param.colid().getText());
      paramTypes.push(paramType);
    }

    const bodyType = checkQueryBody(c.query_body());

    const fnType = ctx.typeStore.fn(paramNames, paramTypes, bodyType);

    if (schemeBodyTypeVar) {
      ctx.addEquality({ t1: schemeBodyTypeVar, t2: fnType });
    }
    return fnType;
  });
}

function checkQueryParameter(c: Query_parameterContext): Type {
  return ctx.getOrInsert(c.contentHash, () => {
    const typeExpr = c.type_expression();
    const type = typeExpr ? resolveTypeExpression(typeExpr) : ctx.typeStore.typevar();
    propagateToColid(c.colid(), type);
    return type;
  });
}

function checkQueryBody(c: Query_bodyContext): Type {
  if (c instanceof Simple_select_bodyContext) {
    return checkSimpleSelect(c.simple_select());
  }
  if (c instanceof Pgl_expr_bodyContext) {
    return checkPglExpr(c.pgl_expr());
  }
  if (c instanceof Pgl_dollar_ident_ref_bodyContext) {
    return checkColumnref(c.columnref_or_pgl_dollar_ident_ref());
  }
  return ctx.typeStore.error("Unknown query body");
}
