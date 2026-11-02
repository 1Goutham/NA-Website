import type { ReactNode } from "react";
import clsx from "@/lib/clsx";

/** Infinite marquee: content rendered twice, CSS translates the pair. Pauses on hover. */
export default function Marquee({ children, duration = 40, reverse, className }: { children: ReactNode; duration?: number; reverse?: boolean; className?: string }) {
  return (
    <div className={clsx("marquee", reverse && "marquee--reverse", className)} style={{ "--dur": `${duration}s` } as React.CSSProperties}>
      <div className="marquee__track">{children}</div>
      <div className="marquee__track" aria-hidden="true" inert>{children}</div>
    </div>
  );
}
