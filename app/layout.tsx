import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IconSprite from "@/components/IconSprite";
import EnquiryProvider from "@/components/Enquiry";
import Effects from "@/components/Effects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Nunnari Academy — Learn AI. Create What Doesn’t Exist Yet.", template: "%s | Nunnari Academy" },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", site: "@NunnariLabs" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#5b2ee8", width: "device-width", initialScale: 1, viewportFit: "cover" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  alternateName: "Nunnari Academy — School of AI",
  url: site.url,
  email: site.email,
  telephone: site.phone.label,
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* reveal animations only when JS runs, so content is never hidden without it */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <IconSprite />
        <EnquiryProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </EnquiryProvider>
        <Effects />
      </body>
    </html>
  );
}
