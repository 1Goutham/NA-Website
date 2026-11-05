import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { Cta, PageHero } from "@/components/ui/Blocks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help & Support",
  description: "Reach Nunnari Academy for help with programs, payments or platform access.",
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return (
    <>
      <PageHero pill="Support" title={<>Help &amp; <span className="grad">support.</span></>} lead="Questions about programs, payments or platform access? We’re here to help." />
      <section className="section" style={{ paddingTop: 0 }} id="contact">
        <div className="container grid grid--2" style={{ maxWidth: 820 }}>
          <a className="card card--link" href={site.phone.href} data-reveal="">
            <span className="ico"><Icon name="phone" /></span><h3>Call us</h3><p>{site.phone.label}</p>
          </a>
          <a className="card card--link" href={`mailto:${site.email}`} data-reveal="" style={{ "--d": ".06s" } as React.CSSProperties}>
            <span className="ico"><Icon name="mail" /></span><h3>Email us</h3><p>{site.email}</p>
          </a>
        </div>
      </section>
      <Cta art="agent" title={<>Prefer a <span className="grad">call back?</span></>} lead="Leave your details and our experts will reach you within 24–48 hours."
        actions={<button className="btn btn--primary btn--lg" type="button" data-enquire="Request a Call">Request a Call <Icon name="arrow" className="i--arrow" /></button>} />
    </>
  );
}
