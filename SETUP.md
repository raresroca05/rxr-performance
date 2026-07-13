# Ghid setup pas-cu-pas — RXR Performance

Ghid pentru ce mai ramane de configurat. Fiecare sectiune spune **exact** ce sa apesi si unde.

> **Tracking (2026-07):** singura instalare din cod este **Google Tag Manager** (`GTM-TTF724N7`).
> **Nu** exista GA4, Google Ads sau Facebook Pixel hardcodat — si nu se doresc. Orice tag de
> analytics/reclame se adauga **doar din containerul GTM**, nu in HTML.
> Consimtamantul (Consent Mode v2) este gestionat de **CookieYes**.

---

## 📋 Cuprins

1. [Google Tag Manager — verificare ca merge (5 min)](#1-google-tag-manager--verificare)
2. [CookieYes — activare Consent Mode (5 min)](#2-cookieyes--consent-mode)
3. [Google Places API pentru recenzii live (20 min, ~$0-5/luna)](#3-google-places-api-pentru-recenzii-live)
4. [Bonus: Bing Webmaster Tools (5 min, gratuit)](#4-bonus-bing-webmaster-tools)

Deja rezolvate (nu mai necesita nimic): imagine OG, Apple Touch Icon, Google Search Console + sitemap, migrare la GTM, instalare CookieYes.

---

## 1. Google Tag Manager — verificare

**De ce**: sa confirmi ca GTM se incarca pe toate paginile si ca respecta consimtamantul.

### Pasi:

1. Instaleaza extensia Chrome **[Tag Assistant](https://tagassistant.google.com/)** (sau foloseste modul Preview din GTM)
2. In [tagmanager.google.com](https://tagmanager.google.com) → containerul `GTM-TTF724N7` → click `Preview`
3. Introdu `https://rxr-performance.ro` → `Connect`
4. In fereastra Tag Assistant ar trebui sa vezi containerul **conectat** si tag-urile care se declanseaza
5. Verifica ca GTM se incarca **dupa** CookieYes (in `<head>`, CookieYes e primul)

### Important — analytics/reclame:

- Daca **nu** vrei niciun tracking: asigura-te ca in container **nu** exista tag-uri GA4 / Google Ads.
- Daca vrei GA4 pe viitor: adauga-l ca tag **in GTM** (nu in cod), legat de un trigger si de Consent Mode.

✅ **Done.**

---

## 2. CookieYes — Consent Mode

**De ce**: ca tag-urile din GTM sa porneasca doar dupa acceptul utilizatorului (Consent Mode v2).

### Pasi:

1. Loghin in [app.cookieyes.com](https://app.cookieyes.com)
2. Selecteaza site-ul `rxr-performance.ro`
3. In setari (`Settings` / `Consent`) → activeaza **Google Consent Mode**
4. (Optional) personalizeaza textul si aspectul banner-ului
5. Salveaza — scriptul e deja instalat pe site (`cdn-cookieyes.com/.../script.js`, in `<head>` pe toate paginile)

### Verificare:

- Deschide `rxr-performance.ro` in fereastra incognito → ar trebui sa apara banner-ul CookieYes
- Dupa Accept, cookie-ul `cookieyes-consent` e setat (DevTools → Application → Cookies)

✅ **Done.**

---

## 3. Google Places API pentru recenzii live

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

1. Deschide `assets/js/reviews.js`
2. Sus, in `CONFIG`, completezi:
   ```javascript
   const CONFIG = {
     apiKey: 'AIzaSyABC...',  // cheia ta API
     placeId: 'ChIJ...',       // Place ID-ul tau
     fallbackReviewsUrl: 'https://www.google.com/search?q=RXR+Performance+Cluj+Napoca',
     maxReviews: 6
   };
   ```
   > Daca folosesti cheia API prin `reviews.js`, adaug-o in CSP (`script-src` / `connect-src`) pentru `maps.googleapis.com` — spune-mi si o fac eu.
3. Commit + push:
   ```bash
   cd /Users/raresroca/Projects/Personal/rxr-performance
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

## 4. Bonus: Bing Webmaster Tools

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

## 🆘 Daca ramai blocat

- **Probleme cu DNS / domeniu**: spune-mi providerul tau de domeniu si te ghidez exact unde sa adaugi record-urile
- **Erori in cod / CSP dupa ce adaugi cheia Places**: trimite-mi mesajul de eroare din browser DevTools si rezolv

---

**Toate sunt gratuite** sau au tier gratuit suficient pentru un site mic. Singurul lucru care **poate** costa: Google Places API daca depasesti pragul gratuit (nu vei avea problema pe un site asa).
