import type { Metadata } from "next";
import ProgramPage from "@/components/templates/ProgramPage";
import { programs } from "@/lib/programs";

const p = programs.regular;
export const metadata: Metadata = {
  title: `${p.name} — ${p.title.join(" ")}`,
  description: p.lead,
  alternates: { canonical: "/programs/regular" },
};

export default function RegularPage() {
  return <ProgramPage id="regular" />;
}
