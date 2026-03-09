import { ATNState } from "../state/ATNState.js";
import { Transition } from "./Transition.js";

export declare class RuleTransition extends Transition {
  ruleIndex: number;
  precedence: number;
  followState: ATNState;

  constructor(ruleStart: ATNState, ruleIndex: number, precedence: number, followState: ATNState);

  matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}
