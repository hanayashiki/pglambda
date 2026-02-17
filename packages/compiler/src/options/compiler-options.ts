import { z } from "zod";

export const OutputOptions = z.object({
  ast: z.boolean().describe("Output the AST of the input files").default(false),
});

export const CompilerOptions = z.object({
  include: z
    .array(z.string())
    .describe("Glob patterns (minimatch) for files to include in compilation")
    .default(["**/*"]),

  outputOptions: OutputOptions.describe(
    "Options for controlling compiler output",
  ).default(OutputOptions.decode({})),
});
export type CompilerOptions = z.infer<typeof CompilerOptions>;

export type CompilerOptionsIn = z.input<typeof CompilerOptions>;

/**
 * Default compiler options with all defaults applied
 */
export const defaultCompilerOptions: CompilerOptions = CompilerOptions.decode(
  {},
);
