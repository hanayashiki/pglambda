// Browser shim for Node's "module" builtin.
// antlr4 calls createRequire(import.meta.url)("fs") — we return a stub require
// that provides a no-op fs (FileStream is never used in the playground).
export function createRequire() {
  return function require(id) {
    if (id === "fs") {
      return {
        readFile() { throw new Error("fs.readFile not available in browser"); },
        readFileSync() { throw new Error("fs.readFileSync not available in browser"); },
      };
    }
    throw new Error(`Cannot require "${id}" in browser`);
  };
}
