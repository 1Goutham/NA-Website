"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Icon from "@/components/Icon";
import { tracks } from "@/lib/programs";

/** 12-week tracks: first three shown, "Explore All Programmes" reveals the rest with a staggered entrance. */
export default function TrackList() {
  const [all, setAll] = useState(false);
  const list = all ? tracks : tracks.slice(0, 3);
  return (
    <>
      <div className="grid-3" id="track-list">
        <AnimatePresence initial={false}>
          {list.map((t, i) => (
            <motion.article
              key={t.title}
              className="card card--hover spot track"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i >= 3 ? (i - 3) * 0.07 : 0, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.25 } }}
              layout
            >
              <div className="track__head"><span className="icon-chip"><Icon name={t.icon} /></span><span className="badge badge--soft">{t.tag}</span></div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <span className="track__meta"><Icon name="clock" />12 weeks program</span>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <button className="btn btn--primary btn--lg" type="button" aria-expanded={all} aria-controls="track-list" onClick={() => setAll((v) => !v)} data-magnetic>
          {all ? "Show fewer programmes" : "Explore All Programmes"} <Icon name="arrow" className="i--arrow" />
        </button>
      </div>
    </>
  );
}
