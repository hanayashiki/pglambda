import { Parser } from "../Parser.js";
import { Token } from "../Token.js";
import { RecognitionException } from "./RecognitionException.js";

export declare class InputMismatchException extends RecognitionException {
  offendingToken: Token;

  constructor(recognizer: Parser);
}
