/**
 * RXR Performance — GDPR cookie consent banner.
 *
 * Shows a slim banner on first visit. Stores choice in localStorage.
 * Pushes consent signals to window.dataLayer so Google Tag Manager
 * (Consent Mode v2) gates analytics and ads tags accordingly.
 *
 * Default: deny non-essential storage until user accepts. The default
 * push happens before any stored-decision update so GTM always sees
 * a deny baseline first.
 */
(function () {
  'use strict';

  var KEY = 'rxr_cookie_consent';

  // Ensure dataLayer + gtag exist (works whether GTM is loaded or not)
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  // Always push the deny baseline first (before any update)
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  var stored = (function () {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  })();

  function applyConsent(decision) {
    try { localStorage.setItem(KEY, decision); } catch (e) {}
    gtag('consent', 'update', {
      ad_storage: decision === 'accept' ? 'granted' : 'denied',
      ad_user_data: decision === 'accept' ? 'granted' : 'denied',
      ad_personalization: decision === 'accept' ? 'granted' : 'denied',
      analytics_storage: decision === 'accept' ? 'granted' : 'denied'
    });
    var banner = document.getElementById('rxr-cookie-banner');
    if (banner) banner.remove();
  }

  if (stored === 'accept' || stored === 'reject') {
    applyConsent(stored);
    return;
  }

  function render() {
    var bar = document.createElement('div');
    bar.id = 'rxr-cookie-banner';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Acceptare cookie-uri');
    bar.style.cssText = [
      'position:fixed', 'left:50%', 'bottom:0.75rem', 'z-index:9999',
      'transform:translateX(-50%)',
      'width:calc(100% - 1.5rem)', 'max-width:64rem',
      'background:rgba(15,23,42,0.55)', 'border:1px solid rgba(51,65,85,0.5)',
      'border-radius:1rem', 'padding:0.75rem 1.25rem', 'color:#e2e8f0',
      'backdrop-filter:blur(20px)', '-webkit-backdrop-filter:blur(20px)',
      'box-shadow:0 12px 30px rgba(0,0,0,0.45)',
      'display:flex', 'flex-wrap:wrap', 'gap:0.75rem', 'align-items:center',
      'justify-content:space-between',
      'font-family:Inter,-apple-system,system-ui,sans-serif', 'font-size:0.85rem'
    ].join(';');
    bar.innerHTML =
      '<div style="flex:1;min-width:240px;line-height:1.5;">' +
        '<strong style="color:#fff;">Folosim cookie-uri.</strong> ' +
        'Doar pentru a intelege cum este folosit site-ul si pentru a-l imbunatati. ' +
        'Citeste mai multe in <a href="confidentialitate.html" style="color:#38BDF8;text-decoration:underline;">politica de confidentialitate</a>.' +
      '</div>' +
      '<div style="display:flex;gap:0.5rem;flex-shrink:0;">' +
        '<button type="button" id="rxr-cookie-reject" style="padding:0.5rem 1rem;border-radius:0.625rem;background:rgba(30,41,59,0.8);color:#cbd5e1;border:1px solid rgba(71,85,105,0.6);font-weight:600;cursor:pointer;font-size:0.85rem;">Refuza</button>' +
        '<button type="button" id="rxr-cookie-accept" style="padding:0.5rem 1.25rem;border-radius:0.625rem;background:linear-gradient(135deg,#0EA5E9,#06B6D4);color:#fff;border:0;font-weight:700;cursor:pointer;font-size:0.85rem;">Accept</button>' +
      '</div>';
    document.body.appendChild(bar);
    document.getElementById('rxr-cookie-accept').addEventListener('click', function () { applyConsent('accept'); });
    document.getElementById('rxr-cookie-reject').addEventListener('click', function () { applyConsent('reject'); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
