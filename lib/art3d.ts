/**
 * 3D illustrations (isometric, 320×200 viewBox) for programmes, partners, community and CTAs.
 * Built from a tiny projection helper so every scene shares the same light, palette and depth:
 * light from the top-left, three-tone faces, glossy spheres and soft contact shadows.
 */

type Pt = [number, number];
type Face = "base" | "accent" | "deep" | "screen";

const C = 0.866, S = 0.5;

function scene(ox: number, oy: number, s: number) {
  const P = (x: number, y: number, z: number): Pt => [ox + (x - y) * C * s, oy + (x + y) * S * s - z * s];
  const poly = (pts: Pt[], fill: string, extra = "") => `<polygon points="${pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ")}" fill="${fill}" ${extra}/>`;
  const edge = 'stroke="rgb(255 255 255 / .55)" stroke-width=".6" stroke-linejoin="round"';

  /** Axis-aligned box: x→right-down, y→left-down, z→up. Draws the three visible faces. */
  const box = (x: number, y: number, z: number, w: number, d: number, h: number, kind: Face = "base") => {
    const t = `url(#a3-${kind}-t)`, l = `url(#a3-${kind}-l)`, r = `url(#a3-${kind}-r)`;
    return (
      poly([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)], l) +
      poly([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)], r) +
      poly([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)], t, edge)
    );
  };

  /** Gable roof along x on top of a box. */
  const roof = (x: number, y: number, z: number, w: number, d: number, rise: number, overhang = 0.25) => {
    const x0 = x - overhang, x1 = x + w + overhang, y0 = y - overhang, y1 = y + d + overhang, ym = y + d / 2;
    return (
      poly([P(x0, y1, z), P(x1, y1, z), P(x1, ym, z + rise), P(x0, ym, z + rise)], "url(#a3-accent-t)", edge) +
      poly([P(x + w, y, z), P(x + w, y + d, z), P(x + w, ym, z + rise)], "url(#a3-accent-r)")
    );
  };

  /** Glossy sphere resting at (x,y,z) with radius r (in scene units). */
  const sphere = (x: number, y: number, z: number, r: number, kind: "brand" | "soft" = "brand") => {
    const [cx, cy] = P(x, y, z + r);
    const R = r * s;
    return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${R.toFixed(1)}" fill="url(#a3-sph-${kind})"/>` +
      `<ellipse cx="${(cx - R * 0.32).toFixed(1)}" cy="${(cy - R * 0.38).toFixed(1)}" rx="${(R * 0.32).toFixed(1)}" ry="${(R * 0.2).toFixed(1)}" fill="#fff" opacity=".75" transform="rotate(-30 ${(cx - R * 0.32).toFixed(1)} ${(cy - R * 0.38).toFixed(1)})"/>`;
  };

  /** Soft contact shadow on the ground under (x,y). */
  const shadow = (x: number, y: number, rx: number, ry = rx * 0.45, o = 0.22) => {
    const [cx, cy] = P(x, y, 0);
    return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(rx * s).toFixed(1)}" ry="${(ry * s).toFixed(1)}" fill="rgb(60 30 160 / ${o})" filter="url(#a3-blur)"/>`;
  };

  /** Text lying on the front (+y) face of a box: u along x, v down the face. */
  const onFront = (x: number, y: number, z: number, content: string) => {
    const [ex, ey] = P(x, y, z);
    return `<g transform="matrix(${(C * s).toFixed(3)},${(S * s).toFixed(3)},0,${s.toFixed(3)},${ex.toFixed(1)},${ey.toFixed(1)})">${content}</g>`;
  };

  return { P, poly, box, roof, sphere, shadow, onFront };
}

const DEFS = `<defs>
  <linearGradient id="a3-base-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ebe4ff"/></linearGradient>
  <linearGradient id="a3-base-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9ccff"/><stop offset="1" stop-color="#bba6ff"/></linearGradient>
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
  <filter id="a3-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
</defs>`;

/* ---------------- scenes ---------------- */

const recorded = (() => {
  const g = scene(150, 118, 13);
  return DEFS +
    g.shadow(3.5, 2.4, 5.2, 2.2, 0.2) +
    g.box(0, 0, 0, 7, 4.6, 0.45) +                       // laptop base
    g.box(0.7, 1.3, 0.45, 5.6, 2.6, 0.05, "base") +       // keyboard plate
    g.box(0, -0.4, 0.45, 7, 0.4, 4.6, "screen") +         // screen lid (front face = display)
    g.onFront(0, 0, 0.45 + 4.6,
      `<rect x=".55" y=".45" width="5.9" height="3.7" rx=".25" fill="rgb(255 255 255 / .06)"/>` +
      `<circle cx="3.5" cy="2.2" r=".95" fill="#7c4dff"/><circle cx="3.5" cy="2.2" r=".95" fill="none" stroke="#c9bcff" stroke-width=".08" opacity=".7"/>` +
      `<path d="M3.18 1.72 L4.05 2.2 L3.18 2.68Z" fill="#fff"/>` +
      `<rect x=".8" y="3.7" width="5.4" height=".12" rx=".06" fill="rgb(255 255 255 / .2)"/><rect x=".8" y="3.7" width="2.3" height=".12" rx=".06" fill="#c9bcff"/>`) +
    `<g class="float" style="--d:-1s">${g.shadow(9.6, -1.4, 1, 0.45, 0.14)}${g.sphere(9.6, -1.4, 2.8, 0.75)}</g>` +
    `<g class="float" style="--d:-2.6s">${g.box(-3.2, 3.2, 3.2, 1, 1, 1, "accent")}</g>` +
    `<g class="float-sm" style="--d:-3.4s">${g.sphere(8.2, 2.6, 0.2, 0.42, "soft")}</g>`;
})();

const regular = (() => {
  const g = scene(118, 128, 13);
  let steps = "";
  // a staircase climbing away from the viewer: Week 1 in front, Week 12 at the top
  for (let i = 3; i >= 0; i--) steps += g.box(0, -i * 2, 0, 3.6, 2, 0.8 + i * 1.15, i === 3 ? "accent" : "base");
  return DEFS + g.shadow(1.8, -2, 6.4, 2.6, 0.18) + steps +
    `<g class="float" style="--d:-.6s">${g.sphere(1.8, -5, 0.8 + 3 * 1.15 + 0.35, 0.62)}</g>` +
    g.onFront(0, 2, 0.8, `<text x="1.8" y=".6" text-anchor="middle" font-family="Inter,sans-serif" font-size=".48" font-weight="700" fill="#5b34e6">WEEK 1</text>`) +
    g.onFront(0, -4, 0.8 + 3 * 1.15, `<text x="1.8" y=".72" text-anchor="middle" font-family="Inter,sans-serif" font-size=".48" font-weight="700" fill="#fff">WEEK 12</text>`) +
    `<g class="float-sm" style="--d:-2s">${g.sphere(5.6, 1.4, 0.3, 0.42, "soft")}</g>`;
})();

const premium = (() => {
  const g = scene(150, 130, 13.5);
  return DEFS + g.shadow(3.5, 2, 7, 2.6, 0.2) +
    g.box(0, 0, 0, 7.2, 3.6, 0.4) +
    g.box(0.5, 0.9, 0.4, 1.7, 1.8, 2.2) +
    g.box(2.75, 0.9, 0.4, 1.7, 1.8, 3.4) +
    g.box(5.0, 0.9, 0.4, 1.7, 1.8, 4.9, "accent") +
    `<g class="float" style="--d:-1.2s">${g.sphere(5.85, 1.8, 6.3, 0.85)}</g>` +
    `<g class="float-sm" style="--d:-2.4s">${g.sphere(-1.2, 4.2, 0.4, 0.45, "soft")}</g>`;
})();

const institutions = (() => {
  const g = scene(150, 128, 12.5);
  let cols = "";
  for (let i = 0; i < 4; i++) cols += g.box(0.55 + i * 1.35, 3.25, 0.4, 0.45, 0.45, 2.1, "base");
  return DEFS + g.shadow(3.2, 2.2, 7, 2.6, 0.2) +
    g.box(-0.4, 0, 0, 6.8, 4.4, 0.4) +                  // plinth
    g.box(0, 0, 0.4, 6, 3.1, 2.4) +                     // hall
    cols +
    g.box(0.2, 3.2, 2.5, 5.6, 0.7, 0.3, "base") +        // entablature
    g.roof(0, 0, 2.8, 6, 3.9, 1.4) +
    `<g class="float" style="--d:-1.4s">${g.box(7.6, -1.4, 4.2, 1.9, 1.9, 0.18, "deep")}${g.sphere(8.55, -0.45, 4.38, 0.28)}</g>` +
    `<g class="float-sm" style="--d:-2.8s">${g.sphere(-2.4, 4.8, 0.3, 0.5, "soft")}</g>`;
})();

const corporates = (() => {
  const g = scene(146, 128, 14);
  const hs = [1.4, 2.3, 3.1, 4.4];
  let bars = "";
  hs.forEach((h, i) => (bars += g.box(0.6 + i * 1.55, 0.9, 0.4, 1.05, 1.6, h, i === 3 ? "accent" : "base")));
  return DEFS + g.shadow(3.4, 2, 7, 2.6, 0.2) +
    g.box(0, 0, 0, 7, 3.4, 0.4) + bars +
    `<g class="float" style="--d:-1s">${g.sphere(8.4, -1.2, 4.6, 0.75)}</g>` +
    `<g class="float-sm" style="--d:-2.2s">${g.box(-2.4, 3.6, 2.6, 0.9, 0.9, 0.9, "accent")}</g>`;
})();

const community = (() => {
  const R = 46;
  return DEFS +
    `<ellipse cx="160" cy="168" rx="58" ry="12" fill="rgb(60 30 160 / .2)" filter="url(#a3-blur)"/>` +
    `<circle cx="160" cy="104" r="${R}" fill="url(#a3-sph-brand)"/>` +
    `<g fill="none" stroke="rgb(255 255 255 / .38)" stroke-width="1"><ellipse cx="160" cy="104" rx="${R}" ry="15"/><ellipse cx="160" cy="104" rx="20" ry="${R}"/><path d="M114 104h92"/></g>` +
    `<ellipse cx="146" cy="84" rx="15" ry="9" fill="#fff" opacity=".55" transform="rotate(-30 146 84)"/>` +
    `<g transform="rotate(-14 160 104)"><ellipse cx="160" cy="104" rx="96" ry="26" fill="none" stroke="url(#a3-base-r)" stroke-width="2.2" opacity=".75"/></g>` +
    `<g class="float" style="--d:-1s"><circle cx="72" cy="118" r="9" fill="url(#a3-sph-soft)"/></g>` +
    `<g class="float-sm" style="--d:-2s"><circle cx="250" cy="84" r="11" fill="url(#a3-sph-brand)"/><ellipse cx="246.5" cy="80" rx="3.5" ry="2.2" fill="#fff" opacity=".7"/></g>` +
    `<g class="float" style="--d:-3s"><circle cx="214" cy="140" r="6" fill="url(#a3-sph-soft)"/></g>`;
})();

const saturday = (() => {
  const g = scene(150, 140, 15);
  return DEFS + g.shadow(2.1, 0.8, 4.4, 1.8, 0.2) +
    g.box(0, 0, 0, 4.2, 1.3, 4.2, "base") +
    g.box(0, 0, 4.2, 4.2, 1.3, 0.9, "accent") +
    `${g.box(0.9, 0.45, 5.1, 0.3, 0.3, 0.55, "deep")}${g.box(3.0, 0.45, 5.1, 0.3, 0.3, 0.55, "deep")}` +
    g.onFront(0, 1.3, 4.2, `<text x="2.1" y="2.3" text-anchor="middle" font-family="Inter,sans-serif" font-size="1.4" font-weight="800" fill="#4b2bc9">SAT</text><text x="2.1" y="3.1" text-anchor="middle" font-family="Inter,sans-serif" font-size=".36" font-weight="600" letter-spacing=".08" fill="#8565ff">FREE SESSION</text>`) +
    `<g class="float" style="--d:-1s">${g.sphere(6.2, -1.4, 3.6, 0.6)}</g>` +
    `<g class="float-sm" style="--d:-2.2s">${g.sphere(-2.4, 2.6, 0.3, 0.42, "soft")}</g>`;
})();

export const arts3d: Record<string, string> = { recorded, regular, premium, institutions, corporates, community, saturday };
