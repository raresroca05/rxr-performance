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
| Analytics | Google Analytics 4 (`G-LQ96D9R5KF`) — cu Consent Mode v2 |
| Instagram feed | [Behold.so](https://behold.so) widget |
| Cookie consent | Custom (GDPR-friendly) |
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
    │   ├── cookie-consent.js     Banner GDPR + integrare GA Consent Mode v2
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

✅ **GDPR / Cookie consent**:
- Banner cookie consent la prima vizita
- Default „denied" pana la decizie utilizator
- Integrat cu Google Analytics Consent Mode v2
- Decizia salvata in `localStorage` cheia `rxr_cookie_consent`

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

### Setari externe (necesita actiune din partea ta)

#### 1. Imagine OG pentru sharing pe social media
- **Fisier necesar**: `og-image.jpg` (1200x630 px) in radacina
- **Folosit pentru**: previzualizarea link-ului pe WhatsApp/Facebook/LinkedIn
- **Cum**: Canva → template „Social Media Cover 1200x630" → logo RXR Performance + tagline „Tuning ECU Stage 1 | Codari BMW | Cluj-Napoca"
- **Status**: ❌ Lipseste

#### 2. Google Ads conversion tracking
- **Fisiere**: `index.html`, `servicii.html`, `preturi.html`, `assets/js/utils.js`
- **Cauta**: comentariile `// gtag('config', 'AW-XXXXXXXXX');` si `// 'send_to': 'AW-XXXXXXXXX/...'`
- **Pasi**:
  1. Creezi cont [Google Ads](https://ads.google.com)
  2. Setezi un Conversion (Lead — Click WhatsApp / Click Phone)
  3. Inlocuiesti `AW-XXXXXXXXX` cu ID-ul tau real
  4. Decomentezi liniile
- **Status**: ❌ Placeholder activ

#### 3. Facebook Pixel
- **Fisiere**: `index.html`, `servicii.html`
- **Cauta**: comentariile `// fbq('init', 'XXXXXXXXXXXXXXXX');`
- **Pasi**:
  1. Cont [Facebook Business Manager](https://business.facebook.com) → Events Manager → creezi Pixel
  2. Inlocuiesti `XXXXXXXXXXXXXXXX` cu Pixel ID-ul tau
  3. Decomentezi
- **Status**: ❌ Placeholder activ

#### 4. Google Places API pentru recenzii live
- **Fisier**: `assets/js/reviews.js`
- **Cauta**: `CONFIG.apiKey` si `CONFIG.placeId` (golite momentan)
- **Pasi**:
  1. [Google Cloud Console](https://console.cloud.google.com/google/maps-apis) → enable „Places API"
  2. Creezi API key, restrictionezi la `rxr-performance.ro/*`
  3. [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id) → cauti business-ul tau
  4. Completezi cele 2 valori in `reviews.js`
- **Status**: ❌ Foloseste fallback static (3 carduri statice)

#### 5. Email business pe domeniul propriu
- **Stare actuala**: site-ul foloseste `contact@rxr-performance.ro` peste tot
- **Recomandare**: cont nou (ex. `contact@rxr-performance.ro` via Google Workspace ~$6/luna sau `rxrperformance@gmail.com` gratis)
- **Cand ai noul email**: `grep -rn "rares.roca05" .` ca sa vezi unde apare, apoi find & replace global
- **Status**: ❌ Foloseste email personal

#### 6. Politica de confidentialitate
- **Necesar pentru**: GDPR conform + link real in banner-ul cookie
- **Cauta in `cookie-consent.js`**: `<a href="#">politica de confidentialitate</a>`
- **Pasi**: creezi `confidentialitate.html` (sablon GDPR de pe `gdpr.eu` sau `iubenda.com`), schimbi `href` in banner
- **Status**: ❌ Link gol (`href="#"`)

#### 7. Apple Touch Icon real
- **Stare actuala**: SVG emoji 🏎️ (functional, dar arata generic pe iPhone home screen)
- **Recomandare**: `apple-touch-icon-180x180.png` (logo RXR pe fundal slate)
- **Status**: ⚠️ Functional dar nu premium

### Optional (nice to have)

- [ ] Compresie imagini (WebP pentru orice imagine reala)
- [ ] Lighthouse audit (`npx lighthouse https://rxr-performance.ro`)
- [ ] Verificare site in [Google Search Console](https://search.google.com/search-console) si submit sitemap
- [ ] Setup [Microsoft Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Schimbare domeniu de la `rxrperformance.ro` (in unele meta tags ramase) la `rxr-performance.ro` consistent

---

## 🤖 Note pentru Claude / dezvoltatori viitori

Vezi [`CLAUDE.md`](./CLAUDE.md) pentru context complet despre proiect, conventii, si arhitectura interna.

---

**Made with ❤️ in Cluj-Napoca**
