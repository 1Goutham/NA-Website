import type { Metadata } from "next";
import ProgramPage from "@/components/templates/ProgramPage";
import { programs } from "@/lib/programs";

const p = programs.premium;
export const metadata: Metadata = {
  title: `${p.name} — ${p.title.join(" ")}`,
  description: p.lead,
  alternates: { canonical: "/programs/premium" },
};

export default function PremiumPage() {
  return <ProgramPage id="premium" />;
}
