import type { AexprconstContext, Pgl_exprContext } from "@pglambda/antlr";
import type { Type } from "@pglambda/types";
import { ctx, propagateToColid } from "./ctx.js";

export function checkPglExpr(c: Pgl_exprContext): Type {
  if (c.pgl_query_call()) return checkPglQueryCall(c.pgl_query_call());
  if (c.pgl_ident_ref()) return checkPglIdentRef(c.pgl_ident_ref());
  if (c.aexprconst()) return checkPglAExprConst(c.aexprconst());
  return ctx.typeStore.error("Unknown pgl_expr");
}

function checkPglAExprConst(c: AexprconstContext): Type {
  return ctx.getOrInsert(c.contentHash, () => {
    if (c.INTEGER_LITERAL()) return ctx.typeStore.primitive("int");
    if (c.NUMERIC_LITERAL()) return ctx.typeStore.primitive("numeric");
    if (c.STRING_LITERAL()) return ctx.typeStore.primitive("text");
    if (c.KW_TRUE() || c.KW_FALSE()) return ctx.typeStore.primitive("bool");
    if (c.KW_NULL()) return ctx.typeStore.nullable(ctx.typeStore.typevar());
    return ctx.typeStore.error("Unknown constant type");
  });
}

function checkPglIdentRef(
  c: ReturnType<Pgl_exprContext["pgl_ident_ref"]>,
): Type {
  return ctx.getOrInsert(c.contentHash, () => {
    const qname = c.qualified_name();
    if (qname.indirection()) {
      throw new Error("Module-qualified references not implemented");
    }
    const colid = qname.colid();
    const defId = ctx.astStore.getResolution(colid.contentHash);
    if (!defId) return ctx.typeStore.error("Unresolved reference");
    const defType = ctx.getOrCreateTypeVar(defId);
    ctx.getOrInsert(qname.contentHash, () => defType);
    propagateToColid(colid, defType);
    return defType;
  });
}

function checkPglQueryCall(
  c: ReturnType<Pgl_exprContext["pgl_query_call"]>,
): Type {
  return ctx.getOrInsert(c.contentHash, () => {
    const qname = c.qualified_name();
    if (qname.indirection()) {
      return ctx.typeStore.error("Module-qualified calls not supported yet");
    }
    const colid = qname.colid();
    const defId = ctx.astStore.getResolution(colid.contentHash);
    if (!defId) return ctx.typeStore.error("Unresolved function call");

    const schemeId = ctx.getDefScheme(defId);
    let calledType: Type;
    if (schemeId !== undefined) {
      const scheme = ctx.typeStore.schemes.get(schemeId)!;
      calledType = ctx.instantiate(scheme);
    } else {
      calledType = ctx.getOrCreateTypeVar(defId);
    }

    const args = c.pgl_expr_list();
    const argTypes = args.map((arg) => checkPglExpr(arg));

    const resultTypeVar = ctx.typeStore.typevar();
    const paramNames = argTypes.map((_, i) => `$${i}`);
    const expectedFnType = ctx.typeStore.fn(
      paramNames,
      argTypes,
      resultTypeVar,
    );

    ctx.addEquality({ t1: calledType, t2: expectedFnType });
    return resultTypeVar;
  });
}
