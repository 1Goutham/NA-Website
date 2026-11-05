import Link from "next/link";
import Icon from "@/components/Icon";
import Art from "@/components/ui/Art";
import AddToCalendar from "./AddToCalendar";
import { fmtDate, fmtDay, fmtTime } from "@/lib/format";
import { whenOf } from "@/lib/when";
import type { WorkshopCard } from "./EventCard";

/** Big workshop card at the top of /explore. */
export default function Spotlight({ w }: { w: WorkshopCard }) {
  return (
    <article className="card featured" data-date={w.start} data-end={w.end} data-when={whenOf(w.start, w.end)} data-reveal="">
      <div className="featured__copy">
        <span className="tag" data-show="upcoming">Upcoming {w.type.toLowerCase()}</span>
        <span className="tag tag--live" data-show="live">Happening now</span>
        <span className="tag tag--done" data-show="past">Recent {w.type.toLowerCase()}</span>
        <h3 className="t-h2" style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)" }}>{w.title}</h3>
        {w.description && <p>{w.description}</p>}
        <div className="facts">
          <div className="fact"><Icon name="calendar" /><div><b>{fmtDate(w.start)}</b><span>{fmtDay(w.start)}</span></div></div>
          <div className="fact"><Icon name="clock" /><div><b>{fmtTime(w.start, w.end)}</b><span>{w.language ? `In ${w.language}` : "Live session"}</span></div></div>
          <div className="fact"><Icon name="monitor" /><div><b>{w.mode}</b><span>{w.type}</span></div></div>
        </div>
        <div className="actions">
          <span data-show="upcoming" style={{ display: "contents" }}>
            {w.register
              ? <a className="btn btn--primary btn--lg" href={w.register} target="_blank" rel="noopener">Register Now <Icon name="arrow-ur" className="i--ur" /></a>
              : <button className="btn btn--primary btn--lg" type="button" data-enquire={`Register: ${w.title}`}>Register Now <Icon name="arrow" className="i--arrow" /></button>}
            <AddToCalendar title={w.title} description={w.description} start={w.start} end={w.end} />
          </span>
          <Link data-show="past live" className="btn btn--ghost btn--lg" href={`/workshops/${w.slug}`}>{w.youtube ? "Watch the recording" : "Read the summary"} <Icon name="arrow" className="i--arrow" /></Link>
        </div>
      </div>
      <Art name={w.art} />
    </article>
  );
}
