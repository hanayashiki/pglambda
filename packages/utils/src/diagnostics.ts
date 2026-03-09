import type { Span } from "./source-location";

export type DiagnosticSeverity = "error" | "warning" | "info" | "hint";

export type Tag = "unnecessary" | "deprecated";

export interface Diagnostic {
  span: Span;
  severity: DiagnosticSeverity;
  code: string;
  message: string;
  tags?: Tag[];
}
