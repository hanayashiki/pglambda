import type { PrimitiveName } from "./primitives.ts";
import type { SourceLocation } from "@pglambda/utils";

export type { SourceLocation };

/**
 * Type ID for reference equality and cycle detection
 * Using branded type to prevent accidental mixing with regular numbers
 */
export type TypeId = number & { readonly __brand: "TypeId" };

/**
 * ID of Type constructors to build nominal types
 */
export type TypeConstructorId = number & {
  readonly __brand: "TypeConstructorId";
};

/**
 * @see 02_GENERIC_TYPES.md#type-constructor
 */
export interface TypeConstructor {
  readonly id: TypeConstructorId;
  readonly name: string;
  readonly parameters: string[];
}

export type TypeConstructorCreate = Pick<TypeConstructor, "name" | "parameters">;

export type TypeSchemeId = number & {
  readonly __brand: "TypeSchemeId";
};

/**
 * @see 02_GENERIC_TYPES.md#type-scheme
 */
export interface TypeScheme {
  readonly id: TypeSchemeId;
  readonly name: string;
  readonly parameters: string[];
  readonly body: Type;
}

/**
 * Primitive type (int, text, bool, etc.)
 */
export interface PrimitiveType {
  readonly kind: "primitive";
  readonly id: TypeId;
  readonly name: PrimitiveName;
}

/**
 * Type variable (for inference, internal only)
 * Examples: T0, T1, T2, ...
 */
export interface TypeVariable {
  readonly kind: "typevar";
  readonly id: TypeId;
  readonly name: string; // e.g., "T0", "T1", "T2" (sequential)
}

/**
 * Array type T[]
 */
export interface ArrayType {
  readonly kind: "array";
  readonly id: TypeId;
  readonly elementType: Type;
}

/**
 * Record type {field1: T1, field2: T2}
 * Field order is not significant (order-insensitive)
 *
 * Supports row polymorphism (internal only):
 * - rest: null → closed record: {a: int, b: text}
 * - rest: TypeVariable → open record: {a: int | ρ}
 */
export interface RecordType {
  readonly kind: "record";
  readonly id: TypeId;
  readonly fields: Readonly<Record<string, Type>>;
  readonly rest: Type | null; // null = closed, TypeVariable = open record
}

/**
 * Nullable type T | null
 */
export interface NullableType {
  readonly kind: "nullable";
  readonly id: TypeId;
  readonly innerType: Type;
}

/**
 * Error type - represents a type error during inference
 * Used for error recovery to suppress cascading errors
 *
 * Semantics:
 * - Not cached (each error is unique)
 * - Propagates through operations: Error ⊕ T → Error
 * - Does not unify with any type (including itself)
 */
export interface ErrorType {
  readonly kind: "error";
  readonly id: TypeId;
  readonly message: string; // Error message describing what went wrong
  readonly location?: SourceLocation; // Optional: where the error occurred
}

/**
 * Applied type constructed by a `TypeConstructor` with type arguments.
 */
export interface AppliedType {
  readonly kind: "applied";
  readonly id: TypeId;
  readonly constructorId: TypeConstructorId;
  readonly arguments: Type[];
}

/**
 * Function type (param1: T1, param2: T2, ...) => R
 *
 * Parameters are ordered. Parameter names are purely descriptive
 * (for display and codegen) and do not participate in unification.
 * Two function types unify if their parameter types match positionally
 * and their return types match.
 */
export interface FunctionType {
  readonly kind: "function";
  readonly id: TypeId;
  readonly parameters: readonly string[];
  readonly parameterTypes: readonly Type[];
  readonly returnType: Type;
}

/**
 * Type parameter reference, scoped to a specific TypeScheme.
 *
 * ParamType is a constant in unification — it only unifies with the exact
 * same ParamType (matching both schemeId and index). Unifying a ParamType
 * with a different ParamType or a concrete type is a type error.
 * TypeVariables CAN be bound to ParamType through unification.
 *
 * During body checking of a generic definition, declared type parameters
 * are represented directly as ParamType (not as TypeVariables). This means:
 * - The body must be valid for ALL instantiations of the type parameters
 * - No generalization step is needed — the scheme is constructed directly
 *   from the body's result type, which already contains ParamType nodes
 *
 * At call sites, ParamType nodes in a scheme's body are replaced with
 * fresh TypeVariables during instantiation.
 */
export interface ParamType {
  readonly kind: "param";
  readonly id: TypeId;
  /**
   * Which TypeScheme this parameter belongs to.
   * Two ParamTypes with the same index but different schemeIds
   * are different types and will not unify.
   */
  readonly schemeId: TypeSchemeId;
  /**
   * 0-based index into the TypeScheme's parameter list.
   */
  readonly index: number;
}

/**
 * Base type representing all types in the pglambda type system
 */
export type Type =
  | PrimitiveType
  | TypeVariable
  | ArrayType
  | RecordType
  | NullableType
  | ErrorType
  | AppliedType
  | FunctionType
  | ParamType;

export type TypeKind = Type["kind"];

// Type guards

export function isPrimitive(type: Type): type is PrimitiveType {
  return type.kind === "primitive";
}

export function isTypeVar(type: Type): type is TypeVariable {
  return type.kind === "typevar";
}

export function isArray(type: Type): type is ArrayType {
  return type.kind === "array";
}

export function isRecord(type: Type): type is RecordType {
  return type.kind === "record";
}

export function isNullable(type: Type): type is NullableType {
  return type.kind === "nullable";
}

export function isError(type: Type): type is ErrorType {
  return type.kind === "error";
}

export function isAppliedType(type: Type): type is AppliedType {
  return type.kind === "applied";
}

export function isFunction(type: Type): type is FunctionType {
  return type.kind === "function";
}

export function isParam(type: Type): type is ParamType {
  return type.kind === "param";
}
