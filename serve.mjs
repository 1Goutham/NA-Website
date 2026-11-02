// Tiny dev server: rebuilds on change and serves dist/ on http://localhost:5173
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { build } from "./build.mjs";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, "dist");
const PORT = process.env.PORT || 5173;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".ico": "image/x-icon" };

build();
let t;
fs.watch(path.join(ROOT, "src"), { recursive: true }, () => { clearTimeout(t); t = setTimeout(() => { try { build(); } catch (e) { console.error(e); } }, 80); });

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  let f = path.join(OUT, p);
  if (!f.startsWith(OUT)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(f) && fs.existsSync(f + ".html")) f += ".html";
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
  });
}).listen(PORT, () => console.log(`dev server → http://localhost:${PORT}`));
