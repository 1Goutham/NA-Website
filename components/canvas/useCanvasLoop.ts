"use client";

import { useEffect, type RefObject } from "react";

/**
 * Shared canvas lifecycle: DPR-aware sizing via ResizeObserver, a rAF loop that only runs
 * while the canvas is on screen and the tab is visible, and a single static frame for reduced motion.
 */
export function useCanvasLoop(
  ref: RefObject<HTMLCanvasElement | null>,
  setup: (ctx: CanvasRenderingContext2D, size: { w: number; h: number }) => { frame: (now: number) => void; resize?: (w: number, h: number) => void; cleanup?: () => void },
) {
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const size = { w: 0, h: 0 };
    const measure = () => {
      const r = cv.getBoundingClientRect();
      size.w = r.width; size.h = r.height;
      cv.width = Math.round(r.width * DPR); cv.height = Math.round(r.height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    measure();
    const api = setup(ctx, size);
    let raf = 0, visible = false;
    const loop = (now: number) => { api.frame(now); raf = requestAnimationFrame(loop); };
    const start = () => { if (!raf && !reduced && !document.hidden) raf = requestAnimationFrame(loop); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const ro = new ResizeObserver(() => {
      const r = cv.getBoundingClientRect();
      if (Math.abs(r.width - size.w) < 2 && Math.abs(r.height - size.h) < 2) return;
      measure(); api.resize?.(size.w, size.h);
      if (reduced) api.frame(performance.now());
    });
    ro.observe(cv);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) start(); else stop(); }, { rootMargin: "80px" });
    io.observe(cv);
    const vis = () => (document.hidden ? stop() : visible && start());
    document.addEventListener("visibilitychange", vis);
    if (reduced) api.frame(performance.now());
    return () => { stop(); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", vis); api.cleanup?.(); };
  }, [ref, setup]);
}
