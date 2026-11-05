"use client";

import { useEffect, useState } from "react";
import EventCard, { type WorkshopCard } from "./EventCard";
import { whenOf } from "@/lib/when";

const FILTERS = [{ key: "all", label: "All" }, { key: "upcoming", label: "Upcoming" }, { key: "past", label: "Completed" }] as const;

/** All workshops with an Upcoming / Completed filter (computed from the dates in the browser). */
export default function WorkshopList({ items }: { items: WorkshopCard[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);
  const shown = items.filter((w) => {
    if (filter === "all" || now === null) return true;
    const s = whenOf(w.start, w.end, now);
    return filter === "past" ? s === "past" : s !== "past";
  });
  return (
    <>
      <div className="seg" role="group" aria-label="Filter workshops" style={{ marginBottom: 28 }}>
        {FILTERS.map((f) => <button key={f.key} type="button" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>{f.label}</button>)}
      </div>
      <div className="grid grid--3">
        {shown.map((w) => <div className="ev-slot" key={`${filter}-${w.slug}`}><EventCard w={w} /></div>)}
      </div>
      {shown.length === 0 && <p className="card" style={{ textAlign: "center" }}>No upcoming workshops right now — join the community to hear about the next one first.</p>}
    </>
  );
}
