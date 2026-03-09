export {};

export type ContentHash = string & { __brand: "ContentHash" };

declare module "@pglambda/antlr-next" {
  interface ParserRuleContext {
    /** Unique ID assigned during parsing. TODO: find a way to stabilize across reparses. */
    contentHash: ContentHash;
  }
}
