import {
  PGLParserVisitor,
  type Query_defContext,
  type Qualified_nameContext,
  type Pgl_query_callContext,
  type Pgl_ident_refContext,
  type Columnref_or_pgl_dollar_ident_refContext,
  type Type_refContext,
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
 *
 * TODO: We need a systematic way to distinguish PGL-world names from SQL-world
 * names. Currently we only resolve qualified_name nodes inside pgl_query_call
 * and pgl_ident_ref contexts, but a general mechanism would be needed once
 * SQL-level name resolution is added.
 */
export class ResolutionVisitor extends PGLParserVisitor<void> {
  private currentScopeId: ScopeId = null!;

  constructor(private readonly store: AstStore) {
    super();
  }

  visitQuery_def = (ctx: Query_defContext): void => {
    const prevScope = this.currentScopeId;
    this.currentScopeId = ctx.contentHash as ScopeId;
    this.visitChildren(ctx);
    this.currentScopeId = prevScope;
  };

  visitPgl_query_call = (ctx: Pgl_query_callContext): void => {
    this.resolveQualifiedName(ctx.qualified_name());
    this.visitChildren(ctx);
  };

  visitType_ref = (ctx: Type_refContext): void => {
    const qname = ctx.pgl_ident_ref().qualified_name();
    const identifiers = qname.identifier_list();
    if (identifiers.length !== 1) return;

    const name = identifiers[0].getText();
    const defId = this.lookupTypeName(name);
    if (defId !== undefined) {
      this.store.addResolution(identifiers[0].contentHash, defId);
    }
    // Don't call visitChildren — type_ref resolution uses typeDefinitions,
    // not valueDefinitions like visitPgl_ident_ref would.
  };

  visitPgl_ident_ref = (ctx: Pgl_ident_refContext): void => {
    this.resolveQualifiedName(ctx.qualified_name());
  };

  visitColumnref_or_pgl_dollar_ident_ref = (ctx: Columnref_or_pgl_dollar_ident_refContext): void => {
    const identifiers = ctx.identifier_list();
    if (identifiers.length !== 1) return;

    const text = identifiers[0].getText();
    if (!text.startsWith("$")) return;

    const name = text.slice(1);
    const defId = this.lookupName(name);
    if (defId !== undefined) {
      this.store.addResolution(identifiers[0].contentHash, defId);
    }
  };

  private resolveQualifiedName(qname: Qualified_nameContext): void {
    const identifiers = qname.identifier_list();

    if (identifiers.length !== 1) return;

    const name = identifiers[0].getText();
    const defId = this.lookupName(name);
    if (defId !== undefined) {
      this.store.addResolution(identifiers[0].contentHash, defId);
    }
  }

  private lookupName(name: string): DefinitionId | undefined {
    let current: ScopeId | null = this.currentScopeId;
    while (current !== null) {
      const scope = this.store.getScope(current);
      if (!scope) break;
      const defId = scope.valueDefinitions.get(name);
      if (defId !== undefined) return defId;
      current = scope.parent;
    }
    return undefined;
  }

  private lookupTypeName(name: string): DefinitionId | undefined {
    let current: ScopeId | null = this.currentScopeId;
    while (current !== null) {
      const scope = this.store.getScope(current);
      if (!scope) break;
      const defId = scope.typeDefinitions.get(name);
      if (defId !== undefined) return defId;
      current = scope.parent;
    }
    return undefined;
  }
}
