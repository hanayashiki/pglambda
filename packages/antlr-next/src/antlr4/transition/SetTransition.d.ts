import { ATNState } from "../state/ATNState.js";
import { IntervalSet } from "../misc/IntervalSet.js";
import { Transition } from "./Transition.js";

export declare class SetTransition extends Transition {
  constructor(target: ATNState, set?: IntervalSet);

  matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}
