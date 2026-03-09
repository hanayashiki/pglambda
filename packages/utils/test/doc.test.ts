import { describe, test, expect } from "vitest";
import {
  nil,
  text,
  line,
  softline,
  hardline,
  nest,
  group,
  concat,
  join,
  render,
} from "../src/doc.js";

describe("Doc combinators", () => {
  test("nil renders empty", () => {
    expect(render(nil)).toMatchInlineSnapshot(`""`);
  });

  test("text renders literal", () => {
    expect(render(text("hello"))).toMatchInlineSnapshot(`"hello"`);
  });

  test("empty text returns nil", () => {
    expect(text("")).toBe(nil);
  });

  test("concat joins docs", () => {
    expect(render(concat(text("a"), text("b"), text("c")))).toMatchInlineSnapshot(`"abc"`);
  });

  test("concat flattens nested concats", () => {
    const doc = concat(text("a"), concat(text("b"), text("c")));
    expect(render(doc)).toMatchInlineSnapshot(`"abc"`);
  });

  test("concat removes nils", () => {
    const doc = concat(nil, text("a"), nil, text("b"));
    expect(render(doc)).toMatchInlineSnapshot(`"ab"`);
  });

  test("hardline always breaks", () => {
    const doc = concat(text("a"), hardline, text("b"));
    expect(render(doc)).toMatchInlineSnapshot(`
      "a
      b"
    `);
  });

  test("join with separator", () => {
    const doc = join(text(", "), [text("a"), text("b"), text("c")]);
    expect(render(doc)).toMatchInlineSnapshot(`"a, b, c"`);
  });

  test("join empty list", () => {
    expect(render(join(text(", "), []))).toMatchInlineSnapshot(`""`);
  });

  test("join single element", () => {
    expect(render(join(text(", "), [text("a")]))).toMatchInlineSnapshot(`"a"`);
  });
});

describe("group + line", () => {
  test("group flattens when it fits", () => {
    const doc = group(concat(text("a"), line, text("b")));
    expect(render(doc, 80)).toMatchInlineSnapshot(`"a b"`);
  });

  test("group breaks when too wide", () => {
    const doc = group(concat(text("a"), line, text("b")));
    expect(render(doc, 2)).toMatchInlineSnapshot(`
      "a
      b"
    `);
  });

  test("softline vanishes when flat", () => {
    const doc = group(concat(text("a"), softline, text("b")));
    expect(render(doc, 80)).toMatchInlineSnapshot(`"ab"`);
  });

  test("softline breaks when too wide", () => {
    const doc = group(concat(text("a"), softline, text("b")));
    expect(render(doc, 1)).toMatchInlineSnapshot(`
      "a
      b"
    `);
  });
});

describe("nest", () => {
  test("nest indents after line break", () => {
    const doc = group(
      concat(text("{"), nest(2, concat(line, text("a"), line, text("b"))), line, text("}"))
    );
    expect(render(doc, 5)).toMatchInlineSnapshot(`
      "{
        a
        b
      }"
    `);
  });

  test("nest does not affect flat mode", () => {
    const doc = group(concat(text("{"), nest(2, concat(line, text("a"))), line, text("}")));
    expect(render(doc, 80)).toMatchInlineSnapshot(`"{ a }"`);
  });
});

describe("realistic: TS record type", () => {
  function recordDoc(fields: string[][]) {
    const entries = fields.map(([name, type]) => concat(text(name), text(": "), text(type)));
    return group(
      concat(
        text("{"),
        nest(2, concat(line, join(concat(text(";"), line), entries))),
        line,
        text("}")
      )
    );
  }

  test("short record stays on one line", () => {
    const doc = recordDoc([
      ["id", "number"],
      ["name", "string"],
    ]);
    expect(render(doc, 80)).toMatchInlineSnapshot(`"{ id: number; name: string }"`);
  });

  test("long record breaks across lines", () => {
    const doc = recordDoc([
      ["id", "number"],
      ["name", "string"],
      ["email", "string"],
      ["created_at", "Date"],
      ["updated_at", "Date"],
    ]);
    expect(render(doc, 40)).toMatchInlineSnapshot(`
      "{
        id: number;
        name: string;
        email: string;
        created_at: Date;
        updated_at: Date
      }"
    `);
  });
});

describe("realistic: SQL template", () => {
  test("short query stays on one line", () => {
    const doc = group(concat(text("SELECT "), text("id, name"), text(" FROM "), text("users")));
    expect(render(doc, 80)).toMatchInlineSnapshot(`"SELECT id, name FROM users"`);
  });

  test("long query breaks at clauses", () => {
    const targets = join(concat(text(","), line), [
      text("id"),
      text("name"),
      text("email"),
      text("created_at"),
    ]);
    const doc = group(
      concat(
        text("SELECT "),
        nest(2, targets),
        line,
        text("FROM users"),
        line,
        text("WHERE id = $1")
      )
    );
    expect(render(doc, 30)).toMatchInlineSnapshot(`
      "SELECT id,
        name,
        email,
        created_at
      FROM users
      WHERE id = $1"
    `);
  });
});
