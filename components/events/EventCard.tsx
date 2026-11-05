import Link from "next/link";
import Icon from "@/components/Icon";
import Art from "@/components/ui/Art";
import { fmtDate, fmtDuration } from "@/lib/format";
import { whenOf } from "@/lib/when";
import type { Workshop } from "@/lib/workshops";

export type WorkshopCard = Omit<Workshop, "summaryHtml">;

/** Workshop card. Upcoming → Register Now. Live → closed. Completed → recording & summary. */
export default function EventCard({ w }: { w: WorkshopCard }) {
  const href = `/workshops/${w.slug}`;
  return (
    <article className="card event" data-date={w.start} data-end={w.end} data-when={whenOf(w.start, w.end)}>
      <Art name={w.art} />
      <div className="event__body">
        <div className="event__top">
          <span className="tag" data-show="upcoming">{w.type}</span>
          <span className="tag tag--live" data-show="live">Live now</span>
          <span className="tag tag--done" data-show="past">{w.youtube ? "Recording" : "Completed"}</span>
          <span className="card__meta"><Icon name="calendar" />{fmtDate(w.start)}</span>
        </div>
        <h3><Link href={href}>{w.title}</Link></h3>
        <p className="clamp3">{w.description || [w.type, w.mode, fmtDuration(w.start, w.end)].join(" · ")}</p>
        <div className="event__foot">
          <span className="card__meta"><Icon name="monitor" />{w.mode}</span>
          <span data-show="upcoming">
            {w.register
              ? <a className="btn btn--primary btn--sm" href={w.register} target="_blank" rel="noopener">Register Now <Icon name="arrow-ur" className="i--ur" /></a>
              : <button className="btn btn--primary btn--sm" type="button" data-enquire={`Register: ${w.title}`}>Register Now <Icon name="arrow" className="i--arrow" /></button>}
          </span>
          <span data-show="live"><span className="btn btn--ghost btn--sm" aria-disabled="true">Registration closed</span></span>
          <Link data-show="past" className="link" href={href}>{w.youtube ? "Watch recording" : "View summary"} <Icon name="arrow-ur" /></Link>
        </div>
      </div>
    </article>
  );
}
