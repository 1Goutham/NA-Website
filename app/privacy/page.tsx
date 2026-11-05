import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";
import { legal } from "@/lib/legal";

export const metadata: Metadata = { title: legal.privacy.title, description: legal.privacy.description, alternates: { canonical: "/privacy" } };
export default function PrivacyPage() { return <LegalPage id="privacy" />; }
