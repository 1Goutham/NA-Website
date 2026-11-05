/**
 * 3D illustrations (isometric, 320×200 viewBox) for programmes, partners, community, company and CTAs.
 * One camera, one light (top-left), one palette. Every object is grounded on a plinth with a soft
 * contact shadow and carries real detail (keys, windows, labels) instead of decorative floaters.
 */

type Pt = [number, number];
type Face = "base" | "accent" | "deep" | "screen" | "white";

const C = 0.866, S = 0.5;
const f1 = (n: number) => n.toFixed(1);

function scene(ox: number, oy: number, s: number) {
  const P = (x: number, y: number, z: number): Pt => [ox + (x - y) * C * s, oy + (x + y) * S * s - z * s];
  const pts = (a: Pt[]) => a.map((p) => `${f1(p[0])},${f1(p[1])}`).join(" ");
  const poly = (a: Pt[], fill: string, extra = "") => `<polygon points="${pts(a)}" fill="${fill}" ${extra}/>`;
  const hi = 'stroke="rgb(255 255 255 / .7)" stroke-width=".7" stroke-linejoin="round"';
  const rim = 'stroke="rgb(255 255 255 / .35)" stroke-width=".5" stroke-linejoin="round"';

  /** Axis-aligned box (x → right-down, y → left-down, z → up); draws the three visible faces. */
  const box = (x: number, y: number, z: number, w: number, d: number, h: number, kind: Face = "base") =>
    poly([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)], `url(#a3-${kind}-l)`, rim) +
    poly([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)], `url(#a3-${kind}-r)`, rim) +
    poly([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)], `url(#a3-${kind}-t)`, hi);

  /** The plinth every scene stands on. */
  const plinth = (x: number, y: number, w: number, d: number, h = 0.35) => box(x, y, 0, w, d, h, "white");

  /** Gable roof along x. */
  const roof = (x: number, y: number, z: number, w: number, d: number, rise: number, o = 0.25) => {
    const ym = y + d / 2;
    return poly([P(x - o, y + d + o, z), P(x + w + o, y + d + o, z), P(x + w + o, ym, z + rise), P(x - o, ym, z + rise)], "url(#a3-accent-t)", hi) +
      poly([P(x + w, y, z), P(x + w, y + d, z), P(x + w, ym, z + rise)], "url(#a3-accent-r)", rim);
  };

  /** Glossy sphere resting on z. */
  const sphere = (x: number, y: number, z: number, r: number, kind: "brand" | "soft" = "brand") => {
    const [cx, cy] = P(x, y, z + r), R = r * s;
    return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R)}" fill="url(#a3-sph-${kind})"/>` +
      `<ellipse cx="${f1(cx - R * 0.34)}" cy="${f1(cy - R * 0.4)}" rx="${f1(R * 0.3)}" ry="${f1(R * 0.18)}" fill="#fff" opacity=".8" transform="rotate(-30 ${f1(cx - R * 0.34)} ${f1(cy - R * 0.4)})"/>`;
  };

  /** Faceted gem (octahedron) centred at (x,y,z). */
  const gem = (x: number, y: number, z: number, r: number) => {
    const T = P(x, y, z + r * 1.25), B = P(x, y, z - r * 1.1), E1 = P(x + r, y, z), E2 = P(x, y + r, z), E3 = P(x - r, y, z);
    return poly([T, E3, E2], "#c4b2ff", hi) + poly([T, E2, E1], "#7c4dff", hi) + poly([B, E3, E2], "#5a2ef0") + poly([B, E2, E1], "#3a19b0");
  };

  /** Soft contact shadow on the ground. */
  const shadow = (x: number, y: number, rx: number, ry = rx * 0.42, o = 0.2) => {
    const [cx, cy] = P(x, y, 0);
    return `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx * s)}" ry="${f1(ry * s)}" fill="rgb(52 24 150 / ${o})" filter="url(#a3-blur)"/>`;
  };

  /** Content drawn in a face's own 2D coordinates. */
  const onFront = (x: number, y: number, z: number, svg: string) => { const [ex, ey] = P(x, y, z); return `<g transform="matrix(${(C * s).toFixed(3)},${(S * s).toFixed(3)},0,${s.toFixed(3)},${f1(ex)},${f1(ey)})">${svg}</g>`; };
  const onRight = (x: number, y: number, z: number, svg: string) => { const [ex, ey] = P(x, y, z); return `<g transform="matrix(${(-C * s).toFixed(3)},${(S * s).toFixed(3)},0,${s.toFixed(3)},${f1(ex)},${f1(ey)})">${svg}</g>`; };
  const onTop = (x: number, y: number, z: number, svg: string) => { const [ex, ey] = P(x, y, z); return `<g transform="matrix(${(C * s).toFixed(3)},${(S * s).toFixed(3)},${(-C * s).toFixed(3)},${(S * s).toFixed(3)},${f1(ex)},${f1(ey)})">${svg}</g>`; };

  return { P, poly, box, plinth, roof, sphere, gem, shadow, onFront, onRight, onTop };
}

const DEFS = `<defs>
  <linearGradient id="a3-white-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f3efff"/></linearGradient>
  <linearGradient id="a3-white-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e2ff"/><stop offset="1" stop-color="#dcd2ff"/></linearGradient>
  <linearGradient id="a3-white-r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cbbcff"/><stop offset="1" stop-color="#b9a6ff"/></linearGradient>
  <linearGradient id="a3-base-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e8e0ff"/></linearGradient>
  <linearGradient id="a3-base-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6c9ff"/><stop offset="1" stop-color="#bda9ff"/></linearGradient>
  <linearGradient id="a3-base-r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a68cff"/><stop offset="1" stop-color="#8565ff"/></linearGradient>
  <linearGradient id="a3-accent-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9a4ff"/><stop offset="1" stop-color="#8f6dff"/></linearGradient>
  <linearGradient id="a3-accent-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c4dff"/><stop offset="1" stop-color="#6436f5"/></linearGradient>
  <linearGradient id="a3-accent-r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a2ef0"/><stop offset="1" stop-color="#4420c7"/></linearGradient>
  <linearGradient id="a3-deep-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6c3bff"/><stop offset="1" stop-color="#4a24d1"/></linearGradient>
  <linearGradient id="a3-deep-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b1cab"/><stop offset="1" stop-color="#2d1588"/></linearGradient>
  <linearGradient id="a3-deep-r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1480"/><stop offset="1" stop-color="#1f0f63"/></linearGradient>
  <linearGradient id="a3-screen-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9ccff"/><stop offset="1" stop-color="#bba6ff"/></linearGradient>
  <linearGradient id="a3-screen-l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2e1a8f"/><stop offset=".55" stop-color="#1c1060"/><stop offset="1" stop-color="#140b45"/></linearGradient>
  <linearGradient id="a3-screen-r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a68cff"/><stop offset="1" stop-color="#8565ff"/></linearGradient>
  <radialGradient id="a3-sph-brand" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".18" stop-color="#d6c8ff"/><stop offset=".55" stop-color="#7c4dff"/><stop offset="1" stop-color="#3a19b0"/></radialGradient>
  <radialGradient id="a3-sph-soft" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#ede6ff"/><stop offset="1" stop-color="#a68cff"/></radialGradient>
  <linearGradient id="a3-beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8b6cff" stop-opacity=".25"/><stop offset=".5" stop-color="#6c3bff"/><stop offset="1" stop-color="#8b6cff" stop-opacity=".25"/></linearGradient>
  <filter id="a3-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2"/></filter>
  <filter id="a3-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>
</defs>`;

const label = (t: string, size = 0.42, fill = "#5b34e6", x = 0, y = 0, anchor = "start") =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Inter,sans-serif" font-size="${size}" font-weight="700" letter-spacing=".04" fill="${fill}">${t}</text>`;

/* ---------------- scenes ---------------- */

const recorded = (() => {
  const g = scene(142, 112, 12.5);
  let keys = "";
  for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) keys += `<rect x="${(0.55 + c * 0.55).toFixed(2)}" y="${(0.45 + r * 0.42).toFixed(2)}" width=".44" height=".32" rx=".06" fill="#fff" opacity=".9"/>`;
  return DEFS + g.shadow(3.6, 2.8, 6, 2.6, 0.22) +
    g.plinth(-0.6, -0.9, 8.2, 6.6) +
    g.box(0, 0.6, 0.35, 7, 4.6, 0.3) +
    g.onTop(0, 0.6, 0.65, `<rect x=".35" y=".3" width="6.3" height="2.1" rx=".18" fill="#d9ccff"/>${keys}<rect x="2.4" y="2.75" width="2.2" height="1.4" rx=".16" fill="#e6ddff"/>`) +
    g.box(0, 0.2, 0.35, 7, 0.4, 4.4, "screen") +
    g.onFront(0, 0.6, 0.35 + 4.4,
      `<rect x=".45" y=".4" width="6.1" height="3.55" rx=".22" fill="rgb(255 255 255 / .05)"/>` +
      `<rect x=".75" y=".75" width="1.35" height="2.85" rx=".14" fill="rgb(255 255 255 / .08)"/>` +
      `<rect x=".95" y="1" width=".95" height=".14" rx=".07" fill="#c9bcff"/><rect x=".95" y="1.35" width=".75" height=".12" rx=".06" fill="rgb(255 255 255 / .35)"/><rect x=".95" y="1.65" width=".85" height=".12" rx=".06" fill="rgb(255 255 255 / .35)"/><rect x=".95" y="1.95" width=".6" height=".12" rx=".06" fill="rgb(255 255 255 / .35)"/>` +
      `<rect x="2.4" y=".75" width="3.85" height="2.2" rx=".16" fill="#2a1880"/>` +
      `<circle cx="4.32" cy="1.85" r=".55" fill="#7c4dff"/><path d="M4.12 1.56 L4.62 1.85 L4.12 2.14Z" fill="#fff"/>` +
      `<rect x="2.4" y="3.2" width="3.85" height=".12" rx=".06" fill="rgb(255 255 255 / .2)"/><rect x="2.4" y="3.2" width="1.6" height=".12" rx=".06" fill="#c9bcff"/>`) +
    `<g class="float-sm" style="--d:-1.2s">${g.box(8.6, -2.6, 0.35, 2.6, 1.8, 0.16, "white")}${g.box(8.6, -2.6, 0.55, 2.6, 1.8, 0.16, "white")}${g.box(8.6, -2.6, 0.75, 2.6, 1.8, 0.16, "accent")}</g>`;
})();

const regular = (() => {
  const g = scene(120, 132, 12.5);
  const H = [0.9, 2.0, 3.1, 4.2], L = ["W1", "W4", "W8", "W12"];
  let steps = "";
  for (let i = 3; i >= 0; i--) {
    steps += g.box(0, -i * 2, 0.35, 3.8, 2, H[i], i === 3 ? "accent" : "base");
    steps += g.onFront(0, -i * 2 + 2, 0.35 + H[i], label(L[i], 0.5, i === 3 ? "#fff" : "#5b34e6", 1.9, 0.68, "middle"));
  }
  const [px, py] = g.P(1.9, -5.4, 0.35 + H[3]), [tx, ty] = g.P(1.9, -5.4, 0.35 + H[3] + 2.2);
  return DEFS + g.shadow(1.8, -2.4, 6.6, 3, 0.2) + g.plinth(-0.6, -6.6, 5, 9.2) + steps +
    `<line x1="${f1(px)}" y1="${f1(py)}" x2="${f1(tx)}" y2="${f1(ty)}" stroke="#4420c7" stroke-width="1.6" stroke-linecap="round"/>` +
    `<path d="M${f1(tx)} ${f1(ty)} l16 5 l-16 6z" fill="url(#a3-accent-l)"/>`;
})();

const premium = (() => {
  const g = scene(150, 130, 13);
  return DEFS + g.shadow(3.6, 2, 6.8, 2.6, 0.22) +
    g.plinth(-0.2, -0.2, 7.6, 4) +
    g.box(0.4, 0.9, 0.35, 1.8, 1.8, 2.0) + g.onFront(0.4, 2.7, 2.35, label("3", 0.9, "#8565ff", 0.9, 1.15, "middle")) +
    g.box(2.7, 0.9, 0.35, 1.8, 1.8, 3.1) + g.onFront(2.7, 2.7, 3.45, label("2", 0.9, "#8565ff", 0.9, 1.15, "middle")) +
    g.box(5.0, 0.9, 0.35, 1.8, 1.8, 4.3, "accent") + g.onFront(5.0, 2.7, 4.65, label("1", 0.9, "#fff", 0.9, 1.15, "middle")) +
    `<g class="float" style="--d:-1s">${g.gem(5.9, 1.8, 6.4, 1.0)}</g>`;
})();

const institutions = (() => {
  const g = scene(146, 128, 12);
  let cols = "", wins = "";
  for (let i = 0; i < 5; i++) cols += g.box(0.4 + i * 1.25, 3.3, 0.75, 0.4, 0.4, 2.05, "white");
  for (let i = 0; i < 3; i++) wins += `<rect x=".5" y="${(0.55 + i * 0.75).toFixed(2)}" width="2.1" height=".42" rx=".08" fill="#7c5cff" opacity=".55"/>`;
  return DEFS + g.shadow(3.2, 2.4, 7.2, 2.8, 0.2) +
    g.plinth(-0.8, -0.6, 7.8, 5.4) +
    g.box(-0.3, -0.1, 0.35, 6.8, 4.4, 0.4, "white") +
    g.box(0, 0, 0.75, 6.2, 3.2, 2.1) +
    g.onRight(6.2, 0.1, 2.85, wins) + cols +
    g.box(0.1, 3.15, 2.8, 6.0, 0.75, 0.3, "white") +
    g.roof(0, 0, 3.1, 6.2, 3.9, 1.35) +
    (() => { const [bx, by] = g.P(8.0, -2.2, 5.79), [ex, ey] = g.P(7.0, -1.2, 5.65); return `<g class="float" style="--d:-1.3s">${g.box(7.55, -1.75, 5.1, 0.9, 0.9, 0.55, "deep")}${g.box(7.0, -3.2, 5.65, 2, 2, 0.14, "accent")}${g.sphere(7.95, -2.25, 5.79, 0.13)}<path d="M${f1(bx)} ${f1(by)} L${f1(ex)} ${f1(ey)} l0 9" fill="none" stroke="#4420c7" stroke-width="1.3" stroke-linecap="round"/><circle cx="${f1(ex)}" cy="${f1(ey + 10)}" r="1.8" fill="#4420c7"/></g>`; })();
})();

const corporates = (() => {
  const g = scene(146, 124, 13);
  const hs = [1.3, 2.1, 2.9, 4.1];
  let bars = "";
  const tops: Pt[] = [];
  hs.forEach((h, i) => {
    bars += g.box(0.55 + i * 1.6, 0.9, 0.35, 1.05, 1.5, h, i === 3 ? "accent" : "base");
    tops.push(g.P(0.55 + i * 1.6 + 0.52, 0.9 + 0.75, 0.35 + h + 0.55));
  });
  const line = tops.map((p) => `${f1(p[0])},${f1(p[1])}`).join(" ");
  return DEFS + g.shadow(3.4, 1.8, 6.8, 2.6, 0.2) + g.plinth(-0.2, 0, 7.4, 3.4) + bars +
    `<polyline points="${line}" fill="none" stroke="#6c3bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
    tops.map((p, i) => `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${i === 3 ? 4 : 2.8}" fill="#fff" stroke="#6c3bff" stroke-width="1.6"/>`).join("") +
    `<circle class="pulse" cx="${f1(tops[3][0])}" cy="${f1(tops[3][1])}" r="4" fill="none" stroke="#6c3bff" stroke-width="1.2"/>`;
})();

const community = (() => {
  const R = 44, cx = 160, cy = 96;
  let mer = "", par = "";
  for (const rx of [14, 30, 42]) mer += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${R}"/>`;
  for (const [dy, rx] of [[-28, 34], [-12, 42], [12, 42], [28, 34]] as [number, number][]) par += `<ellipse cx="${cx}" cy="${cy + dy}" rx="${rx}" ry="${(rx * 0.22).toFixed(1)}"/>`;
  const node = (x: number, y: number, r: number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#a3-sph-brand)"/><ellipse cx="${(x - r * 0.35).toFixed(1)}" cy="${(y - r * 0.4).toFixed(1)}" rx="${(r * 0.32).toFixed(1)}" ry="${(r * 0.2).toFixed(1)}" fill="#fff" opacity=".8"/>`;
  return DEFS +
    `<ellipse cx="${cx}" cy="170" rx="62" ry="11" fill="rgb(52 24 150 / .2)" filter="url(#a3-blur)"/>` +
    `<path d="M106 160 v6 a54 13 0 0 0 108 0 v-6" fill="url(#a3-white-r)"/><ellipse cx="${cx}" cy="160" rx="54" ry="13" fill="url(#a3-white-t)" stroke="rgb(255 255 255 / .8)"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#a3-sph-brand)"/>` +
    `<g fill="none" stroke="rgb(255 255 255 / .3)" stroke-width=".9">${mer}${par}</g>` +
    `<ellipse cx="${cx - 15}" cy="${cy - 20}" rx="14" ry="8" fill="#fff" opacity=".45" transform="rotate(-30 ${cx - 15} ${cy - 20})"/>` +
    `<g transform="rotate(-16 ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="92" ry="24" fill="none" stroke="#8b6cff" stroke-width="1.6" stroke-dasharray="2 5" opacity=".8"/></g>` +
    `<g class="float" style="--d:-1s">${node(74, 114, 8)}</g><g class="float" style="--d:-2.2s">${node(248, 74, 9)}</g><g class="float" style="--d:-3.1s">${node(216, 126, 6)}</g>`;
})();

const saturday = (() => {
  const g = scene(150, 140, 14);
  return DEFS + g.shadow(2.1, 0.9, 4.6, 1.9, 0.22) + g.plinth(-0.7, -0.7, 5.6, 2.9) +
    g.box(0, 0, 0.35, 4.2, 1.3, 4.0, "base") +
    g.box(0, 0, 4.35, 4.2, 1.3, 0.9, "accent") +
    g.box(0.9, 0.45, 5.25, 0.3, 0.3, 0.55, "deep") + g.box(3.0, 0.45, 5.25, 0.3, 0.3, 0.55, "deep") +
    g.onFront(0, 1.3, 0.35 + 4.0, label("SAT", 1.35, "#4b2bc9", 2.1, 2.1, "middle") + label("FREE SESSION", 0.34, "#8565ff", 2.1, 2.85, "middle") + `<rect x=".9" y="3.25" width="2.4" height=".08" rx=".04" fill="#bda9ff"/>`) +
    g.onFront(0, 1.3, 5.25, label("WEEKLY", 0.36, "#fff", 2.1, 0.6, "middle"));
})();

/** Company: India and Australia — two campuses joined by one bridge of light. */
const company = (() => {
  const g = scene(158, 128, 12);
  const site = (x: number, y: number, name: string, tall: number) =>
    g.shadow(x + 2.3, y + 1.8, 3.8, 1.8, 0.2) + g.plinth(x, y, 4.6, 3.6, 0.5) +
    g.box(x + 0.5, y + 0.4, 0.5, 1.6, 1.6, tall, "accent") + g.box(x + 2.5, y + 0.4, 0.5, 1.6, 1.6, tall * 0.62) + g.box(x + 0.5, y + 2.3, 0.5, 3.6, 0.9, tall * 0.34, "white") +
    g.onFront(x, y + 3.6, 0.5, label(name, 0.42, "#5b34e6", 2.3, 0.38, "middle"));
  const a = g.P(-6.6 + 1.3, 2.6 + 1.2, 0.5 + 3.6), b = g.P(2.8 + 1.3, -6.8 + 1.2, 0.5 + 3.2);
  const mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - 52;
  const arc = `M${f1(a[0])} ${f1(a[1])} Q${f1(mx)} ${f1(my)} ${f1(b[0])} ${f1(b[1])}`;
  return DEFS +
    site(-6.6, 2.6, "COIMBATORE", 3.6) + site(2.8, -6.8, "SYDNEY", 3.2) +
    `<path d="${arc}" fill="none" stroke="#8b6cff" stroke-width="5" opacity=".25" filter="url(#a3-glow)"/>` +
    `<path d="${arc}" fill="none" stroke="url(#a3-beam)" stroke-width="2.2" stroke-linecap="round"/>` +
    `<circle r="3.2" fill="#fff" stroke="#6c3bff" stroke-width="1.6"><animateMotion dur="3.2s" repeatCount="indefinite" path="${arc}"/></circle>` +
    `<circle cx="${f1(a[0])}" cy="${f1(a[1])}" r="3" fill="#6c3bff"/><circle cx="${f1(b[0])}" cy="${f1(b[1])}" r="3" fill="#6c3bff"/>`;
})();

export const arts3d: Record<string, string> = { recorded, regular, premium, institutions, corporates, community, saturday, company };
