import type { ReactNode } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Split from "@/components/Split";
import Art from "./Art";

/** Section heading: pill + title + optional lead (+ optional action on the right). Same on every page. */
export function Head({ pill, title, lead, center, action, as = "h2" }: { pill?: string; title: ReactNode; lead?: ReactNode; center?: boolean; action?: ReactNode; as?: "h1" | "h2" }) {
  const body = (
    <>
      {pill && <span className="pill" data-reveal="">{pill}</span>}
      <Split as={as} className={as === "h1" ? "t-h1" : "t-h2"}>{title}</Split>
      {lead && <p className="lead" data-reveal="" style={{ "--d": ".15s" } as React.CSSProperties}>{lead}</p>}
    </>
  );
  if (action) return <div className="head head--row"><div>{body}</div><div data-reveal="">{action}</div></div>;
  return <div className={`head${center ? " head--center" : ""}`}>{body}</div>;
}

/** Inner-page hero: crumbs, pill, title, lead, facts, actions, and a line-art panel on the right. */
export function PageHero({ crumbs, pill, title, lead, facts, actions, art, children }: {
  crumbs?: { href: string; label: string }[]; pill?: string; title: ReactNode; lead?: ReactNode;
  facts?: { icon: Parameters<typeof Icon>[0]["name"]; title: string; sub: string }[]; actions?: ReactNode; art?: string; children?: ReactNode;
}) {
  return (
    <section className={`page-hero${art ? "" : " page-hero--center"}`}>
      <div className="container">
        <div className={art ? "page-hero__grid" : undefined}>
          <div className="page-hero__copy">
            {crumbs && (
              <nav className="crumbs" aria-label="Breadcrumb" data-reveal="">
                {crumbs.map((c, i) => (
                  <span key={c.href} style={{ display: "contents" }}>
                    {i > 0 && <Icon name="chevron-r" />}
                    {i === crumbs.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}
                  </span>
                ))}
              </nav>
            )}
            {pill && <span className="pill" data-reveal="">{pill}</span>}
            <Split as="h1" className="t-h1">{title}</Split>
            {lead && <p className="lead" data-reveal="" style={{ "--d": ".15s" } as React.CSSProperties}>{lead}</p>}
            {facts && (
              <div className="facts" data-reveal="" style={{ "--d": ".25s" } as React.CSSProperties}>
                {facts.map((f) => <div className="fact" key={f.title}><Icon name={f.icon} /><div><b>{f.title}</b><span>{f.sub}</span></div></div>)}
              </div>
            )}
            {actions && <div className="actions" data-reveal="" style={{ "--d": ".35s" } as React.CSSProperties}>{actions}</div>}
            {children}
          </div>
          {art && <div data-reveal="" style={{ "--d": ".2s" } as React.CSSProperties}><Art name={art} /></div>}
        </div>
      </div>
    </section>
  );
}

/** Closing call-to-action band (every page ends with one). */
export function Cta({ title, lead, actions, art = "community" }: { title: ReactNode; lead?: ReactNode; actions: ReactNode; art?: string }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta" data-reveal="">
          <div className="cta__copy">
            <h2 className="t-h2">{title}</h2>
            {lead && <p className="lead">{lead}</p>}
            <div className="actions">{actions}</div>
          </div>
          <Art name={art} />
        </div>
      </div>
    </section>
  );
}

/** Uniform card: icon, title, three-line description. */
export function Card({ icon, title, text, children, k }: { icon?: Parameters<typeof Icon>[0]["name"]; title: string; text?: string; children?: ReactNode; k?: number }) {
  return (
    <div className="card" data-reveal="" style={k !== undefined ? ({ "--d": `${k * 0.06}s` } as React.CSSProperties) : undefined}>
      {icon && <span className="ico"><Icon name={icon} /></span>}
      <h3>{title}</h3>
      {text && <p className="clamp3">{text}</p>}
      {children}
    </div>
  );
}

export const EnquireButton = ({ topic, children, ghost }: { topic: string; children: ReactNode; ghost?: boolean }) => (
  <button className={`btn btn--lg ${ghost ? "btn--ghost" : "btn--primary"}`} type="button" data-enquire={topic}>
    {children} <Icon name="arrow" className="i--arrow" />
  </button>
);
