import {
  ErrorListener,
  type Recognizer,
  type RecognitionException,
  Token,
  Parser,
  NoViableAltException,
  InputMismatchException,
  LexerNoViableAltException,
} from "@pglambda/antlr";
import type { FileUri, Diagnostic } from "@pglambda/utils";
import { getExpectedNonTerminal } from "./expected-nonterminal.js";

function classifyCode(e: RecognitionException | undefined, antlrMessage: string): string {
  if (e instanceof NoViableAltException) return "syntax/no-viable-alt";
  if (e instanceof InputMismatchException) return "syntax/mismatch";
  if (e instanceof LexerNoViableAltException) return "syntax/lexer";
  if (e === null || e === undefined) {
    if (antlrMessage.startsWith("extraneous")) return "syntax/extraneous";
    if (antlrMessage.startsWith("missing")) return "syntax/missing";
  }
  return "syntax/unknown";
}

/**
 * Custom ANTLR error listener that collects all syntax errors as Diagnostics
 * with range-based spans and human-readable messages.
 */
export class CollectingErrorListener<TSymbol> extends ErrorListener<TSymbol> {
  private diagnostics: Diagnostic[] = [];

  constructor(private readonly uri: FileUri) {
    super();
  }

  syntaxError(
    recognizer: Recognizer<TSymbol>,
    offendingSymbol: TSymbol,
    line: number,
    column: number,
    antlrMessage: string,
    e: RecognitionException | undefined
  ): void {
    const code = classifyCode(e, antlrMessage);

    // Build message: use expected nonterminal when available
    let message: string;
    if (recognizer instanceof Parser) {
      const expected = getExpectedNonTerminal(recognizer);
      const symbolText = offendingSymbol instanceof Token ? offendingSymbol.text : undefined;
      if (expected && symbolText) {
        message = `expected ${expected}, got '${symbolText}'`;
      } else if (expected) {
        message = `expected ${expected}`;
      } else {
        message = antlrMessage;
      }
    } else {
      message = antlrMessage;
    }

    // Build span from offending token when available
    let endLine = line;
    let endColumn = column + 1;
    if (offendingSymbol instanceof Token) {
      const text = offendingSymbol.text;
      endLine = line;
      endColumn = column + (text?.length ?? 1);
    }

    this.diagnostics.push({
      span: {
        file: this.uri,
        start: { line, column },
        end: { line: endLine, column: endColumn },
      },
      severity: "error",
      code,
      message,
    });
  }

  getDiagnostics(): readonly Diagnostic[] {
    return this.diagnostics;
  }

  hasErrors(): boolean {
    return this.diagnostics.length > 0;
  }
}
