import { describe, it, expect } from "vitest";
import { createTequilaDB } from "@pglambda/tequila";
import { parseAST, parseASTSchema } from "../src/queries/ast/parse.js";
import { pathToUri } from "../src/utils/uri.js";
import { loadTextContent } from "../src/queries/inputs/text-content.js";
import { ProgContext } from "@pglambda/antlr";
import { createTestHostContext } from "./create-host-context.js";

describe("parseAST", () => {
  const setupQuery = (files: Record<string, string>) => {
    const ctx = createTestHostContext(files);

    const db = createTequilaDB();

    // Register loadTextContent as an input query
    db.defineInput(...loadTextContent(ctx));

    // Register parseAST as a tracked query
    db.defineTracked(...parseAST(ctx));

    return { db };
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
