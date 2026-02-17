import {
  PGLParser,
  PGLParserListener,
  type ParserRuleContext,
  ParseTreeWalker,
  type TerminalNode,
} from "@pglambda/antlr";

class TreeFormatterListener extends PGLParserListener {
  private lines: string[] = [];
  private indent = 0;

  enterEveryRule(ctx: ParserRuleContext): void {
    const ruleName = PGLParser.ruleNames[ctx.ruleIndex];
    this.lines.push("  ".repeat(this.indent) + ruleName);
    this.indent++;
  }

  exitEveryRule(_ctx: ParserRuleContext): void {
    this.indent--;
  }

  visitTerminal(node: TerminalNode): void {
    const text = node.getText();
    if (text !== "<EOF>") {
      this.lines.push("  ".repeat(this.indent) + JSON.stringify(text));
    }
  }

  getFormattedTree(): string {
    return this.lines.join("\n");
  }
}

export function formatParseTree(tree: ParserRuleContext): string {
  const listener = new TreeFormatterListener();
  ParseTreeWalker.DEFAULT.walk(listener, tree);
  return listener.getFormattedTree();
}
