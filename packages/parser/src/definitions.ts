// A Definition is a AST defined structure before checking and resolution. It is used to represent the structure of the program as it is parsed, without any type information attached to it. The Checker will visit these definitions and generate constraints based on their structure, which will then be solved to determine the types of various expressions in the program.

import type { ContentHash } from "@pglambda/antlr/antlr4";

export type DefinitionId = ContentHash;

type Def<Tag extends string, Data> = {
  readonly id: DefinitionId;
  readonly tag: Tag;
  readonly name: string;
  readonly data: Data;
};

export type TypeParamDefinition = Def<"typeParam", void>;
export type QueryParamDefinition = Def<
  "queryParam",
  { annotationHash: ContentHash | null }
>;
export type QueryDefinition = Def<
  "query",
  {
    typeParams: TypeParamDefinition[];
    params: QueryParamDefinition[];
    bodyAst: ContentHash;
    returnTypeAst: ContentHash | null;
  }
>;

export type Definition =
  | TypeParamDefinition
  | QueryParamDefinition
  | QueryDefinition;

export type ScopeId = ContentHash;

export type Scope = {
  readonly parent: ScopeId | null;
  readonly typeDefinitions: Map<string, DefinitionId>;
  readonly valueDefinitions: Map<string, DefinitionId>;
};
