import { z } from "zod";

export const Args = z.object({
  project: z
    .string()
    .describe("Path to the pglconfig.json to compile")
    .default("./pglconfig.json"),
});
export type Args = z.infer<typeof Args>;
