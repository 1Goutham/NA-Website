"use client";

import { useEffect, useRef } from "react";

/** Mounts the 3D model into its parent panel once the panel nears the viewport. */
export default function Stage({ name }: { name: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    let dispose: (() => void) | undefined, cancelled = false;
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      try {
        const { mount } = await import("@/lib/scene/stage");
        if (!cancelled) dispose = mount(host, name);
      } catch (err) {
        // the panel keeps its still fallback
        if (process.env.NODE_ENV !== "production") console.error(err);
      }
    }, { rootMargin: "300px" });
    io.observe(host);
    return () => { cancelled = true; io.disconnect(); dispose?.(); };
  }, [name]);
  return <span ref={ref} hidden />;
}
