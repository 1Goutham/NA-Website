import type { Metadata } from "next";
import ProgramPage from "@/components/templates/ProgramPage";
import { programs } from "@/lib/programs";

const p = programs.recorded;
export const metadata: Metadata = {
  title: `${p.name} — ${p.title.join(" ")}`,
  description: p.lead,
  alternates: { canonical: "/programs/recorded" },
};

export default function RecordedPage() {
  return <ProgramPage id="recorded" />;
}
