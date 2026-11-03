"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

type Props = {
  title: string;
  description?: string;
  location?: string;
  /** ISO start/end. Omit for the weekly all-day Saturday session. */
  start?: string;
  end?: string;
  weeklySaturday?: boolean;
  className?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const utc = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const ymd = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
const isoDay = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const nextSaturday = () => { const d = new Date(); d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7)); return d; };

/**
 * "Add to Calendar" (doc: Explore page) — puts the event straight into the visitor's own calendar:
 * Google Calendar, Outlook, or Apple / any other app via an .ics file. Disabled once the event has started.
 */
export default function AddToCalendar({ title, description = "", location = "Online", start, end, weeklySaturday, className = "btn btn--ghost btn--lg" }: Props) {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [added, setAdded] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => { if (start) setStarted(Date.now() >= new Date(start).getTime()); }, [start]);
  useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", off);
    addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", off); removeEventListener("keydown", esc); };
  }, [open]);

  const links = () => {
    const t = encodeURIComponent(title), d = encodeURIComponent(description), l = encodeURIComponent(location);
    if (weeklySaturday) {
      const s = nextSaturday(), e = new Date(s); e.setDate(s.getDate() + 1);
      return {
        google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&details=${d}&location=${l}&dates=${ymd(s)}/${ymd(e)}&recur=${encodeURIComponent("RRULE:FREQ=WEEKLY;BYDAY=SA")}`,
        outlook: `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&allday=true&subject=${t}&body=${d}&location=${l}&startdt=${isoDay(s)}&enddt=${isoDay(e)}`,
        ics: ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nunnari Academy//Events//EN", "BEGIN:VEVENT", `UID:sat-${ymd(s)}@nunnari.academy`, `DTSTAMP:${utc(new Date().toISOString())}`,
          `DTSTART;VALUE=DATE:${ymd(s)}`, `DTEND;VALUE=DATE:${ymd(e)}`, "RRULE:FREQ=WEEKLY;BYDAY=SA", `SUMMARY:${title}`, `DESCRIPTION:${description}`, `LOCATION:${location}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n"),
      };
    }
    const s = start!, e = end || start!;
    return {
      google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&details=${d}&location=${l}&dates=${utc(s)}/${utc(e)}`,
      outlook: `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${t}&body=${d}&location=${l}&startdt=${encodeURIComponent(new Date(s).toISOString())}&enddt=${encodeURIComponent(new Date(e).toISOString())}`,
      ics: ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nunnari Academy//Events//EN", "BEGIN:VEVENT", `UID:${utc(s)}-${title.length}@nunnari.academy`, `DTSTAMP:${utc(new Date().toISOString())}`,
        `DTSTART:${utc(s)}`, `DTEND:${utc(e)}`, `SUMMARY:${title}`, `DESCRIPTION:${description}`, `LOCATION:${location}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n"),
    };
  };

  const done = () => { setOpen(false); setAdded(true); setTimeout(() => setAdded(false), 2400); };
  const downloadIcs = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([links().ics], { type: "text/calendar;charset=utf-8" }));
    a.download = title.replace(/[^\w]+/g, "-").replace(/^-|-$/g, "").toLowerCase() + ".ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    done();
  };

  return (
    <div className="atc" ref={wrap}>
      <button className={className} type="button" aria-haspopup="menu" aria-expanded={open} disabled={started} onClick={() => setOpen((o) => !o)}>
        <Icon name={added ? "check" : "calendar-plus"} />
        {started ? "Event started" : added ? "Added to calendar" : "Add to Calendar"}
      </button>
      {open && (
        <div className="atc__menu" role="menu">
          <a role="menuitem" href={links().google} target="_blank" rel="noopener" onClick={done}><span className="atc__ic atc__ic--g">G</span>Google Calendar</a>
          <a role="menuitem" href={links().outlook} target="_blank" rel="noopener" onClick={done}><span className="atc__ic atc__ic--o">O</span>Outlook</a>
          <button role="menuitem" type="button" onClick={downloadIcs}><span className="atc__ic"><Icon name="calendar" /></span>Apple / other (.ics)</button>
        </div>
      )}
    </div>
  );
}
