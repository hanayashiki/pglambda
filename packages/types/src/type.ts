import type { PrimitiveName } from './primitives.ts';
import type { SourceLocation } from '@pglambda/utils';

export type { SourceLocation };

/**
 * Type ID for reference equality and cycle detection
 * Using branded type to prevent accidental mixing with regular numbers
 */
export type TypeId = number & { readonly __brand: 'TypeId' };

/**
 * Primitive type (int, text, bool, etc.)
 */
export interface PrimitiveType {
  readonly kind: 'primitive';
  readonly id: TypeId;
  readonly name: PrimitiveName;
}

/**
 * Type variable (for inference, internal only)
 * Examples: T0, T1, T2, ...
 */
export interface TypeVariable {
  readonly kind: 'typevar';
  readonly id: TypeId;
  readonly name: string; // e.g., "T0", "T1", "T2" (sequential)
}

/**
 * Array type T[]
 */
export interface ArrayType {
  readonly kind: 'array';
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
  readonly kind: 'record';
  readonly id: TypeId;
  readonly fields: Readonly<Record<string, Type>>;
  readonly rest: Type | null; // null = closed, TypeVariable = open record
}

/**
 * Nullable type T | null
 */
export interface NullableType {
  readonly kind: 'nullable';
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
  readonly kind: 'error';
  readonly id: TypeId;
  readonly message: string; // Error message describing what went wrong
  readonly location?: SourceLocation; // Optional: where the error occurred
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
  | ErrorType;

export type TypeKind = Type['kind'];

// Type guards

export function isPrimitive(type: Type): type is PrimitiveType {
  return type.kind === 'primitive';
}

export function isTypeVar(type: Type): type is TypeVariable {
  return type.kind === 'typevar';
}

export function isArray(type: Type): type is ArrayType {
  return type.kind === 'array';
}

export function isRecord(type: Type): type is RecordType {
  return type.kind === 'record';
}

export function isNullable(type: Type): type is NullableType {
  return type.kind === 'nullable';
}

export function isError(type: Type): type is ErrorType {
  return type.kind === 'error';
}
