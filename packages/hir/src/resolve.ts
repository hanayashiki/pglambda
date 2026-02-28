import type { HirStore, DefinitionId, ScopeId, TableDefinition } from "./store.js";
import type { Module, Def, QueryDef, QueryBody, Expr, SelectTarget, FromClause, TypeExpr } from "./types.js";

// --- Column scope for resolving column references within SELECT ---

type ColumnScope = {
  /** column name → table DefinitionIds that contain it (>1 means ambiguous) */
  columns: Map<string, DefinitionId[]>;
  /** table alias → table DefinitionId */
  tables: Map<string, DefinitionId>;
};

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
    case "selectBody": {
      const stmt = body.data.stmt;
      // Resolve FROM table refs first
      if (stmt.data.from) {
        resolveFromClause(stmt.data.from, store, scopeId);
      }
      // Build column scope from resolved FROM tables
      const columnScope = stmt.data.from
        ? buildColumnScope(stmt.data.from, store)
        : null;
      // Resolve targets and WHERE with column scope
      for (const t of stmt.data.targets) {
        resolveTarget(t, store, scopeId, columnScope);
      }
      if (stmt.data.where) {
        resolveExpr(stmt.data.where, store, scopeId, columnScope);
      }
      break;
    }
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

function buildColumnScope(from: FromClause, store: HirStore): ColumnScope {
  const columns = new Map<string, DefinitionId[]>();
  const tables = new Map<string, DefinitionId>();

  for (const ref of from.data.refs) {
    const defId = store.getResolution(ref.data.name.id);
    if (!defId) continue;

    const def = store.getDefinition(defId);
    if (!def || def.tag !== "table") continue;

    const tableDef = def as TableDefinition;
    const alias = ref.data.alias?.data.text
      ?? ref.data.name.data.parts.at(-1)!.data.text;
    tables.set(alias, defId);

    for (const col of tableDef.columns) {
      const existing = columns.get(col.name) ?? [];
      existing.push(defId);
      columns.set(col.name, existing);
    }
  }

  return { columns, tables };
}

function resolveColumnRef(expr: Expr & { tag: "columnRef" }, store: HirStore, scope: ColumnScope): void {
  const parts = expr.data.name.data.parts;

  if (parts.length === 1) {
    // Bare column: `id` — search all FROM tables
    const colName = parts[0].data.text;
    const tableDefs = scope.columns.get(colName);
    if (!tableDefs || tableDefs.length === 0) return; // unresolved — checker will report
    if (tableDefs.length > 1) return; // ambiguous — checker will report
    store.addResolution(expr.data.name.id, tableDefs[0]);
  } else if (parts.length === 2) {
    // Qualified: `alias.column` — look up table by alias
    const tableAlias = parts[0].data.text;
    const defId = scope.tables.get(tableAlias);
    if (defId) {
      store.addResolution(expr.data.name.id, defId);
    }
  }
  // 3+ parts: schema.table.column is valid PostgreSQL but deferred
}

function resolveTarget(t: SelectTarget, store: HirStore, scopeId: ScopeId, columnScope: ColumnScope | null = null): void {
  switch (t.tag) {
    case "targetExpr":
      resolveExpr(t.data.expr, store, scopeId, columnScope);
      break;
    case "targetStar":
      break;
  }
}

function resolveExpr(expr: Expr, store: HirStore, scopeId: ScopeId, columnScope: ColumnScope | null = null): void {
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
        resolveExpr(arg, store, scopeId, columnScope);
      }
      break;
    }
    case "binOp":
      resolveExpr(expr.data.left, store, scopeId, columnScope);
      resolveExpr(expr.data.right, store, scopeId, columnScope);
      break;
    case "unaryOp":
      resolveExpr(expr.data.operand, store, scopeId, columnScope);
      break;
    case "paren":
      resolveExpr(expr.data.inner, store, scopeId, columnScope);
      break;
    case "literal":
      break;
    case "columnRef":
      if (columnScope) {
        resolveColumnRef(expr, store, columnScope);
      }
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
