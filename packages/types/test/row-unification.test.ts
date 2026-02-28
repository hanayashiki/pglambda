import { describe, test, expect, beforeEach } from "vitest";
import { TypeStore } from "../src/type-store.ts";
import { Unification } from "../src/unification.ts";

describe("Row Polymorphism Unification", () => {
  let store: TypeStore;
  let u: Unification;

  beforeEach(() => {
    store = new TypeStore();
    u = new Unification(store);
  });

  describe("Open record unifies with closed record", () => {
    test("open with one field unifies with closed superset", () => {
      const rho = store.typevar("rho");
      const beta = store.typevar("beta");
      const int = store.primitive("integer");
      const text = store.primitive("text");

      // {id: β | ρ} = {id: int, name: text}
      const open = store.record({ id: beta }, rho);
      const closed = store.record({ id: int, name: text });

      u.unify(open, closed);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);
      expect(u.resolve(beta)).toBe(int);

      // ρ should resolve to {name: text}
      const resolvedRho = u.resolve(rho);
      expect(resolvedRho.kind).toBe("record");
      if (resolvedRho.kind === "record") {
        expect(resolvedRho.fields.name).toBe(text);
        expect(Object.keys(resolvedRho.fields)).toEqual(["name"]);
      }
    });

    test("open with multiple extra fields in closed side", () => {
      const rho = store.typevar("rho");
      const beta = store.typevar("beta");
      const int = store.primitive("integer");
      const text = store.primitive("text");
      const bool = store.primitive("boolean");

      // {id: β | ρ} = {id: int, name: text, age: int, active: bool}
      const open = store.record({ id: beta }, rho);
      const closed = store.record({
        id: int,
        name: text,
        age: int,
        active: bool,
      });

      u.unify(open, closed);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);
      expect(u.resolve(beta)).toBe(int);

      // ρ should resolve to {name: text, age: int, active: boolean}
      const resolvedRho = u.resolve(rho);
      expect(resolvedRho.kind).toBe("record");
      if (resolvedRho.kind === "record") {
        expect(resolvedRho.fields.name).toBe(text);
        expect(resolvedRho.fields.age).toBe(int);
        expect(resolvedRho.fields.active).toBe(bool);
        expect(Object.keys(resolvedRho.fields).length).toBe(3);
      }
    });

    test("open with same fields binds rest to empty record", () => {
      const rho = store.typevar("rho");
      const int = store.primitive("integer");
      const text = store.primitive("text");

      // {id: int, name: text | ρ} = {id: int, name: text}
      const open = store.record({ id: int, name: text }, rho);
      const closed = store.record({ id: int, name: text });

      u.unify(open, closed);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);

      // ρ should resolve to {} (empty record)
      const resolvedRho = u.resolve(rho);
      expect(resolvedRho.kind).toBe("record");
      if (resolvedRho.kind === "record") {
        expect(Object.keys(resolvedRho.fields).length).toBe(0);
        expect(resolvedRho.rest).toBe(null);
      }
    });

    test("closed superset unifies with open subset", () => {
      const rho = store.typevar("rho");
      const int = store.primitive("integer");
      const text = store.primitive("text");

      // {id: int, name: text} = {id: integer | ρ}
      // Should succeed by binding ρ = {name: text}
      const closed = store.record({ id: int, name: text });
      const open = store.record({ id: int }, rho);

      u.unify(closed, open);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);

      // ρ should resolve to {name: text}
      const resolvedRho = u.resolve(rho);
      expect(resolvedRho.kind).toBe("record");
      if (resolvedRho.kind === "record") {
        expect(resolvedRho.fields.name).toBe(text);
      }
    });
  });

  describe("Two open records unify", () => {
    test("two open records with same fields unify rest", () => {
      const rho1 = store.typevar("rho1");
      const rho2 = store.typevar("rho2");
      const int = store.primitive("integer");

      // {a: int | ρ₁} = {a: int | ρ₂}
      const open1 = store.record({ a: int }, rho1);
      const open2 = store.record({ a: int }, rho2);

      u.unify(open1, open2);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);

      // ρ₁ and ρ₂ should unify
      expect(u.resolve(rho1)).toBe(u.resolve(rho2));
    });

    test("both open with different fields (complex case)", () => {
      const rho1 = store.typevar("rho1");
      const rho2 = store.typevar("rho2");
      const int = store.primitive("integer");
      const text = store.primitive("text");

      // {a: int | ρ₁} = {b: text | ρ₂}
      const open1 = store.record({ a: int }, rho1);
      const open2 = store.record({ b: text }, rho2);

      u.unify(open1, open2);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);

      // ρ₁ should contain field b
      const resolvedRho1 = u.resolve(rho1);
      expect(resolvedRho1.kind).toBe("record");
      if (resolvedRho1.kind === "record") {
        expect(resolvedRho1.fields.b).toBe(text);
      }

      // ρ₂ should contain field a
      const resolvedRho2 = u.resolve(rho2);
      expect(resolvedRho2.kind).toBe("record");
      if (resolvedRho2.kind === "record") {
        expect(resolvedRho2.fields.a).toBe(int);
      }

      // Both should have the same fresh rest variable
      if (
        resolvedRho1.kind === "record" &&
        resolvedRho2.kind === "record" &&
        resolvedRho1.rest &&
        resolvedRho2.rest
      ) {
        expect(u.resolve(resolvedRho1.rest)).toBe(u.resolve(resolvedRho2.rest));
      }
    });

    test("both open with multiple extra fields on each side", () => {
      const rho1 = store.typevar("rho1");
      const rho2 = store.typevar("rho2");
      const int = store.primitive("integer");
      const text = store.primitive("text");
      const bool = store.primitive("boolean");

      // {a: int, b: text | ρ₁} = {c: boolean, d: int | ρ₂}
      const open1 = store.record({ a: int, b: text }, rho1);
      const open2 = store.record({ c: bool, d: int }, rho2);

      u.unify(open1, open2);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);

      // ρ₁ should contain fields c and d
      const resolvedRho1 = u.resolve(rho1);
      expect(resolvedRho1.kind).toBe("record");
      if (resolvedRho1.kind === "record") {
        expect(resolvedRho1.fields.c).toBe(bool);
        expect(resolvedRho1.fields.d).toBe(int);
        expect(Object.keys(resolvedRho1.fields).length).toBe(2);
      }

      // ρ₂ should contain fields a and b
      const resolvedRho2 = u.resolve(rho2);
      expect(resolvedRho2.kind).toBe("record");
      if (resolvedRho2.kind === "record") {
        expect(resolvedRho2.fields.a).toBe(int);
        expect(resolvedRho2.fields.b).toBe(text);
        expect(Object.keys(resolvedRho2.fields).length).toBe(2);
      }

      // Both should share the same fresh rest
      if (
        resolvedRho1.kind === "record" &&
        resolvedRho2.kind === "record" &&
        resolvedRho1.rest &&
        resolvedRho2.rest
      ) {
        expect(u.resolve(resolvedRho1.rest)).toBe(u.resolve(resolvedRho2.rest));
      }
    });

    test("both open with partial overlap", () => {
      const rho1 = store.typevar("rho1");
      const rho2 = store.typevar("rho2");
      const int = store.primitive("integer");
      const text = store.primitive("text");
      const bool = store.primitive("boolean");

      // {a: int, b: text | ρ₁} = {a: int, c: bool | ρ₂}
      const open1 = store.record({ a: int, b: text }, rho1);
      const open2 = store.record({ a: int, c: bool }, rho2);

      u.unify(open1, open2);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);

      // ρ₁ should contain field c, ρ₂ should contain field b
      expect(store.typeToString(u.resolve(rho1))).toBe("{c: boolean | T7}");
      expect(store.typeToString(u.resolve(rho2))).toBe("{b: text | T7}");
    });
  });

  describe("Error cases", () => {
    test("open with required fields vs closed without them fails", () => {
      const rho = store.typevar("rho");
      const int = store.primitive("integer");
      const text = store.primitive("text");

      // {id: int, name: text | ρ} = {id: int}  (closed)
      // Should fail - closed record missing required field 'name'
      const open = store.record({ id: int, name: text }, rho);
      const closed = store.record({ id: int });

      u.unify(open, closed);

      const result = u.getResult();
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].errorKind).toBe("field_mismatch");
      expect(result.errors[0].message).toContain("name");
    });

    test("both closed with different fields fails", () => {
      const int = store.primitive("integer");
      const text = store.primitive("text");

      // {id: int, name: text} = {id: int, email: text}
      const closed1 = store.record({ id: int, name: text });
      const closed2 = store.record({ id: int, email: text });

      u.unify(closed1, closed2);

      const result = u.getResult();
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].errorKind).toBe("field_mismatch");
    });

    test("one open one closed with different fields on both sides fails", () => {
      const rho = store.typevar("rho");
      const int = store.primitive("integer");
      const text = store.primitive("text");

      // {a: int, b: text | ρ} = {c: int, d: text} (closed)
      const open = store.record({ a: int, b: text }, rho);
      const closed = store.record({ c: int, d: text });

      u.unify(open, closed);

      const result = u.getResult();
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].errorKind).toBe("field_mismatch");
    });

    test("field type mismatch in common fields", () => {
      const rho1 = store.typevar("rho1");
      const rho2 = store.typevar("rho2");
      const int = store.primitive("integer");
      const text = store.primitive("text");

      // {a: int | ρ₁} = {a: text | ρ₂}
      const open1 = store.record({ a: int }, rho1);
      const open2 = store.record({ a: text }, rho2);

      u.unify(open1, open2);

      const result = u.getResult();
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].errorKind).toBe("kind_mismatch");
    });

    test("occurs check prevents infinite row types", () => {
      const rho = store.typevar("rho");
      const int = store.primitive("integer");

      // ρ = {a: int | ρ} (infinite!)
      const recursive = store.record({ a: int }, rho);

      u.unify(rho, recursive);

      const result = u.getResult();
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].errorKind).toBe("occurs_check");
    });
  });

  describe("Complex scenarios", () => {
    test("mutual recursion with field access (motivating example)", () => {
      // Simulates: f1() { return f2().id }, f2() { return f1().id }
      const f1 = store.typevar("f1");
      const f2 = store.typevar("f2");
      const id1 = store.typevar("id1");
      const id2 = store.typevar("id2");
      const rho1 = store.typevar("rho1");
      const rho2 = store.typevar("rho2");

      // f2 = {id: id1 | rho1} (from f2().id access)
      u.unify(f2, store.record({ id: id1 }, rho1));

      // f1 = {id: id2 | rho2} (from f1().id access)
      u.unify(f1, store.record({ id: id2 }, rho2));

      // f1 = id1 (f1's return type is f2's id field type)
      u.unify(f1, id1);

      // f2 = id2 (f2's return type is f1's id field type)
      u.unify(f2, id2);

      const result = u.getResult();

      // This should trigger occurs check error!
      // id1 = {id: id2 | rho2} and id2 = {id: id1 | rho1}
      // Substituting: id1 = {id: {id: id1 | rho1} | rho2} → infinite type
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].errorKind).toBe("occurs_check");
    });

    test("deeply nested row unification", () => {
      const rho = store.typevar("rho");
      const alpha = store.typevar("alpha");
      const int = store.primitive("integer");
      const text = store.primitive("text");

      // {id: α | ρ} = {id: int, user: {name: text}}
      const innerRecord = store.record({ name: text });
      const open = store.record({ id: alpha }, rho);
      const closed = store.record({ id: int, user: innerRecord });

      u.unify(open, closed);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);
      expect(u.resolve(alpha)).toBe(int);

      // ρ should resolve to {user: {name: text}}
      const resolvedRho = u.resolve(rho);
      expect(resolvedRho.kind).toBe("record");
      if (resolvedRho.kind === "record") {
        expect(resolvedRho.fields.user).toBe(innerRecord);
      }
    });

    test("chained field additions", () => {
      const rho = store.typevar("rho");
      const alpha = store.typevar("alpha");
      const beta = store.typevar("beta");
      const int = store.primitive("integer");
      const text = store.primitive("text");
      const bool = store.primitive("boolean");

      // Start: {id: α | ρ}
      const open = store.record({ id: alpha }, rho);

      // Add constraint: α = int
      u.unify(alpha, int);

      // Add constraint: ρ = {name: β, active: bool | ρ2}
      const rho2 = store.typevar("rho2");
      const withName = store.record({ name: beta, active: bool }, rho2);
      u.unify(rho, withName);

      // Add constraint: β = text
      u.unify(beta, text);

      // Add constraint: ρ2 = {created_at: int}
      const final = store.record({ created_at: int });
      u.unify(rho2, final);

      const result = u.getResult();
      expect(result.errors).toHaveLength(0);

      // Deep resolve preserves row structure: {id: integer | {name: text, active: boolean | {created_at: int}}}
      const fullyResolved = u.deepResolve(open);
      expect(store.typeToString(fullyResolved)).toBe(
        "{id: integer | {active: boolean, name: text | {created_at: integer}}}",
      );

      // Verify individual bindings
      expect(u.resolve(alpha)).toBe(int);
      expect(u.resolve(beta)).toBe(text);
    });
  });
});
