/**
 * Build the pglambda playground bundle for the browser.
 * Run from repo root: node docs/build-playground.mjs
 * Or from docs/:      node build-playground.mjs
 *
 * Output goes to docs/src/built/ so mdbook copies it into the book.
 */
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const outDir = resolve(root, "docs/src/built");

// Monaco editor workers (bundled separately, loaded via MonacoEnvironment.getWorkerUrl)
execFileSync(
  "esbuild",
  [
    resolve(root, "docs/node_modules/monaco-editor/esm/vs/editor/editor.worker.js"),
    "--bundle",
    "--format=esm",
    "--platform=browser",
    `--outfile=${resolve(outDir, "editor.worker.js")}`,
    "--target=es2022",
  ],
  { stdio: "inherit", cwd: root },
);
console.info("✅ editor.worker.js built");

execFileSync(
  "esbuild",
  [
    resolve(root, "docs/node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js"),
    "--bundle",
    "--format=esm",
    "--platform=browser",
    `--outfile=${resolve(outDir, "ts.worker.js")}`,
    "--target=es2022",
  ],
  { stdio: "inherit", cwd: root },
);
console.info("✅ ts.worker.js built");

// Playground app (Monaco editor setup + UI logic)
execFileSync(
  "esbuild",
  [
    resolve(root, "docs/src/playground-app.ts"),
    "--bundle",
    "--format=esm",
    "--platform=browser",
    `--outfile=${resolve(outDir, "playground-app.js")}`,
    "--target=es2022",
    "--loader:.ttf=file",
    `--alias:module=${resolve(root, "docs/shims/module.mjs")}`,
    `--alias:fs=${resolve(root, "docs/shims/fs.mjs")}`,
  ],
  { stdio: "inherit", cwd: root },
);
console.info("✅ playground-app.js built");
