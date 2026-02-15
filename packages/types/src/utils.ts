import type { Type } from './type.ts';

/**
 * Convert a type to a human-readable string representation
 *
 * @example
 * typeToString(int) // "int"
 * typeToString(array(int)) // "int[]"
 * typeToString(nullable(text)) // "text | null"
 * typeToString(error("msg")) // "<error: msg>"
 */
export function typeToString(type: Type): string {
  switch (type.kind) {
    case 'primitive':
      return type.name;

    case 'typevar':
      return type.name;

    case 'array':
      return `${typeToString(type.elementType)}[]`;

    case 'record': {
      const fields = Object.entries(type.fields)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, fieldType]) => `${name}: ${typeToString(fieldType)}`)
        .join(', ');
      return `{${fields}}`;
    }

    case 'nullable':
      return `${typeToString(type.innerType)} | null`;

    case 'error':
      return `<error: ${type.message}>`;
  }
}

/**
 * Check if two types are equal
 * Due to hash-consing, this is just reference equality (===)
 *
 * @example
 * const int1 = store.primitive('int');
 * const int2 = store.primitive('int');
 * typesEqual(int1, int2) // true (same reference)
 */
export function typesEqual(t1: Type, t2: Type): boolean {
  return t1 === t2;
}

/**
 * Check if a type is an error type
 * Useful for error propagation and suppression of cascading errors
 *
 * @example
 * if (isErrorType(type)) {
 *   // Suppress further type checking
 *   return type; // Propagate error
 * }
 */
export function isErrorType(type: Type): boolean {
  return type.kind === 'error';
}

/**
 * Visitor pattern for type traversal
 */
export interface TypeVisitor<R> {
  visitPrimitive?(type: Extract<Type, { kind: 'primitive' }>): R;
  visitTypeVar?(type: Extract<Type, { kind: 'typevar' }>): R;
  visitArray?(type: Extract<Type, { kind: 'array' }>): R;
  visitRecord?(type: Extract<Type, { kind: 'record' }>): R;
  visitNullable?(type: Extract<Type, { kind: 'nullable' }>): R;
  visitError?(type: Extract<Type, { kind: 'error' }>): R;
}

/**
 * Visit a type using the visitor pattern
 * Useful for traversal, transformation, or analysis
 *
 * @example
 * visitType(type, {
 *   visitPrimitive: (t) => console.log('Found primitive:', t.name),
 *   visitArray: (t) => console.log('Found array'),
 * });
 */
export function visitType<R>(type: Type, visitor: TypeVisitor<R>): R | undefined {
  switch (type.kind) {
    case 'primitive':
      return visitor.visitPrimitive?.(type);
    case 'typevar':
      return visitor.visitTypeVar?.(type);
    case 'array':
      return visitor.visitArray?.(type);
    case 'record':
      return visitor.visitRecord?.(type);
    case 'nullable':
      return visitor.visitNullable?.(type);
    case 'error':
      return visitor.visitError?.(type);
  }
}
