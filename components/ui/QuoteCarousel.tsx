"use client";

import type { ReactNode } from "react";
import Carousel from "./Carousel";
import Icon from "@/components/Icon";

/** Section head + arrow controls + card carousel (partner testimonials). */
export default function QuoteCarousel({ head, children, label }: { head: ReactNode; children: ReactNode; label: string }) {
  return (
    <Carousel
      label={label}
      nav="none"
      renderControls={({ prev, next, canPrev, canNext }) => (
        <div className="section-head section-head--split">
          {head}
          <div style={{ display: "flex", gap: 12 }}>
            <button className="icon-btn icon-btn--soft" type="button" onClick={prev} disabled={!canPrev} aria-label="Previous"><Icon name="arrow-left" /></button>
            <button className="icon-btn icon-btn--soft" type="button" onClick={next} disabled={!canNext} aria-label="Next"><Icon name="arrow" /></button>
          </div>
        </div>
      )}
    >
      {children}
    </Carousel>
  );
}
