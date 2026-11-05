import type { Metadata } from "next";
import PartnerPage from "@/components/templates/PartnerPage";

export const metadata: Metadata = {
  title: "Partner with us — Institutions",
  description: "Industry-aligned AI programmes, expert-led sessions and real-world opportunities for your students.",
  alternates: { canonical: "/partner/institutions" },
};
export default function InstitutionsPage() { return <PartnerPage id="institutions" />; }
