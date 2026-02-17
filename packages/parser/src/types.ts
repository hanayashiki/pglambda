import type { FileUri, SourceLocation } from "@pglambda/utils";
import type { ProgContext } from "@pglambda/antlr";

/**
 * Represents a syntax error encountered during parsing.
 */
export type SyntaxError = {
  readonly severity: "error" | "warning";
  readonly message: string;
  readonly location: SourceLocation;
  readonly offendingSymbol?: string;
  readonly recovered: boolean;
};

/**
 * Result of parsing a .pgl file.
 * Contains the ANTLR parse tree and any syntax errors encountered.
 */
export type ParseResult = {
  readonly uri: FileUri;
  readonly parseTree: ProgContext | null;
  readonly errors: readonly SyntaxError[];
  readonly success: boolean;
};
