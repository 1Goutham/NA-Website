import Image from "next/image";
import Icon from "@/components/Icon";
import { Card, Cta, Head, PageHero } from "@/components/ui/Blocks";
import { partners, type Partner } from "@/lib/partners";

const bars = (years: number[], vals: number[], max: number) => (
  <div className="vbars" data-inview="">
    <div className="vbars__y">{Array.from({ length: 6 }, (_, i) => <span key={i}>{Math.round((max / 5) * i)}</span>)}</div>
    <div className="vbars__plot">
      {vals.map((v, k) => <div className="vbar" key={years[k]} style={{ "--h": `${(v / max) * 100}%`, "--k": k } as React.CSSProperties}><i /><b>{v}</b><em>{`’${String(years[k]).slice(-2)}`}</em></div>)}
    </div>
  </div>
);

function Charts({ kind }: { kind: Partner["charts"] }) {
  if (kind === "institutions") {
    const f: [string, number, string][] = [["Delivered", 97, "#a892ff"], ["Confirmed", 104, "#7c5cff"], ["Invited", 104, "#5a3df0"], ["Proposal", 94, "#3f2ab8"], ["Enquiry", 46, "#c9bcff"], ["Unclear", 27, "#8a8b9e"], ["Declined", 9, "#e5484d"]];
    const total = f.reduce((a, b) => a + b[1], 0);
    return (
      <div className="grid grid--2" style={{ marginTop: 20 }}>
        <div className="card chart-card" data-reveal=""><h3>Activities per year</h3><p>Each activity counted once, in the year of its event date.</p>
          {bars([2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026], [2, 3, 3, 13, 36, 47, 45, 45, 70, 49, 119], 120)}</div>
        <div className="card chart-card" data-reveal="" data-inview=""><h3>How far each activity went</h3><p>The furthest stage reached.</p>
          <div className="funnel">{f.map(([n, v, c], k) => <i key={n} style={{ "--v": v, "--c": c, "--k": k } as React.CSSProperties} />)}</div>
          <ul className="legend">{f.map(([n, v, c]) => <li key={n} style={{ "--c": c } as React.CSSProperties}>{n}<b>{v}</b><small>{Math.round((v / total) * 100)}%</small></li>)}</ul>
        </div>
      </div>
    );
  }
  const d: [string, number][] = [["Generative AI & LLMs", 38], ["AI for Productivity", 32], ["Data Analytics & ML", 28], ["Prompt Engineering", 24], ["AI for Business", 22], ["Custom Enterprise Training", 18], ["Others", 12]];
  return (
    <div className="grid grid--2" style={{ marginTop: 20 }}>
      <div className="card chart-card" data-reveal="" data-inview=""><h3>Training by domain</h3><p>Corporate sessions across key AI domains.</p>
        <div className="hbars">{d.map(([n, v], k) => <div className="hbar" key={n}><span>{n}</span><span className="hbar__track"><i style={{ "--w": `${(v / 38) * 100}%`, "--k": k, "--o": 1 - k * 0.09 } as React.CSSProperties} /></span><b>{v}</b></div>)}</div></div>
      <div className="card chart-card" data-reveal=""><h3>Growth in corporate training</h3><p>Training sessions conducted per year.</p>
        {bars([2021, 2022, 2023, 2024, 2025, 2026], [17, 32, 48, 61, 79, 97], 100)}</div>
    </div>
  );
}

/** One template for both partner pages: hero → what we bring → partners → impact → voices → CTA. */
export default function PartnerPage({ id }: { id: Partner["key"] }) {
  const p = partners[id];
  const btn = (ghost?: boolean) => <button className={`btn btn--lg ${ghost ? "btn--ghost" : "btn--primary"}`} type="button" data-enquire={`${p.cta} (${id === "institutions" ? "Institution" : "Corporate"})`}>{p.cta} <Icon name="arrow" className="i--arrow" /></button>;
  return (
    <>
      <PageHero pill={p.pill} title={<>{p.title[0]} <span className="grad">{p.title[1]}</span></>} lead={p.lead} art={p.art} actions={btn()} />

      <section className="section">
        <div className="container">
          <Head pill="What we bring" title={<>Built for <span className="grad">real impact.</span></>} />
          <div className={`grid grid--${p.offers.length}`}>{p.offers.map((o, i) => <Card key={o.title} icon={o.icon} title={o.title} text={o.text} k={i} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="Our partners" title={<>{p.logosTitle[0]} <span className="grad">{p.logosTitle[1]}</span></>} />
          <div className="logos" style={{ "--n": p.logos.length > 5 ? 6 : p.logos.length } as React.CSSProperties}>
            {p.logos.map((l, i) => (
              <div key={l.name} className="card logo-tile" data-reveal="" style={{ "--d": `${i * 0.05}s`, minHeight: l.src ? 180 : 110 } as React.CSSProperties}>
                {l.src ? <><Image src={l.src} alt={l.name} width={160} height={160} /><span>{l.name}</span></> : <span className="wm">{l.name}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="Our impact" title={<>Partnerships that turn into <span className="grad">progress.</span></>} />
          <div className="stats" style={{ "--n": p.stats.length } as React.CSSProperties} data-reveal="">
            {p.stats.map(([n, s, l]) => <div className="stat" key={l}><strong data-count={n} data-suffix={s}>{n.toLocaleString("en-IN")}{s}</strong><span>{l}</span></div>)}
          </div>
          <Charts kind={p.charts} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="Partner voices" title={<>What our partners <span className="grad">say.</span></>} />
          <div className="grid grid--3">
            {p.quotes.map((q, i) => (
              <figure key={q.name} className="card quote" style={{ width: "auto", "--d": `${i * 0.06}s` } as React.CSSProperties} data-reveal="">
                <blockquote>“{q.quote}”</blockquote>
                <figcaption><span className="avatar" aria-hidden="true">{q.name.replace(/^Dr\. /, "").split(" ").map((x) => x[0]).slice(0, 2).join("")}</span><span><b>{q.name}</b><span>{q.role}, {q.org}</span></span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Cta art={p.art} title={<>{p.closing[0]} <span className="grad">{p.closing[1]}</span></>} lead="Our team will connect with you within 24–48 hours." actions={btn()} />
    </>
  );
}
