import type { Metadata } from "next";
import type React from "react";
import Split from "@/components/Split";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nunnari Academy collects, uses, and protects personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero" style={{"paddingBottom": "clamp(32px,5vw,56px)"} as React.CSSProperties}>
        <div className="deco" aria-hidden="true"><span className="orb orb--a" /></div>
        <div className="container" style={{"position": "relative", "zIndex": "1", "display": "grid", "gap": "18px"} as React.CSSProperties}>
          <span className="eyebrow" data-reveal>Support</span>
          <Split as="h1" className="h1">Privacy Policy</Split>
        </div>
      </section>
      <section className="section" style={{"paddingTop": "0"} as React.CSSProperties}>
        <div className="container prose" data-reveal>
          <p>
            Nunnari Academy is committed to safeguarding the privacy and personal information of its learners, visitors, and stakeholders. This Privacy Policy outlines how we collect, use, and protect personal data.
          </p>
          <h2>Information Collected</h2>
          <p>
            We may collect personal details such as name, email address, contact number, educational background, course preferences, and payment-related information.
          </p>
          <h2>Use of Information</h2>
          <p>
            Collected information is used solely for delivering educational services, processing enrollments, communication, support, and improving our offerings.
          </p>
          <h2>Data Security</h2>
          <p>
            We employ industry-standard security practices to protect personal data from unauthorized access, disclosure, or misuse.
          </p>
          <h2>Third-Party Services</h2>
          <p>
            We may engage trusted third-party services for analytics, communication, and payment processing. These services operate under their respective privacy policies.
          </p>
          <h2>User Rights</h2>
          <p>
            Users may request access, correction, or deletion of their data, subject to applicable legal and operational requirements.
          </p>
          <h2>Contact</h2>
          <p>
            Email:{" "}
            <a href="mailto:enquiry@nunnari.academy">enquiry@nunnari.academy</a>
            <br />
            Phone:{" "}
            <a href="tel:+919003313175">+91 90033 13175</a>
          </p>
        </div>
      </section>
    </>
  );
}
