import { ATNConfigSet } from "../atn/index.js";
import { Recognizer } from "../Recognizer.js";
import { TokenStream } from "../TokenStream.js";
import { ParserRuleContext } from "../context/index.js";
import { Token } from "../Token.js";
import { RecognitionException } from "./RecognitionException.js";

export declare class NoViableAltException extends RecognitionException {
  deadEndConfigs: ATNConfigSet | null;
  startToken: Token;
  offendingToken: Token;

  constructor(
    recognizer: Recognizer<any>,
    input?: TokenStream,
    startToken?: Token,
    offendingToken?: Token,
    deadEndConfigs?: ATNConfigSet | null,
    ctx?: ParserRuleContext
  );
}
