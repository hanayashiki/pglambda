import type {
  Type,
  TypeId,
  PrimitiveType,
  TypeVariable,
  ArrayType,
  RecordType,
  NullableType,
  ErrorType,
  AppliedType,
  FunctionType,
  ParamType,
  SourceLocation,
  TypeKind,
  TypeConstructorId,
  TypeScheme,
  TypeSchemeId,
} from "./type.ts";
import type { PrimitiveName } from "./primitives.ts";
import { TypeConstructorStore } from "./type-constructor-store.js";

type CacheKey = string & { __brand: "CacheKey" };

/**
 * TypeStore - Central type factory with hash-consing
 *
 * Provides immutable type construction with structural sharing:
 * - Same type structure → same object instance (except ErrorType)
 * - Enables === comparison for structural equality
 * - Memory efficient (no duplicate type objects)
 * - Type IDs are unique and sequential
 */
export class TypeStore {
  private nextId = 0; // Internal counter (regular number)

  private typeCache = new Map<CacheKey, Type>();
  private typeById = new Map<TypeId, Type>();
  private typeCtorStore = new TypeConstructorStore();

  constructor() {}

  /**
   * Get the type constructor store
   */
  get ctors(): TypeConstructorStore {
    return this.typeCtorStore;
  }

  /**
   * Generate a fresh type ID
   * @returns A unique TypeId (branded number)
   */
  private freshId(): TypeId {
    return this.nextId++ as TypeId;
  }

  /**
   * Safely retrieve and cast a type by ID
   * Validates that the cached type's kind matches the expected kind
   * @throws Error if type not found or kind doesn't match
   * @returns The type with the specified ID and kind
   */
  getAs<K extends TypeKind>(id: TypeId, kind: K): Extract<Type, { kind: K }> {
    const type = this.typeById.get(id);
    if (!type) {
      throw new Error(`Type with ID ${id} not found`);
    }

    if (type.kind !== kind) {
      throw new Error(
        `Type kind mismatch: expected '${kind}' but got '${type.kind}' for ID ${id}`,
      );
    }

    return type as Extract<Type, { kind: K }>;
  }

  private ensure<T extends Type>(type: Omit<T, "id">): T {
    const typeWithId = { ...type, id: this.freshId() } as T;
    const key = this.getCacheKey(typeWithId);

    // typevar and error are always fresh - cache key uses their ID
    // so they'll never have cache hits. Skip the lookup for efficiency.
    if (type.kind === "typevar" || type.kind === "error") {
      this.typeCache.set(key, typeWithId);
      this.typeById.set(typeWithId.id, typeWithId);
      return typeWithId;
    }

    // For interned types (primitive, array, record, nullable),
    // check cache for structural sharing
    const cached = this.typeCache.get(key);
    if (cached) {
      if (cached.kind !== type.kind) {
        throw new Error(
          `Type kind mismatch in cache: expected '${type.kind}' but got '${cached.kind}' for key '${key}'`,
        );
      }
      return cached as T;
    }
    this.typeCache.set(key, typeWithId);
    this.typeById.set(typeWithId.id, typeWithId);
    return typeWithId;
  }

  /**
   * Generate cache key for type lookup
   * Centralizes cache key derivation logic
   */
  private getCacheKey(type: Type): CacheKey {
    switch (type.kind) {
      case "primitive":
        return `primitive:${type.name}` as CacheKey;

      case "typevar":
        return `typevar:${type.id}` as CacheKey;

      case "array":
        return `array:${type.elementType.id}` as CacheKey;

      case "record": {
        const fieldEntries = Object.entries(type.fields).sort(([a], [b]) =>
          a.localeCompare(b),
        );
        const fieldsKey = fieldEntries
          .map(([k, v]) => `${k}:${v.id}`)
          .join(",");
        const restKey = type.rest ? `:rest:${type.rest.id}` : "";
        return `record:${fieldsKey}${restKey}` as CacheKey;
      }

      case "nullable":
        return `nullable:${type.innerType.id}` as CacheKey;

      case "error":
        return `error:${type.id}` as CacheKey;

      case "applied": {
        const argIds = type.arguments.map((arg) => arg.id).join(",");
        return `applied:${type.constructorId}:${argIds}` as CacheKey;
      }

      case "function": {
        const paramsKey = type.parameters
          .map((name, i) => `${name}:${type.parameterTypes[i].id}`)
          .join(",");
        return `function:(${paramsKey}):${type.returnType.id}` as CacheKey;
      }

      case "param":
        return `param:${type.schemeId}:${type.index}` as CacheKey;
    }
  }

  /**
   * Get or create a primitive type
   * Primitive types are singletons - same name → same instance
   *
   * @example
   * const int1 = store.primitive('int');
   * const int2 = store.primitive('int');
   * console.assert(int1 === int2); // true!
   */
  primitive(name: PrimitiveName): PrimitiveType {
    return this.ensure<PrimitiveType>({
      kind: "primitive",
      name,
    });
  }

  /**
   * Create a fresh type variable
   * Type variables are always unique - even with same name
   *
   * @param name Optional custom name. If not provided, auto-generates T0, T1, T2, ...
   *
   * @example
   * const t1 = store.typevar(); // T0
   * const t2 = store.typevar(); // T1
   * console.assert(t1 !== t2); // true - different variables
   */
  typevar(name?: string): TypeVariable {
    const varName = name ?? `T${this.nextId}`;
    return this.ensure<TypeVariable>({
      kind: "typevar",
      name: varName,
    });
  }

  /**
   * Get or create an array type
   * Array types are interned - same element type → same instance
   *
   * @example
   * const int = store.primitive('int');
   * const arr1 = store.array(int);
   * const arr2 = store.array(int);
   * console.assert(arr1 === arr2); // true!
   */
  array(elementType: Type): ArrayType {
    return this.ensure<ArrayType>({
      kind: "array",
      elementType,
    });
  }

  /**
   * Get or create a record type
   * Record types are interned - same field structure → same instance
   * Field order is NOT significant: {a: int, b: text} === {b: text, a: int}
   *
   * @param fields Object mapping field names to types
   * @param rest Optional rest type for row polymorphism (null = closed record)
   *
   * @example
   * const int = store.primitive('int');
   * const text = store.primitive('text');
   * const rec1 = store.record({ id: int, name: text });
   * const rec2 = store.record({ name: text, id: int });
   * console.assert(rec1 === rec2); // true - order doesn't matter
   *
   * // Open record with row variable
   * const rho = store.typevar('rho');
   * const open = store.record({ id: int }, rho);
   */
  record(fields: Record<string, Type>, rest: Type | null = null): RecordType {
    return this.ensure<RecordType>({
      kind: "record",
      fields: { ...fields }, // Copy to prevent external mutation
      rest,
    });
  }

  /**
   * Get or create a nullable type
   * Nullable types are interned - same inner type → same instance
   *
   * @example
   * const int = store.primitive('int');
   * const nullable1 = store.nullable(int);
   * const nullable2 = store.nullable(int);
   * console.assert(nullable1 === nullable2); // true!
   */
  nullable(innerType: Type): NullableType {
    return this.ensure<NullableType>({
      kind: "nullable",
      innerType,
    });
  }

  /**
   * Create an error type
   * Error types are always unique - each error gets a fresh instance
   *
   * @param message Error message describing what went wrong
   * @param location Optional source location where the error occurred
   *
   * @example
   * const err1 = store.error('Cannot add int and text');
   * const err2 = store.error('Cannot add int and text');
   * console.assert(err1 !== err2); // true - different errors
   */
  error(message: string, location?: SourceLocation): ErrorType {
    return this.ensure<ErrorType>({
      kind: "error",
      message,
      location,
    });
  }

  /**
   * Convert a type to a human-readable string representation
   *
   * @example
   * store.typeToString(int) // "int"
   * store.typeToString(array(int)) // "int[]"
   * store.typeToString(appliedType) // "SetOf<{col: int}>"
   */
  typeToString(type: Type): string {
    switch (type.kind) {
      case "primitive":
        return type.name;

      case "typevar":
        return type.name;

      case "array":
        return `${this.typeToString(type.elementType)}[]`;

      case "record": {
        const fields = Object.entries(type.fields)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(
            ([name, fieldType]) =>
              `${name}: ${this.typeToString(fieldType)}`,
          )
          .join(", ");

        if (type.rest === null) {
          return `{${fields}}`;
        } else {
          const restStr = this.typeToString(type.rest);
          return fields.length > 0
            ? `{${fields} | ${restStr}}`
            : `{${restStr}}`;
        }
      }

      case "nullable":
        return `${this.typeToString(type.innerType)} | null`;

      case "applied": {
        const argStrs = type.arguments
          .map((t) => this.typeToString(t))
          .join(", ");
        const ctor = this.ctors.get(type.constructorId);
        return `${ctor.name}<${argStrs}>`;
      }

      case "error":
        return `<error: ${type.message}>`;

      case "function": {
        const params = type.parameters
          .map(
            (name, i) =>
              `${name}: ${this.typeToString(type.parameterTypes[i])}`,
          )
          .join(", ");
        return `(${params}) => ${this.typeToString(type.returnType)}`;
      }

      case "param":
        return `$${type.schemeId}:${type.index}`;
    }
  }

  /**
   * Apply a type constructor to type arguments
   * Validates arity and creates an AppliedType
   *
   * @example
   * const setOfCtor = store.ctors.lookup("SetOf");
   * const recordType = store.record({ col: store.primitive("int") });
   * const setType = store.apply(setOfCtor.id, [recordType]);
   */
  apply(ctorId: TypeConstructorId, args: Type[]): AppliedType {
    const ctor = this.typeCtorStore.get(ctorId);

    // Validate arity
    if (args.length !== ctor.parameters.length) {
      throw new Error(
        `Type constructor '${ctor.name}' expects ${ctor.parameters.length} argument(s), got ${args.length}`,
      );
    }

    return this.ensure<AppliedType>({
      kind: "applied",
      constructorId: ctorId,
      arguments: [...args], // Copy to prevent external mutation
    });
  }

  /**
   * Get or create a function type
   * Function types are interned - same parameter names, parameter types,
   * and return type → same instance.
   *
   * Parameter names participate in the cache key (they are significant
   * for codegen) but NOT in unification.
   */
  fn(
    parameters: readonly string[],
    parameterTypes: readonly Type[],
    returnType: Type,
  ): FunctionType {
    return this.ensure<FunctionType>({
      kind: "function",
      parameters: [...parameters],
      parameterTypes: [...parameterTypes],
      returnType,
    });
  }

  /**
   * Get or create a param type (type scheme parameter reference)
   * Param types are interned by (schemeId, index).
   *
   * ParamType is a constant in unification — it only unifies with the
   * exact same ParamType (matching both schemeId and index).
   * TypeVariables can be bound to ParamType through unification.
   */
  param(schemeId: TypeSchemeId, index: number): ParamType {
    return this.ensure<ParamType>({
      kind: "param",
      schemeId,
      index,
    });
  }

  /**
   * Instantiate a type scheme by replacing all ParamType nodes
   * (matching the scheme's id) with fresh type variables.
   */
  instantiate(scheme: TypeScheme): Type {
    const freshVars = scheme.parameters.map((name) => this.typevar(name));
    return this.substituteParams(scheme.id, freshVars, scheme.body);
  }

  /**
   * Walk a type, replacing ParamType(schemeId, i) with subs[i].
   * Uses structural sharing — returns the same instance when nothing changes.
   */
  private substituteParams(
    schemeId: TypeSchemeId,
    subs: readonly Type[],
    type: Type,
  ): Type {
    switch (type.kind) {
      case "param":
        if (type.schemeId === schemeId) return subs[type.index];
        return type;
      case "primitive":
      case "typevar":
      case "error":
        return type;
      case "array": {
        const elem = this.substituteParams(schemeId, subs, type.elementType);
        return elem === type.elementType ? type : this.array(elem);
      }
      case "nullable": {
        const inner = this.substituteParams(schemeId, subs, type.innerType);
        return inner === type.innerType ? type : this.nullable(inner);
      }
      case "record": {
        let changed = false;
        const fields: Record<string, Type> = {};
        for (const [name, fieldType] of Object.entries(type.fields)) {
          const resolved = this.substituteParams(schemeId, subs, fieldType);
          if (resolved !== fieldType) changed = true;
          fields[name] = resolved;
        }
        const rest = type.rest
          ? this.substituteParams(schemeId, subs, type.rest)
          : null;
        if (rest !== type.rest) changed = true;
        return changed ? this.record(fields, rest) : type;
      }
      case "applied": {
        let changed = false;
        const resolvedArgs: Type[] = [];
        for (const arg of type.arguments) {
          const resolved = this.substituteParams(schemeId, subs, arg);
          if (resolved !== arg) changed = true;
          resolvedArgs.push(resolved);
        }
        return changed ? this.apply(type.constructorId, resolvedArgs) : type;
      }
      case "function": {
        let changed = false;
        const resolvedParams: Type[] = [];
        for (const param of type.parameterTypes) {
          const resolved = this.substituteParams(schemeId, subs, param);
          if (resolved !== param) changed = true;
          resolvedParams.push(resolved);
        }
        const resolvedReturn = this.substituteParams(
          schemeId,
          subs,
          type.returnType,
        );
        if (resolvedReturn !== type.returnType) changed = true;
        return changed
          ? this.fn(type.parameters, resolvedParams, resolvedReturn)
          : type;
      }
    }
  }
}
