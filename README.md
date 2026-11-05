# Nunnari Academy — Website

Next.js (App Router, TypeScript) site for Nunnari Academy — School of AI.
Light theme: neutral ink text, one brand violet, sharp structured shapes. Every illustration panel (programmes, partners, workshops, CTAs) is a real-time 3D model in the same light studio.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (every page is pre-built static HTML)
npm start          # serve the production build
npm run typecheck
```

Requires Node 22. Vercel detects it as a Next.js project automatically.

## Add a workshop (no code)

Workshops work like the Nunnari Labs blog: one markdown file per workshop in `content/workshops/`.

1. Copy `content/workshops/_TEMPLATE.md` and rename it, e.g. `intro-to-rag.md`. The file name becomes the page address: `/workshops/intro-to-rag`.
2. Fill in the details at the top: title, description, start and end time, mode, speaker, which illustration to use (`art:` robot | store | agent | graph | agentic | stack | community), and `draft: false`.
3. Commit. The workshop appears on Home and Explore and gets its own page.

Before the start time the card shows **Register Now**. While the event is running it shows **Registration closed**. Afterwards it shows **Watch recording** or **View summary**. The state is checked in the visitor's browser, so it updates without a rebuild.

After the event, paste the YouTube link into `youtube:` and write the summary under the `---` (markdown). The workshop page then shows the recording followed by the summary.

## Structure

```
app/                     one folder per route; programs/layout.tsx adds the sticky "Still confused?" bar
  workshops/[slug]/      workshop pages, generated from content/workshops
content/workshops/       workshop markdown files
components/
  ui/Blocks.tsx          the shared page parts: PageHero, Head (section heading), Card, Cta
  ui/Art.tsx             illustration panel: 3D model (ui/Stage.tsx → lib/scene), line art (lib/art.ts) as the no-WebGL fallback
  templates/             ProgramPage, PartnerPage, LegalPage: pages of the same kind share one template
  sections/              home sections (Hero, WhyCards, WhoWeAre, Company, Impact, ProgramsCatalog …)
  events/                workshop card, carousel, list, spotlight, YouTube, add-to-calendar
  Header, Footer, Enquiry (contact form), Effects (scroll reveals, counters, workshop state)
lib/                     all content: site & nav, programs, partners, legal, testimonials, workshop loader
styles/theme.css         the whole design system (tokens at the top)
public/assets/           brand logos, partner college logos, illustrations
```

## Common edits

- **Programme content:** `lib/programs.ts`. All three programme pages and the home catalogue read from it.
- **Partner pages (offers, logos, stats, quotes):** `lib/partners.ts`.
- **Contact details, socials, navigation:** `lib/site.ts`.
- **Colours:** the tokens at the top of `styles/theme.css`. The 3D studio backdrop (`--stage`) is mirrored in `lib/scene/stage.ts`.
- **Illustrations:** add or change a model in `lib/scene/models.ts` (built from the shared material kit so it matches the rest).
- **Contact form:** posts to `app/api/enquiry/route.ts`. Set `ENQUIRY_WEBHOOK_URL` in Vercel to forward submissions to your CRM, Google Sheet, Zapier or Slack.
- **Brochures:** put the PDFs in `public/brochures/` and set their paths in `lib/programs.ts` (`brochures`).

## Performance

- Every page is static HTML. Native scrolling. No animation library.
- The hero background is a WebGL shader rendered at low resolution. It pauses off screen and falls back to CSS when WebGL is unavailable.
- 3D illustrations (three.js, `lib/scene/stage.ts` for the studio, `lib/scene/models.ts` for the models) load only near the viewport, render only while on screen and visible, and skip hidden tab panels. With reduced motion they render a still frame. Without WebGL the panel shows its plain stage (and line art for workshops).
- Line-art animations pause off screen. All motion is off for visitors with `prefers-reduced-motion`.
