import { parseContent, AstStore } from "@pglambda/parser";
import type { FileUri } from "@pglambda/utils";
import { TypeStore } from "@pglambda/types";
import { lowerAndResolve } from "@pglambda/hir";
import { CheckContext } from "@pglambda/checker";
import { TsEmitter } from "../src/index.js";

/**
 * Full pipeline: .pgl source → TypeScript output string.
 *
 * Parse → Lower → Resolve → Check → Emit.
 * Returns the generated TypeScript code, or error messages.
 */
export function emitTs(source: string, filename = "test.pgl"): string {
  const astStore = new AstStore();
  const typeStore = new TypeStore();
  const uri = `file:///${filename}` as FileUri;

  // 1. Parse
  const parseResult = parseContent({ content: source, uri, success: true }, { astStore });

  if (!parseResult.success) {
    return parseResult.diagnostics.map((e) => `parse error: ${e.message}`).join("\n") + "\n";
  }

  // 2. Lower to HIR + define + resolve
  const { module, store: hirStore } = lowerAndResolve(parseResult.parseTree!, uri);

  // 3. Type-check
  const ctx = new CheckContext(module, hirStore, typeStore);
  const checkResult = ctx.check();

  if (checkResult.errors.length > 0) {
    return checkResult.errors.map((e) => `check error: ${e.message}`).join("\n") + "\n";
  }

  // 4. Emit TypeScript
  const emitter = new TsEmitter();
  const output = emitter.emit({ module, hirStore, checkResult, typeStore });

  if (!output.ok) {
    return output.errors.map((e) => `emit error: ${e.message}`).join("\n") + "\n";
  }

  return output.result.code + "\n";
}
