export const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
export const easeBack = (x: number) => { x = Math.min(1, Math.max(0, x)); const c = 1.6; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
/** Local progress of item i of n inside the global entrance progress r. */
export const stagger = (r: number, i: number, n: number, span = 0.55) => ease((r - (i / Math.max(1, n)) * (1 - span)) / span);
