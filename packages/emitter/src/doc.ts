/**
 * Wadler-Lindig pretty printer document algebra.
 *
 * A Doc describes a layout with flexible line breaks. The renderer decides
 * whether to flatten a group onto one line or break it based on available width.
 */
export type Doc =
  | { readonly tag: "nil" }
  | { readonly tag: "text"; readonly text: string }
  | { readonly tag: "line"; readonly flat: string }
  | { readonly tag: "nest"; readonly n: number; readonly doc: Doc }
  | { readonly tag: "group"; readonly doc: Doc }
  | { readonly tag: "concat"; readonly docs: readonly Doc[] };

// ---------------------------------------------------------------------------
// Combinators
// ---------------------------------------------------------------------------

/** Empty document — renders to nothing. */
export const nil: Doc = { tag: "nil" };

/** Literal text (must not contain newlines). */
export function text(s: string): Doc {
  if (s === "") return nil;
  return { tag: "text", text: s };
}

/** Soft line break: newline when broken, space when flat. */
export const line: Doc = { tag: "line", flat: " " };

/** Soft line break: newline when broken, empty when flat. */
export const softline: Doc = { tag: "line", flat: "" };

/** Hard line break: always a newline, even inside a flattened group. */
export const hardline: Doc = { tag: "line", flat: "\n" };

/** Increase indentation for the inner doc. */
export function nest(n: number, doc: Doc): Doc {
  return { tag: "nest", n, doc };
}

/** Try to flatten the inner doc onto one line; break if it doesn't fit. */
export function group(doc: Doc): Doc {
  return { tag: "group", doc };
}

/** Concatenate multiple docs. */
export function concat(...docs: Doc[]): Doc {
  // Flatten nested concats and remove nils
  const flat: Doc[] = [];
  for (const d of docs) {
    if (d.tag === "nil") continue;
    if (d.tag === "concat") {
      flat.push(...d.docs);
    } else {
      flat.push(d);
    }
  }
  if (flat.length === 0) return nil;
  if (flat.length === 1) return flat[0];
  return { tag: "concat", docs: flat };
}

/** Join docs with a separator between each pair. */
export function join(sep: Doc, docs: readonly Doc[]): Doc {
  const parts: Doc[] = [];
  for (let i = 0; i < docs.length; i++) {
    if (i > 0) parts.push(sep);
    parts.push(docs[i]);
  }
  return concat(...parts);
}

// ---------------------------------------------------------------------------
// Renderer — stack-based Wadler-Lindig algorithm
// ---------------------------------------------------------------------------

const enum Mode {
  Flat = 0,
  Break = 1,
}

type Cmd = { indent: number; mode: Mode; doc: Doc };

/** Measure whether a doc fits in `remaining` columns when rendered flat. */
function fits(remaining: number, cmds: Cmd[]): boolean {
  let rem = remaining;
  const stack = cmds.slice(); // shallow copy
  while (stack.length > 0) {
    const cmd = stack.pop()!;
    const { indent, mode, doc } = cmd;
    switch (doc.tag) {
      case "nil":
        break;
      case "text":
        rem -= doc.text.length;
        break;
      case "line":
        if (doc.flat === "\n") return false; // hardline never fits flat
        if (mode === Mode.Flat) {
          rem -= doc.flat.length;
        } else {
          return true; // line break always fits
        }
        break;
      case "nest":
        stack.push({ indent: indent + doc.n, mode, doc: doc.doc });
        break;
      case "group":
        stack.push({ indent, mode: Mode.Flat, doc: doc.doc });
        break;
      case "concat":
        for (let i = doc.docs.length - 1; i >= 0; i--) {
          stack.push({ indent, mode, doc: doc.docs[i] });
        }
        break;
    }
    if (rem < 0) return false;
  }
  return true;
}

/**
 * Render a Doc to a string.
 * @param doc The document to render
 * @param width Maximum line width (default 80)
 */
export function render(doc: Doc, width = 80): string {
  const out: string[] = [];
  let col = 0;
  const stack: Cmd[] = [{ indent: 0, mode: Mode.Break, doc }];

  while (stack.length > 0) {
    const cmd = stack.pop()!;
    const { indent, mode, doc: d } = cmd;

    switch (d.tag) {
      case "nil":
        break;

      case "text":
        out.push(d.text);
        col += d.text.length;
        break;

      case "line":
        if (mode === Mode.Flat && d.flat !== "\n") {
          out.push(d.flat);
          col += d.flat.length;
        } else {
          out.push("\n" + " ".repeat(indent));
          col = indent;
        }
        break;

      case "nest":
        stack.push({ indent: indent + d.n, mode, doc: d.doc });
        break;

      case "group": {
        // Try flat first — if it fits, use flat mode
        const flatCmd: Cmd = { indent, mode: Mode.Flat, doc: d.doc };
        if (fits(width - col, [flatCmd])) {
          stack.push(flatCmd);
        } else {
          stack.push({ indent, mode: Mode.Break, doc: d.doc });
        }
        break;
      }

      case "concat":
        // Push in reverse so first doc is on top
        for (let i = d.docs.length - 1; i >= 0; i--) {
          stack.push({ indent, mode, doc: d.docs[i] });
        }
        break;
    }
  }

  return out.join("");
}
