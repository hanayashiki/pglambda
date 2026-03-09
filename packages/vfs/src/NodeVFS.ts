import * as fs from "node:fs/promises";
import * as path from "node:path";
import { Result } from "better-result";
import type { VFS, VFSError, GlobOptions } from "./VFS.js";

export class NodeVFS implements VFS {
  private workspacePaths: string[];

  constructor(workspacePaths: string[] = []) {
    this.workspacePaths = workspacePaths.map((p) => path.resolve(p));
  }

  private isInsideWorkspace(filePath: string): boolean {
    if (this.workspacePaths.length === 0) {
      return true; // No workspace restriction
    }
    const normalizedPath = path.resolve(filePath);
    return this.workspacePaths.some((wsPath) =>
      normalizedPath.startsWith(path.resolve(wsPath) + path.sep)
    );
  }

  async readFile(filePath: string): Promise<Result<string, VFSError>> {
    if (this.workspacePaths.length === 0) {
      return Result.err({
        type: "singleFile",
        path: filePath,
        message: "In Single File mode, reading unopened file is forbidden",
      });
    }

    if (!this.isInsideWorkspace(filePath)) {
      return Result.err({ type: "outsideWorkspace", path: filePath });
    }

    try {
      const content = await fs.readFile(filePath, "utf-8");
      return Result.ok(content);
    } catch (error) {
      return Result.err(this.mapError(filePath, error));
    }
  }

  async writeFile(filePath: string, content: string): Promise<Result<void, VFSError>> {
    if (!this.isInsideWorkspace(filePath)) {
      return Result.err({ type: "outsideWorkspace", path: filePath });
    }

    try {
      await fs.writeFile(filePath, content, "utf-8");
      return Result.ok(undefined);
    } catch (error) {
      return Result.err(this.mapError(filePath, error));
    }
  }

  async glob(pattern: string | string[], options: GlobOptions): Promise<string[]> {
    const results: string[] = [];

    for await (const entry of fs.glob(pattern, {
      cwd: options.cwd,
      exclude: options.exclude,
    })) {
      const fullPath = path.resolve(options.cwd, entry);

      // Skip if any ancestor directory is a symlink (don't follow directory symlinks)
      if (await this.hasSymlinkAncestor(fullPath, options.cwd)) {
        continue;
      }

      // Skip files outside workspace
      if (!this.isInsideWorkspace(fullPath)) {
        continue;
      }

      results.push(fullPath);
    }
    return results;
  }

  private async hasSymlinkAncestor(filePath: string, cwd: string): Promise<boolean> {
    let current = path.dirname(filePath);
    const normalizedCwd = path.resolve(cwd);

    while (current !== normalizedCwd && current !== path.dirname(current)) {
      try {
        const stat = await fs.lstat(current);
        if (stat.isSymbolicLink()) {
          return true;
        }
      } catch {
        return true;
      }
      current = path.dirname(current);
    }
    return false;
  }

  private mapError(filePath: string, error: unknown): VFSError {
    if (error instanceof Error && "code" in error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code === "ENOENT") {
        return { type: "notFound", path: filePath };
      }
      if (code === "EACCES" || code === "EPERM") {
        return { type: "permissionDenied", path: filePath };
      }
    }
    const message = error instanceof Error ? error.message : String(error);
    return { type: "unknown", path: filePath, message };
  }
}
