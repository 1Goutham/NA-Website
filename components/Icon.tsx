import clsx from "@/lib/clsx";

export type IconName =
  | "arrow" | "arrow-left" | "arrow-ur" | "arrow-up" | "chevron" | "chevron-r" | "message" | "book" | "laptop" | "cap"
  | "users" | "user" | "target" | "eye" | "spark" | "star4" | "code" | "lang" | "folder" | "monitor" | "globe" | "calendar"
  | "calendar-plus" | "clock" | "play" | "crown" | "check" | "phone" | "phone-wave" | "mail" | "building" | "uni"
  | "briefcase" | "chart" | "trend" | "star" | "bulb" | "layers" | "rocket" | "plus" | "zap" | "history" | "shield" | "cpu"
  | "box" | "infinity" | "award" | "file" | "image" | "handshake" | "route" | "wrench" | "linkedin" | "x" | "instagram"
  | "youtube" | "close" | "network";

export default function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={clsx("i", className)} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}
