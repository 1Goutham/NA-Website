import type { Metadata } from "next";
import type React from "react";
import Split from "@/components/Split";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Terms under which payments made to Nunnari Academy are managed.",
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  return (
    <>
      <section className="page-hero" style={{"paddingBottom": "clamp(32px,5vw,56px)"} as React.CSSProperties}>
        <div className="deco" aria-hidden="true"><span className="orb orb--a" /></div>
        <div className="container" style={{"position": "relative", "zIndex": "1", "display": "grid", "gap": "18px"} as React.CSSProperties}>
          <span className="eyebrow" data-reveal>Support</span>
          <Split as="h1" className="h1">Refund Policy</Split>
        </div>
      </section>
      <section className="section" style={{"paddingTop": "0"} as React.CSSProperties}>
        <div className="container prose" data-reveal>
          <p>
            This Refund Policy defines the terms under which payments made to Nunnari Academy are managed. By enrolling in any program, you agree to the conditions outlined below.
          </p>
          <h2>Payment Options</h2>
          <p>
            Nunnari Academy offers both one-time payments and EMI-based payment plans, depending on the program structure.
          </p>
          <h2>No Refund Policy</h2>
          <p>
            Once enrollment is completed and access to course materials or sessions is granted, no refunds shall be issued under any circumstances.
          </p>
          <p>
            This policy applies to all payment modes, including EMI-based payments, regardless of attendance, participation, or completion status.
          </p>
          <h2>Exceptional Requests</h2>
          <p>
            Any exceptions to this policy are entirely at the discretion of Nunnari Academy’s management and shall not be considered a precedent.
          </p>
          <h2>Contact for Clarification</h2>
          <p>
            Email:{" "}
            <a href="mailto:enquiry@nunnari.academy">enquiry@nunnari.academy</a>
            <br />
            Phone:{" "}
            <a href="tel:+919043035584">+91 90430 35584</a>
          </p>
        </div>
      </section>
    </>
  );
}
