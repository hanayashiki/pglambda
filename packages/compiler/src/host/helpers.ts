import type {
  AnyKeySchema,
  KeyType,
  QueryFunction,
  TequilaDB,
  ValueType,
} from "@pglambda/tequila";
import type { HostContext } from "./compiler-host";

export type HostedQuery<S extends AnyKeySchema> = {
  withContext: (ctx: HostContext) => QueryFunction<S>;
};

export const hostedQuery = <S extends AnyKeySchema>(
  fn: (
    db: TequilaDB,
    key: KeyType<S>,
    ctx: HostContext,
  ) => Promise<ValueType<S>>,
): HostedQuery<S> => {
  return {
    withContext:
      (ctx: HostContext) => async (db: TequilaDB, key: KeyType<S>) => {
        return await fn(db, key, ctx);
      },
  };
};
