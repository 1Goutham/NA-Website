"use client";

import { useCallback, useRef } from "react";
import { useCanvasLoop } from "./useCanvasLoop";

type V3 = [number, number, number];
const ll = (lat: number, lon: number): V3 => { const a = (lat * Math.PI) / 180, b = (-lon * Math.PI) / 180; return [Math.cos(a) * Math.cos(b), Math.sin(a), Math.cos(a) * Math.sin(b)]; };
const HOME = ll(11, 77); // Coimbatore
const DESTS = [ll(-33.9, 151.2), ll(51.5, -0.1), ll(37.8, -122.4), ll(1.35, 103.8), ll(25.2, 55.3), ll(35.7, 139.7), ll(52.5, 13.4)];
const slerp = (a: V3, b: V3, t: number): V3 => {
  const d = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
  const s = Math.sin(d) || 1, k1 = Math.sin((1 - t) * d) / s, k2 = Math.sin(t * d) / s, lift = 1 + Math.sin(t * Math.PI) * 0.18 * d;
  return [(a[0] * k1 + b[0] * k2) * lift, (a[1] * k1 + b[1] * k2) * lift, (a[2] * k1 + b[2] * k2) * lift];
};

/** Rotating dot-sphere with arcs travelling out from Coimbatore. */
export default function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);

  const setup = useCallback((ctx: CanvasRenderingContext2D, size: { w: number; h: number }) => {
    const N = 1100, pts: V3[] = [];
    for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(1 - y * y), th = i * 2.39996; pts.push([Math.cos(th) * rad, y, Math.sin(th) * rad]); }
    let rot = -1.6;
    const t0 = performance.now(), tilt = 0.32, ct = Math.cos(tilt), st = Math.sin(tilt);

    const frame = (now: number) => {
      const W = size.w, H = size.h, R = Math.min(W, H) * 0.36, cx = W / 2, cy = H / 2, el = (now - t0) / 1000;
      const proj = ([x, y, z]: V3): V3 => {
        const cr = Math.cos(rot), sr = Math.sin(rot), x1 = x * cr - z * sr, z1 = x * sr + z * cr;
        return [cx + x1 * R, cy - (y * ct - z1 * st) * R, y * st + z1 * ct];
      };
      rot += 0.0026;
      ctx.clearRect(0, 0, W, H);
      const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.35);
      g.addColorStop(0, "rgba(139,108,255,.20)"); g.addColorStop(1, "rgba(139,108,255,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.35, 0, 6.283); ctx.fill();
      const b = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      b.addColorStop(0, "rgba(255,255,255,.95)"); b.addColorStop(0.55, "rgba(237,231,255,.75)"); b.addColorStop(1, "rgba(196,181,253,.55)");
      ctx.fillStyle = b; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fill();
      for (const p of pts) {
        const [x, y, z] = proj(p);
        if (z < -0.15) continue;
        ctx.fillStyle = `rgba(108,59,255,${z < 0 ? 0.08 : 0.25 + z * 0.65})`;
        ctx.fillRect(x - 0.9, y - 0.9, 1.8 + z * 0.6, 1.8 + z * 0.6);
      }
      ctx.lineWidth = 2; ctx.lineCap = "round";
      DESTS.forEach((d, i) => {
        const ph = (el * 0.35 + i / DESTS.length) % 1, head = Math.min(1, ph * 1.6), tail = Math.max(0, ph * 1.6 - 0.45);
        let prev: V3 | null = null;
        for (let k = 0; k <= 24; k++) {
          const q = proj(slerp(HOME, d, tail + (head - tail) * (k / 24)));
          if (prev && q[2] > 0 && prev[2] > 0) { ctx.strokeStyle = `rgba(108,59,255,${(k / 24) * 0.9})`; ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); }
          prev = q;
        }
        const e = proj(d);
        if (e[2] > 0 && head >= 1) { ctx.fillStyle = "rgba(108,59,255,.9)"; ctx.beginPath(); ctx.arc(e[0], e[1], 3, 0, 6.283); ctx.fill(); }
      });
      const h = proj(HOME);
      if (h[2] > 0) {
        const pr = (el % 1.6) / 1.6;
        ctx.strokeStyle = `rgba(108,59,255,${1 - pr})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(h[0], h[1], 4 + pr * 16, 0, 6.283); ctx.stroke();
        ctx.fillStyle = "#6c3bff"; ctx.beginPath(); ctx.arc(h[0], h[1], 4.5, 0, 6.283); ctx.fill();
      }
      ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, R, 3.6, 5.4); ctx.stroke();
    };
    return { frame };
  }, []);

  useCanvasLoop(ref, setup);
  return <canvas ref={ref} className="globe-canvas" aria-hidden="true" />;
}
