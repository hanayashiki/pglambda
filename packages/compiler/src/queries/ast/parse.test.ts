import { describe, it, expect } from "vitest";
import { TequilaDBImpl } from "@pglambda/tequila";
import { MemoryVFS } from "@pglambda/vfs";
import { parseAST, parseASTSchema } from "./parse.js";
import { pathToUri } from "../../utils/uri.js";
import { defaultCompilerOptions } from "../../options/compiler-options.js";
import { loadTextContent, textContentSchema } from "../inputs/text-content.js";
import { ProgContext } from "@pglambda/antlr";

describe("parseAST", () => {
  const setupQuery = (files: Record<string, string>) => {
    const vfs = new MemoryVFS(files);
    const db = new TequilaDBImpl();
    const options = defaultCompilerOptions;

    // Register loadTextContent as an input query
    const textContentQuery = loadTextContent.withContext({ vfs, options });
    db.defineInput(textContentSchema, textContentQuery);

    // Register parseAST as a tracked query
    const parseASTQuery = parseAST.withContext({ vfs, options });
    db.defineTracked(parseASTSchema, parseASTQuery);

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
