import type { AstStore } from "@pglambda/parser";
import type { CompilerOptions } from "../options";
import type { VFS } from "@pglambda/vfs";

export type HostContext = {
  options: CompilerOptions;
  vfs: VFS;
  astStore: AstStore;
};
