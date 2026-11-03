"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Progressive-enhancement layer for the static, server-rendered content:
 * scroll reveals, counters, cursor spotlight, magnetic CTAs, scene parallax,
 * add-to-calendar buttons and live event status. Re-binds on every route change.
 */
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T & Element>(s)] as T[];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];
    const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Document | Window, ev: K | string, fn: EventListener, opts?: AddEventListenerOptions) => {
      el.addEventListener(ev, fn, opts);
      cleanups.push(() => el.removeEventListener(ev, fn, opts));
    };

    /* reveal on scroll */
    const revealIO = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); revealIO.unobserve(en.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    $$("[data-reveal], [data-split], [data-inview]").forEach((el) => revealIO.observe(el));
    cleanups.push(() => revealIO.disconnect());

    /* pause looping animations offscreen */
    const pauseIO = new IntersectionObserver((entries) => entries.forEach((en) => en.target.classList.toggle("is-paused", !en.isIntersecting)));
    $$(".gs, .marquee, .deco, .event__art").forEach((el) => pauseIO.observe(el));
    cleanups.push(() => pauseIO.disconnect());

    /* counters */
    const fmt = (n: number) => n.toLocaleString("en-IN");
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        countIO.unobserve(en.target);
        const el = en.target as HTMLElement;
        const end = parseFloat(el.dataset.count || "0");
        const pre = el.dataset.prefix || "";
        const suf = el.dataset.suffix || "";
        if (reduced) { el.textContent = pre + fmt(end) + suf; return; }
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1600);
          el.textContent = pre + fmt(Math.round(end * (1 - Math.pow(1 - p, 4)))) + suf;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach((el) => countIO.observe(el));
    cleanups.push(() => countIO.disconnect());

    if (fine && !reduced) {
      /* spotlight */
      on(document, "pointermove", ((e: PointerEvent) => {
        const el = (e.target as Element)?.closest?.(".spot") as HTMLElement | null;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }) as EventListener, { passive: true });

      /* magnetic buttons */
      $$("[data-magnetic]").forEach((el) => {
        on(el, "pointermove", ((e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
        }) as EventListener);
        on(el, "pointerleave", () => { el.style.transform = ""; });
      });

      /* hero glow */
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      const glow = hero?.querySelector<HTMLElement>(".hero__glow");
      if (hero && glow) on(hero, "pointermove", ((e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        glow.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
        glow.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
      }) as EventListener, { passive: true });

      /* scene parallax */
      $$("[data-scene]").forEach((sc) => {
        const host = (sc.closest("section") as HTMLElement) || sc;
        let raf = 0;
        on(host, "pointermove", ((e: PointerEvent) => {
          const r = sc.getBoundingClientRect();
          const x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
          const y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
          if (!raf) raf = requestAnimationFrame(() => { raf = 0; sc.style.setProperty("--mx", x.toFixed(3)); sc.style.setProperty("--my", y.toFixed(3)); });
        }) as EventListener, { passive: true });
        on(host, "pointerleave", () => { sc.style.setProperty("--mx", "0"); sc.style.setProperty("--my", "0"); });
      });
    }

    /* live event status: cards are disabled once the event has started (doc: Explore page) */
    const now = Date.now();
    document.querySelectorAll<HTMLElement>("[data-date]").forEach((card) => {
      const start = new Date(card.dataset.date || "").getTime();
      const end = new Date(card.dataset.end || card.dataset.date || "").getTime();
      if (!(now >= start)) return;
      const ended = now > end;
      card.classList.add("is-closed");
      if (ended) card.classList.add("is-past");
      const badge = card.querySelector<HTMLElement>("[data-status]");
      if (badge) {
        badge.textContent = ended ? "Completed" : "Live now";
        badge.classList.toggle("badge--past", ended);
        if (ended) badge.classList.remove("badge--dot");
      }
      card.querySelectorAll<HTMLButtonElement>("[data-register]").forEach((btn) => {
        btn.disabled = true;
        btn.setAttribute("aria-disabled", "true");
        const lbl = btn.querySelector<HTMLElement>("[data-register-label]");
        if (lbl) lbl.textContent = ended ? "Event completed" : "Registration closed";
      });
      const fb = card.querySelector<HTMLElement>("[data-featured-status]");
      if (fb) fb.textContent = ended ? (fb.dataset.pastLabel || "Recent Workshop") : "Happening now";
    });

    /* add to calendar (.ics) */
    $$("[data-ics]").forEach((b) => on(b, "click", () => {
      const d = b.dataset;
      const stamp = (x: string | number) => new Date(x).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
      const ymd = (x: Date) => `${x.getFullYear()}${String(x.getMonth() + 1).padStart(2, "0")}${String(x.getDate()).padStart(2, "0")}`;
      let when: string[];
      if ("icsAllday" in d) {
        const s = new Date(); s.setDate(s.getDate() + ((6 - s.getDay() + 7) % 7));
        const e = new Date(s); e.setDate(s.getDate() + 1);
        when = [`DTSTART;VALUE=DATE:${ymd(s)}`, `DTEND;VALUE=DATE:${ymd(e)}`];
        if ("icsWeekly" in d) when.push("RRULE:FREQ=WEEKLY;BYDAY=SA");
      } else {
        when = [`DTSTART:${stamp(d.icsStart!)}`, `DTEND:${stamp(d.icsEnd!)}`, "LOCATION:Online"];
      }
      const title = d.icsTitle || "Nunnari Academy event";
      const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nunnari Academy//Events//EN", "BEGIN:VEVENT",
        `UID:${Date.now()}@nunnari.academy`, `DTSTAMP:${stamp(Date.now())}`, ...when, `SUMMARY:${title}`,
        `DESCRIPTION:${(d.icsDesc || "").replace(/\n/g, "\\n")}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
      a.download = title.replace(/[^\w]+/g, "-").replace(/^-|-$/g, "").toLowerCase() + ".ics";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      const lbl = b.querySelector<HTMLElement>("[data-label]");
      if (lbl) { const o = lbl.textContent; lbl.textContent = "Added ✓"; setTimeout(() => (lbl.textContent = o), 2200); }
    }));

    $$("[data-to-top]").forEach((b) => on(b, "click", () => {
      scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    }));

    const vis = () => document.body.classList.toggle("is-paused", document.hidden);
    on(document, "visibilitychange", vis);

    return () => cleanups.forEach((f) => f());
  }, [pathname]);

  return null;
}
