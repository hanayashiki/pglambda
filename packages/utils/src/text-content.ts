import type { FileUri } from "./uri";

export type TextContent = {
  uri: FileUri;
  content: string;
  /**
   * Whether we successfully read the file content.
   */
  success: boolean;
};
