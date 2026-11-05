import { arts } from "@/lib/art";

/** Line-art panel — the single illustration style used across the site. */
export default function Art({ name, className = "", label }: { name: string; className?: string; label?: string }) {
  return (
    <div className={`art ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <span className="art__stars" />
      <span className="art__floor" />
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" focusable="false" dangerouslySetInnerHTML={{ __html: arts[name] ?? "" }} />
    </div>
  );
}
