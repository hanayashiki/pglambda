import { describe, test, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { FileUri } from "@pglambda/utils";
import { parseContent } from "../src/index.js";
import { AstStore } from "#ast-store.js";
import { PGLParser } from "@pglambda/antlr";

function formatResolutions(source: string, filename: string): string {
  const store = new AstStore();
  const result = parseContent(
    { content: source, uri: `file:///${filename}` as FileUri, success: true },
    { astStore: store },
  );

  if (!result.success) {
    return result.errors.map((e) => `parse error: ${e.message}`).join("\n");
  }

  const lines: string[] = [];

  for (const marker of result.markers) {
    if (!marker.node) {
      lines.push(`${marker.label}: <no node>`);
      continue;
    }

    // Marker lands on identifier; parent is qualified_name
    const qname = marker.node.parentCtx!;
    if (qname.ruleIndex !== PGLParser.RULE_qualified_name) {
      lines.push(`${marker.label}: <not a qualified_name>`);
      continue;
    }

    const defId = store.getResolution(qname.contentHash);
    if (!defId) {
      lines.push(`${marker.label}: <unresolved>`);
      continue;
    }

    const def = store.getDefinition(defId);
    lines.push(`${marker.label}: ${def?.tag}(${def?.name})`);
  }

  return lines.sort((a, b) => a.localeCompare(b)).join("\n");
}

describe("ResolutionVisitor", () => {
  const inputDir = join(
    dirname(fileURLToPath(import.meta.url)),
    "fixtures",
    "resolution",
  );
  const fixtures = readdirSync(inputDir)
    .filter((f) => f.endsWith(".pgl"))
    .sort();

  test.each(fixtures)("resolves %s", (filename: string) => {
    const source = readFileSync(join(inputDir, filename), "utf-8");
    const snapshot = formatResolutions(source, filename);
    expect(snapshot).toMatchFileSnapshot(
      `fixtures/resolution/__snapshots__/${filename}.snap`,
    );
  });

  test("has fixture files", () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });
});
