import {
  PGLParserVisitor,
  type ProgContext,
  type DefContext,
  type Query_defContext,
} from "@pglambda/antlr";
import type { AstStore } from "#ast-store.js";
import type {
  DefinitionId,
  TypeParamDefinition,
  QueryParamDefinition,
  QueryDefinition,
  ScopeId,
  Definition,
} from "./definitions.js";

/**
 * Post-parse visitor that extracts definitions and builds scopes.
 * Populates AstStore with Definition and Scope entries.
 *
 * Does NOT descend into query bodies (SQL-level resolution is separate).
 */
export class DefinitionVisitor extends PGLParserVisitor<void> {
  private scopeStack: ScopeId[] = [];

  constructor(private readonly store: AstStore) {
    super();
  }

  private pushScope(id: ScopeId): Disposable {
    const parent = this.scopeStack.at(-1) ?? null;

    this.scopeStack.push(id);
    this.store.addScope(id, {
      parent,
      typeDefinitions: new Map<string, DefinitionId>(),
      valueDefinitions: new Map<string, DefinitionId>(),
    });
    return {
      [Symbol.dispose]: () => {
        this.scopeStack.pop();
      },
    };
  }

  private addDefinition(def: Definition): void {
    const current = this.scopeStack[this.scopeStack.length - 1];

    const scope = this.store.getScope(current)!;
    this.store.addDefinition(def);

    // TODO: diagnose duplicate definition
    const ns =
      def.tag === "typeParam"
        ? scope.typeDefinitions
        : scope.valueDefinitions;
    ns.set(def.name, def.id);
  }

  visitProg = (ctx: ProgContext): void => {
    using _scope = this.pushScope(ctx.contentHash as ScopeId);

    for (const def of ctx.def_list()) {
      this.visit(def);
    }
  };

  visitDef = (ctx: DefContext): void => {
    const queryDef = ctx.query_def();
    if (queryDef) {
      this.visit(queryDef);
    }
  };

  visitQuery_def = (ctx: Query_defContext): void => {
    const typeParams: TypeParamDefinition[] = [];
    const params: QueryParamDefinition[] = [];

    const name = ctx.identifier().getText();

    // Build query definition
    const queryDef: QueryDefinition = {
      id: ctx.contentHash as DefinitionId,
      tag: "query",
      name,
      data: {
        typeParams,
        params,
        bodyAst: ctx.query_body().contentHash,
        returnTypeAst: null,
      },
    };
    this.addDefinition(queryDef);

    using _scope = this.pushScope(ctx.contentHash as ScopeId);

    // Extract type params
    const typeParamList = ctx.type_parameter_list();
    if (typeParamList) {
      for (const ident of typeParamList.identifier_list()) {
        const def: TypeParamDefinition = {
          id: ident.contentHash as DefinitionId,
          tag: "typeParam",
          name: ident.getText(),
          data: undefined,
        };
        typeParams.push(def);
        this.addDefinition(def);
      }
    }

    // Extract value params
    for (const param of ctx.query_parameter_list().query_parameter_list()) {
      const paramToken = param.PARAM();
      const typeExpr = param.type_expression();
      const def: QueryParamDefinition = {
        id: param.contentHash as DefinitionId,
        tag: "queryParam",
        name: paramToken.getText(),
        data: {
          annotationHash: typeExpr ? typeExpr.contentHash : null,
        },
      };
      params.push(def);
      this.addDefinition(def);
    }
  };
}
