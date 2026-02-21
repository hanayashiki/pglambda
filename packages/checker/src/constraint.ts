import type { Type } from "@pglambda/types";

/**
 * Equality constraint: t1 must unify with t2.
 */
export type EqualityConstraint = {
  readonly t1: Type;
  readonly t2: Type;
};
