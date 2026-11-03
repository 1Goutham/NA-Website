import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import Split from "@/components/Split";
import ProgramsCatalog from "@/components/sections/ProgramsCatalog";
import TrackList from "@/components/sections/TrackList";

export const metadata: Metadata = {
  title: "Programs — Recorded, Regular & Premium AI Programmes",
  description: "Recorded Programmes for students and beginners, 12-week Regular Programmes for beginners and career switchers, and Premium Programmes led by industry experts and board-level leaders.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="p-title" style={{"paddingBottom": "clamp(40px,6vw,72px)"} as React.CSSProperties}>
        <div className="deco" aria-hidden="true">
          <span className="orb orb--a" />
          <span className="orb orb--b" />
          <svg className="deco-lines" viewBox="0 0 1440 700" preserveAspectRatio="none">
            <path d="M-20 520 C 320 420, 520 700, 900 560 S 1300 300, 1460 360" />
            <path className="travel" pathLength="1" d="M-20 520 C 320 420, 520 700, 900 560 S 1300 300, 1460 360" />
          </svg>
        </div>
        <div className="container" style={{"position": "relative", "zIndex": "1"} as React.CSSProperties}>
          <div className="section-head section-head--center" style={{"marginBottom": "clamp(40px,6vw,64px)"} as React.CSSProperties}>
            <span className="eyebrow eyebrow--center" data-reveal>Our programmes</span>
            <Split as="h1" className="h1" id="p-title">
              Learn AI at Your Own{" "}
              <span className="accent">Pace and Path.</span>
            </Split>
            <p className="lead" data-reveal style={{"--d": ".3s"} as React.CSSProperties}>
              Recorded Programmes for students and beginners, Regular Programmes offering 12-week guided learning for beginners and career switchers, and Premium Programmes led by industry experts and board-level leaders.
            </p>
          </div>
          <div className="grid-3 prog-cards">
            <article className="card card--hover spot prog-card" data-reveal style={{"--d": "0s"} as React.CSSProperties}>
              <div className="prog-card__top">
                <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-play" /></svg></span>
                <span className="prog-card__num">01</span>
              </div>
              <span className="badge badge--soft">
                Students{" "}
                &amp;
                {" "}beginners
              </span>
              <h2 className="h3" style={{"fontSize": "1.6rem"} as React.CSSProperties}>Recorded Programs</h2>
              <dl className="prog-card__facts">
                <div>
                  <dt>
                    <svg className="i"><use href="#i-user" /></svg>
                    For
                  </dt>
                  <dd>
                    K12 Students{" "}
                    &amp;
                    {" "}College Students
                  </dd>
                </div>
                <div>
                  <dt>
                    <svg className="i"><use href="#i-monitor" /></svg>
                    Format
                  </dt>
                  <dd>Online (Recorded)</dd>
                </div>
                <div>
                  <dt>
                    <svg className="i"><use href="#i-clock" /></svg>
                    Duration
                  </dt>
                  <dd>12 Weeks, self-paced</dd>
                </div>
                <div>
                  <dt>
                    <svg className="i"><use href="#i-target" /></svg>
                    Outcome
                  </dt>
                  <dd>Foundational AI skills and real projects</dd>
                </div>
              </dl>
              <Link className="link-arrow" href="/programs/recorded">
                View Details{" "}
                <svg className="i"><use href="#i-arrow" /></svg>
              </Link>
            </article>
            <article className="card card--hover spot prog-card prog-card--hl" data-reveal style={{"--d": ".1s"} as React.CSSProperties}>
              <div className="prog-card__top">
                <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-users" /></svg></span>
                <span className="prog-card__num">02</span>
              </div>
              <span className="badge badge--soft">12-week guided learning</span>
              <h2 className="h3" style={{"fontSize": "1.6rem"} as React.CSSProperties}>Regular Programs</h2>
              <dl className="prog-card__facts">
                <div>
                  <dt>
                    <svg className="i"><use href="#i-user" /></svg>
                    For
                  </dt>
                  <dd>
                    Beginners (L1) &amp; career switchers
                  </dd>
                </div>
                <div>
                  <dt>
                    <svg className="i"><use href="#i-monitor" /></svg>
                    Format
                  </dt>
                  <dd>Live + Hands-on, Online / Offline</dd>
                </div>
                <div>
                  <dt>
                    <svg className="i"><use href="#i-clock" /></svg>
                    Duration
                  </dt>
                  <dd>12 Weeks</dd>
                </div>
                <div>
                  <dt>
                    <svg className="i"><use href="#i-target" /></svg>
                    Outcome
                  </dt>
                  <dd>Real skills, a portfolio and practical projects</dd>
                </div>
              </dl>
              <Link className="link-arrow" href="/programs/regular">
                View Details{" "}
                <svg className="i"><use href="#i-arrow" /></svg>
              </Link>
            </article>
            <article className="card card--hover spot prog-card" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
              <div className="prog-card__top">
                <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-crown" /></svg></span>
                <span className="prog-card__num">03</span>
              </div>
              <span className="badge badge--soft">Led by industry experts</span>
              <h2 className="h3" style={{"fontSize": "1.6rem"} as React.CSSProperties}>Premium Programs</h2>
              <dl className="prog-card__facts">
                <div>
                  <dt>
                    <svg className="i"><use href="#i-user" /></svg>
                    For
                  </dt>
                  <dd>
                    Advanced (L3+){" "}
                    &amp;
                    {" "}C-Suite
                  </dd>
                </div>
                <div>
                  <dt>
                    <svg className="i"><use href="#i-award" /></svg>
                    Led by
                  </dt>
                  <dd>
                    Industry experts{" "}
                    &amp;
                    {" "}board-level leaders
                  </dd>
                </div>
                <div>
                  <dt>
                    <svg className="i"><use href="#i-clock" /></svg>
                    Duration
                  </dt>
                  <dd>12 Weeks</dd>
                </div>
              </dl>
              <Link className="link-arrow" href="/programs/premium">
                View Details{" "}
                <svg className="i"><use href="#i-arrow" /></svg>
              </Link>
            </article>
          </div>
        </div>
      </section>
      <section className="section" id="details" aria-label="Programme details" style={{"paddingTop": "clamp(24px,4vw,48px)"} as React.CSSProperties}><div className="container" data-reveal><ProgramsCatalog /></div></section>
      <section className="section section--surface" id="tracks" aria-labelledby="tracks-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
              <span className="eyebrow" data-reveal>Regular programme tracks</span>
              <Split as="h2" className="h2" id="tracks-title">
                12-week programs for{" "}
                <span className="accent">every path.</span>
              </Split>
            </div>
            <p className="lead" style={{"maxWidth": "420px"} as React.CSSProperties} data-reveal>
              From critical skills to technical topics, we support your professional development with courses that help you grow and succeed.
            </p>
          </div>
          <TrackList />
          
        </div>
      </section>
    </>
  );
}
