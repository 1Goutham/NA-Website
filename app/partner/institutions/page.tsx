import type { Metadata } from "next";
import type React from "react";
import Split from "@/components/Split";
import QuoteCarousel from "@/components/ui/QuoteCarousel";
import SceneCtaInstitutions from "@/components/scenes/SceneCtaInstitutions";
import SceneNetwork from "@/components/scenes/SceneNetwork";

export const metadata: Metadata = {
  title: "Partner with us — Institutions",
  description: "Nunnari Academy bridges the gap between academic knowledge and industry expectations through expert-led programmes, hands-on experience, and meaningful industry collaborations.",
  alternates: { canonical: "/partner/institutions" },
};

export default function InstitutionsPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="pi-title">
        <div className="deco" aria-hidden="true"><span className="orb orb--a" /></div>
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">01</span>
              {" "}Partner with us
            </span>
            <Split as="h1" className="h1" id="pi-title">
              Are your students ready{" "}
              <span className="accent">for the industry,</span>
              {" "}or just the classroom?
            </Split>
            <p className="lead" data-reveal style={{"--d": ".3s"} as React.CSSProperties}>
              At Nunnari Academy, we bridge the gap between academic knowledge and industry expectations through expert-led programmes, hands-on experience, and meaningful industry collaborations.
            </p>
            <div data-reveal style={{"--d": ".4s"} as React.CSSProperties}>
              <button className="btn btn--primary btn--lg" type="button" data-enquire="Become a Partner (Institution)" data-magnetic>
                Become a Partner{" "}
                <svg className="i i--arrow"><use href="#i-arrow" /></svg>
              </button>
            </div>
            <div className="hero-perks" data-reveal style={{"--d": ".5s"} as React.CSSProperties}>
              <div className="perk">
                <span className="icon-chip"><svg className="i"><use href="#i-cap" /></svg></span>
                Industry-aligned learning
              </div>
              <div className="perk">
                <span className="icon-chip"><svg className="i"><use href="#i-users" /></svg></span>
                Expert-led programmes
              </div>
              <div className="perk">
                <span className="icon-chip"><svg className="i"><use href="#i-file" /></svg></span>
                Real-world opportunities
              </div>
            </div>
          </div>
          <div className="page-hero__art"><SceneNetwork /></div>
        </div>
      </section>
      <section className="section" aria-labelledby="net-title">
        <div className="container">
          <div className="two-col" style={{"marginBottom": "40px", "alignItems": "end"} as React.CSSProperties}>
            <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
              <span className="eyebrow" data-reveal>
                <span className="eyebrow__num">02</span>
                {" "}Our institutional network
              </span>
              <Split as="h2" className="h2" id="net-title">
                Bridging Our Industry Expertise with{" "}
                <span className="accent">Leading Institutions.</span>
              </Split>
              <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
                We bring industry knowledge and institutional learning together to create meaningful, real-world AI learning experiences.
              </p>
            </div>
            <div className="netmap art" aria-hidden="true" data-reveal="scale">
              <svg viewBox="0 0 420 220">
                <defs>
                  <pattern id="ndots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="1.5" fill="#c7b8ff" /></pattern>
                  <radialGradient id="nfade">
                    <stop offset=".55" stopColor="#fff" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </radialGradient>
                  <mask id="nmask"><ellipse cx="210" cy="110" rx="200" ry="104" fill="url(#nfade)" /></mask>
                </defs>
                <rect width="420" height="220" fill="url(#ndots)" mask="url(#nmask)" />
                <g className="ln-soft dash">
                  <path d="M110 70 Q 210 20 300 80" />
                  <path d="M300 80 Q 300 160 190 170" />
                  <path d="M190 170 Q 100 150 110 70" />
                </g>
                <g className="fill-p">
                  <circle cx="110" cy="70" r="5" />
                  <circle cx="300" cy="80" r="5" />
                  <circle cx="190" cy="170" r="5" />
                  <circle cx="240" cy="40" r="4" />
                  <circle cx="340" cy="150" r="4" />
                  <circle cx="70" cy="150" r="4" />
                </g>
                <g fill="none" stroke="#8b6cff">
                  <circle className="pulse" cx="110" cy="70" r="5" />
                  <circle className="pulse" cx="300" cy="80" r="5" style={{"--d": ".8s"} as React.CSSProperties} />
                  <circle className="pulse" cx="190" cy="170" r="5" style={{"--d": "1.6s"} as React.CSSProperties} />
                </g>
              </svg>
              <span className="float-chip" style={{"left": "18%", "top": "2%", "--d": "0s"} as React.CSSProperties}>
                <svg className="i"><use href="#i-uni" /></svg>
                Colleges
              </span>
              <span className="float-chip" style={{"left": "2%", "bottom": "6%", "--d": "-2s"} as React.CSSProperties}>
                <svg className="i"><use href="#i-bulb" /></svg>
                Research Institutions
              </span>
              <span className="float-chip" style={{"right": "0", "top": "42%", "--d": "-4s"} as React.CSSProperties}>
                <svg className="i"><use href="#i-handshake" /></svg>
                Academic Partners
              </span>
            </div>
          </div>
          <div className="logo-grid">
            <div className="card card--hover logo-card" data-reveal style={{"--d": "0s"} as React.CSSProperties}>
              <span className="mono">PSG</span>
              <span>
                PSG College
                <br />
                of Technology
              </span>
            </div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".04s"} as React.CSSProperties}>
              <span className="mono">CIT</span>
              <span>
                Coimbatore Institute
                <br />
                of Technology
              </span>
            </div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".08s"} as React.CSSProperties}>
              <span className="mono">KCT</span>
              <span>
                Kumaraguru
                <br />
                College of Technology
              </span>
            </div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".12s"} as React.CSSProperties}>
              <span className="mono">NGP</span>
              <span>
                Dr. N.G.P.
                <br />
                Arts and Science College
              </span>
            </div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".16s"} as React.CSSProperties}>
              <span className="mono">SRC</span>
              <span>
                Sri Ramakrishna
                <br />
                College of Arts and Science
              </span>
            </div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
              <span className="mono">KPR</span>
              <span>
                KPR Institute of
                <br />
                Engineering and Technology
              </span>
            </div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".24s"} as React.CSSProperties}>
              <span className="mono">SONA</span>
              <span>
                Sona College
                <br />
                of Technology
              </span>
            </div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".28s"} as React.CSSProperties}>
              <span className="mono">AU</span>
              <span>Avinashilingam Institute for Home Science and Higher Education for Women</span>
            </div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".32s"} as React.CSSProperties}>
              <span className="mono">KG</span>
              <span>
                KG College
                <br />
                of Arts and Science
              </span>
            </div>
            <div className="card card--hover logo-card logo-card--more" data-reveal style={{"--d": ".36s"} as React.CSSProperties}>
              <span className="mono"><svg className="i"><use href="#i-plus" /></svg></span>
              <span style={{"color": "var(--primary)", "fontWeight": "500"} as React.CSSProperties}>
                and more
                <br />
                partner institutions
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--surface" aria-labelledby="ci-title">
        <div className="container">
          <div className="two-col" style={{"alignItems": "start"} as React.CSSProperties}>
            <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
              <span className="eyebrow" data-reveal>
                <span className="eyebrow__num">03</span>
                {" "}Our collective impact
              </span>
              <Split as="h2" className="h2" id="ci-title">
                Partnerships That Translate Into{" "}
                <span className="accent">Progress.</span>
              </Split>
              <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
                Explore the measurable impact of our collaborations across institutions, learners, industry training, and career opportunities.
              </p>
            </div>
            <div className="stat-tiles">
              <div className="card card--hover stat-tile" data-reveal>
                <span className="icon-chip"><svg className="i"><use href="#i-users" /></svg></span>
                <div>
                  <strong data-count="10000" data-suffix="+">10,000+</strong>
                  <span>Students impacted</span>
                </div>
              </div>
              <div className="card card--hover stat-tile" data-reveal style={{"--d": ".08s"} as React.CSSProperties}>
                <span className="icon-chip"><svg className="i"><use href="#i-building" /></svg></span>
                <div>
                  <strong data-count="85" data-suffix="+">85+</strong>
                  <span>Institutions engaged</span>
                </div>
              </div>
              <div className="card card--hover stat-tile" data-reveal style={{"--d": ".16s"} as React.CSSProperties}>
                <span className="icon-chip"><svg className="i"><use href="#i-briefcase" /></svg></span>
                <div>
                  <strong data-count="200" data-suffix="+">200+</strong>
                  <span>
                    Industry experts{" "}
                    &amp;
                    {" "}sessions
                  </span>
                </div>
              </div>
              <div className="card card--hover stat-tile" data-reveal style={{"--d": ".24s"} as React.CSSProperties}>
                <span className="icon-chip"><svg className="i"><use href="#i-chart" /></svg></span>
                <div>
                  <strong data-count="500" data-suffix="+">500+</strong>
                  <span>
                    Projects, internships{" "}
                    &amp;
                    {" "}opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="charts">
            <div className="card chart-card" data-reveal>
              <h3>Activities per year</h3>
              <p>Each activity counts once, in the year of its event date.</p>
              <div className="vbars" data-inview>
                <div className="vbars__y">
                  <span>0</span>
                  <span>20</span>
                  <span>40</span>
                  <span>60</span>
                  <span>80</span>
                  <span>100</span>
                  <span>120</span>
                </div>
                <div className="vbars__plot">
                  <div className="vbar" style={{"--h": "1.7%", "--k": "0"} as React.CSSProperties}>
                    <i />
                    <b>2</b>
                    <em>2016</em>
                  </div>
                  <div className="vbar" style={{"--h": "2.5%", "--k": "1"} as React.CSSProperties}>
                    <i />
                    <b>3</b>
                    <em>2017</em>
                  </div>
                  <div className="vbar" style={{"--h": "2.5%", "--k": "2"} as React.CSSProperties}>
                    <i />
                    <b>3</b>
                    <em>2018</em>
                  </div>
                  <div className="vbar" style={{"--h": "10.8%", "--k": "3"} as React.CSSProperties}>
                    <i />
                    <b>13</b>
                    <em>2019</em>
                  </div>
                  <div className="vbar" style={{"--h": "30.0%", "--k": "4"} as React.CSSProperties}>
                    <i />
                    <b>36</b>
                    <em>2020</em>
                  </div>
                  <div className="vbar" style={{"--h": "39.2%", "--k": "5"} as React.CSSProperties}>
                    <i />
                    <b>47</b>
                    <em>2021</em>
                  </div>
                  <div className="vbar" style={{"--h": "37.5%", "--k": "6"} as React.CSSProperties}>
                    <i />
                    <b>45</b>
                    <em>2022</em>
                  </div>
                  <div className="vbar" style={{"--h": "37.5%", "--k": "7"} as React.CSSProperties}>
                    <i />
                    <b>45</b>
                    <em>2023</em>
                  </div>
                  <div className="vbar" style={{"--h": "58.3%", "--k": "8"} as React.CSSProperties}>
                    <i />
                    <b>70</b>
                    <em>2024</em>
                  </div>
                  <div className="vbar" style={{"--h": "40.8%", "--k": "9"} as React.CSSProperties}>
                    <i />
                    <b>49</b>
                    <em>2025</em>
                  </div>
                  <div className="vbar" style={{"--h": "99.2%", "--k": "10"} as React.CSSProperties}>
                    <i />
                    <b>119</b>
                    <em>2026</em>
                  </div>
                </div>
              </div>
            </div>
            <div className="card chart-card" data-reveal style={{"--d": ".1s"} as React.CSSProperties} data-inview>
              <h3>How far each activity went</h3>
              <p>
                The furthest stage that the emails prove. Invited or proposal does not mean the event did not happen.
              </p>
              <div className="funnel" role="img" aria-label="Delivered 97, Confirmed 104, Invited 104, Enquiry 46, Proposal 94, Unclear 27, Declined 9">
                <i style={{"--v": "97", "--c": "#10b981", "--k": "0"} as React.CSSProperties} />
                <i style={{"--v": "104", "--c": "#3b82f6", "--k": "1"} as React.CSSProperties} />
                <i style={{"--v": "104", "--c": "#f97316", "--k": "2"} as React.CSSProperties} />
                <i style={{"--v": "46", "--c": "#f59e0b", "--k": "3"} as React.CSSProperties} />
                <i style={{"--v": "94", "--c": "#14b8a6", "--k": "4"} as React.CSSProperties} />
                <i style={{"--v": "27", "--c": "#94a3b8", "--k": "5"} as React.CSSProperties} />
                <i style={{"--v": "9", "--c": "#ef4444", "--k": "6"} as React.CSSProperties} />
              </div>
              <ul className="legend">
                <li style={{"--c": "#10b981"} as React.CSSProperties}>
                  Delivered
                  <b>97</b>
                  <small>20%</small>
                </li>
                <li style={{"--c": "#f59e0b"} as React.CSSProperties}>
                  Enquiry
                  <b>46</b>
                  <small>10%</small>
                </li>
                <li style={{"--c": "#3b82f6"} as React.CSSProperties}>
                  Confirmed
                  <b>104</b>
                  <small>22%</small>
                </li>
                <li style={{"--c": "#94a3b8"} as React.CSSProperties}>
                  Unclear
                  <b>27</b>
                  <small>6%</small>
                </li>
                <li style={{"--c": "#f97316"} as React.CSSProperties}>
                  Invited
                  <b>104</b>
                  <small>22%</small>
                </li>
                <li style={{"--c": "#ef4444"} as React.CSSProperties}>
                  Declined
                  <b>9</b>
                  <small>2%</small>
                </li>
                <li style={{"--c": "#14b8a6"} as React.CSSProperties}>
                  Proposal
                  <b>94</b>
                  <small>20%</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="pp-title">
        <div className="container">
          <QuoteCarousel label="Partner testimonials" head={<div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
                <span className="eyebrow" data-reveal>
                  <span className="eyebrow__num">04</span>
                  {" "}The partner perspective
                </span>
                <Split as="h2" className="h2" id="pp-title">
                  Trusted by Institutions.{" "}
                  <span className="accent">Valued by Educators.</span>
                </Split>
                <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
                  Discover what our academic partners say about working with Nunnari Academy—and how we're shaping more meaningful, industry-connected learning experiences together.
                </p>
              </div>}>
              <figure className="card quote-card">
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>
                  Nunnari Academy has brought real industry exposure to our students. The hands-on learning and expert sessions have added immense value to our curriculum.
                </blockquote>
                <figcaption className="person">
                  <span className="avatar" aria-hidden="true">RP</span>
                  <span>
                    <b>Dr. R. Prakash</b>
                    <span>
                      Professor{" "}
                      &amp;
                      {" "}Head, Department of CSE
                    </span>
                    <small>PSG College of Technology</small>
                  </span>
                </figcaption>
              </figure>
              <figure className="card quote-card">
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>
                  The collaboration with Nunnari Academy has enriched our students with practical AI skills and real-world projects. It's a partnership that truly bridges academia and industry.
                </blockquote>
                <figcaption className="person">
                  <span className="avatar" aria-hidden="true">MS</span>
                  <span>
                    <b>Dr. Meena S.</b>
                    <span>Dean – Academics</span>
                    <small>Kumaraguru College of Technology</small>
                  </span>
                </figcaption>
              </figure>
              <figure className="card quote-card">
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>
                  Nunnari Academy's industry-led programmes have created new opportunities for our students. Their commitment to practical learning and professional growth is commendable.
                </blockquote>
                <figcaption className="person">
                  <span className="avatar" aria-hidden="true">VR</span>
                  <span>
                    <b>Dr. V. Ramesh</b>
                    <span>Principal</span>
                    <small>KPR Institute of Engineering and Technology</small>
                  </span>
                </figcaption>
              </figure>
            </QuoteCarousel>
        </div>
      </section>
      <section className="section" style={{"paddingTop": "0"} as React.CSSProperties} aria-labelledby="next-title">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__grid">
              <div className="cta-band__copy">
                <span className="eyebrow" data-reveal>
                  <span className="eyebrow__num">05</span>
                  {" "}Let's build what's next
                </span>
                <Split as="h2" className="h2" id="next-title">
                  Is Your Institution Ready for the{" "}
                  <span className="accent">Next Leap in AI?</span>
                </Split>
                <p className="lead" data-reveal>
                  Let's turn that ambition into action. Partner with Nunnari Academy to bridge the industry gap, empower your students, and accelerate your institution's AI journey.
                </p>
                <div data-reveal>
                  <button className="btn btn--primary btn--lg" type="button" data-enquire="Accelerate Your Institution" data-magnetic>
                    Accelerate Your Institution{" "}
                    <svg className="i i--arrow"><use href="#i-arrow" /></svg>
                  </button>
                </div>
                <p className="note-pill" data-reveal>
                  <svg className="i"><use href="#i-clock" /></svg>
                  Our team will connect you within 24 – 48 hrs.
                </p>
              </div>
              <div className="cta-band__art"><SceneCtaInstitutions /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
