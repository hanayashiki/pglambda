import { ATNState } from "../state/ATNState.js";
import { Transition } from "./Transition.js";

export declare class PrecedencePredicateTransition extends Transition {
  precedence: number;

  constructor(target: ATNState, precedence: number);

  matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
  getPredicate(): { precedence: number };
}
