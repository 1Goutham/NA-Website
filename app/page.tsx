import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import Split from "@/components/Split";
import Marquee from "@/components/ui/Marquee";
import Constellation from "@/components/canvas/Constellation";
import WhoWeAre from "@/components/sections/WhoWeAre";
import ProgramsCatalog from "@/components/sections/ProgramsCatalog";
import HomeEvents from "@/components/events/HomeEvents";

export const metadata: Metadata = {
  title: { absolute: "Nunnari Academy — Learn AI. Create What Doesn’t Exist Yet." },
  description: "Practical, hands-on AI programs for curious minds – in Tamil and English. Build real skills, create real projects, and be a part of the AI pioneer community that builds and grows together.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="hero" data-hero aria-labelledby="hero-title">
        <Constellation />
        <div className="deco" aria-hidden="true">
          <span className="orb orb--a" />
          <span className="orb orb--b" />
          <span className="orb orb--c" />
        </div>
        <div className="hero__glow" aria-hidden="true" />
        <div className="container hero__inner">
          <p className="hero__tag" data-reveal>
            NUNNARI ACADEMY{" "}
            <i>|</i>
            {" "}SCHOOL OF AI
          </p>
          <Split as="h1" className="display" id="hero-title">
            <span className="line">Learn AI.</span>
            <span className="line">
              <span className="accent">Create</span>
              {" "}What Doesn’t Exist Yet
              <span className="accent-dot">.</span>
            </span>
          </Split>
          <p className="lead" data-reveal style={{"--d": ".5s"} as React.CSSProperties}>
            Practical, hands-on AI programs for curious minds – in Tamil and English. Build real skills, create real projects, and be a part of the{" "}
            <strong>AI pioneer community</strong>
            {" "}that builds and grows together.
          </p>
          <div className="hero__actions" data-reveal style={{"--d": ".65s"} as React.CSSProperties}>
            <button className="btn btn--primary btn--caps" type="button" data-enquire="Talk to our experts" data-magnetic>
              <svg className="i"><use href="#i-message" /></svg>
              Talk to our experts{" "}
              <svg className="i i--arrow"><use href="#i-arrow" /></svg>
            </button>
            <a className="btn btn--ghost btn--caps" href="#programs">
              <svg className="i"><use href="#i-book" /></svg>
              Explore our programs
            </a>
          </div>
          <div className="hero__features" data-reveal style={{"--d": ".8s"} as React.CSSProperties}>
            <div className="feature">
              <span className="icon-chip"><svg className="i"><use href="#i-message" /></svg></span>
              <h3>Learn in Tamil</h3>
              <p>Clear explanations, examples, and guidance in Tamil, so you can truly understand and apply.</p>
            </div>
            <div className="feature">
              <span className="icon-chip"><svg className="i"><use href="#i-laptop" /></svg></span>
              <h3>Hands-on AI Program</h3>
              <p>
                Build real projects, work with modern tools, and gain practical skills through guided, hands-on learning.
              </p>
            </div>
            <div className="feature">
              <span className="icon-chip"><svg className="i"><use href="#i-cap" /></svg></span>
              <h3>1 Year of LMS Access</h3>
              <p>Get 1 year of access to our learning platform with all resources, updates, and new content.</p>
            </div>
            <div className="feature">
              <span className="icon-chip"><svg className="i"><use href="#i-users" /></svg></span>
              <h3>Global AI Community</h3>
              <p>
                Get access to our community where you meet like-minded learners, attend AI events, and discover global opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="who-we-are" aria-labelledby="who-title">
        <div className="container">
          <div className="who__head">
            <div style={{"display": "grid", "gap": "16px"} as React.CSSProperties}>
              <span className="eyebrow" data-reveal>Who we are</span>
              <Split as="h2" className="h2" id="who-title">
                More than an AI Academy,{" "}
                <span className="accent">A Higher Possibility.</span>
              </Split>
            </div>
            <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
              Nunnari Academy is a learning platform that makes AI education practical, accessible, and future-ready — for curious learners across India and beyond.
            </p>
          </div>
          <WhoWeAre />
        </div>
      </section>
      <section className="section section--surface" id="impact" aria-labelledby="impact-title">
        <div className="deco" aria-hidden="true">
          <span className="orb orb--a" style={{"opacity": ".35"} as React.CSSProperties} />
          <span className="orb orb--b" style={{"opacity": ".35"} as React.CSSProperties} />
        </div>
        <div className="container">
          <div className="impact">
            <div>
              <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
                <span className="eyebrow" data-reveal>Our impact</span>
                <Split as="h2" className="h2" id="impact-title">
                  Creating real opportunities through{" "}
                  <span className="accent">AI Programs.</span>
                </Split>
                <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
                  From classrooms to corporates, our programs continue to create real opportunities every year.
                </p>
              </div>
              <figure className="chart" data-inview>
                <svg viewBox="0 0 640 236" role="img" aria-labelledby="chart-cap">
                  <defs>
                    <linearGradient id="area-grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#8b6cff" stopOpacity=".28" />
                      <stop offset="1" stopColor="#8b6cff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g className="grid"><line x1="20" x2="620" y1="200" y2="200" /></g>
                  <path className="area" d="M40.0 162.9 C54.4 160.4 91.2 152.3 120.0 148.8 C148.8 145.3 171.2 145.6 200.0 143.5 C228.8 141.5 251.2 138.0 280.0 137.4 C308.8 136.7 331.2 144.0 360.0 140.0 C388.8 136.0 411.2 122.3 440.0 115.3 C468.8 108.3 491.2 111.0 520.0 101.2 C548.8 91.3 585.6 67.9 600.0 60.6 L600.0 200 L40.0 200Z" />
                  <path className="line" pathLength="1" d="M40.0 162.9 C54.4 160.4 91.2 152.3 120.0 148.8 C148.8 145.3 171.2 145.6 200.0 143.5 C228.8 141.5 251.2 138.0 280.0 137.4 C308.8 136.7 331.2 144.0 360.0 140.0 C388.8 136.0 411.2 122.3 440.0 115.3 C468.8 108.3 491.2 111.0 520.0 101.2 C548.8 91.3 585.6 67.9 600.0 60.6" />
                  <g className="axis">
                    <line className="drop" x1="40.0" y1="162.9" x2="40.0" y2="200" />
                    <circle className="pt" style={{"--k": "0"} as React.CSSProperties} cx="40.0" cy="162.9" r="4.5"><title>2019: 42</title></circle>
                    <text className="val" style={{"--k": "0"} as React.CSSProperties} x="40.0" y="148.9">42</text>
                    <text x="40.0" y="224" textAnchor="middle">2019</text>
                    <line className="drop" x1="120.0" y1="148.8" x2="120.0" y2="200" />
                    <circle className="pt" style={{"--k": "1"} as React.CSSProperties} cx="120.0" cy="148.8" r="4.5"><title>2020: 58</title></circle>
                    <text className="val" style={{"--k": "1"} as React.CSSProperties} x="120.0" y="134.8">58</text>
                    <text x="120.0" y="224" textAnchor="middle">2020</text>
                    <line className="drop" x1="200.0" y1="143.5" x2="200.0" y2="200" />
                    <circle className="pt" style={{"--k": "2"} as React.CSSProperties} cx="200.0" cy="143.5" r="4.5"><title>2021: 64</title></circle>
                    <text className="val" style={{"--k": "2"} as React.CSSProperties} x="200.0" y="129.5">64</text>
                    <text x="200.0" y="224" textAnchor="middle">2021</text>
                    <line className="drop" x1="280.0" y1="137.4" x2="280.0" y2="200" />
                    <circle className="pt" style={{"--k": "3"} as React.CSSProperties} cx="280.0" cy="137.4" r="4.5"><title>2022: 71</title></circle>
                    <text className="val" style={{"--k": "3"} as React.CSSProperties} x="280.0" y="123.4">71</text>
                    <text x="280.0" y="224" textAnchor="middle">2022</text>
                    <line className="drop" x1="360.0" y1="140.0" x2="360.0" y2="200" />
                    <circle className="pt" style={{"--k": "4"} as React.CSSProperties} cx="360.0" cy="140.0" r="4.5"><title>2023: 68</title></circle>
                    <text className="val" style={{"--k": "4"} as React.CSSProperties} x="360.0" y="126.0">68</text>
                    <text x="360.0" y="224" textAnchor="middle">2023</text>
                    <line className="drop" x1="440.0" y1="115.3" x2="440.0" y2="200" />
                    <circle className="pt" style={{"--k": "5"} as React.CSSProperties} cx="440.0" cy="115.3" r="4.5"><title>2024: 96</title></circle>
                    <text className="val" style={{"--k": "5"} as React.CSSProperties} x="440.0" y="101.3">96</text>
                    <text x="440.0" y="224" textAnchor="middle">2024</text>
                    <line className="drop" x1="520.0" y1="101.2" x2="520.0" y2="200" />
                    <circle className="pt" style={{"--k": "6"} as React.CSSProperties} cx="520.0" cy="101.2" r="4.5"><title>2025: 112</title></circle>
                    <text className="val" style={{"--k": "6"} as React.CSSProperties} x="520.0" y="87.2">112</text>
                    <text x="520.0" y="224" textAnchor="middle">2025</text>
                    <line className="drop" x1="600.0" y1="60.6" x2="600.0" y2="200" />
                    <circle className="pt pt--last" style={{"--k": "7"} as React.CSSProperties} cx="600.0" cy="60.6" r="6"><title>2026: 158</title></circle>
                    <text className="val val--last" style={{"--k": "7"} as React.CSSProperties} x="600.0" y="46.6">158</text>
                    <text x="600.0" y="224" textAnchor="middle">2026</text>
                  </g>
                </svg>
                <figcaption id="chart-cap">
                  Training{" "}
                  &amp;
                  {" "}speaking engagements per year
                </figcaption>
              </figure>
            </div>
            <div className="impact__stats" data-reveal="right">
              <div className="stat">
                <span className="icon-chip"><svg className="i"><use href="#i-users" /></svg></span>
                <strong data-count="10000" data-suffix="+">10,000+</strong>
                <span>Learners trained</span>
              </div>
              <div className="stat">
                <span className="icon-chip"><svg className="i"><use href="#i-uni" /></svg></span>
                <strong data-count="85" data-suffix="+">85+</strong>
                <span>
                  Universities{" "}
                  &amp;
                  {" "}colleges
                </span>
              </div>
              <div className="stat">
                <span className="icon-chip"><svg className="i"><use href="#i-briefcase" /></svg></span>
                <strong data-count="25" data-suffix="+">25+</strong>
                <span>
                  Corporate{" "}
                  &amp;
                  {" "}government organisations
                </span>
              </div>
            </div>
          </div>
          <div className="trust-strip" data-reveal>
            <p>Our learners work at</p>
            <Marquee duration={46}>
                <span className="wordmark">Google</span>
                <span className="wordmark">Microsoft</span>
                <span className="wordmark">amazon</span>
                <span className="wordmark">Infosys</span>
                <span className="wordmark">ZOHO</span>
                <span className="wordmark">TCS</span>
                <span className="wordmark">wipro</span>
                <span className="wordmark">accenture</span>
                <span className="wordmark">cognizant</span>
                <span className="wordmark">BOSCH</span>
                <span className="wordmark">HCL</span>
                <span className="wordmark">IBM</span>
                <span className="wordmark">EY</span>
                <span className="wordmark">KPMG</span>
                <span className="wordmark">Capgemini</span>
                <span className="wordmark">SIEMENS</span>
                <span className="wordmark">Deloitte.</span>
                <span className="wordmark">UST</span>
              </Marquee>
          </div>
        </div>
      </section>
      <section className="section" id="programs" aria-labelledby="programs-title">
        <div className="deco" aria-hidden="true">
          <svg className="deco-lines" viewBox="0 0 1440 1000" preserveAspectRatio="none">
            <path d="M0 120 C 300 260, 160 760, 520 980" />
            <path d="M1440 160 C 1200 120, 1080 300, 1240 520 S 1500 900, 1300 1000" />
          </svg>
          <span className="deco-dot" style={{"right": "7%", "top": "14%"} as React.CSSProperties} />
          <span className="deco-dot" style={{"left": "18%", "bottom": "6%", "animationDelay": "1.4s"} as React.CSSProperties} />
        </div>
        <div className="container">
          <div className="section-head section-head--split">
            <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
              <span className="eyebrow" data-reveal>Our programmes</span>
              <Split as="h2" className="h2" id="programs-title">
                Learn AI at Your Own{" "}
                <span className="accent">Pace and Path.</span>
              </Split>
            </div>
            <Link className="link-arrow" href="/programs" data-reveal>
              Explore All Programmes{" "}
              <svg className="i"><use href="#i-arrow-ur" /></svg>
            </Link>
          </div>
          <div data-reveal><ProgramsCatalog /></div>
        </div>
      </section>
      <section className="section section--surface" id="events" aria-labelledby="events-title">
        <div className="deco" aria-hidden="true"><span className="orb orb--b" style={{"opacity": ".3"} as React.CSSProperties} /></div>
        <div className="container">
          <div className="section-head section-head--split">
            <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
              <span className="eyebrow" data-reveal>Events at Nunnari</span>
              <Split as="h2" className="h2" id="events-title">
                Where opportunity{" "}
                <span className="accent">evolves.</span>
              </Split>
              <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
                Workshops, sessions and experiences that connect you with people, ideas and real-world opportunities.
              </p>
            </div>
            <Link className="link-arrow" href="/explore#events" data-reveal>
              View all events{" "}
              <svg className="i"><use href="#i-arrow-ur" /></svg>
            </Link>
          </div>
          <div data-reveal><HomeEvents /></div>
        </div>
      </section>
    </>
  );
}
