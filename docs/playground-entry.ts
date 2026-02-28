/**
 * Browser entry point for the pglambda playground.
 * Bundles the full pipeline: Parse → Lower → Resolve → Check → Emit TS.
 */
import { parseContent, AstStore } from "@pglambda/parser";
import type { FileUri } from "@pglambda/utils";
import { TypeStore } from "@pglambda/types";
import { lowerAndResolve } from "@pglambda/hir";
import { CheckContext } from "@pglambda/checker";
import { TsEmitter } from "@pglambda/emitter-ts";

export interface CompileResult {
  ok: boolean;
  code: string;
  errors: string[];
}

export function compile(source: string): CompileResult {
  const astStore = new AstStore();
  const typeStore = new TypeStore();
  const uri = `file:///playground.pgl` as FileUri;

  // 1. Parse
  const parseResult = parseContent(
    { content: source, uri, success: true },
    { astStore },
  );

  if (!parseResult.success) {
    return {
      ok: false,
      code: "",
      errors: parseResult.errors.map((e) => `Parse error: ${e.message}`),
    };
  }

  // 2. Lower to HIR + define + resolve
  const { module, store: hirStore } = lowerAndResolve(
    parseResult.parseTree!,
    uri,
  );

  // 3. Type-check
  const ctx = new CheckContext(module, hirStore, typeStore);
  const checkResult = ctx.check();

  if (checkResult.errors.length > 0) {
    return {
      ok: false,
      code: "",
      errors: checkResult.errors.map((e) => `Type error: ${e.message}`),
    };
  }

  // 4. Emit TypeScript
  const emitter = new TsEmitter();
  const output = emitter.emit({ module, hirStore, checkResult, typeStore });

  if (!output.ok) {
    return {
      ok: false,
      code: "",
      errors: output.errors.map((e) => `Emit error: ${e.message}`),
    };
  }

  return {
    ok: true,
    code: output.result.code,
    errors: [],
  };
}

// Expose on globalThis for the playground HTML
(globalThis as any).pglambda = { compile };
