"use client";

import { useEffect, useRef } from "react";

/**
 * Mounts a real-time 3D scene into its parent panel. three.js is only downloaded when the panel
 * comes near the viewport; the static drawing stays underneath until the first frame is ready.
 */
let lastScroll = 0;
if (typeof window !== "undefined") addEventListener("scroll", () => { lastScroll = performance.now(); }, { passive: true });
const idleAfterScroll = () => new Promise<void>((res) => {
  const check = () => {
    if (performance.now() - lastScroll < 220) { setTimeout(check, 120); return; }
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(() => res(), { timeout: 600 }); else setTimeout(res, 60);
  };
  check();
});

export default function Scene3D({ name }: { name: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    let dispose: (() => void) | undefined, cancelled = false;
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      try {
        const test = document.createElement("canvas");
        if (!(test.getContext("webgl2") || test.getContext("webgl"))) return;
        const { mount } = await import("@/lib/three/engine");
        // create the scene only once the page is idle and not scrolling (shader setup can stall a frame)
        await idleAfterScroll();
        if (!cancelled) dispose = mount(host, name);
      } catch { /* keep the static drawing */ }
    }, { rootMargin: "300px" });
    io.observe(host);
    return () => { cancelled = true; io.disconnect(); dispose?.(); };
  }, [name]);
  return <span ref={ref} hidden />;
}
