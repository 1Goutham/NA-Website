"use client";

import { useEffect, useRef } from "react";

/** Mounts the particle illustration into its parent panel once the panel nears the viewport. */
export default function Particles({ name }: { name: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    let dispose: (() => void) | undefined, cancelled = false;
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      try {
        const { mount } = await import("@/lib/particles/engine");
        if (!cancelled) dispose = mount(host, name);
      } catch { /* the panel keeps its plain background */ }
    }, { rootMargin: "250px" });
    io.observe(host);
    return () => { cancelled = true; io.disconnect(); dispose?.(); };
  }, [name]);
  return <span ref={ref} hidden />;
}
