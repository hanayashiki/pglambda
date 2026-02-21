import { MemoryVFS } from "@pglambda/vfs";
import { AstStore } from "@pglambda/parser";
import { defaultCompilerOptions } from "../src/options/compiler-options.js";
import type { HostContext } from "../src/host/compiler-host.js";

export const createTestHostContext = (
  files: Record<string, string>,
): HostContext => {
  const vfs = new MemoryVFS(files);
  const options = defaultCompilerOptions;
  const astStore = new AstStore();
  return { vfs, options, astStore };
};
