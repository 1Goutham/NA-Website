import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import Split from "@/components/Split";
import Faq from "@/components/ui/Faq";
import SceneCode from "@/components/scenes/SceneCode";
import SceneRegular from "@/components/scenes/SceneRegular";
import SceneRoles from "@/components/scenes/SceneRoles";
import SceneStairs from "@/components/scenes/SceneStairs";

export const metadata: Metadata = {
  title: "Regular Programme — 12-week AI & ML Foundation",
  description: "A 12-week hands-on programme designed for beginners, college students, and early learners to build real skills in AI & ML and work on practical projects.",
  alternates: { canonical: "/programs/regular" },
};

const faqCats = [
  { key: "program", label: "Program" },
  { key: "eligibility", label: "Eligibility" },
  { key: "curriculum", label: "Curriculum" },
  { key: "schedule", label: "Classes & Schedule" },
];
const faq = [
  { q: "Who should join the Regular Programme?", cats: ["program", "eligibility"], a: "The programme is designed for beginners, college students, early learners and early professionals who want to build real skills in AI & ML and work on practical projects." },
  { q: "Is this programme suitable for complete beginners?", cats: ["program", "eligibility"], a: "Yes. The Regular Programme is built for beginners (L1 & L2) and starts by building a strong foundation in AI & ML before moving on to hands-on projects." },
  { q: "What is the total duration of the programme?", cats: ["program", "schedule"], a: "12 weeks of guided, hands-on learning with live sessions, projects and mentorship." },
  { q: "Will this be online, offline, or hybrid?", cats: ["program", "schedule"], a: <>The programme is available Online and Offline. <button className="link-arrow" type="button" data-enquire="Regular Programme — format">Talk to our team</button> to find the option that suits you.</> },
  { q: "Which tools will I work with?", cats: ["curriculum"], a: "Python, Pandas, NumPy, Scikit-learn, Matplotlib, Jupyter, VS Code and Git & GitHub." },
  { q: "What will I have built by the end?", cats: ["curriculum"], a: "Real-world projects and a portfolio — the programme takes you from fundamentals to building real, portfolio-ready projects." },
];

export default function RegularPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="rp-title">
        <div className="deco" aria-hidden="true"><span className="orb orb--a" /></div>
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <nav className="crumbs" aria-label="Breadcrumb" data-reveal>
              <Link href="/programs">Programmes</Link>
              <svg className="i"><use href="#i-chevron-r" /></svg>
              <span aria-current="page">Regular Programme</span>
            </nav>
            <span className="badge" data-reveal>Regular Programme · 02</span>
            <Split as="h1" className="h1" id="rp-title">
              Build a strong foundation in{" "}
              <span className="accent">
                AI{" "}
                &amp;
                {" "}ML.
              </span>
            </Split>
            <p className="lead" data-reveal style={{"--d": ".3s"} as React.CSSProperties}>
              A 12-week hands-on programme designed for beginners, college students, and early learners to build real skills and work on practical projects.
            </p>
            <div className="chips-row" data-reveal style={{"--d": ".4s"} as React.CSSProperties}>
              <div className="mini-fact">
                <svg className="i"><use href="#i-calendar" /></svg>
                <div>
                  <b>12 Weeks</b>
                  <span>Online / Offline</span>
                </div>
              </div>
              <div className="mini-fact">
                <svg className="i"><use href="#i-user" /></svg>
                <div>
                  <b>Beginners</b>
                  <span>
                    L1{" "}
                    &amp;
                    {" "}L2
                  </span>
                </div>
              </div>
              <div className="mini-fact">
                <svg className="i"><use href="#i-laptop" /></svg>
                <div>
                  <b>Live + Hands-on</b>
                  <span>
                    Projects{" "}
                    &amp;
                    {" "}Mentorship
                  </span>
                </div>
              </div>
            </div>
            <div className="cta-actions" data-reveal style={{"--d": ".5s"} as React.CSSProperties}>
              <button className="btn btn--primary btn--lg" type="button" data-enquire="Enroll: Regular Programme (AI & ML)" data-magnetic>
                Enroll Now{" "}
                <svg className="i i--arrow"><use href="#i-arrow" /></svg>
              </button>
              <a className="btn btn--ghost btn--lg" href="#tools">View Curriculum</a>
            </div>
          </div>
          <div className="page-hero__art"><SceneCode /></div>
        </div>
      </section>
      <section className="section" aria-labelledby="growth-title">
        <div className="container two-col">
          <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">02</span>
              {" "}Growth{" "}
              &amp;
              {" "}Opportunities
            </span>
            <Split as="h2" className="h2" id="growth-title">
              Skills Today for{" "}
              <span className="accent">Tomorrow.</span>
            </Split>
            <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
              Gain in-demand skills, build a portfolio, and get guidance to kickstart your journey in AI{" "}
              &amp;
              {" "}ML.
            </p>
          </div>
          <div className="roles-wrap" data-reveal="scale"><SceneRoles /></div>
        </div>
      </section>
      <section className="section section--surface" aria-labelledby="join-title">
        <div className="container two-col">
          <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">03</span>
              {" "}This course is designed for
            </span>
            <Split as="h2" className="h2" id="join-title">
              Who Can{" "}
              <span className="accent">Join?</span>
            </Split>
            <div className="tile-grid" style={{"marginTop": "12px"} as React.CSSProperties}>
              <div className="card card--hover spot" style={{"padding": "24px", "display": "grid", "gap": "12px"} as React.CSSProperties} data-reveal>
                <span className="icon-chip"><svg className="i"><use href="#i-cap" /></svg></span>
                <b style={{"color": "var(--text)", "fontSize": "1.05rem"} as React.CSSProperties}>College Students</b>
                <p className="small">Build core skills, work on real projects, and get industry-ready.</p>
              </div>
              <div className="card card--hover spot" style={{"padding": "24px", "display": "grid", "gap": "12px", "--d": ".1s"} as React.CSSProperties} data-reveal>
                <span className="icon-chip"><svg className="i"><use href="#i-briefcase" /></svg></span>
                <b style={{"color": "var(--text)", "fontSize": "1.05rem"} as React.CSSProperties}>Early Professionals</b>
                <p className="small">Upgrade your skills and transition into AI/ML roles.</p>
              </div>
            </div>
          </div>
          <div data-reveal="scale"><SceneStairs /></div>
        </div>
      </section>
      <section className="section" id="tools" aria-labelledby="tools-title">
        <div className="container two-col">
          <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">04</span>
              {" "}Tools you’ll work with
            </span>
            <Split as="h2" className="h2" id="tools-title">
              Master industry{" "}
              <span className="accent">standard tools.</span>
            </Split>
            <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
              Get hands-on experience with the most widely used tools and technologies in AI{" "}
              &amp;
              {" "}ML.
            </p>
          </div>
          <ul className="tools" role="list">
            <li className="card card--hover tool" data-reveal style={{"--d": "0s"} as React.CSSProperties}>
              <span className="tool__mono">Py</span>
              Python
            </li>
            <li className="card card--hover tool" data-reveal style={{"--d": ".05s"} as React.CSSProperties}>
              <span className="tool__mono">Pd</span>
              Pandas
            </li>
            <li className="card card--hover tool" data-reveal style={{"--d": ".1s"} as React.CSSProperties}>
              <span className="tool__mono">Np</span>
              NumPy
            </li>
            <li className="card card--hover tool" data-reveal style={{"--d": ".15s"} as React.CSSProperties}>
              <span className="tool__mono">Sk</span>
              Scikit-learn
            </li>
            <li className="card card--hover tool" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
              <span className="tool__mono">Mp</span>
              Matplotlib
            </li>
            <li className="card card--hover tool" data-reveal style={{"--d": ".25s"} as React.CSSProperties}>
              <span className="tool__mono">Jp</span>
              Jupyter
            </li>
            <li className="card card--hover tool" data-reveal style={{"--d": ".3s"} as React.CSSProperties}>
              <span className="tool__mono">VS</span>
              VS Code
            </li>
            <li className="card card--hover tool" data-reveal style={{"--d": ".35s"} as React.CSSProperties}>
              <span className="tool__mono">Git</span>
              Git{" "}
              &amp;
              {" "}GitHub
            </li>
          </ul>
        </div>
      </section>
      <section className="section section--surface" aria-labelledby="out-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">05</span>
              {" "}Learning outcomes
            </span>
            <Split as="h2" className="h2" id="out-title">
              From Learning to{" "}
              <span className="accent">Real Impact.</span>
            </Split>
            <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
              A structured journey that takes you from fundamentals to building real, portfolio-ready projects.
            </p>
          </div>
          <ol className="journey" role="list" data-inview>
            <li className="card card--hover journey__step" style={{"--k": "0"} as React.CSSProperties}>
              <span className="icon-chip"><svg className="i"><use href="#i-book" /></svg></span>
              <b>Learn</b>
              <p>
                Build a strong foundation in AI{" "}
                &amp;
                {" "}ML.
              </p>
            </li>
            <li className="card card--hover journey__step" style={{"--k": "1"} as React.CSSProperties}>
              <span className="icon-chip"><svg className="i"><use href="#i-code" /></svg></span>
              <b>Practice</b>
              <p>Apply concepts through hands-on exercises.</p>
            </li>
            <li className="card card--hover journey__step" style={{"--k": "2"} as React.CSSProperties}>
              <span className="icon-chip"><svg className="i"><use href="#i-layers" /></svg></span>
              <b>Build</b>
              <p>Create real-world projects and a portfolio.</p>
            </li>
            <li className="card card--hover journey__step" style={{"--k": "3"} as React.CSSProperties}>
              <span className="icon-chip"><svg className="i"><use href="#i-rocket" /></svg></span>
              <b>Impact</b>
              <p>Gain industry readiness and career opportunities.</p>
            </li>
          </ol>
        </div>
      </section>
      <section className="section" aria-labelledby="start-title">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__grid">
              <div className="cta-band__copy">
                <Split as="h2" className="h2" id="start-title">
                  Start Your AI{" "}
                  &amp;
                  {" "}ML{" "}
                  <span className="accent">Journey Today.</span>
                </Split>
                <p className="lead" data-reveal>Join the 12-week Regular Programme and build real skills for real opportunities.</p>
                <div data-reveal>
                  <button className="btn btn--primary btn--lg" type="button" data-enquire="Enroll: Regular Programme (AI & ML)" data-magnetic>
                    Enroll Now{" "}
                    <svg className="i i--arrow"><use href="#i-arrow" /></svg>
                  </button>
                </div>
              </div>
              <div className="cta-band__art"><SceneRegular /></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{"paddingTop": "0"} as React.CSSProperties} aria-labelledby="faq-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>Frequently asked questions</span>
            <Split as="h2" className="h2" id="faq-title">
              Got Questions? We’ve Got{" "}
              <span className="accent">Answers.</span>
            </Split>
          </div>
          <Faq cats={faqCats} items={faq} />
        </div>
      </section>
    </>
  );
}
