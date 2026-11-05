"use client";

import { useEffect, useRef } from "react";
import Aurora from "@/components/canvas/Aurora";
import Icon from "@/components/Icon";

/** Home hero: aurora background, headline, sub-text and two calls to action. Nothing else. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  // gentle depth on scroll: content drifts up and fades a little faster than the background
  useEffect(() => {
    const hero = ref.current, b = bg.current, c = inner.current;
    if (!hero || !b || !c || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, visible = true;
    const apply = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, scrollY / hero.offsetHeight));
      c.style.transform = `translate3d(0, ${(-80 * p).toFixed(1)}px, 0)`;
      c.style.opacity = Math.max(0, 1 - p / 0.75).toFixed(3);
      b.style.transform = `translate3d(0, ${(90 * p).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(apply); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) onScroll(); });
    io.observe(hero);
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero__bg" ref={bg}>
        <Aurora />
        <div className="hero__fallback" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
      </div>

      <div className="container hero__inner" ref={inner}>
        <span className="pill" data-in="" style={{ "--d": ".05s" } as React.CSSProperties}>Nunnari Academy · School of AI</span>
        <h1 className="t-display" id="hero-title">
          <span className="line" data-in="" style={{ "--d": ".15s" } as React.CSSProperties}>Learn AI.</span>
          <span className="line" data-in="" style={{ "--d": ".28s" } as React.CSSProperties}>
            <span className="grad">Create what<br className="br-m" /> doesn’t exist yet.</span>
          </span>
        </h1>
        <p className="lead" data-in="" style={{ "--d": ".45s" } as React.CSSProperties}>
          Practical, hands-on AI programs in English and Tamil. Build real skills, create real projects, and grow with a{" "}
          <strong>Pioneering AI community</strong>.
        </p>
        <div className="actions" data-in="" style={{ "--d": ".6s" } as React.CSSProperties}>
          <button className="btn btn--primary btn--lg" type="button" data-enquire="Talk to our experts">
            Talk to our experts <Icon name="arrow" className="i--arrow" />
          </button>
          <a className="btn btn--ghost btn--lg" href="#programs">Explore programs</a>
        </div>
      </div>

      <a className="hero__scroll" href="#why" aria-label="Scroll down"><span /></a>
    </section>
  );
}
