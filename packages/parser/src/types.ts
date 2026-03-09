import type { FileUri, Diagnostic } from "@pglambda/utils";
import type { ParserRuleContext, ProgContext } from "@pglambda/antlr";

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
 * Contains the ANTLR parse tree and any diagnostics encountered.
 */
export type ParseResult = {
  readonly uri: FileUri;
  readonly parseTree: ProgContext | null;
  readonly diagnostics: readonly Diagnostic[];
  readonly markers: readonly ResolvedMarker[];
  readonly success: boolean;
};
