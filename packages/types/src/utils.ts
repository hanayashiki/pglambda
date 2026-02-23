// import type { Type } from './type.ts';

// /**
//  * Visitor pattern for type traversal
//  */
// export interface TypeVisitor<R> {
//   visitPrimitive?(type: Extract<Type, { kind: 'primitive' }>): R;
//   visitTypeVar?(type: Extract<Type, { kind: 'typevar' }>): R;
//   visitArray?(type: Extract<Type, { kind: 'array' }>): R;
//   visitRecord?(type: Extract<Type, { kind: 'record' }>): R;
//   visitNullable?(type: Extract<Type, { kind: 'nullable' }>): R;
//   visitApplied?(type: Extract<Type, { kind: 'applied' }>): R;
//   visitError?(type: Extract<Type, { kind: 'error' }>): R;
// }

// /**
//  * Visit a type using the visitor pattern
//  * Useful for traversal, transformation, or analysis
//  *
//  * @example
//  * visitType(type, {
//  *   visitPrimitive: (t) => console.log('Found primitive:', t.name),
//  *   visitArray: (t) => console.log('Found array'),
//  * });
//  */
// export function visitType<R>(type: Type, visitor: TypeVisitor<R>): R | undefined {
//   switch (type.kind) {
//     case 'primitive':
//       return visitor.visitPrimitive?.(type);
//     case 'typevar':
//       return visitor.visitTypeVar?.(type);
//     case 'array':
//       return visitor.visitArray?.(type);
//     case 'record':
//       return visitor.visitRecord?.(type);
//     case 'nullable':
//       return visitor.visitNullable?.(type);
//     case 'applied':
//       return visitor.visitApplied?.(type);
//     case 'error':
//       return visitor.visitError?.(type);
//   }
// }
// TODO: not useful so far
