import {
  type ProgContext,
  type Qualified_nameContext,
  ParserRuleContext,
  Pgl_query_callContext,
  Pgl_ident_refContext,
} from "@pglambda/antlr";
import type { AstStore } from "#ast-store.js";
import type { DefinitionId, ScopeId } from "./definitions.js";

/**
 * Post-definition resolution pass.
 * Walks query bodies and resolves `qualified_name` references in pgl_expr
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
      this.resolveQualifiedName(ctx.qualified_name(), scopeId);
    } else if (ctx instanceof Pgl_ident_refContext) {
      this.resolveQualifiedName(ctx.qualified_name(), scopeId);
    }

    for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i);
      if (child instanceof ParserRuleContext) {
        this.walk(child, scopeId);
      }
    }
  }

  private resolveQualifiedName(
    qname: Qualified_nameContext,
    scopeId: ScopeId,
  ): void {
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
