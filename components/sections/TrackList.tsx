"use client";

import { useState } from "react";
import type React from "react";
import Icon from "@/components/Icon";
import { tracks } from "@/lib/programs";

/** 12-week tracks: first three shown, "Explore All Programmes" reveals the rest with a staggered entrance. */
export default function TrackList() {
  const [all, setAll] = useState(false);
  const list = all ? tracks : tracks.slice(0, 3);
  return (
    <>
      <div className="grid-3" id="track-list">
        {list.map((t, i) => (
            <article key={t.title} className={`card card--hover spot track${i >= 3 ? " track--enter" : ""}`} style={{ "--d": `${(i - 3) * 70}ms` } as React.CSSProperties}>
              <div className="track__head"><span className="icon-chip"><Icon name={t.icon} /></span><span className="badge badge--soft">{t.tag}</span></div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <span className="track__meta"><Icon name="clock" />12 weeks program</span>
            </article>
          ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <button className="btn btn--primary btn--lg" type="button" aria-expanded={all} aria-controls="track-list" onClick={() => setAll((v) => !v)} data-magnetic>
          {all ? "Show fewer programmes" : "Explore All Programmes"} <Icon name="arrow" className="i--arrow" />
        </button>
      </div>
    </>
  );
}
