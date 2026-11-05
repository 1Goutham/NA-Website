import { workshopArts } from "@/lib/art";
import Stage from "./Stage";

/**
 * Illustration panel: a real-time 3D model in the shared light studio (lib/scene).
 * Workshop panels keep their line drawing underneath as the no-WebGL fallback.
 */
export default function Art({ name, className = "", label }: { name: string; className?: string; label?: string }) {
  const svg = workshopArts[name];
  return (
    <div className={`art ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {svg && <svg className="art__poster" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" focusable="false" dangerouslySetInnerHTML={{ __html: svg }} />}
      <Stage name={name} />
    </div>
  );
}
