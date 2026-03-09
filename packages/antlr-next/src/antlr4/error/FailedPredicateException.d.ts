import { Parser } from "../Parser.js";
import { Token } from "../Token.js";
import { RecognitionException } from "./RecognitionException.js";

export declare class FailedPredicateException extends RecognitionException {
  ruleIndex: number;
  predicateIndex: number;
  predicate: string | null;
  offendingToken: Token;

  constructor(recognizer: Parser, predicate?: string | null, message?: string | null);
}
