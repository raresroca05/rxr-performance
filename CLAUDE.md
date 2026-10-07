# RXR Performance — Automotive Tuning Services Website

Promotional website for automotive ECU tuning, car coding, and diagnostic services. Static HTML/CSS/JS site with a dynamic vehicle database for performance lookup.

**Domain**: rxr-performance.ro
**Repo**: github.com/raresroca05/rxr-performance
**Hosting**: GitHub Pages

## Tech Stack

| Layer          | Technology                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| HTML           | HTML5 (semantic, Schema.org structured data)                                                              |
| CSS            | Custom CSS only, no framework (`base.css` tokens + `main.css` components). Tailwind removed 2026-10.      |
| JavaScript     | Vanilla ES6+ (IIFE modules)                                                                               |
| Fonts          | Google Fonts (Archivo variable, wdth 100-125 / wght 500-800, for display/brand; Inter for body)            |
| Tag management | Google Tag Manager (GTM-TTF724N7) — sole tracking install; GA/Ads managed in-container, nothing hardcoded |
| Instagram feed | Behold.so widget                                                                                          |
| Cookie consent | CookieYes (Consent Mode v2) — loaded via GTM, key `57bb99c7…a303e0`                                       |
| Build          | None — static files, no npm                                                                               |

**No backend, no database, no package.json.** Pure static site.

## Project Structure

```
/
├── index.html                # Homepage (Hero, Services, Calculator, Reviews, CTA)
├── servicii.html             # Services details
├── preturi.html              # Pricing (public, no longer password-protected)
├── galerie.html              # Proiecte (Behold.so IG widget + social buttons)
├── despre-noi.html           # About us
├── contact.html              # Contact + Google Maps + FAQ
├── 404.html                  # Custom 404
├── manifest.json             # PWA manifest
├── sitemap.xml               # SEO sitemap
├── robots.txt                # Crawler rules (incl. AI bots blocked)
├── CNAME                     # Domain config
├── README.md                 # Public docs
├── CLAUDE.md                 # This file
└── assets/
    ├── js/
    │   ├── main.js               # Vehicle calculator (cascading dropdowns + Nm formula)
    │   ├── vehicle-database.js   # 5,827 vehicles, 67 brands, 699 models
    │   ├── site.js               # Header, mobile menu, reveal-on-scroll, chapters nav, counters, drag slider
    │   ├── instagram.js          # Behold JSON feed -> hero slides + "Proiecte" slider (index), grid (galerie)
    │   ├── reviews.js            # Google Places reviews loader (with static fallback)
    │   ├── gtm.js                # Google Tag Manager loader (externalized <head> snippet)
    │   └── utils.js              # window.RXR namespace, tracking, helpers
    └── css/
        ├── base.css              # Design tokens (:root), reset, type scale (.display-*), .eyebrow,
        │                         # .btn*, [data-reveal] animations, reduced-motion
        └── main.css              # @imports base.css. Header/mobile menu, .chapters nav, .hero,
                                  # .page-hero, .chapter sections, cards/grids, calculator, slider,
                                  # reviews, .cta-band, pricing, contact/FAQ, .prose, footer, .call-float
```

## Design (redesign 2026-10, inspired by mont-fort.com; recolored 2026-10-07)

- **Dark performance**: near-black `#09090b`, one accent (hot orange-red `#ff4d1c` / `#ff6a3d`, used only for CTAs, active states, numerals and `<em>` in headlines), wide bold uppercase Archivo headlines (`font-stretch: 118%`), generous whitespace, 1px hairlines, a fixed grain overlay (`body::after`, SVG noise at ~4.5%) and one radial accent glow (`body::before`).
- **Ticker**: `.ticker` on index right under the hero (two identical `.ticker__list`s, CSS marquee, paused on hover, off under reduced-motion).
- **Chapters**: every content section is `<section class="chapter" id="…" data-chapter="Label">`. `site.js` builds the fixed right-hand numbered nav (`#chapters`, visible >=1280px) from these and highlights the one in view. Hero/CTA sections without `data-chapter` are not listed.
- **Section head pattern**: `.chapter__head` = `.eyebrow` (with `.eyebrow__num` "01") + `h2.display-lg[data-reveal="title"]` + `.lead`, offset to the right on desktop.
- **Reveal**: add `data-reveal` (fade/rise) or `data-reveal="title"` (blur/rise) and optional `style="--i:n"` for stagger. Do not use `clip-path` for hidden states — IntersectionObserver never fires for zero-area targets.
- **Buttons**: `.btn.btn--call` (the primary CTA: accent fill, pulse ring, ringing phone icon, shimmer on hover; variants `btn--sm` header, `btn--lg` contact card; markup = phone svg + `<span>Suna acum</span><b class="btn__num">0744 787 446</b>`), `.btn.btn--primary` (accent, non-call actions), `.btn.btn--ghost` (outline), `.link-arrow`.
- **Call CTA everywhere**: header (`.site-nav__call` desktop, `.header-phone` icon on mobile), first button of every `.btn-row`, mobile menu, and the sticky `.call-float` (full-width bar on mobile, pill bottom-right on desktop) on every page.
- **Tracking alias (keep!)**: every `tel:` link that is a CTA carries the legacy class `btn-cta` (no CSS) so GTM triggers built on _Click Classes_ keep matching. The phone number must stay visible as text for WhatConverts number swap.
- **Instagram as media**: no photos exist in the repo. `instagram.js` fetches the Behold JSON feed and uses `sizes.large/medium.mediaUrl` (stable `behold.pictures` URLs) for the hero background crossfade, the home slider and the Proiecte grid. Needs `https://feeds.behold.so` in `connect-src` (index + galerie); `img-src https:` already covers the images. On failure the section shows `.ig-fallback`.
- **Hero stat "2.500+ vehicule in calculator"** is the number the owner wants shown (2026-10-07); the DB itself has 5,827 entries. Do not change it to the real count.

## Key Patterns

- **IIFE pattern** — all JS files use Immediately Invoked Function Expressions
- **RXR namespace** — global `window.RXR` object for shared utilities
- **Romanian UI** — all content in Romanian (no diacritics, to avoid encoding issues)
- **No build step** — edit HTML/CSS/JS directly, deploy static files
- **Commit author**: `Rares Roca <contact@rxr-performance.ro>`
- **Shared shell** on every page (duplicated markup, keep in sync): `.site-header` (`#site-header`, `#menu-toggle`, `#scroll-progress`), `#mobile-menu` (`hidden` attr toggled by `site.js`), `<nav class="chapters" id="chapters">`, `<main id="main">`, `.site-footer`, `.call-float.btn-cta`
- **Head is preserved per page** (meta, OG, CSP, JSON-LD, GTM, `utils.js`); only `<body>` was rebuilt in the redesign
- `.hidden` and `[hidden]` are `display:none !important` (calculator result and mobile menu rely on this)

## Color Theme (dark performance, applied 2026-10-07)

```
--bg:        #09090b   --bg-2:      #0e0f12   (alternate chapters)
--surface:   #141518   --surface-2: #1a1c21
--line:      rgba(255,255,255,.08)   --line-strong: rgba(255,255,255,.18)
--text:      #f6f5f3   --text-2:    #b8b9bd   --text-3: #85878d
--accent:    #ff4d1c   --accent-2:  #ff6a3d   (the only brand color)
--accent-ink #ffffff   --accent-glow rgba(255,77,28,.38)
--star:      #facc15
```

Defined once in `assets/css/base.css` `:root`. Solid body background with a faint radial accent glow (`body::before`).

## Navigation (consistent across all pages)

5 items: **Acasa | Servicii | Preturi | Proiecte | Contact**

Active state via `.site-nav__link.is-active` / `.mobile-menu__link.is-active`. Despre-Noi available via footer and the mobile menu.

## Pages

### `index.html`

Full-viewport hero (Instagram image crossfade + headline + 4 counters) → chapters: 01 Servicii (4 numbered rows linking to `servicii.html#…`) → 02 Calculator (ids unchanged for `main.js`) → 03 Proiecte (drag slider from Instagram) → 04 De ce RXR (3 pillars + certifications) → 05 Recenzii (`#reviews-grid` etc. for `reviews.js`) → 06 Contact (`.cta-band`) → Footer.

### `servicii.html`

Page hero with anchor links → chapters: 01 Stage 1 ECU/TCU (`#tuning`), 02 Codari BMW (`#codari-bmw`, 6 category cards), 03 Diagnoza (`#diagnoza`) → closing CTA band. Anchor ids are linked from index/despre-noi — keep them.

### `preturi.html`

Pricing list with "incepand de la" prefix. No longer password-protected (changed 2026-06).

- Pack Stage 1 ECU + TCU: from 1.750 RON
- Stage 1 ECU: from 1.000 RON
- Stage 1 TCU: from 750 RON
- Codari BMW: from 250 RON
- Diagnoza: from 250 RON

### `galerie.html`

Renamed from "Galerie" → **"Proiecte"**. 01 Instagram grid (`[data-ig-grid]`, 12 posts via `instagram.js`, replaced the Behold `<behold-widget>`), 02 Social (buttons + stats band), CTA band.

### `despre-noi.html`

Page hero → 01 Cine suntem (quote), 02 Valori (4 pillars), 03 Ce oferim (service rows + stats), 04 Cum lucram (4 steps), CTA. Canonical fixed to `despre-noi.html` (matches sitemap).

### `contact.html`

01 Call card (`.card--call`, big `btn--call btn--lg`) + email card and info grid, 02 Google Maps embed by address query (Strada Sannicoara 6, 407042 Cluj-Napoca; no GPS coords in JSON-LD until the exact pin is known), 03 FAQ (`<details>` with CSS-only plus/rotate, no JS), 04 social row.

### `404.html`

Custom 404 with home + services CTAs.

## Vehicle Database (`vehicle-database.js`)

- **5,827 vehicles** across **67 brands** and **699 distinct models**
- Format: `{ brand, model, generation, engine, stockHP, stage1HP }`
- All models cleaned and consolidated (2026-06):
  - Body codes in generation field (e.g., BMW 3 Series → E36/E46/E9x/F3x/G2x)
  - No model names with parenthesized body codes
  - No empty generations
  - No year-only multi-gen models for major brands
- Brands covered: Abarth, Alfa Romeo, Alpine, Aston Martin, Audi, BMW, Bentley, Cadillac, Chevrolet, Chrysler, Citroen, Cupra, DAF, DS, Dacia, Dodge, Ferrari, Fiat, Ford, Great Wall, Holden, Honda, Hyundai, Infiniti, Isuzu, Iveco, JCB, Jaguar, Jeep, KTM, Kia, LDV, Lamborghini, Land Rover, Lexus, MAN, MG, Maserati, Massey Ferguson, Mazda, McLaren, Mercedes Benz, Mercedes Trucks, Mercury, Mini, Mitsubishi, New Holland, Nissan, Peugeot, Porsche, Renault, Renault Trucks, Rover, Saab, Scania, Seat, Skoda, Smart, Ssangyong, Subaru, Suzuki, Toyota, Vauxhall, Volkswagen, Volvo, Volvo Trucks, Yamaha.

### Calculator algorithm (`main.js`)

```js
// Stock Nm estimation (varies by engine type + displacement)
Diesel:    ≤1.6L → 2.4x HP   |  1.7-2.4L → 2.15x  |  ≥2.5L → 2.0x
Turbo P:   ≤1.4L → 1.65x HP  |  1.5-2.5L → 1.55x  |  ≥2.6L → 1.4x
NA:        ≤1.6L → 1.5x HP   |  1.7-3.0L → 1.3x   |  ≥3.0L → 1.05x

// Stage 1 (flat +28% on both HP and Nm)
Stage 1 HP = Stock HP × 1.28
Stage 1 Nm = Stock Nm × 1.28
```

Displayed values are clearly marked as estimates (amber banner + result card warning).

## Analytics & Tracking

- **Google Tag Manager**: `GTM-TTF724N7` — the **only** tracking install in the code. Loader externalized to `assets/js/gtm.js`, imported in `<head>`; paired `<noscript>` iframe stays inline in `<body>` on every page. Consent (CookieYes) and GA4/Ads tags live **inside** the GTM container.
- **No hardcoded GA4 / Google Ads / Facebook Pixel** — by explicit request (2026-07). Any analytics/ads must be configured **inside the GTM container**, not in the HTML. Do not re-add `gtag.js` or `G-*`/`AW-*` snippets.
- **Consent Mode v2**: provided by CookieYes (loads before GTM).
- **Custom helpers**: `RXR.trackEvent()`, `RXR.trackConversion()` in `utils.js` push to `window.dataLayer` (GTM-native) — no vendor SDK calls. `initContactTracking()` fires `phone_click` on every `tel:` click; wire it as a GTM trigger.

## SEO

- Schema.org `AutomotiveBusiness` with address + GPS + opening hours + sameAs on **every page** (was index-only, expanded 2026-06)
- Schema.org `BreadcrumbList` per page
- Open Graph + Twitter Card complete on **every page**
- `hreflang="ro"` + geo-targeting Romania
- Canonical URLs per page
- `sitemap.xml` (all 6 pages with priorities)
- `robots.txt` with sitemap reference + AI crawler blocks (GPTBot, ChatGPT-User, CCBot, anthropic-ai, Google-Extended)
- Custom `404.html`

## Security headers (every page, via meta http-equiv)

- `Content-Security-Policy` (per-page, with required domains)
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(self), microphone=(), camera=(), payment=()`

## GDPR / Cookie Consent

- **CookieYes** manages the banner + Google Consent Mode v2. As of 2026-07 it is **loaded via GTM** (installed by the marketing/GTM owner), **not** hardcoded in the page `<head>`. Website key: `57bb99c764307d7ce071a31fe0a303e0`.
- ⚠️ When loaded via GTM, use CookieYes's GTM template on the **Consent Initialization** trigger so consent defaults are set before other tags fire.
- Cookie set by CookieYes: `cookieyes-consent` (~1 year). The old custom banner (`cookie-consent.js`, `rxr_cookie_consent`) was removed 2026-07.
- CSP whitelists `cdn-cookieyes.com` (script-src) + `cdn-cookieyes.com` / `log.cookieyes.com` (connect-src) on every page that has a CSP.
- Privacy policy: `confidentialitate.html` (live, linked in footer on every page).
- **Manual step (dashboard):** enable Google Consent Mode in the CookieYes account so GTM tags respect consent.

## Third-party integrations

- **Behold.so** — Instagram JSON feed `https://feeds.behold.so/3nVTXEc9DkXMC5BLJr2Z` (CORS `*`, cached 10s), consumed by `assets/js/instagram.js` on `index.html` (hero + slider) and `galerie.html` (grid). The old `<behold-widget>` / `w.behold.so` script is gone. Images come from `behold.pictures` (`sizes.large|medium.mediaUrl`), captions' first line becomes the card title.
- **Google Maps** — embed on `contact.html` (coords for Cluj-Napoca)
- **Phone** — the only contact CTA (WhatsApp removed completely on 2026-10-07 at the owner's request: no links, buttons, float, texts, meta, CSP entry, JS helper or privacy-policy mention. Do not re-add). Every call button reads **"Suna acum 0744 787 446"** (number visible as text for tracking). Service sections use a **"Programeaza-te pentru [Serviciu]"** heading above the buttons.
- **Google Fonts** — Archivo + Inter
- **WhatConverts** — call/lead tracking, loaded **via GTM** (2026-09). Script: `https://s.ksrndkehqnwntyxlhgto.com/176097.js`. CSP allowlist on every page that has one:
  - `script-src`: `https://s.ksrndkehqnwntyxlhgto.com`
  - `connect-src`: `https://s.ksrndkehqnwntyxlhgto.com`, `https://p.ksrndkehqnwntyxlhgto.com`, `https://process.iconnode.com`

  WhatConverts serves the script from a per-account randomized domain — if the account is reissued, the CSP needs the new domains.

  **Number swap (2026-10):** WhatConverts swaps the displayed phone number with a tracking number. All `tel:` links and the number shown as text get swapped, which is intended.

## Removed services

- **WhatsApp** — removed from every page, script, stylesheet and doc on 2026-10-07. Phone is the single CTA.

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

Done: og-image, Apple touch icon, privacy policy page, GTM migration, CookieYes.
Explicitly **not wanted** (2026-07): Google Ads, Facebook Pixel, hardcoded GA4.
