import type { IconName } from "@/components/Icon";

export const site = {
  name: "Nunnari Academy",
  tagline: "School of AI",
  url: "https://nunnari.academy",
  description:
    "Practical, hands-on AI programs for curious minds – in Tamil and English. Build real skills, create real projects, and be a part of the AI pioneer community.",
  email: "enquiry@nunnari.academy",
  phone: { label: "+91 90033 13175", href: "tel:+919003313175" },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/nunnari-academy/", icon: "linkedin" },
    { label: "X", href: "https://x.com/NunnariLabs", icon: "x" },
    { label: "Instagram", href: "https://www.instagram.com/nunnari.academy/", icon: "instagram" },
    { label: "YouTube", href: "https://www.youtube.com/@NunnariAcademy-v6y", icon: "youtube" },
  ] as { label: string; href: string; icon: IconName }[],
};

export type NavLink = { href: string; title: string; sub: string; icon: IconName };
export type NavItem = { label: string; key: string; href?: string; items?: NavLink[] };

export const nav: NavItem[] = [
  {
    label: "Programs",
    key: "programs",
    items: [
      { href: "/programs/recorded", title: "Recorded Programs", sub: "K12 & College Students", icon: "play" },
      { href: "/programs/regular", title: "Regular Programs", sub: "Beginners (L1)", icon: "users" },
      { href: "/programs/premium", title: "Premium Programs", sub: "Advanced (L3+) & C-Suite", icon: "crown" },
    ],
  },
  {
    label: "Partner with us",
    key: "partner",
    items: [
      { href: "/partner/institutions", title: "Institutional Collaboration", sub: "Academia (MoU)", icon: "uni" },
      { href: "/partner/corporates", title: "Corporate Collaboration", sub: "For Teams & Organisations", icon: "briefcase" },
    ],
  },
  { label: "About Nunnari", key: "about", href: "/#who-we-are" },
  {
    label: "Explore",
    key: "explore",
    items: [
      { href: "/explore#events", title: "Workshops", sub: "Webinars, workshops & sessions", icon: "calendar" },
      { href: "/explore#testimonials", title: "Testimonials", sub: "Learners who found their next step", icon: "message" },
      { href: "/explore#community", title: "Community", sub: "Join our AI community", icon: "globe" },
    ],
  },
];
