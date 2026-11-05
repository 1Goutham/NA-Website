import Image from "next/image";
import Art from "@/components/ui/Art";

const facts = ["Founded in Coimbatore, 2020", "ISO/IEC 42001:2023 certified", "India & Australia"];

/** The company behind Nunnari Academy (adapted from nunnarilabs.com → Company). */
export default function Company() {
  return (
    <section className="section section--band" id="company" aria-labelledby="company-title">
      <div className="container">
        <div className="company__top">
          <div className="company__copy">
            <span className="pill" data-reveal="">The company behind Nunnari Academy</span>
            <h2 className="t-h2" id="company-title" data-reveal=""><span className="soft">Backed by</span> Nunnari Labs <span className="soft">&amp;</span> DeepWeaver.</h2>
            <p className="lead" data-reveal="">Two companies, one delivery team across India and Australia, with one project history and one governance layer.</p>
            <ul className="company__facts" data-reveal="">{facts.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
          <div data-reveal="" style={{ "--d": ".15s" } as React.CSSProperties}><Art name="company" label="Coimbatore and Sydney, connected" /></div>
        </div>

        <div className="company__cards">
          <article className="card company__card" data-reveal="">
            <div className="company__logo"><Image src="/assets/brand/nunnari-labs-ink.png" alt="Nunnari Labs" width={274} height={322} style={{ height: 52, width: "auto" }} /></div>
            <div><h3>Nunnari Labs</h3><span className="company__where">India · Coimbatore</span></div>
            <ul className="company__list"><li>AI engineering company</li><li>ISO/IEC 42001 certified</li></ul>
          </article>
          <article className="card company__card" data-reveal="" style={{ "--d": ".06s" } as React.CSSProperties}>
            <div className="company__logo"><Image src="/assets/logos/deepweaver.webp" alt="DeepWeaver" width={560} height={110} style={{ height: 30, width: "auto" }} /></div>
            <div><h3>DeepWeaver</h3><span className="company__where">Australia · Sydney</span></div>
            <ul className="company__list"><li>Enterprise AI services</li><li>Weaving human-led AI into the enterprise</li></ul>
          </article>
          <article className="card company__card" data-reveal="" style={{ "--d": ".12s" } as React.CSSProperties}>
            <div className="company__logo"><span className="company__ta" lang="ta">நுண்ணறிவு</span></div>
            <div><h3>Nunnarivu</h3><span className="company__where">Where our name comes from</span></div>
            <ul className="company__list"><li>Tamil for “intelligence”</li><li>Rooted in Tamil Nadu, built for global learners</li></ul>
          </article>
        </div>
      </div>
    </section>
  );
}
