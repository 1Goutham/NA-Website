import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = ["", "/explore", "/programs", "/programs/recorded", "/programs/regular", "/programs/premium", "/partner/institutions", "/partner/corporates", "/help", "/terms", "/privacy", "/refund"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: r.startsWith("/programs") || r === "/explore" ? "weekly" : "monthly", priority: r === "" ? 1 : r.startsWith("/programs") ? 0.9 : 0.6 }));
}
