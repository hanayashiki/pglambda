import { editor, languages, Uri, typescript } from "monaco-editor";
import { parseContent, AstStore } from "@pglambda/parser";
import type { FileUri } from "@pglambda/utils";
import { TypeStore } from "@pglambda/types";
import { lowerAndResolve } from "@pglambda/hir";
import { CheckContext } from "@pglambda/checker";
import { TsEmitter } from "@pglambda/emitter-ts";

// ── Compiler pipeline ──
interface CompileResult {
  ok: boolean;
  code: string;
  errors: string[];
}

function pglCompile(source: string): CompileResult {
  const astStore = new AstStore();
  const typeStore = new TypeStore();
  const uri = `file:///playground.pgl` as FileUri;

  const parseResult = parseContent(
    { content: source, uri, success: true },
    { astStore },
  );

  if (!parseResult.success) {
    return {
      ok: false,
      code: "",
      errors: parseResult.errors.map((e) => `Parse error: ${e.message}`),
    };
  }

  const { module, store: hirStore } = lowerAndResolve(
    parseResult.parseTree!,
    uri,
  );

  const ctx = new CheckContext(module, hirStore, typeStore);
  const checkResult = ctx.check();

  if (checkResult.errors.length > 0) {
    return {
      ok: false,
      code: "",
      errors: checkResult.errors.map((e) => `Type error: ${e.message}`),
    };
  }

  const emitter = new TsEmitter();
  const output = emitter.emit({ module, hirStore, checkResult, typeStore });

  if (!output.ok) {
    return {
      ok: false,
      code: "",
      errors: output.errors.map((e) => `Emit error: ${e.message}`),
    };
  }

  return { ok: true, code: output.result.code, errors: [] };
}

// ── Worker setup (must be set before creating any editor) ──
self.MonacoEnvironment = {
  getWorkerUrl(_moduleId: string, label: string) {
    if (label === "typescript" || label === "javascript") {
      return "built/ts.worker.js";
    }
    return "built/editor.worker.js";
  },
};

// ── Examples ──
const examples: Record<string, { pgl: string }> = {
  simple: {
    pgl: `database {
  create table users (
    id integer not null,
    name text not null
  );
}

query get_user_by_id(id: integer) {
  select id, name from users where id = $id
}`,
  },
  params: {
    pgl: `database {
  create table users (
    id integer not null,
    name text not null,
    age integer not null
  );
}

query search(name: text, min_age: integer) {
  select id, name, age
  from users
  where name = $name AND age > $min_age
}`,
  },
  types: {
    pgl: `database {
  create table users (
    id integer not null,
    name text not null,
    email text,
    is_active boolean not null
  );
}

query get_all_users() {
  select id, name, email, is_active from users
}`,
  },
  noparams: {
    pgl: `database {
  create table users (
    id integer not null,
    name text not null
  );
}

query get_users() {
  select id, name from users
}`,
  },
};

// ── Register PGL language ──
languages.register({ id: "pgl" });

languages.setMonarchTokensProvider("pgl", {
  keywords: [
    "query",
    "database",
    "create",
    "table",
    "select",
    "from",
    "where",
    "and",
    "or",
    "not",
    "as",
    "join",
    "on",
    "left",
    "right",
    "inner",
    "outer",
    "group",
    "by",
    "order",
    "having",
    "limit",
    "offset",
    "insert",
    "into",
    "values",
    "update",
    "set",
    "delete",
    "export",
    "import",
    "in",
    "exists",
    "between",
    "like",
    "is",
    "null",
    "true",
    "false",
    "case",
    "when",
    "then",
    "else",
    "end",
    "asc",
    "desc",
    "distinct",
    "count",
    "sum",
    "avg",
    "min",
    "max",
    "primary",
    "key",
    "unique",
    "default",
    "with",
    "without",
    "time",
    "zone",
    "timestamp",
    "interval",
  ],
  typeKeywords: [
    "integer",
    "int4",
    "bigint",
    "smallint",
    "text",
    "varchar",
    "char",
    "boolean",
    "numeric",
    "real",
    "double",
    "precision",
    "timestamp",
    "interval",
    "date",
    "json",
    "jsonb",
    "uuid",
  ],
  operators: [
    "=",
    ">",
    "<",
    ">=",
    "<=",
    "<>",
    "!=",
    "+",
    "-",
    "*",
    "/",
    "||",
  ],
  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  tokenizer: {
    root: [
      [/--.*$/, "comment"],
      [/\$\{/, { token: "delimiter.bracket", next: "@pglExpr" }],
      [/\$[a-zA-Z_]\w*/, "variable"],
      [/\b(not\s+null)\b/i, "keyword"],
      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            "@keywords": "keyword",
            "@typeKeywords": "type",
            "@default": "identifier",
          },
        },
      ],
      [/<\w+(?:\s*,\s*\w+)*>/, "type.identifier"],
      [/\d+(\.\d+)?/, "number"],
      [/'[^']*'/, "string"],
      [/[{}()\[\]]/, "delimiter.bracket"],
      [
        /@symbols/,
        {
          cases: {
            "@operators": "operator",
            "@default": "",
          },
        },
      ],
      [/[,;.]/, "delimiter"],
    ],
    pglExpr: [
      [/[^}]+/, "variable"],
      [/}/, { token: "delimiter.bracket", next: "@pop" }],
    ],
  },
});

// ── Themes ──
editor.defineTheme("pgl-dark", {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "keyword", foreground: "c084fc", fontStyle: "bold" },
    { token: "type", foreground: "22d3ee" },
    { token: "type.identifier", foreground: "22d3ee" },
    { token: "variable", foreground: "fb923c" },
    { token: "string", foreground: "4ade80" },
    { token: "number", foreground: "fbbf24" },
    { token: "comment", foreground: "6b7280", fontStyle: "italic" },
    { token: "operator", foreground: "f472b6" },
    { token: "delimiter.bracket", foreground: "e0e0e8" },
    { token: "identifier", foreground: "e0e0e8" },
  ],
  colors: {
    "editor.background": "#0d0d14",
    "editor.foreground": "#e0e0e8",
    "editor.lineHighlightBackground": "#1a1a2620",
    "editor.selectionBackground": "#7c6cf030",
    "editorCursor.foreground": "#7c6cf0",
    "editorLineNumber.foreground": "#3a3a4a",
    "editorLineNumber.activeForeground": "#7c6cf0",
  },
});

editor.defineTheme("ts-dark", {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#0a0a10",
    "editor.foreground": "#e0e0e8",
    "editor.lineHighlightBackground": "#1a1a2610",
    "editor.selectionBackground": "#22d3ee20",
    "editorCursor.foreground": "#22d3ee",
    "editorLineNumber.foreground": "#3a3a4a",
    "editorLineNumber.activeForeground": "#22d3ee",
    "editorError.foreground": "#F14C4C",
    "editorWarning.foreground": "#CCA700",
  },
});

// ── TypeScript strict mode + runtime type declarations ──
typescript.typescriptDefaults.setCompilerOptions({
  target: typescript.ScriptTarget.ESNext,
  module: typescript.ModuleKind.ESNext,
  strict: true,
  noEmit: true,
  esModuleInterop: true,
  allowNonTsExtensions: true,
});
typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: false,
  noSyntaxValidation: false,
});
typescript.typescriptDefaults.addExtraLib(
  `declare module "@pglambda/runtime" {
  export interface Query<TRow> {
    readonly "~type"?: TRow;
    readonly sql: string;
    readonly params: readonly unknown[];
  }
  export class Param { constructor(value: unknown); readonly value: unknown; }
  export function param(value: unknown): Param;
  export class SqlFragment {
    readonly parts: (string | Param)[];
    build<TRow = unknown>(): Query<TRow>;
  }
  export function sql(strings: TemplateStringsArray, ...values: (Param | SqlFragment)[]): SqlFragment;
  export function raw(s: string): SqlFragment;
  export function join(fragments: SqlFragment[], separator: string): SqlFragment;
}`,
  "file:///node_modules/@pglambda/runtime/index.d.ts",
);

// ── Create editors ──
const pglEditor = editor.create(
  document.getElementById("editor-pgl")!,
  {
    value: examples.simple.pgl,
    language: "pgl",
    theme: "pgl-dark",
    fontSize: 14,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontLigatures: true,
    minimap: { enabled: false },
    padding: { top: 16 },
    lineNumbers: "on",
    renderLineHighlight: "gutter",
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: "on",
    bracketPairColorization: { enabled: true },
    automaticLayout: true,
  },
);

const tsModel = editor.createModel(
  "// Waiting for compiler...",
  "typescript",
  Uri.parse("file:///output.ts"),
);
const tsEditor = editor.create(
  document.getElementById("editor-ts")!,
  {
    model: tsModel,
    theme: "ts-dark",
    fontSize: 14,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontLigatures: true,
    minimap: { enabled: false },
    padding: { top: 16 },
    lineNumbers: "on",
    renderLineHighlight: "gutter",
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    readOnly: true,
    renderValidationDecorations: "on",
    automaticLayout: true,
  },
);

// ── Compile ──
function compile() {
  const dot = document.getElementById("status-dot")!;
  const statusText = document.getElementById("status-text")!;
  const input = pglEditor.getValue();

  let result: CompileResult;
  try {
    result = pglCompile(input);
  } catch (e: any) {
    result = {
      ok: false,
      code: "",
      errors: ["Internal error: " + e.message],
    };
  }

  if (result.ok) {
    tsModel.setValue(result.code);
    dot.className = "status-dot success";
    statusText.textContent = "Compiled successfully";
  } else {
    tsModel.setValue(
      "// Compilation failed\n//\n" +
        result.errors.map((e) => "// " + e).join("\n"),
    );
    dot.className = "status-dot error";
    statusText.textContent =
      result.errors.length + " error" + (result.errors.length > 1 ? "s" : "");
  }
}

// ── Debounced auto-compile on edit ──
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
pglEditor.onDidChangeModelContent(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(compile, 300);
});

// ── Example selector ──
document.getElementById("examples")!.addEventListener("change", (e) => {
  const ex = examples[(e.target as HTMLSelectElement).value];
  if (ex) {
    pglEditor.setValue(ex.pgl);
  }
});

// ── Divider drag ──
const divider = document.getElementById("divider")!;
const container = document.querySelector(".editor-container")!;
const topPane = document.getElementById("left-pane")! as HTMLElement;
const bottomPane = document.getElementById("right-pane")! as HTMLElement;
let dragging = false;

divider.addEventListener("mousedown", () => {
  dragging = true;
  divider.classList.add("dragging");
  document.body.style.cursor = "row-resize";
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  const rect = container.getBoundingClientRect();
  const ratio = (e.clientY - rect.top) / rect.height;
  const clamped = Math.max(0.2, Math.min(0.8, ratio));
  topPane.style.flex = `${clamped}`;
  bottomPane.style.flex = `${1 - clamped}`;
});

document.addEventListener("mouseup", () => {
  if (dragging) {
    dragging = false;
    divider.classList.remove("dragging");
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }
});

// ── Initial compile ──
compile();

