"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Progressive enhancement for the static pages: scroll reveals, counters,
 * pausing art offscreen, live workshop state, back-to-top. Re-binds per route.
 */
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const all = <T extends Element = HTMLElement>(s: string) => [...document.querySelectorAll<T & Element>(s)] as T[];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const off: Array<() => void> = [];

    /* reveal on scroll */
    const reveal = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); reveal.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    all("[data-reveal], [data-split], [data-inview]").forEach((el) => reveal.observe(el));
    off.push(() => reveal.disconnect());

    /* line-art and marquees only animate while on screen */
    const pause = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("is-paused", !e.isIntersecting)));
    all(".art, .marquee").forEach((el) => pause.observe(el));
    off.push(() => pause.disconnect());

    /* counters */
    const count = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      count.unobserve(e.target);
      const el = e.target as HTMLElement;
      const end = parseFloat(el.dataset.count || "0"), suf = el.dataset.suffix || "";
      const fmt = (n: number) => n.toLocaleString("en-IN") + suf;
      if (reduced) { el.textContent = fmt(end); return; }
      const t0 = performance.now();
      const step = (t: number) => { const p = Math.min(1, (t - t0) / 1400); el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 4)))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), { threshold: 0.5 });
    all("[data-count]").forEach((el) => count.observe(el));
    off.push(() => count.disconnect());

    /* workshops: state from dates (pages are pre-built, so re-check in the browser) */
    const now = Date.now();
    all("[data-date]").forEach((el) => {
      const s = +new Date(el.dataset.date || ""), e = +new Date(el.dataset.end || el.dataset.date || "");
      el.dataset.when = now < s ? "upcoming" : now <= e ? "live" : "past";
    });

    /* back to top */
    all("[data-to-top]").forEach((b) => {
      const f = () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      b.addEventListener("click", f);
      off.push(() => b.removeEventListener("click", f));
    });

    const vis = () => document.body.classList.toggle("is-paused", document.hidden);
    document.addEventListener("visibilitychange", vis);
    off.push(() => document.removeEventListener("visibilitychange", vis));
    return () => off.forEach((f) => f());
  }, [pathname]);

  return null;
}
