import type { FileUri, SourceLocation } from "@pglambda/utils";
import type { ParserRuleContext, ProgContext } from "@pglambda/antlr";

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

export type ResolvedMarker = {
  label: string;
  /** 1-based target line */
  line: number;
  /** 0-based target column */
  column: number;
  node: ParserRuleContext | null;
};

/**
 * Result of parsing a .pgl file.
 * Contains the ANTLR parse tree and any syntax errors encountered.
 */
export type ParseResult = {
  readonly uri: FileUri;
  readonly parseTree: ProgContext | null;
  readonly errors: readonly SyntaxError[];
  readonly markers: readonly ResolvedMarker[];
  readonly success: boolean;
};
