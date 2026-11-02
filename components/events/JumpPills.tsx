"use client";

import { useState } from "react";
import Icon, { type IconName } from "@/components/Icon";

const PILLS: { key: string; label: string; icon: IconName }[] = [
  { key: "workshops", label: "Workshops", icon: "calendar" },
  { key: "hackathons", label: "Hackathons", icon: "zap" },
  { key: "community", label: "Community Events", icon: "users" },
  { key: "past", label: "Past Events", icon: "history" },
];

/** Hero shortcut pills on Explore: scroll to the list and apply its filter. */
export default function JumpPills() {
  const [active, setActive] = useState("workshops");
  return (
    <nav className="pills" aria-label="Jump to events">
      {PILLS.map((p) => (
        <a key={p.key} href="#events" className={active === p.key ? "is-active" : undefined}
          onClick={() => { setActive(p.key); dispatchEvent(new CustomEvent("events:filter", { detail: p.key })); }}>
          <Icon name={p.icon} />{p.label}
        </a>
      ))}
    </nav>
  );
}
