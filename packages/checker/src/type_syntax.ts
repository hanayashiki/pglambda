import type { TypeExpr, QualifiedName, Name, HirId } from "@pglambda/hir";
import type { PrimitiveName, Type, TypeSchemeId } from "@pglambda/types";
import { ctx } from "./ctx.js";

export function resolveTypeExpr(te: TypeExpr): Type {
  return ctx.getOrInsert(te.id, () => {
    return resolveQualifiedTypeName(te.data.name);
  });
}

function resolveQualifiedTypeName(qn: QualifiedName): Type {
  return ctx.getOrInsert(qn.id, () => {
    const parts = qn.data.parts;
    if (parts.length !== 1) {
      return ctx.typeStore.error("Qualified type names not supported yet");
    }
    return resolveTypeName(parts[0]);
  });
}

function resolveTypeName(name: Name): Type {
  return ctx.getOrInsert(name.id, () => {
    const defId = ctx.hirStore.getResolution(name.id);
    if (defId !== undefined) {
      return ctx.getOrCreateTypeVar(defId as HirId);
    }
    return ctx.typeStore.primitive(name.data.text as PrimitiveName);
  });
}

export function checkTypeParams(typeParams: Name[], schemeId: TypeSchemeId): Type {
  const names = typeParams.map((tp) => tp.data.text);
  const bodyTypeVar = ctx.typeStore.typevar();
  ctx.typeStore.schemes.register({
    id: schemeId,
    name: "",
    parameters: names,
    body: bodyTypeVar,
  });
  for (let i = 0; i < typeParams.length; i++) {
    const paramType = ctx.typeStore.param(schemeId, i);
    ctx.getOrInsert(typeParams[i].id, () => paramType);
  }
  return bodyTypeVar;
}
