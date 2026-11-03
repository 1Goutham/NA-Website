"use client";

import { useEffect, useRef } from "react";
import Aurora from "@/components/canvas/Aurora";
import Icon, { type IconName } from "@/components/Icon";

const features: { icon: IconName; title: string; text: string }[] = [
  { icon: "message", title: "Learn in Tamil", text: "Clear explanations, examples, and guidance in Tamil, so you can truly understand and apply." },
  { icon: "laptop", title: "Hands-on AI Program", text: "Build real projects, work with modern tools, and gain practical skills through guided, hands-on learning." },
  { icon: "cap", title: "1 Year of LMS Access", text: "Get 1 year of access to our learning platform with all resources, updates, and new content." },
  { icon: "users", title: "Global AI Community", text: "Get access to our community where you meet like-minded learners, attend AI events, and discover global opportunities." },
];

/** Feature card that tilts toward the cursor with a moving glare. */
function TiltCard({ f, i }: { f: (typeof features)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const leave = () => { const el = ref.current!; el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); };
  return (
    <div className="hx-card" ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ "--i": i } as React.CSSProperties}>
      <div className="hx-card__inner">
        <span className="hx-card__icon"><Icon name={f.icon} /></span>
        <h3>{f.title}</h3>
        <p>{f.text}</p>
        <span className="hx-card__glare" aria-hidden="true" />
      </div>
    </div>
  );
}

/**
 * Home hero: WebGL aurora background, masked line reveal on load, magnetic CTAs,
 * scroll-linked depth (content lifts and fades faster than the background), tilt cards.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  // depth on scroll: content lifts and fades faster than the background. One passive listener,
  // one rAF per frame, and it only runs while the hero is actually on screen.
  useEffect(() => {
    const hero = ref.current, b = bg.current, c = inner.current;
    if (!hero || !b || !c || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, visible = true, h = hero.offsetHeight;
    const apply = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, scrollY / h));
      c.style.transform = `translate3d(0, ${(-140 * p).toFixed(1)}px, 0) scale(${(1 - 0.06 * p).toFixed(4)})`;
      c.style.opacity = String(Math.max(0, 1 - p / 0.7).toFixed(3));
      b.style.transform = `translate3d(0, ${(120 * p).toFixed(1)}px, 0) scale(${(1 + 0.12 * p).toFixed(4)})`;
    };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(apply); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) onScroll(); });
    io.observe(hero);
    const ro = new ResizeObserver(() => { h = hero.offsetHeight; });
    ro.observe(hero);
    addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hx" ref={ref} data-hero aria-labelledby="hero-title">
      <div className="hx__bg" ref={bg}>
        <Aurora />
        <div className="hx__fallback" aria-hidden="true" />
        <div className="hx__grid" aria-hidden="true" />
      </div>

      <div className="container hx__inner" ref={inner}>
        <p className="hx__tag">
          <span className="hx__tag-dot" aria-hidden="true" />
          NUNNARI ACADEMY <i>|</i> SCHOOL OF AI
        </p>

        <h1 className="hx__title" id="hero-title">
          <span className="hx__line"><span style={{ "--l": 0 } as React.CSSProperties}>Learn AI.</span></span>
          <span className="hx__line">
            <span style={{ "--l": 1 } as React.CSSProperties}>
              <em className="hx__shine">Create</em> What Doesn’t Exist Yet<b>.</b>
            </span>
          </span>
        </h1>

        <p className="hx__lead">
          Practical, hands-on AI programs for curious minds – in Tamil and English. Build real skills, create real projects,
          and be a part of the <strong>AI pioneer community</strong> that builds and grows together.
        </p>

        <div className="hx__actions">
          <button className="btn btn--primary btn--caps hx__cta" type="button" data-enquire="Talk to our experts" data-magnetic>
            <span className="hx__cta-beam" aria-hidden="true" />
            <Icon name="message" /> Talk to our experts <Icon name="arrow" className="i--arrow" />
          </button>
          <a className="btn btn--ghost btn--caps" href="#programs" data-magnetic>
            <Icon name="book" /> Explore our programs
          </a>
        </div>

        <div className="hx__cards">
          {features.map((f, i) => <TiltCard key={f.title} f={f} i={i} />)}
        </div>
      </div>

      <a className="hx__scroll" href="#who-we-are" aria-label="Scroll to Who we are"><span /></a>
    </section>
  );
}
