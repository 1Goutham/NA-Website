import Image from "next/image";

/** The company behind Nunnari Academy (adapted from nunnarilabs.com → Company). */
export default function Company() {
  return (
    <section className="section section--band" id="company" aria-labelledby="company-title">
      <div className="container company">
        <div className="company__copy">
          <span className="pill" data-reveal="">The company behind Nunnari Academy</span>
          <h2 className="t-h2" id="company-title" data-reveal=""><span className="soft">Backed by</span> Nunnari Labs <span className="soft">&amp;</span> DeepWeaver.</h2>
          <p className="lead" data-reveal="">Nunnari Labs was founded in Coimbatore in 2020 and is among the first AI-native companies in India certified to ISO/IEC 42001:2023. With DeepWeaver, it works as one team across India and Australia.</p>
          <div className="company__regions">
            <div className="card region" data-reveal="">
              <div><h3>India</h3><small>Coimbatore · Nunnari Labs</small></div>
              <ul><li>AI engineering company</li><li>ISO/IEC 42001 certified</li></ul>
            </div>
            <div className="card region" data-reveal="" style={{ "--d": ".08s" } as React.CSSProperties}>
              <div><h3>Australia</h3><small>Sydney · DeepWeaver</small></div>
              <ul><li>Enterprise AI services</li><li>ANZ organisations</li></ul>
            </div>
          </div>
        </div>

        <div className="company__right">
          <div className="company__partner" data-reveal="">
            <span className="eyebrow">Exclusive partnership</span>
            <div className="company__logos">
              <Image src="/assets/brand/nunnari-labs-white.png" alt="Nunnari Labs" width={274} height={322} style={{ height: 64, width: "auto" }} />
              <span className="x" aria-hidden="true">×</span>
              <Image src="/assets/brand/deepweaver-white.png" alt="DeepWeaver" width={480} height={94} style={{ height: 34, width: "auto" }} />
            </div>
            <p>Nunnari Labs and DeepWeaver operate as one delivery team across India and Australia: one project history, one governance layer, no hand-offs between companies.</p>
          </div>
          <div className="company__tiles">
            <div className="company__tile" data-reveal="">
              <span className="eyebrow">Nunnarivu · intelligence</span>
              <span className="ta" lang="ta">நுண்ணறிவு</span>
              <p>Tamil for “intelligence”. It’s where our name comes from.</p>
            </div>
            <div className="company__tile" data-reveal="" style={{ "--d": ".08s" } as React.CSSProperties}>
              <Image src="/assets/brand/deepweaver-white.png" alt="DeepWeaver" width={480} height={94} />
              <p>Weaving human-led AI into the enterprise fabric.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
