"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
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
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const contentY = useTransform(p, [0, 1], [0, reduce ? 0 : -140]);
  const contentO = useTransform(p, [0, 0.7], [1, reduce ? 1 : 0]);
  const contentS = useTransform(p, [0, 1], [1, reduce ? 1 : 0.94]);
  const bgY = useTransform(p, [0, 1], [0, reduce ? 0 : 120]);
  const bgS = useTransform(p, [0, 1], [1, reduce ? 1 : 1.12]);

  return (
    <section className="hx" ref={ref} data-hero aria-labelledby="hero-title">
      <motion.div className="hx__bg" style={{ y: bgY, scale: bgS }}>
        <Aurora />
        <div className="hx__fallback" aria-hidden="true" />
        <div className="hx__grid" aria-hidden="true" />
      </motion.div>

      <motion.div className="container hx__inner" style={{ y: contentY, opacity: contentO, scale: contentS }}>
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
      </motion.div>

      <a className="hx__scroll" href="#who-we-are" aria-label="Scroll to Who we are"><span /></a>
    </section>
  );
}
