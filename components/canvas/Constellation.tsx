"use client";

import { useCallback, useRef } from "react";
import { useCanvasLoop } from "./useCanvasLoop";

type Pt = { x: number; y: number; vx: number; vy: number; r: number; hx?: number; hy?: number; big?: boolean };
const BIGS = ["1,4", "1,3", "1,2", "2,2", "3,2", "3,1", "3,0"]; // the mark's zig-zag nodes on its 5×5 grid

/**
 * Hero background: particles that fly in and settle into the Nunnari mark (a 5×5 dot diamond + zig-zag),
 * linked by faint lines, with ambient drift. The cursor pushes the mark apart and draws links to nearby dots.
 */
export default function Constellation() {
  const ref = useRef<HTMLCanvasElement>(null);

  const setup = useCallback((ctx: CanvasRenderingContext2D, size: { w: number; h: number }) => {
    let pts: Pt[] = [], mark: Pt[] = [], zig: Pt[][] = [], t = 0;
    const mouse = { x: -9999, y: -9999 };
    const host = ref.current!.parentElement!;

    const build = () => {
      const W = size.w, H = size.h;
      mark = []; zig = [];
      const s = Math.min(46, W / 26);
      const wide = W > 900;
      const centres = wide ? [[W * 0.085, H * 0.44], [W * 0.915, H * 0.4]] : [[W * 0.5, H * 0.12]];
      centres.forEach(([cx, cy]) => {
        const scale = wide ? 1 : 0.62;
        const z: Pt[] = new Array(7);
        for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
          const gx = (i - 2) * s * scale, gy = (j - 2) * s * scale;
          const x = cx + (gx - gy) * 0.7071, y = cy + (gx + gy) * 0.7071;
          const k = BIGS.indexOf(`${i},${j}`);
          const p: Pt = { hx: x, hy: y, x: x + (Math.random() - 0.5) * 320, y: y + (Math.random() - 0.5) * 320, vx: 0, vy: 0, r: k >= 0 ? 3.6 : 1.8, big: k >= 0 };
          mark.push(p);
          if (k >= 0) z[k] = p;
        }
        zig.push(z);
      });
      const n = Math.round(Math.min(70, (W * H) / 16000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.4 + 0.6 }));
    };
    build();

    const onMove = (e: PointerEvent) => { const r = host.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);

    const frame = () => {
      const W = size.w, H = size.h;
      t += 0.012;
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (const p of mark) {
        const wob = Math.sin(t + p.hx! * 0.02) * 2.4;
        let fx = (p.hx! - p.x) * 0.04, fy = (p.hy! + wob - p.y) * 0.04;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 14000) { const f = (14000 - d2) / 14000; fx += dx * f * 0.08; fy += dy * f * 0.08; }
        p.vx = (p.vx + fx) * 0.82; p.vy = (p.vy + fy) * 0.82; p.x += p.vx; p.y += p.vy;
      }
      const all = pts.concat(mark);
      ctx.lineWidth = 1;
      for (let i = 0; i < all.length; i++) {
        const a = all[i];
        for (let j = i + 1; j < all.length; j++) {
          const b = all[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy;
          if (d < 9000) { ctx.strokeStyle = `rgba(139,108,255,${(1 - d / 9000) * 0.22})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        const mx = a.x - mouse.x, my = a.y - mouse.y, md = mx * mx + my * my;
        if (md < 26000) { ctx.strokeStyle = `rgba(108,59,255,${(1 - md / 26000) * 0.45})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      }
      ctx.lineWidth = 2.2; ctx.strokeStyle = "rgba(108,59,255,.55)";
      for (const z of zig) { ctx.beginPath(); [0, 2, 4, 6].forEach((k, i) => (i ? ctx.lineTo(z[k].x, z[k].y) : ctx.moveTo(z[k].x, z[k].y))); ctx.stroke(); }
      for (const p of all) {
        ctx.fillStyle = p.big ? "rgba(108,59,255,.9)" : p.hx !== undefined ? "rgba(108,59,255,.5)" : "rgba(139,108,255,.45)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        if (p.big) { ctx.fillStyle = "rgba(139,108,255,.15)"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3 + Math.sin(t * 2 + p.hx!) * 1.5, 0, 6.283); ctx.fill(); }
      }
    };

    return {
      frame,
      resize: build,
      cleanup: () => { host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); },
    };
  }, []);

  useCanvasLoop(ref, setup);
  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />;
}
