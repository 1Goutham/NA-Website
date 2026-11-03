import Icon from "@/components/Icon";
import EventArt from "./EventArt";
import { fmtDate, type EventItem } from "@/lib/events";

/** Event card. variant="compact" (home carousel) or "detail" (explore). Status (Completed) is set client-side by date. */
export default function EventCard({ e, variant = "compact" }: { e: EventItem; variant?: "compact" | "detail" }) {
  return (
    <article className="card card--hover spot event" data-date={e.start} data-end={e.end} data-cat={e.cats.join(" ")}>
      <div className="event__art art"><EventArt art={e.art} /></div>
      <div className="event__body">
        <div className="event__meta">
          <span className="badge badge--dot badge--soft" data-status="">{e.type}</span>
          {variant === "compact" && <span className="event__date"><Icon name="calendar" />{fmtDate(e.start)}</span>}
        </div>
        <h3>{e.title}</h3>
        {variant === "compact" ? (
          <>
            <p>{e.desc || e.speaker || ""}</p>
            <div className="event__foot">
              <span><Icon name="monitor" />{e.mode} • {e.duration}</span>
              <button className="event__go" type="button" data-register="" data-enquire={`Register: ${e.title}`} aria-label={`Register for ${e.title}`}><Icon name="arrow" /></button>
            </div>
          </>
        ) : (
          <>
            <div className="event__list">
              <span><Icon name="calendar" />{fmtDate(e.start)}</span>
              <span><Icon name="clock" />{e.time}</span>
              <span><Icon name="monitor" />{e.mode}</span>
              {e.speaker && <span><Icon name="user" />{e.speaker}</span>}
            </div>
            <div className="event__foot">
              <button className="btn btn--primary btn--sm" type="button" data-register="" data-enquire={`Register: ${e.title}`}><span data-register-label="">Register Now</span> <Icon name="arrow" className="i--arrow" /></button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
