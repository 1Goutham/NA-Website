"use client";

import { useEffect, useState } from "react";
import Icon, { type IconName } from "@/components/Icon";

const PILLS: { id: string; label: string; icon: IconName }[] = [
  { id: "events", label: "Workshops", icon: "calendar" },
  { id: "testimonials", label: "Testimonials", icon: "message" },
  { id: "community", label: "Community", icon: "globe" },
];

/** Explore page navigation (doc): Workshops | Testimonials | Community — highlights the section in view. */
export default function JumpPills() {
  const [active, setActive] = useState("events");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    PILLS.forEach((p) => { const el = document.getElementById(p.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="pills" aria-label="Explore sections">
      {PILLS.map((p) => (
        <a key={p.id} href={`#${p.id}`} className={active === p.id ? "is-active" : undefined} aria-current={active === p.id ? "true" : undefined}>
          <Icon name={p.icon} />{p.label}
        </a>
      ))}
    </nav>
  );
}
