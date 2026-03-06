# RXR Performance — Automotive Tuning Services Website

Promotional website for automotive ECU tuning, car coding, and diagnostic services. Static HTML/CSS/JS site with a dynamic vehicle database for performance lookup.

**Domain**: rxr-performance.ro

## Tech Stack

| Layer | Technology |
|-------|-----------|
| HTML | HTML5 (semantic, Schema.org structured data) |
| CSS | Tailwind CSS 4 (CDN), custom CSS |
| JavaScript | Vanilla ES6+ (IIFE modules) |
| Fonts | Google Fonts (Orbitron for branding, Inter for body) |
| Analytics | Google Analytics 4 (G-LQ96D9R5KF) |
| Build | None — static files, no npm |

**No backend, no database, no package.json.** Pure static site.

## Project Structure

```
/
├── index.html                # Main homepage (single-scroll, all sections)
├── preturi.html              # Pricing page (password-protected: "rxr2024")
├── manifest.json             # PWA manifest
├── CNAME                     # Domain: rxr-performance.ro
└── assets/
    ├── js/
    │   ├── main.js           # Vehicle lookup & selection (cascading dropdowns)
    │   ├── navigation.js     # Mobile menu, smooth scroll, sticky nav
    │   ├── faq.js            # Accordion (details/summary)
    │   ├── preturi.js        # Password protection (session storage)
    │   ├── utils.js          # Global RXR namespace, analytics, WhatsApp CTA
    │   ├── tailwind-config.js # Custom color theme
    │   └── vehicle-database.js # 6000+ lines, 2000+ vehicles with tuning specs
    └── css/
        ├── base.css          # Fonts, animations, reset, card styles
        ├── main.css          # Homepage styles, vehicle lookup, FAQ, nav
        └── preturi.css       # Pricing page, password overlay
```

## Key Patterns

- **IIFE pattern** — all JS files use Immediately Invoked Function Expressions
- **RXR namespace** — global `window.RXR` object for shared utilities
- **Romanian UI** — all content in Romanian
- **No build step** — edit HTML/CSS/JS directly, deploy static files
- **Commit author**: `Rares Roca <rares.roca05@gmail.com>`

## Color Theme (Tailwind Config)

```
rxrPrimary:     #0EA5E9  (cyan)
rxrPrimarySoft: #38BDF8  (light cyan)
rxrElectric:    #06B6D4  (teal)
rxrMViolet:     #D946EF  (fuchsia)
rxrMRed:        #F43F5E  (rose)
rxrDeep:        #030712  (background)
rxrCard:        #050816  (card background)
rxrOutline:     #1f2937  (gray-800)
```

## Pages

### index.html (Homepage)
Single-scroll sections: Hero → Services (tuning, coding, diagnostics) → Vehicle Lookup (Brand→Model→Generation→Engine cascade, HP calculator) → ECU/TCU Process → BMW Coding (40+ features) → VAG Coding → FAQ → Footer

### preturi.html (Pricing)
Password-protected (`rxr2024`, session storage unlock). Pricing tables for all services. `noindex, nofollow`.

## Vehicle Database

`vehicle-database.js` — 2000+ entries, ~6100 lines.
Format: `{ brand, model, generation, engine, stockHP, stage1HP }`
Supports: BMW, Audi, VW, Skoda, Seat, Alfa Romeo, and many more.

Used by cascading dropdowns in `main.js`: Brand → Model → Generation → Engine → shows stock HP, Stage 1 HP, gain %.

## Services & Pricing

| Service | Price (RON) |
|---------|-------------|
| Stage 1 Motor | 900 |
| Stage 1 TCU | 500 |
| BMW Coding | 100–200 |
| VAG Coding | 100–200 |
| Diagnostics | 150 |

## Analytics & Tracking

- **Google Analytics 4**: G-LQ96D9R5KF (active)
- **Google Ads**: placeholder ready (commented out)
- **Facebook Pixel**: placeholder ready (commented out)
- **Custom tracking**: `RXR.trackEvent()`, `RXR.trackConversion()`
- Events: whatsapp_click, phone_click, vehicle selections

## SEO

- Schema.org `AutomotiveBusiness` with 10 service offers
- Open Graph + Twitter Cards
- `hreflang: ro`, geo-targeting Romania
- Canonical URLs per page
- BreadcrumbList structured data

## Deployment

- **Static hosting** (GitHub Pages via CNAME, or similar)
- **Domain**: rxr-performance.ro
- **No build needed** — deploy files as-is
- **Repo**: github.com/raresroca05/rxr-performance (private)

## Contact

- Phone: +40 744 787 446
- Email: rares.roca05@gmail.com
- Hours: Mon–Sat 09:00–18:00
- Social: Facebook/Instagram @rxrperformance
