import type { Metadata } from "next";
import type React from "react";
import Split from "@/components/Split";

export const metadata: Metadata = {
  title: "Help & Support",
  description: "Reach out to Nunnari Academy support for assistance regarding programs, payments, or platform access.",
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return (
    <>
      <section className="page-hero" style={{"paddingBottom": "clamp(32px,5vw,56px)"} as React.CSSProperties}>
        <div className="deco" aria-hidden="true"><span className="orb orb--a" /></div>
        <div className="container" style={{"position": "relative", "zIndex": "1", "display": "grid", "gap": "18px"} as React.CSSProperties}>
          <span className="eyebrow" data-reveal>Support</span>
          <Split as="h1" className="h1">
            Help{" "}
            &amp;
            {" "}
            <span className="accent">Support</span>
          </Split>
        </div>
      </section>
      <section className="section" style={{"paddingTop": "0"} as React.CSSProperties}>
        <div className="container prose" data-reveal>
          <p className="lead">
            Reach out to Nunnari Academy support for quick, reliable assistance regarding programs, payments, or platform access.
          </p>
          <div className="grid-3" id="contact" style={{"marginTop": "32px", "gridTemplateColumns": "repeat(auto-fit,minmax(220px,1fr))"} as React.CSSProperties}>
            <a className="card card--hover spot tile" href="tel:+919003313175">
              <span className="icon-chip"><svg className="i"><use href="#i-phone-wave" /></svg></span>
              <span>
                <b>Talk to us</b>
                <br />
                <span className="small">+91 90033 13175</span>
              </span>
            </a>
            <a className="card card--hover spot tile" href="mailto:enquiry@nunnari.academy">
              <span className="icon-chip"><svg className="i"><use href="#i-mail" /></svg></span>
              <span>
                <b>Email</b>
                <br />
                <span className="small">enquiry@nunnari.academy</span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
