import { describe, it, expect } from "vitest";
import { createTequilaDB } from "@pglambda/tequila";
import { MemoryVFS } from "@pglambda/vfs";
import { parseAST, parseASTSchema } from "./parse.js";
import { pathToUri } from "../../utils/uri.js";
import { defaultCompilerOptions } from "../../options/compiler-options.js";
import { loadTextContent } from "../inputs/text-content.js";
import { ProgContext } from "@pglambda/antlr";

describe("parseAST", () => {
  const setupQuery = (files: Record<string, string>) => {
    const vfs = new MemoryVFS(files);
    const db = createTequilaDB();
    const options = defaultCompilerOptions;

    // Register loadTextContent as an input query
    db.defineInput(...loadTextContent({ vfs, options }));

    // Register parseAST as a tracked query
    db.defineTracked(...parseAST({ vfs, options }));

    return { db, vfs, options };
  };

  describe("successful parsing", () => {
    it("parses simple query successfully", async () => {
      const { db } = setupQuery({
        "/test.pgl": "query foo() { select * from users }",
      });

      const uri = pathToUri("/test.pgl");
      const result = await db.get(parseASTSchema, uri);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.parseTree).toBeInstanceOf(ProgContext);
    });
  });
});
