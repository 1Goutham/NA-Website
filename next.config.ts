import type { NextConfig } from "next";

// Old static-site URLs → new routes (keeps shared links and search results working)
const legacy: Record<string, string> = {
  "/index.html": "/",
  "/explore.html": "/explore",
  "/programs.html": "/programs",
  "/recorded-programme.html": "/programs/recorded",
  "/regular-programme.html": "/programs/regular",
  "/premium-programme.html": "/programs/premium",
  "/partner-institutions.html": "/partner/institutions",
  "/partner-corporates.html": "/partner/corporates",
  "/help.html": "/help",
  "/terms.html": "/terms",
  "/privacy.html": "/privacy",
  "/refund.html": "/refund",
  "/workshops": "/explore",
  "/courses": "/programs",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return Object.entries(legacy).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [{ source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }];
  },
};

export default nextConfig;
