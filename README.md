# Nunnari Academy — Website

A minimal, fast site for Nunnari Academy: white-and-violet theme, small micro-interactions, and lightweight animated illustrations.
It is static HTML, CSS and JavaScript with **no dependencies and no framework**.

## Run it

```bash
npm run dev     # builds to dist/ and serves http://localhost:5173 (rebuilds on save)
npm run build   # one-off build to dist/
```

Requires Node 18.17+. Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3):
the build command is `npm run build` and the output directory is `dist`.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: hero, Who We Are (5 stacked scroll cards), Impact, tabbed Programs, Events, callback, footer |
| `explore.html` | Featured workshop, weekly free Saturday session, filterable events, testimonials, community |
| `programs.html` | Recorded / Regular / Premium overview, tabbed details, 12-week tracks |
| `recorded-programme.html` | Recorded Programme page |
| `regular-programme.html` | Regular Programme page (growth, who can join, tools, outcomes, FAQ) |
| `premium-programme.html` | Premium Programme page |
| `partner-institutions.html` | Partner with us: institutions |
| `partner-corporates.html` | Partner with us: corporates |
| `help.html`, `terms.html`, `privacy.html`, `refund.html` | Support and legal |

## Structure

```
src/
  pages/      one HTML file per page (top comment sets title / description / active nav)
  partials/   header, footer, icons, logo mark, programs catalogue, callback bar, dialog …
  data/       events.mjs: the single list of workshops and events
  css/        main.css: design tokens (brand palette) and components
  js/         main.js: all interactions, no dependencies
  assets/     optimised illustrations (WebP) and logos
build.mjs     zero-dependency build (partials + events → dist/)
serve.mjs     dev server with rebuild on change
```

Include a partial with `<!-- @include name -->`.

## Common edits

- **Add or update an event:** edit `src/data/events.mjs`. The new event shows up on the Home carousel and on Explore.
  Cards whose date has passed are marked "Completed" automatically in the browser. Set `featured: true` to use an event as the Explore hero.
- **Change colours:** edit the tokens at the top of `src/css/main.css`. They come from the brand palette sheet.
- **Enquiry forms:** "Talk to us", "Request a Call", "Register", "Enroll" and "Partner with us" all open one dialog (`src/partials/dialog.html`).
  It currently opens a pre-filled email to `hello@nunnari.academy`. To use your CRM or form backend instead, replace the `submit` handler in `src/js/main.js` (search for "Enquiry dialog").

## Motion and performance

- Animations use only `transform` and `opacity`. Looping animations pause when they scroll off screen or the tab is hidden.
- All motion is turned off when the visitor has `prefers-reduced-motion` set.
- Illustrations are layered scenes built in CSS, SVG and canvas (`src/partials/scene-*.html`, `src/css/scenes.css`, `src/js/scenes.js`): glass panels, 3D spheres, light and pointer parallax. They stay crisp at any size and weigh a few KB.
- The hero's particle background is built from the Nunnari logo grid and reacts to the cursor; the community globe is a canvas dot-sphere with travelling arcs.
- The five provided illustrations are served as responsive WebP (480w and 800w) and load lazily.
- The CSS and JS together are under 100 KB uncompressed.
