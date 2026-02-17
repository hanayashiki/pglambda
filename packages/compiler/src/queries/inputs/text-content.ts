import { defineKeySchema } from "@pglambda/tequila";
import { hostedQuery } from "../../host/index.js";
import { type FileUri, uriToPath } from "../../utils/uri.js";
import type { TextContent } from "@pglambda/utils";

export const textContentSchema = defineKeySchema<FileUri, TextContent>(
  "textContent",
);

export const loadTextContent = hostedQuery(async (_, uri, ctx) => {
  const path = uriToPath(uri);
  const result = await ctx.vfs.readFile(path);

  if (result.isOk()) {
    return {
      uri,
      content: result.value,
      success: true,
    };
  } else {
    // On error, return empty content with success=false
    // This allows downstream queries to handle missing files gracefully
    return {
      uri,
      content: "",
      success: false,
    };
  }
});
