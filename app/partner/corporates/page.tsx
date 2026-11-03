import type { Metadata } from "next";
import type React from "react";
import Split from "@/components/Split";
import QuoteCarousel from "@/components/ui/QuoteCarousel";
import SceneCtaCorporates from "@/components/scenes/SceneCtaCorporates";
import SceneDashboard from "@/components/scenes/SceneDashboard";

export const metadata: Metadata = {
  title: "Partner with us — Corporates",
  description: "Upskill your workforce with practical, industry-ready AI training led by our experts. Custom programmes designed for real business impact.",
  alternates: { canonical: "/partner/corporates" },
};

export default function CorporatesPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="pc-title">
        <div className="deco" aria-hidden="true"><span className="orb orb--a" /></div>
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">01</span>
              {" "}Partner with us (Corporates)
            </span>
            <Split as="h1" className="h1" id="pc-title">
              Equip Your Teams for What’s Next with{" "}
              <span className="accent">AI.</span>
            </Split>
            <p className="lead" data-reveal style={{"--d": ".3s"} as React.CSSProperties}>
              Partner with Nunnari Academy to upskill your workforce with practical, industry-ready AI training led by our experts. Custom programmes designed for real business impact.
            </p>
            <div data-reveal style={{"--d": ".4s"} as React.CSSProperties}>
              <button className="btn btn--primary btn--lg" type="button" data-enquire="Partner With Us (Corporate training)" data-magnetic>
                Partner With Us{" "}
                <svg className="i i--arrow"><use href="#i-arrow" /></svg>
              </button>
            </div>
            <div className="hero-perks" data-reveal style={{"--d": ".5s"} as React.CSSProperties}>
              <div className="perk">
                <span className="icon-chip"><svg className="i"><use href="#i-users" /></svg></span>
                Expert-led training
              </div>
              <div className="perk">
                <span className="icon-chip"><svg className="i"><use href="#i-cap" /></svg></span>
                Customised programmes
              </div>
              <div className="perk">
                <span className="icon-chip"><svg className="i"><use href="#i-trend" /></svg></span>
                Measurable business impact
              </div>
            </div>
          </div>
          <div className="page-hero__art"><SceneDashboard /></div>
        </div>
      </section>
      <section className="section" aria-labelledby="tr-title">
        <div className="container two-col">
          <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">02</span>
              {" "}Our corporate training
            </span>
            <Split as="h2" className="h2" id="tr-title">
              Practical AI Training for{" "}
              <span className="accent">Real-World Impact.</span>
            </Split>
            <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
              Our AI experts work with organisations to design and deliver custom training programmes that help teams adapt, apply, and innovate with AI in their day-to-day work.
            </p>
          </div>
          <div className="tile-grid">
            <div className="card card--hover spot tile" data-reveal>
              <span className="icon-chip"><svg className="i"><use href="#i-book" /></svg></span>
              <b>Custom Learning Paths</b>
            </div>
            <div className="card card--hover spot tile" data-reveal style={{"--d": ".08s"} as React.CSSProperties}>
              <span className="icon-chip"><svg className="i"><use href="#i-users" /></svg></span>
              <b>Experienced AI Practitioners</b>
            </div>
            <div className="card card--hover spot tile" data-reveal style={{"--d": ".16s"} as React.CSSProperties}>
              <span className="icon-chip"><svg className="i"><use href="#i-wrench" /></svg></span>
              <b>Hands-on Workshops</b>
            </div>
            <div className="card card--hover spot tile" data-reveal style={{"--d": ".24s"} as React.CSSProperties}>
              <span className="icon-chip"><svg className="i"><use href="#i-building" /></svg></span>
              <b>Real Business Use Cases</b>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--surface" aria-labelledby="tb-title">
        <div className="container two-col">
          <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
            <span className="eyebrow" data-reveal>
              <span className="eyebrow__num">03</span>
              {" "}Trusted by leading organisations
            </span>
            <Split as="h2" className="h2" id="tb-title">
              Partners in Building{" "}
              <span className="accent">AI-Ready Teams.</span>
            </Split>
            <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
              We’ve worked with forward-thinking companies across industries to upskill their teams and drive real impact.
            </p>
          </div>
          <div className="logo-grid logo-grid--3">
            <div className="card card--hover logo-card" data-reveal><span className="wm">ZOHO</span></div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".05s"} as React.CSSProperties}><span className="wm">TATA</span></div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".1s"} as React.CSSProperties}><span className="wm">Infosys</span></div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".15s"} as React.CSSProperties}><span className="wm">HCL</span></div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".2s"} as React.CSSProperties}><span className="wm">accenture</span></div>
            <div className="card card--hover logo-card" data-reveal style={{"--d": ".25s"} as React.CSSProperties}><span className="wm">wipro</span></div>
            
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="im-title">
        <div className="container">
          <div className="two-col" style={{"alignItems": "start"} as React.CSSProperties}>
            <div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
              <span className="eyebrow" data-reveal>
                <span className="eyebrow__num">04</span>
                {" "}Our impact
              </span>
              <Split as="h2" className="h2" id="im-title">
                Training That Drives{" "}
                <span className="accent">Real Results.</span>
              </Split>
              <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
                From skill development to business outcomes, here’s the impact we’ve created through our corporate training programmes.
              </p>
            </div>
            <div className="stat-tiles">
              <div className="card card--hover stat-tile" data-reveal>
                <span className="icon-chip"><svg className="i"><use href="#i-users" /></svg></span>
                <div>
                  <strong data-count="5000" data-suffix="+">5,000+</strong>
                  <span>Professionals trained</span>
                </div>
              </div>
              <div className="card card--hover stat-tile" data-reveal style={{"--d": ".08s"} as React.CSSProperties}>
                <span className="icon-chip"><svg className="i"><use href="#i-building" /></svg></span>
                <div>
                  <strong data-count="100" data-suffix="+">100+</strong>
                  <span>Organisations partnered</span>
                </div>
              </div>
              <div className="card card--hover stat-tile" data-reveal style={{"--d": ".16s"} as React.CSSProperties}>
                <span className="icon-chip"><svg className="i"><use href="#i-chart" /></svg></span>
                <div>
                  <strong data-count="200" data-suffix="+">200+</strong>
                  <span>Training sessions delivered</span>
                </div>
              </div>
              <div className="card card--hover stat-tile" data-reveal style={{"--d": ".24s"} as React.CSSProperties}>
                <span className="icon-chip"><svg className="i"><use href="#i-star" /></svg></span>
                <div>
                  <strong data-count="95" data-suffix="%">95%</strong>
                  <span>Participant satisfaction rate</span>
                </div>
              </div>
            </div>
          </div>
          <div className="charts charts--even">
            <div className="card chart-card" data-reveal data-inview>
              <h3>Training programmes by domain</h3>
              <p>Distribution of corporate training sessions across key AI domains.</p>
              <div className="hbars">
                <div className="hbar">
                  <span>
                    Generative AI{" "}
                    &amp;
                    {" "}LLMs
                  </span>
                  <span className="hbar__track"><i style={{"--w": "100%", "--k": "0"} as React.CSSProperties} /></span>
                  <b>38</b>
                </div>
                <div className="hbar">
                  <span>AI for Productivity</span>
                  <span className="hbar__track"><i style={{"--w": "84.2%", "--k": "1", "--o": ".92"} as React.CSSProperties} /></span>
                  <b>32</b>
                </div>
                <div className="hbar">
                  <span>
                    Data Analytics{" "}
                    &amp;
                    {" "}ML
                  </span>
                  <span className="hbar__track"><i style={{"--w": "73.7%", "--k": "2", "--o": ".84"} as React.CSSProperties} /></span>
                  <b>28</b>
                </div>
                <div className="hbar">
                  <span>Prompt Engineering</span>
                  <span className="hbar__track"><i style={{"--w": "63.2%", "--k": "3", "--o": ".72"} as React.CSSProperties} /></span>
                  <b>24</b>
                </div>
                <div className="hbar">
                  <span>AI for Business</span>
                  <span className="hbar__track"><i style={{"--w": "57.9%", "--k": "4", "--o": ".62"} as React.CSSProperties} /></span>
                  <b>22</b>
                </div>
                <div className="hbar">
                  <span>Custom Enterprise Training</span>
                  <span className="hbar__track"><i style={{"--w": "47.4%", "--k": "5", "--o": ".5"} as React.CSSProperties} /></span>
                  <b>18</b>
                </div>
                <div className="hbar">
                  <span>Others</span>
                  <span className="hbar__track"><i style={{"--w": "31.6%", "--k": "6", "--o": ".38"} as React.CSSProperties} /></span>
                  <b>12</b>
                </div>
              </div>
            </div>
            <div className="card chart-card" data-reveal style={{"--d": ".1s"} as React.CSSProperties}>
              <h3>Growth in corporate training</h3>
              <p>Year-wise number of training sessions conducted.</p>
              <div className="vbars" data-inview>
                <div className="vbars__y">
                  <span>0</span>
                  <span>20</span>
                  <span>40</span>
                  <span>60</span>
                  <span>80</span>
                  <span>100</span>
                </div>
                <div className="vbars__plot">
                  <div className="vbar" style={{"--h": "17.0%", "--k": "0"} as React.CSSProperties}>
                    <i />
                    <b>17</b>
                    <em>2021</em>
                  </div>
                  <div className="vbar" style={{"--h": "32.0%", "--k": "1"} as React.CSSProperties}>
                    <i />
                    <b>32</b>
                    <em>2022</em>
                  </div>
                  <div className="vbar" style={{"--h": "48.0%", "--k": "2"} as React.CSSProperties}>
                    <i />
                    <b>48</b>
                    <em>2023</em>
                  </div>
                  <div className="vbar" style={{"--h": "61.0%", "--k": "3"} as React.CSSProperties}>
                    <i />
                    <b>61</b>
                    <em>2024</em>
                  </div>
                  <div className="vbar" style={{"--h": "79.0%", "--k": "4"} as React.CSSProperties}>
                    <i />
                    <b>79</b>
                    <em>2025</em>
                  </div>
                  <div className="vbar" style={{"--h": "97.0%", "--k": "5"} as React.CSSProperties}>
                    <i />
                    <b>97</b>
                    <em>2026</em>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--surface" aria-labelledby="cp-title">
        <div className="container">
          <QuoteCarousel label="Partner testimonials" head={<div style={{"display": "grid", "gap": "18px"} as React.CSSProperties}>
                <span className="eyebrow" data-reveal>
                  <span className="eyebrow__num">05</span>
                  {" "}The partner perspective
                </span>
                <Split as="h2" className="h2" id="cp-title">
                  What Our Corporate{" "}
                  <span className="accent">Partners Say.</span>
                </Split>
                <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
                  Hear from our partners about how Nunnari Academy has helped their teams build real AI skills and create meaningful impact.
                </p>
              </div>}>
              <figure className="card quote-card">
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>
                  The training was practical, engaging, and directly applicable to our work. Our teams now feel more confident using AI in their day-to-day projects.
                </blockquote>
                <figcaption className="person">
                  <span className="avatar" aria-hidden="true">AK</span>
                  <span>
                    <b>Arjun Kumar</b>
                    <span>Engineering Manager</span>
                    <small>Zoho</small>
                  </span>
                </figcaption>
              </figure>
              <figure className="card quote-card">
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>
                  Nunnari Academy’s customised training programme helped our teams quickly adopt AI tools and improve productivity across functions.
                </blockquote>
                <figcaption className="person">
                  <span className="avatar" aria-hidden="true">PS</span>
                  <span>
                    <b>Priya Sharma</b>
                    <span>
                      Head of Learning{" "}
                      &amp;
                      {" "}Development
                    </span>
                    <small>Tata Consultancy Services</small>
                  </span>
                </figcaption>
              </figure>
              <figure className="card quote-card">
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>
                  The hands-on approach and real-world use cases made the training highly effective. It’s one of the best corporate training programmes we’ve done.
                </blockquote>
                <figcaption className="person">
                  <span className="avatar" aria-hidden="true">RM</span>
                  <span>
                    <b>Rahul Menon</b>
                    <span>Senior Director</span>
                    <small>Infosys</small>
                  </span>
                </figcaption>
              </figure>
            </QuoteCarousel>
        </div>
      </section>
      <section className="section" aria-labelledby="up-title">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__grid">
              <div className="cta-band__copy">
                <span className="eyebrow" data-reveal>
                  <span className="eyebrow__num">06</span>
                  {" "}Let's build what's next
                </span>
                <Split as="h2" className="h2" id="up-title">
                  Ready to Upskill{" "}
                  <span className="accent">Your Team with AI?</span>
                </Split>
                <p className="lead" data-reveal>
                  Let’s create a custom training programme tailored to your goals. Our team will understand your needs and get back to you within 24 – 48 hrs.
                </p>
                <div data-reveal>
                  <button className="btn btn--primary btn--lg" type="button" data-enquire="Partner With Us (Corporate training)" data-magnetic>
                    Partner With Us{" "}
                    <svg className="i i--arrow"><use href="#i-arrow" /></svg>
                  </button>
                </div>
                <p className="note-pill" data-reveal>
                  <svg className="i"><use href="#i-clock" /></svg>
                  Our team will connect you within 24 – 48 hrs.
                </p>
              </div>
              <div className="cta-band__art"><SceneCtaCorporates /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
