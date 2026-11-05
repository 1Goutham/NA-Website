import { PageHero } from "@/components/ui/Blocks";
import { legal } from "@/lib/legal";

export default function LegalPage({ id }: { id: keyof typeof legal }) {
  const d = legal[id];
  return (
    <>
      <PageHero pill="Support" title={d.title} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: "grid", justifyItems: "center" }}>
          <article className="prose" data-reveal="">
            {d.sections.map((s, i) => (
              <div key={i}>{s.h && <h2>{s.h}</h2>}{s.p.map((t) => <p key={t}>{t}</p>)}</div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
