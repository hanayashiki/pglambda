export {
  type Doc,
  nil,
  text,
  line,
  softline,
  hardline,
  nest,
  group,
  concat,
  join,
  render,
} from "./doc.js";

import type { Module, HirStore } from "@pglambda/hir";
import type { CheckResult } from "@pglambda/checker";
import type { TypeStore } from "@pglambda/types";

export interface EmitInput {
  readonly module: Module;
  readonly hirStore: HirStore;
  readonly checkResult: CheckResult;
  readonly typeStore: TypeStore;
}

export interface EmitResult {
  readonly code: string;
}

export type EmitError = { readonly message: string };

export type EmitOutput =
  | { readonly ok: true; readonly result: EmitResult }
  | { readonly ok: false; readonly errors: readonly EmitError[] };

export interface Emitter {
  emit(input: EmitInput): EmitOutput;
}
