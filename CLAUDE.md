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
| Analytics | Google Analytics 4 (G-LQ96D9R5KF), Consent Mode v2 |
| Instagram feed | Behold.so widget |
| Cookie consent | Custom GDPR banner |
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
    │   ├── cookie-consent.js     # GDPR banner + GA Consent Mode v2 integration
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

- **Google Analytics 4**: G-LQ96D9R5KF (active, gated by cookie consent)
- **Google Ads**: placeholder ready (commented out — needs `AW-XXXXXXXXX`)
- **Facebook Pixel**: placeholder ready (commented out — needs Pixel ID)
- **Google Consent Mode v2**: integrated via `cookie-consent.js`
- **Custom tracking**: `RXR.trackEvent()`, `RXR.trackConversion()` in `utils.js`
- Events tracked: `whatsapp_click`, `phone_click`, `vehicle_lookup`

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

- Custom banner via `cookie-consent.js`, shown on first visit
- Choices stored in `localStorage` key `rxr_cookie_consent` (`accept` / `reject`)
- Integrated with GA Consent Mode v2 (default denied, updated on user choice)
- Privacy policy link currently `href="#"` — needs `confidentialitate.html` page

## Third-party integrations

- **Behold.so** — Instagram feed widget on `galerie.html` (`feed-id="3nVTXEc9DkXMC5BLJr2Z"`)
- **Google Maps** — embed on `contact.html` (coords for Cluj-Napoca)
- **WhatsApp Web** — primary CTA via `wa.me/40744787446` links
- **Google Fonts** — Orbitron + Inter

## Contact

- Phone: +40 744 787 446
- Email: contact@rxr-performance.ro (TODO: migrate to business email)
- Address: Strada Traian Vuia 259, 400397 Cluj-Napoca
- Hours: Luni-Sambata 09:00-18:00
- Social: facebook.com/rxrperformance · instagram.com/rxrperformance · tiktok.com/@rxrperformance

## TODO

See [`README.md`](./README.md) `## 📌 TODO` section for the full punch list:
1. `og-image.png` (1200x630) for social sharing
2. Google Ads conversion ID
3. Facebook Pixel ID
4. Google Places API key + Place ID for live reviews
5. Business email migration
6. Privacy policy page (`confidentialitate.html`)
7. Apple touch icon PNG
