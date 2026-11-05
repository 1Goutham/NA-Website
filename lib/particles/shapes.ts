/**
 * Particle formations for the illustration panels. Each one is a cloud of points that assembles
 * into a meaningful shape: flat drawings are sampled from a 2D canvas and given a little depth;
 * the gem and the globe are true 3D solids that turn slowly.
 *
 * Coordinates: x ≈ -1.6…1.6, y ≈ -1…1, z small. `acc` marks accent points (drawn in the second colour).
 */
export type Shape = { pos: Float32Array; acc: Float32Array; n: number; spin: number; tilt: number };

const W = 320, H = 200, B = "#0000ff", A = "#ff0000";
type Ctx = CanvasRenderingContext2D;

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rr = (c: Ctx, x: number, y: number, w: number, h: number, r: number) => {
  c.beginPath();
  c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
};
const poly = (c: Ctx, pts: number[]) => { c.beginPath(); c.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]); };
const cut = (c: Ctx, fn: () => void) => { c.globalCompositeOperation = "destination-out"; fn(); c.globalCompositeOperation = "source-over"; };

/** Sample n points from a 2D drawing (blue = base, red = accent). */
function fromDrawing(draw: (c: Ctx) => void, n: number, depth: number, seed: number) {
  const r = rng(seed);
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const c = cv.getContext("2d", { willReadFrequently: true })!;
  c.lineCap = "round"; c.lineJoin = "round";
  draw(c);
  const d = c.getImageData(0, 0, W, H).data;
  const idx: number[] = [];
  for (let i = 0; i < W * H; i++) if (d[i * 4 + 3] > 150) idx.push(i);
  const pos = new Float32Array(n * 3), acc = new Float32Array(n);
  for (let k = 0; k < n; k++) {
    const i = idx[Math.floor(r() * idx.length)] ?? 0, px = i % W, py = (i / W) | 0;
    pos[k * 3] = ((px + r()) / W - 0.5) * 3.2;
    pos[k * 3 + 1] = -((py + r()) / H - 0.5) * 2;
    pos[k * 3 + 2] = (r() * 2 - 1) * depth;
    acc[k] = d[i * 4] > d[i * 4 + 2] ? 1 : 0;
  }
  return { pos, acc, n };
}

/* ---------------- flat formations ---------------- */

const recorded = (c: Ctx) => {
  // a screen with a play button and a progress bar
  c.strokeStyle = B; c.lineWidth = 7; rr(c, 62, 22, 196, 124, 14); c.stroke();
  c.fillStyle = A; poly(c, [144, 56, 144, 112, 192, 84]); c.closePath(); c.fill();
  c.lineWidth = 6; c.strokeStyle = B; poly(c, [62, 172, 258, 172]); c.stroke();
  c.strokeStyle = A; poly(c, [62, 172, 152, 172]); c.stroke();
  c.fillStyle = A; c.beginPath(); c.arc(152, 172, 9, 0, 7); c.fill();
};

const regular = (c: Ctx) => {
  // twelve steps, one per week, with a flag at the top
  c.fillStyle = B;
  for (let i = 0; i < 12; i++) {
    const h = 14 + i * 9, x = 42 + i * 21;
    c.fillStyle = i === 11 ? A : B;
    rr(c, x, 180 - h, 11, h, 3); c.fill();
  }
  const x = 42 + 11 * 21 + 5.5, top = 180 - 113;
  c.strokeStyle = B; c.lineWidth = 4; poly(c, [x, top - 6, x, top - 46]); c.stroke();
  c.fillStyle = A; poly(c, [x + 2, top - 46, x + 36, top - 36, x + 2, top - 26]); c.closePath(); c.fill();
};

const institutions = (c: Ctx) => {
  // graduation cap
  c.fillStyle = B;
  c.beginPath(); c.moveTo(102, 92); c.lineTo(102, 138); c.quadraticCurveTo(160, 166, 218, 138); c.lineTo(218, 92); c.closePath(); c.fill();
  const top = [160, 30, 278, 74, 160, 118, 42, 74];
  cut(c, () => { c.lineWidth = 12; poly(c, top); c.closePath(); c.stroke(); });
  c.fillStyle = B; poly(c, top); c.closePath(); c.fill();
  cut(c, () => { c.lineWidth = 10; poly(c, [160, 74, 250, 92, 250, 140]); c.stroke(); c.beginPath(); c.arc(160, 74, 12, 0, 7); c.fill(); });
  c.strokeStyle = A; c.lineWidth = 4; poly(c, [160, 74, 250, 92, 250, 140]); c.stroke();
  c.fillStyle = A; c.beginPath(); c.arc(160, 74, 7, 0, 7); c.fill();
  rr(c, 243, 138, 14, 30, 4); c.fill();
};

const corporates = (c: Ctx) => {
  // growth: bars and a rising trend line
  c.fillStyle = B;
  [40, 62, 84, 108, 132].forEach((h, i) => { rr(c, 58 + i * 46, 182 - h, 30, h, 4); c.fill(); });
  const line = [60, 126, 108, 104, 152, 86, 198, 60, 252, 30];
  cut(c, () => { c.lineWidth = 16; poly(c, line); c.stroke(); });
  c.strokeStyle = A; c.lineWidth = 5; poly(c, line); c.stroke();
  c.fillStyle = A; poly(c, [266, 20, 246, 22, 260, 38]); c.closePath(); c.fill();
};

const saturday = (c: Ctx) => {
  // a calendar with Saturday picked out
  c.fillStyle = A; rr(c, 72, 24, 176, 36, 12); c.fill(); c.fillRect(72, 44, 176, 16);
  c.strokeStyle = B; c.lineWidth = 6; rr(c, 72, 24, 176, 152, 14); c.stroke();
  c.lineWidth = 7; poly(c, [118, 12, 118, 34]); c.stroke(); poly(c, [202, 12, 202, 34]); c.stroke();
  for (let row = 0; row < 4; row++) for (let col = 0; col < 7; col++) {
    const x = 90 + col * 21.5, y = 78 + row * 23;
    if (col === 5 && row === 1) { c.fillStyle = A; rr(c, x - 6, y - 6, 24, 24, 6); c.fill(); continue; }
    c.fillStyle = B; rr(c, x, y, 12, 12, 3); c.fill();
  }
};

/* ---------------- 3D formations ---------------- */

type V = [number, number, number];
const lerp = (a: V, b: V, t: number): V => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

function gem(n: number, seed: number) {
  // brilliant-cut gem: edges in the base colour, facets as an accent haze
  const r = rng(seed), k = 8, T: V[] = [], G: V[] = [], yT = 0.78, yG = 0.36, C: V = [0, -0.92, 0], top: V = [0, yT, 0];
  for (let i = 0; i < k; i++) {
    const a = (i / k) * Math.PI * 2, b = a + Math.PI / k;
    T.push([Math.cos(a) * 0.56, yT, Math.sin(a) * 0.56]);
    G.push([Math.cos(b) * 1.08, yG, Math.sin(b) * 1.08]);
  }
  const edges: [V, V][] = [], tris: [V, V, V][] = [];
  for (let i = 0; i < k; i++) {
    const j = (i + 1) % k, p = (i + k - 1) % k;
    edges.push([T[i], T[j]], [G[i], G[j]], [T[i], G[i]], [T[j], G[i]], [G[i], C]);
    tris.push([top, T[i], T[j]], [T[i], T[j], G[i]], [G[p], T[i], G[i]], [G[i], G[j], C]);
  }
  const pos = new Float32Array(n * 3), acc = new Float32Array(n);
  for (let q = 0; q < n; q++) {
    let p: V;
    if (q < n * 0.62) { const [a, b] = edges[Math.floor(r() * edges.length)]; p = lerp(a, b, r()); acc[q] = 0; }
    else {
      const [a, b, c] = tris[Math.floor(r() * tris.length)];
      let u = r(), v = r(); if (u + v > 1) { u = 1 - u; v = 1 - v; }
      p = [a[0] + (b[0] - a[0]) * u + (c[0] - a[0]) * v, a[1] + (b[1] - a[1]) * u + (c[1] - a[1]) * v, a[2] + (b[2] - a[2]) * u + (c[2] - a[2]) * v];
      acc[q] = 1;
    }
    pos.set([p[0], p[1] + 0.06, p[2]], q * 3);
  }
  return { pos, acc, n };
}

function globe(n: number, seed: number) {
  // a dotted globe with arcs connecting learners across places
  const r = rng(seed), R = 0.9, dots = Math.floor(n * 0.7);
  const pos = new Float32Array(n * 3), acc = new Float32Array(n);
  for (let i = 0; i < dots; i++) {
    const y = 1 - (i / (dots - 1)) * 2, rad = Math.sqrt(1 - y * y), th = i * 2.39996;
    pos.set([Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R], i * 3);
  }
  const ll = (lat: number, lon: number): V => { const a = (lat * Math.PI) / 180, b = (lon * Math.PI) / 180; return [Math.cos(a) * Math.cos(b), Math.sin(a), Math.cos(a) * Math.sin(b)]; };
  const arcs: [V, V][] = [[ll(11, 77), ll(-34, 151)], [ll(11, 77), ll(51, 0)], [ll(11, 77), ll(40, -74)], [ll(11, 77), ll(1, 104)], [ll(11, 77), ll(25, 55)], [ll(-34, 151), ll(1, 104)]];
  for (let i = dots; i < n; i++) {
    const [a, b] = arcs[Math.floor(r() * arcs.length)], t = r();
    const ang = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), s = Math.sin(ang) || 1;
    const wa = Math.sin((1 - t) * ang) / s, wb = Math.sin(t * ang) / s, lift = R * (1 + 0.2 * Math.sin(Math.PI * t));
    pos.set([(a[0] * wa + b[0] * wb) * lift, (a[1] * wa + b[1] * wb) * lift, (a[2] * wa + b[2] * wb) * lift], i * 3);
    acc[i] = 1;
  }
  return { pos, acc, n };
}

const flat: Record<string, (c: Ctx) => void> = { recorded, regular, institutions, corporates, saturday };

export const particleNames = ["recorded", "regular", "premium", "institutions", "corporates", "community", "saturday"];

export function buildShape(name: string): Shape | null {
  const seed = name.length * 977 + name.charCodeAt(0);
  if (name === "premium") return { ...gem(2400, seed), spin: 0.32, tilt: 0.32 };
  if (name === "community") return { ...globe(2600, seed), spin: 0.22, tilt: 0.28 };
  const draw = flat[name];
  return draw ? { ...fromDrawing(draw, 2300, 0.16, seed), spin: 0, tilt: 0 } : null;
}
