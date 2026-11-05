import Icon from "@/components/Icon";
import Faq from "@/components/ui/Faq";
import BrochureButton from "@/components/ui/BrochureButton";
import { Card, Cta, Head, PageHero } from "@/components/ui/Blocks";
import { programs, roles, tools, type ProgramKey } from "@/lib/programs";

/** One template for every programme page: hero → who it's for → (extras) → outcomes → FAQ → CTA. */
export default function ProgramPage({ id }: { id: ProgramKey }) {
  const p = programs[id];
  const enroll = `Enroll: ${p.name}`;
  return (
    <>
      <PageHero
        crumbs={[{ href: "/programs", label: "Programs" }, { href: `/programs/${id}`, label: p.name }]}
        pill={`${p.name} · ${p.num}`}
        title={<>{p.title[0]} <span className="grad">{p.title[1]}</span></>}
        lead={p.lead}
        facts={p.facts}
        art={p.art}
        actions={<>
          <button className="btn btn--primary btn--lg" type="button" data-enquire={enroll}>Enroll Now <Icon name="arrow" className="i--arrow" /></button>
          <BrochureButton program={id} />
        </>}
      />

      <section className="section">
        <div className="container">
          <Head pill="Who it's for" title={<>Designed <span className="grad">for you.</span></>} />
          <div className="grid grid--2">
            {p.forWho.map((c, i) => <Card key={c.title} icon={c.icon} title={c.title} text={c.text} k={i} />)}
          </div>
        </div>
      </section>

      {id === "regular" && (
        <section className="section">
          <div className="container split">
            <Head pill="Growth & opportunities" title={<>Skills today for <span className="grad">tomorrow.</span></>} lead="Gain in-demand skills, build a portfolio, and get guidance to start your journey in AI & ML." />
            <div className="card" data-reveal="">
              <span className="eyebrow">Average salary</span>
              <strong style={{ font: "500 clamp(2.4rem,5vw,3.4rem)/1 var(--font-display)", color: "var(--text)", letterSpacing: "-0.04em" }}>₹8.5 LPA</strong>
              <div className="actions" style={{ gap: 8, marginTop: 6 }}>
                {roles.map((r) => <span key={r} className="tag">{r}</span>)}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Head pill="Learning outcomes" title={<>From learning to <span className="grad">real impact.</span></>} />
          <div className="journey" data-inview="" style={{ "--n": p.outcomes.length } as React.CSSProperties}>
            {p.outcomes.map((o, k) => (
              <div className="card" key={o.title} style={{ "--k": k } as React.CSSProperties}>
                <span className="ico"><Icon name={o.icon} /></span>
                <span className="num">0{k + 1}</span>
                <h3>{o.title}</h3>
                <p className="clamp3">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {id === "regular" && (
        <section className="section">
          <div className="container">
            <Head pill="Tools you'll use" title={<>Industry-standard <span className="grad">tools.</span></>} />
            <div className="logos" style={{ "--n": 4 } as React.CSSProperties}>
              {tools.map((t) => <div key={t} className="card logo-tile" style={{ minHeight: 96 }} data-reveal=""><span className="wm">{t}</span></div>)}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Head pill="FAQ" title={<>Questions, <span className="grad">answered.</span></>} />
          <Faq cats={p.faqCats} items={p.faq} />
        </div>
      </section>

      <Cta
        art={p.art}
        title={<>Start your <span className="grad">AI journey.</span></>}
        lead="Talk to our team and we will help you pick the right batch."
        actions={<>
          <button className="btn btn--primary btn--lg" type="button" data-enquire={enroll}>Enroll Now <Icon name="arrow" className="i--arrow" /></button>
          <BrochureButton program={id} />
        </>}
      />
    </>
  );
}
