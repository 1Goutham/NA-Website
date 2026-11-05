export type When = "upcoming" | "live" | "past";
/** Event state from its dates. Used at build time and re-checked in the browser. */
export function whenOf(start: string, end: string, now = Date.now()): When {
  if (now < +new Date(start)) return "upcoming";
  if (now <= +new Date(end)) return "live";
  return "past";
}
