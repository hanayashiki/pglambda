import type { Type } from './type.ts';
import type { TypeStore } from './type-store.ts';

/**
 * Convert a type to a human-readable string representation
 *
 * @param type The type to convert
 * @param store Optional TypeStore for looking up constructor names
 *
 * TODO: make typeToString a method on TypeStore
 * 
 * @example
 * typeToString(int) // "int"
 * typeToString(array(int)) // "int[]"
 * typeToString(nullable(text)) // "text | null"
 * typeToString(error("msg")) // "<error: msg>"
 * typeToString(appliedType, store) // "SetOf<{col: int}>"
 */
export function typeToString(type: Type, store?: TypeStore): string {
  switch (type.kind) {
    case 'primitive':
      return type.name;

    case 'typevar':
      return type.name;

    case 'array':
      return `${typeToString(type.elementType, store)}[]`;

    case 'record': {
      const fields = Object.entries(type.fields)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, fieldType]) => `${name}: ${typeToString(fieldType, store)}`)
        .join(', ');

      if (type.rest === null) {
        // Closed record
        return `{${fields}}`;
      } else {
        // Open record with rest type
        const restStr = typeToString(type.rest, store);
        return fields.length > 0
          ? `{${fields} | ${restStr}}`
          : `{${restStr}}`;
      }
    }

    case 'nullable':
      return `${typeToString(type.innerType, store)} | null`;

    case 'applied': {
      const argStrs = type.arguments.map((t) => typeToString(t, store)).join(', ');
      if (store) {
        const ctor = store.ctors.get(type.constructorId);
        return `${ctor.name}<${argStrs}>`;
      }
      return `<ctor#${type.constructorId}><${argStrs}>`;
    }

    case 'error':
      return `<error: ${type.message}>`;

    default: {
      const exhaustive: never = type;
      throw new Error(`Unhandled type kind: ${JSON.stringify(exhaustive)}`);
    }
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
  visitApplied?(type: Extract<Type, { kind: 'applied' }>): R;
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
    case 'applied':
      return visitor.visitApplied?.(type);
    case 'error':
      return visitor.visitError?.(type);
  }
}
