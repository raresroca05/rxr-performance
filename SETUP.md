# Ghid setup pas-cu-pas — RXR Performance

Ghid complet pentru a finaliza configurarea site-ului. Fiecare sectiune contine **exact** ce sa apesi, unde sa cauti si ce sa copiezi unde.

**Convingere de timp total**: ~90 min daca le faci pe toate intr-o sedinta.

---

## 📋 Cuprins

1. [Imagine OG (15 min, gratuit)](#1-imagine-og-pentru-share-uri)
2. [Google Analytics — verificare ca merge (5 min)](#2-google-analytics--verificare)
3. [Google Search Console — submit sitemap (10 min, gratuit)](#3-google-search-console--submit-sitemap)
4. [Google Ads conversion (20 min, gratuit)](#4-google-ads-conversion-tracking)
5. [Facebook Pixel (15 min, gratuit)](#5-facebook-pixel)
6. [Google Places API pentru recenzii live (20 min, ~$0-5/luna)](#6-google-places-api-pentru-recenzii-live)
7. [Apple Touch Icon (5 min, gratuit)](#7-apple-touch-icon)
8. [Bonus: Bing Webmaster Tools (5 min, gratuit)](#8-bonus-bing-webmaster-tools)

---

## 1. Imagine OG pentru share-uri

**De ce**: cand cineva trimite linkul `rxr-performance.ro` pe WhatsApp/Facebook/LinkedIn, apare o previzualizare cu imagine. Fara asta arata gri si neprofesional.

### Pasi:

1. Deschide [canva.com](https://canva.com) → Sign up gratis (cu Google)
2. In bara de cautare sus, scrie `Facebook Cover` → enter
3. Alege un template simplu (sau **Create blank** cu dimensiuni custom)
4. **Setezi dimensiunea exacta**: Click pe `Resize` (sus dreapta) → `Custom size` → **1200 x 630 px** → `Resize`
5. Designeaza imaginea:
   - **Background**: slate dark (cod culoare: `#0F172A` sau `#1E293B`)
   - **Text mare central**: `RXR PERFORMANCE`
   - **Tagline mic sub**: `Tuning ECU Stage 1 | Codari BMW | Cluj-Napoca`
   - **Accent cyan**: poti pune o linie sau forma cu culoarea `#0EA5E9`
   - **Logo masina/key visual**: optional, in colt
6. Click `Share` (sus dreapta) → `Download` → format **JPG** sau **PNG** → `Download`
7. Salvezi fisierul ca **`og-image.png`** (exact acest nume) in folderul proiectului `/Users/raresroca/Projects/Personal/rxr-performance/`
8. Deschizi terminalul si executi:
   ```bash
   cd /Users/raresroca/Projects/Personal/rxr-performance
   git add og-image.png
   git commit -m "add OG image for social sharing"
   git push origin main
   ```

### Verificare:

- Astepti 2 min sa redeployeze
- Deschizi [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Lipesti `https://rxr-performance.ro/` → click `Debug` → ar trebui sa vezi imaginea
- Daca arata vechi, click `Scrape Again`

✅ **Done.**

---

## 2. Google Analytics — verificare

**De ce**: deja avem Google Analytics activ (ID `G-LQ96D9R5KF`), dar e bine sa verifici ca primesti date.

### Pasi:

1. Mergi la [analytics.google.com](https://analytics.google.com)
2. Loghin cu contul Google care detine proprietatea
3. Selecteaza proprietatea **RXR Performance** (sau cum se cheama)
4. In stanga: **Reports** → **Realtime**
5. In alt tab, deschide [rxr-performance.ro](https://rxr-performance.ro) si navigheaza prin pagini
6. In tab-ul Analytics, ar trebui sa vezi `1 user in last 30 minutes`

### Daca nu vezi nimic:

- Verifica ca ID-ul `G-LQ96D9R5KF` din `index.html` (linia ~73) e corect
- Asigura-te ca ai acceptat cookies pe site (banner-ul din colt jos)

✅ **Done.**

---

## 3. Google Search Console — submit sitemap

**De ce**: Google sa stie ca site-ul tau exista si sa indexeze paginile.

### Pasi:

1. Mergi la [search.google.com/search-console](https://search.google.com/search-console)
2. Loghin cu acelasi cont Google
3. Click `Add property` → alegi **Domain** → introdu `rxr-performance.ro` → `Continue`
4. Google iti da o **valoare TXT** pentru DNS verification
5. **Verificare DNS** (cea mai durabila):
   - Mergi la providerul tau de domeniu (probabil GoDaddy, Hostinger, NameCheap etc.)
   - In DNS Management, adaugi un record nou: `Type: TXT`, `Name: @`, `Value: <valoarea de la Google>`
   - Te intorci in Search Console → click `Verify` (poate dura 5-15 min sa se propage)
6. Dupa verificare, in stanga: `Sitemaps`
7. La `Add a new sitemap` introdu: `sitemap.xml`
8. Click `Submit`
9. Status ar trebui sa devina `Success` in cateva minute

### Cautari sponsorizate (verificare):

- Mai jos in meniul stang: `URL Inspection` → introduce `https://rxr-performance.ro/`
- Click `Request Indexing` (ca Google sa indexeze imediat homepage-ul)
- Repeti pentru `/servicii.html`, `/preturi.html`, etc. (max 10 pe zi)

✅ **Done.**

---

## 4. Google Ads conversion tracking

**De ce**: ca sa stii cati clienti vin de pe reclame (cand vei face Google Ads campaign).

### Pas A — Creezi cont Google Ads:

1. Mergi la [ads.google.com](https://ads.google.com) → `Start Now`
2. Loghin cu acelasi cont Google
3. La intrebari initiale (Smart Mode / Expert Mode), alege **Expert Mode** (jos)
4. La `Create your first campaign`, click **Skip campaign creation** (jos)
5. Acum esti in dashboard-ul Google Ads gol

### Pas B — Iei Conversion ID:

1. In meniul de sus, click `Tools` (icon cu chei) → sub `Measurement` → click `Conversions`
2. Click butonul albastru `+ New conversion action`
3. Alegi sursa: **Website**
4. La `Website domain` pune `rxr-performance.ro` → click `Scan`
5. Click `Add a conversion action manually`
6. **Setari pentru o conversie „WhatsApp Click"**:
   - **Category**: `Lead` → `Submit lead form`
   - **Conversion name**: `WhatsApp Click`
   - **Value**: `Use the same value for each conversion` → introduce `5` (RON estimat per lead)
   - **Count**: `One` (per click)
   - **Click-through conversion window**: `30 days`
   - **View-through**: `1 day`
   - **Include in „Conversions"**: ✅ Yes
   - **Attribution model**: `Data-driven`
7. Click `Done` → `Save and continue`
8. La `Set up the tag`: alege **Use Google Tag Manager** sau **Install the tag yourself**
   - **Recomandat**: `Install the tag yourself` (mai simplu pentru tine)
9. Apare un cod cu **2 valori importante**:
   - **Conversion ID**: `AW-1234567890` (incepe cu `AW-`)
   - **Conversion Label**: `abcDefGhIj-kLmN` (un string scurt)
   - **Salveaza-le pe amandoua intr-un notepad temporar**

### Pas C — Pui ID-urile in cod:

1. Deschide `/Users/raresroca/Projects/Personal/rxr-performance/index.html`
2. Cauta cu `Ctrl+F`: `AW-XXXXXXXXX`
3. Vei gasi linia 83 (sau prin acolo):
   ```javascript
   // Google Ads - Replace AW-XXXXXXXXX with your Google Ads ID
   // gtag('config', 'AW-XXXXXXXXX');
   ```
4. **Decomenteaza** (sterge `// `) si **inlocuieste** `AW-XXXXXXXXX` cu `AW-` + ID-ul tau real:
   ```javascript
   gtag('config', 'AW-1234567890');
   ```
5. Repeti acelasi pas in `servicii.html` si `preturi.html`

6. Acum deschide `/Users/raresroca/Projects/Personal/rxr-performance/assets/js/utils.js`
7. Cauta `'send_to': 'AW-XXXXXXXXX/'`
8. Decomenteaza si inlocuieste cu:
   ```javascript
   gtag('event', 'conversion', {
     'send_to': 'AW-1234567890/abcDefGhIj-kLmN',
     'value': value,
     'currency': 'RON'
   });
   ```
   (`abcDefGhIj-kLmN` e Conversion Label-ul de la pas B)

9. Salvezi toate fisierele si commit:
   ```bash
   cd /Users/raresroca/Projects/Personal/rxr-performance
   git add index.html servicii.html preturi.html assets/js/utils.js
   git commit -m "feat: enable Google Ads conversion tracking"
   git push origin main
   ```

### Pas D — Verifici ca merge:

1. Astepti 2 min sa redeployeze
2. Deschide site-ul si dai click pe butonul WhatsApp
3. In Google Ads dashboard → `Conversions` → ar trebui sa vezi `1` la `Last 7 days` (poate dura 24h sa apara)

✅ **Done.**

---

## 5. Facebook Pixel

**De ce**: tracking pentru reclame Facebook/Instagram + remarketing audience.

### Pas A — Creezi Pixel-ul:

1. Mergi la [business.facebook.com](https://business.facebook.com) → loghin cu Facebook-ul tau
2. Daca nu ai Business Manager, te ghideaza sa creezi (Business Name: `RXR Performance`, email: `contact@rxr-performance.ro`)
3. In Business Manager, in stanga: `All tools` → sub `Manage business` → `Events Manager`
4. Sau direct: [business.facebook.com/events_manager](https://business.facebook.com/events_manager)
5. Click `Connect data sources` (sau iconita verde `+`) → alege **Web** → `Connect`
6. **Name your dataset**: `RXR Performance Website` → `Create`
7. Esti intrebat cum vrei sa instalezi → alege **Install code manually**
8. **Apare codul base** care contine un numar lung — acel numar e **Pixel ID-ul tau** (15-16 cifre, ex. `1234567890123456`)
9. **Copiaza Pixel ID-ul**

### Pas B — Pui Pixel ID in cod:

1. Deschide `/Users/raresroca/Projects/Personal/rxr-performance/index.html`
2. Cauta cu `Ctrl+F`: `XXXXXXXXXXXXXXXX` (linia ~96)
3. Vei gasi:
   ```javascript
   // fbq('init', 'XXXXXXXXXXXXXXXX');
   // fbq('track', 'PageView');
   ```
4. **Decomenteaza ambele linii** si **inlocuieste** `XXXXXXXXXXXXXXXX` cu Pixel ID-ul tau:
   ```javascript
   fbq('init', '1234567890123456');
   fbq('track', 'PageView');
   ```
5. Mai jos, in `<noscript>`, vei vedea inca un `XXXXXXXXXXXXXXXX` — decomenteaza si inlocuieste si acolo

6. Repeti acelasi pas in `servicii.html`

7. Commit + push:
   ```bash
   git add index.html servicii.html
   git commit -m "feat: enable Facebook Pixel tracking"
   git push origin main
   ```

### Pas C — Verifici cu Pixel Helper:

1. Instaleaza extensia Chrome [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Deschide `rxr-performance.ro`
3. Click pe iconita Pixel Helper — ar trebui sa vezi `1 pixel found` cu evenimentul `PageView`

✅ **Done.**

---

## 6. Google Places API pentru recenzii live

**De ce**: pe homepage apar 3 carduri cu recenzii. Acum sunt placeholder. Le vrem sa fie recenziile reale Google.

### Pas A — Iei Place ID-ul tau:

1. Mai intai trebuie sa ai un **Google Business Profile** (fost Google My Business)
2. Daca nu ai, creezi unul: [google.com/business](https://google.com/business) → adaugi business-ul tau („RXR Performance", adresa Cluj-Napoca, telefon, etc.)
3. Dupa verificare (poate dura 1-2 saptamani pentru codul prin posta), business-ul apare pe Google Maps
4. **Place ID Finder**: [developers.google.com/maps/documentation/places/web-service/place-id](https://developers.google.com/maps/documentation/places/web-service/place-id)
5. In harta de pe pagina, cauti `RXR Performance Cluj` → click pe pin
6. Apare un popup cu **Place ID** (un string lung incepe cu `ChIJ...`)
7. **Copiaza-l** si salveaza-l intr-un notepad

### Pas B — Creezi Google Cloud Project si API Key:

1. Mergi la [console.cloud.google.com](https://console.cloud.google.com) → loghin
2. Sus, langa „Google Cloud" e un selector de proiect → click → `New Project`
3. **Project name**: `RXR Performance Site` → `Create`
4. Asteapta cateva secunde, apoi selecteaza noul proiect
5. In meniul hamburger (☰) stanga → `APIs & Services` → `Library`
6. Cauta `Places API` → click → click `Enable`
7. Tot in `APIs & Services` → `Credentials`
8. Click `+ Create credentials` (sus) → `API key`
9. Apare un dialog cu **cheia ta API** (un string lung, ex. `AIzaSyABC...`) — **copiaza-l**
10. Click `Edit API key` sa o restrictionezi:
    - **Application restrictions**: `HTTP referrers (web sites)`
    - **Website restrictions**: adauga `https://rxr-performance.ro/*` si `https://*.rxr-performance.ro/*`
    - **API restrictions**: `Restrict key` → selecteaza doar `Places API`
    - `Save`

### Pas C — Activezi Billing (necesar pentru Places API):

1. In meniul hamburger → `Billing`
2. Daca nu ai cont billing, creezi unul (Google iti cere un card, dar are **$200 credit gratuit lunar** pentru Maps Platform)
3. Conectezi billing-ul la proiectul tau
4. **Important**: configureaza Budget Alert la $10/luna ca sa nu te trezesti cu surpriza

### Pas D — Pui cheia + Place ID in cod:

1. Deschide `/Users/raresroca/Projects/Personal/rxr-performance/assets/js/reviews.js`
2. Sus, in `CONFIG`, completezi:
   ```javascript
   const CONFIG = {
     apiKey: 'AIzaSyABC...',  // cheia ta API
     placeId: 'ChIJ...',       // Place ID-ul tau
     fallbackReviewsUrl: 'https://www.google.com/search?q=RXR+Performance+Cluj+Napoca',
     maxReviews: 6
   };
   ```
3. Commit + push:
   ```bash
   git add assets/js/reviews.js
   git commit -m "feat: enable live Google Places reviews"
   git push origin main
   ```

### Pas E — Verifici:

1. Deschide `rxr-performance.ro`
2. Scroll la sectiunea „Ce spun clientii nostri"
3. Ar trebui sa vezi recenziile **reale** de pe Google (cu numele real al clientilor si textul lor)
4. Daca tot vezi cele 3 placeholder, deschide DevTools → Console → cauta erori
   - `REQUEST_DENIED`: verifica restrictiile API key
   - `INVALID_REQUEST`: verifica Place ID-ul

✅ **Done.**

---

## 7. Apple Touch Icon

**De ce**: cand cineva salveaza site-ul pe iPhone home screen, in loc de emoji 🏎️ apare un logo proper.

### Pasi:

1. In Canva (sau Figma), creezi o imagine **180x180 px**
2. **Fundal**: slate dark (`#0F172A`)
3. **Centru**: text mare `RXR` cu font Orbitron (sau similar) in culoare `#0EA5E9`
4. Sub: text mic `PERFORMANCE`
5. Download ca **PNG**
6. Salveaza ca `apple-touch-icon.png` in radacina proiectului
7. Adauga in fiecare HTML (sau eu pot face asta automat — spune-mi):
   ```html
   <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
   ```
   (chiar deasupra linkului existent `<link rel="apple-touch-icon" href="data:image/svg+xml,...">`)
8. Commit + push

✅ **Done.**

---

## 8. Bonus: Bing Webmaster Tools

**De ce**: ~3% din traficul de cautare vine de pe Bing. Easy win.

### Pasi:

1. Mergi la [bing.com/webmasters](https://www.bing.com/webmasters)
2. Loghin cu Microsoft (sau creezi cont gratis)
3. Click `Add a site` → introduce `https://rxr-performance.ro`
4. Daca ai deja Google Search Console verificat, click `Import from GSC` → urmaresti pasii (5 secunde)
5. Daca nu, faci la fel ca la Google (DNS TXT record)
6. Dupa verificare → `Sitemaps` → submit `https://rxr-performance.ro/sitemap.xml`

✅ **Done.**

---

## 🎯 Order recomandat de executie

Daca nu vrei sa faci toate odata, asta e ordinea priorizata:

1. **Astazi (15 min)**: og-image.png + Search Console (mai important pentru SEO si share-uri)
2. **Cand ai chef (20 min)**: Apple Touch Icon + Bing Webmaster Tools
3. **Cand vrei sa pornesti campanii (40 min)**: Google Ads + Facebook Pixel
4. **Cand ai 20-50 recenzii Google pe business profile (20 min)**: Google Places API
   *(Inainte de a avea recenzii, nu are sens — cardurile placeholder de azi arata mai bine decat 0 recenzii reale)*

---

## 🆘 Daca ramai blocat

- **Probleme cu DNS / domeniu**: spune-mi providerul tau de domeniu si te ghidez exact unde sa adaugi record-urile
- **Probleme cu Canva / design**: pot genera un SVG simplu pentru og-image si tu il convertesti la JPG
- **Erori in cod dupa ce inlocuiesti placeholders**: trimite-mi mesajul de eroare din browser DevTools si rezolv

---

**Toate sunt gratuite** sau au tier gratuit suficient pentru un site mic. Singurul lucru care **poate** costa: Google Places API daca depasesti 100,000 cereri pe luna (nu vei avea problema niciodata pe un site asa).
