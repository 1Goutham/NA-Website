"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";
import clsx from "@/lib/clsx";

/**
 * "Still Confused?" — a floating call-to-action used only on programme pages.
 * Slides in after the hero, steps aside when the footer is visible, and can be dismissed for the session.
 */
export default function StickyCta() {
  const [past, setPast] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try { setDismissed(sessionStorage.getItem("cta-dismissed") === "1"); } catch {}
    const onScroll = () => setPast(scrollY > Math.min(560, innerHeight * 0.6));
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    const footer = document.querySelector(".site-footer");
    const io = new IntersectionObserver(([en]) => setAtFooter(en.isIntersecting), { rootMargin: "0px 0px -40px 0px" });
    if (footer) io.observe(footer);
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const dismiss = () => { setDismissed(true); try { sessionStorage.setItem("cta-dismissed", "1"); } catch {} };
  const shown = past && !atFooter && !dismissed;

  if (!mounted) return null;
  return createPortal(
    <aside className={clsx("sticky-cta", shown && "is-shown")} aria-label="Request a callback" aria-hidden={!shown} inert={!shown}>
      <div className="sticky-cta__copy"><b>Still confused?</b><small>Request a callback from our team.</small></div>
      <a className="sticky-cta__phone" href={site.phone.href}><Icon name="phone" />{site.phone.label}</a>
      <button className="btn btn--primary btn--sm" type="button" data-enquire="Request a Call">Request a Call <Icon name="arrow-ur" className="i--ur" /></button>
      <button className="sticky-cta__close" type="button" aria-label="Dismiss" onClick={dismiss}><Icon name="close" /></button>
    </aside>,
    document.body,
  );
}
