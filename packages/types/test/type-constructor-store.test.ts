import { describe, test, expect, beforeEach } from "vitest";
import { TypeConstructorStore } from "../src/type-constructor-store.js";

describe("TypeConstructorStore", () => {
  let store: TypeConstructorStore;

  beforeEach(() => {
    store = new TypeConstructorStore();
  });

  test("builtins are registered on construction", () => {
    const setOf = store.lookup("SetOf");
    expect(setOf).toBeDefined();
    expect(setOf!.name).toBe("SetOf");
    expect(setOf!.parameters).toEqual(["RowType"]);
  });

  test("can lookup constructor by ID", () => {
    const setOfCtor = store.lookup("SetOf");
    expect(setOfCtor).toBeDefined();
    const ctor = store.get(setOfCtor!.id);
    expect(ctor.name).toBe("SetOf");
  });

  test("returns undefined for unknown constructor", () => {
    const ctor = store.lookup("UnknownType");
    expect(ctor).toBeUndefined();
  });

  test("throws error when getting constructor by invalid ID", () => {
    expect(() => {
      store.get(999 as any);
    }).toThrow(/Type constructor with ID 999 not found/);
  });

  test("getName returns constructor name", () => {
    const setOfCtor = store.lookup("SetOf");
    expect(setOfCtor).toBeDefined();
    const name = store.getName(setOfCtor!.id);
    expect(name).toBe("SetOf");
  });
});
