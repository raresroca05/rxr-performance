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
| Fonts          | Google Fonts Archivo (wdth 100-125, wght 700-800) for headings/buttons, loaded non-blocking (`media=print` swap). Body text uses the system font. |
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

## Design (one-page redesign 2026-10-20)

- **Why**: marketing said the first month with WhatsApp + the original blue design converted best; the owner asked for a single landing page where projects and contact are one tap away. The look goes back to the original dark slate + blue, cleaner and lighter.
- **Everything centered**: hero, section heads (`.section__head`), FAQ column, contact card, footer. Card contents stay readable (service cards are left-aligned inside).
- **Section order** (marketing, 2026-10-23): hero, Proiecte, Calculator, De ce RXR, Recenzii, Servicii si preturi, Intrebari, Contact. Prices come after the reviews. `.section--alt` alternates from Proiecte down; keep it alternating if sections move.
- **Equal frames**: `.cards`, `.tiles`, `.reviews`, `.info` use `grid-auto-rows: 1fr`, so every card in a group has the same height. Keep card content short; no expanding blocks inside cards.
- **Header**: logo + (desktop) `.nav` links + two icon-only buttons (WhatsApp, phone). On mobile a breadcrumb strip `.crumbs` sits under the header row (Acasa / Proiecte / Calculator / Recenzii / Preturi / Contact), highlights the section in view and scrolls itself to keep it centered.
- **Buttons are small** (46px main, 44px icon). Call buttons say only `<span>Suna</span>`; the phone number is not shown as text (2026-10-23, owner: WhatConverts showed its 0364 tracking number on the page). Service cards use icon-only WhatsApp + phone buttons with `sr-only` labels.
- **Mobile action bar** (`.action-bar`, < 900px): "Suna" + "WhatsApp", two equal columns. It slides away while the hero or contact buttons (`[data-main-cta]`) are visible, so there are never two pairs of the same buttons on screen.
- **No reveal animations, no grain, no ticker, no side chapter nav** — content is visible without JS. Only motion: skeleton shimmer, small hovers, smooth scroll (all off under reduced motion).
- **Mobile first (90% of traffic)**: `viewport-fit=cover`, safe-area padding on the bar, 16px selects, tap targets >= 44px, buttons `white-space: nowrap`, no horizontal scroll at 360px.
- **Speed**: hero has no images (CSS gradients + M-stripes only). Instagram JSON is fetched when the projects grid is within 800px; images use Behold `srcset` (400/700/1000w) with `loading="lazy"`. The 786 KB vehicle database loads only when the calculator is within 600px, or on first tap/focus inside it.
- **Hero stat "2.500+ vehicule in calculator"** is the number the owner wants shown (2026-10-07); the DB itself now has 6,974 entries, so the claim is true. Do not change it unless the owner asks.

## Key Patterns

- **IIFE pattern** — all JS files use Immediately Invoked Function Expressions
- **RXR namespace** — global `window.RXR` object for shared utilities
- **Romanian UI** — all content in Romanian (no diacritics, to avoid encoding issues)
- **No build step** — edit HTML/CSS/JS directly, deploy static files
- **Commit author**: `Rares Roca <contact@rxr-performance.ro>`
- **Shared shell** (header, crumbs, footer, action bar, icon sprite) is duplicated in `index.html`, `confidentialitate.html` and `404.html` — keep them in sync. On other pages the links point to `index.html#…` (`/#…` on 404).
- **Tracking aliases (keep!)**: every `tel:` link carries `btn-cta`; every `wa.me` link carries `btn-cta-wa no-swap` AND sits inside `<span class="wa-wrap no-swap">…</span>` (`.wa-wrap` is `display: contents`, so it adds no box). GTM triggers use these classes. WhatConverts skips the children of a `no-swap` element but still rewrites that element's own `href`, so `no-swap` on the `<a>` alone let it change `wa.me/40744787446` into the tracking number 0364 632 979 (seen live 2026-10-23). The wrapper is what protects the link.
- `.hidden` and `[hidden]` are `display:none !important` (calculator result relies on this)

## Color Theme (dark slate + blue, 2026-10-20)

```
--bg:        #0a1120   --bg-2:      #0d1627   (alternate sections)
--surface:   #111b2e   --surface-2: #17233a
--line:      rgba(148,163,184,.14)   --line-strong: rgba(148,163,184,.3)
--text:      #eef3f9   --text-2:    #b4c0d3   --text-3: #8a99b0
--accent:    #2563eb   (call buttons, white text 5.2:1)   --accent-text: #6cb2ff (accent on dark)
--wa:        #14843f   --wa-ink: #ffffff (WhatsApp buttons, white text 4.8:1; brighter greens are unreadable with white)
--wa-text:   #25d366   (green text and check icons on the dark background)
--m-light:   #5ab0ff   --m-dark: #2340a8   --m-red: #e5262e   (M-stripes: logo underline, eyebrows, hero)
--star:      #facc15
```

All defined once in `assets/css/main.css` `:root`.

## Pricing (updated 2026-10-20)

All "incepand de la", set from a market check of Romanian tuning shops (2026-10-20): Pack Stage 1 ECU + TCU 2.000 RON (card says "Economisesti 500 lei" vs 1.500 + 1.000) · Stage 1 ECU 1.500 RON · Stage 1 TCU 1.000 RON · Codari BMW 150 RON · Diagnoza 150 RON, free with a tuning job · Alte servicii la cerere. Market then: Stage 1 mostly 1.300-1.800 RON, TCU 1.000-1.500 RON, diagnosis 100-150 RON, one BMW coding 50-150 RON. Hero shows "Stage 1 de la 1.500 RON" and the meta description says "De la 1.500 RON" — keep them in sync with the cards.

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
- **Two number-swap scripts run via GTM**: WhatConverts (`176097.js`) and Google Ads call tracking (`gstatic.com/call-tracking`). Both look for the same visible number; if one swaps it first, the other cannot count. Suspected reason the Ads account showed only ~2 calls in Sep 22 - Oct 19 2026 — check in the GTM/WhatConverts setup, not in the site code.

## SEO

- Schema.org `AutomotiveBusiness` (address, hours, sameAs, offer catalog) + `BreadcrumbList` on index
- Open Graph + Twitter Card (og-image.png is 1800x945 PNG); title targets "Chip tuning Stage 1 Cluj-Napoca"; no keywords meta (search engines ignore it)
- `hreflang="ro"` + geo-targeting Romania, canonical URLs
- `sitemap.xml`: index + confidentialitate only (old pages are redirects with canonical to `/`)
- `robots.txt` with sitemap reference + AI crawler blocks (GPTBot, ChatGPT-User, CCBot, anthropic-ai, Google-Extended)
- Custom `404.html`

## Security (meta tags; GitHub Pages cannot send real headers)

- `Content-Security-Policy` meta on index + confidentialitate: `default-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`, scripts only from self + CookieYes + Google tag domains + WhatConverts, `connect-src` adds `https://feeds.behold.so` on index. No Instagram/Facebook embeds, so those domains are not allowed. Add a domain here before adding any new third-party script in GTM.
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
- **Phone** — every call button reads just **"Suna"**; the contact card and footer link read "Suna acum". WhatConverts still swaps the `tel:` link, so calls are tracked, but no tracking number shows on the page. The real number appears only in the meta description, the JSON-LD and the privacy page (there inside a `<span class="no-swap">`, so it stays 0744 787 446).
- **Maps** — no embed any more (it was heavy); the contact section links to Google Maps directions and Waze.
- **Google Fonts** — Archivo only.
- **WhatConverts** — call/lead tracking, loaded **via GTM** (2026-09). Script: `https://s.ksrndkehqnwntyxlhgto.com/176097.js`. CSP allowlist on every page that has one:
  - `script-src`: `https://s.ksrndkehqnwntyxlhgto.com`
  - `connect-src`: `https://s.ksrndkehqnwntyxlhgto.com`, `https://p.ksrndkehqnwntyxlhgto.com`, `https://process.iconnode.com`

  WhatConverts serves the script from a per-account randomized domain — if the account is reissued, the CSP needs the new domains. WhatConverts can also track web chat (Tawk.to, Crisp, JivoChat, Messenger…) if a chat is ever added; load such a widget only on tap, it is heavy.

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
4. Point Google Ads final URLs at `https://rxr-performance.ro/` and check the WhatConverts vs Google call-tracking overlap in GTM

Done: og-image, Apple touch icon, privacy policy page, GTM migration, CookieYes.
Explicitly **not wanted** (2026-07): Facebook Pixel, hardcoded GA4 / Ads tags.
