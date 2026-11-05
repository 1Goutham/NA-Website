import { workshopArts } from "@/lib/art";
import { particleNames } from "@/lib/particles/shapes";
import Particles from "./Particles";

/**
 * Illustration panel.
 * - Workshop drawings → dark panel with glowing line art.
 * - Everything else   → light stage with an interactive particle formation (lib/particles).
 */
export default function Art({ name, className = "", label }: { name: string; className?: string; label?: string }) {
  const fx = particleNames.includes(name);
  return (
    <div className={`art ${fx ? "art--fx" : "art--dark"} ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {!fx && <span className="art__stars" />}
      <span className="art__floor" />
      {fx ? <Particles name={name} /> : <svg className="art__poster" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" focusable="false" dangerouslySetInnerHTML={{ __html: workshopArts[name] ?? "" }} />}
    </div>
  );
}
