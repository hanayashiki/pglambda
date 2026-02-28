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

// esbuild is installed globally — call it as a CLI
execFileSync(
  "esbuild",
  [
    resolve(root, "docs/playground-entry.ts"),
    "--bundle",
    "--format=esm",
    "--platform=browser",
    `--outfile=${resolve(root, "docs/src/built/playground-bundle.js")}`,
    "--target=es2022",
    `--alias:module=${resolve(root, "docs/shims/module.mjs")}`,
    `--alias:fs=${resolve(root, "docs/shims/fs.mjs")}`,
  ],
  { stdio: "inherit", cwd: root },
);

console.info("✅ playground-bundle.js built");
