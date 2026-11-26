# RXR Performance — Automotive Tuning Services Website

Promotional website for automotive ECU tuning, car coding, and diagnostic services. Static HTML/CSS/JS site, **one page** (since 2026-10-20), with a dynamic vehicle database for performance lookup.

**Domain**: rxr-performance.ro
**Repo**: github.com/raresroca05/rxr-performance
**Hosting**: GitHub Pages

## Tech Stack

| Layer          | Technology                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| HTML           | HTML5 (semantic, Schema.org structured data), inline SVG icon sprite (`<symbol id="i-…">` + `<use>`)       |
| CSS            | Custom CSS only, one file `assets/css/main.css` (tokens in `:root`). No framework.                         |
| JavaScript     | Vanilla ES6+ (IIFE modules), all `defer`                                                                   |
| Fonts          | Google Fonts in one non-blocking request (`media=print` swap): Geist (wght 400-700, all text), Geist Mono (400-500, small labels), Instrument Serif italic (accent word in headings). |
| Tag management | Google Tag Manager (GTM-TTF724N7) — sole tracking install; GA/Ads managed in-container, nothing hardcoded |
| Instagram feed | Behold.so JSON feed                                                                                       |
| Cookie consent | CookieYes (Consent Mode v2) — loaded via GTM, key `57bb99c7…a303e0`                                       |
| Build          | None — static files, no npm                                                                               |

**No backend, no database, no package.json.** Pure static site.

## Project Structure

```
/
├── index.html                # The whole site: hero, Proiecte, Calculator, De ce RXR,
│                             # Recenzii, Servicii si preturi, Intrebari, Contact
├── servicii.html             # Redirect -> ./#servicii (maps #tuning/#codari-bmw/#diagnoza/#alte-servicii)
├── preturi.html              # Redirect -> ./#preturi
├── galerie.html              # Redirect -> ./#proiecte
├── despre-noi.html           # Redirect -> ./#despre
├── contact.html              # Redirect -> ./#contact
├── confidentialitate.html    # Privacy policy (same header/footer shell)
├── 404.html                  # Custom 404 (absolute /assets paths, served at any depth)
├── manifest.json · sitemap.xml · robots.txt · CNAME · README.md · CLAUDE.md
├── data/vehicles/*.json      # verified engine specs with source URLs (source of truth for the calculator)
├── tools/build-vehicle-db.py # builds assets/js/vehicle-database.js from data/vehicles
└── assets/
    ├── css/main.css          # Everything: tokens, buttons, header + crumbs, hero, sections, cards,
    │                         # projects, calculator, tiles, reviews, FAQ, contact, footer, action bar
    └── js/
        ├── main.js           # Calculator; loads vehicle-database.js only when #calculator is near
        ├── vehicle-database.js # generated from data/vehicles/*.json (6,974 engines, 30 brands)
        ├── site.js           # Active section in .nav (desktop) and .crumbs (mobile); hides the
        │                     # mobile .action-bar while a [data-main-cta] row is on screen
        ├── instagram.js      # Behold feed -> [data-ig-grid] cards, fetched when the grid is near
        ├── reviews.js        # Google Places reviews loader (static fallback in HTML)
        ├── gtm.js            # Google Tag Manager loader
        └── utils.js          # window.RXR: trackEvent, trackConversion, whatsappUrl, phone/WhatsApp click tracking
```

The redirect pages keep `location.search` (so `?gclid=` from ads survives) and fall back to a `meta refresh`. Ads should still point straight at `https://rxr-performance.ro/`.

## Design (one page since 2026-10-20, raresroca.com look since 2026-11-16)

- **Why**: marketing said the first month with WhatsApp + the original blue design converted best; the owner asked for a single landing page where projects and contact are one tap away. On 2026-11-16 the owner asked for the look and layout of raresroca.com (the owner's own portfolio). Blue call buttons and green WhatsApp buttons stayed (marketing); the background moved from slate navy to neutral graphite, like raresroca.com.
- **Left-aligned**: hero, section heads (`.section__head`), FAQ, contact and footer read from the left, like raresroca.com. Only the 404 page stays centered.
- **Type**: Geist for all text, headings weight 600 with tight letter-spacing. Geist Mono for the small grey uppercase labels (stats, prices, form labels, chips). The `<em>` inside `.display-xl` / `.display-lg` is Instrument Serif italic in `--accent-text`. Never put a number inside that `<em>`: its "1" reads as "l". That is why the calculator H2 accents "poate" and not "Stage 1", and why review text stays in Geist.
- **Section labels**: `.eyebrow` gets its number ("01", "02"…) from a CSS counter on `main`, so moving a section renumbers the labels by itself. Keep exactly one `.eyebrow` per section (the privacy page has one, "01 Legal").
- **Section order** (marketing, 2026-10-23): hero, Proiecte, Calculator, De ce RXR, Recenzii, Servicii si preturi, Intrebari, Contact. Prices come after the reviews. `.section--alt` alternates from Proiecte down; Recenzii is `.section--navy` (dark navy band with a faint ring, like the "Off the clock" band on raresroca.com). Keep the rhythm if sections move.
- **Hero**: two columns from 1000px: text + buttons on the left, the `.dyno` card on the right (one column on mobile, the card under the buttons). The card is an inline SVG power curve for a BMW 320d F30 LCI, 190 → 236 CP, +24%: the calculator's own numbers for that car (diesel 121-200 CP rule). They are typed into the HTML, so if that rule changes in `tools/build-vehicle-db.py`, update the card. The `.stats` strip with the four numbers sits under both columns.
- **Rows with a label on the left** (`.aside`: Certificari, Fara surprize), the 4 steps as a `.steps` timeline (down the page on mobile, across from 900px), and the FAQ as `.split` (heading left and sticky, questions right, from 1000px).
- **Equal frames**: `.cards`, `.tiles`, `.reviews`, `.info` use `grid-auto-rows: 1fr`, so every card in a group has the same height. Keep card content short; no expanding blocks inside cards.
- **Header**: see-through with a blur (solid where the browser has no blur). Logo + (desktop) `.nav` links with a pill on the active one + two round icon-only buttons (WhatsApp, phone). On mobile a breadcrumb strip `.crumbs` sits under the header row (Acasa / Proiecte / Calculator / Recenzii / Preturi / Contact), highlights the section in view and scrolls itself to keep it centered.
- **Buttons are small and pill-shaped** (46px main, 44px round icon). Call buttons say `<span>Suna acum</span>` (marketing, 2026-10-29); the phone number is not shown as text (2026-10-23, owner: WhatConverts showed its 0364 tracking number on the page). Service cards use icon-only WhatsApp + phone buttons with `sr-only` labels. On phones the two main buttons share the row and wrap when one is too wide.
- **Mobile action bar** (`.action-bar`, < 900px): "Suna acum" + "WhatsApp", two equal columns. It slides away while the hero or contact buttons (`[data-main-cta]`) are visible, so there are never two pairs of the same buttons on screen.
- **No reveal animations, no grain, no ticker, no side chapter nav** — content is visible without JS. Only motion: skeleton shimmer, small hovers, smooth scroll (all off under reduced motion).
- **Mobile first (90% of traffic)**: `viewport-fit=cover`, safe-area padding on the bar, 16px selects, tap targets >= 44px, buttons `white-space: nowrap`, no horizontal scroll at 360px.
- **Tap areas (owner, 2026-11-18)**: the tap size is one token, `--tap: 44px` (`.btn--sm`, `.btn--icon`, the logo link, the crumb strip through `--crumbs-h`, the footer menu, the footer's "Suna acum" and email links). On phones no link is under 44 px; from 900px the footer menu and the footer logo keep their smaller size (36px rows), like the desktop `.nav` (38px). In Contact the Telefon and Email cards are links themselves (`<a class="info__card">`; the Telefon one carries `btn-cta`), so the whole card is the tap area. Before this the four contact links were 17 to 20 px tall, the crumbs 40, the footer menu 36 and the logo 26.
- **Speed**: hero has no images (a CSS gradient glow and the inline SVG chart). M-stripes appear only as the logo underline and on the top edge of the hero card. Instagram JSON is fetched when the projects grid is within 800px; images use Behold `srcset` (400/700/1000w) with `loading="lazy"`. The 786 KB vehicle database loads only when the calculator is within 600px, or on first tap/focus inside it.
- **Hero copy (marketing, 2026-10-29)**: ads also run in nearby cities, so the H1 is "Chip tuning pentru toata Transilvania.", the first pill reads "Atelier in Cluj-Napoca" and a line under the H1 lists Sibiu, Bistrita, Alba, Mures, Salaj, Satu Mare. No price in the hero. Cluj-Napoca stays in the title, meta description, JSON-LD and contact for local SEO.
- **Words that match the ads (owner, 2026-11-19)**: Google Ads rated the landing page "below average" on 19 of 20 keywords while speed tested fine (97 on phones), so the words people search were added. The De ce RXR H2 is "Soft tuning auto, fara riscuri.", the prices H2 is "Chip tuning la preturi clare, fara surprize.", and four FAQ entries explain Stage 1, the other names for it (chip tuning, soft tuning auto, tuning ECU, remapare ECU), the cars and the guarantee. Change one thing at a time and watch the rating before the next change.
- **Work guarantee** has no time limit (owner confirmed 2026-11-19). It is written in the "Siguranta si garantie" tile, the "Fara surprize" list and the FAQ; the ads promise it ("Oferim Garantia Lucrarilor"). Nothing beyond "lucrarea software are garantie, fara limita de timp" was confirmed, so do not write terms.
- **Years of experience** stay off the site (owner, 2026-11-19), although the ads said "Peste 8 ani experienta". Do not add a number of years.
- **Hero stat "160+ clienti multumiti"** is real (owner confirmed 2026-10-29).
- **Hero stat "2.500+ vehicule in calculator"** is the number the owner wants shown (2026-10-07); the DB itself now has 6,974 entries, so the claim is true. Do not change it unless the owner asks.

## Key Patterns

- **IIFE pattern** — all JS files use Immediately Invoked Function Expressions
- **RXR namespace** — global `window.RXR` object for shared utilities
- **Romanian UI** — all content in Romanian (no diacritics, to avoid encoding issues)
- **No build step** — edit HTML/CSS/JS directly, deploy static files
- **Commit author**: `Rares Roca <contact@rxr-performance.ro>`
- **Shared shell** (header, crumbs, footer, action bar, icon sprite) is duplicated in `index.html`, `confidentialitate.html` and `404.html` — keep them in sync. On other pages the links point to `index.html#…` (`/#…` on 404).
- **Tracking aliases (keep!)**: every `tel:` link carries `btn-cta`; every `wa.me` link carries `btn-cta-wa no-swap` AND sits inside `<span class="wa-wrap no-swap">…</span>` (`.wa-wrap` is `display: contents`, so it adds no box). The GTM triggers match the link URL (contains `wa.me` or `tel:`), not these classes (container read 2026-11-23). The wrapper was added because WhatConverts skipped the children of a `no-swap` element but still rewrote that element's own `href`, and changed `wa.me/40744787446` into its tracking number (seen live 2026-10-23). WhatConverts no longer runs (2026-11-26), so the wrapper guards nothing now; it stays because it adds no box and costs nothing.
- `.hidden` and `[hidden]` are `display:none !important` (calculator result relies on this)

## Color Theme (graphite + blue, 2026-11-16)

```
--bg:        #0d1117   --bg-2:      #11161d   (alternate sections)
--surface:   #161b22   --surface-2: #1c232d
--navy:      #0a1426   (Recenzii band)
--line:      #232a34   --line-strong: #323b47
--text:      #eef0f3   --text-2:    #c4cad4   --text-3: #98a1b0
--accent:    #2563eb   (call buttons, white text 5.2:1)   --accent-text: #6cb2ff (accent on dark, heading accent words)
--wa:        #14843f   --wa-ink: #ffffff (WhatsApp buttons, white text 4.8:1; brighter greens are unreadable with white)
--wa-text:   #25d366   (green text and check icons on the dark background)
--good:      #3ccf7f   (green dots, "Cel mai popular" badge, gains)
--m-light:   #5ab0ff   --m-dark: #2340a8   --m-red: #e5262e   (M-stripes: logo underline, hero card edge)
--star:      #facc15
```

All defined once in `assets/css/main.css` `:root`. `theme-color` (all three pages) and the manifest `background_color` are `#0d1117`.

## Pricing (updated 2026-10-20)

All "incepand de la", set from a market check of Romanian tuning shops (2026-10-20): Pack Stage 1 ECU + TCU 1.750 RON (card says "Economisesti 250 lei" vs 1.250 + 750) · Stage 1 ECU 1.250 RON · Stage 1 TCU 750 RON · Codari BMW 150 RON · Diagnoza 150 RON, free with a tuning job · Alte servicii la cerere. Market then: Stage 1 mostly 1.300-1.800 RON, TCU 1.000-1.500 RON, diagnosis 100-150 RON, one BMW coding 50-150 RON. Lowered on 2026-10-29 (owner): pack 2.000 → 1.750, ECU 1.500 → 1.250, TCU 1.000 → 750 (pack kept at 1.750, so the saving dropped from 500 to 250 lei). Card labels read "incepand de la". The hero shows no price on purpose (owner, 2026-10-29: no price "in your face" on the first screen); prices live only in the Servicii si preturi cards. The meta, og and twitter descriptions say "de la 1.250 RON" — keep them in sync with the cards.

## Vehicle Database (rebuilt 2026-10-20)

- **6,974 engine versions**, **30 brands**, **265 models**, model years 2000-2026, European-market versions only. Every row was read from a real spec page (mostly auto-data.net, checked against ultimatespecs / German Wikipedia / cars-data / maker pages); the source URL is kept per row.
- **Source of truth**: `data/vehicles/*.json` (one file per brand group, with `source` URLs). `assets/js/vehicle-database.js` is generated from them: `python3 tools/build-vehicle-db.py --write`. Never edit the generated file by hand; fix the JSON and rebuild.
- Source row: `{brand, model, generation, facelift, genStart, genEnd, engine, displacement, fuel (diesel|benzina), induction (turbo|atmosferic), hybrid (null|mild|plug-in), ps, nm, engStart, engEnd, source}`.
- Generated record: `{brand, model, generation: "F30 LCI (2015-2019)", engine: "320d 2.0 190 CP", stockHP, stockNm, stage1HP, stage1Nm, na?}`. `stockHP` holds metric PS (CP).
- Romanian naming: Opel (not Vauxhall), Mercedes-Benz, BMW "Seria 3", Mercedes "Clasa C"; BMW facelift = "LCI", others "facelift"; bare roman numerals get the model name ("308 II").
- Left out on purpose: electric cars, full hybrids (Toyota HSD etc.), LPG/CNG-only versions, versions not sold in the EU (US/China/Turkey specs, the diesel Logan III/Sandero III/Duster III/Jogger/Bigster), trucks, tractors, marine engines, exotics without OBD tuning.
- The build script rejects rows with impossible values (PS 40-900, Nm 60-1500, Nm/PS ratio by engine type, years) and merges rows that differ only by years.
- To update: add/fix rows in the right JSON with a source URL, run the build, bump `?v=` on the database URL in `main.js` (cache busting).

### Calculator algorithm (`main.js` + `tools/build-vehicle-db.py`)

Stock power and torque are the real figures. Stage 1 is an estimate by engine type, computed at build time:

```
Diesel turbo:  <=120 CP +28% CP / +25% Nm | 121-200 +24% / +20% | 201-300 +20% / +17% | >300 +15% / +13%
Petrol turbo:  <=130 CP +22% / +22%        | 131-250 +25% / +22% | 251-400 +18% / +16% | >400 +12% / +12%
Naturally aspirated petrol: +6% CP / +5% Nm (result shows a note that the gain is small)
Plug-in hybrid (system output): +10% / +10%
```

Generations are listed by start year, engines by power. The result's WhatsApp button (`#whatsapp-cta`) gets a prefilled message with the chosen car and the estimate. The database loads lazily from `assets/js/vehicle-database.js?v=2026-10-20`.

## Analytics & Tracking

- **Google Tag Manager**: `GTM-TTF724N7` — the **only** tracking install in the code. Loader externalized to `assets/js/gtm.js`, imported in `<head>`; paired `<noscript>` iframe stays inline in `<body>`. Consent (CookieYes) and GA4/Ads tags live **inside** the GTM container.
- **No hardcoded GA4 / Google Ads / Facebook Pixel** — by explicit request (2026-07). Do not re-add `gtag.js` or `G-*`/`AW-*` snippets.
- **Consent Mode v2**: provided by CookieYes (loads before GTM).
- **Custom helpers**: `RXR.trackEvent()`, `RXR.trackConversion()` push to `window.dataLayer`. `initContactTracking()` fires `phone_click` on every `tel:` click and `whatsapp_click` on every `wa.me` click; wire both as GTM triggers.
- **One number-swap script runs via GTM** (since 2026-11-26): Google Ads call tracking (`gstatic.com/call-tracking`, tag "Google Ads - Website Calls"). WhatConverts (`176097.js`) ran next to it until the owner took the ads firm out of every product; its tag is paused since container version 12. While both ran they looked for the same number, and the first to swap it stopped the other from counting.

## SEO

- Schema.org `AutomotiveBusiness` (address, hours, sameAs, offer catalog) + `BreadcrumbList` on index
- Open Graph + Twitter Card (og-image.png is 1800x945 PNG); title targets "Chip tuning Stage 1 Cluj-Napoca"; no keywords meta (search engines ignore it)
- `hreflang="ro"` + geo-targeting Romania, canonical URLs
- `sitemap.xml`: index + confidentialitate only (old pages are redirects with canonical to `/`)
- `robots.txt` with sitemap reference + AI crawler blocks (GPTBot, ChatGPT-User, CCBot, anthropic-ai, Google-Extended)
- Custom `404.html`

## Security (meta tags; GitHub Pages cannot send real headers)

- `Content-Security-Policy` meta on index + confidentialitate: `default-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`, scripts only from self + CookieYes + Google tag domains (the WhatConverts hosts were taken out on 2026-11-26), `connect-src` adds `https://feeds.behold.so` on index. No Instagram/Facebook embeds, so those domains are not allowed. Add a domain here before adding any new third-party script in GTM.
- `<meta name="referrer" content="strict-origin-when-cross-origin">` on every page.
- X-Content-Type-Options, Permissions-Policy and X-Frame-Options cannot be set from a meta tag; they need a proxy such as Cloudflare in front of GitHub Pages.
- All untrusted data (Behold feed, Google reviews) is escaped before it goes into HTML; feed links must be `https:`.
- No secrets in the repo. If the Google Places key is added to `reviews.js`, restrict it to the domain in Google Cloud.

## GDPR / Cookie Consent

- **CookieYes** manages the banner + Google Consent Mode v2, **loaded via GTM** (not hardcoded). Website key: `57bb99c764307d7ce071a31fe0a303e0`. On localhost it throws "website URL has changed" — expected.
- ⚠️ Use CookieYes's GTM template on the **Consent Initialization** trigger so consent defaults are set before other tags fire.
- Cookie set by CookieYes: `cookieyes-consent` (~1 year).
- CSP whitelists `cdn-cookieyes.com` (script-src) + `cdn-cookieyes.com` / `log.cookieyes.com` (connect-src).
- Privacy policy: `confidentialitate.html` (linked in footer). Mentions WhatsApp / Meta again since 2026-10-20.
- **Manual step (dashboard):** enable Google Consent Mode in the CookieYes account so GTM tags respect consent.

## Third-party integrations

- **Behold.so** — Instagram JSON feed `https://feeds.behold.so/3nVTXEc9DkXMC5BLJr2Z` (CORS `*`), consumed by `instagram.js` for the Proiecte grid (8 posts). Cards show a service chip (Stage 2 / Stage 1 / Codari / TCU / Diagnoza / Retrofit) plus power/torque chips parsed from the first caption line, and the car name. Images come from `behold.pictures` via `srcset`. On failure the section shows `.ig-fallback`.
- **WhatsApp** — back on 2026-10-20 (marketing data: it converted best). Number `40744787446`, links `https://wa.me/40744787446?text=…` with a prefilled message per service; `RXR.whatsappUrl(message)` builds them in JS. The number is never shown as text. Every WhatsApp link must carry `no-swap` and sit inside a `.wa-wrap.no-swap` span (see Tracking aliases).
- **Phone** — every call button and link reads **"Suna acum"**. Since 2026-11-26 the `tel:` links dial the real number, 0744 787 446 (nothing swaps them to a WhatConverts number any more; Google's own call tracking may still show a visitor who came from an ad a Google forwarding number). The number is still not shown as text: it appears only in the meta description, the JSON-LD and the privacy page.
- **Maps** — no embed any more (it was heavy); the contact section links to Google Maps directions and Waze.
- **Google Fonts** — Geist, Geist Mono and Instrument Serif (italic only), one request.
- **WhatConverts** — removed on 2026-11-26 (owner). It was the ads firm's call tracking, loaded via GTM from 2026-09; the account belonged to that firm, which the owner took out of every product. Its GTM tag is paused since container version 12 and its three hosts are out of the CSP. Do not re-add it. If a chat widget is ever added (Tawk.to, Crisp, JivoChat, Messenger…), put its hosts in the CSP first and load it only on tap, it is heavy.

## Removed services

- **DPF / EGR / AdBlue (antipoluare)** — removed from the whole site on 2026-10-02 at the owner's request: no section, no price row, no meta/keywords, no JSON-LD offers, no footer mention. Do not re-add.

## Contact

- Phone: +40 744 787 446
- Email: contact@rxr-performance.ro (TODO: migrate to business email)
- Address: Strada Sannicoara 6, 407042 Cluj-Napoca
- Hours: Luni-Sambata 09:00-18:00
- Social: facebook.com/rxrperformance · instagram.com/rxrperformance · tiktok.com/@rxrperformance

## TODO

See [`README.md`](./README.md) `## 📌 TODO` section for the full punch list. Open items:

1. Google Places API key + Place ID for live reviews
2. Business email migration (`contact@rxr-performance.ro`)
3. CookieYes dashboard: enable Google Consent Mode
4. Point Google Ads final URLs at `https://rxr-performance.ro/`

Done: og-image, Apple touch icon, privacy policy page, GTM migration, CookieYes.
Explicitly **not wanted** (2026-07): Facebook Pixel, hardcoded GA4 / Ads tags.
