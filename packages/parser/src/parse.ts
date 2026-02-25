import {
  CharStreams,
  CommonTokenStream,
  PGLLexer,
  PGLParser,
  PGLParserListener,
  type ParserRuleContext,
} from "@pglambda/antlr";
import type { TextContent } from "@pglambda/utils";
import { CollectingErrorListener } from "./error-listener.js";
import type { ParseResult, ResolvedMarker } from "./types.js";
import type { ContentHash } from "@pglambda/antlr/antlr4";
import type { AstStore } from "#ast-store.js";
import { extractMarkersFromToken } from "./query-markers.js";
import { resolveNodeAtPosition } from "./ast-lookup.js";
import { DefinitionVisitor } from "./definition-visitor.js";
import { ResolutionVisitor } from "./resolution-visitor.js";

let nextId = 0;

class ContentHashListener extends PGLParserListener {
  constructor(private ctx: ParseContentContext) {
    super();
  }

  exitEveryRule(ctx: ParserRuleContext) {
    ctx.contentHash = String(nextId++) as ContentHash;
    this.ctx.astStore.ensure(ctx);
  }
}

export type ParseContentContext = {
  astStore: AstStore;
};

/**
 * Parse .pgl source content into an ANTLR parse tree with syntax error collection.
 *
 * Pure function — no tequila, no file I/O.
 */
export function parseContent(
  { content, uri }: TextContent,
  context: ParseContentContext,
): ParseResult {
  try {
    const inputStream = CharStreams.fromString(content);

    const lexer = new PGLLexer(inputStream);
    lexer.removeErrorListeners();
    const errorListener = new CollectingErrorListener(uri);
    lexer.addErrorListener(errorListener);

    const tokenStream = new CommonTokenStream(lexer);

    const parser = new PGLParser(tokenStream);
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);
    parser.addParseListener(new ContentHashListener(context));

    const parseTree = parser.prog();
    const errors = errorListener.getErrors();

    // Collect query markers from QUERY_MARKER channel tokens
    tokenStream.fill();
    const markers: ResolvedMarker[] = [];
    for (const token of tokenStream.tokens) {
      if (token.channel === PGLLexer.QUERY_MARKER) {
        for (const qm of extractMarkersFromToken(token)) {
          markers.push({
            label: qm.label,
            node: resolveNodeAtPosition(parseTree, qm.line, qm.column),
          });
        }
      }
    }

    // Extract definitions and build scopes
    const defVisitor = new DefinitionVisitor(context.astStore);
    defVisitor.visit(parseTree);

    // Resolve name references in query bodies
    const resolver = new ResolutionVisitor(context.astStore);
    resolver.visit(parseTree);

    return { uri, parseTree, errors, markers, success: errors.length === 0 };
  } catch (error) {
    return {
      uri,
      parseTree: null,
      errors: [
        {
          severity: "error" as const,
          message: `Parse failed: ${error instanceof Error ? error.message : String(error)}`,
          location: { file: uri, line: 1, column: 0 },
          recovered: false,
        },
      ],
      markers: [],
      success: false,
    };
  }
}
