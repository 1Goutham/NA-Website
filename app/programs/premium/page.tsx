import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import Split from "@/components/Split";
import BrochureButton from "@/components/ui/BrochureButton";
import SceneNetwork from "@/components/scenes/SceneNetwork";
import ScenePremium from "@/components/scenes/ScenePremium";

export const metadata: Metadata = {
  title: "Premium Programme — Led by Industry Experts",
  description: "Premium Programmes led by industry experts and board-level leaders, for advanced learners (L3+) and the C-Suite.",
  alternates: { canonical: "/programs/premium" },
};

export default function PremiumPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="pre-title">
        <div className="deco" aria-hidden="true"><span className="orb orb--a" /></div>
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <nav className="crumbs" aria-label="Breadcrumb" data-reveal>
              <Link href="/programs">Programmes</Link>
              <svg className="i"><use href="#i-chevron-r" /></svg>
              <span aria-current="page">Premium Programme</span>
            </nav>
            <span className="badge" data-reveal>Premium Programme · 03</span>
            <Split as="h1" className="h1" id="pre-title">
              Learn from{" "}
              <span className="accent">industry leaders.</span>
            </Split>
            <p className="lead" data-reveal style={{"--d": ".3s"} as React.CSSProperties}>
              Premium Programmes led by industry experts and board-level leaders, for advanced learners (L3+) and the C-Suite.
            </p>
            <div className="chips-row" data-reveal style={{"--d": ".4s"} as React.CSSProperties}>
              <div className="mini-fact">
                <svg className="i"><use href="#i-trend" /></svg>
                <div>
                  <b>Advanced</b>
                  <span>L3+</span>
                </div>
              </div>
              <div className="mini-fact">
                <svg className="i"><use href="#i-briefcase" /></svg>
                <div>
                  <b>C-Suite</b>
                  <span>Leadership</span>
                </div>
              </div>
              <div className="mini-fact">
                <svg className="i"><use href="#i-award" /></svg>
                <div>
                  <b>Expert-led</b>
                  <span>Board-level leaders</span>
                </div>
              </div>
              <div className="mini-fact">
                <svg className="i"><use href="#i-clock" /></svg>
                <div>
                  <b>12 Weeks</b>
                  <span>Programme</span>
                </div>
              </div>
            </div>
            <div className="cta-actions" data-reveal style={{"--d": ".5s"} as React.CSSProperties}>
              <button className="btn btn--primary btn--lg" type="button" data-enquire="Premium Programmes" data-magnetic>
                Talk to our team{" "}
                <svg className="i i--arrow"><use href="#i-arrow" /></svg>
              </button>
              <BrochureButton program="premium" />
            </div>
          </div>
          <div className="page-hero__art"><ScenePremium /></div>
        </div>
      </section>
      <section className="section" aria-labelledby="pfor-title">
        <div className="container two-col">
          <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">02</span>
              {" "}Designed for
            </span>
            <Split as="h2" className="h2" id="pfor-title">
              Advanced learners{" "}
              <span className="accent">
                &amp;
                {" "}leaders.
              </span>
            </Split>
          </div>
          <div className="tile-grid">
            <div className="card card--hover spot glance__item" data-reveal>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-trend" /></svg></span>
              <small>Level</small>
              <b>Advanced (L3+)</b>
            </div>
            <div className="card card--hover spot glance__item" data-reveal style={{"--d": ".1s"} as React.CSSProperties}>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-briefcase" /></svg></span>
              <small>Leadership</small>
              <b>C-Suite</b>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--surface" aria-labelledby="pled-title">
        <div className="container two-col">
          <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">03</span>
              {" "}Led by
            </span>
            <Split as="h2" className="h2" id="pled-title">
              Industry experts and{" "}
              <span className="accent">board-level leaders.</span>
            </Split>
          </div>
          <div className="tile-grid">
            <div className="card card--hover spot glance__item" data-reveal>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-award" /></svg></span>
              <b>Industry experts</b>
            </div>
            <div className="card card--hover spot glance__item" data-reveal style={{"--d": ".1s"} as React.CSSProperties}>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-crown" /></svg></span>
              <b>Board-level leaders</b>
            </div>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="pback-title">
        <div className="container two-col">
          <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">04</span>
              {" "}Backed by Nunnari Labs{" "}
              &amp;
              {" "}DeepWeaver
            </span>
            <Split as="h2" className="h2" id="pback-title">
              Powered by real{" "}
              <span className="accent">innovation and expertise.</span>
            </Split>
            <p className="lead" data-reveal>
              Nunnari Academy is supported by Nunnari Labs and DeepWeaver — organisations focused on AI research, products, and real-world impact.
            </p>
          </div>
          <div className="tile-grid">
            <div className="card card--hover spot glance__item" data-reveal>
              <img src="/assets/logos/nunnari-labs.svg" alt="Nunnari Labs" width="96" height="112" style={{"height": "56px", "width": "auto"} as React.CSSProperties} />
              <b>Nunnari Labs</b>
              <p>A research and product studio working on AI for education, creativity, and community impact.</p>
            </div>
            <div className="card card--hover spot glance__item" data-reveal style={{"--d": ".1s"} as React.CSSProperties}>
              <img src="/assets/logos/deepweaver.webp" alt="DeepWeaver" width="560" height="110" style={{"height": "28px", "width": "auto", "marginBlock": "14px"} as React.CSSProperties} />
              <b>DeepWeaver</b>
              <p>An AI product and engineering studio building real-world solutions with global expertise.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{"paddingTop": "0"} as React.CSSProperties} aria-labelledby="pcta-title">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__grid">
              <div className="cta-band__copy">
                <Split as="h2" className="h2" id="pcta-title">
                  Lead what’s next{" "}
                  <span className="accent">with AI.</span>
                </Split>
                <p className="lead" data-reveal>Talk to our team about Premium Programmes for advanced learners and leadership teams.</p>
                <div className="cta-actions" data-reveal>
                  <button className="btn btn--primary btn--lg" type="button" data-enquire="Premium Programmes" data-magnetic>
                    Talk to our team{" "}
                    <svg className="i i--arrow"><use href="#i-arrow" /></svg>
                  </button>
                </div>
                <p className="note-pill" data-reveal>
                  <svg className="i"><use href="#i-clock" /></svg>
                  Our team will connect you within 24 – 48 hrs.
                </p>
              </div>
              <div className="cta-band__art"><SceneNetwork /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
