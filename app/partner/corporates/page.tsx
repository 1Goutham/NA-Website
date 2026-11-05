import type { Metadata } from "next";
import PartnerPage from "@/components/templates/PartnerPage";

export const metadata: Metadata = {
  title: "Partner with us — Corporates",
  description: "Practical, industry-ready AI training for your teams, with custom programmes designed for real business impact.",
  alternates: { canonical: "/partner/corporates" },
};
export default function CorporatesPage() { return <PartnerPage id="corporates" />; }
