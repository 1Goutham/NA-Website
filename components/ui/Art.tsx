import { workshopArts } from "@/lib/art";
import { arts3d } from "@/lib/art3d";
import Scene3D from "./Scene3D";

/**
 * Illustration panel.
 * - Workshop drawings → dark panel with glowing line art.
 * - Everything else   → light stage with a real-time, interactive 3D scene
 *                       (the static isometric drawing is the poster / fallback).
 */
export default function Art({ name, className = "", label }: { name: string; className?: string; label?: string }) {
  const is3d = name in arts3d;
  const svg = is3d ? arts3d[name] : workshopArts[name] ?? "";
  return (
    <div className={`art ${is3d ? "art--3d" : "art--dark"} ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {!is3d && <span className="art__stars" />}
      <span className="art__floor" />
      <svg className="art__poster" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" focusable="false" dangerouslySetInnerHTML={{ __html: svg }} />
      {is3d && <Scene3D name={name} />}
    </div>
  );
}
