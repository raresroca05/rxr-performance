/**
 * Google Tag Manager loader — container GTM-TTF724N7.
 *
 * Externalized from the inline <head> snippet. Pushes the gtm.start event to
 * the dataLayer and async-injects Google's gtm.js. It is the ONLY tracking
 * install on the site; GA4 / Ads / any tag are configured inside the GTM
 * container, not in code.
 *
 * Load order matters: this file must be imported AFTER the CookieYes script
 * (which sets Consent Mode v2 defaults) and BEFORE other tracking, so keep the
 * <script src="assets/js/gtm.js"> tag right after the CookieYes tag in <head>.
 * The paired <noscript> GTM iframe stays inline in each page's <body>.
 */
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-TTF724N7');
