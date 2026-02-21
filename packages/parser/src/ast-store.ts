import type { ParserRuleContext } from "@pglambda/antlr";
import type { ContentHash } from "@pglambda/antlr/antlr4";

/**
 * Persistently store and retrieve AST nodes by content hash, to enable AST reuse across passes.
 */
export class AstStore {
  private astCache = new Map<ContentHash, ParserRuleContext>();

  ensure<T extends ParserRuleContext>(ctx: T): T {
    const hash = ctx.contentHash;
    const cached = this.astCache.get(hash);
    if (cached) {
      return cached as T;
    }
    this.astCache.set(hash, ctx);
    return ctx;
  }

  getAs<T extends ParserRuleContext>(hash: ContentHash): T {
    const cached = this.astCache.get(hash);
    if (!cached) {
      throw new Error("hash for ast does not exist");
    }

    return cached as any;
  }
}
