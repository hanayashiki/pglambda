export {};

declare module "antlr4" {
  interface ParserRuleContext {
    /** Grammar rule index — exists at runtime but missing from antlr4 types. */
    readonly ruleIndex: number;
    /** Content hash: md5(ruleIndex + ":" + sourceText). Always set after parsing. */
    contentHash: string;
  }
}
