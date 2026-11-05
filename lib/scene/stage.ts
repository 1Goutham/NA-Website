/**
 * 3D illustration stage (three.js, one renderer per panel).
 *
 * Every panel is the same photo studio: a seamless light floor that fades into the backdrop,
 * a soft key light with real shadows, a violet rim light and studio reflections. Only the model
 * changes (lib/scene/models.ts). Models ease in when the panel first appears, turn gently toward
 * the cursor and spin on click / tap. Rendering runs only while the panel is on screen.
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { buildModel } from "./models";

/** Studio backdrop colour (matches `--stage` in styles/theme.css). */
const BACKDROP = 0xeeebf7;
const FLOOR = 0xf6f4fc;

export function mount(host: HTMLElement, name: string): () => void {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  } catch {
    return () => {};
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.shadowMap.autoUpdate = false; // refreshed every other frame (see frame)

  const cv = renderer.domElement;
  cv.className = "stage__canvas";
  cv.setAttribute("aria-hidden", "true");
  host.appendChild(cv);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.03);
  room.dispose();
  pmrem.dispose();
  scene.environment = env.texture;
  scene.environmentIntensity = 0.8;

  // seamless studio: fogged floor + fogged dome meet at the same colour
  scene.fog = new THREE.Fog(BACKDROP, 10, 24);
  scene.background = new THREE.Color(BACKDROP);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(60, 24, 12), new THREE.MeshBasicMaterial({ color: BACKDROP, side: THREE.BackSide }));
  scene.add(dome);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshStandardMaterial({ color: FLOOR, roughness: 0.92, metalness: 0 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // lights
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8cfff, 0.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(-3.2, 7, 4.6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.radius = 14;
  key.shadow.blurSamples = 20;
  key.shadow.bias = -0.0006;
  key.shadow.normalBias = 0.02;
  scene.add(key, key.target);
  const rim = new THREE.DirectionalLight(0xa88dff, 1.6);
  rim.position.set(4.5, 3.2, -5);
  scene.add(rim);

  // model on a pivot centred on its footprint
  const model = buildModel(name);
  const pivot = new THREE.Group();
  scene.add(pivot);
  pivot.add(model.group);
  model.group.traverse((o) => { if ((o as THREE.Mesh).isMesh && !o.userData.noShadow) { o.castShadow = true; o.receiveShadow = true; } });
  model.tick?.(0, 0, 1); // measure the model in its finished pose
  const box = new THREE.Box3().setFromObject(model.group);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  model.group.position.x -= center.x;
  model.group.position.z -= center.z;

  // soft contact shadow right under the model
  const blob = contactShadow(Math.max(size.x, size.z) * 1.15, Math.min(size.x, size.z) * 0.9 + 0.6);
  scene.add(blob);

  // shadow camera hugs the model
  const sc = key.shadow.camera;
  const ext = Math.max(size.x, size.z, size.y) * 0.95 + 0.6;
  sc.left = -ext; sc.right = ext; sc.top = ext; sc.bottom = -ext; sc.near = 0.5; sc.far = 24;
  sc.updateProjectionMatrix();
  key.target.position.set(0, size.y * 0.3, 0);

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 200);
  const elev = model.elev ?? 0.2;

  // the model's resting footprint (at its resting turn) — the camera frames these corners
  pivot.rotation.y = model.yaw ?? 0;
  pivot.updateMatrixWorld(true);
  const rest = new THREE.Box3().setFromObject(pivot);
  const corners = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => new THREE.Vector3(i & 1 ? rest.max.x : rest.min.x, i & 2 ? rest.max.y : rest.min.y, i & 4 ? rest.max.z : rest.min.z));
  const v = new THREE.Vector3();

  const fit = () => {
    const r = host.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const vf = THREE.MathUtils.degToRad(camera.fov) / 2, hf = Math.atan(Math.tan(vf) * camera.aspect);
    const fillX = 0.86 / (model.zoom ?? 1), fillY = 0.78 / (model.zoom ?? 1);
    let tx = (rest.min.x + rest.max.x) / 2, ty = (rest.min.y + rest.max.y) / 2, d = rest.getSize(v).length() * 1.6;
    const tz = (rest.min.z + rest.max.z) / 2;
    for (let i = 0; i < 8; i++) {
      camera.position.set(tx, ty + Math.sin(elev) * d, tz + Math.cos(elev) * d);
      camera.lookAt(tx, ty, tz);
      camera.updateMatrixWorld();
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      corners.forEach((c) => { v.copy(c).project(camera); x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x); y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y); });
      tx += ((x0 + x1) / 2) * Math.tan(hf) * d;
      ty += ((y0 + y1) / 2) * Math.tan(vf) * d * Math.cos(elev);
      d *= Math.max((x1 - x0) / 2 / fillX, (y1 - y0) / 2 / fillY);
    }
    camera.position.set(tx, ty + Math.sin(elev) * d, tz + Math.cos(elev) * d);
    camera.lookAt(tx, ty, tz);
    (scene.fog as THREE.Fog).near = d * 1.1 + 1;
    (scene.fog as THREE.Fog).far = d * 1.1 + 10;
  };

  // interaction: turn toward the cursor, spin on click
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  let spin = 0, spinV = 0;
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    wake();
  };
  const onLeave = () => { target.x = 0; target.y = 0; };
  const onClick = () => { spinV += 5.5; wake(); };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);
  host.addEventListener("click", onClick);

  // loop
  let raf = 0, idle = 0, n = 0, visible = false, started = false, last = 0, t = 0, intro = reduced ? 1 : 0;
  const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
  // panels inside a hidden tab (visibility: hidden) still intersect the viewport: skip them
  const shown = () => (host.checkVisibility ? host.checkVisibility({ visibilityProperty: true, opacityProperty: false } as CheckVisibilityOptions) : true);

  const frame = (now: number) => {
    raf = 0;
    if (!shown()) { idle = window.setTimeout(wake, 350); return; }
    const real = last ? (now - last) / 1000 : 0.016;
    const dt = Math.min(0.05, real);
    last = now;
    if (!reduced) t += dt;
    intro = Math.min(1, intro + Math.min(0.2, real) / 1.6);
    const e = ease(intro);
    const k = 1 - Math.exp(-dt * 4);
    cur.x += (target.x - cur.x) * k;
    cur.y += (target.y - cur.y) * k;
    spinV *= Math.exp(-dt * 2.4);
    spin += spinV * dt;
    pivot.rotation.y = (model.yaw ?? 0) - (1 - e) * 0.9 + spin + cur.x * 0.42 + (reduced ? 0 : Math.sin(t * 0.35) * 0.06);
    pivot.rotation.x = cur.y * 0.05;
    pivot.scale.setScalar(0.86 + 0.14 * e);
    pivot.position.y = (1 - e) * -0.25;
    model.tick?.(t, dt, e);
    if ((n++ & 1) === 0) renderer.shadowMap.needsUpdate = true;
    renderer.render(scene, camera);
    if (!started) { started = true; cv.classList.add("is-on"); host.classList.add("is-3d"); }
    if (visible && !document.hidden && (!reduced || intro < 1 || Math.abs(spinV) > 0.01 || Math.abs(target.x - cur.x) > 0.001)) raf = requestAnimationFrame(frame);
  };
  function wake() { clearTimeout(idle); if (!raf && visible && !document.hidden) { last = 0; raf = requestAnimationFrame(frame); } }

  const io = new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible) wake(); else if (raf) { cancelAnimationFrame(raf); raf = 0; }
  });
  io.observe(host);
  const ro = new ResizeObserver(() => { fit(); renderer.shadowMap.needsUpdate = true; if (!raf) renderer.render(scene, camera); });
  ro.observe(host);
  const onVis = () => { if (!document.hidden) wake(); };
  document.addEventListener("visibilitychange", onVis);
  fit();

  return () => {
    if (raf) cancelAnimationFrame(raf);
    clearTimeout(idle);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerleave", onLeave);
    host.removeEventListener("click", onClick);
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mats = m.material ? (Array.isArray(m.material) ? m.material : [m.material]) : [];
      mats.forEach((mt) => {
        Object.values(mt).forEach((v) => { if (v && (v as THREE.Texture).isTexture) (v as THREE.Texture).dispose(); });
        mt.dispose();
      });
    });
    env.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    cv.remove();
    host.classList.remove("is-3d");
  };
}

/** A soft dark ellipse on the floor so the model sits on it (ambient-occlusion look). */
function contactShadow(w: number, d: number) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(28,18,70,0.55)");
  grd.addColorStop(0.45, "rgba(28,18,70,0.22)");
  grd.addColorStop(1, "rgba(28,18,70,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false, toneMapped: false }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.002;
  m.renderOrder = 1;
  return m;
}
