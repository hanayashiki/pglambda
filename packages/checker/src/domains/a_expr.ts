import type {
  A_exprContext,
  A_expr_addContext,
  A_expr_andContext,
  A_expr_betweenContext,
  A_expr_compareContext,
  A_expr_inContext,
  A_expr_is_notContext,
  A_expr_isnullContext,
  A_expr_likeContext,
  A_expr_mulContext,
  A_expr_orContext,
  A_expr_unaryContext,
  A_expr_unary_notContext,
  AexprconstContext,
  C_exprContext,
  ParserRuleContext,
} from "@pglambda/antlr";
import type { Type } from "@pglambda/types";
import { ctx } from "./ctx.js";
import { checkPglExpr } from "./pgl.js";
import { checkColumnref } from "./columnref.js";

function binaryOrPassthrough<T extends ParserRuleContext>(
  children: T[],
  visitChild: (c: T) => Type,
  errorMsg: string,
): Type {
  if (children.length === 1) {
    return visitChild(children[0]);
  }
  return ctx.typeStore.error(errorMsg);
}

// --- expression chain ---

export function checkAExpr(c: A_exprContext): Type {
  return checkAExprOr(c.a_expr_or());
}

export function checkAExprOr(c: A_expr_orContext): Type {
  return binaryOrPassthrough(
    c.a_expr_and_list(),
    checkAExprAnd,
    "OR expressions not supported yet",
  );
}

export function checkAExprAnd(c: A_expr_andContext): Type {
  return binaryOrPassthrough(
    c.a_expr_between_list(),
    checkAExprBetween,
    "AND expressions not supported yet",
  );
}

export function checkAExprBetween(c: A_expr_betweenContext): Type {
  if (c.KW_BETWEEN()) {
    return ctx.typeStore.error("BETWEEN expressions not supported yet");
  }
  return checkAExprIn(c.a_expr_in(0));
}

export function checkAExprIn(c: A_expr_inContext): Type {
  if (c.KW_IN()) {
    return ctx.typeStore.error("IN expressions not supported yet");
  }
  return checkAExprUnaryNot(c.a_expr_unary_not());
}

export function checkAExprUnaryNot(c: A_expr_unary_notContext): Type {
  if (c.KW_NOT()) {
    return ctx.typeStore.error("NOT expressions not supported yet");
  }
  return checkAExprIsnull(c.a_expr_isnull());
}

export function checkAExprIsnull(c: A_expr_isnullContext): Type {
  if (c.KW_IS()) {
    return ctx.typeStore.error("IS NULL expressions not supported yet");
  }
  return checkAExprIsNot(c.a_expr_is_not());
}

export function checkAExprIsNot(c: A_expr_is_notContext): Type {
  if (c.KW_IS()) {
    return ctx.typeStore.error("IS NOT expressions not supported yet");
  }
  return checkAExprCompare(c.a_expr_compare());
}

export function checkAExprCompare(c: A_expr_compareContext): Type {
  return binaryOrPassthrough(
    c.a_expr_like_list(),
    checkAExprLike,
    "Comparison expressions not supported yet",
  );
}

export function checkAExprLike(c: A_expr_likeContext): Type {
  return binaryOrPassthrough(
    c.a_expr_add_list(),
    checkAExprAdd,
    "LIKE expressions not supported yet",
  );
}

export function checkAExprAdd(c: A_expr_addContext): Type {
  return binaryOrPassthrough(
    c.a_expr_mul_list(),
    checkAExprMul,
    "Arithmetic expressions not supported yet",
  );
}

export function checkAExprMul(c: A_expr_mulContext): Type {
  return binaryOrPassthrough(
    c.a_expr_unary_list(),
    checkAExprUnary,
    "Multiplication expressions not supported yet",
  );
}

export function checkAExprUnary(c: A_expr_unaryContext): Type {
  if (c.PLUS() || c.MINUS()) {
    return ctx.typeStore.error("Unary +/- expressions not supported yet");
  }
  return checkCExpr(c.c_expr());
}

// --- atomic expressions ---

export function checkCExpr(c: C_exprContext): Type {
  if (c.pgl_expr()) return checkPglExpr(c.pgl_expr());
  if (c.columnref_or_pgl_dollar_ident_ref())
    return checkColumnref(c.columnref_or_pgl_dollar_ident_ref());
  if (c.aexprconst()) return checkAExprConst(c.aexprconst());
  if (c.a_expr()) return checkAExpr(c.a_expr());
  return ctx.typeStore.error("Unknown c_expr");
}

export function checkAExprConst(c: AexprconstContext): Type {
  return ctx.getOrInsert(c.contentHash, () => {
    if (c.INTEGER_LITERAL()) return ctx.typeStore.primitive("int");
    if (c.NUMERIC_LITERAL()) return ctx.typeStore.primitive("numeric");
    if (c.STRING_LITERAL()) return ctx.typeStore.primitive("text");
    if (c.KW_TRUE() || c.KW_FALSE()) return ctx.typeStore.primitive("bool");
    if (c.KW_NULL()) return ctx.typeStore.nullable(ctx.typeStore.typevar());
    return ctx.typeStore.error("Unknown constant type");
  });
}
