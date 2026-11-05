"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "@/components/Icon";
import Art from "@/components/ui/Art";
import { programList, type ProgramKey } from "@/lib/programs";

const icons: Record<ProgramKey, IconName> = { recorded: "play", regular: "users", premium: "crown" };

/** Tabbed course catalogue (doc §1.6). Same data as the programme pages. */
export default function ProgramsCatalog() {
  const [active, setActive] = useState<ProgramKey>("recorded");
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => {
    const h = location.hash.slice(1) as ProgramKey;
    if (programList.some((p) => p.key === h)) setActive(h);
  }, []);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = ({ ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 } as Record<string, number>)[e.key];
    if (!d) return;
    e.preventDefault();
    const n = programList[(i + d + programList.length) % programList.length].key;
    setActive(n); refs.current[n]?.focus();
  };
  return (
    <div className="catalog">
      <div className="tablist" role="tablist" aria-label="Programmes" aria-orientation="vertical">
        {programList.map((p, i) => (
          <button key={p.key} ref={(el) => { refs.current[p.key] = el; }} className="tab" role="tab" id={`tab-${p.key}`} aria-controls={`panel-${p.key}`}
            aria-selected={active === p.key} tabIndex={active === p.key ? 0 : -1} type="button" onClick={() => setActive(p.key)} onKeyDown={(e) => onKey(e, i)}>
            <span className="ico"><Icon name={icons[p.key]} /></span>
            <span><b>{p.name.replace(" Programme", " Programs")}</b><small>{p.short}</small></span>
            <span className="num">{p.num}</span>
          </button>
        ))}
      </div>
      <div className="panel-wrap">
        {programList.map((p) => (
          <section key={p.key} className={`panel${active === p.key ? " is-active" : ""}`} role="tabpanel" id={`panel-${p.key}`} aria-labelledby={`tab-${p.key}`} aria-hidden={active !== p.key} inert={active !== p.key}>
            <div className="panel__top">
              <div className="panel__copy">
                <span className="tag">{p.name}</span>
                <h3 className="t-h2" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>{p.title[0]} <span className="grad">{p.title[1]}</span></h3>
                <p>{p.lead}</p>
              </div>
              <Art name={p.art} />
            </div>
            <div className="facts-row" style={{ "--n": p.facts.length } as React.CSSProperties}>
              {p.facts.map((f) => <div key={f.title}><b>{f.title}</b><span>{f.sub}</span></div>)}
            </div>
            <div className="panel__cta">
              <Link className="btn btn--primary btn--lg" href={`/programs/${p.key}`}>View Programme Details <Icon name="arrow" className="i--arrow" /></Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
