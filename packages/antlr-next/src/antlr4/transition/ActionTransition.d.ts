import { ATNState } from "../state/ATNState.js";
import { Transition } from "./Transition.js";

export declare class ActionTransition extends Transition {
  ruleIndex: number;
  actionIndex: number;
  isCtxDependent: boolean;

  constructor(target: ATNState, ruleIndex: number, actionIndex?: number, isCtxDependent?: boolean);

  matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}
