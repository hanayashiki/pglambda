import type {
  ArrayType,
  NullableType,
  PrimitiveType,
  RecordType,
  SourceLocation,
  Type,
  TypeId,
} from "./type";
import type { TypeStore } from "./type-store";
import { typeToString } from "./utils";

type Binding = {
  type: Type;
  source: BindingSource;
};

type BindingSource =
  | { kind: "constraint"; constraintId: number; location: SourceLocation }
  | { kind: "schema"; table: string; column: string }
  | { kind: "annotation"; location: SourceLocation }
  | { kind: "unification"; of: [TypeId, TypeId] };

export type UnificationResult = {
  bindings: ReadonlyMap<TypeId, Type>;
  errors: readonly UnificationError[];
};

export type UnificationErrorKind =
  | "kind_mismatch"
  | "occurs_check"
  | "field_mismatch";

export type UnificationError = {
  errorKind: UnificationErrorKind;
  message: string;
  location?: SourceLocation;
};

export class Unification {
  private bindings = new Map<TypeId, Binding>();
  private errors: UnificationError[] = [];

  constructor(private readonly typeStore: TypeStore) {}

  /**
   * Follow substitution chains to the root type.
   * Returns either a concrete type or an unbound type variable.
   */
  resolve(type: Type): Type {
    while (type.kind === "typevar") {
      const binding = this.bindings.get(type.id);
      if (!binding) break;
      type = binding.type;
    }
    return type;
  }

  /**
   * Recursively resolve all type variables within a type structure.
   * Unlike resolve(), this walks into records, arrays, and nullables.
   */
  deepResolve(type: Type): Type {
    type = this.resolve(type);
    switch (type.kind) {
      case "primitive":
      case "typevar":
      case "error":
        return type;
      case "array": {
        const elem = this.deepResolve(type.elementType);
        return elem === type.elementType ? type : this.typeStore.array(elem);
      }
      case "nullable": {
        const inner = this.deepResolve(type.innerType);
        return inner === type.innerType ? type : this.typeStore.nullable(inner);
      }
      case "record": {
        let changed = false;
        const fields: Record<string, Type> = {};
        for (const [name, fieldType] of Object.entries(type.fields)) {
          const resolved = this.deepResolve(fieldType);

          if (resolved !== fieldType) changed = true;
          fields[name] = resolved;
        }
        const rest = type.rest ? this.deepResolve(type.rest) : null;
        if (rest !== type.rest) changed = true;
        return changed ? this.typeStore.record(fields, rest) : type;
      }
      default:
        throw new Error(`${JSON.stringify(type)} is not resolved`);
    }
  }

  /**
   * Check if a type variable occurs anywhere inside a type.
   * Prevents infinite types like α = α[] or ρ = {a: int | ρ}.
   */
  private occursIn(typeVarId: TypeId, type: Type): boolean {
    type = this.resolve(type);
    switch (type.kind) {
      case "typevar":
        return type.id === typeVarId;
      case "array":
        return this.occursIn(typeVarId, type.elementType);
      case "nullable":
        return this.occursIn(typeVarId, type.innerType);
      case "record": {
        const fieldOccurs = Object.values(type.fields).some((f) =>
          this.occursIn(typeVarId, f),
        );
        const restOccurs = type.rest
          ? this.occursIn(typeVarId, type.rest)
          : false;
        return fieldOccurs || restOccurs;
      }
      case "primitive":
      case "error":
        return false;
    }
  }

  /**
   * Bind a type variable to a type in the substitution.
   */
  private bind(typeVarId: TypeId, type: Type): void {
    this.bindings.set(typeVarId, {
      type,
      source: { kind: "unification", of: [typeVarId, type.id] },
    });
  }

  /**
   * Unify two types. Can be called multiple times to solve
   * multiple equality constraints against a shared substitution.
   */
  unify(t1: Type, t2: Type): void {
    t1 = this.resolve(t1);
    t2 = this.resolve(t2);

    // Same reference — hash-consing makes this cheap for concrete types,
    // and handles the case where two type variables resolved to the same root.
    if (t1 === t2) return;

    // Error types absorb — prevent cascading errors.
    if (t1.kind === "error" || t2.kind === "error") return;

    // TypeVar on left: bind to right (with occurs check).
    if (t1.kind === "typevar") {
      if (this.occursIn(t1.id, t2)) {
        this.errors.push({
          errorKind: "occurs_check",
          message: `Cannot construct infinite type: ${t1.name} = ${typeToString(t2)}`,
        });
        return;
      }
      this.bind(t1.id, t2);
      return;
    }

    // TypeVar on right: bind to left (symmetric).
    if (t2.kind === "typevar") {
      if (this.occursIn(t2.id, t1)) {
        this.errors.push({
          errorKind: "occurs_check",
          message: `Cannot construct infinite type: ${t2.name} = ${typeToString(t1)}`,
        });
        return;
      }
      this.bind(t2.id, t1);
      return;
    }

    // Different kinds: mismatch.
    if (t1.kind !== t2.kind) {
      this.errors.push({
        errorKind: "kind_mismatch",
        message: `Cannot unify ${typeToString(t1)} with ${typeToString(t2)}`,
      });
      return;
    }

    // Same kind — recurse into structure.
    switch (t1.kind) {
      case "primitive": {
        const t2p = t2 as PrimitiveType;
        if (t1.name !== t2p.name) {
          this.errors.push({
            errorKind: "kind_mismatch",
            message: `Cannot unify ${t1.name} with ${t2p.name}`,
          });
        }
        return;
      }

      case "array": {
        this.unify(t1.elementType, (t2 as ArrayType).elementType);
        return;
      }

      case "nullable": {
        this.unify(t1.innerType, (t2 as NullableType).innerType);
        return;
      }

      case "record": {
        const t2r = t2 as RecordType;

        // Collect all fields from both records
        const fields1 = new Set(Object.keys(t1.fields));
        const fields2 = new Set(Object.keys(t2r.fields));
        const allFields = new Set([...fields1, ...fields2]);

        // CASE 1: Both closed → exact match required
        if (t1.rest === null && t2r.rest === null) {
          if (fields1.size !== fields2.size) {
            this.errors.push({
              errorKind: "field_mismatch",
              message: `Record field mismatch: {${[...fields1].sort().join(", ")}} vs {${[...fields2].sort().join(", ")}}`,
            });
            return;
          }
        }

        // CASE 4: Both open → unify rest variables
        if (t1.rest !== null && t2r.rest !== null) {
          this.unify(t1.rest, t2r.rest);
        }

        // Unify all fields
        for (const field of allFields) {
          const ft1 = t1.fields[field];
          const ft2 = t2r.fields[field];

          if (ft1 && ft2) {
            // Common field - unify types
            this.unify(ft1, ft2);
          } else if (ft1 && t2r.rest !== null) {
            // Field only in t1, but t2 is open
            // Create a record with this field and unify with t2.rest
            const singleField = this.typeStore.record({ [field]: ft1 });
            this.unify(t2r.rest, singleField);
          } else if (ft2 && t1.rest !== null) {
            // Field only in t2, but t1 is open
            const singleField = this.typeStore.record({ [field]: ft2 });
            this.unify(t1.rest, singleField);
          } else {
            // Field exists in only one record, and the other is closed
            this.errors.push({
              errorKind: "field_mismatch",
              message: `Field '${field}' missing in one of the records`,
            });
            return;
          }
        }

        return;
      }
    }
  }

  /**
   * Snapshot the current state: resolved bindings and accumulated errors.
   * Call this once after all constraints have been unified.
   *
   * TODO: no need for such snapshot, maybe remove it?
   */
  getResult(): UnificationResult {
    const resultBindings = new Map<TypeId, Type>();
    for (const [id, binding] of this.bindings) {
      resultBindings.set(id, binding.type);
    }

    return {
      bindings: resultBindings,
      errors: this.errors.slice(0),
    };
  }
}
