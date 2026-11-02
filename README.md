# Nunnari Academy — Website

Next.js (App Router, TypeScript) site for Nunnari Academy — School of AI.
White-and-violet design system, smooth scrolling, micro-interactions and animated illustrations built in CSS, SVG and canvas.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages prerendered as static HTML)
npm start          # serve the production build
npm run typecheck
```

Requires Node 22. On Vercel it is detected as a Next.js project automatically. No custom build settings are needed.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: WebGL aurora hero, Who We Are scroll story, Impact, tabbed Programs, Events |
| `/explore` | Featured workshop, free Saturday session, filterable events, testimonials, community globe |
| `/programs` | Programme overview, tabbed details, 12-week tracks |
| `/programs/recorded` · `/programs/regular` · `/programs/premium` | One page per programme |
| `/partner/institutions` · `/partner/corporates` | Partner with us |
| `/help` · `/terms` · `/privacy` · `/refund` | Support and legal |

Old `*.html` URLs from the previous static site redirect permanently to these routes (see `next.config.ts`).
`sitemap.xml` and `robots.txt` are generated.

## Structure

```
app/                    routes (page.tsx per route), root layout, programs/layout.tsx (sticky CTA)
components/
  Header, Footer, Mark, Icon, IconSprite
  Enquiry.tsx           site-wide enquiry dialog (any element with data-enquire="Topic" opens it)
  SmoothScroll.tsx      Lenis inertia scrolling
  Effects.tsx           reveals, counters, spotlight, magnetic buttons, scene parallax, .ics, event status
  Split.tsx             headings that animate word by word
  StickyCta.tsx         floating "Still Confused?" bar — programme pages only
  sections/             WhoWeAre (scroll story), ProgramsCatalog (tabs), TrackList, Testimonials
  events/               EventCard, HomeEvents, ExploreEvents (filters), JumpPills, EventArt
  scenes/               animated illustrations (glass, light, depth)
  canvas/               Aurora (WebGL hero background), Globe (community)
  ui/                   Carousel, Accordion, Faq, Marquee, QuoteCarousel
lib/                    site info & navigation, events, programmes, testimonials
styles/                 main.css (design tokens + components), scenes.css (illustrations), v2.css (story, CTA, transitions)
public/assets/          illustrations (WebP) and logos
```

## Common edits

- **Events:** edit `lib/events.ts`. Past events are marked "Completed" automatically in the browser. `featured: true` puts one in the Explore hero.
- **Contact details, socials and navigation:** `lib/site.ts`.
- **12-week tracks:** `lib/programs.ts`.
- **Enquiry form:** `components/Enquiry.tsx`. It currently opens a pre-filled email to `hello@nunnari.academy`; replace `submit` with a call to your CRM or an API route.
- **Colours:** tokens at the top of `styles/main.css`, from the brand palette sheet.

## Motion and performance

- Every page is static HTML; JavaScript only adds interaction (progressive enhancement).
- Smooth scrolling uses Lenis. Animations use `transform` and `opacity`; loops and canvases pause off screen and when the tab is hidden.
- All motion is turned off for visitors with `prefers-reduced-motion`.
- Fonts (Inter, Inter Tight) are self-hosted via Fontsource, so there are no requests to Google at runtime or build time.
- Images go through `next/image` (AVIF/WebP, responsive sizes, lazy loading).
