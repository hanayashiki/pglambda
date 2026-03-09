import { ATNState } from "../state/ATNState.js";
import { Transition } from "./Transition.js";

export declare class PredicateTransition extends Transition {
  ruleIndex: number;
  predIndex: number;
  isCtxDependent: boolean;

  constructor(target: ATNState, ruleIndex: number, predIndex: number, isCtxDependent: boolean);

  matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
  getPredicate(): { ruleIndex: number; predIndex: number; isCtxDependent: boolean };
}
