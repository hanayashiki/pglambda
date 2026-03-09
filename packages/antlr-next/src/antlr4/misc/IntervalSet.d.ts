import { Interval } from "./Interval.js";

export declare class IntervalSet {
  isNil: boolean;
  size: number;
  minElement: number;
  maxElement: number;
  intervals: Interval[];

  addOne(v: number): void;
  addRange(l: number, h: number): void;
  addInterval(v: Interval): void;
  addSet(other: IntervalSet): IntervalSet;
  removeOne(v: number): void;
  removeRange(v: Interval): void;
  first(): number;

  contains(i: number): boolean;
  toString(
    literalNames?: (string | null)[],
    symbolicNames?: (string | null)[],
    elemsAreChar?: boolean
  ): string;
}
