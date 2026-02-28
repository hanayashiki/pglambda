import type { FileUri } from "./uri.js";

export interface Position {
  readonly line: number; // 1-based
  readonly column: number; // 0-based
}

export interface Span {
  readonly file: FileUri;
  readonly start: Position;
  readonly end: Position;
}

export interface SourceLocation {
  readonly file: string;
  readonly line: number;
  readonly column: number;
}
