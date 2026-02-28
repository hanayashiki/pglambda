import type { ColidContext, ParserRuleContext } from "@pglambda/antlr";
import type { Type } from "@pglambda/types";
import type { CheckContext } from "../check-context.js";

export let ctx: CheckContext = undefined!;

export function runCheckWithContext(currentCtx: CheckContext, fn: () => void) {
  ctx = currentCtx;
  try {
    fn();
  } finally {
    ctx = undefined!;
  }
}

/**
 * Propagate a type to colid and its inner rule child (identifier,
 * unreserved_keyword, etc.) so markers that resolve to the leaf node
 * can find the type via resolveExport pass-through.
 */
export function propagateToColid(colid: ColidContext, type: Type): void {
  ctx.getOrInsert(colid.contentHash, () => type);
  // colid always has exactly one rule child
  const childCount = colid.getChildCount();
  for (let i = 0; i < childCount; i++) {
    const child = colid.getChild(i);
    if ((child as ParserRuleContext).contentHash) {
      ctx.getOrInsert((child as ParserRuleContext).contentHash, () => type);
    }
  }
}
