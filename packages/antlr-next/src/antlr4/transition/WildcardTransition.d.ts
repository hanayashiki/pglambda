import { ATNState } from "../state/ATNState.js";
import { Transition } from "./Transition.js";

export declare class WildcardTransition extends Transition {
  constructor(target: ATNState);

  matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}
