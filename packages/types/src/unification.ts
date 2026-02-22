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

        // Step 1: Partition fields into common and extras
        const fields1 = Object.keys(t1.fields);
        const fields2 = Object.keys(t2r.fields);
        const fieldSet1 = new Set(fields1);
        const fieldSet2 = new Set(fields2);

        const commonFields = fields1.filter((f) => fieldSet2.has(f));
        const onlyInT1 = fields1.filter((f) => !fieldSet2.has(f));
        const onlyInT2 = fields2.filter((f) => !fieldSet1.has(f));

        // Step 2: Unify all common fields
        for (const field of commonFields) {
          this.unify(t1.fields[field], t2r.fields[field]);
        }

        // Step 3: Handle extra fields based on rest status
        const hasExtraInT1 = onlyInT1.length > 0;
        const hasExtraInT2 = onlyInT2.length > 0;

        if (!hasExtraInT1 && !hasExtraInT2) {
          // CASE: No extra fields - same field sets
          if (t1.rest && t2r.rest) {
            // Both open - unify rest variables
            this.unify(t1.rest, t2r.rest);
          } else if (t1.rest && !t2r.rest) {
            // t1 open, t2 closed - bind t1.rest to empty closed record
            this.unify(t1.rest, this.typeStore.record({}));
          } else if (!t1.rest && t2r.rest) {
            // t2 open, t1 closed - bind t2.rest to empty closed record
            this.unify(t2r.rest, this.typeStore.record({}));
          }
          // Both closed with same fields - OK, nothing to do
        } else if (hasExtraInT1 && !hasExtraInT2) {
          // CASE: Extra fields only in t1
          if (!t2r.rest) {
            // t2 is closed but t1 has extra fields → error
            this.errors.push({
              errorKind: "field_mismatch",
              message: `Fields [${onlyInT1.join(", ")}] in left record but not in closed right record`,
            });
            return;
          }
          // t2 is open - bind t2.rest to record with ALL extras from t1
          const extraFields: Record<string, Type> = {};
          for (const field of onlyInT1) {
            extraFields[field] = t1.fields[field];
          }
          this.unify(t2r.rest, this.typeStore.record(extraFields, t1.rest));
        } else if (!hasExtraInT1 && hasExtraInT2) {
          // CASE: Extra fields only in t2
          if (!t1.rest) {
            // t1 is closed but t2 has extra fields → error
            this.errors.push({
              errorKind: "field_mismatch",
              message: `Fields [${onlyInT2.join(", ")}] in right record but not in closed left record`,
            });
            return;
          }
          // t1 is open - bind t1.rest to record with ALL extras from t2
          const extraFields: Record<string, Type> = {};
          for (const field of onlyInT2) {
            extraFields[field] = t2r.fields[field];
          }
          this.unify(t1.rest, this.typeStore.record(extraFields, t2r.rest));
        } else {
          // CASE: Extra fields on BOTH sides
          if (!t1.rest && !t2r.rest) {
            // Both closed with different fields → error
            this.errors.push({
              errorKind: "field_mismatch",
              message: `Record field mismatch - left extra: [${onlyInT1.join(", ")}], right extra: [${onlyInT2.join(", ")}]`,
            });
            return;
          } else if (t1.rest && !t2r.rest) {
            // t1 open but t2 closed with different fields → error
            this.errors.push({
              errorKind: "field_mismatch",
              message: `Cannot unify open record with closed record having different fields`,
            });
            return;
          } else if (!t1.rest && t2r.rest) {
            // t2 open but t1 closed with different fields → error
            this.errors.push({
              errorKind: "field_mismatch",
              message: `Cannot unify closed record with open record having different fields`,
            });
            return;
          } else {
            // Both open with different fields - use fresh rest variable
            const freshRest = this.typeStore.typevar();

            // Build record for t1.rest: contains t2's extra fields + fresh rest
            const extraForT1: Record<string, Type> = {};
            for (const field of onlyInT2) {
              extraForT1[field] = t2r.fields[field];
            }
            const recordForT1Rest = this.typeStore.record(
              extraForT1,
              freshRest,
            );

            // Build record for t2.rest: contains t1's extra fields + fresh rest
            const extraForT2: Record<string, Type> = {};
            for (const field of onlyInT1) {
              extraForT2[field] = t1.fields[field];
            }
            const recordForT2Rest = this.typeStore.record(
              extraForT2,
              freshRest,
            );

            // Unify both rest variables (both must be non-null in this branch)
            this.unify(t1.rest!, recordForT1Rest);
            this.unify(t2r.rest!, recordForT2Rest);
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
