import type {
  Type_expressionContext,
  Type_parameter_listContext,
  Type_refContext,
} from "@pglambda/antlr";
import type { PrimitiveName, Type, TypeSchemeId } from "@pglambda/types";
import { ctx, propagateToColid } from "./ctx.js";

export function resolveTypeExpression(c: Type_expressionContext): Type {
  return resolveTypeRef(c.type_ref());
}

export function resolveTypeRef(c: Type_refContext): Type {
  return ctx.getOrInsert(c.contentHash, () => {
    const pglRef = c.pgl_ident_ref();
    const qname = pglRef.qualified_name();
    if (qname.indirection()) {
      return ctx.typeStore.error("Qualified type names not supported yet");
    }
    const colid = qname.colid();
    let type: Type;
    const defId = ctx.astStore.getResolution(colid.contentHash);
    if (defId) {
      type = ctx.getOrCreateTypeVar(defId);
    } else {
      type = ctx.typeStore.primitive(colid.getText() as PrimitiveName);
    }
    ctx.getOrInsert(pglRef.contentHash, () => type);
    ctx.getOrInsert(qname.contentHash, () => type);
    propagateToColid(colid, type);
    return type;
  });
}

export function checkTypeParameterList(
  c: Type_parameter_listContext,
  schemeId: TypeSchemeId,
): Type {
  const colids = c.colid_list();
  const names = colids.map((id) => id.getText());
  const bodyTypeVar = ctx.typeStore.typevar();
  ctx.typeStore.schemes.register({
    id: schemeId,
    name: "",
    parameters: names,
    body: bodyTypeVar,
  });
  for (let i = 0; i < colids.length; i++) {
    const paramType = ctx.typeStore.param(schemeId, i);
    propagateToColid(colids[i], paramType);
  }
  return bodyTypeVar;
}
