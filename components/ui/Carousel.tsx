"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Icon from "@/components/Icon";
import clsx from "@/lib/clsx";

type Props = {
  children: ReactNode;
  label: string;
  /** "side" = round buttons on the card edges, "none" = render controls elsewhere via renderControls */
  nav?: "side" | "none";
  renderControls?: (c: { prev: () => void; next: () => void; canPrev: boolean; canNext: boolean }) => ReactNode;
  className?: string;
  trackId?: string;
};

/** Scroll-snap carousel with arrow buttons, pagination dots and keyboard/touch support. */
export default function Carousel({ children, label, nav = "side", renderControls, className, trackId }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const t = track.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    setCanPrev(t.scrollLeft > 4);
    setCanNext(t.scrollLeft < max - 4);
    const n = Math.max(1, Math.ceil((t.scrollWidth - 4) / t.clientWidth));
    setPages(n);
    setPage(Math.min(n - 1, Math.round(t.scrollLeft / t.clientWidth)));
  }, []);

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    sync();
    let raf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; sync(); }); };
    t.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(t);
    const mo = new MutationObserver(() => { t.scrollTo({ left: 0 }); requestAnimationFrame(sync); });
    mo.observe(t, { subtree: true, attributes: true, attributeFilter: ["hidden"] });
    return () => { t.removeEventListener("scroll", onScroll); ro.disconnect(); mo.disconnect(); };
  }, [sync]);

  const step = () => {
    const t = track.current!;
    const first = [...t.children].find((c) => !(c as HTMLElement).hidden) as HTMLElement | undefined;
    return first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(t).columnGap || "24") : t.clientWidth;
  };
  const prev = () => track.current?.scrollBy({ left: -step(), behavior: "smooth" });
  const next = () => track.current?.scrollBy({ left: step(), behavior: "smooth" });

  return (
    <div className={clsx("carousel", className)}>
      {renderControls?.({ prev, next, canPrev, canNext })}
      {nav === "side" && (
        <button className="icon-btn carousel__nav carousel__nav--prev" type="button" onClick={prev} disabled={!canPrev} aria-label="Previous">
          <Icon name="arrow-left" />
        </button>
      )}
      <div className="carousel__track" ref={track} id={trackId} tabIndex={0} role="region" aria-label={label} data-lenis-prevent-wheel="">
        {children}
      </div>
      {nav === "side" && (
        <button className="icon-btn carousel__nav carousel__nav--next" type="button" onClick={next} disabled={!canNext} aria-label="Next">
          <Icon name="arrow" />
        </button>
      )}
      {pages > 1 && (
        <div className="carousel__dots">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} type="button" aria-label={`Go to slide ${i + 1}`} aria-current={i === page}
              onClick={() => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: "smooth" })} />
          ))}
        </div>
      )}
    </div>
  );
}
