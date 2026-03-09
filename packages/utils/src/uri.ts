export type FileUri = string & { __brand: "FileUri" };

/**
 * Convert a file URI to a file system path using standard URL API
 * Works in both Node.js and browser environments
 * @example uriToPath("file:///test.pgl") => "/test.pgl"
 * @example uriToPath("file:///C:/test.pgl") => "C:/test.pgl" (Windows)
 */
export function uriToPath(uri: FileUri): string {
  const url = new URL(uri);

  if (url.protocol !== "file:") {
    throw new Error(`Expected file: protocol, got ${url.protocol}`);
  }

  let path = decodeURIComponent(url.pathname);

  // On Windows, pathname is /C:/path, need to remove leading slash
  if (/^\/[A-Za-z]:/.test(path)) {
    path = path.substring(1);
  }

  return path;
}

/**
 * Convert a file system path to a file URI using standard URL API
 * Works in both Node.js and browser environments
 * @example pathToUri("/test.pgl") => "file:///test.pgl"
 * @example pathToUri("C:/test.pgl") => "file:///C:/test.pgl" (Windows)
 */
export function pathToUri(path: string): FileUri {
  // Normalize path separators to forward slashes
  const normalizedPath = path.replace(/\\/g, "/");

  // Handle Windows paths: C:/path -> /C:/path for URL
  const urlPath = /^[A-Za-z]:/.test(normalizedPath) ? "/" + normalizedPath : normalizedPath;

  // Ensure absolute path starts with /
  const absolutePath = urlPath.startsWith("/") ? urlPath : "/" + urlPath;

  // Use URL constructor to properly encode the path
  const url = new URL(`file://${absolutePath}`);

  return url.href as FileUri;
}
