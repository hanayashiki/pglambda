import {
  type Parser,
  type RuleContext,
  type ATNState,
  Transition,
  RuleTransition,
} from "@pglambda/antlr";
import { displayRuleName } from "./rule-display-names.js";

/**
 * BFS from a rule's start state, following only epsilon transitions.
 * Collects rule names from any RuleTransitions found (sub-rules the rule can enter).
 */
function collectSubRules(
  atn: { ruleToStartState: ATNState[]; states: ATNState[] },
  ruleIndex: number,
  ruleNames: string[]
): string[] {
  const startState = atn.ruleToStartState[ruleIndex];
  if (!startState) return [];

  const rules: string[] = [];
  const visited = new Set<number>();
  const queue = [startState as ATNState];
  while (queue.length > 0) {
    const s = queue.shift()!;
    if (visited.has(s.stateNumber)) continue;
    visited.add(s.stateNumber);
    for (const t of s.transitions) {
      if (t.serializationType === Transition.RULE) {
        const name = ruleNames[(t as RuleTransition).ruleIndex];
        if (name) rules.push(name);
      } else if (t.isEpsilon) {
        queue.push(t.target);
      }
    }
  }
  return rules;
}

/**
 * Walk up the parser's context chain to find the first rule that has sub-rules,
 * then return its human-readable display name.
 *
 * Returns `null` if no suitable rule is found.
 */
export function getExpectedNonTerminal(parser: Parser): string | null {
  try {
    const atn = parser.atn;
    const ruleNames = parser.ruleNames;

    let ctx: RuleContext | undefined = parser._ctx;
    while (ctx) {
      const rules = collectSubRules(atn, ctx.ruleIndex, ruleNames);
      if (rules.length > 0) return displayRuleName(ruleNames[ctx.ruleIndex]);
      ctx = ctx.parentCtx;
    }

    return null;
  } catch {
    return null;
  }
}
