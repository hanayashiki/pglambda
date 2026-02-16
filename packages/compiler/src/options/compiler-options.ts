import { z } from "zod";

export const CompilerOptions = z.object({
  include: z
    .array(z.string())
    .describe("Glob patterns (minimatch) for files to include in compilation")
    .default(["**/*"]),
});
export type CompilerOptions = z.infer<typeof CompilerOptions>;

export type CompilerOptionsIn = z.input<typeof CompilerOptions>;

/**
 * Default compiler options with all defaults applied
 */
export const defaultCompilerOptions: CompilerOptions = CompilerOptions.decode({});