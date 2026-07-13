# RXR Performance — Automotive Tuning Services Website

Promotional website for automotive ECU tuning, car coding, and diagnostic services. Static HTML/CSS/JS site with a dynamic vehicle database for performance lookup.

**Domain**: rxr-performance.ro
**Repo**: github.com/raresroca05/rxr-performance
**Hosting**: GitHub Pages

## Tech Stack

| Layer | Technology |
|-------|-----------|
| HTML | HTML5 (semantic, Schema.org structured data) |
| CSS | Tailwind CSS 4 (CDN), custom CSS |
| JavaScript | Vanilla ES6+ (IIFE modules) |
| Fonts | Google Fonts (Orbitron for branding, Inter for body) |
| Tag management | Google Tag Manager (GTM-TTF724N7) — sole tracking install; GA/Ads managed in-container, nothing hardcoded |
| Instagram feed | Behold.so widget |
| Cookie consent | CookieYes (Consent Mode v2) — loaded via GTM, key `57bb99c7…a303e0` |
| Build | None — static files, no npm |

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
    │   ├── navigation.js         # Mobile menu, sticky nav
    │   ├── faq.js                # Accordion
    │   ├── reviews.js            # Google Places reviews loader (with static fallback)
    │   ├── gtm.js                # Google Tag Manager loader (externalized <head> snippet)
    │   ├── utils.js              # window.RXR namespace, tracking, helpers
    │   └── tailwind-config.js    # Theme tokens (used by servicii.html externally)
    └── css/
        ├── base.css              # Reset, fonts, animations, shared button styles
        └── main.css              # Shell utilities (page-shell, site-nav, site-footer,
                                  # btn-cta*, page-hero), vehicle lookup, FAQ
```

## Key Patterns

- **IIFE pattern** — all JS files use Immediately Invoked Function Expressions
- **RXR namespace** — global `window.RXR` object for shared utilities
- **Romanian UI** — all content in Romanian (no diacritics, to avoid encoding issues)
- **No build step** — edit HTML/CSS/JS directly, deploy static files
- **Commit author**: `Rares Roca <contact@rxr-performance.ro>`
- **Shared shell classes** in `main.css`: `.page-shell`, `.page-container`, `.site-nav`, `.site-nav-inner`, `.site-nav-row`, `.site-footer`, `.site-footer-grid`, `.site-footer-social`, `.page-hero`, `.btn-cta`, `.btn-cta-wa`, `.btn-cta-ghost`, `.btn-cta-outline`
- **Page-stack** for vertical rhythm between sections inside `<main>`

## Color Theme (lighter slate, applied 2026-06)

```
rxrPrimary:     #0EA5E9  (cyan)
rxrPrimarySoft: #38BDF8  (light cyan)
rxrElectric:    #06B6D4  (teal)
rxrMViolet:     #D946EF  (fuchsia)
rxrMRed:        #F43F5E  (rose)
rxrDeep:        #0F172A  (slate-900 — lifted from near-black #030712)
rxrCard:        #1E293B  (slate-800 — lifted from #050816)
rxrOutline:     #334155  (slate-700 — lifted from #1f2937)
```

Body gradient: `linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #334155 100%)`.

## Navigation (consistent across all pages)

5 items: **Acasa | Servicii | Preturi | Proiecte | Contact**

Active state via `.nav-link-active` / `.mobile-nav-link.active`. Despre-Noi available only via footer link.

## Pages

### `index.html`
Sections: Hero → Services overview (3 cards) → Vehicle Calculator (with amber estimate disclaimer) → Why Us → Google Reviews (3 fallback cards + JS hook) → CTA Banner → Footer.

### `servicii.html`
Detailed sections for Stage 1 ECU/TCU, antipoluare (DPF/EGR/AdBlue), BMW coding (40+ functions), diagnoza.

### `preturi.html`
Pricing list with "incepand de la" prefix. No longer password-protected (changed 2026-06).
- Pack Stage 1 ECU + TCU: from 1.500 RON
- Stage 1 ECU: from 1.000 RON
- Stage 1 TCU: from 650 RON
- Codari BMW: from 150 RON
- Diagnoza: from 150 RON
- DPF/EGR/AdBlue: la cerere

### `galerie.html`
Renamed from "Galerie" → **"Proiecte"**. Hosts Behold.so Instagram widget + 3 social CTA buttons (FB / IG / TikTok).

### `despre-noi.html`
About us, values (4), process (4 steps), CTA.

### `contact.html`
Contact cards (WhatsApp + Phone), info grid, Google Maps embed (Strada Traian Vuia 259, Cluj-Napoca, 46.7832778, 23.6977778), FAQ accordion, social media row.

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
- **Custom helpers**: `RXR.trackEvent()`, `RXR.trackConversion()` in `utils.js` push to `window.dataLayer` (GTM-native) — no vendor SDK calls. `initContactTracking()` fires `whatsapp_click` / `phone_click` events on CTA clicks; wire these as GTM triggers.

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

- **Behold.so** — Instagram feed widget on `galerie.html` (`feed-id="3nVTXEc9DkXMC5BLJr2Z"`)
- **Google Maps** — embed on `contact.html` (coords for Cluj-Napoca)
- **WhatsApp Web** — primary CTA via `wa.me/40744787446` links. All CTAs standardized (2026-07): WhatsApp buttons read **"Scrie pe WhatsApp"**, call buttons read **"Suna: 0744 787 446"** (number visible as text for tracking). Service sections use a **"Programeaza-te pentru [Serviciu]"** heading above the two buttons.
- **Google Fonts** — Orbitron + Inter

## Contact

- Phone: +40 744 787 446
- Email: contact@rxr-performance.ro (TODO: migrate to business email)
- Address: Strada Traian Vuia 259, 400397 Cluj-Napoca
- Hours: Luni-Sambata 09:00-18:00
- Social: facebook.com/rxrperformance · instagram.com/rxrperformance · tiktok.com/@rxrperformance

## TODO

See [`README.md`](./README.md) `## 📌 TODO` section for the full punch list. Open items:
1. Google Places API key + Place ID for live reviews
2. Business email migration (`contact@rxr-performance.ro`)
3. CookieYes dashboard: enable Google Consent Mode

Done: og-image, Apple touch icon, privacy policy page, GTM migration, CookieYes.
Explicitly **not wanted** (2026-07): Google Ads, Facebook Pixel, hardcoded GA4.
