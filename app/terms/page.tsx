import type { Metadata } from "next";
import type React from "react";
import Split from "@/components/Split";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms & Conditions governing your use of Nunnari Academy website, platforms, programs and workshops.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero" style={{"paddingBottom": "clamp(32px,5vw,56px)"} as React.CSSProperties}>
        <div className="deco" aria-hidden="true"><span className="orb orb--a" /></div>
        <div className="container" style={{"position": "relative", "zIndex": "1", "display": "grid", "gap": "18px"} as React.CSSProperties}>
          <span className="eyebrow" data-reveal>Support</span>
          <Split as="h1" className="h1">
            Terms{" "}
            &amp;
            {" "}Conditions
          </Split>
        </div>
      </section>
      <section className="section" style={{"paddingTop": "0"} as React.CSSProperties}>
        <div className="container prose" data-reveal>
          <p>
            Nunnari Academy (“Nunnari”, “we”, “our”, “us”) is an education and training institution based in India. These Terms and Conditions govern your access to and use of our website, platforms, programs, workshops, and associated services.
          </p>
          <p>
            By accessing this website or enrolling in any of our offerings, you confirm that you have read, understood, and agreed to be legally bound by these Terms and Conditions.
          </p>
          <h2>Eligibility</h2>
          <p>
            There are no age restrictions to access Nunnari Academy programs. However, users below the age of 18 are advised to use the platform under the guidance of a parent or legal guardian.
          </p>
          <h2>Acceptable Use</h2>
          <p>
            Users agree to use the website and services strictly for lawful and ethical purposes. Any attempt to compromise system security, misuse content, or engage in unlawful activities is strictly prohibited.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            All materials, including but not limited to branding, logos, curriculum, videos, text, graphics, and course content, are the exclusive intellectual property of Nunnari Academy and are protected under applicable laws.
          </p>
          <h2>
            Payments{" "}
            &amp;
            {" "}Enrollment
          </h2>
          <p>
            Enrollment into any program is confirmed only upon successful payment. Nunnari Academy offers both one-time and EMI-based payment options depending on the program.
          </p>
          <h2>Limitation of Liability</h2>
          <p>
            Nunnari Academy shall not be liable for any indirect, incidental, or consequential damages arising from the use of its services, platforms, or content.
          </p>
          <h2>Amendments</h2>
          <p>
            We reserve the right to update these Terms{" "}
            &amp;
            {" "}Conditions at any time. Continued use of the website constitutes acceptance of the revised terms.
          </p>
          <h2>Contact Information</h2>
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
