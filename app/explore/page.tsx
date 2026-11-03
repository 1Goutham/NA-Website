import type { Metadata } from "next";
import type React from "react";
import Split from "@/components/Split";
import EventArt from "@/components/events/EventArt";
import ExploreEvents from "@/components/events/ExploreEvents";
import JumpPills from "@/components/events/JumpPills";
import AddToCalendar from "@/components/events/AddToCalendar";
import Testimonials from "@/components/sections/Testimonials";
import SceneCalendar from "@/components/scenes/SceneCalendar";
import SceneGlobe from "@/components/scenes/SceneGlobe";
import { featuredEvent as featured, fmtDate } from "@/lib/events";

export const metadata: Metadata = {
  title: "Explore — Workshops, Events & Community",
  description: "Workshops, hackathons, community events and a growing AI community. See upcoming and past Nunnari Academy events, learner stories and how to join.",
  alternates: { canonical: "/explore" },
};

export default function ExplorePage() {
  return (
    <>
      <section className="page-hero" style={{"paddingBottom": "clamp(40px,6vw,64px)"} as React.CSSProperties} aria-labelledby="explore-title">
        <div className="deco" aria-hidden="true">
          <span className="orb orb--a" />
          <span className="orb orb--c" />
        </div>
        <div className="container" style={{"position": "relative", "zIndex": "1"} as React.CSSProperties}>
          <div className="section-head section-head--center" style={{"marginBottom": "32px"} as React.CSSProperties}>
            <span className="eyebrow eyebrow--center" data-reveal>Explore</span>
            <Split as="h1" className="h1" id="explore-title">
              Workshops, hackathons{" "}
              &amp;
              {" "}an{" "}
              <span className="accent">AI community</span>
              {" "}that builds together.
            </Split>
            <p className="lead" data-reveal style={{"--d": ".3s"} as React.CSSProperties}>
              Learn from industry experts, meet fellow learners and discover real-world opportunities — every week.
            </p>
          </div>
          <div data-reveal style={{ "--d": ".4s" } as React.CSSProperties}><JumpPills /></div>
          <article className="card featured" data-reveal="scale" data-date={featured.start} data-end={featured.end}>
            <div className="featured__copy">
              <span className="badge" data-featured-status data-past-label="Recent Workshop">Upcoming Workshop</span>
              <h2 className="h2" style={{"fontSize": "clamp(1.9rem,3.4vw,2.7rem)"} as React.CSSProperties}>
                Physical AI: World Models, VLA, and the{" "}
                <span className="accent">Future of Robotics</span>
              </h2>
              <p>{featured.desc}</p>
              <div className="chips-row">
                <div className="mini-fact">
                  <svg className="i"><use href="#i-calendar" /></svg>
                  <div>
                    <b>{fmtDate(featured.start)}</b>
                    <span>Saturday</span>
                  </div>
                </div>
                <div className="mini-fact">
                  <svg className="i"><use href="#i-clock" /></svg>
                  <div>
                    <b>07:00 – 09:00 PM</b>
                    <span>IST</span>
                  </div>
                </div>
                <div className="mini-fact">
                  <svg className="i"><use href="#i-monitor" /></svg>
                  <div>
                    <b>Online</b>
                    <span>Live Session</span>
                  </div>
                </div>
              </div>
              <div className="cta-actions">
                <button className="btn btn--primary btn--lg" type="button" data-register="" data-enquire={`Register: ${featured.title}`} data-magnetic>
                  <span data-register-label="">Register Now</span>{" "}
                  <svg className="i i--arrow"><use href="#i-arrow" /></svg>
                </button>
                <AddToCalendar title={featured.title} description={featured.desc} start={featured.start} end={featured.end} />
              </div>
            </div>
            <div className="featured__art event__art art" data-tilt><EventArt art={featured.art} /></div>
          </article>
        </div>
      </section>
      <section className="section--tight" style={{"paddingTop": "0"} as React.CSSProperties} aria-labelledby="sat-title">
        <div className="container">
          <div className="card saturday" data-reveal>
            <div>
              <span className="badge">This Saturday</span>
              <h2 className="h3" id="sat-title" style={{"marginTop": "12px"} as React.CSSProperties}>
                Free this{" "}
                <span className="accent">Saturday!</span>
              </h2>
              <p style={{"marginTop": "6px"} as React.CSSProperties}>
                Join a free community session, meet fellow learners, and get a taste of what we build together.
              </p>
            </div>
            <div className="saturday__art"><SceneCalendar /></div>
            <AddToCalendar weeklySaturday title="Nunnari Academy — Free Saturday community session" description="Free community session: meet fellow learners and get a taste of what we build together." className="btn btn--primary btn--lg" />
          </div>
        </div>
      </section>
      <section className="section" id="events" style={{"paddingTop": "clamp(40px,6vw,72px)"} as React.CSSProperties} aria-labelledby="events-title">
        <div className="container">
          <div className="section-head" style={{"marginBottom": "24px"} as React.CSSProperties}>
            <span className="eyebrow" data-reveal>
              More workshops{" "}
              &amp;
              {" "}events
            </span>
            <h2 className="sr-only" id="events-title">Workshops and events</h2>
          </div>
          <ExploreEvents />
          
          
        </div>
      </section>
      <section className="section section--surface" id="testimonials" aria-labelledby="t-title" style={{"overflow": "hidden"} as React.CSSProperties}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" data-reveal>Testimonials</span>
            <Split as="h2" className="h2" id="t-title">
              Learners who found their{" "}
              <span className="accent">next step.</span>
            </Split>
          </div>
        </div>
        <div data-reveal><Testimonials /></div>
      </section>
      <section className="section" id="community" aria-labelledby="c-title">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__grid">
              <div className="cta-band__copy">
                <span className="eyebrow" data-reveal>Join our community</span>
                <Split as="h2" className="h2" id="c-title" style={{"border": "0", "padding": "0", "margin": "0"} as React.CSSProperties}>
                  Join our{" "}
                  <span className="accent">community</span>
                  {" "}where creativity thrives.
                </Split>
                <p className="lead" data-reveal style={{"--d": ".2s"} as React.CSSProperties}>
                  Unlock the amazing benefits of joining our community, growing your skills, and building connections.
                </p>
                <div data-reveal style={{"--d": ".3s"} as React.CSSProperties}>
                  <a className="btn btn--primary btn--lg" href="https://aitamilnadu.org/" target="_blank" rel="noopener" data-magnetic>
                    Join the Community{" "}
                    <svg className="i i--arrow-ur"><use href="#i-arrow-ur" /></svg>
                  </a>
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
