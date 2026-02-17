import { ErrorListener, type Recognizer, type RecognitionException } from "@pglambda/antlr";
import type { FileUri } from "@pglambda/utils";
import type { SyntaxError } from "./types.js";

/**
 * Custom ANTLR error listener that collects all syntax errors
 * instead of throwing on the first error.
 */
export class CollectingErrorListener<TSymbol> extends ErrorListener<TSymbol> {
  private errors: SyntaxError[] = [];

  constructor(private readonly uri: FileUri) {
    super();
  }

  syntaxError(
    _recognizer: Recognizer<TSymbol>,
    offendingSymbol: TSymbol,
    line: number,
    column: number,
    msg: string,
    e: RecognitionException | undefined,
  ): void {
    let symbolText: string | undefined;
    if (offendingSymbol && typeof offendingSymbol === "object" && "text" in offendingSymbol) {
      symbolText = String(offendingSymbol.text);
    }

    const recovered = e === null || e === undefined;

    this.errors.push({
      severity: "error",
      message: msg,
      location: { file: this.uri, line, column },
      offendingSymbol: symbolText,
      recovered,
    });
  }

  getErrors(): readonly SyntaxError[] {
    return this.errors;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}
