# RXR Performance — Site oficial

[![Status](https://img.shields.io/badge/status-live-success)](https://rxr-performance.ro)
[![License](https://img.shields.io/badge/license-private-lightgrey)](#)

Site promotional pentru atelierul RXR Performance — tuning ECU Stage 1, codari BMW si diagnoza auto. Site complet static (HTML/CSS/JS) hostat pe **GitHub Pages**, fara backend.

- 🌐 **Live**: [rxr-performance.ro](https://rxr-performance.ro)
- 📍 **Locatie**: Strada Sannicoara 6, 407042 Cluj-Napoca
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
| CSS | CSS custom, fara framework — un singur fisier `main.css` |
| JavaScript | Vanilla ES6+ (pattern IIFE) |
| Fonts | Google Fonts (Archivo pentru titluri si butoane, incarcat fara sa blocheze pagina); textul foloseste fontul sistemului |
| Tag management | Google Tag Manager (`GTM-TTF724N7`) — singura instalare de tracking; GA/Ads se gestioneaza in container, nimic hardcodat |
| Instagram feed | [Behold.so](https://behold.so) JSON feed (`feeds.behold.so`), randat de `instagram.js` |
| Cookie consent | [CookieYes](https://www.cookieyes.com) — Consent Mode v2, incarcat prin GTM |
| Build | **Niciun build** — fisiere statice, fara npm |
| Hosting | GitHub Pages |

---

## Structura proiectului

```
.
├── index.html                    Site-ul intreg, pe o singura pagina: hero, Proiecte, Calculator,
│                                 De ce RXR, Recenzii, Servicii si preturi, Intrebari, Contact
├── servicii.html                 Redirectioneaza la index.html#servicii (pastreaza ?gclid etc.)
├── preturi.html                  Redirectioneaza la index.html#preturi
├── galerie.html                  Redirectioneaza la index.html#proiecte
├── despre-noi.html               Redirectioneaza la index.html#despre
├── contact.html                  Redirectioneaza la index.html#contact
├── confidentialitate.html        Politica de confidentialitate
├── 404.html                      Pagina custom 404
├── manifest.json                 PWA manifest
├── sitemap.xml                   Sitemap (index + confidentialitate)
├── robots.txt                    Reguli crawlere + sitemap + bloc crawlere AI
├── CNAME                         Configurare domeniu (rxr-performance.ro)
├── README.md                     Acest fisier
├── CLAUDE.md                     Context pentru Claude Code
│
├── data/vehicles/                Fise tehnice verificate, cu sursa pe fiecare rand
├── tools/build-vehicle-db.py     Genereaza baza de date a calculatorului
│
└── assets/
    ├── css/
    │   └── main.css              Tot stilul: culori, butoane, header, sectiuni, carduri, footer
    └── js/
        ├── main.js               Calculator (lista de masini se descarca doar cand ajungi la el)
        ├── vehicle-database.js   Generat din data/vehicles (6.974 motoare, 30 marci)
        ├── site.js               Meniul activ (desktop + breadcrumb pe mobil), bara de jos pe mobil
        ├── instagram.js          Proiectele de pe Instagram (Behold), incarcate cand te apropii de ele
        ├── reviews.js            Loader recenzii Google Places (cu fallback static)
        ├── gtm.js                Loader Google Tag Manager (snippet extern din `<head>`)
        └── utils.js              Namespace `window.RXR`, tracking telefon + WhatsApp, link WhatsApp
```

---

## Pagina principala (one page)

- **Header**: logo, meniu (desktop), buton WhatsApp si buton telefon (doar iconite). Pe mobil, sub header e un meniu tip breadcrumb (Acasa / Proiecte / Calculator / Recenzii / Preturi / Contact).
- **Hero** centrat: Stage 1 de la 1.500 RON, butoane „Suna 0744 787 446" si „WhatsApp", 4 statistici.
- **Proiecte**: ultimele 8 postari de pe Instagram (Behold JSON feed). Pe mobil se gliseaza.
- **Calculator Stage 1**, **De ce RXR** (+ certificari, 4 pasi), **Recenzii**.
- **Servicii si preturi** (dupa recenzii, la cererea marketingului): 6 carduri egale, fiecare cu pret si doua butoane mici (WhatsApp cu mesaj pregatit pentru serviciul respectiv, telefon).
- **Intrebari frecvente**, **Contact** (adresa, program, telefon, email, Maps/Waze, social).
- Pe mobil, bara de jos cu „Suna" si „WhatsApp" apare doar dupa ce treci de butoanele din hero.

### Calculator vehicule

Baza de date are 6.974 de motoare (30 de marci, 265 de modele, 2000-2026), cu puterea si cuplul de serie din fise tehnice reale. Sursa fiecarui rand e in `data/vehicles/*.json`; fisierul `assets/js/vehicle-database.js` se genereaza cu `python3 tools/build-vehicle-db.py --write`.

Stage 1 e o estimare dupa tipul motorului: diesel turbo +15-28%, benzina turbo +12-25%, atmosferic +6% (cu nota ca acolo castigul e mic), plug-in hybrid +10%. Valorile sunt marcate clar ca orientative.

---

## Servicii si preturi

| Serviciu | Pret (RON) |
|---|---|
| Stage 1 ECU + TCU (pachet) | de la **2.000** (economisesti 500 lei) |
| Stage 1 Motor (ECU) | de la **1.500** |
| Stage 1 Cutie (TCU) | de la **1.000** |
| Codari BMW | de la **150** |
| Diagnoza Auto | de la **150** (gratuita la tuning) |

Toate preturile sunt orientative — final dupa consultatie gratuita (telefon sau WhatsApp).

---

## Securitate, SEO si conformitate

✅ **Securitate** — pe fiecare pagina:
- `Content-Security-Policy` (doar domeniile folosite; fara `object`, `base` sau formulare externe)
- `referrer`: `strict-origin-when-cross-origin`
- Datele din afara (Instagram, recenzii Google) sunt curatate inainte de afisare
- HTTPS fortat (GitHub Pages)

✅ **SEO** — pe fiecare pagina:
- Meta `title`, `description`
- `<link rel="canonical">`
- Open Graph complet + Twitter Card
- Schema.org `AutomotiveBusiness` cu adresa Cluj-Napoca + GPS + orar + sameAs FB/IG/TikTok
- Schema.org `BreadcrumbList`
- `hreflang="ro"` + geo-targeting Romania
- `sitemap.xml` (toate paginile) + `robots.txt` (cu sitemap)
- `404.html` custom

✅ **GDPR / Cookie consent** (via **CookieYes**):
- Banner + Google Consent Mode v2 gestionate de CookieYes
- Incarcat **prin GTM** (nu hardcodat in cod) — website key `57bb99c764307d7ce071a31fe0a303e0`
- ⚠️ In GTM foloseste template-ul CookieYes pe trigger-ul **Consent Initialization** (ca defaults-urile de consimtamant sa fie setate inainte de restul tag-urilor)
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
- [x] **Security headers** — Permissions-Policy, CSP, Referrer-Policy, X-Content-Type-Options
- [x] **GDPR cookie consent** — CookieYes (Consent Mode v2), inaintea GTM
- [x] **Imagine OG** — `og-image.png` (1800x945) referita corect in toate meta tags
- [x] **Apple Touch Icon** — `apple-touch-icon.png` (180x180) logo RXR pe slate, linkata pe toate paginile
- [x] **Google Tag Manager** — `GTM-TTF724N7`, singura instalare de tracking (fara GA4/Ads hardcodat)
- [x] **CTA-uri** — „Suna 0744 787 446" + WhatsApp (WhatsApp readus pe 2026-10-20, cu clasa `no-swap` ca WhatConverts sa nu-i schimbe numarul)
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
