"use client";

import { useEffect, useRef } from "react";

/* ---------- shaders ---------- */
const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Domain-warped simplex noise → soft violet aurora ribbons on white, a cursor light,
// a clear zone behind the headline, and fine film grain.
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;      // px, y up
uniform float u_energy;    // 0..1 pointer activity

vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5 * u_res) / u_res.y;
  float t = u_time * 0.055;

  // the cursor gently bends the flow
  vec2 toM = p - m;
  float md = length(toM);
  p += normalize(toM + 1e-4) * 0.06 * u_energy * exp(-md * md * 5.0);

  vec2 q = vec2(snoise(vec3(p * 0.55, t)), snoise(vec3(p * 0.55 + vec2(5.2, 1.3), t)));
  vec2 r = vec2(q.y, -q.x) * 0.9 + 0.35 * vec2(sin(p.y * 1.3 + t * 2.1), cos(p.x * 1.1 - t * 1.7));

  // flowing ribbons
  float rib = sin(n * 2.4 + p.x * 1.3 + p.y * 0.9 + t * 2.0);
  float ribbon = smoothstep(0.35, 1.0, rib) * 0.7 + smoothstep(0.9, 1.0, rib) * 0.35;

  vec3 white = vec3(1.0);
  vec3 lav   = vec3(0.898, 0.863, 1.0);   // #E5DCFF
  vec3 soft  = vec3(0.780, 0.722, 1.0);   // #C7B8FF
  vec3 light = vec3(0.545, 0.424, 1.0);   // #8B6CFF
  vec3 prim  = vec3(0.424, 0.231, 1.0);   // #6C3BFF
  vec3 deep  = vec3(0.576, 0.200, 0.918); // #9333EA

  vec3 col = mix(white, lav, smoothstep(-0.7, 0.9, n));
  col = mix(col, soft, smoothstep(0.0, 1.0, r.x * 0.5 + 0.5) * 0.55);
  col = mix(col, mix(light, deep, smoothstep(-0.4, 0.6, q.y)), ribbon * 0.42);
  col = mix(col, prim, pow(smoothstep(0.5, 1.0, n * 0.5 + 0.5 + r.y * 0.25), 2.0) * 0.38);

  // cursor light
  col += vec3(0.42, 0.24, 1.0) * (0.10 + 0.12 * u_energy) * exp(-md * md * 7.0);

  // keep a calm, bright field behind the headline
  vec2 c = (gl_FragCoord.xy / u_res - vec2(0.5, 0.56)) * vec2(1.25, 1.9);
  float calm = 1.0 - smoothstep(0.22, 0.95, length(c));
  col = mix(col, vec3(0.992, 0.988, 1.0), calm * 0.88);

  // fade to white at the bottom so the section blends into the page
  float yb = gl_FragCoord.y / u_res.y;
  col = mix(vec3(1.0), col, smoothstep(0.0, 0.3, yb));
  // and calm under the navigation
  col = mix(col, vec3(0.99, 0.985, 1.0), smoothstep(0.82, 1.0, yb) * 0.85);

  // film grain
  col += (hash(gl_FragCoord.xy + fract(u_time) * 100.0) - 0.5) * 0.022;
  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * Premium hero background: a WebGL aurora (domain-warped noise ribbons in the brand violets)
 * that bends around the cursor. Renders at reduced resolution for speed, pauses offscreen,
 * draws a single still frame for reduced-motion users, and falls back to CSS if WebGL is unavailable.
 */
export default function Aurora({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const gl = cv.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: false });
    if (!gl) { cv.dataset.fallback = "1"; return; }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { cv.dataset.fallback = "1"; return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uEnergy = gl.getUniformLocation(prog, "u_energy");

    // render below native resolution: the image is soft by nature, this keeps it cheap
    // soft image → render small and let the GPU upscale; capped so huge screens stay cheap
    let SCALE = 0.42;
    const MAX_W = 720;
    let W = 0, H = 0;
    const resize = () => {
      const r = cv.getBoundingClientRect();
      SCALE = Math.min(SCALE, MAX_W / Math.max(1, r.width));
      W = Math.max(1, Math.round(r.width * SCALE));
      H = Math.max(1, Math.round(r.height * SCALE));
      cv.width = W; cv.height = H;
      gl.viewport(0, 0, W, H);
      gl.uniform2f(uRes, W, H);
    };
    resize();

    // pointer, eased
    const mouse = { x: W * 0.5, y: H * 0.35, tx: W * 0.5, ty: H * 0.35, e: 0, te: 0 };
    const host = cv.parentElement!;
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) * SCALE;
      mouse.ty = (r.height - (e.clientY - r.top)) * SCALE;
      mouse.te = 1;
    };
    const onLeave = () => { mouse.te = 0; };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);

    const t0 = performance.now() - 20000 * Math.random();
    let raf = 0, running = false;
    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.e += (mouse.te - mouse.e) * 0.03;
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uEnergy, mouse.e);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    // ~40fps is plenty for a slow-moving gradient; drop resolution once if the device struggles
    let lastDraw = 0, slow = 0, frames = 0, degraded = false;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = now - lastDraw;
      if (dt < 24) return;
      frames++;
      if (dt > 45) slow++;
      if (!degraded && frames === 90 && slow > 30) { degraded = true; SCALE *= 0.65; resize(); }
      lastDraw = now;
      draw(now);
    };
    const start = () => { if (!running && !reduced && !document.hidden) { running = true; raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const ro = new ResizeObserver(() => { resize(); if (reduced || !running) draw(performance.now()); });
    ro.observe(cv);
    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) start(); else stop(); });
    io.observe(cv);
    const onVis = () => (document.hidden ? stop() : visible && start());
    document.addEventListener("visibilitychange", onVis);

    draw(performance.now());
    requestAnimationFrame(() => cv.classList.add("is-ready"));
    start();

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className={`aurora ${className}`} aria-hidden="true" />;
}
