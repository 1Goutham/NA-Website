// Zero-dependency static build: src/pages/*.html + partials -> dist/
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { events, cardHome, cardExplore, artSvg, icsAttrs, fmtDate } from "./src/data/events.mjs";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "dist");

const read = (p) => fs.readFileSync(p, "utf8");
const copyDir = (from, to) => {
  fs.mkdirSync(to, { recursive: true });
  for (const f of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, f.name), b = path.join(to, f.name);
    f.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
};

export function build() {
  const t0 = Date.now();
  fs.rmSync(OUT, { recursive: true, force: true });
  copyDir(path.join(SRC, "assets"), path.join(OUT, "assets"));
  copyDir(path.join(SRC, "css"), path.join(OUT, "css"));
  copyDir(path.join(SRC, "js"), path.join(OUT, "js"));

  const v = crypto.createHash("md5").update(read(path.join(SRC, "css/main.css")) + read(path.join(SRC, "js/main.js"))).digest("hex").slice(0, 8);
  const partials = Object.fromEntries(
    fs.readdirSync(path.join(SRC, "partials")).map((f) => [path.basename(f, ".html"), read(path.join(SRC, "partials", f))])
  );
  const featured = events.find((e) => e.featured) || events[0];

  const blocks = {
    "events-home": () => events.slice(0, 6).map(cardHome).join(""),
    "events-explore": () => events.filter((e) => e !== featured).map(cardExplore).join(""),
    "featured-art": () => artSvg(featured.art),
    "featured-ics": () => icsAttrs(featured),
    "featured-title": () => featured.title,
    "featured-desc": () => featured.desc,
    "featured-date": () => fmtDate(featured.start),
    "featured-time": () => featured.time,
    "featured-start": () => featured.start,
    "featured-end": () => featured.end,
  };

  const pages = fs.readdirSync(path.join(SRC, "pages")).filter((f) => f.endsWith(".html"));
  for (const file of pages) {
    let html = read(path.join(SRC, "pages", file));
    const meta = {};
    html = html.replace(/<!--\s*@page([\s\S]*?)-->\s*/, (_, attrs) => {
      for (const [, k, val] of attrs.matchAll(/(\w+)="([^"]*)"/g)) meta[k] = val;
      return "";
    });
    for (let i = 0; i < 4; i++) html = html.replace(/<!--\s*@include (\w[\w-]*)\s*-->/g, (m, n) => partials[n] ?? m);
    html = html.replace(/<!--\s*@(events-home|events-explore)\s*-->/g, (_, n) => blocks[n]());
    html = html.replace(/\{\{(featured-[\w-]+)\}\}/g, (_, n) => blocks[n]());
    html = html
      .replaceAll("{{title}}", meta.title || "Nunnari Academy — School of AI")
      .replaceAll("{{description}}", meta.description || "")
      .replaceAll("{{v}}", v);
    if (meta.nav) html = html.replace(`data-nav="${meta.nav}"`, `data-nav="${meta.nav}" aria-current="page"`);
    fs.writeFileSync(path.join(OUT, file), html);
  }
  console.log(`built ${pages.length} pages -> dist/ in ${Date.now() - t0}ms`);
}

if (process.argv[1] === new URL(import.meta.url).pathname) build();
