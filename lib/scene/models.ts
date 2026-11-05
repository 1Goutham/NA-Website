/**
 * 3D models for the illustration panels. All are built from the same material kit
 * (violet satin, ink, white ceramic, lilac, chrome, clear glass, glow) so every panel on
 * every page reads as one family. Units: the floor is y = 0; models are about 3 wide, 2 tall.
 */
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export type Model = {
  group: THREE.Group;
  /** per-frame animation: time (s), delta (s), intro progress 0…1 */
  tick?: (t: number, dt: number, intro: number) => void;
  /** resting turn (radians) */
  yaw?: number;
  /** >1 pulls the camera back */
  zoom?: number;
  /** camera elevation (radians) */
  elev?: number;
};

/* ---------------- material kit ---------------- */

const VIOLET = 0x6c3bff;

function kit() {
  const phys = (p: THREE.MeshPhysicalMaterialParameters) => new THREE.MeshPhysicalMaterial(p);
  return {
    violet: phys({ color: VIOLET, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08, sheen: 0.5, sheenColor: 0xc4b2ff, sheenRoughness: 0.4 }),
    deep: phys({ color: 0x3a1fb0, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 }),
    lilac: phys({ color: 0xc9bcff, roughness: 0.36, clearcoat: 0.8, clearcoatRoughness: 0.15 }),
    ink: phys({ color: 0x1a1733, roughness: 0.34, metalness: 0.1, clearcoat: 0.9, clearcoatRoughness: 0.12 }),
    fabric: phys({ color: 0x1c1838, roughness: 0.75, sheen: 1, sheenColor: 0x6c5bd6, sheenRoughness: 0.5 }),
    ceramic: phys({ color: 0xfbfaff, roughness: 0.38, clearcoat: 0.7, clearcoatRoughness: 0.18 }),
    mist: phys({ color: 0xe6e1f6, roughness: 0.42, clearcoat: 0.5, clearcoatRoughness: 0.2 }),
    alu: new THREE.MeshStandardMaterial({ color: 0xd7d4e2, metalness: 0.85, roughness: 0.32 }),
    graphite: new THREE.MeshStandardMaterial({ color: 0x6f6b85, metalness: 0.8, roughness: 0.34 }),
    chrome: new THREE.MeshStandardMaterial({ color: 0xeeebf7, metalness: 1, roughness: 0.12 }),
    glass: phys({ color: 0xffffff, transmission: 1, thickness: 0.9, roughness: 0.03, ior: 1.5, attenuationColor: 0xcfc2ff, attenuationDistance: 2.2, clearcoat: 1, specularIntensity: 1 }),
    frost: phys({ color: 0xf3efff, transmission: 1, thickness: 0.6, roughness: 0.32, ior: 1.45, attenuationColor: 0xb8a6ff, attenuationDistance: 1.6 }),
    glow: new THREE.MeshStandardMaterial({ color: 0x8b6cff, emissive: 0x7b52ff, emissiveIntensity: 1.6, roughness: 0.4 }),
  };
}
type Kit = ReturnType<typeof kit>;

/* ---------------- helpers ---------------- */

const rbox = (w: number, h: number, d: number, r: number, m: THREE.Material, seg = 4) =>
  new THREE.Mesh(new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2, h / 2, d / 2) * 0.999), m);
const cyl = (rt: number, rb: number, h: number, m: THREE.Material, seg = 48) => new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m);
const ball = (r: number, m: THREE.Material, seg = 40) => new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.75)), m);
const at = <T extends THREE.Object3D>(o: T, x: number, y: number, z: number) => { o.position.set(x, y, z); return o; };
const tube = (pts: THREE.Vector3[], r: number, m: THREE.Material, seg = 64) => new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), seg, r, 16, false), m);
const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

/** Mix two hex colours into a new glossy material. */
function blend(a: number, b: number, t: number) {
  const c = new THREE.Color(a).lerp(new THREE.Color(b), t);
  return new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 });
}

/** A glowing screen face drawn on a canvas. */
function screen(w: number, h: number, draw: (g: CanvasRenderingContext2D, W: number, H: number) => void) {
  const W = 1024, H = Math.round((1024 * h) / w);
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d")!;
  const bg = g.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#14102e");
  bg.addColorStop(1, "#0b0920");
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);
  const halo = g.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, W * 0.55);
  halo.addColorStop(0, "rgba(124,82,255,0.55)");
  halo.addColorStop(1, "rgba(124,82,255,0)");
  g.fillStyle = halo;
  g.fillRect(0, 0, W, H);
  draw(g, W, H);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return new THREE.MeshPhysicalMaterial({ color: 0x000000, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 1, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.02 });
}
const rr = (g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => { g.beginPath(); g.roundRect(x, y, w, h, r); };

/** A flat shape extruded with soft bevels. */
function extrude(shape: THREE.Shape, depth: number, bevel: number, m: THREE.Material) {
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 6, curveSegments: 24 });
  geo.center();
  return new THREE.Mesh(geo, m);
}

/* ---------------- programme & partner models ---------------- */

/** Recorded: a studio monitor playing a lesson, a glass play button and a progress bar. */
function recorded(k: Kit): Model {
  const g = new THREE.Group();
  const W = 2.7, H = 1.62;
  const mon = new THREE.Group();
  mon.add(rbox(W, H, 0.1, 0.07, k.ceramic));
  const face = screen(W - 0.14, H - 0.14, (c, w, h) => {
    // lesson slide: title bars, a code block, a chart
    c.fillStyle = "rgba(255,255,255,0.9)"; rr(c, 70, 64, 330, 26, 13); c.fill();
    c.fillStyle = "rgba(201,188,255,0.45)"; rr(c, 70, 108, 230, 16, 8); c.fill();
    c.fillStyle = "rgba(255,255,255,0.06)"; rr(c, 70, 160, 400, 330, 18); c.fill();
    const cols = ["#a58bff", "#ffffff", "#6c3bff", "#c9bcff"];
    for (let i = 0; i < 9; i++) { c.fillStyle = cols[i % 4]; c.globalAlpha = 0.55; rr(c, 100 + (i % 3) * 22, 190 + i * 32, 120 + ((i * 57) % 180), 12, 6); c.fill(); }
    c.globalAlpha = 1;
    [0.35, 0.55, 0.45, 0.75, 0.9].forEach((v, i) => { const bh = v * 260; c.fillStyle = i === 4 ? "#8b6cff" : "rgba(201,188,255,0.35)"; rr(c, w - 420 + i * 70, h - 110 - bh, 44, bh, 8); c.fill(); });
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.14, H - 0.14), face);
  scr.position.z = 0.051;
  mon.add(scr);
  at(mon, 0, 1.36, 0);
  mon.rotation.x = -0.04;
  g.add(mon);
  g.add(at(rbox(0.2, 0.62, 0.08, 0.03, k.alu), 0, 0.34, -0.12));
  g.add(at(rbox(1.0, 0.05, 0.55, 0.025, k.alu), 0, 0.025, -0.05));

  // glass play disc + violet triangle, floating in front
  const play = new THREE.Group();
  const disc = cyl(0.42, 0.42, 0.1, k.frost, 64);
  disc.rotation.x = Math.PI / 2;
  play.add(disc);
  const tri = new THREE.Shape();
  tri.moveTo(-0.11, 0.15); tri.lineTo(0.17, 0); tri.lineTo(-0.11, -0.15); tri.closePath();
  const triM = extrude(tri, 0.05, 0.025, k.violet);
  triM.position.set(0.02, 0, 0.09);
  play.add(triM);
  at(play, 0, 1.4, 0.55);
  g.add(play);

  // progress bar
  const bar = new THREE.Group();
  const track = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 2.0, 8, 24), k.mist);
  track.rotation.z = Math.PI / 2;
  bar.add(track);
  const fill = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 1, 8, 24), k.violet);
  fill.rotation.z = Math.PI / 2;
  bar.add(fill);
  const knob = ball(0.085, k.chrome);
  bar.add(knob);
  at(bar, 0, 0.78, 0.42);
  g.add(bar);

  return {
    group: g, yaw: -0.32, elev: 0.16,
    tick: (t, _dt, e) => {
      const p = 0.12 + ((t * 0.06) % 1) * 0.86;
      const len = 2.07 * p * e;
      fill.scale.y = Math.max(0.001, len / 1.09);
      fill.position.x = -1.035 + len / 2;
      knob.position.x = -1.035 + len;
      play.position.y = 1.4 + Math.sin(t * 1.3) * 0.05;
      play.rotation.y = Math.sin(t * 0.8) * 0.18;
    },
  };
}

/** Regular: twelve steps, one per week, rising to a flag. */
function regular(k: Kit): Model {
  const g = new THREE.Group();
  const steps: THREE.Mesh[] = [];
  for (let i = 0; i < 12; i++) {
    const h = 0.16 + i * 0.13;
    const m = i === 11 ? k.violet : blend(0xfbfaff, 0x9f86ff, Math.pow(i / 11, 1.6));
    const s = rbox(0.21, h, 0.62, 0.05, m);
    s.position.set(-1.45 + i * 0.264, h / 2, 0);
    s.userData.h = h;
    g.add(s);
    steps.push(s);
  }
  const top = steps[11].userData.h as number;
  const flag = new THREE.Group();
  flag.add(at(cyl(0.016, 0.016, 0.72, k.chrome, 16), 0, 0.36, 0));
  flag.add(at(ball(0.035, k.chrome, 20), 0, 0.73, 0));
  const cloth = new THREE.PlaneGeometry(0.46, 0.28, 18, 6);
  cloth.translate(0.23, 0, 0);
  const base = (cloth.attributes.position.array as Float32Array).slice();
  const clothM = new THREE.Mesh(cloth, new THREE.MeshPhysicalMaterial({ color: VIOLET, roughness: 0.5, sheen: 1, sheenColor: 0xd7caff, side: THREE.DoubleSide }));
  clothM.position.y = 0.56;
  flag.add(clothM);
  at(flag, steps[11].position.x, top, 0);
  g.add(flag);
  const orb = at(ball(0.07, k.glow, 24), steps[11].position.x - 0.55, top + 0.35, 0.15);
  g.add(orb);

  return {
    group: g, yaw: -0.42, elev: 0.2,
    tick: (t, _dt, e) => {
      steps.forEach((s, i) => { const p = easeOut(e * 1.6 - i * 0.05); s.scale.y = Math.max(0.01, p); s.position.y = (s.userData.h * p) / 2; });
      flag.position.y = top * easeOut(e * 1.6 - 0.55);
      flag.scale.setScalar(Math.max(0.001, easeOut(e * 2 - 1)));
      const p = cloth.attributes.position.array as Float32Array;
      for (let i = 0; i < p.length; i += 3) { const x = base[i]; p[i + 2] = Math.sin(x * 9 - t * 4) * 0.035 * (x / 0.46); p[i + 1] = base[i + 1] + Math.sin(x * 6 - t * 3) * 0.01 * (x / 0.46); }
      cloth.attributes.position.needsUpdate = true;
      cloth.computeVertexNormals();
      orb.position.y = top + 0.35 + Math.sin(t * 1.6) * 0.06;
    },
  };
}

/** Premium: a brilliant-cut gem in clear glass above a ceramic pedestal. */
function premium(k: Kit): Model {
  const g = new THREE.Group();
  const prof = [new THREE.Vector2(0, -0.92), new THREE.Vector2(0.98, 0.02), new THREE.Vector2(1.0, 0.1), new THREE.Vector2(0.58, 0.5), new THREE.Vector2(0, 0.5)];
  const geo = new THREE.LatheGeometry(prof, 16).toNonIndexed();
  geo.computeVertexNormals();
  const gemM = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, thickness: 1.6, roughness: 0, ior: 2.1, dispersion: 5, iridescence: 0.35, iridescenceIOR: 1.6, attenuationColor: 0xa48aff, attenuationDistance: 2.4, specularIntensity: 1, clearcoat: 1, flatShading: true, envMapIntensity: 2.2 });
  const gem = new THREE.Mesh(geo, gemM);
  gem.scale.setScalar(0.72);
  const gemPivot = new THREE.Group();
  gemPivot.add(gem);
  gemPivot.rotation.z = 0.1;
  at(gemPivot, 0, 1.38, 0);
  g.add(gemPivot);

  // pedestal: ceramic plinth, violet band, chrome rim
  g.add(at(cyl(0.92, 0.98, 0.28, k.ceramic, 72), 0, 0.14, 0));
  g.add(at(cyl(0.8, 0.8, 0.06, k.ink, 72), 0, 0.31, 0));
  g.add(at(cyl(0.93, 0.93, 0.04, k.violet, 72), 0, 0.22, 0));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.018, 16, 96), k.chrome);
  ring.rotation.x = Math.PI / 2;
  g.add(at(ring, 0, 0.34, 0));
  // orbiting sparks
  const sparks: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) { const s = ball(0.045 + i * 0.01, i === 1 ? k.chrome : k.glow, 20); sparks.push(s); g.add(s); }

  return {
    group: g, elev: 0.18, zoom: 0.95,
    tick: (t) => {
      gem.rotation.y = t * 0.45;
      gemPivot.position.y = 1.38 + Math.sin(t * 1.1) * 0.06;
      sparks.forEach((s, i) => { const a = t * (0.6 + i * 0.15) + (i * Math.PI * 2) / 3; s.position.set(Math.cos(a) * 1.15, 1.2 + Math.sin(a * 1.3 + i) * 0.35, Math.sin(a) * 0.7); });
    },
  };
}

/** Institutions: a graduation cap with its tassel, beside a rolled diploma. */
function institutions(k: Kit): Model {
  const g = new THREE.Group();
  const cap = new THREE.Group();
  cap.add(at(cyl(0.6, 0.66, 0.44, k.fabric, 64), 0, 0.22, 0));
  cap.add(at(cyl(0.67, 0.67, 0.05, k.ink, 64), 0, 0.025, 0));
  const board = rbox(1.9, 0.07, 1.9, 0.03, k.fabric);
  board.rotation.y = Math.PI / 4;
  cap.add(at(board, 0, 0.47, 0));
  cap.add(at(cyl(0.07, 0.08, 0.05, k.violet, 32), 0, 0.53, 0));
  const corner = 1.9 / Math.SQRT2;
  cap.add(tube([new THREE.Vector3(0, 0.54, 0), new THREE.Vector3(corner * 0.55, 0.53, 0.02), new THREE.Vector3(corner * 0.98, 0.52, 0.03), new THREE.Vector3(corner + 0.02, 0.36, 0.04), new THREE.Vector3(corner + 0.03, 0.22, 0.05)], 0.014, k.violet));
  const tassel = new THREE.Group();
  tassel.add(at(cyl(0.035, 0.035, 0.06, k.chrome, 24), 0, 0, 0));
  tassel.add(at(cyl(0.035, 0.085, 0.26, k.violet, 24), 0, -0.16, 0));
  at(tassel, corner + 0.03, 0.2, 0.05);
  cap.add(tassel);
  cap.rotation.set(0.08, 0.35, -0.06);
  at(cap, 0.45, 0.02, 0);
  g.add(cap);

  // diploma: rolled paper with a violet ribbon
  const dip = new THREE.Group();
  const paper = cyl(0.13, 0.13, 1.5, k.ceramic, 48);
  paper.rotation.z = Math.PI / 2;
  dip.add(paper);
  [-0.75, 0.75].forEach((x) => { const end = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.03, 12, 40), k.mist); end.rotation.y = Math.PI / 2; dip.add(at(end, x, 0, 0)); });
  const rib = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.03, 16, 48), k.violet);
  rib.rotation.y = Math.PI / 2;
  dip.add(rib);
  const bow = rbox(0.08, 0.24, 0.05, 0.02, k.violet);
  bow.rotation.z = 0.5;
  dip.add(at(bow, 0.03, -0.18, 0.12));
  dip.rotation.y = 0.55;
  at(dip, -0.95, 0.13, 0.75);
  g.add(dip);

  return {
    group: g, yaw: -0.15, elev: 0.3,
    tick: (t) => { tassel.rotation.z = Math.sin(t * 1.4) * 0.12; tassel.rotation.x = Math.cos(t * 1.1) * 0.08; },
  };
}

/** Corporates: growth bars on a ceramic base with a rising glowing trend arrow. */
function corporates(k: Kit): Model {
  const g = new THREE.Group();
  g.add(at(rbox(3.0, 0.1, 1.0, 0.05, k.ceramic), 0, 0.05, 0));
  const hs = [0.45, 0.72, 0.98, 1.26, 1.62];
  const bars = hs.map((h, i) => {
    const m = i === 4 ? k.violet : blend(0xe9e4fb, 0x9f86ff, i / 4);
    const b = rbox(0.36, h, 0.36, 0.06, m);
    b.position.set(-1.12 + i * 0.56, 0.1 + h / 2, 0);
    b.userData.h = h;
    g.add(b);
    return b;
  });
  const pts = hs.map((h, i) => new THREE.Vector3(-1.12 + i * 0.56, 0.1 + h + 0.32 + i * 0.03, 0.3));
  pts.unshift(new THREE.Vector3(-1.45, 0.62, 0.3));
  const end = pts[pts.length - 1].clone().add(new THREE.Vector3(0.22, 0.2, 0));
  pts.push(end);
  const curve = new THREE.CatmullRomCurve3(pts);
  const line = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.04, 16, false), k.glow);
  g.add(line);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.24, 32), k.glow);
  head.position.copy(end);
  head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), curve.getTangent(1).normalize());
  g.add(head);
  const nodes = pts.slice(1, -1).map((p) => { const n = ball(0.065, k.chrome, 24); n.position.copy(p); g.add(n); return n; });
  line.geometry.setDrawRange(0, 0);
  const total = line.geometry.index!.count;

  return {
    group: g, yaw: -0.28, elev: 0.16,
    tick: (t, _dt, e) => {
      bars.forEach((b, i) => { const p = easeOut(e * 1.7 - i * 0.08); b.scale.y = Math.max(0.01, p); b.position.y = 0.1 + (b.userData.h * p) / 2; });
      const p = easeOut(e * 1.5 - 0.35);
      line.geometry.setDrawRange(0, Math.floor((total * p) / 6) * 6);
      head.scale.setScalar(Math.max(0.001, easeOut(e * 2.2 - 1.2)));
      nodes.forEach((n, i) => n.scale.setScalar(Math.max(0.001, easeOut(p * 6 - i)) * (1 + Math.sin(t * 2 + i) * 0.08)));
    },
  };
}

/** Community: a ceramic globe dotted with learners, linked by glowing arcs, with an orbit. */
function community(k: Kit): Model {
  const g = new THREE.Group();
  const R = 0.92, cy = 1.22;
  const globe = new THREE.Group();
  globe.add(ball(R, k.ceramic, 64));
  // dot lattice
  const dots = 900, dg = new THREE.SphereGeometry(0.012, 6, 4);
  const inst = new THREE.InstancedMesh(dg, k.lilac, dots);
  const m4 = new THREE.Matrix4(), v = new THREE.Vector3();
  for (let i = 0; i < dots; i++) {
    const y = 1 - (i / (dots - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996;
    v.set(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(R + 0.004);
    m4.makeTranslation(v.x, v.y, v.z);
    inst.setMatrixAt(i, m4);
  }
  inst.userData.noShadow = true;
  globe.add(inst);
  const ll = (lat: number, lon: number) => { const a = THREE.MathUtils.degToRad(lat), b = THREE.MathUtils.degToRad(lon); return new THREE.Vector3(Math.cos(a) * Math.cos(b), Math.sin(a), -Math.cos(a) * Math.sin(b)); };
  const home = ll(11, 77);
  const places = [ll(-34, 151), ll(51, 0), ll(40, -74), ll(1, 104), ll(25, 55), ll(35, 139)];
  globe.add(at(ball(0.06, k.violet, 24), ...(home.clone().multiplyScalar(R + 0.02).toArray() as [number, number, number])));
  places.forEach((p, i) => {
    const pts: THREE.Vector3[] = [];
    for (let s = 0; s <= 24; s++) { const q = s / 24; pts.push(home.clone().lerp(p, q).normalize().multiplyScalar(R * (1 + 0.28 * Math.sin(Math.PI * q)))); }
    globe.add(tube(pts, 0.011, k.glow, 48));
    globe.add(at(ball(0.04, i % 2 ? k.chrome : k.violet, 20), ...(p.clone().multiplyScalar(R + 0.02).toArray() as [number, number, number])));
  });
  globe.rotation.z = 0.25;
  at(globe, 0, cy, 0);
  g.add(globe);

  const orbit = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.012, 12, 160), k.chrome);
  ring.rotation.x = Math.PI / 2;
  orbit.add(ring);
  const sats = [0, 1, 2].map((i) => { const s = ball(0.09, [k.violet, k.glass, k.deep][i], 32); orbit.add(s); return s; });
  orbit.rotation.set(0.32, 0, -0.22);
  at(orbit, 0, cy, 0);
  g.add(orbit);
  g.add(at(cyl(0.34, 0.42, 0.08, k.ceramic, 64), 0, 0.04, 0));
  g.add(at(cyl(0.05, 0.05, cy - R, k.chrome, 16), 0, (cy - R) / 2 + 0.06, 0));

  return {
    group: g, elev: 0.16, zoom: 0.92,
    tick: (t) => {
      globe.rotation.y = t * 0.22 + 1.2;
      sats.forEach((s, i) => { const a = t * 0.5 + (i * Math.PI * 2) / 3; s.position.set(Math.cos(a) * 1.42, 0, Math.sin(a) * 1.42); });
    },
  };
}

/** Saturday: a desk calendar with Saturday raised in violet. */
function saturday(k: Kit): Model {
  const g = new THREE.Group();
  const cal = new THREE.Group();
  const W = 2.3, H = 1.95;
  cal.add(at(rbox(W, H - 0.4, 0.2, 0.07, k.ceramic), 0, (H - 0.4) / 2, 0));
  cal.add(at(rbox(W, 0.48, 0.24, 0.08, k.violet), 0, H - 0.26, 0));
  [-0.55, 0.55].forEach((x) => { const r = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.028, 16, 40), k.chrome); r.rotation.y = Math.PI / 2; cal.add(at(r, x, H - 0.02, 0)); });
  let sat: THREE.Mesh | null = null;
  for (let row = 0; row < 4; row++) for (let col = 0; col < 7; col++) {
    const isSat = col === 5 && row === 1;
    const tile = rbox(0.22, 0.22, 0.06, 0.04, isSat ? k.violet : col === 6 ? k.lilac : k.mist);
    tile.position.set(-0.93 + col * 0.31, 1.22 - row * 0.3, 0.12);
    cal.add(tile);
    if (isSat) sat = tile;
  }
  cal.rotation.x = -0.1;
  at(cal, 0, 0.0, 0);
  g.add(cal);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.012, 12, 48), k.glow);
  cal.add(halo);
  // a small chrome clock beside it
  const clock = new THREE.Group();
  const body = cyl(0.32, 0.32, 0.16, k.ceramic, 64);
  body.rotation.x = Math.PI / 2;
  clock.add(body);
  const bez = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.03, 16, 64), k.chrome);
  clock.add(bez);
  const hand1 = at(rbox(0.025, 0.2, 0.02, 0.01, k.ink), 0, 0.09, 0.09);
  const hand2 = at(rbox(0.025, 0.14, 0.02, 0.01, k.violet), 0, 0.06, 0.1);
  const h1 = new THREE.Group(); h1.add(hand1); h1.position.z = 0.0;
  const h2 = new THREE.Group(); h2.add(hand2);
  clock.add(h1, h2, at(ball(0.03, k.chrome, 16), 0, 0, 0.11));
  clock.rotation.y = -0.4;
  at(clock, 1.85, 0.34, 0.7);
  g.add(clock);

  return {
    group: g, yaw: -0.22, elev: 0.14,
    tick: (t) => {
      if (sat) { sat.position.z = 0.16 + (Math.sin(t * 2) * 0.5 + 0.5) * 0.06; halo.position.set(sat.position.x, sat.position.y, sat.position.z + 0.05); halo.scale.setScalar(1 + (Math.sin(t * 2) * 0.5 + 0.5) * 0.25); }
      h1.rotation.z = -t * 0.5;
      h2.rotation.z = -t * 0.08;
    },
  };
}

/* ---------------- workshop models ---------------- */

/** Robot: an articulated robot arm reaching for a glass cube. */
function robot(k: Kit): Model {
  const g = new THREE.Group();
  g.add(at(cyl(0.55, 0.6, 0.16, k.ink, 64), 0, 0.08, 0));
  const turret = new THREE.Group();
  at(turret, 0, 0.16, 0);
  g.add(turret);
  turret.add(at(cyl(0.38, 0.42, 0.26, k.ceramic, 64), 0, 0.13, 0));
  const shoulder = new THREE.Group();
  at(shoulder, 0, 0.42, 0);
  turret.add(shoulder);
  shoulder.add(ball(0.22, k.chrome));
  const upper = at(rbox(0.26, 1.0, 0.26, 0.1, k.ceramic), 0, 0.5, 0);
  shoulder.add(upper);
  shoulder.add(at(rbox(0.28, 0.12, 0.28, 0.05, k.violet), 0, 0.3, 0));
  const elbow = new THREE.Group();
  at(elbow, 0, 1.0, 0);
  shoulder.add(elbow);
  const ej = cyl(0.17, 0.17, 0.32, k.chrome, 40);
  ej.rotation.x = Math.PI / 2;
  elbow.add(ej);
  elbow.add(at(rbox(0.22, 0.85, 0.22, 0.09, k.violet), 0, 0.42, 0));
  const wrist = new THREE.Group();
  at(wrist, 0, 0.86, 0);
  elbow.add(wrist);
  wrist.add(ball(0.12, k.chrome));
  wrist.add(at(rbox(0.3, 0.1, 0.18, 0.04, k.ink), 0, 0.1, 0));
  const f1 = at(rbox(0.05, 0.22, 0.1, 0.02, k.ink), -0.1, 0.24, 0);
  const f2 = at(rbox(0.05, 0.22, 0.1, 0.02, k.ink), 0.1, 0.24, 0);
  wrist.add(f1, f2);
  const cube = rbox(0.32, 0.32, 0.32, 0.06, k.glass);
  at(cube, 1.25, 0.16, 0.3);
  cube.rotation.y = 0.4;
  g.add(cube);
  const core = at(ball(0.07, k.glow, 20), 1.25, 0.16, 0.3);
  g.add(core);
  g.add(at(rbox(0.5, 0.06, 0.5, 0.03, k.mist), -1.15, 0.03, -0.15));
  g.add(at(rbox(0.26, 0.26, 0.26, 0.05, k.violet), -1.15, 0.19, -0.15));

  return {
    group: g, yaw: -0.5, elev: 0.18,
    tick: (t) => {
      turret.rotation.y = 0.55 + Math.sin(t * 0.6) * 0.35;
      shoulder.rotation.z = -0.55 + Math.sin(t * 0.8) * 0.12;
      elbow.rotation.z = 1.25 + Math.sin(t * 0.8 + 0.6) * 0.18;
      wrist.rotation.z = 0.7 + Math.sin(t * 0.9) * 0.15;
      const o = 0.07 + (Math.sin(t * 1.6) * 0.5 + 0.5) * 0.05;
      f1.position.x = -o; f2.position.x = o;
      core.scale.setScalar(1 + Math.sin(t * 3) * 0.15);
    },
  };
}

/** Store: a small shop with a striped awning and an AI chip floating above. */
function store(k: Kit): Model {
  const g = new THREE.Group();
  const shop = new THREE.Group();
  shop.add(at(rbox(2.0, 1.15, 1.1, 0.06, k.ceramic), 0, 0.575, 0));
  shop.add(at(rbox(2.16, 0.14, 1.22, 0.05, k.ink), 0, 1.2, 0));
  shop.add(at(rbox(1.9, 0.18, 0.06, 0.03, k.violet), 0, 1.06, 0.56));
  // awning: alternating stripes tilted forward
  for (let i = 0; i < 8; i++) {
    const s = rbox(0.25, 0.05, 0.42, 0.02, i % 2 ? k.ceramic : k.violet);
    s.rotation.x = 0.42;
    s.position.set(-0.875 + i * 0.25, 0.92, 0.72);
    shop.add(s);
  }
  shop.add(at(rbox(0.42, 0.72, 0.05, 0.03, k.ink), -0.52, 0.36, 0.56));
  shop.add(at(ball(0.025, k.chrome, 12), -0.38, 0.38, 0.6));
  const win = rbox(0.82, 0.48, 0.04, 0.03, k.glass);
  shop.add(at(win, 0.38, 0.5, 0.57));
  shop.add(at(rbox(0.86, 0.04, 0.12, 0.015, k.alu), 0.38, 0.24, 0.6));
  shop.add(at(rbox(0.1, 0.32, 0.1, 0.03, k.lilac), 0.18, 0.42, 0.45));
  shop.add(at(rbox(0.1, 0.22, 0.1, 0.03, k.violet), 0.38, 0.37, 0.45));
  shop.add(at(rbox(0.1, 0.4, 0.1, 0.03, k.deep), 0.58, 0.46, 0.45));
  g.add(shop);

  const chip = new THREE.Group();
  chip.add(rbox(0.56, 0.1, 0.56, 0.03, k.ink));
  chip.add(at(rbox(0.32, 0.03, 0.32, 0.01, k.glow), 0, 0.06, 0));
  const pin = new THREE.BoxGeometry(0.04, 0.025, 0.1);
  for (let s = 0; s < 4; s++) for (let i = 0; i < 4; i++) {
    const p = new THREE.Mesh(pin, k.chrome);
    const o = -0.18 + i * 0.12;
    const r = s * (Math.PI / 2);
    p.position.set(Math.cos(r) * 0.31 + -Math.sin(r) * o, 0, Math.sin(r) * 0.31 + Math.cos(r) * o);
    p.rotation.y = -r + Math.PI / 2;
    chip.add(p);
  }
  chip.rotation.set(0.5, 0.4, 0.15);
  at(chip, 1.25, 1.65, 0.2);
  g.add(chip);
  const coin = cyl(0.16, 0.16, 0.04, k.chrome, 48);
  coin.rotation.x = Math.PI / 2;
  at(coin, -1.3, 1.5, 0.3);
  g.add(coin);

  return {
    group: g, yaw: -0.3, elev: 0.2,
    tick: (t) => {
      chip.position.y = 1.65 + Math.sin(t * 1.2) * 0.07;
      chip.rotation.y = 0.4 + t * 0.4;
      coin.rotation.z = t * 1.4;
      coin.position.y = 1.5 + Math.sin(t * 1.4 + 1) * 0.06;
    },
  };
}

/** Agent: a laptop running an agent, with containers floating off to deploy. */
function agent(k: Kit): Model {
  const g = new THREE.Group();
  const W = 2.2, D = 1.45;
  g.add(at(rbox(W, 0.07, D, 0.035, k.graphite), 0, 0.035, 0));
  g.add(at(rbox(W - 0.3, 0.012, D * 0.42, 0.006, k.ink), 0, 0.072, -0.16));
  g.add(at(rbox(0.7, 0.008, 0.36, 0.004, k.mist), 0, 0.071, 0.46));
  const lid = new THREE.Group();
  lid.add(at(rbox(W, 1.4, 0.05, 0.035, k.graphite), 0, 0.7, 0));
  const face = screen(W - 0.12, 1.28, (c, w, h) => {
    // agent loop: plan → tool → result, rendered as UI cards
    c.fillStyle = "rgba(255,255,255,0.06)"; rr(c, 50, 50, w - 100, 60, 14); c.fill();
    c.fillStyle = "#c9bcff"; rr(c, 76, 72, 200, 16, 8); c.fill();
    ["#8b6cff", "#ffffff", "#c9bcff"].forEach((col, i) => {
      const y = 150 + i * 150;
      c.fillStyle = "rgba(255,255,255,0.07)"; rr(c, 80 + i * 40, y, 560, 110, 18); c.fill();
      c.fillStyle = col; c.beginPath(); c.arc(130 + i * 40, y + 55, 22, 0, 7); c.fill();
      c.fillStyle = "rgba(255,255,255,0.75)"; rr(c, 175 + i * 40, y + 36, 240, 14, 7); c.fill();
      c.fillStyle = "rgba(255,255,255,0.3)"; rr(c, 175 + i * 40, y + 62, 360, 12, 6); c.fill();
    });
    c.strokeStyle = "#8b6cff"; c.lineWidth = 6; c.beginPath(); c.arc(w - 220, h / 2, 120, 0, Math.PI * 1.6); c.stroke();
    c.fillStyle = "rgba(139,108,255,0.25)"; c.beginPath(); c.arc(w - 220, h / 2, 80, 0, 7); c.fill();
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.12, 1.28), face);
  at(scr, 0, 0.7, 0.026);
  lid.add(scr);
  lid.rotation.x = -0.22;
  at(lid, 0, 0.07, -D / 2 + 0.03);
  g.add(lid);

  const crates = [k.violet, k.glass, k.ceramic].map((m, i) => {
    const c = rbox(0.34, 0.34, 0.34, 0.06, m);
    g.add(c);
    c.userData.i = i;
    return c;
  });
  return {
    group: g, yaw: -0.3, elev: 0.24,
    tick: (t) => {
      crates.forEach((c, i) => {
        const a = t * 0.5 + i * 2.1;
        c.position.set(1.55 + Math.cos(a) * 0.1 + i * 0.1, 0.35 + i * 0.42 + Math.sin(t * 1.2 + i) * 0.06, 0.55 - i * 0.35);
        c.rotation.set(t * 0.3 + i, t * 0.5 + i, 0);
      });
    },
  };
}

/** Graph: a loop (torus) beside a branching graph of nodes. */
function graph(k: Kit): Model {
  const g = new THREE.Group();
  const loop = new THREE.Group();
  const tor = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.11, 32, 96), k.violet);
  loop.add(tor);
  const runner = ball(0.09, k.chrome, 24);
  loop.add(runner);
  at(loop, -0.95, 0.85, 0);
  g.add(loop);
  g.add(at(cyl(0.3, 0.34, 0.08, k.ceramic, 48), -0.95, 0.04, 0));
  g.add(at(cyl(0.02, 0.02, 0.24, k.chrome, 12), -0.95, 0.2, 0));

  const nodes = [[0.75, 1.45, 0], [0.35, 0.95, 0.15], [1.2, 0.95, -0.1], [0.55, 0.42, 0.25], [1.05, 0.42, 0.1], [1.55, 0.5, -0.2]].map((p) => new THREE.Vector3(...p));
  const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5]];
  const net = new THREE.Group();
  edges.forEach(([a, b]) => net.add(tube([nodes[a], nodes[b]], 0.022, k.mist, 8)));
  const balls = nodes.map((p, i) => { const s = ball(i === 0 ? 0.15 : 0.11, i === 0 ? k.violet : i === 4 ? k.glow : k.ceramic, 32); s.position.copy(p); net.add(s); return s; });
  g.add(net);
  const pulse = ball(0.045, k.glow, 16);
  g.add(pulse);

  return {
    group: g, yaw: -0.12, elev: 0.16,
    tick: (t) => {
      const a = t * 1.4;
      runner.position.set(Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0);
      loop.rotation.y = Math.sin(t * 0.5) * 0.4;
      loop.position.y = 0.85 + Math.sin(t * 1.1) * 0.04;
      const e = edges[Math.floor(t * 0.8) % edges.length], q = (t * 0.8) % 1;
      pulse.position.copy(nodes[e[0]]).lerp(nodes[e[1]], q);
      balls.forEach((b, i) => { b.position.y = nodes[i].y + Math.sin(t * 1.2 + i) * 0.03; });
    },
  };
}

/** Agentic: generate → reason → act, three blocks on a glowing track. */
function agentic(k: Kit): Model {
  const g = new THREE.Group();
  const xs = [-1.15, 0, 1.15];
  const blocks = [k.frost, k.violet, k.ceramic].map((m, i) => { const b = rbox(0.62, 0.62, 0.62, 0.12, m); b.position.set(xs[i], 0.72, 0); g.add(b); return b; });
  const brain = ball(0.13, k.glow, 32);
  g.add(at(brain, xs[0], 0.72, 0));
  const tick = new THREE.Shape();
  tick.moveTo(-0.14, 0.0); tick.lineTo(-0.04, -0.1); tick.lineTo(0.16, 0.12); tick.lineTo(0.12, 0.16); tick.lineTo(-0.04, 0.0); tick.lineTo(-0.1, 0.05); tick.closePath();
  const tickM = extrude(tick, 0.03, 0.012, k.violet);
  at(tickM, xs[2], 0.72, 0.33);
  g.add(tickM);
  const q = new THREE.Group();
  [-0.14, 0, 0.14].forEach((x) => q.add(at(ball(0.045, k.ceramic, 20), x, 0, 0)));
  at(q, xs[1], 0.72, 0.32);
  g.add(q);
  g.add(tube([new THREE.Vector3(-1.6, 0.72, 0), new THREE.Vector3(1.6, 0.72, 0)], 0.03, k.lilac, 8));
  [-1.15, 0, 1.15].forEach((x) => g.add(at(rbox(0.5, 0.06, 0.5, 0.03, k.mist), x, 0.03, 0)));
  const pulses = [0, 1].map(() => { const p = ball(0.06, k.glow, 20); g.add(p); return p; });

  return {
    group: g, yaw: -0.38, elev: 0.2,
    tick: (t) => {
      blocks.forEach((b, i) => { b.position.y = 0.72 + Math.sin(t * 1.3 + i * 0.9) * 0.05; b.rotation.y = Math.sin(t * 0.7 + i) * 0.15; });
      brain.position.y = blocks[0].position.y;
      brain.scale.setScalar(1 + Math.sin(t * 3) * 0.12);
      tickM.position.y = blocks[2].position.y;
      q.position.y = blocks[1].position.y;
      q.children.forEach((d, i) => { d.position.y = Math.max(0, Math.sin(t * 4 - i * 0.7)) * 0.05; });
      pulses.forEach((p, i) => { const s = ((t * 0.45 + i * 0.5) % 1); p.position.set(-1.6 + s * 3.2, 0.72, 0); p.visible = Math.abs(p.position.x - xs[0]) > 0.32 && Math.abs(p.position.x - xs[1]) > 0.32 && Math.abs(p.position.x - xs[2]) > 0.32; });
    },
  };
}

/** Stack: UI / API / data layers floating in an exploded stack. */
function stack(k: Kit): Model {
  const g = new THREE.Group();
  const mats = [k.ink, k.violet, k.frost];
  const layers = mats.map((m, i) => {
    const l = new THREE.Group();
    l.add(rbox(1.9, 0.16, 1.3, 0.06, m));
    if (i === 0) for (let j = 0; j < 3; j++) l.add(at(cyl(0.12, 0.12, 0.05, k.chrome, 32), -0.55 + j * 0.55, 0.1, 0));
    if (i === 1) for (let j = 0; j < 4; j++) l.add(at(rbox(0.3, 0.04, 0.3, 0.015, k.lilac), -0.6 + j * 0.4, 0.1, 0.1));
    if (i === 2) { l.add(at(rbox(1.2, 0.03, 0.08, 0.015, k.violet), -0.1, 0.1, -0.3)); l.add(at(rbox(0.7, 0.03, 0.08, 0.015, k.lilac), -0.35, 0.1, -0.1)); l.add(at(rbox(0.5, 0.03, 0.3, 0.015, k.ceramic), 0.45, 0.1, 0.2)); }
    l.rotation.y = Math.PI / 4;
    g.add(l);
    return l;
  });
  const pillars = [[-0.6, -0.4], [0.6, 0.4]].map(([x, z]) => { const p = cyl(0.02, 0.02, 1.2, k.chrome, 12); const v = new THREE.Vector3(x, 0, z).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4); p.position.set(v.x, 0.85, v.z); g.add(p); return p; });
  const plus = new THREE.Group();
  plus.add(ball(0.2, k.violet, 32));
  plus.add(at(rbox(0.18, 0.04, 0.04, 0.015, k.ceramic), 0, 0, 0.19));
  plus.add(at(rbox(0.04, 0.18, 0.04, 0.015, k.ceramic), 0, 0, 0.19));
  at(plus, -1.35, 1.6, 0.3);
  g.add(plus);
  void pillars;

  return {
    group: g, elev: 0.3, zoom: 0.95,
    tick: (t, _dt, e) => {
      layers.forEach((l, i) => { const gap = 0.12 + 0.48 * easeOut(e * 1.5 - 0.2); l.position.y = 0.2 + i * gap + Math.sin(t * 1.2 + i * 0.8) * 0.035; });
      plus.position.y = 1.6 + Math.sin(t * 1.4) * 0.06;
      plus.rotation.y = Math.sin(t * 0.8) * 0.4;
    },
  };
}

const MODELS: Record<string, (k: Kit) => Model> = { recorded, regular, premium, institutions, corporates, community, saturday, robot, store, agent, graph, agentic, stack };

export const modelNames = Object.keys(MODELS);

export function buildModel(name: string): Model {
  return (MODELS[name] ?? community)(kit());
}
