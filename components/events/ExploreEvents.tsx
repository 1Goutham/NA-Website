"use client";

import { useEffect, useState } from "react";
import Carousel from "@/components/ui/Carousel";
import EventCard from "./EventCard";
import { events, featuredEvent, type EventItem } from "@/lib/events";

const FILTERS = [
  { key: "all", label: "All Events" },
  { key: "workshops", label: "Workshops" },
  { key: "community", label: "Community Events" },
  { key: "past", label: "Past Events" },
];

/** Filterable event list. "past" is computed from the date in the browser so it never goes stale. */
export default function ExploreEvents() {
  const [filter, setFilter] = useState("all");
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
  }, []);

  const isPast = (e: EventItem) => now !== null && new Date(e.end).getTime() + 3 * 3600e3 < now;
  const shown = events
    .filter((e) => e !== featuredEvent)
    .filter((e) => filter === "all" || (filter === "past" ? isPast(e) : e.cats.includes(filter)));

  return (
    <>
      <div className="filters" role="group" aria-label="Filter events">
        {FILTERS.map((f) => (
          <button key={f.key} type="button" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>{f.label}</button>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <Carousel label="Events" key={filter}>
          {shown.map((e) => <div key={e.id} className="ev-slot"><EventCard e={e} variant="detail" /></div>)}
        </Carousel>
      </div>
      {shown.length === 0 && <p className="empty is-shown">Nothing scheduled here just yet — join the community to hear about new sessions first.</p>}
    </>
  );
}
