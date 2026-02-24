export {};

export type ContentHash = string & { __brand: "ContentHash" };

declare module "antlr4" {
  interface ParserRuleContext {
    /** Grammar rule index — exists at runtime but missing from antlr4 types. */
    readonly ruleIndex: number;
    /** Unique ID assigned during parsing. TODO: find a way to stabilize across reparses. */
    contentHash: ContentHash;
  }
}
