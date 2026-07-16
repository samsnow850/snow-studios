## Goal

A single Apple-inspired site that showcases you and your three apps, with a fixed floating rounded navbar and an "Apps" dropdown so visitors can jump into any app's page. Each app becomes a page on this site (e.g. `/apps/sf-popos`) — real subdomains can be wired later via DNS without changing the build.

## Sitemap

```text
/                  Landing — hero + about + apps grid
/apps/sf-popos     SF POPOS detail page
/apps/ny-pops      NY POPS detail page
/apps/shelf-track  Shelf Track detail page
```

Each route is a real TanStack Start file route with its own `head()` (title, description, og:title/description, og:image) so links share cleanly and each page is independently indexable.

## Global chrome

- **Floating navbar**: fixed top, centered, rounded-full pill with soft shadow and subtle backdrop blur. Links: Home · About · Apps ▾. The Apps dropdown lists SF POPOS, NY POPS, Shelf Track with a small icon + name + one-line tagline for each.
- **Footer**: your name, a short line, and links back to each app's App Store / Play Store page.

## Landing page (`/`)

1. **Hero** — big display headline ("Small apps that solve real problems"), your short intro, subtle App Store / Play Store badges linking to your most recent app.
2. **About** — uses the copy you provided: "I'm a developer who enjoys building useful, polished apps that solve real problems. I focus on creating simple, thoughtful experiences and turning ideas into products people can actually use."
3. **Apps grid** — three large cards (SF POPOS, NY POPS, Shelf Track), each with app icon, name, one-line pitch, platform badges, and a "Learn more →" link to its page.

## App pages

Each app page follows the same template, filled with content pulled from the app's existing site:

- Hero: app icon, name, one-liner, App Store + Play Store badges (where applicable).
- Screenshots row (phone mockups).
- Features section (3–6 features from the source site).
- Short "Why it exists" paragraph.
- Back-to-all-apps link.

Per-app content sourced now:

- **SF POPOS** (`/apps/sf-popos`) — "Find San Francisco's hidden public spaces." Features: Explore every POPOS (80+), find spots near you on a map, save favorites. iOS + Android.
- **NY POPS** (`/apps/ny-pops`) — "New York's hidden public places." Free/clean spots across NYC, map-based discovery. iOS + Android.
- **Shelf Track** (`/apps/shelf-track`) — "Track stock, manage shelves." Home inventory for iOS/iPadOS: shelves, quantities, photos, ordering lists (On shelf / Need to order / Ordered), cloud sync with Apple/Google sign-in.

## Design direction (clean light / Apple-like)

- **Palette**: near-white background (#fbfbfd), deep near-black text (#1d1d1f), soft grey surfaces, single blue accent (#0071e3) for links/CTAs.
- **Type**: SF-style stack — Inter Tight (or similar) for large display headings, Inter for body. Tight tracking on headlines, generous line-height on body.
- **Feel**: lots of whitespace, large rounded-2xl/3xl cards, soft layered shadows, no gradients-for-the-sake-of-it. Subtle fade/slide-up on section entry only.
- **Nav**: floating pill (`rounded-full`, `backdrop-blur`, subtle border + shadow), stays centered on scroll.

## Technical notes

- Add routes under `src/routes/`: rewrite `index.tsx`, add `apps.sf-popos.tsx`, `apps.ny-pops.tsx`, `apps.shelf-track.tsx` (flat dot-file routing — no `_app` folder).
- Shared components in `src/components/`: `SiteNav`, `SiteFooter`, `AppCard`, `AppPageLayout`, `StoreBadges`.
- Tokens (palette, radii, shadows) added to `src/styles.css` under `@theme`; no hardcoded colors in components.
- `head()` per route with unique title/description/og text. `og:image` added on leaf app pages once hero images are generated; the root uses default hosting preview.
- Generate app-specific hero art / icon-style illustrations via image generation (saved to `src/assets/`) rather than hotlinking the existing sites' images, so this site owns its assets.
- Real subdomains (e.g. `sfpopos.samuel.app`) can be pointed at these same routes later via DNS + hosting config — no code change required.

## Out of scope for this build

- Backend, auth, analytics, contact form (can be added later).
- Migrating the existing standalone app sites — they stay live; this becomes the umbrella hub.
