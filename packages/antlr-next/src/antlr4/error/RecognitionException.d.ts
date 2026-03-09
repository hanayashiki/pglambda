import { ParserRuleContext, RuleContext } from "../context/index.js";
import { TokenStream } from "../TokenStream.js";
import { Recognizer } from "../Recognizer.js";
import { CharStream } from "../CharStream.js";
import { Token } from "../Token.js";
import { IntervalSet } from "../misc/IntervalSet.js";

export interface ExceptionParams {
  message: string;
  recognizer?: Recognizer<never>;
  input?: CharStream | TokenStream;
  ctx?: ParserRuleContext | null;
}

export declare class RecognitionException extends Error {
  recognizer: Recognizer<any> | null;
  input: CharStream | TokenStream | null;
  ctx: RuleContext | null;
  offendingToken: Token | null;
  offendingState: number;

  constructor(params: ExceptionParams);

  getExpectedTokens(): IntervalSet | null;
}
