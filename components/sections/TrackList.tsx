"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { tracks } from "@/lib/programs";

/** 12-week tracks: three shown, "Explore All Programmes" reveals the rest. */
export default function TrackList() {
  const [all, setAll] = useState(false);
  return (
    <>
      <div className="grid grid--3" id="track-list">
        {(all ? tracks : tracks.slice(0, 3)).map((t, i) => (
          <article key={t.title} className="card" style={i >= 3 ? ({ animation: "in-up .5s var(--ease) backwards", animationDelay: `${(i - 3) * 70}ms` } as React.CSSProperties) : undefined}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span className="ico"><Icon name={t.icon} /></span><span className="tag">{t.tag}</span></div>
            <h3>{t.title}</h3>
            <p className="clamp3">{t.desc}</p>
            <span className="card__meta"><Icon name="clock" />12 weeks</span>
          </article>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
        <button className="btn btn--ghost btn--lg" type="button" aria-expanded={all} aria-controls="track-list" onClick={() => setAll((v) => !v)}>
          {all ? "Show fewer" : "Explore All Programmes"} <Icon name="chevron" />
        </button>
      </div>
    </>
  );
}
