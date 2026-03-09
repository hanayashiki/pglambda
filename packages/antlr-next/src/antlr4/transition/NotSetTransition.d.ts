import { ATNState } from "../state/ATNState.js";
import { IntervalSet } from "../misc/IntervalSet.js";
import { SetTransition } from "./SetTransition.js";

export declare class NotSetTransition extends SetTransition {
  constructor(target: ATNState, set?: IntervalSet);

  matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}
