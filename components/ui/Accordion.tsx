"use client";

import { useId, useState } from "react";

export type QA = { q: string; a: React.ReactNode; cats?: string[] };

/** Accessible accordion: one item open at a time, smooth height via CSS grid rows. */
export default function Accordion({ items, filter }: { items: QA[]; filter?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="acc">
      {items.map((it, i) => {
        if (filter && filter !== "all" && !it.cats?.includes(filter)) return null;
        const isOpen = open === i;
        return (
          <div key={it.q} className={`acc__item${isOpen ? " is-open" : ""}`}>
            <button className="acc__btn" type="button" aria-expanded={isOpen} aria-controls={`${id}-${i}`} id={`${id}-b${i}`} onClick={() => setOpen(isOpen ? null : i)}>
              {it.q}<span className="pm" aria-hidden="true" />
            </button>
            <div className="acc__panel" id={`${id}-${i}`} role="region" aria-labelledby={`${id}-b${i}`}>
              <div><p>{it.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
