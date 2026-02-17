import { TequilaDBImpl } from "./tequila-db-impl.js";
import type { TequilaDB } from "./tequila-db.js";

// Public API exports
export { KeySchema, defineKeySchema } from "./key.js";
export type * from "./key.js";
export type { TequilaDB } from "./tequila-db.js";
export type { TequilaNode, TequilaNodeType, TequilaFn } from "./node.js";
export { TequilaDBImpl } from "./tequila-db-impl.js";

export const createTequilaDB = (): TequilaDB => new TequilaDBImpl();
