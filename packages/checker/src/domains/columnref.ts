import type { Columnref_or_pgl_dollar_ident_refContext } from "@pglambda/antlr";
import type { Type } from "@pglambda/types";
import { ctx, propagateToColid } from "./ctx.js";

export function checkColumnref(
  c: Columnref_or_pgl_dollar_ident_refContext,
): Type {
  return ctx.getOrInsert(c.contentHash, () => {
    const colids = c.colid_list();
    if (colids.length !== 1) {
      return ctx.typeStore.error("Column references not supported yet");
    }
    const text = colids[0].getText();
    if (!text.startsWith("$")) {
      return ctx.typeStore.error("Column references not supported yet");
    }
    const defId = ctx.astStore.getResolution(colids[0].contentHash);
    if (!defId) return ctx.typeStore.error("Unresolved reference");
    const defType = ctx.getOrCreateTypeVar(defId);
    propagateToColid(colids[0], defType);
    return defType;
  });
}
