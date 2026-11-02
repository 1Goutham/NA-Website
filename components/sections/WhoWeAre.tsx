"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import clsx from "@/lib/clsx";

type Chapter = {
  id: string;
  label: string;
  title: ReactNode;
  text: string;
  img: string;
  alt: string;
  detail: ReactNode;
};

const Stat = ({ n, suffix = "+", label }: { n: number | string; suffix?: string; label: string }) => (
  <div className="story-stat">
    <strong {...(typeof n === "number" ? { "data-count": n, "data-suffix": suffix } : {})}>{typeof n === "number" ? `${n.toLocaleString("en-IN")}${suffix}` : n}</strong>
    <span>{label}</span>
  </div>
);

const chapters: Chapter[] = [
  {
    id: "mission",
    label: "Our mission & vision",
    title: <>Making AI learning accessible <em>for everyone.</em></>,
    text: "We exist to empower students and professionals with real AI skills, regardless of their background, language, or location.",
    img: "/assets/img/mission-800.webp",
    alt: "A learner looking out over a city of AI possibilities",
    detail: (
      <dl className="story-dl">
        <div><dt>Mission</dt><dd>Make AI education practical and inclusive.</dd></div>
        <div><dt>Vision</dt><dd>A future where everyone can create, build, and grow with AI.</dd></div>
        <div><dt>Purpose</dt><dd>Bridge the gap between curiosity and opportunity.</dd></div>
      </dl>
    ),
  },
  {
    id: "why-nunnari",
    label: "Why choose Nunnari Academy",
    title: <>Learn. Build. Grow. With <em>real support.</em></>,
    text: "Practical programmes, bilingual learning, real projects and lifelong access — designed to help you go from curiosity to career.",
    img: "/assets/img/why-logo-800.webp",
    alt: "Nunnari Academy's learning platform: learn in Tamil, LMS access and hands-on programmes",
    detail: (
      <dl className="story-dl story-dl--grid">
        <div><dt>Hands-on AI Programmes</dt><dd>Learn by doing with real projects and industry use cases.</dd></div>
        <div><dt>Tamil &amp; English Learning</dt><dd>Learn in the language you’re comfortable with.</dd></div>
        <div><dt>Practical Projects</dt><dd>Build a portfolio that shows real skills.</dd></div>
        <div><dt>LMS Access</dt><dd>Get lifetime access to recorded classes and resources.</dd></div>
      </dl>
    ),
  },
  {
    id: "backed-by",
    label: "Backed by Nunnari Labs & DeepWeaver",
    title: <>Powered by real <em>innovation and expertise.</em></>,
    text: "Nunnari Academy is supported by Nunnari Labs and DeepWeaver — organisations focused on AI research, products, and real-world impact.",
    img: "/assets/img/backed-logo-800.webp",
    alt: "DeepWeaver (Australia) and Nunnari Labs (India), ISO 42001 certified",
    detail: (
      <div className="story-orgs">
        <div>
          <Image src="/assets/logos/nunnari-labs.svg" alt="Nunnari Labs" width={48} height={56} />
          <p><b>Nunnari Labs</b> A research and product studio working on AI for education, creativity, and community impact.</p>
        </div>
        <div>
          <Image src="/assets/logos/deepweaver.webp" alt="DeepWeaver" width={140} height={28} style={{ height: 24, width: "auto" }} />
          <p><b>DeepWeaver</b> An AI product and engineering studio building real-world solutions with global expertise.</p>
        </div>
      </div>
    ),
  },
  {
    id: "community-events",
    label: "Our community & events",
    title: <>A growing community of <em>AI learners and builders.</em></>,
    text: "Join a vibrant community, attend hands-on workshops and hackathons, network with industry experts, and explore global opportunities.",
    img: "/assets/img/community-800.webp",
    alt: "AI Tamil Nadu and ML.Cbe community meetups, workshops and expert talks",
    detail: (
      <div className="story-stats">
        <Stat n={10000} label="Community members" />
        <Stat n={50} label="Workshops & events" />
        <Stat n={100} label="Industry experts & speakers" />
        <Stat n="Global" label="Opportunities & collaborations" />
      </div>
    ),
  },
  {
    id: "learners-partners",
    label: "Our learners & partners",
    title: <>Real people. <em>Real progress.</em></>,
    text: "Our learners are building projects, getting placed, starting their own ventures, and working at leading companies. We collaborate with industry partners to bring real opportunities to our community.",
    img: "/assets/img/learners-logo-800.webp",
    alt: "Nunnari Academy partners across government, enterprises, schools and universities",
    detail: (
      <div className="story-stats">
        <Stat n={500} label="Students trained" />
        <Stat n={200} label="Projects built" />
        <Stat n={50} label="Placements & internships" />
        <Stat n={25} label="Partner companies" />
      </div>
    ),
  },
];

/**
 * "Who we are" as a scroll story (doc §1.4): a sticky visual on the left cross-fades between the five
 * illustrations while the chapters scroll past on the right. Dash indicators fill with scroll progress.
 */
export default function WhoWeAre() {
  const wrap = useRef<HTMLDivElement>(null);
  const blocks = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 60%", "end 60%"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    wrap.current?.style.setProperty("--story-p", (p * chapters.length).toFixed(3));
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setActive(Number((en.target as HTMLElement).dataset.i)); }),
      { rootMargin: "-48% 0px -48% 0px" },
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const el = blocks.current[i];
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -innerHeight * 0.3 });
    else el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="story" ref={wrap}>
      <div className="story__visual" aria-hidden="true">
        <div className="story__frame">
          {chapters.map((c, i) => (
            <Image
              key={c.id}
              src={c.img}
              alt=""
              fill
              sizes="(max-width: 960px) 0px, 520px"
              className={clsx("story__img", i === active && "is-active", i < active && "is-before")}
              priority={i === 0}
            />
          ))}
          <div className="story__shade" />
          <div className="story__caption">
            <span key={active} className="story__caption-text">{chapters[active].label}</span>
          </div>
          <div className="story__dashes">
            {chapters.map((c, i) => (
              <button key={c.id} type="button" tabIndex={-1} aria-label={c.label} onClick={() => go(i)} style={{ "--i": i } as React.CSSProperties}>
                <i />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="story__chapters">
        {chapters.map((c, i) => (
          <article
            key={c.id}
            id={c.id}
            ref={(el) => { blocks.current[i] = el; }}
            data-i={i}
            className={clsx("story__chapter", i === active && "is-active")}
          >
            <div className="story__mobile-img">
              <Image src={c.img} alt={c.alt} width={800} height={1421} sizes="(max-width: 960px) 92vw, 1px" />
            </div>
            <p className="story__label">{c.label}</p>
            <h3 className="story__title">{c.title}</h3>
            <p className="story__text">{c.text}</p>
            {c.detail}
          </article>
        ))}
      </div>
    </div>
  );
}
