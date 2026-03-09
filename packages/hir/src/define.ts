import type {
  HirStore,
  DefinitionId,
  ScopeId,
  Definition,
  QueryDefinition,
  TypeParamDefinition,
  QueryParamDefinition,
  TableDefinition,
  TableColumnDef,
} from "./store.js";
import type { Module, Def, QueryDef, DatabaseDef, HirId } from "./types.js";

/**
 * Extract definitions and build scopes from a lowered HIR Module.
 * Populates store.defs and store.scopes. Must be called before resolve().
 */
export function define(module: Module, store: HirStore): void {
  const scopeStack: ScopeId[] = [];

  pushScope(store, scopeStack, module.id as ScopeId);

  for (const def of module.data.defs) {
    defineDef(def, store, scopeStack);
  }

  scopeStack.pop();
}

function defineDef(def: Def, store: HirStore, scopeStack: ScopeId[]): void {
  switch (def.tag) {
    case "query":
      defineQueryDef(def, store, scopeStack);
      break;
    case "database":
      defineDatabaseDef(def, store, scopeStack);
      break;
  }
}

function defineQueryDef(q: QueryDef, store: HirStore, scopeStack: ScopeId[]): void {
  const typeParams: TypeParamDefinition[] = [];
  const params: QueryParamDefinition[] = [];

  // Build and register QueryDefinition
  const queryDef: QueryDefinition = {
    id: q.id as DefinitionId,
    tag: "query",
    name: q.data.name.data.text,
    typeParams,
    params,
    bodyNode: q.data.body.id,
    returnTypeNode: null,
  };
  store.addDefinition(queryDef);
  addToScope(store, scopeStack, queryDef);

  // Push query scope
  pushScope(store, scopeStack, q.id as ScopeId);

  // Extract type params
  for (const tp of q.data.typeParams) {
    const def: TypeParamDefinition = {
      id: tp.id as DefinitionId,
      tag: "typeParam",
      name: tp.data.text,
    };
    typeParams.push(def);
    store.addDefinition(def);
    addToScope(store, scopeStack, def);
  }

  // Extract query params
  for (const p of q.data.params) {
    const def: QueryParamDefinition = {
      id: p.id as DefinitionId,
      tag: "queryParam",
      name: p.data.name.data.text,
      annotationNode: (p.data.typeAnnotation?.id ?? null) as HirId | null,
    };
    params.push(def);
    store.addDefinition(def);
    addToScope(store, scopeStack, def);
  }

  scopeStack.pop();
}

function defineDatabaseDef(db: DatabaseDef, store: HirStore, scopeStack: ScopeId[]): void {
  for (const stmt of db.data.statements) {
    const tableName = stmt.data.name.data.parts.map((p) => p.data.text).join(".");
    const columns: TableColumnDef[] = stmt.data.columns.map((col) => ({
      name: col.data.name.data.text,
      simpleType: col.data.typeName.data.simpleType,
      notNull: col.data.constraints.notNull || col.data.constraints.primaryKey,
      arrayDimensions: col.data.typeName.data.arrayDimensions,
    }));
    const tableDef: TableDefinition = {
      id: stmt.id as DefinitionId,
      tag: "table",
      name: tableName,
      columns,
    };
    store.addDefinition(tableDef);
    addToScope(store, scopeStack, tableDef);
  }
}

// --- Helpers ---

function pushScope(store: HirStore, scopeStack: ScopeId[], id: ScopeId): void {
  const parent = scopeStack.length > 0 ? scopeStack[scopeStack.length - 1] : null;
  scopeStack.push(id);
  store.addScope(id, {
    parent,
    typeDefinitions: new Map(),
    valueDefinitions: new Map(),
  });
}

function addToScope(store: HirStore, scopeStack: ScopeId[], def: Definition): void {
  const currentId = scopeStack[scopeStack.length - 1];
  const scope = store.getScope(currentId)!;
  const ns = def.tag === "typeParam" ? scope.typeDefinitions : scope.valueDefinitions;
  ns.set(def.name, def.id);
}
