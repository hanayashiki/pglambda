import { ATNState } from "../state/ATNState.js";
import { Transition } from "./Transition.js";

export declare class RangeTransition extends Transition {
  start: number;
  stop: number;

  constructor(target: ATNState, start: number, stop: number);

  matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}
