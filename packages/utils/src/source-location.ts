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

export function spanContains(span: Span, line: number, column: number): boolean {
  const { start, end } = span;
  if (line < start.line || line > end.line) return false;
  if (line === start.line && column < start.column) return false;
  if (line === end.line && column >= end.column) return false;
  return true;
}
