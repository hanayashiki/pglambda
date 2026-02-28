import {
  Query_defContext,
  type ParserRuleContext,
} from "@pglambda/antlr";
import { checkQueryDef } from "./query_def.js";

/**
 * Top-level dispatch: given any AST node from the SCC,
 * hand-recurse into the appropriate domain checker.
 */
export function checkNode(c: ParserRuleContext): void {
  if (c instanceof Query_defContext) {
    checkQueryDef(c);
    return;
  }
  // TODO: type_def, database_def
}
