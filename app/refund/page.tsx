import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";
import { legal } from "@/lib/legal";

export const metadata: Metadata = { title: legal.refund.title, description: legal.refund.description, alternates: { canonical: "/refund" } };
export default function RefundPage() { return <LegalPage id="refund" />; }
