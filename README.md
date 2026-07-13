# RXR Performance — Site oficial

[![Status](https://img.shields.io/badge/status-live-success)](https://rxr-performance.ro)
[![License](https://img.shields.io/badge/license-private-lightgrey)](#)

Site promotional pentru atelierul RXR Performance — tuning ECU Stage 1, codari BMW, diagnoza auto si optimizari DPF/EGR/AdBlue. Site complet static (HTML/CSS/JS) hostat pe **GitHub Pages**, fara backend.

- 🌐 **Live**: [rxr-performance.ro](https://rxr-performance.ro)
- 📍 **Locatie**: Strada Traian Vuia 259, 400397 Cluj-Napoca
- 📞 **Telefon**: +40 744 787 446
- 📧 **Email**: contact@rxr-performance.ro
- 🕒 **Program**: Luni-Sambata, 09:00 — 18:00
- 📱 **Social**: [Facebook](https://www.facebook.com/rxrperformance) · [Instagram](https://www.instagram.com/rxrperformance) · [TikTok](https://www.tiktok.com/@rxrperformance)

---

## 📋 Cuprins

- [Stack tehnologic](#stack-tehnologic)
- [Structura proiectului](#structura-proiectului)
- [Pagini si functionalitati](#pagini-si-functionalitati)
- [Servicii si preturi](#servicii-si-preturi)
- [Securitate, SEO si conformitate](#securitate-seo-si-conformitate)
- [Deployment](#deployment)
- [TODO — ce mai trebuie facut](#-todo--ce-mai-trebuie-facut)

---

## Stack tehnologic

| Strat | Tehnologie |
|---|---|
| HTML | HTML5 semantic, Schema.org structured data |
| CSS | Tailwind CSS 4 (CDN) + CSS custom (`base.css`, `main.css`) |
| JavaScript | Vanilla ES6+ (pattern IIFE) |
| Fonts | Google Fonts (Orbitron pentru brand, Inter pentru body) |
| Tag management | Google Tag Manager (`GTM-TTF724N7`) — singura instalare de tracking; GA/Ads se gestioneaza in container, nimic hardcodat |
| Instagram feed | [Behold.so](https://behold.so) widget |
| Cookie consent | [CookieYes](https://www.cookieyes.com) — Consent Mode v2 |
| Build | **Niciun build** — fisiere statice, fara npm |
| Hosting | GitHub Pages |

---

## Structura proiectului

```
.
├── index.html                    Homepage (Hero, Servicii, Calculator HP/Nm,
│                                 Recenzii Google, CTA, Footer)
├── servicii.html                 Detalii servicii (ECU/TCU, antipoluare, codari, diagnoza)
├── preturi.html                  Lista preturi orientative
├── galerie.html                  „Proiecte" — widget Instagram Behold + butoane sociale
├── despre-noi.html               Despre echipa + valori + cum lucram
├── contact.html                  Form contact, harta Google Maps, FAQ
├── 404.html                      Pagina custom 404
├── manifest.json                 PWA manifest
├── sitemap.xml                   Sitemap pentru Google Search Console
├── robots.txt                    Reguli crawlere + sitemap + bloc crawlere AI
├── CNAME                         Configurare domeniu (rxr-performance.ro)
├── README.md                     Acest fisier
├── CLAUDE.md                     Context pentru Claude Code
│
└── assets/
    ├── css/
    │   ├── base.css              Reset, fonts, animatii, butoane partajate
    │   └── main.css              Shell (page-shell, site-nav, site-footer, btn-cta*),
    │                             vehicle lookup, FAQ
    ├── js/
    │   ├── main.js               Calculator vehicule (cascade Marca→Model→Gen→Motor)
    │   ├── vehicle-database.js   Baza date: 5.827 vehicule, 67 marci, 699 modele
    │   ├── navigation.js         Mobile menu, sticky nav, scroll behavior
    │   ├── faq.js                Accordion details/summary
    │   ├── reviews.js            Loader recenzii Google Places (cu fallback static)
    │   ├── gtm.js                Loader Google Tag Manager (snippet extern din `<head>`)
    │   ├── utils.js              Namespace `window.RXR`, tracking, helpers
    │   └── tailwind-config.js    Theme colors (folosit doar de servicii.html)
    └── instagram/                (rezervat pentru optiuni viitoare)
```

---

## Pagini si functionalitati

### 🏠 `index.html` — Homepage

- **Hero** cu CTA (WhatsApp + Vezi servicii) + statistici (200+ vehicule, +15-30% putere etc.)
- **Servicii overview** — 3 carduri (Stage 1, Codari BMW, Diagnoza)
- **Calculator Stage 1**: cascada Marca → Model → Generatie → Motor → afiseaza Stock HP/Nm si Stage 1 HP/Nm (+28%), cu banner de avertizare ca valorile sunt orientative
- **De ce noi** — 3 piloni (experienta, siguranta, suport)
- **Recenzii Google** — 3 carduri fallback + integrare API (vezi [TODO](#-todo--ce-mai-trebuie-facut))
- **CTA Banner** + Footer

### 🔧 `servicii.html` — Servicii

Detalii pe sectiuni: Stage 1 ECU & TCU, Antipoluare (DPF/EGR/AdBlue), Codari BMW (40+ functii), Diagnoza Auto.

### 💰 `preturi.html` — Preturi

Lista orientativa: Stage 1 ECU+TCU pack (incepand de la 1.500 RON), ECU (1.000), TCU (650), Codari BMW (150), Diagnoza (150), DPF/EGR/AdBlue (la cerere). Toate „incepand de la".

### 📸 `galerie.html` — Proiecte

Widget Instagram **Behold.so** (gratis, HTTPS, fara branding) + 3 butoane sociale (FB / IG / TikTok).

### 👥 `despre-noi.html` — Despre Noi

Cine suntem, valori, ce oferim, cum lucram (proces 4 pasi).

### 📞 `contact.html` — Contact

Carduri WhatsApp + Telefon, info card (telefon/email/program), **harta Google Maps embed** (coordonate Cluj-Napoca), FAQ, butoane sociale.

### Calculator vehicule — algoritm Nm

Formula estimativa pe baza tipului si cilindreei motorului:

```
Diesel    ≤1.6L → 2.4x HP   |  1.7-2.4L → 2.15x  |  ≥2.5L → 2.0x
Turbo P.  ≤1.4L → 1.65x HP  |  1.5-2.5L → 1.55x  |  ≥2.6L → 1.4x
Aspirat   ≤1.6L → 1.5x HP   |  1.7-3.0L → 1.3x   |  ≥3.0L → 1.05x

Stage 1 HP = Stock HP × 1.28
Stage 1 Nm = Stock Nm × 1.28
```

Toate valorile marcate **clar** ca orientative (banner amber + nota in card de rezultat).

---

## Servicii si preturi

| Serviciu | Pret (RON) |
|---|---|
| Stage 1 ECU + TCU (pachet) | de la **1.500** |
| Stage 1 Motor (ECU) | de la **1.000** |
| Stage 1 Cutie (TCU) | de la **650** |
| Codari BMW | de la **150** |
| Diagnoza Auto | de la **150** |
| DPF / EGR / AdBlue | la cerere |

Toate preturile sunt orientative — final dupa consultatie gratuita pe WhatsApp.

---

## Securitate, SEO si conformitate

✅ **Securitate** — pe fiecare pagina:
- `Content-Security-Policy` (per pagina, cu domeniile necesare)
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(self), microphone=(), camera=(), payment=()`
- HTTPS fortat (GitHub Pages)

✅ **SEO** — pe fiecare pagina:
- Meta `title`, `description`, `keywords`
- `<link rel="canonical">`
- Open Graph complet + Twitter Card
- Schema.org `AutomotiveBusiness` cu adresa Cluj-Napoca + GPS + orar + sameAs FB/IG/TikTok
- Schema.org `BreadcrumbList`
- `hreflang="ro"` + geo-targeting Romania
- `sitemap.xml` (toate paginile) + `robots.txt` (cu sitemap)
- `404.html` custom

✅ **GDPR / Cookie consent** (via **CookieYes**):
- Banner + Google Consent Mode v2 gestionate de CookieYes
- Scriptul CookieYes se incarca in `<head>` **inainte** de GTM
- Cookie: `cookieyes-consent` (~1 an); vechiul banner custom (`cookie-consent.js`) a fost eliminat
- CSP whitelist: `cdn-cookieyes.com` + `log.cookieyes.com`

✅ **Anti-LLM scraping** (in `robots.txt`):
- Blocheaza GPTBot, ChatGPT-User, CCBot, anthropic-ai, Google-Extended

---

## Deployment

Site static pe **GitHub Pages**, branch `main`:

1. Modificari → `git push origin main`
2. GitHub Pages redeployeaza automat in ~1-2 minute
3. Custom domain configurat prin `CNAME` (rxr-performance.ro)

**Zero build, zero npm, zero CI.** Editezi HTML/CSS/JS direct, dai push, gata.

---

## 📌 TODO — ce mai trebuie facut

### ✅ Rezolvate

- [x] **Email business pe domeniul propriu** — `contact@rxr-performance.ro` activ pe tot site-ul
- [x] **Politica de confidentialitate** — `confidentialitate.html` live, linkata in banner cookie si in footer pe toate paginile
- [x] **Sitemap & robots.txt** — generate cu toate paginile + blocaje crawlere AI
- [x] **404 custom** — `404.html` cu butoane CTA
- [x] **Schema.org AutomotiveBusiness** — pe toate paginile
- [x] **Open Graph + Twitter Card** — completate pe toate paginile
- [x] **Security headers** — X-Frame-Options, Permissions-Policy, CSP, Referrer-Policy
- [x] **GDPR cookie consent** — CookieYes (Consent Mode v2), inaintea GTM
- [x] **Imagine OG** — `og-image.png` (1800x945) referita corect in toate meta tags
- [x] **Apple Touch Icon** — `apple-touch-icon.png` (180x180) logo RXR pe slate, linkata pe toate paginile
- [x] **Google Tag Manager** — `GTM-TTF724N7`, singura instalare de tracking (fara GA4/Ads hardcodat)
- [x] **CTA-uri unificate** — toate butoanele „Scrie pe WhatsApp" + „Suna: 0744 787 446"
- [x] **Google Search Console + sitemap** — verificat si sitemap-ul cu 7 URL-uri acceptat

### ❌ Ramase (necesita actiune din partea ta)

> **Nota (2026-07):** Google Ads si Facebook Pixel **nu se doresc** — nu se instaleaza nimic hardcodat. Orice tracking se face exclusiv prin containerul GTM.

#### 1. CookieYes → Consent Mode
- **Unde**: dashboard-ul CookieYes (nu in cod)
- **Pas**: activeaza **Google Consent Mode** ca tagurile din GTM sa respecte consimtamantul

#### 2. Google Places API pentru recenzii live
- **Fisier**: `assets/js/reviews.js`
- **Cauta**: `CONFIG.apiKey` si `CONFIG.placeId` (golite momentan)
- **Pasi**:
  1. [Google Cloud Console](https://console.cloud.google.com/google/maps-apis) → enable „Places API"
  2. Creezi API key, restrictionezi la `rxr-performance.ro/*` (HTTP referrer)
  3. [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id) → cauti „RXR Performance Cluj-Napoca"
  4. Completezi cele 2 valori in `reviews.js`
- **Status**: ❌ Foloseste fallback static (3 carduri statice cu recenzii placeholder)

#### 3. Email business
- Migrare completa catre `contact@rxr-performance.ro` (activ pe site; de confirmat casuta)

### Optional (nice to have)

- [ ] Submit sitemap in [Google Search Console](https://search.google.com/search-console)
- [ ] Setup [Microsoft Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Lighthouse audit (`npx lighthouse https://rxr-performance.ro --view`)
- [ ] Schimbare URL `rxr-performance.ro` → `rxr-performance.ro` in canonical-uri ramase (cateva pagini inca au varianta fara cratima)
- [ ] Compresie imagini (WebP) pentru orice imagine reala adaugata in viitor

---

## 🤖 Note pentru Claude / dezvoltatori viitori

Vezi [`CLAUDE.md`](./CLAUDE.md) pentru context complet despre proiect, conventii, si arhitectura interna.

---

**Made with ❤️ in Cluj-Napoca**
