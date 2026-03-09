import { IntervalSet } from "../misc/index.js";
import { RuleContext } from "../context/index.js";
import { ATNState, DecisionState, RuleStartState, RuleStopState } from "../state.js";

export declare class ATN {
  static INVALID_ALT_NUMBER: number;

  grammarType: number;
  maxTokenType: number;
  states: ATNState[];
  decisionToState: DecisionState[];
  ruleToStartState: RuleStartState[];
  ruleToStopState: RuleStopState[] | null;
  ruleToTokenType: number[] | null;
  modeToStartState: ATNState[];

  nextTokens(atnState: ATNState, ctx?: RuleContext): IntervalSet;
  getExpectedTokens(stateNumber: number, ctx: RuleContext): IntervalSet;
  addState(state: ATNState | null): void;
  getDecisionState(decision: number): DecisionState | null;
}
