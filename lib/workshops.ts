import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Workshops are markdown files in content/workshops (same mechanism as the Nunnari Labs blog):
 * front matter = card details, body = the summary shown after the workshop.
 * Add a file → it appears on Home, /explore and gets its own page at /workshops/<file-name>.
 */
export type Workshop = {
  slug: string;
  title: string;
  description: string;
  type: string;
  start: string;
  end: string;
  mode: string;
  speaker?: string;
  language?: string;
  art: string;
  register?: string;
  youtube?: string;
  featured?: boolean;
  summaryHtml: string;
};

const DIR = path.join(process.cwd(), "content/workshops");
const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : String(v ?? ""));

function read(file: string): Workshop | null {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (data.draft) return null;
  return {
    slug: file.replace(/\.mdx?$/, ""),
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    type: String(data.type ?? "Webinar"),
    start: iso(data.start),
    end: iso(data.end || data.start),
    mode: String(data.mode ?? "Online"),
    speaker: data.speaker || undefined,
    language: data.language || undefined,
    art: String(data.art ?? "agent"),
    register: data.register || undefined,
    youtube: data.youtube || undefined,
    featured: Boolean(data.featured),
    summaryHtml: marked.parse(content.replace(/<!--[\s\S]*?-->/g, "").trim(), { async: false }) as string,
  };
}

export function getWorkshops(): Workshop[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map(read)
    .filter((w): w is Workshop => !!w)
    .sort((a, b) => +new Date(b.start) - +new Date(a.start));
}

export function getWorkshop(slug: string) {
  return getWorkshops().find((w) => w.slug === slug) ?? null;
}

/** The workshop to spotlight: the next upcoming one, else the one marked featured, else the latest. */
export function getSpotlight<T extends { start: string; featured?: boolean }>(list: T[], now = Date.now()): T | null {
  const upcoming = list.filter((w) => +new Date(w.start) > now).sort((a, b) => +new Date(a.start) - +new Date(b.start));
  return upcoming[0] ?? list.find((w) => w.featured) ?? list[0] ?? null;
}
