import type { ParserRuleContext } from "@pglambda/antlr";
import type { ContentHash } from "@pglambda/antlr/antlr4";
import type {
  Definition,
  DefinitionId,
  Scope,
  ScopeId,
} from "./definitions.js";

/**
 * Persistently store and retrieve AST nodes by content hash, to enable AST reuse across passes.
 * Also stores definitions and scopes extracted by the DefinitionVisitor.
 */
export class AstStore {
  private astCache = new Map<ContentHash, ParserRuleContext>();
  private defs = new Map<DefinitionId, Definition>();
  private scopes = new Map<ScopeId, Scope>();
  private resolutions = new Map<ContentHash, DefinitionId>();

  ensure<T extends ParserRuleContext>(ctx: T): T {
    const hash = ctx.contentHash;
    const cached = this.astCache.get(hash);
    if (cached) {
      return cached as T;
    }
    this.astCache.set(hash, ctx);
    return ctx;
  }

  [Symbol.iterator](): IterableIterator<ContentHash> {
    return this.astCache.keys();
  }

  getAs<T extends ParserRuleContext>(hash: ContentHash): T {
    const cached = this.astCache.get(hash);
    if (!cached) {
      throw new Error("hash for ast does not exist");
    }

    return cached as any;
  }

  addDefinition(def: Definition): void {
    this.defs.set(def.id, def);
  }

  getDefinition(id: DefinitionId): Definition | undefined {
    return this.defs.get(id);
  }

  addScope(id: ScopeId, scope: Scope): void {
    this.scopes.set(id, scope);
  }

  getScope(id: ScopeId): Scope | undefined {
    return this.scopes.get(id);
  }

  addResolution(hash: ContentHash, defId: DefinitionId): void {
    this.resolutions.set(hash, defId);
  }

  getResolution(hash: ContentHash): DefinitionId | undefined {
    return this.resolutions.get(hash);
  }
}
