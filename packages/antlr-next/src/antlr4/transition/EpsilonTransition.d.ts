import { ATNState } from "../state/ATNState.js";
import { Transition } from "./Transition.js";

export declare class EpsilonTransition extends Transition {
  outermostPrecedenceReturn: number;

  constructor(target: ATNState, outermostPrecedenceReturn?: number);

  matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}
