/**
 * The 3D scenes. Each builder returns a root object and an update(frame) that drives:
 *  - r      entrance progress 0→1 (first time the panel is seen)
 *  - t      time in seconds (idle motion)
 *  - hover  0→1 while the pointer is over the panel
 */
import * as THREE from "three";
import type { Built, Frame, Kit } from "./engine";
import { ease, easeBack, stagger } from "./util";

type Builder = (k: Kit) => Built;
const TAU = Math.PI * 2;

/* ---------------- Recorded: a laptop that opens, lesson tiles orbit it ---------------- */
const recorded: Builder = ({ mats, rbox, canvasTex, plane, shadow, font }) => {
  const root = new THREE.Group();
  root.add(shadow(2.6, 1.9, 0.55));

  const laptop = new THREE.Group();
  const base = rbox(3.2, 0.14, 2.2, 0.07, mats.white);
  base.position.y = 0.07;
  const keys = plane(2.8, 1.25, canvasTex(560, 250, (c, W, H) => {
    c.fillStyle = "#e7dfff"; c.beginPath(); c.roundRect(0, 0, W, H * 0.68, 18); c.fill();
    c.fillStyle = "#ffffff";
    for (let r = 0; r < 4; r++) for (let k = 0; k < 12; k++) { c.beginPath(); c.roundRect(14 + k * 44.5, 12 + r * 40, 38, 32, 7); c.fill(); }
    c.fillStyle = "#efe9ff"; c.beginPath(); c.roundRect(W / 2 - 90, H * 0.74, 180, H * 0.24, 14); c.fill();
  }));
  keys.rotation.x = -Math.PI / 2;
  keys.position.set(0, 0.142, 0.25);

  const hinge = new THREE.Group();
  hinge.position.set(0, 0.14, -1.06);
  const lid = rbox(3.2, 2.08, 0.08, 0.06, mats.deep);
  lid.position.y = 1.04;
  const screenTex = canvasTex(800, 520, (c, W, H) => {
    const g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, "#2e1a8f"); g.addColorStop(1, "#140b45");
    c.fillStyle = g; c.beginPath(); c.roundRect(0, 0, W, H, 22); c.fill();
    c.fillStyle = "rgba(255,255,255,.07)"; c.beginPath(); c.roundRect(28, 28, 180, H - 56, 14); c.fill();
    ["#c9bcff", "rgba(255,255,255,.4)", "rgba(255,255,255,.4)", "rgba(255,255,255,.4)"].forEach((col, i) => { c.fillStyle = col; c.beginPath(); c.roundRect(48, 56 + i * 40, i ? 120 : 140, 14, 7); c.fill(); });
    c.fillStyle = "#24157a"; c.beginPath(); c.roundRect(236, 28, W - 264, H - 120, 16); c.fill();
    c.fillStyle = "rgba(255,255,255,.22)"; c.beginPath(); c.roundRect(236, H - 62, W - 264, 12, 6); c.fill();
    c.fillStyle = "#c9bcff"; c.beginPath(); c.roundRect(236, H - 62, (W - 264) * 0.42, 12, 6); c.fill();
    c.fillStyle = "#fff"; c.font = font(26, 600); c.fillText("Module 01 · AI Basics", 262, 70);
  });
  const screen = plane(3.02, 1.94, screenTex);
  screen.position.set(0, 1.04, 0.045);
  const play = new THREE.Mesh(new THREE.CircleGeometry(0.26, 48), new THREE.MeshBasicMaterial({ color: "#7c4dff", toneMapped: false }));
  play.position.set(0.32, 1.12, 0.05);
  const tri = new THREE.Mesh(new THREE.CircleGeometry(0.12, 3), new THREE.MeshBasicMaterial({ color: "#ffffff", toneMapped: false }));
  tri.position.set(0.345, 1.12, 0.06);
  hinge.add(lid, screen, play, tri);
  laptop.add(base, keys, hinge);
  root.add(laptop);

  // lesson tiles orbiting
  const icons = ["▶", "✓", "AI"];
  const tiles = icons.map((txt, i) => {
    const g = new THREE.Group();
    g.add(rbox(0.62, 0.62, 0.12, 0.12, i === 1 ? mats.violet : mats.white));
    const p = plane(0.4, 0.4, canvasTex(128, 128, (c, W) => { c.fillStyle = i === 1 ? "#fff" : "#6c3bff"; c.font = font(txt === "AI" ? 56 : 64, 800); c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(txt, W / 2, W / 2 + 4); }));
    p.position.z = 0.065;
    g.add(p);
    root.add(g);
    return g;
  });

  return {
    root,
    camera: { pos: [6.2, 4.6, 7.4], look: [0, 0.95, 0] },
    update: ({ t, r, hover }) => {
      const open = ease((r - 0.15) / 0.75);
      hinge.rotation.x = THREE.MathUtils.lerp(Math.PI / 2 - 0.02, -0.22, open);
      laptop.position.y = (1 - ease(r / 0.5)) * -0.4;
      play.scale.setScalar(1 + Math.sin(t * 3) * 0.06 + hover * 0.18);
      tiles.forEach((g, i) => {
        const k = stagger(r, i, 3, 0.5);
        const a = t * 0.35 + (i * TAU) / 3;
        g.position.set(Math.cos(a) * 2.35, 1.3 + Math.sin(t * 1.4 + i) * 0.15 + i * 0.25, Math.sin(a) * 1.7);
        g.scale.setScalar(easeBack(k) * (1 + hover * 0.1));
        g.lookAt(6.2, 4.6, 7.4);
      });
    },
  };
};

/* ---------------- Regular: 12 steps spiral up, an orb climbs the weeks ---------------- */
const regular: Builder = ({ mats, rbox, canvasTex, plane, shadow, font }) => {
  const root = new THREE.Group();
  root.add(shadow(2.6, 2.6, 0.5));
  const N = 12, steps: THREE.Group[] = [], pos: THREE.Vector3[] = [];
  const cA = new THREE.Color("#f3efff"), cB = new THREE.Color("#6c3bff");
  for (let i = 0; i < N; i++) {
    const a = -Math.PI * 0.15 + (i / (N - 1)) * Math.PI * 1.55;
    const g = new THREE.Group();
    const mat = (mats.lilac as THREE.MeshPhysicalMaterial).clone();
    mat.color = cA.clone().lerp(cB, i / (N - 1));
    const h = 0.3;
    const b = rbox(1.05, h, 0.72, 0.09, mat);
    g.add(b);
    const lbl = plane(0.6, 0.3, canvasTex(160, 80, (c, W, H) => { c.fillStyle = i > 6 ? "#ffffff" : "#5b34e6"; c.font = font(44, 800); c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(`W${i + 1}`, W / 2, H / 2 + 2); }));
    lbl.rotation.x = -Math.PI / 2;
    lbl.position.y = h / 2 + 0.002;
    g.add(lbl);
    const y = 0.15 + i * 0.2;
    g.position.set(Math.cos(a) * 1.65, y, Math.sin(a) * 1.65);
    g.rotation.y = -a + Math.PI / 2;
    root.add(g);
    steps.push(g);
    pos.push(new THREE.Vector3(Math.cos(a) * 1.65, y + h / 2 + 0.17, Math.sin(a) * 1.65));
  }
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 2.6, 32), mats.white);
  column.position.y = 1.3;
  root.add(column);
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.17, 32, 32), mats.glow);
  root.add(orb);
  const halo = new THREE.PointLight("#8b6cff", 2.5, 2.2);
  orb.add(halo);
  // flag on week 12
  const flag = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.9, 12), mats.deep);
  pole.position.y = 0.45;
  const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.26, 8, 1), new THREE.MeshStandardMaterial({ color: "#6c3bff", side: THREE.DoubleSide, roughness: 0.4 }));
  cloth.position.set(0.21, 0.76, 0);
  flag.add(pole, cloth);
  flag.position.copy(pos[N - 1]).add(new THREE.Vector3(0, -0.17, 0));
  root.add(flag);
  const clothPos = (cloth.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute;
  const base0 = Float32Array.from(clothPos.array as Float32Array);

  return {
    root,
    camera: { pos: [7.4, 5.2, 8.6], look: [0, 1.45, 0] },
    update: ({ t, r, hover }) => {
      steps.forEach((g, i) => { const k = stagger(r, i, N, 0.4); g.scale.setScalar(Math.max(0.001, easeBack(k))); });
      flag.scale.setScalar(Math.max(0.001, easeBack(stagger(r, N, N + 1, 0.3))));
      // orb hops from week to week
      const speed = 1.4 + hover * 1.2;
      const u = (t * speed) % (N + 2);
      const i = Math.max(0, Math.min(N - 1, Math.floor(u))), f = Math.min(1, u - Math.floor(u));
      const a = pos[i], b = pos[Math.min(N - 1, i + 1)];
      orb.position.lerpVectors(a, b, ease(f)).add(new THREE.Vector3(0, Math.sin(Math.PI * f) * 0.28, 0));
      orb.visible = r > 0.6;
      for (let v = 0; v < clothPos.count; v++) { const x = base0[v * 3]; clothPos.setZ(v, Math.sin(t * 6 + x * 12) * 0.03 * (x + 0.21)); }
      clothPos.needsUpdate = true;
    },
  };
};

/* ---------------- Premium: faceted gem rises over a tiered podium ---------------- */
const premium: Builder = ({ mats, shadow }) => {
  const root = new THREE.Group();
  root.add(shadow(2.4, 2.4, 0.5));
  const tiers = [
    { r: 1.75, h: 0.28, m: mats.white },
    { r: 1.4, h: 0.28, m: mats.lilac },
    { r: 1.05, h: 0.28, m: mats.violet },
  ].map((d, i) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(d.r, d.r + 0.03, d.h, 96), d.m);
    m.position.y = d.h / 2 + i * d.h;
    root.add(m);
    return m;
  });
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.72, 0), mats.gem);
  gem.scale.set(1, 1.35, 1);
  const gemWrap = new THREE.Group();
  gemWrap.add(gem);
  root.add(gemWrap);
  const glow = new THREE.PointLight("#8b6cff", 6, 4);
  glow.position.y = 1.9;
  root.add(glow);
  const rings = [0, 1].map((i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25 + i * 0.32, 0.018, 16, 160), mats.soft);
    ring.rotation.x = Math.PI / 2 + (i ? 0.5 : -0.35);
    ring.position.y = 2.05;
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 24), mats.glow);
    ring.add(bead);
    root.add(ring);
    return { ring, bead, rad: 1.25 + i * 0.32, sp: i ? -0.7 : 0.9 };
  });
  return {
    root,
    camera: { pos: [6, 4.4, 7.2], look: [0, 1.4, 0] },
    update: ({ t, r, hover }) => {
      tiers.forEach((m, i) => { const k = stagger(r, i, 3, 0.5); m.scale.set(1, Math.max(0.001, ease(k)), 1); m.position.y = (0.28 / 2 + i * 0.28) * ease(k); });
      const k = easeBack(stagger(r, 3, 4, 0.45));
      gemWrap.scale.setScalar(Math.max(0.001, k));
      gemWrap.position.y = 2.05 + Math.sin(t * 1.3) * 0.12 + (1 - k) * -0.8;
      gem.rotation.y = t * (0.5 + hover * 1.6);
      rings.forEach(({ ring, bead, rad, sp }) => { ring.scale.setScalar(Math.max(0.001, ease(stagger(r, 3, 4, 0.4)))); const a = t * sp; bead.position.set(Math.cos(a) * rad, Math.sin(a) * rad, 0); });
      glow.intensity = 4 + Math.sin(t * 2) * 1.5 + hover * 4;
    },
  };
};

/* ---------------- Institutions: books stack up, the graduation cap lands ---------------- */
const institutions: Builder = ({ mats, rbox, shadow }) => {
  const root = new THREE.Group();
  root.add(shadow(2.4, 2, 0.5));
  const books = [
    { w: 2.6, d: 1.8, h: 0.34, m: mats.violet, ry: 0.08 },
    { w: 2.4, d: 1.7, h: 0.3, m: mats.white, ry: -0.12 },
    { w: 2.5, d: 1.75, h: 0.32, m: mats.deep, ry: 0.18 },
  ].map((b) => {
    const g = new THREE.Group();
    const cover = rbox(b.w, b.h, b.d, 0.06, b.m);
    const pages = rbox(b.w - 0.12, b.h - 0.08, b.d - 0.06, 0.03, mats.white);
    pages.position.x = 0.07;
    g.add(cover, pages);
    g.rotation.y = b.ry;
    root.add(g);
    return { g, h: b.h };
  });
  let y = 0;
  const targets = books.map((b) => { const ty = y + b.h / 2; y += b.h; return ty; });
  // mortarboard
  const cap = new THREE.Group();
  const skull = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.42, 48), mats.deep);
  const board = rbox(1.9, 0.07, 1.9, 0.03, mats.deep);
  board.position.y = 0.25;
  board.rotation.y = Math.PI / 4;
  const button = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 20), mats.glow);
  button.position.y = 0.3;
  const cordCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.3, 0), new THREE.Vector3(0.66, 0.28, 0.0), new THREE.Vector3(0.95, 0.1, 0.05), new THREE.Vector3(0.98, -0.25, 0.05)]);
  const cord = new THREE.Mesh(new THREE.TubeGeometry(cordCurve, 24, 0.018, 8), mats.glow);
  const tassel = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 16), mats.glow);
  tassel.position.set(0.98, -0.34, 0.05);
  tassel.rotation.x = Math.PI;
  cap.add(skull, board, button, cord, tassel);
  root.add(cap);
  return {
    root,
    camera: { pos: [6, 4.8, 7], look: [0, 0.95, 0] },
    update: ({ t, r, hover }) => {
      books.forEach(({ g }, i) => { const k = stagger(r, i, 4, 0.45); g.position.y = targets[i] + (1 - easeBack(k)) * 2.2; g.visible = k > 0.001; });
      const k = stagger(r, 3, 4, 0.45);
      cap.position.y = y + 0.45 + (1 - ease(k)) * 2.5 + Math.sin(t * 1.4) * 0.08 + hover * 0.25;
      cap.rotation.y = t * 0.35 + hover * 0.6;
      cap.rotation.z = Math.sin(t * 1.1) * 0.05;
      cap.visible = k > 0.001;
    },
  };
};

/* ---------------- Corporates: bars grow, the trend line draws across them ---------------- */
const corporates: Builder = ({ mats, rbox, shadow }) => {
  const root = new THREE.Group();
  root.add(shadow(2.8, 2, 0.5));
  const plate = rbox(4.2, 0.18, 2.2, 0.08, mats.white);
  plate.position.y = 0.09;
  root.add(plate);
  const H = [0.7, 1.15, 1.0, 1.7, 2.4];
  const bars = H.map((h, i) => {
    const m = rbox(0.55, 1, 0.55, 0.08, i === H.length - 1 ? mats.violet : i % 2 ? mats.lilac : mats.soft);
    m.position.set(-1.6 + i * 0.8, 0.18, 0);
    root.add(m);
    return m;
  });
  const pts = H.map((h, i) => new THREE.Vector3(-1.6 + i * 0.8, 0.18 + h + 0.35, 0.05));
  const curve = new THREE.CatmullRomCurve3(pts);
  const tubeGeo = new THREE.TubeGeometry(curve, 160, 0.04, 12);
  const tube = new THREE.Mesh(tubeGeo, mats.glow);
  root.add(tube);
  const dots = pts.map((p) => { const d = new THREE.Mesh(new THREE.SphereGeometry(0.08, 24, 24), mats.white); d.position.copy(p); root.add(d); return d; });
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.3, 24), mats.glow);
  root.add(head);
  const total = tubeGeo.index!.count;
  return {
    root,
    camera: { pos: [5.8, 4.2, 7.6], look: [0, 1.15, 0] },
    update: ({ t, r, hover }) => {
      bars.forEach((m, i) => {
        const k = ease(stagger(r, i, H.length + 2, 0.5));
        const h = Math.max(0.001, H[i] * k * (1 + (i === H.length - 1 ? hover * 0.12 : 0) + Math.sin(t * 1.6 + i) * 0.015));
        m.scale.y = h;
        m.position.y = 0.18 + h / 2;
      });
      const draw = ease((r - 0.45) / 0.55);
      tubeGeo.setDrawRange(0, Math.floor((total * draw) / 3) * 3);
      dots.forEach((d, i) => d.scale.setScalar(draw > i / (H.length - 1) - 0.02 ? 1 + (i === H.length - 1 ? Math.sin(t * 3) * 0.2 : 0) : 0.001));
      const tip = curve.getPoint(Math.max(0.001, draw)), dir = curve.getTangent(Math.max(0.001, draw));
      head.position.copy(tip);
      head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      head.visible = draw > 0.02;
    },
  };
};

/* ---------------- Community: dotted globe, arcs connect members, people orbit ---------------- */
const community: Builder = ({ mats, shadow, canvasTex }) => {
  const root = new THREE.Group();
  root.add(shadow(1.9, 1.9, 0.5));
  const globe = new THREE.Group();
  globe.position.y = 1.55;
  const R = 1.15;
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), mats.lilac));
  // fibonacci dots as one point cloud (single draw call)
  const N = 1100, arr = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(1 - y * y), th = i * 2.39996, rr = R + 0.012;
    arr.set([Math.cos(th) * rad * rr, y * rr, Math.sin(th) * rad * rr], i * 3);
  }
  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  const dotTex = canvasTex(32, 32, (c, W) => { c.fillStyle = "#3a19b0"; c.beginPath(); c.arc(W / 2, W / 2, W / 2 - 1, 0, TAU); c.fill(); });
  const dots = new THREE.Points(dotGeo, new THREE.PointsMaterial({ size: 0.065, map: dotTex, transparent: true, alphaTest: 0.4, sizeAttenuation: true, toneMapped: false }));
  globe.add(dots);
  const ll = (lat: number, lon: number) => { const a = THREE.MathUtils.degToRad(lat), b = THREE.MathUtils.degToRad(lon); return new THREE.Vector3(Math.cos(a) * Math.cos(b), Math.sin(a), -Math.cos(a) * Math.sin(b)).multiplyScalar(R + 0.02); };
  const home = ll(11, 77);
  const dests = [ll(-33.9, 151.2), ll(51.5, -0.1), ll(1.35, 103.8), ll(25.2, 55.3), ll(37.8, -122.4)];
  const arcs = dests.map((d) => {
    const mid = home.clone().add(d).multiplyScalar(0.5).normalize().multiplyScalar(R + 0.35 + home.distanceTo(d) * 0.25);
    const curve = new THREE.QuadraticBezierCurve3(home, mid, d);
    const geo = new THREE.TubeGeometry(curve, 64, 0.02, 8);
    const tube = new THREE.Mesh(geo, mats.glow);
    const spark = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), mats.white);
    globe.add(tube, spark);
    return { curve, geo, spark, total: geo.index!.count };
  });
  const pin = new THREE.Mesh(new THREE.SphereGeometry(0.06, 20, 20), mats.glow);
  pin.position.copy(home);
  globe.add(pin);
  root.add(globe);
  // orbit of members
  const orbit = new THREE.Group();
  orbit.position.y = 1.55;
  orbit.rotation.set(0.35, 0, -0.25);
  orbit.add(new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.01, 8, 200), mats.soft));
  const people = [0, 1, 2, 3].map((i) => {
    const p = new THREE.Group();
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 20), i % 2 ? mats.violet : mats.deep);
    head.position.y = 0.14;
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 20, 0, TAU, 0, Math.PI / 2), i % 2 ? mats.violet : mats.deep);
    p.add(head, body);
    orbit.add(p);
    return p;
  });
  root.add(orbit);
  return {
    root,
    camera: { pos: [5.4, 3.6, 6.6], look: [0, 1.45, 0] },
    update: ({ t, r, hover }) => {
      const k = easeBack(Math.min(1, r / 0.6));
      globe.scale.setScalar(Math.max(0.001, k));
      globe.rotation.y = t * (0.12 + hover * 0.25) - 1.1;
      arcs.forEach((a, i) => {
        const d = ease((r - 0.35 - i * 0.08) / 0.5);
        a.geo.setDrawRange(0, Math.floor((a.total * d) / 3) * 3);
        const u = ((t * 0.35 + i / arcs.length) % 1);
        a.spark.position.copy(a.curve.getPoint(u));
        a.spark.visible = d >= 1;
      });
      orbit.scale.setScalar(Math.max(0.001, ease((r - 0.4) / 0.6)));
      people.forEach((p, i) => { const a = t * 0.4 + (i * TAU) / 4; p.position.set(Math.cos(a) * 1.95, Math.sin(a) * 1.95, 0); p.rotation.z = a - Math.PI / 2; p.rotation.x = Math.PI / 2; });
    },
  };
};

/* ---------------- Saturday: a calendar page flips to SAT ---------------- */
const saturday: Builder = ({ mats, rbox, canvasTex, plane, shadow, font }) => {
  const root = new THREE.Group();
  root.add(shadow(1.9, 1.3, 0.5));
  const cal = new THREE.Group();
  const body = rbox(2.2, 2.3, 0.4, 0.14, mats.white);
  body.position.y = 1.15;
  const head = rbox(2.2, 0.55, 0.44, 0.14, mats.violet);
  head.position.y = 2.15;
  const rings = [-0.55, 0.55].map((x) => { const t = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.035, 16, 48), mats.deep); t.position.set(x, 2.45, 0); t.rotation.y = Math.PI / 2; return t; });
  const pageTex = (day: string, sub: string, strong: boolean) => canvasTex(440, 360, (c, W, H) => {
    c.fillStyle = "#ffffff"; c.beginPath(); c.roundRect(0, 0, W, H, 24); c.fill();
    c.textAlign = "center";
    c.fillStyle = strong ? "#5a2ef0" : "#a29dc2"; c.font = font(150, 800); c.fillText(day, W / 2, H * 0.6);
    c.fillStyle = strong ? "#8b6cff" : "#c4bfdc"; c.font = font(32, 700); c.fillText(sub, W / 2, H * 0.84);
  });
  const sat = plane(1.9, 1.55, pageTex("SAT", "FREE SESSION", true));
  sat.position.set(0, 1.0, 0.205);
  const hinge = new THREE.Group();
  hinge.position.set(0, 1.78, 0.215);
  const fri = plane(1.9, 1.55, pageTex("FRI", "THIS WEEK", false), { side: THREE.FrontSide });
  fri.position.y = -0.775;
  hinge.add(fri);
  cal.add(body, head, ...rings, sat, hinge);
  root.add(cal);
  const badge = new THREE.Group();
  badge.add(new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 32), mats.glow));
  badge.position.set(1.35, 2.45, 0.3);
  root.add(badge);
  return {
    root,
    camera: { pos: [5.2, 3.6, 8.2], look: [0, 1.35, 0] },
    update: ({ t, r, hover }) => {
      cal.position.y = (1 - easeBack(Math.min(1, r / 0.55))) * -1.2;
      cal.rotation.y = -0.35 + Math.sin(t * 0.6) * 0.06;
      // FRI flips over to reveal SAT on entrance; hovering peeks back at Friday
      const flip = ease((r - 0.45) / 0.55);
      const f2 = flip * (1 - hover * 0.4);
      hinge.rotation.x = -Math.PI * 0.62 * f2;
      (fri.material as THREE.MeshBasicMaterial).opacity = 1 - ease((f2 - 0.35) / 0.65);
      badge.scale.setScalar(Math.max(0.001, easeBack((r - 0.7) / 0.3)) * (1 + Math.sin(t * 3) * 0.08));
    },
  };
};

export const builders: Record<string, Builder> = { recorded, regular, premium, institutions, corporates, community, saturday };
export type { Frame };
