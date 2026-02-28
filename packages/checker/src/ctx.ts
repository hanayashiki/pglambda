import type { CheckContext } from "./check-context.js";

export let ctx: CheckContext = undefined!;

export function runCheckWithContext(currentCtx: CheckContext, fn: () => void): void {
  ctx = currentCtx;
  try {
    fn();
  } finally {
    ctx = undefined!;
  }
}
