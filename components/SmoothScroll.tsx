"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window { __lenis?: Lenis }
}

/** Inertia smooth scrolling (Lenis). Disabled for reduced-motion users and touch devices keep native scroll. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      // responsive, light inertia (a long duration feels laggy)
      lerp: 0.13,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -96 },
    });
    window.__lenis = lenis;
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // keep Lenis in sync after client-side navigations
  useEffect(() => {
    const l = window.__lenis;
    if (!l) return;
    if (location.hash) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) setTimeout(() => l.scrollTo(el, { offset: -96, immediate: false }), 60);
    } else {
      l.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
