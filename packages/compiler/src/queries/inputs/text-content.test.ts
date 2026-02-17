import { describe, it, expect } from "vitest";
import { TequilaDBImpl } from "@pglambda/tequila";
import { MemoryVFS } from "@pglambda/vfs";
import { loadTextContent } from "./text-content.js";
import { pathToUri } from "../../utils/uri.js";
import { defaultCompilerOptions as options } from "../../options/index.js";

describe("loadTextContent", () => {
  const setupQuery = (files: Record<string, string>) => {
    const vfs = new MemoryVFS(files);
    const db = new TequilaDBImpl();
    const query = loadTextContent.withContext({ vfs, options });
    return { db, query };
  };

  it("loads existing file successfully", async () => {
    const { db, query } = setupQuery({
      "/test.pgl": "query foo {}",
    });

    const uri = pathToUri("/test.pgl");
    const content = await query(db, uri);

    expect(content.success).toBe(true);
    expect(content.content).toBe("query foo {}");
    expect(content.uri).toBe(uri);
  });

  it("handles missing file gracefully", async () => {
    const { db, query } = setupQuery({});

    const uri = pathToUri("/missing.pgl");
    const content = await query(db, uri);

    expect(content.success).toBe(false);
    expect(content.content).toBe("");
    expect(content.uri).toBe(uri);
  });

  it("handles file with UTF-8 content", async () => {
    const utf8Content = "query 测试 { select * from users where name = '日本語' }";
    const { db, query } = setupQuery({
      "/unicode.pgl": utf8Content,
    });

    const uri = pathToUri("/unicode.pgl");
    const content = await query(db, uri);

    expect(content.success).toBe(true);
    expect(content.content).toBe(utf8Content);
  });

  it("handles empty file", async () => {
    const { db, query } = setupQuery({
      "/empty.pgl": "",
    });

    const uri = pathToUri("/empty.pgl");
    const content = await query(db, uri);

    expect(content.success).toBe(true);
    expect(content.content).toBe("");
  });
});
