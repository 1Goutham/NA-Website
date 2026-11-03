"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import Icon from "@/components/Icon";
import SceneRecorded from "@/components/scenes/SceneRecorded";
import SceneRegular from "@/components/scenes/SceneRegular";
import ScenePremium from "@/components/scenes/ScenePremium";

const tabs = [
  { key: "recorded", title: "Recorded Programs", sub: "K12 & College Students", icon: "play" as const },
  { key: "regular", title: "Regular Programs", sub: "Beginners (L1)", icon: "users" as const },
  { key: "premium", title: "Premium Programs", sub: "Advanced (L3+) & C-Suite", icon: "crown" as const },
];

/** Tabbed course catalogue (doc §1.6). Arrow keys move between tabs; #recorded / #regular / #premium select one. */
export default function ProgramsCatalog() {
  const [active, setActive] = useState("recorded");
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const fromHash = () => { const h = location.hash.slice(1); if (tabs.some((t) => t.key === h)) setActive(h); };
    fromHash();
    addEventListener("hashchange", fromHash);
    return () => removeEventListener("hashchange", fromHash);
  }, []);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let n: number | null = null;
    if (e.key in map) n = (i + map[e.key] + tabs.length) % tabs.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = tabs.length - 1;
    if (n === null) return;
    e.preventDefault();
    setActive(tabs[n].key);
    refs.current[tabs[n].key]?.focus();
  };

  return (
    <div className="catalog">
      <div className="tablist" role="tablist" aria-label="Programme levels" aria-orientation="vertical">
        {tabs.map((t, i) => (
          <button key={t.key} ref={(el) => { refs.current[t.key] = el; }} className="tab" role="tab" id={`tab-${t.key}`} aria-controls={`panel-${t.key}`}
            aria-selected={active === t.key} tabIndex={active === t.key ? 0 : -1} type="button" onClick={() => setActive(t.key)} onKeyDown={(e) => onKey(e, i)}>
            <span className="icon-chip"><Icon name={t.icon} /></span>
            <span className="tab__t"><b>{t.title}</b><span>{t.sub}</span></span>
            <span className="tab__num">0{i + 1}</span><span className="tab__bar" />
          </button>
        ))}
      </div>
<div className="panel-wrap">
        <section className={`panel${active === "recorded" ? " is-active" : ""}`} role="tabpanel" id="panel-recorded" aria-labelledby="tab-recorded" aria-hidden={active !== "recorded"} inert={active !== "recorded"}>
          <div className="panel__top">
            <div className="panel__copy" data-stagger>
              <span className="badge">Recorded Programs</span>
              <h3 className="h1" style={{"fontSize": "clamp(2rem,3.6vw,2.9rem)"} as React.CSSProperties}>
                Learn at
                <br />
                Your{" "}
                <span className="accent">Own Pace.</span>
              </h3>
              <p>
                Affordable, flexible, and self-paced learning for K12 students and college students who are new to AI.
              </p>
            </div>
            <div className="panel__art"><SceneRecorded /></div>
          </div>
          <div className="facts" data-stagger>
            <div className="fact">
              <svg className="i"><use href="#i-user" /></svg>
              <b>For</b>
              <span>
                K12 Students{" "}
                &amp;
                {" "}College Students
              </span>
            </div>
            <div className="fact">
              <svg className="i"><use href="#i-monitor" /></svg>
              <b>Format</b>
              <span>Online (Recorded)</span>
            </div>
            <div className="fact">
              <svg className="i"><use href="#i-clock" /></svg>
              <b>Duration</b>
              <span>12 Weeks, self-paced</span>
            </div>
            <div className="fact">
              <svg className="i"><use href="#i-target" /></svg>
              <b>Outcome</b>
              <span>Build foundational AI skills and real projects</span>
            </div>
          </div>
          <div className="learn">
            <p className="learn__title">What you'll learn</p>
            <ul>
              <li>
                <span className="check" style={{"--k": "0"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
                AI{" "}
                &amp;
                {" "}technology fundamentals
              </li>
              <li>
                <span className="check" style={{"--k": "1"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
                Hands-on projects and real-world applications
              </li>
              <li>
                <span className="check" style={{"--k": "2"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
                Build a portfolio with guided exercises
              </li>
            </ul>
          </div>
          <div className="panel__cta">
            <Link className="btn btn--primary btn--lg" href="/programs/recorded">
              View Programme Details{" "}
              <svg className="i i--arrow"><use href="#i-arrow" /></svg>
            </Link>
          </div>
        </section>
        <section className={`panel${active === "regular" ? " is-active" : ""}`} role="tabpanel" id="panel-regular" aria-labelledby="tab-regular" aria-hidden={active !== "regular"} inert={active !== "regular"}>
          <div className="panel__top">
            <div className="panel__copy" data-stagger>
              <span className="badge">Regular Programs</span>
              <h3 className="h1" style={{"fontSize": "clamp(2rem,3.6vw,2.9rem)"} as React.CSSProperties}>
                Build a strong
                <br />
                foundation in{" "}
                <span className="accent">
                  AI{" "}
                  &amp;
                  {" "}ML.
                </span>
              </h3>
              <p>
                A 12-week hands-on programme designed for beginners, college students, and early learners to build real skills and work on practical projects.
              </p>
            </div>
            <div className="panel__art"><SceneRegular /></div>
          </div>
          <div className="facts" data-stagger>
            <div className="fact">
              <svg className="i"><use href="#i-user" /></svg>
              <b>For</b>
              <span>
                Beginners (L1) &amp; career switchers
              </span>
            </div>
            <div className="fact">
              <svg className="i"><use href="#i-monitor" /></svg>
              <b>Format</b>
              <span>Live + Hands-on, Online / Offline</span>
            </div>
            <div className="fact">
              <svg className="i"><use href="#i-clock" /></svg>
              <b>Duration</b>
              <span>12 Weeks guided learning</span>
            </div>
            <div className="fact">
              <svg className="i"><use href="#i-target" /></svg>
              <b>Outcome</b>
              <span>Real skills, a portfolio and practical projects</span>
            </div>
          </div>
          <div className="learn">
            <p className="learn__title">What you'll learn</p>
            <ul>
              <li>
                <span className="check" style={{"--k": "0"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
                A strong foundation in AI{" "}
                &amp;
                {" "}ML
              </li>
              <li>
                <span className="check" style={{"--k": "1"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
                Industry standard tools{" "}
                &amp;
                {" "}technologies
              </li>
              <li>
                <span className="check" style={{"--k": "2"} as React.CSSProperties}><svg className="i"><use href="#i-check" /></svg></span>
                Real-world projects with mentorship
              </li>
            </ul>
          </div>
          <div className="panel__cta">
            <Link className="btn btn--primary btn--lg" href="/programs/regular">
              View Programme Details{" "}
              <svg className="i i--arrow"><use href="#i-arrow" /></svg>
            </Link>
          </div>
        </section>
        <section className={`panel${active === "premium" ? " is-active" : ""}`} role="tabpanel" id="panel-premium" aria-labelledby="tab-premium" aria-hidden={active !== "premium"} inert={active !== "premium"}>
          <div className="panel__top">
            <div className="panel__copy" data-stagger>
              <span className="badge">Premium Programs</span>
              <h3 className="h1" style={{"fontSize": "clamp(2rem,3.6vw,2.9rem)"} as React.CSSProperties}>
                Learn from
                <br />
                <span className="accent">industry leaders.</span>
              </h3>
              <p>
                Premium Programmes led by industry experts and board-level leaders, for advanced learners (L3+) and the C-Suite.
              </p>
            </div>
            <div className="panel__art"><ScenePremium /></div>
          </div>
          <div className="facts" data-stagger>
            <div className="fact">
              <svg className="i"><use href="#i-user" /></svg>
              <b>For</b>
              <span>
                Advanced (L3+){" "}
                &amp;
                {" "}C-Suite
              </span>
            </div>
            <div className="fact">
              <svg className="i"><use href="#i-award" /></svg>
              <b>Led by</b>
              <span>
                Industry experts{" "}
                &amp;
                {" "}board-level leaders
              </span>
            </div>
            <div className="fact">
              <svg className="i"><use href="#i-clock" /></svg>
              <b>Duration</b>
              <span>12 Weeks</span>
            </div>
          </div>
          <div className="panel__cta">
            <Link className="btn btn--primary btn--lg" href="/programs/premium">
              View Programme Details{" "}
              <svg className="i i--arrow"><use href="#i-arrow" /></svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
