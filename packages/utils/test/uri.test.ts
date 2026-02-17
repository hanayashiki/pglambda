import { describe, it, expect } from "vitest";
import { pathToUri, uriToPath, type FileUri } from "../src/uri.js";

describe("pathToUri", () => {
  it("converts a simple Unix path", () => {
    expect(pathToUri("/home/user/file.pgl")).toBe("file:///home/user/file.pgl");
  });

  it("normalizes Windows backslashes to forward slashes", () => {
    expect(pathToUri("C:\\Users\\user\\file.pgl")).toBe(
      "file:///C:/Users/user/file.pgl",
    );
  });

  it("escapes spaces in the path", () => {
    expect(pathToUri("/home/user/my file.pgl")).toBe(
      "file:///home/user/my%20file.pgl",
    );
  });
});

describe("uriToPath", () => {
  it("handles lowercase drive letter from VSCode-style URIs", () => {
    // VSCode normalizes drive letters to lowercase: file:///c:/...
    const uri = "file:///c:/Users/user/file.pgl" as FileUri;
    expect(uriToPath(uri)).toBe("c:/Users/user/file.pgl");
  });

  it("converts a simple file URI back to a Unix path", () => {
    const uri = pathToUri("/home/user/file.pgl");
    expect(uriToPath(uri)).toBe("/home/user/file.pgl");
  });

  it("roundtrips a path with special characters", () => {
    const original = "/home/user/my project/résumé.pgl";
    expect(uriToPath(pathToUri(original))).toBe(original);
  });
});
