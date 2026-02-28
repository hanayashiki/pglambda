// Browser shim — fs is never actually called in the playground
export function readFile() { throw new Error("fs not available in browser"); }
export function readFileSync() { throw new Error("fs not available in browser"); }
