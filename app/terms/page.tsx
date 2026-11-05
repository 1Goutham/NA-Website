import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";
import { legal } from "@/lib/legal";

export const metadata: Metadata = { title: legal.terms.title, description: legal.terms.description, alternates: { canonical: "/terms" } };
export default function TermsPage() { return <LegalPage id="terms" />; }
