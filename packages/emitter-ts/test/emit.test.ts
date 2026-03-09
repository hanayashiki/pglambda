import { describe, test, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { emitTs } from "./emit-helper.js";

describe("Emitter (PGL → TypeScript) Snapshot Tests", () => {
  const inputDir = join(dirname(fileURLToPath(import.meta.url)), "input");
  const fixtures = readdirSync(inputDir)
    .filter((f) => f.endsWith(".pgl"))
    .sort();

  test.each(fixtures)("emits %s", async (filename: string) => {
    const filepath = join(inputDir, filename);
    const input = readFileSync(filepath, "utf-8");

    const snapshot = emitTs(input, filename);

    await expect(snapshot).toMatchFileSnapshot(`input/${filename.replace(/\..+$/, ".snap.ts")}`);
  });

  test("has fixture files", () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });
});
