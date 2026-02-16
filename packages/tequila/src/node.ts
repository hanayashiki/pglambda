import type { KeySchema } from "./key";
import type { TequilaDB } from "./tequila-db";

export type TequilaNodeType = "input" | "tracked";

export type TequilaFn<K, V> = (db: TequilaDB, key: K) => Promise<V>;

export type TequilaNode<K, V> = {
  type: TequilaNodeType;
  keySchema: KeySchema<K, V>;
  fn: TequilaFn<K, V>;
};
