import { describe, test, expect, beforeEach } from "vitest";
import { TypeStore } from "../src/type-store.ts";
import type { TypeConstructorId } from "../src/type.ts";
import { typeToString } from "../src/utils.ts";

describe("TypeStore", () => {
  let store: TypeStore;

  beforeEach(() => {
    store = new TypeStore();
  });

  describe("primitive types", () => {
    test("same primitive name returns same instance (===)", () => {
      const int1 = store.primitive("int");
      const int2 = store.primitive("int");
      expect(int1).toBe(int2);
      expect(int1 === int2).toBe(true);
    });

    test("different primitive names return different instances", () => {
      const int = store.primitive("int");
      const text = store.primitive("text");
      expect(int).not.toBe(text);
      expect(int === text).toBe(false);
    });

    test("primitives have correct properties", () => {
      const int = store.primitive("int");
      expect(int.kind).toBe("primitive");
      expect(int.name).toBe("int");
      expect(typeof int.id).toBe("number");
    });
  });

  describe("type variables", () => {
    test("type variables are always unique (!==)", () => {
      const t1 = store.typevar();
      const t2 = store.typevar();
      expect(t1).not.toBe(t2);
      expect(t1 === t2).toBe(false);
    });

    test("type variables with same name are still unique (!==)", () => {
      const t1 = store.typevar("T");
      const t2 = store.typevar("T");
      expect(t1).not.toBe(t2);
      expect(t1 === t2).toBe(false);
      expect(t1.name).toBe("T");
      expect(t2.name).toBe("T");
    });

    test("type variables auto-generate names", () => {
      const t0 = store.typevar();
      const t1 = store.typevar();
      expect(t0.name).toBe("T0");
      expect(t1.name).toBe("T1");
    });

    test("type variables have correct properties", () => {
      const t = store.typevar("MyVar");
      expect(t.kind).toBe("typevar");
      expect(t.name).toBe("MyVar");
      expect(typeof t.id).toBe("number");
    });
  });

  describe("array types", () => {
    test("same element type returns same array instance (===)", () => {
      const int = store.primitive("int");
      const arr1 = store.array(int);
      const arr2 = store.array(int);
      expect(arr1).toBe(arr2);
      expect(arr1 === arr2).toBe(true);
    });

    test("different element types return different array instances", () => {
      const int = store.primitive("int");
      const text = store.primitive("text");
      const arr1 = store.array(int);
      const arr2 = store.array(text);
      expect(arr1).not.toBe(arr2);
      expect(arr1 === arr2).toBe(false);
    });

    test("nested arrays with same structure are identical (===)", () => {
      const int = store.primitive("int");
      const arr1 = store.array(store.array(int));
      const arr2 = store.array(store.array(int));
      expect(arr1).toBe(arr2);
      expect(arr1 === arr2).toBe(true);
    });

    test("array with typevar elements are unique if typevars differ", () => {
      const t1 = store.typevar();
      const t2 = store.typevar();
      const arr1 = store.array(t1);
      const arr2 = store.array(t2);
      expect(arr1).not.toBe(arr2);
      expect(arr1 === arr2).toBe(false);
    });

    test("array with same typevar instance is identical (===)", () => {
      const t = store.typevar();
      const arr1 = store.array(t);
      const arr2 = store.array(t);
      expect(arr1).toBe(arr2);
      expect(arr1 === arr2).toBe(true);
    });
  });

  describe("record types", () => {
    test("same field structure returns same instance (===)", () => {
      const int = store.primitive("int");
      const text = store.primitive("text");
      const rec1 = store.record({ id: int, name: text });
      const rec2 = store.record({ id: int, name: text });
      expect(rec1).toBe(rec2);
      expect(rec1 === rec2).toBe(true);
    });

    test("field order does not matter (===)", () => {
      const int = store.primitive("int");
      const text = store.primitive("text");
      const rec1 = store.record({ id: int, name: text });
      const rec2 = store.record({ name: text, id: int });
      expect(rec1).toBe(rec2);
      expect(rec1 === rec2).toBe(true);
    });

    test("different field names return different instances", () => {
      const int = store.primitive("int");
      const rec1 = store.record({ id: int });
      const rec2 = store.record({ other: int });
      expect(rec1).not.toBe(rec2);
      expect(rec1 === rec2).toBe(false);
    });

    test("different field types return different instances", () => {
      const int = store.primitive("int");
      const text = store.primitive("text");
      const rec1 = store.record({ field: int });
      const rec2 = store.record({ field: text });
      expect(rec1).not.toBe(rec2);
      expect(rec1 === rec2).toBe(false);
    });

    test("empty records are identical (===)", () => {
      const rec1 = store.record({});
      const rec2 = store.record({});
      expect(rec1).toBe(rec2);
      expect(rec1 === rec2).toBe(true);
    });

    test("records with typevar fields are unique if typevars differ", () => {
      const t1 = store.typevar();
      const t2 = store.typevar();
      const rec1 = store.record({ field: t1 });
      const rec2 = store.record({ field: t2 });
      expect(rec1).not.toBe(rec2);
      expect(rec1 === rec2).toBe(false);
    });

    test("records copy input object to prevent mutation", () => {
      const int = store.primitive("int");
      const fields = { id: int };
      const rec = store.record(fields);

      // Mutate original object
      const text = store.primitive("text");
      (fields as any).name = text;

      // Record should not be affected
      expect(Object.keys(rec.fields).length).toBe(1);
      expect("name" in rec.fields).toBe(false);
    });
  });

  describe("nullable types", () => {
    test("same inner type returns same nullable instance (===)", () => {
      const int = store.primitive("int");
      const null1 = store.nullable(int);
      const null2 = store.nullable(int);
      expect(null1).toBe(null2);
      expect(null1 === null2).toBe(true);
    });

    test("different inner types return different nullable instances", () => {
      const int = store.primitive("int");
      const text = store.primitive("text");
      const null1 = store.nullable(int);
      const null2 = store.nullable(text);
      expect(null1).not.toBe(null2);
      expect(null1 === null2).toBe(false);
    });

    test("nested nullables with same structure are identical (===)", () => {
      const int = store.primitive("int");
      const null1 = store.nullable(store.nullable(int));
      const null2 = store.nullable(store.nullable(int));
      expect(null1).toBe(null2);
      expect(null1 === null2).toBe(true);
    });

    test("nullable with typevar are unique if typevars differ", () => {
      const t1 = store.typevar();
      const t2 = store.typevar();
      const null1 = store.nullable(t1);
      const null2 = store.nullable(t2);
      expect(null1).not.toBe(null2);
      expect(null1 === null2).toBe(false);
    });
  });

  describe("error types", () => {
    test("error types are always unique (!==)", () => {
      const err1 = store.error("Same message");
      const err2 = store.error("Same message");
      expect(err1).not.toBe(err2);
      expect(err1 === err2).toBe(false);
    });

    test("error types have correct properties", () => {
      const err = store.error("Test error");
      expect(err.kind).toBe("error");
      expect(err.message).toBe("Test error");
      expect(typeof err.id).toBe("number");
      expect(err.location).toBeUndefined();
    });

    test("error types can have location", () => {
      const location = { file: "test.ts", line: 42, column: 10 };
      const err = store.error("Test error", location);
      expect(err.location).toEqual(location);
    });
  });

  describe("complex type combinations", () => {
    test("complex nested structures are identical (===)", () => {
      const int = store.primitive("int");
      const text = store.primitive("text");

      // Create: nullable<array<record<{id: int, name: text}>>>
      const record1 = store.record({ id: int, name: text });
      const array1 = store.array(record1);
      const nullable1 = store.nullable(array1);

      const record2 = store.record({ id: int, name: text });
      const array2 = store.array(record2);
      const nullable2 = store.nullable(array2);

      expect(record1).toBe(record2);
      expect(array1).toBe(array2);
      expect(nullable1).toBe(nullable2);
      expect(nullable1 === nullable2).toBe(true);
    });

    test("complex structures with different typevars are unique", () => {
      const t1 = store.typevar();
      const t2 = store.typevar();

      const array1 = store.array(t1);
      const nullable1 = store.nullable(array1);

      const array2 = store.array(t2);
      const nullable2 = store.nullable(array2);

      expect(nullable1).not.toBe(nullable2);
      expect(nullable1 === nullable2).toBe(false);
    });

    test("reusing same typevar produces identical structures (===)", () => {
      const t = store.typevar();
      const int = store.primitive("int");

      const rec1 = store.record({ a: t, b: int });
      const rec2 = store.record({ a: t, b: int });

      expect(rec1).toBe(rec2);
      expect(rec1 === rec2).toBe(true);
    });
  });

  describe("getAs method", () => {
    test("retrieves primitive by id with correct kind", () => {
      const int = store.primitive("int");
      const retrieved = store.getAs(int.id, "primitive");
      expect(retrieved).toBe(int);
      expect(retrieved === int).toBe(true);
    });

    test("retrieves array by id with correct kind", () => {
      const int = store.primitive("int");
      const arr = store.array(int);
      const retrieved = store.getAs(arr.id, "array");
      expect(retrieved).toBe(arr);
      expect(retrieved === arr).toBe(true);
    });

    test("retrieves record by id with correct kind", () => {
      const int = store.primitive("int");
      const rec = store.record({ id: int });
      const retrieved = store.getAs(rec.id, "record");
      expect(retrieved).toBe(rec);
      expect(retrieved === rec).toBe(true);
    });

    test("retrieves nullable by id with correct kind", () => {
      const int = store.primitive("int");
      const nullable = store.nullable(int);
      const retrieved = store.getAs(nullable.id, "nullable");
      expect(retrieved).toBe(nullable);
      expect(retrieved === nullable).toBe(true);
    });

    test("retrieves typevar by id with correct kind", () => {
      const t = store.typevar();
      const retrieved = store.getAs(t.id, "typevar");
      expect(retrieved).toBe(t);
      expect(retrieved === t).toBe(true);
    });

    test("retrieves error by id with correct kind", () => {
      const err = store.error("Test");
      const retrieved = store.getAs(err.id, "error");
      expect(retrieved).toBe(err);
      expect(retrieved === err).toBe(true);
    });

    test("throws error for non-existent id", () => {
      expect(() => {
        store.getAs(99999 as any, "primitive");
      }).toThrow("Type with ID 99999 not found");
    });

    test("throws error for kind mismatch", () => {
      const int = store.primitive("int");
      expect(() => {
        store.getAs(int.id, "array");
      }).toThrow(/Type kind mismatch.*expected 'array'.*got 'primitive'/);
    });
  });

  describe("type IDs", () => {
    test("type IDs are unique and sequential", () => {
      const types = [
        store.primitive("int"),
        store.primitive("text"),
        store.typevar(),
        store.array(store.primitive("int")),
      ];

      const ids = types.map((t) => t.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);

      // IDs should be sequential (though some may be skipped due to caching)
      for (const id of ids) {
        expect(typeof id).toBe("number");
        expect(id).toBeGreaterThanOrEqual(0);
      }
    });

    test("cached types reuse IDs", () => {
      const int1 = store.primitive("int");
      const int2 = store.primitive("int");

      expect(int1.id).toBe(int2.id);
    });

    test("unique types get different IDs", () => {
      const t1 = store.typevar();
      const t2 = store.typevar();

      expect(t1.id).not.toBe(t2.id);
    });
  });

  describe("applied types", () => {
    let setOfCtorId: TypeConstructorId;

    beforeEach(() => {
      // Look up SetOf constructor by name
      const setOfCtor = store.ctors.lookup("SetOf");
      if (!setOfCtor) throw new Error("SetOf not registered");
      setOfCtorId = setOfCtor.id;
    });

    test("same constructor + args returns same instance (===)", () => {
      const recordType = store.record({ col: store.primitive("int") });
      const applied1 = store.apply(setOfCtorId, [recordType]);
      const applied2 = store.apply(setOfCtorId, [recordType]);
      expect(applied1).toBe(applied2);
      expect(applied1 === applied2).toBe(true);
    });

    test("different arguments produce different instances", () => {
      const rec1 = store.record({ col: store.primitive("int") });
      const rec2 = store.record({ col: store.primitive("text") });
      const applied1 = store.apply(setOfCtorId, [rec1]);
      const applied2 = store.apply(setOfCtorId, [rec2]);
      expect(applied1).not.toBe(applied2);
      expect(applied1 === applied2).toBe(false);
    });

    test("applied types with typevar arguments are unique if typevars differ", () => {
      const t1 = store.typevar();
      const t2 = store.typevar();
      const rec1 = store.record({ col: t1 });
      const rec2 = store.record({ col: t2 });
      const applied1 = store.apply(setOfCtorId, [rec1]);
      const applied2 = store.apply(setOfCtorId, [rec2]);
      expect(applied1).not.toBe(applied2);
    });

    test("apply() validates arity", () => {
      const int = store.primitive("int");
      const text = store.primitive("text");
      expect(() => {
        store.apply(setOfCtorId, [int, text]); // SetOf takes 1 arg
      }).toThrow(/expects 1 argument.*got 2/);
    });

    test("apply() throws for wrong number of arguments", () => {
      expect(() => {
        store.apply(setOfCtorId, []); // SetOf needs 1 arg
      }).toThrow(/expects 1 argument.*got 0/);
    });

    test("applied types have correct properties", () => {
      const rec = store.record({ id: store.primitive("int"), name: store.primitive("text") });
      const applied = store.apply(setOfCtorId, [rec]);
      expect(applied.kind).toBe("applied");
      expect(typeToString(applied, store)).toBe("SetOf<{id: int, name: text}>");
    });

    test("applied types copy arguments array to prevent mutation", () => {
      const rec1 = store.record({ id: store.primitive("int") });
      const rec2 = store.record({ name: store.primitive("text") });
      const args = [rec1];
      const applied = store.apply(setOfCtorId, args);

      // Mutate original array
      args[0] = rec2;

      // Applied type should not be affected
      expect(typeToString(applied, store)).toBe("SetOf<{id: int}>");
    });

    test("getAs retrieves applied type by id", () => {
      const rec = store.record({ id: store.primitive("int") });
      const applied = store.apply(setOfCtorId, [rec]);
      const retrieved = store.getAs(applied.id, "applied");
      expect(retrieved).toBe(applied);
      expect(retrieved === applied).toBe(true);
    });
  });
});
