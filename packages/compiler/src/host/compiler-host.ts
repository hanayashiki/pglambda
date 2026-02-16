import type { CompilerOptions } from "../options";
import type { VFS } from "vfs";

export type HostContext = {
  options: CompilerOptions;
  vfs: VFS;
};
