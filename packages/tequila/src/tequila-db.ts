import type { AnyKeySchema, KeyType, ValueType } from "./key";

/**
 * Query function type for inputs and tracked computations
 */
export type QueryFunction<S extends AnyKeySchema> = (
  db: TequilaDB,
  key: KeyType<S>,
) => Promise<ValueType<S>>;

export interface TequilaDB {
  get<S extends AnyKeySchema>(
    keySchema: S,
    key: KeyType<S>,
  ): Promise<ValueType<S>>;

  defineInput<S extends AnyKeySchema>(
    keySchema: S,
    fn: QueryFunction<S>,
  ): QueryFunction<S>;

  defineTracked<S extends AnyKeySchema>(
    keySchema: S,
    fn: QueryFunction<S>,
  ): QueryFunction<S>;

  /**
   * Mark a specific input as unverified.
   * On next access, this input and its dependents will be re-checked using === comparison.
   * Values with unchanged dependencies will not be recomputed.
   */
  invalidateInput<S extends AnyKeySchema>(schema: S, key: KeyType<S>): void;

  /**
   * Mark all cached values as unverified.
   * On next access, dependencies will be re-checked using === comparison.
   * Values with unchanged dependencies will not be recomputed.
   */
  invalidateAll(): void;
}
