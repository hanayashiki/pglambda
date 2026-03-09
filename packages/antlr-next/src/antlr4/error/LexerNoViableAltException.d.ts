import { ATNConfigSet } from "../atn/index.js";
import { Lexer } from "../Lexer.js";
import { CharStream } from "../CharStream.js";
import { RecognitionException } from "./RecognitionException.js";

export declare class LexerNoViableAltException extends RecognitionException {
  startIndex: number;
  deadEndConfigs: ATNConfigSet | null;

  constructor(
    lexer: Lexer,
    input: CharStream,
    startIndex: number,
    deadEndConfigs?: ATNConfigSet | null
  );

  toString(): string;
}
