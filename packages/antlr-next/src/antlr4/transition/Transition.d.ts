import { ATNState } from "../state/ATNState.js";
import { IntervalSet } from "../misc/IntervalSet.js";

export declare class Transition {
  static readonly EPSILON: 1;
  static readonly RANGE: 2;
  static readonly RULE: 3;
  static readonly PREDICATE: 4;
  static readonly ATOM: 5;
  static readonly ACTION: 6;
  static readonly SET: 7;
  static readonly NOT_SET: 8;
  static readonly WILDCARD: 9;
  static readonly PRECEDENCE: 10;

  static readonly serializationNames: string[];
  static readonly serializationTypes: Record<string, number>;

  target: ATNState;
  isEpsilon: boolean;
  label: IntervalSet | null;
  serializationType: number;

  constructor(target: ATNState);

  matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}
