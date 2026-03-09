import { ATN } from "./atn/index.js";
import { ErrorListener } from "./error/index.js";

export declare class Recognizer<TSymbol> {
  state: number;
  readonly atn: ATN;
  _interp: any;
  get ruleNames(): string[];

  checkVersion(toolVersion: string): void;
  addErrorListener(listener: ErrorListener<TSymbol>): void;
  removeErrorListeners(): void;
  getErrorListener(): ErrorListener<TSymbol>;
  getLiteralNames(): (string | null)[];
  getSymbolicNames(): (string | null)[];
  getTokenNames(): string[];
  getRuleIndexMap(): Record<string, number>;
  getTokenType(tokenName: string): number;
  sempred(localctx: any, ruleIndex: number, actionIndex: number): boolean;
  precpred(localctx: any, precedence: number): boolean;
}
