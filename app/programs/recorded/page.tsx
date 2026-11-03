import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import Split from "@/components/Split";
import BrochureButton from "@/components/ui/BrochureButton";
import Accordion from "@/components/ui/Accordion";
import SceneGlobe from "@/components/scenes/SceneGlobe";
import SceneRecorded from "@/components/scenes/SceneRecorded";

export const metadata: Metadata = {
  title: "Recorded Programme — Learn AI at Your Own Pace",
  description: "Affordable, flexible, and self-paced AI learning for K12 students and college students who are new to AI. Online (recorded), 3–6 months.",
  alternates: { canonical: "/programs/recorded" },
};

const faq = [
  { q: "Who is the Recorded Programme for?", a: "K12 students and college students who are new to AI." },
  { q: "How is it delivered?", a: "Online, as recorded lessons — so you can learn whenever it suits you." },
  { q: "How long does it take?", a: "It is a 12-week programme, delivered as recorded lessons so you can learn at your own pace." },
  { q: "What will I have at the end?", a: "Foundational AI skills, real projects, and a portfolio built with guided exercises." },
];

export default function RecordedPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="rec-title">
        <div className="deco" aria-hidden="true"><span className="orb orb--a" /></div>
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <nav className="crumbs" aria-label="Breadcrumb" data-reveal>
              <Link href="/programs">Programmes</Link>
              <svg className="i"><use href="#i-chevron-r" /></svg>
              <span aria-current="page">Recorded Programme</span>
            </nav>
            <span className="badge" data-reveal>Recorded Programme · 01</span>
            <Split as="h1" className="h1" id="rec-title">
              Learn AI at Your{" "}
              <span className="accent">Own Pace.</span>
            </Split>
            <p className="lead" data-reveal style={{"--d": ".3s"} as React.CSSProperties}>
              Affordable, flexible, and self-paced learning for K12 students and college students who are new to AI.
            </p>
            <div className="chips-row" data-reveal style={{"--d": ".4s"} as React.CSSProperties}>
              <div className="mini-fact">
                <svg className="i"><use href="#i-clock" /></svg>
                <div>
                  <b>Self-paced</b>
                  <span>12 Weeks</span>
                </div>
              </div>
              <div className="mini-fact">
                <svg className="i"><use href="#i-user" /></svg>
                <div>
                  <b>
                    K12 &amp; Students
                  </b>
                  <span>New to AI</span>
                </div>
              </div>
              <div className="mini-fact">
                <svg className="i"><use href="#i-monitor" /></svg>
                <div>
                  <b>Online</b>
                  <span>Recorded</span>
                </div>
              </div>
            </div>
            <div className="cta-actions" data-reveal style={{"--d": ".5s"} as React.CSSProperties}>
              <button className="btn btn--primary btn--lg" type="button" data-enquire="Enroll: Recorded Programme" data-magnetic>
                Enroll Now{" "}
                <svg className="i i--arrow"><use href="#i-arrow" /></svg>
              </button>
              <BrochureButton program="recorded" />
            </div>
          </div>
          <div className="page-hero__art"><SceneRecorded /></div>
        </div>
      </section>
      <section className="section" aria-labelledby="glance-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">02</span>
              {" "}At a glance
            </span>
            <Split as="h2" className="h2" id="glance-title">
              Everything you need to{" "}
              <span className="accent">start with AI.</span>
            </Split>
          </div>
          <div className="glance">
            <div className="card card--hover spot glance__item" data-reveal>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-user" /></svg></span>
              <small>For</small>
              <b>
                K12 Students{" "}
                &amp;
                {" "}College Students
              </b>
            </div>
            <div className="card card--hover spot glance__item" data-reveal style={{"--d": ".08s"} as React.CSSProperties}>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-monitor" /></svg></span>
              <small>Format</small>
              <b>Online (Recorded)</b>
            </div>
            <div className="card card--hover spot glance__item" data-reveal style={{"--d": ".16s"} as React.CSSProperties}>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-clock" /></svg></span>
              <small>Duration</small>
              <b>12 Weeks, self-paced</b>
            </div>
            <div className="card card--hover spot glance__item" data-reveal style={{"--d": ".24s"} as React.CSSProperties}>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-target" /></svg></span>
              <small>Outcome</small>
              <b>Build foundational AI skills and real projects</b>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--surface" id="learn" aria-labelledby="learn-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">03</span>
              {" "}What you'll learn
            </span>
            <Split as="h2" className="h2" id="learn-title">
              From fundamentals to{" "}
              <span className="accent">a real portfolio.</span>
            </Split>
          </div>
          <ol className="journey" role="list" data-inview style={{"gridTemplateColumns": "repeat(3,1fr)"} as React.CSSProperties}>
            <li className="card card--hover journey__step" style={{"--k": "0"} as React.CSSProperties}>
              <span className="icon-chip"><svg className="i"><use href="#i-book" /></svg></span>
              <b>
                AI{" "}
                &amp;
                {" "}technology fundamentals
              </b>
              <p>Start from the basics, explained clearly.</p>
            </li>
            <li className="card card--hover journey__step" style={{"--k": "1"} as React.CSSProperties}>
              <span className="icon-chip"><svg className="i"><use href="#i-code" /></svg></span>
              <b>Hands-on projects</b>
              <p>Real-world applications you build yourself.</p>
            </li>
            <li className="card card--hover journey__step" style={{"--k": "2"} as React.CSSProperties}>
              <span className="icon-chip"><svg className="i"><use href="#i-folder" /></svg></span>
              <b>A portfolio</b>
              <p>Built with guided exercises.</p>
            </li>
          </ol>
        </div>
      </section>
      <section className="section" aria-labelledby="why-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">04</span>
              {" "}Why learn with Nunnari
            </span>
            <Split as="h2" className="h2" id="why-title">
              Learn. Build. Grow. With{" "}
              <span className="accent">real support.</span>
            </Split>
          </div>
          <div className="glance">
            <div className="card card--hover spot glance__item" data-reveal>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-message" /></svg></span>
              <b>Learn in Tamil</b>
              <p>Clear explanations, examples, and guidance in Tamil, so you can truly understand and apply.</p>
            </div>
            <div className="card card--hover spot glance__item" data-reveal style={{"--d": ".08s"} as React.CSSProperties}>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-cap" /></svg></span>
              <b>1 Year of LMS Access</b>
              <p>Get 1 year of access to our learning platform with all resources, updates, and new content.</p>
            </div>
            <div className="card card--hover spot glance__item" data-reveal style={{"--d": ".16s"} as React.CSSProperties}>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-award" /></svg></span>
              <b>Completion Certificate</b>
              <p>Receive a completion award from our team to enhance your motivation.</p>
            </div>
            <div className="card card--hover spot glance__item" data-reveal style={{"--d": ".24s"} as React.CSSProperties}>
              <span className="icon-chip icon-chip--lg"><svg className="i"><use href="#i-users" /></svg></span>
              <b>Global AI Community</b>
              <p>Meet like-minded learners, attend AI events, and discover global opportunities.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--surface" aria-labelledby="rfaq-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>Frequently asked questions</span>
            <Split as="h2" className="h2" id="rfaq-title">
              Got Questions? We’ve Got{" "}
              <span className="accent">Answers.</span>
            </Split>
          </div>
          <div style={{ maxWidth: 860 }}><Accordion items={faq} /></div>
        </div>
      </section>
      <section className="section" aria-labelledby="rcta-title">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__grid">
              <div className="cta-band__copy">
                <Split as="h2" className="h2" id="rcta-title">
                  Start learning at{" "}
                  <span className="accent">your own pace.</span>
                </Split>
                <p className="lead" data-reveal>Affordable, flexible, and self-paced — begin your AI journey today.</p>
                <div className="cta-actions" data-reveal>
                  <button className="btn btn--primary btn--lg" type="button" data-enquire="Enroll: Recorded Programme" data-magnetic>
                    Enroll Now{" "}
                    <svg className="i i--arrow"><use href="#i-arrow" /></svg>
                  </button>
                  <Link className="link-arrow" href="/programs">
                    Compare programmes{" "}
                    <svg className="i"><use href="#i-arrow-ur" /></svg>
                  </Link>
                </div>
              </div>
              <div className="cta-band__art"><SceneGlobe /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
