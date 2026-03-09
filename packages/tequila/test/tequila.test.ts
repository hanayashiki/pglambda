import { describe, it, expect, vi } from "vitest";
import { defineKeySchema } from "../src/key.js";
import { TequilaDBImpl } from "../src/tequila-db-impl.js";

describe("TequilaDB", () => {
  it("should cache input values", async () => {
    const db = new TequilaDBImpl();
    const schema = defineKeySchema<string, string>("file");
    const mockRead = vi.fn((_db, key: string) => Promise.resolve(`content-${key}`));

    const getInput = db.defineInput(schema, mockRead);

    const result1 = await getInput(db, "f1");
    const result2 = await getInput(db, "f1");

    expect(result1).toBe("content-f1");
    expect(result2).toBe("content-f1");
    expect(mockRead).toHaveBeenCalledTimes(1); // Only called once!
  });

  it("should cache tracked computations", async () => {
    const db = new TequilaDBImpl();
    const fileSchema = defineKeySchema<string, string>("file2");
    const astSchema = defineKeySchema<string, string>("ast");

    const mockRead = vi.fn((_db, key: string) => Promise.resolve(`content-${key}`));
    const mockParse = vi.fn(async (db, key: string) => {
      const content = await getInput(db, key);
      return `parsed(${content})`;
    });

    const getInput = db.defineInput(fileSchema, mockRead);
    const parse = db.defineTracked(astSchema, mockParse);

    const result1 = await parse(db, "f1");
    const result2 = await parse(db, "f1");

    expect(result1).toBe("parsed(content-f1)");
    expect(result2).toBe("parsed(content-f1)");
    expect(mockParse).toHaveBeenCalledTimes(1);
    expect(mockRead).toHaveBeenCalledTimes(1);
  });

  it("should track dependencies across multiple levels", async () => {
    const db = new TequilaDBImpl();
    const inputSchema = defineKeySchema<string, string>("input");
    const middleSchema = defineKeySchema<string, string>("middle");
    const topSchema = defineKeySchema<string, string>("top");

    const mockInput = vi.fn((_db, key: string) => Promise.resolve(`input-${key}`));
    const mockMiddle = vi.fn(async (db, key: string) => {
      const input = await getInput(db, key);
      return `middle(${input})`;
    });
    const mockTop = vi.fn(async (db, key: string) => {
      const middle = await getMiddle(db, key);
      return `top(${middle})`;
    });

    const getInput = db.defineInput(inputSchema, mockInput);
    const getMiddle = db.defineTracked(middleSchema, mockMiddle);
    const getTop = db.defineTracked(topSchema, mockTop);

    // First call - should execute all three
    const result1 = await getTop(db, "k1");
    expect(result1).toBe("top(middle(input-k1))");
    expect(mockInput).toHaveBeenCalledTimes(1);
    expect(mockMiddle).toHaveBeenCalledTimes(1);
    expect(mockTop).toHaveBeenCalledTimes(1);

    // Second call - should be fully cached
    mockInput.mockClear();
    mockMiddle.mockClear();
    mockTop.mockClear();

    const result2 = await getTop(db, "k1");
    expect(result2).toBe("top(middle(input-k1))");
    expect(mockInput).toHaveBeenCalledTimes(0);
    expect(mockMiddle).toHaveBeenCalledTimes(0);
    expect(mockTop).toHaveBeenCalledTimes(0);
  });

  it("should invalidate and recompute when input changes", async () => {
    const db = new TequilaDBImpl();
    const inputSchema = defineKeySchema<string, string>("input3");
    const trackedSchema = defineKeySchema<string, string>("tracked");

    let inputValue = "v1";
    const mockInput = vi.fn((_db, _key: string) => Promise.resolve(inputValue));
    const mockTracked = vi.fn(async (db, key: string) => {
      const input = await getInput(db, key);
      return `tracked(${input})`;
    });

    const getInput = db.defineInput(inputSchema, mockInput);
    const getTracked = db.defineTracked(trackedSchema, mockTracked);

    // First call
    const result1 = await getTracked(db, "k1");
    expect(result1).toBe("tracked(v1)");
    expect(mockInput).toHaveBeenCalledTimes(1);
    expect(mockTracked).toHaveBeenCalledTimes(1);

    // Second call - cached
    mockInput.mockClear();
    mockTracked.mockClear();
    const result2 = await getTracked(db, "k1");
    expect(result2).toBe("tracked(v1)");
    expect(mockInput).toHaveBeenCalledTimes(0);
    expect(mockTracked).toHaveBeenCalledTimes(0);

    // Change input and invalidate
    inputValue = "v2";
    db.invalidateInput(inputSchema, "k1");

    mockInput.mockClear();
    mockTracked.mockClear();

    // Third call - should recompute
    const result3 = await getTracked(db, "k1");
    expect(result3).toBe("tracked(v2)");
    expect(mockInput).toHaveBeenCalledTimes(1);
    expect(mockTracked).toHaveBeenCalledTimes(1);
  });

  it("should not recompute if input value is unchanged (interning)", async () => {
    const db = new TequilaDBImpl();
    const inputSchema = defineKeySchema<string, string>("input4");
    const trackedSchema = defineKeySchema<string, string>("tracked2");

    // Same object reference returned each time
    const sharedValue = "shared-value";
    const mockInput = vi.fn((_db, _key: string) => Promise.resolve(sharedValue));
    const mockTracked = vi.fn(async (db, key: string) => {
      const input = await getInput(db, key);
      return `tracked(${input})`;
    });

    const getInput = db.defineInput(inputSchema, mockInput);
    const getTracked = db.defineTracked(trackedSchema, mockTracked);

    // First call
    await getTracked(db, "k1");
    expect(mockInput).toHaveBeenCalledTimes(1);
    expect(mockTracked).toHaveBeenCalledTimes(1);

    // Invalidate and call again
    db.invalidateInput(inputSchema, "k1");
    mockInput.mockClear();
    mockTracked.mockClear();

    // Second call - input will be re-executed, but since value is the same (===),
    // tracked should not recompute
    const result2 = await getTracked(db, "k1");
    expect(result2).toBe("tracked(shared-value)");
    expect(mockInput).toHaveBeenCalledTimes(1); // Input re-executed
    expect(mockTracked).toHaveBeenCalledTimes(0); // Tracked NOT re-executed (value unchanged)
  });

  it("should handle multiple independent keys", async () => {
    const db = new TequilaDBImpl();
    const schema = defineKeySchema<string, string>("multi");
    const mockRead = vi.fn((_db, key: string) => Promise.resolve(`value-${key}`));

    const getInput = db.defineInput(schema, mockRead);

    // Call with different keys
    const r1 = await getInput(db, "k1");
    const r2 = await getInput(db, "k2");
    const r3 = await getInput(db, "k1"); // Should be cached

    expect(r1).toBe("value-k1");
    expect(r2).toBe("value-k2");
    expect(r3).toBe("value-k1");
    expect(mockRead).toHaveBeenCalledTimes(2); // Only k1 and k2, not the second k1
  });

  it("should detect dependency cycles", async () => {
    const db = new TequilaDBImpl();
    const schemaA = defineKeySchema<string, string>("cycleA");
    const schemaB = defineKeySchema<string, string>("cycleB");

    const getA: (db: any, key: string) => Promise<string> = db.defineTracked(
      schemaA,
      async (db, key: string) => {
        const b = await getB(db, key);
        return `A(${b})`;
      }
    );

    const getB: (db: any, key: string) => Promise<string> = db.defineTracked(
      schemaB,
      async (db, key: string) => {
        const a = await getA(db, key);
        return `B(${a})`;
      }
    );

    await expect(getA(db, "k1")).rejects.toThrow(/cycle/i);
  });

  it("should validate unique schema names per DB instance", () => {
    const db = new TequilaDBImpl();
    const schema1 = defineKeySchema<string, string>("unique1");
    const schema2 = defineKeySchema<string, string>("unique1");

    // First registration should succeed
    db.defineInput(schema1, (_db, key) => Promise.resolve(`value-${key}`));

    // Second registration with same name should fail
    expect(() => {
      db.defineInput(schema2, (_db, key) => Promise.resolve(`value-${key}`));
    }).toThrow(/already been defined in this DB/);

    // But different DB instances should allow the same schema name
    const db2 = new TequilaDBImpl();
    expect(() => {
      db2.defineInput(schema2, (_db, key) => Promise.resolve(`value-${key}`));
    }).not.toThrow();
  });

  it("should invalidate all cached values", async () => {
    const db = new TequilaDBImpl();
    const schema = defineKeySchema<string, string>("invalidateAll");
    let value = "v1";
    const mockInput = vi.fn((_db, _key: string) => Promise.resolve(value));

    const getInput = db.defineInput(schema, mockInput);

    // Cache some values
    await getInput(db, "k1");
    await getInput(db, "k2");
    expect(mockInput).toHaveBeenCalledTimes(2);

    // Change value and invalidate all
    value = "v2";
    db.invalidateAll();
    mockInput.mockClear();

    // Both should recompute
    const r1 = await getInput(db, "k1");
    const r2 = await getInput(db, "k2");
    expect(r1).toBe("v2");
    expect(r2).toBe("v2");
    expect(mockInput).toHaveBeenCalledTimes(2);
  });
});
