import type { ContentHash } from "@pglambda/antlr/antlr4";
import type { Type, TypeScheme } from "@pglambda/types";

export type { ContentHash };

/**
 * Strongly Connected Component — the unit of type checking.
 *
 * An SCC has clear boundaries:
 * - imports: external AST nodes this SCC depends on (their types are already solved)
 * - exportedTypes: AST nodes this SCC makes available to the outside (types produced by solving)
 * - exportedTypeSchemes: resolved type schemes for generic definitions in this SCC
 *
 * Internal nodes (literals, intermediate expressions) are resolved during
 * solving but are not part of the signature.
 */
export type SCC = {
  /** AST nodes belonging to this SCC */
  readonly nodes: readonly ContentHash[];
  /** External dependencies: hash → already-solved type */
  readonly imports: ReadonlyMap<ContentHash, Type>;
  /** Produced types: hash → resolved type */
  readonly exportedTypes: Map<ContentHash, Type>;
  /** Resolved type schemes for generic definitions */
  readonly exportedTypeSchemes: TypeScheme[];
};

export type SCCIn = {
  /** AST nodes belonging to this SCC */
  readonly nodes: readonly ContentHash[];
  /** External dependencies: hash → already-solved type */
  readonly imports: ReadonlyMap<ContentHash, Type>;
  /** AST nodes whose types need to be exported */
  readonly exportedNodes: readonly ContentHash[];
};
