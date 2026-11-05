/**
 * Particle illustration engine (plain WebGL, one draw call per panel).
 * Points fly in from a loose cloud and settle into the panel's formation, drift gently,
 * part around the cursor, tilt toward it, and ripple out from a click / tap.
 * Runs only while the panel is on screen and shown.
 */
import { buildShape, type Shape } from "./shapes";

const VS = `
attribute vec3 aT; attribute vec3 aS; attribute float aR; attribute float aA;
uniform float uT, uRev, uAsp, uFit, uDpr, uSize, uHover, uRy, uRx, uCT;
uniform vec2 uM, uC;
varying float vA, vR, vF, vG;
float eo(float x) { x = clamp(x, 0.0, 1.0); return 1.0 - pow(1.0 - x, 3.0); }
void main() {
  float dust = step(3.5, aA), back = step(1.5, aA) * (1.0 - dust), acc = mod(aA, 2.0) * (1.0 - dust);
  float k = eo(uRev * 1.8 - aR * 0.55 - (aT.x + 1.6) * 0.09 - back * 0.12);
  vec3 p = mix(aS, aT, k);
  p += (0.016 + dust * 0.1) * vec3(sin(uT * (0.9 - dust * 0.6) + aR * 31.0), cos(uT * (0.8 - dust * 0.55) + aR * 17.0), sin(uT * 0.7 + aR * 11.0));
  float c = cos(uRy), s = sin(uRy);
  p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
  c = cos(uRx); s = sin(uRx);
  p = vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z);
  float z = 6.5 - p.z;
  vec2 ndc = vec2(p.x / uAsp, p.y) * uFit * 6.5 / z;
  // cursor: points part around it and light up
  vec2 d = (ndc - uM) * vec2(uAsp, 1.0);
  float dl = length(d);
  float f = uHover * smoothstep(0.42, 0.0, dl);
  if (dl > 0.0001) ndc += d / dl * vec2(1.0 / uAsp, 1.0) * f * 0.09;
  // click: a ripple runs out from the click point
  vec2 e = (ndc - uC) * vec2(uAsp, 1.0);
  float el = length(e);
  float w = exp(-pow((el - uCT * 1.5) * 8.0, 2.0)) * exp(-uCT * 1.8);
  if (el > 0.0001) ndc += e / el * vec2(1.0 / uAsp, 1.0) * w * 0.05;
  // a few points twinkle
  float tw = pow(max(0.0, sin(uT * 1.6 + aR * 90.0)), 30.0) * step(0.88, fract(aR * 13.0)) * (1.0 - dust);
  gl_Position = vec4(ndc, 0.0, 1.0);
  gl_PointSize = uSize * uDpr * (0.75 + aR * 0.5) * (1.0 - dust * 0.35) * (1.0 - back * 0.15) * (6.5 / z) * (1.0 + f * 0.7 + w * 1.4 + tw * 0.9) * (0.35 + 0.65 * k);
  vA = acc; vR = aR; vG = clamp(f + w * 1.5 + tw, 0.0, 1.0);
  vF = (1.0 - back * 0.55) * (1.0 - dust * 0.62) * clamp(0.85 + p.z * 0.5, 0.45, 1.0) * (0.12 + 0.88 * k);
}`;

const FS = `
precision mediump float;
uniform vec3 uB0, uB1, uA0, uA1;
varying float vA, vR, vF, vG;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.3, d) * 0.85 + smoothstep(0.3, 0.0, d) * 0.15;
  vec3 col = mix(mix(uB0, uB1, vR * 0.8), mix(uA0, uA1, vR), vA);
  col = mix(col, uA1, vG * 0.7);
  a *= vF * (0.7 + 0.3 * vR) * (1.0 + vG * 0.4);
  gl_FragColor = vec4(col * a, a);
}`;

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const COLORS = { uB0: hex("#2b1689"), uB1: hex("#6c3bff"), uA0: hex("#9b5cf6"), uA1: hex("#d36bf2") };

function starts(n: number, seed: number) {
  // loose cloud the points fly in from
  const out = new Float32Array(n * 3), rnd = new Float32Array(n);
  let s = seed;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) {
    const u = r() * 2 - 1, th = r() * Math.PI * 2, rad = 2.2 + r() * 2.2, q = Math.sqrt(1 - u * u);
    out.set([Math.cos(th) * q * rad * 1.4, u * rad * 0.9, Math.sin(th) * q * rad], i * 3);
    rnd[i] = r();
  }
  return { out, rnd };
}

/** No WebGL: draw the settled formation once on a 2D canvas. */
function still(host: HTMLElement, sh: Shape) {
  const cv = document.createElement("canvas");
  cv.className = "fx__canvas is-on";
  host.appendChild(cv);
  const draw = () => {
    const rect = host.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = rect.width * dpr; cv.height = rect.height * dpr;
    const c = cv.getContext("2d")!, asp = rect.width / Math.max(1, rect.height), fit = Math.min((0.8 * asp) / 1.6, 0.72);
    c.clearRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < sh.n; i++) {
      const x = sh.pos[i * 3], y = sh.pos[i * 3 + 1], z = 6.5 - sh.pos[i * 3 + 2], sx = ((x / asp) * fit * 6.5) / z, sy = (y * fit * 6.5) / z;
      const a = sh.acc[i];
      if (a > 3.5) continue;
      c.fillStyle = a % 2 ? (a > 1.5 ? "rgba(155,92,246,.3)" : "rgba(155,92,246,.85)") : a > 1.5 ? "rgba(43,22,137,.25)" : "rgba(43,22,137,.75)";
      c.beginPath(); c.arc((sx * 0.5 + 0.5) * cv.width, (0.5 - sy * 0.5) * cv.height, 1.3 * dpr, 0, 7); c.fill();
    }
  };
  draw();
  const ro = new ResizeObserver(draw); ro.observe(host);
  return () => { ro.disconnect(); cv.remove(); };
}

let scrollingUntil = 0;
if (typeof window !== "undefined") addEventListener("scroll", () => { scrollingUntil = performance.now() + 150; }, { passive: true });

export function mount(host: HTMLElement, name: string) {
  const sh = buildShape(name);
  if (!sh) return () => {};
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const canvas = document.createElement("canvas");
  canvas.className = "fx__canvas";
  canvas.setAttribute("aria-hidden", "true");
  const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: "low-power" });
  if (!gl) return still(host, sh);
  host.appendChild(canvas);

  const compile = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram()!;
  const vs = compile(gl.VERTEX_SHADER, VS), fs = compile(gl.FRAGMENT_SHADER, FS);
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.remove(); return still(host, sh); }
  gl.useProgram(prog);

  const { out: aS, rnd } = starts(sh.n, name.length * 7919 + 13);
  const bufs: WebGLBuffer[] = [];
  const attr = (key: string, data: Float32Array, size: number) => {
    const b = gl.createBuffer()!; bufs.push(b);
    gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, key); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  };
  attr("aT", sh.pos, 3); attr("aS", aS, 3); attr("aR", rnd, 1); attr("aA", sh.acc, 1);

  const U: Record<string, WebGLUniformLocation | null> = {};
  ["uT", "uRev", "uAsp", "uFit", "uDpr", "uSize", "uHover", "uCT", "uC", "uRy", "uRx", "uM", "uB0", "uB1", "uA0", "uA1"].forEach((k) => (U[k] = gl.getUniformLocation(prog, k)));
  (Object.keys(COLORS) as (keyof typeof COLORS)[]).forEach((k) => gl.uniform3fv(U[k], COLORS[k]));
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const dpr = Math.min(devicePixelRatio || 1, 2);
  let asp = 1.45;
  const size = () => {
    const r = host.getBoundingClientRect();
    if (!r.width || !r.height) return;
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    asp = r.width / r.height;
    gl.uniform1f(U.uAsp, asp);
    gl.uniform1f(U.uFit, Math.min((0.8 * asp) / 1.6, 0.72));
    gl.uniform1f(U.uDpr, dpr);
    gl.uniform1f(U.uSize, Math.max(2.4, Math.min(3.4, r.width / 170)));
    if (!raf) draw();
  };

  /* pointer: points part around the cursor and tilt toward it; click / tap sends a ripple out */
  const ptr = { x: 0, y: 0, mx: 0, my: 0, hov: 0, th: 0, cx: 0, cy: 0, ct: 9 };
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    ptr.mx = ((e.clientX - r.left) / r.width) * 2 - 1;
    ptr.my = 1 - ((e.clientY - r.top) / r.height) * 2;
    ptr.th = 1;
  };
  const onLeave = () => { ptr.th = 0; ptr.mx = 0; ptr.my = 0; };
  const onDown = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    ptr.cx = ((e.clientX - r.left) / r.width) * 2 - 1;
    ptr.cy = 1 - ((e.clientY - r.top) / r.height) * 2;
    ptr.ct = 0;
    start();
  };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);
  host.addEventListener("pointerdown", onDown);

  let raf = 0, visible = false, t = 0, revAt = -1, last = 0;
  const shown = () => host.offsetParent !== null && getComputedStyle(host).visibility !== "hidden";

  const draw = () => {
    const rev = reduced ? 1.2 : revAt < 0 ? 0 : Math.min(1.2, (t - revAt) / 2.3);
    gl.uniform1f(U.uT, reduced ? 0 : t);
    gl.uniform1f(U.uRev, rev);
    gl.uniform1f(U.uHover, ptr.hov);
    gl.uniform1f(U.uCT, ptr.ct);
    gl.uniform2f(U.uC, ptr.cx, ptr.cy);
    gl.uniform2f(U.uM, ptr.x, ptr.y);
    const turn = sh.spin ? t * sh.spin : Math.sin(t * 0.35) * 0.2;
    gl.uniform1f(U.uRy, turn + ptr.x * ptr.hov * 0.35);
    gl.uniform1f(U.uRx, sh.tilt - ptr.y * ptr.hov * 0.22);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, sh.n);
  };

  const frame = (now: number) => {
    raf = 0;
    if (!shown()) return;
    // hold still while the page scrolls (once formed); ~30fps at rest; full rate while forming or touched
    const settled = revAt >= 0 && t - revAt > 2.6 && ptr.hov < 0.02 && ptr.ct > 2;
    const scrolling = now < scrollingUntil;
    if ((scrolling && settled) || ((scrolling || settled) && now - last < 30)) { if (scrolling && settled) last = now; raf = requestAnimationFrame(frame); return; }
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    t += dt;
    if (revAt < 0) revAt = t;
    canvas.classList.add("is-on");
    ptr.x += (ptr.mx - ptr.x) * 0.1; ptr.y += (ptr.my - ptr.y) * 0.1;
    ptr.hov += (ptr.th - ptr.hov) * 0.07;
    ptr.ct += dt;
    draw();
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const start = () => {
    if (raf || !shown()) return;
    if (reduced) { if (revAt < 0) { revAt = 0; canvas.classList.add("is-on"); } draw(); return; }
    last = performance.now(); raf = requestAnimationFrame(frame);
  };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };

  size();
  const ro = new ResizeObserver(size); ro.observe(host);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); }, { threshold: 0.2 });
  io.observe(host);
  // tab panels: re-form when the panel is shown again
  const panel = host.closest(".panel");
  let wasShown = shown();
  const mo = panel ? new MutationObserver(() => {
    const now = shown();
    if (now && !wasShown) { if (!reduced) revAt = -1; start(); }
    wasShown = now;
  }) : null;
  mo?.observe(panel!, { attributes: true, attributeFilter: ["class", "hidden"] });
  const onVis = () => (document.hidden ? stop() : visible && start());
  document.addEventListener("visibilitychange", onVis);

  return () => {
    stop(); io.disconnect(); ro.disconnect(); mo?.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); host.removeEventListener("pointerdown", onDown);
    bufs.forEach((b) => gl.deleteBuffer(b));
    gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    canvas.remove();
  };
}
