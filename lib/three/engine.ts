/**
 * Real-time 3D engine for the illustration panels (loaded lazily, client only).
 * One renderer per panel, studio lighting with environment reflections, soft contact shadows,
 * pointer tilt + hover + drag-to-rotate, an entrance ("reveal") progress, and a render loop
 * that only runs while the panel is visible.
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { builders } from "./scenes";

export type Kit = ReturnType<typeof makeKit>;
export type Frame = { t: number; dt: number; r: number; hover: number; spin: number };
export type Built = { root: THREE.Object3D; update: (f: Frame) => void; camera?: { pos: [number, number, number]; look: [number, number, number]; fov?: number } };

export { ease, easeBack, stagger } from "./util";

function makeKit() {
  // Standard material (cheap to compile) for everything; physical only where it matters (the gem).
  const phys = (color: string, o: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.28, metalness: 0.06, envMapIntensity: 1.15, ...o });
  const mats = {
    white: phys("#fbfaff", { roughness: 0.4 }),
    lilac: phys("#d9ceff"),
    soft: phys("#a993ff"),
    violet: phys("#6c3bff", { roughness: 0.2 }),
    deep: phys("#2b1689", { roughness: 0.26 }),
    ink: phys("#140f36", { roughness: 0.4 }),
    glow: new THREE.MeshStandardMaterial({ color: "#8b6cff", emissive: "#7c4dff", emissiveIntensity: 1.4, roughness: 0.3 }),
    gem: new THREE.MeshPhysicalMaterial({ color: "#7c4dff", roughness: 0.05, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.02, iridescence: 0.6, iridescenceIOR: 1.6, flatShading: true }),
  };

  const rbox = (w: number, h: number, d: number, radius: number, mat: THREE.Material) =>
    new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, Math.min(radius, Math.min(w, h, d) / 2 - 0.001)), mat);

  /** Flat textured label (canvas → texture). Drawn in a 2D context so text stays crisp. */
  const canvasTex = (w: number, h: number, draw: (c: CanvasRenderingContext2D, W: number, H: number) => void) => {
    const cv = document.createElement("canvas");
    cv.width = w; cv.height = h;
    const c = cv.getContext("2d")!;
    draw(c, w, h);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  };
  const plane = (w: number, h: number, tex: THREE.Texture, opts: Partial<THREE.MeshBasicMaterialParameters> = {}) =>
    new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, ...opts }));

  /** Soft contact shadow under an object. */
  let shadowTex: THREE.Texture | null = null;
  const shadow = (rx: number, rz = rx, opacity = 0.45) => {
    shadowTex ??= canvasTex(128, 128, (c, W) => {
      const g = c.createRadialGradient(W / 2, W / 2, 0, W / 2, W / 2, W / 2);
      g.addColorStop(0, "rgba(46,20,140,0.55)"); g.addColorStop(0.5, "rgba(46,20,140,0.18)"); g.addColorStop(1, "rgba(46,20,140,0)");
      c.fillStyle = g; c.fillRect(0, 0, W, W);
    });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(rx * 2, rz * 2), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity, toneMapped: false }));
    m.rotation.x = -Math.PI / 2;
    m.renderOrder = -1;
    return m;
  };

  const font = (px: number, weight = 700) => `${weight} ${px}px Inter, "Inter Variable", system-ui, sans-serif`;
  return { THREE, mats, rbox, canvasTex, plane, shadow, font };
}

/* One shared "page is scrolling" flag: scenes hold still while scrolling so scrolling stays smooth. */
let scrollingUntil = 0;
if (typeof window !== "undefined") addEventListener("scroll", () => { scrollingUntil = performance.now() + 140; }, { passive: true });

export function mount(host: HTMLElement, name: string) {
  const build = builders[name];
  if (!build) return () => {};
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return () => {};
  }
  const DPR = Math.min(window.devicePixelRatio || 1, 1.25);
  renderer.setPixelRatio(DPR);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.className = "art3d__canvas";
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04, 0.1, 100, { size: 64 }).texture; // small env map: cheap to build, plenty for soft studio reflections
  scene.environment = env;
  scene.environmentIntensity = 0.9;
  const key = new THREE.DirectionalLight("#ffffff", 2.2);
  key.position.set(-4, 8, 6);
  scene.add(key, new THREE.HemisphereLight("#efe9ff", "#ffffff", 0.9));
  const rim = new THREE.DirectionalLight("#b9a4ff", 1.2);
  rim.position.set(6, 3, -5);
  scene.add(rim);

  const kit = makeKit();
  const built: Built = build(kit);
  const pivot = new THREE.Group();
  pivot.add(built.root);
  scene.add(pivot);

  const cam = new THREE.PerspectiveCamera(built.camera?.fov ?? 30, 1, 0.1, 100);
  const [cx, cy, cz] = built.camera?.pos ?? [7, 5.2, 8];
  const look = new THREE.Vector3(...(built.camera?.look ?? [0, 1, 0]));
  cam.position.set(cx, cy, cz);
  cam.lookAt(look);

  const size = () => {
    const r = host.getBoundingClientRect();
    renderer.setSize(Math.max(1, r.width), Math.max(1, r.height), false);
    cam.aspect = Math.max(1, r.width) / Math.max(1, r.height);
    cam.updateProjectionMatrix();
  };
  size();
  const ro = new ResizeObserver(size);
  ro.observe(host);

  /* interaction: tilt toward pointer, hover, drag to rotate (with inertia) */
  const ptr = { x: 0, y: 0, tx: 0, ty: 0, hover: 0, th: 0, spin: 0, vel: 0, drag: false, lastX: 0 };
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    ptr.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    ptr.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    if (ptr.drag) { const dx = e.clientX - ptr.lastX; ptr.lastX = e.clientX; ptr.vel = dx * 0.012; ptr.spin += ptr.vel; }
  };
  const onEnter = () => (ptr.th = 1);
  const onLeave = () => { ptr.th = 0; ptr.tx = 0; ptr.ty = 0; ptr.drag = false; };
  const onDown = (e: PointerEvent) => { ptr.drag = true; ptr.lastX = e.clientX; host.setPointerCapture?.(e.pointerId); host.classList.add("is-grabbing"); };
  const onUp = () => { ptr.drag = false; host.classList.remove("is-grabbing"); };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerenter", onEnter);
  host.addEventListener("pointerleave", onLeave);
  host.addEventListener("pointerdown", onDown);
  host.addEventListener("pointerup", onUp);
  host.addEventListener("pointercancel", onUp);

  /* loop: runs only while on screen and the panel is actually shown */
  let raf = 0, visible = false, last = performance.now(), t = 0, revealStart = -1, ready = false;
  const shown = () => host.offsetParent !== null && getComputedStyle(host.closest(".panel") ?? host).visibility !== "hidden";
  let lastRender = 0;
  const frame = (now: number) => {
    raf = 0;
    const settled = revealStart >= 0 && t - revealStart > 1.9;
    // hold still while the page scrolls, and idle at ~30fps once the entrance has played
    if (ready && (now < scrollingUntil || (settled && now - lastRender < 32 && !ptr.drag && ptr.th === 0))) {
      if (visible && !reduced && !document.hidden) raf = requestAnimationFrame(frame);
      last = now;
      return;
    }
    lastRender = now;
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); // rAF time can precede performance.now() at start
    last = now;
    t += dt;
    if (revealStart < 0) revealStart = t;
    const r = reduced ? 1 : Math.min(1, (t - revealStart) / 1.8);
    ptr.x += (ptr.tx - ptr.x) * 0.06;
    ptr.y += (ptr.ty - ptr.y) * 0.06;
    ptr.hover += (ptr.th - ptr.hover) * 0.08;
    if (!ptr.drag) { ptr.vel *= 0.94; ptr.spin += ptr.vel; ptr.spin *= 0.985; }
    pivot.rotation.y = ptr.x * 0.32 + ptr.spin;
    pivot.rotation.x = ptr.y * 0.08;
    built.update({ t: reduced ? 2 : t, dt, r, hover: ptr.hover, spin: ptr.spin });
    renderer.render(scene, cam);
    if (!ready) { ready = true; host.classList.add("is-3d-ready"); }
    if (visible && !reduced && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const start = () => { if (!raf && shown()) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  let compiled = false;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && compiled) start(); else if (!visible) stop(); }, { rootMargin: "60px" });
  io.observe(host);
  // tab panels: restart when the panel becomes visible
  const panel = host.closest(".panel");
  const mo = panel ? new MutationObserver(() => { if (visible) start(); }) : null;
  mo?.observe(panel!, { attributes: true, attributeFilter: ["class"] });
  const onVis = () => (document.hidden ? stop() : visible && start());
  document.addEventListener("visibilitychange", onVis);
  const go = () => { compiled = true; if (reduced) requestAnimationFrame(frame); else if (visible) start(); };
  (renderer.compileAsync ? renderer.compileAsync(scene, cam).catch(() => {}) : Promise.resolve()).then(go);

  return () => {
    stop(); io.disconnect(); ro.disconnect(); mo?.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerenter", onEnter); host.removeEventListener("pointerleave", onLeave);
    host.removeEventListener("pointerdown", onDown); host.removeEventListener("pointerup", onUp); host.removeEventListener("pointercancel", onUp);
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => { (x as THREE.MeshBasicMaterial).map?.dispose(); x.dispose(); });
    });
    env.dispose(); pmrem.dispose(); renderer.dispose(); renderer.forceContextLoss();
    canvas.remove();
    host.classList.remove("is-3d-ready");
  };
}
