import {
  PGLParserVisitor,
  type ParserRuleContext,
  type RuleNode,
  type TerminalNode,
  type ErrorNode,
} from "@pglambda/antlr";

function positionInSpan(ctx: ParserRuleContext, line: number, column: number): boolean {
  const startToken = ctx.start;
  const stopToken = ctx.stop ?? startToken;
  if (!startToken) return false;

  if (line < startToken.line || (line === startToken.line && column < startToken.column))
    return false;

  if (
    line > stopToken.line ||
    (line === stopToken.line && column > stopToken.column + stopToken.text.length - 1)
  )
    return false;

  return true;
}

class NodeAtPositionVisitor extends PGLParserVisitor<ParserRuleContext | null> {
  constructor(
    private line: number,
    private column: number
  ) {
    super();
  }

  visitChildren(node: RuleNode): ParserRuleContext | null {
    const ctx = node as ParserRuleContext;
    if (!positionInSpan(ctx, this.line, this.column)) return null;

    const children = ctx.children;
    if (children) {
      for (const child of children) {
        if ("start" in child && "children" in child) {
          const deeper = this.visit(child);
          if (deeper) return deeper;
        }
      }
    }

    return ctx;
  }

  visitTerminal(_node: TerminalNode): ParserRuleContext | null {
    return null;
  }

  visitErrorNode(_node: ErrorNode): ParserRuleContext | null {
    return null;
  }
}

/**
 * Find the deepest non-terminal AST node at (line, column).
 * Line is 1-based, column is 0-based (matching ANTLR's Token convention).
 */
export function resolveNodeAtPosition(
  tree: ParserRuleContext,
  line: number,
  column: number
): ParserRuleContext | null {
  return new NodeAtPositionVisitor(line, column).visit(tree);
}
