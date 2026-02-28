import type { HirId, SimpleTypeName } from "./types.js";

// --- Definitions (adapted from parser/definitions.ts) ---

export type DefinitionId = HirId;

export type TypeParamDefinition = {
  readonly id: DefinitionId;
  readonly tag: "typeParam";
  readonly name: string;
};

export type QueryParamDefinition = {
  readonly id: DefinitionId;
  readonly tag: "queryParam";
  readonly name: string;
  readonly annotationNode: HirId | null;
};

export type QueryDefinition = {
  readonly id: DefinitionId;
  readonly tag: "query";
  readonly name: string;
  readonly typeParams: TypeParamDefinition[];
  readonly params: QueryParamDefinition[];
  readonly bodyNode: HirId;
  readonly returnTypeNode: HirId | null;
};

export type TableColumnDef = {
  readonly name: string;
  readonly simpleType: SimpleTypeName;
  readonly notNull: boolean;
  readonly arrayDimensions: number;
};

export type TableDefinition = {
  readonly id: DefinitionId;
  readonly tag: "table";
  readonly name: string;
  readonly columns: TableColumnDef[];
};

export type Definition =
  | TypeParamDefinition
  | QueryParamDefinition
  | QueryDefinition
  | TableDefinition;

// --- Scopes ---

export type ScopeId = HirId;

export type Scope = {
  readonly parent: ScopeId | null;
  readonly typeDefinitions: Map<string, DefinitionId>;
  readonly valueDefinitions: Map<string, DefinitionId>;
};

// --- HirStore ---

export class HirStore {
  private nextId = 0;

  /** Allocate a fresh HirId */
  freshId(): HirId {
    return this.nextId++ as HirId;
  }

  // --- Definitions ---

  private readonly defs = new Map<DefinitionId, Definition>();
  private readonly scopes = new Map<ScopeId, Scope>();
  private readonly resolutions = new Map<HirId, DefinitionId>();

  addDefinition(def: Definition): void {
    this.defs.set(def.id, def);
  }

  getDefinition(id: DefinitionId): Definition | undefined {
    return this.defs.get(id);
  }

  addScope(id: ScopeId, scope: Scope): void {
    this.scopes.set(id, scope);
  }

  getScope(id: ScopeId): Scope | undefined {
    return this.scopes.get(id);
  }

  /** Name resolution: which definition does this Name's HirId refer to? */
  addResolution(nameId: HirId, defId: DefinitionId): void {
    this.resolutions.set(nameId, defId);
  }

  getResolution(nameId: HirId): DefinitionId | undefined {
    return this.resolutions.get(nameId);
  }
}
