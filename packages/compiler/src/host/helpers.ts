import type { AnyKeySchema, KeyType, QueryFunction, TequilaDB, ValueType } from "@pglambda/tequila";
import type { HostContext } from "./compiler-host.js";

export type HostedQuery<S extends AnyKeySchema> = {
  (ctx: HostContext): [S, QueryFunction<S>];
  schema: S;
  withContext(ctx: HostContext): QueryFunction<S>;
};

/**
 * Create a query definition that can be injected with host context.
 *
 * Supports two usage patterns:
 * - Spread: `db.defineInput(...loadTextContent(ctx))`
 * - WithContext: `loadTextContent.withContext(ctx)` returns a bound QueryFunction
 */
export const hostedQuery = <S extends AnyKeySchema>(
  schema: S,
  fn: (db: TequilaDB, key: KeyType<S>, ctx: HostContext) => Promise<ValueType<S>>
): HostedQuery<S> => {
  const bind =
    (ctx: HostContext): QueryFunction<S> =>
    async (db: TequilaDB, key: KeyType<S>) =>
      fn(db, key, ctx);

  const factory = ((ctx: HostContext) => [schema, bind(ctx)]) as HostedQuery<S>;
  factory.schema = schema;
  factory.withContext = bind;
  return factory;
};
