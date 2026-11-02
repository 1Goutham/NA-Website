import { arts } from "@/lib/events";

/** Neon line-art for an event card. Static SVG markup from our own data file. */
export default function EventArt({ art }: { art: string }) {
  return (
    <>
      <span className="stars" aria-hidden="true" />
      <span className="gs__floor" aria-hidden="true" />
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: arts[art] ?? "" }} />
    </>
  );
}
