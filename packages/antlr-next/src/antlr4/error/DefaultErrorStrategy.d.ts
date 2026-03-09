import { ErrorStrategy } from "./ErrorStrategy.js";
import { RecognitionException } from "./RecognitionException.js";
import { NoViableAltException } from "./NoViableAltException.js";
import { InputMismatchException } from "./InputMismatchException.js";
import { FailedPredicateException } from "./FailedPredicateException.js";
import { IntervalSet } from "../misc/IntervalSet.js";
import { Parser } from "../Parser.js";
import { Token } from "../Token.js";

export declare class DefaultErrorStrategy implements ErrorStrategy {
  errorRecoveryMode: boolean;
  lastErrorIndex: number;

  reset(recognizer: Parser): void;
  beginErrorCondition(recognizer: Parser): void;
  endErrorCondition(recognizer: Parser): void;
  inErrorRecoveryMode(recognizer: Parser): boolean;
  reportMatch(recognizer: Parser): void;

  /** Dispatches to reportNoViableAlternative / reportInputMismatch / reportFailedPredicate. */
  reportError(recognizer: Parser, e: RecognitionException): void;

  recover(recognizer: Parser, e: RecognitionException): void;
  sync(recognizer: Parser): void;

  /** Override to customize "no viable alternative at input X" messages. */
  reportNoViableAlternative(recognizer: Parser, e: NoViableAltException): void;

  /** Override to customize "mismatched input X expecting Y" messages. */
  reportInputMismatch(recognizer: Parser, e: InputMismatchException): void;

  /** Override to customize "rule R failed predicate" messages. */
  reportFailedPredicate(recognizer: Parser, e: FailedPredicateException): void;

  /** Override to customize "extraneous input X expecting Y" messages. */
  reportUnwantedToken(recognizer: Parser): void;

  /** Override to customize "missing X at Y" messages. */
  reportMissingToken(recognizer: Parser): void;

  recoverInline(recognizer: Parser): Token;
  singleTokenInsertion(recognizer: Parser): boolean;
  singleTokenDeletion(recognizer: Parser): Token | null;
  getMissingSymbol(recognizer: Parser): Token;

  getExpectedTokens(recognizer: Parser): IntervalSet;
  getTokenErrorDisplay(t: Token | null): string;
  escapeWSAndQuote(s: string): string;
  getErrorRecoverySet(recognizer: Parser): IntervalSet;
  consumeUntil(recognizer: Parser, set: IntervalSet): void;
}
