import { describe, test, expect, beforeEach } from "vitest";
import { TypeStore } from "@pglambda/types";
import { render } from "@pglambda/utils/doc";
import { emitType } from "../src/type-map.js";

let store: TypeStore;

function emit(type: Parameters<typeof emitType>[0], width = 80): string {
  return render(emitType(type, store), width);
}

beforeEach(() => {
  store = new TypeStore();
});

describe("primitives", () => {
  test("text → string", () => {
    expect(emit(store.primitive("text"))).toMatchInlineSnapshot(`"string"`);
  });

  test("integer → number", () => {
    expect(emit(store.primitive("integer"))).toMatchInlineSnapshot(`"number"`);
  });

  test("smallint → number", () => {
    expect(emit(store.primitive("smallint"))).toMatchInlineSnapshot(`"number"`);
  });

  test("bigint → string", () => {
    expect(emit(store.primitive("bigint"))).toMatchInlineSnapshot(`"string"`);
  });

  test("numeric → string", () => {
    expect(emit(store.primitive("numeric"))).toMatchInlineSnapshot(`"string"`);
  });

  test("boolean → boolean", () => {
    expect(emit(store.primitive("boolean"))).toMatchInlineSnapshot(`"boolean"`);
  });

  test("timestamp → Date", () => {
    expect(emit(store.primitive("timestamp"))).toMatchInlineSnapshot(`"Date"`);
  });

  test("timestamptz → Date", () => {
    expect(emit(store.primitive("timestamptz"))).toMatchInlineSnapshot(`"Date"`);
  });

  test("date → Date", () => {
    expect(emit(store.primitive("date"))).toMatchInlineSnapshot(`"Date"`);
  });

  test("uuid → string", () => {
    expect(emit(store.primitive("uuid"))).toMatchInlineSnapshot(`"string"`);
  });

  test("jsonb → unknown", () => {
    expect(emit(store.primitive("jsonb"))).toMatchInlineSnapshot(`"unknown"`);
  });

  test("bytea → Buffer", () => {
    expect(emit(store.primitive("bytea"))).toMatchInlineSnapshot(`"Buffer"`);
  });

  test("void → void", () => {
    expect(emit(store.primitive("void"))).toMatchInlineSnapshot(`"void"`);
  });
});

describe("compound types", () => {
  test("nullable", () => {
    expect(emit(store.nullable(store.primitive("text")))).toMatchInlineSnapshot(`"string | null"`);
  });

  test("array", () => {
    expect(emit(store.array(store.primitive("integer")))).toMatchInlineSnapshot(`"number[]"`);
  });

  test("nullable array", () => {
    expect(emit(store.nullable(store.array(store.primitive("text"))))).toMatchInlineSnapshot(
      `"string[] | null"`
    );
  });
});

describe("record types", () => {
  test("simple record", () => {
    const rec = store.record({
      id: store.primitive("integer"),
      name: store.primitive("text"),
    });
    expect(emit(rec)).toMatchInlineSnapshot(`"{ id: number; name: string }"`);
  });

  test("record with nullable field", () => {
    const rec = store.record({
      id: store.primitive("integer"),
      email: store.nullable(store.primitive("text")),
    });
    expect(emit(rec)).toMatchInlineSnapshot(`"{ email: string | null; id: number }"`);
  });

  test("empty record", () => {
    const rec = store.record({});
    expect(emit(rec)).toMatchInlineSnapshot(`"Record<string, never>"`);
  });

  test("wide record breaks lines", () => {
    const rec = store.record({
      id: store.primitive("integer"),
      name: store.primitive("text"),
      email: store.primitive("text"),
      created_at: store.primitive("timestamptz"),
      updated_at: store.primitive("timestamptz"),
      is_active: store.primitive("boolean"),
    });
    expect(emit(rec, 40)).toMatchInlineSnapshot(`
      "{
        created_at: Date;
        email: string;
        id: number;
        is_active: boolean;
        name: string;
        updated_at: Date
      }"
    `);
  });
});

describe("SetOf unwrapping", () => {
  test("SetOf<record> unwraps to record", () => {
    const setOfCtor = store.ctors.lookup("SetOf")!;
    const rec = store.record({
      id: store.primitive("integer"),
      name: store.primitive("text"),
    });
    const setOf = store.apply(setOfCtor.id, [rec]);
    expect(emit(setOf)).toMatchInlineSnapshot(`"{ id: number; name: string }"`);
  });
});

describe("fallback", () => {
  test("error type → unknown", () => {
    expect(emit(store.error("oops"))).toMatchInlineSnapshot(`"unknown"`);
  });

  test("typevar → unknown", () => {
    expect(emit(store.typevar())).toMatchInlineSnapshot(`"unknown"`);
  });
});
