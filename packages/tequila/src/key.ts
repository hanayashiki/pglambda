import type { TequilaDB } from "./tequila-db";

/**
 * A key schema defines the type of keys and values for inputs and tracked computations.
 * Each schema is a unique object that carries type information via TypeScript generics.
 */
export class KeySchema<K, V> {
  // Phantom types to carry the key and value types
  // @ts-ignore 6133
  private _keyType!: K;
  // @ts-ignore 6133
  private _valueType!: V;

  constructor(public readonly name: string) {}

  // Helper type accessors (not runtime accessible, but useful for type inference)
  get keyType(): K {
    throw new Error("keyType is a compile-time only property");
  }

  get valueType(): V {
    throw new Error("valueType is a compile-time only property");
  }
}

/**
 * Type representing any key schema, regardless of its K and V type parameters.
 */
export type AnyKeySchema = KeySchema<any, any>;

/**
 * Extract the key type from a KeySchema
 */
export type KeyType<S extends AnyKeySchema> =
  S extends KeySchema<infer K, any> ? K : never;

/**
 * Extract the value type from a KeySchema
 */
export type ValueType<S extends AnyKeySchema> =
  S extends KeySchema<any, infer V> ? V : never;

/**
 * Define a new key schema with the specified key and value types.
 *
 * @param name - Name for the schema (required for debugging and validation)
 * @example
 * type FileId = string & { __brand: 'FileId' };
 *
 * const fileSchema = defineKeySchema<FileId, string>('file');
 * const astSchema = defineKeySchema<FileId, Ast>('ast');
 */
export function defineKeySchema<K, V>(name: string): KeySchema<K, V> {
  return new KeySchema<K, V>(name);
}

/**
 * Query function type for inputs and tracked computations
 */
export type QueryFunction<S extends AnyKeySchema> = (
  db: TequilaDB,
  key: KeyType<S>,
) => Promise<ValueType<S>>;
