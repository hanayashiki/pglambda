import { parseContent, type ParseResult } from "@pglambda/parser";
import { defineKeySchema } from "@pglambda/tequila";
import { hostedQuery } from "../../host/index.js";
import type { FileUri } from "../../utils/uri.js";
import { textContentSchema } from "../inputs/text-content.js";

/**
 * Key schema for the parse query.
 * Maps a FileUri to a ParseResult containing the ANTLR parse tree and diagnostics.
 */
export const parseASTSchema = defineKeySchema<FileUri, ParseResult>("parseAST");

/**
 * Parse a .pgl file into an ANTLR parse tree with diagnostic collection.
 *
 * This query depends on `loadTextContent` to get file contents,
 * then delegates to the parser package for the actual parsing.
 */
export const parseAST = hostedQuery(parseASTSchema, async (db, uri, { astStore }) => {
  // Load file content (dependency tracked automatically via db.get)
  const textContent = await db.get(textContentSchema, uri);

  // If file load failed, return error result
  if (!textContent.success) {
    return {
      uri,
      parseTree: null,
      diagnostics: [
        {
          span: {
            file: uri,
            start: { line: 1, column: 0 },
            end: { line: 1, column: 1 },
          },
          severity: "error" as const,
          code: "syntax/unknown",
          message: `Failed to load file: ${uri}`,
        },
      ],
      success: false,
      markers: [],
    };
  }

  return parseContent(textContent, { astStore });
});
