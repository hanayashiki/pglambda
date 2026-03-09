import {
  Unification,
  type Type,
  type TypeStore,
  type TypeConstructorId,
  type TypeScheme,
  type TypeSchemeId,
  type AppliedType,
} from "@pglambda/types";
import type {
  HirId,
  Module,
  QueryDef,
  DatabaseDef,
  HirStore,
  QueryDefinition,
  DefinitionId,
} from "@pglambda/hir";
import { runCheckWithContext } from "./ctx.js";
import { checkQueryDef } from "./query_def.js";
import { simpleTypeToPrimitive } from "./type-resolve.js";

type EqualityConstraint = { readonly t1: Type; readonly t2: Type };

export type CheckError = { message: string };

export type CheckResult = {
  /** Resolved types for all checked nodes (internal + exported) */
  readonly nodeTypes: ReadonlyMap<HirId, Type>;
  /** Exported types for top-level definitions, usable as imports by other modules */
  readonly exportedTypes: ReadonlyMap<DefinitionId, Type>;
  /** Resolved type schemes for generic definitions */
  readonly exportedTypeSchemes: readonly TypeScheme[];
  /** Resolved row types for tables from database blocks */
  readonly tableTypes: ReadonlyMap<DefinitionId, Type>;
  readonly errors: readonly CheckError[];
};

export class CheckContext {
  private readonly errors: CheckError[] = [];
  private readonly nodeToType = new Map<HirId, Type>();
  private readonly defToScheme = new Map<HirId, TypeSchemeId>();
  private readonly imports: ReadonlyMap<DefinitionId, Type>;

  private readonly tableTypes = new Map<DefinitionId, Type>();
  private constraints: EqualityConstraint[] = [];
  private unification: Unification;
  private readonly setOfCtorId: TypeConstructorId;

  constructor(
    private readonly module: Module,
    private readonly hir: HirStore,
    private readonly store: TypeStore,
    imports?: ReadonlyMap<DefinitionId, Type>
  ) {
    this.imports = imports ?? new Map();
    this.unification = new Unification(store);

    const setOfCtor = store.ctors.lookup("SetOf");
    if (!setOfCtor) {
      throw new Error("SetOf type constructor not registered");
    }
    this.setOfCtorId = setOfCtor.id;
  }

  get typeStore(): TypeStore {
    return this.store;
  }

  get hirStore(): HirStore {
    return this.hir;
  }

  addEquality(constraint: EqualityConstraint): void {
    this.constraints.push(constraint);
    this.unification.unify(constraint.t1, constraint.t2);
  }

  addError(message: string): void {
    this.errors.push({ message });
  }

  setDefScheme(defId: HirId, schemeId: TypeSchemeId): void {
    this.defToScheme.set(defId, schemeId);
  }

  getDefScheme(defId: HirId): TypeSchemeId | undefined {
    return this.defToScheme.get(defId);
  }

  instantiate(scheme: TypeScheme): Type {
    return this.store.instantiate(scheme, (t) => this.unification.resolve(t));
  }

  setOf(rowType: Type): AppliedType {
    return this.store.apply(this.setOfCtorId, [rowType]);
  }

  getTableType(defId: DefinitionId): Type | undefined {
    return this.tableTypes.get(defId);
  }

  /**
   * Get or lazily create a typevar placeholder for a definition.
   * Checks imports first (pre-solved types from other modules),
   * then local types, then creates a fresh typevar for forward references.
   */
  getOrCreateTypeVar(id: HirId): Type {
    const imported = this.imports.get(id as DefinitionId);
    if (imported) return imported;
    const existing = this.nodeToType.get(id);
    if (existing) return existing;
    const tv = this.store.typevar();
    this.nodeToType.set(id, tv);
    return tv;
  }

  getOrInsert(id: HirId, check: () => Type): Type {
    if (this.nodeToType.has(id)) {
      return this.nodeToType.get(id)!;
    }
    const t = check();
    this.nodeToType.set(id, t);
    return t;
  }

  check(): CheckResult {
    // Phase 1: Register tables from database blocks
    for (const def of this.module.data.defs) {
      if (def.tag === "database") this.registerDatabaseDef(def);
    }

    // Phase 2: Check queries
    const sortedDefs = this.partitionDefs();

    runCheckWithContext(this, () => {
      for (const def of sortedDefs) {
        checkQueryDef(def);
      }
    });

    const unificationResult = this.unification.getResult();

    // Resolve all internal types through substitution
    const nodeTypes = new Map<HirId, Type>();
    for (const [id, type] of this.nodeToType) {
      nodeTypes.set(id, this.unification.deepResolve(type));
    }

    // Build exported types for top-level definitions
    const exportedTypes = new Map<DefinitionId, Type>();
    for (const def of this.module.data.defs) {
      if (def.tag !== "query") continue;
      const resolved = nodeTypes.get(def.id);
      if (resolved) {
        exportedTypes.set(def.id as DefinitionId, resolved);
      }
    }

    // Resolve type scheme bodies
    const exportedTypeSchemes: TypeScheme[] = [];
    for (const scheme of this.store.schemes.values()) {
      exportedTypeSchemes.push({
        ...scheme,
        body: this.unification.deepResolve(scheme.body),
      });
    }

    return {
      nodeTypes,
      exportedTypes,
      exportedTypeSchemes,
      tableTypes: this.tableTypes,
      errors: [...this.errors, ...unificationResult.errors.map((e) => ({ message: e.message }))],
    };
  }

  private registerDatabaseDef(db: DatabaseDef): void {
    for (const stmt of db.data.statements) {
      const fields: Record<string, Type> = {};
      for (const col of stmt.data.columns) {
        const primName = simpleTypeToPrimitive(col.data.typeName.data.simpleType);
        if (!primName) {
          this.errors.push({ message: `Unsupported column type for "${col.data.name.data.text}"` });
          continue;
        }
        let type: Type = this.store.primitive(primName);
        for (let i = 0; i < col.data.typeName.data.arrayDimensions; i++) {
          type = this.store.array(type);
        }
        const isNotNull = col.data.constraints.notNull || col.data.constraints.primaryKey;
        if (!isNotNull) {
          type = this.store.nullable(type);
        }
        fields[col.data.name.data.text] = type;
      }
      this.tableTypes.set(stmt.id as DefinitionId, this.store.record(fields));
    }
  }

  private partitionDefs(): QueryDef[] {
    const genericDefs: QueryDef[] = [];
    const otherDefs: QueryDef[] = [];

    for (const def of this.module.data.defs) {
      if (def.tag !== "query") continue;
      const hirDef = this.hir.getDefinition(def.id as DefinitionId);
      if (hirDef && hirDef.tag === "query" && (hirDef as QueryDefinition).typeParams.length > 0) {
        genericDefs.push(def);
      } else {
        otherDefs.push(def);
      }
    }

    return [...genericDefs, ...otherDefs];
  }
}
