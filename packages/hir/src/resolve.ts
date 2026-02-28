import type { HirStore, DefinitionId, ScopeId } from "./store.js";
import type { Module, Def, QueryDef, QueryBody, Expr, SelectTarget, FromClause, TypeExpr } from "./types.js";

/**
 * Resolve name references in the HIR tree to their definitions.
 * Must be called after define(). Populates store.resolutions.
 */
export function resolve(module: Module, store: HirStore): void {
  for (const def of module.data.defs) {
    resolveDef(def, store);
  }
}

function resolveDef(def: Def, store: HirStore): void {
  switch (def.tag) {
    case "query":
      resolveQueryDef(def, store);
      break;
    case "database":
      break;
  }
}

function resolveQueryDef(q: QueryDef, store: HirStore): void {
  const scopeId = q.id as ScopeId;

  // Resolve type annotations on params
  for (const p of q.data.params) {
    if (p.data.typeAnnotation) {
      resolveTypeExpr(p.data.typeAnnotation, store, scopeId);
    }
  }

  resolveBody(q.data.body, store, scopeId);
}

function resolveBody(body: QueryBody, store: HirStore, scopeId: ScopeId): void {
  switch (body.tag) {
    case "selectBody":
      if (body.data.stmt.data.from) {
        resolveFromClause(body.data.stmt.data.from, store, scopeId);
      }
      for (const t of body.data.stmt.data.targets) {
        resolveTarget(t, store, scopeId);
      }
      break;
    case "pglExprBody":
      resolveExpr(body.data.expr, store, scopeId);
      break;
    case "paramRefBody": {
      const name = stripDollar(body.data.name.data.text);
      const defId = lookupValue(store, scopeId, name);
      if (defId !== undefined) {
        store.addResolution(body.data.name.id, defId);
      }
      break;
    }
  }
}

function resolveFromClause(from: FromClause, store: HirStore, scopeId: ScopeId): void {
  for (const ref of from.data.refs) {
    const name = ref.data.name.data.parts.map(p => p.data.text).join(".");
    const defId = lookupValue(store, scopeId, name);
    if (defId !== undefined) {
      store.addResolution(ref.data.name.id, defId);
    }
  }
}

function resolveTarget(t: SelectTarget, store: HirStore, scopeId: ScopeId): void {
  switch (t.tag) {
    case "targetExpr":
      resolveExpr(t.data.expr, store, scopeId);
      break;
    case "targetStar":
      break;
  }
}

function resolveExpr(expr: Expr, store: HirStore, scopeId: ScopeId): void {
  switch (expr.tag) {
    case "paramRef": {
      const name = stripDollar(expr.data.name.data.text);
      const defId = lookupValue(store, scopeId, name);
      if (defId !== undefined) {
        store.addResolution(expr.data.name.id, defId);
      }
      break;
    }
    case "pglRef": {
      const parts = expr.data.name.data.parts;
      if (parts.length === 1) {
        const defId = lookupValue(store, scopeId, parts[0].data.text);
        if (defId !== undefined) {
          store.addResolution(parts[0].id, defId);
        }
      }
      break;
    }
    case "pglCall": {
      const parts = expr.data.name.data.parts;
      if (parts.length === 1) {
        const defId = lookupValue(store, scopeId, parts[0].data.text);
        if (defId !== undefined) {
          store.addResolution(parts[0].id, defId);
        }
      }
      for (const ta of expr.data.typeArgs) {
        resolveTypeExpr(ta, store, scopeId);
      }
      for (const arg of expr.data.args) {
        resolveExpr(arg, store, scopeId);
      }
      break;
    }
    case "binOp":
      resolveExpr(expr.data.left, store, scopeId);
      resolveExpr(expr.data.right, store, scopeId);
      break;
    case "unaryOp":
      resolveExpr(expr.data.operand, store, scopeId);
      break;
    case "paren":
      resolveExpr(expr.data.inner, store, scopeId);
      break;
    case "literal":
    case "columnRef":
      break;
  }
}

function resolveTypeExpr(te: TypeExpr, store: HirStore, scopeId: ScopeId): void {
  const parts = te.data.name.data.parts;
  if (parts.length === 1) {
    const defId = lookupType(store, scopeId, parts[0].data.text);
    if (defId !== undefined) {
      store.addResolution(parts[0].id, defId);
    }
  }
}

// --- Scope chain lookup ---

function lookupValue(store: HirStore, scopeId: ScopeId, name: string): DefinitionId | undefined {
  let current: ScopeId | null = scopeId;
  while (current !== null) {
    const scope = store.getScope(current);
    if (!scope) break;
    const defId = scope.valueDefinitions.get(name);
    if (defId !== undefined) return defId;
    current = scope.parent;
  }
  return undefined;
}

function lookupType(store: HirStore, scopeId: ScopeId, name: string): DefinitionId | undefined {
  let current: ScopeId | null = scopeId;
  while (current !== null) {
    const scope = store.getScope(current);
    if (!scope) break;
    const defId = scope.typeDefinitions.get(name);
    if (defId !== undefined) return defId;
    current = scope.parent;
  }
  return undefined;
}

function stripDollar(name: string): string {
  return name.startsWith("$") ? name.slice(1) : name;
}
