import { ATNState } from "../state/ATNState.js";
import { Transition } from "./Transition.js";

export declare class AtomTransition extends Transition {
  label_: number;

  constructor(target: ATNState, label: number);

  matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}
