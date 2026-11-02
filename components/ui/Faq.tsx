"use client";

import { useState } from "react";
import Accordion, { type QA } from "./Accordion";

/** FAQ with category tabs on the left (Program / Eligibility / …). */
export default function Faq({ cats, items }: { cats: { key: string; label: string }[]; items: QA[] }) {
  const [cat, setCat] = useState(cats[0]?.key ?? "all");
  return (
    <div className="faq">
      <div className="faq__cats" role="tablist" aria-label="FAQ categories">
        {cats.map((c) => (
          <button key={c.key} type="button" role="tab" aria-selected={cat === c.key} onClick={() => setCat(c.key)}>{c.label}</button>
        ))}
      </div>
      <Accordion items={items} filter={cat} />
    </div>
  );
}
