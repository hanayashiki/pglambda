import {
  type ProgContext,
  ParserRuleContext,
  Pgl_query_callContext,
} from "@pglambda/antlr";
import type { AstStore } from "#ast-store.js";
import type { DefinitionId, ScopeId } from "./definitions.js";

/**
 * Post-definition resolution pass.
 * Walks query bodies and resolves `qualified_name` references in `pgl_query_call`
 * nodes to their definitions via the scope chain.
 *
 * Runs after DefinitionVisitor, so all definitions (including forward-referenced
 * queries) are available.
 */
export class ResolutionVisitor {
  constructor(private readonly store: AstStore) {}

  resolve(prog: ProgContext): void {
    for (const def of prog.def_list()) {
      const queryDef = def.query_def();
      if (queryDef) {
        const scopeId = queryDef.contentHash as ScopeId;
        this.walk(queryDef.query_body(), scopeId);
      }
    }
  }

  private walk(ctx: ParserRuleContext, scopeId: ScopeId): void {
    if (ctx instanceof Pgl_query_callContext) {
      this.resolvePglQueryCall(ctx, scopeId);
    }

    for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i);
      if (child instanceof ParserRuleContext) {
        this.walk(child, scopeId);
      }
    }
  }

  private resolvePglQueryCall(
    ctx: Pgl_query_callContext,
    scopeId: ScopeId,
  ): void {
    const qname = ctx.qualified_name();
    const identifiers = qname.identifier_list();

    if (identifiers.length !== 1) return;

    const name = identifiers[0].getText();
    const defId = this.lookupName(name, scopeId);
    if (defId !== undefined) {
      this.store.addResolution(qname.contentHash, defId);
    }
  }

  private lookupName(name: string, scopeId: ScopeId): DefinitionId | undefined {
    let current: ScopeId | null = scopeId;
    while (current !== null) {
      const scope = this.store.getScope(current);
      if (!scope) break;
      const defId = scope.valueDefinitions.get(name);
      if (defId !== undefined) return defId;
      current = scope.parent;
    }
    return undefined;
  }
}
