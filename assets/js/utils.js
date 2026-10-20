(function() {
  'use strict';

  window.RXR = window.RXR || {};

  // Push events to the GTM dataLayer. All analytics/ads tags (if any) are
  // configured inside the GTM container — nothing vendor-specific lives here.
  RXR.trackEvent = function(eventName, eventParams = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, eventParams));
  };

  RXR.trackConversion = function(conversionLabel, value = 0) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'conversion',
      conversion_label: conversionLabel,
      value: value,
      currency: 'RON'
    });
  };

  RXR.whenNear = function(elements, margin, callback) {
    const targets = Array.prototype.slice.call(elements.length === undefined ? [elements] : elements);
    if (!('IntersectionObserver' in window)) {
      callback();
      return;
    }
    const observer = new IntersectionObserver(function(entries) {
      if (!entries.some(function(e) { return e.isIntersecting; })) return;
      observer.disconnect();
      callback();
    }, { rootMargin: margin + ' 0px' });
    targets.forEach(function(el) { observer.observe(el); });
  };

  RXR.whatsappUrl = function(message) {
    return 'https://wa.me/40744787446?text=' + encodeURIComponent(message || '');
  };

  RXR.updateYear = function() {
    const yearElements = document.querySelectorAll('#year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
      if (el) el.textContent = currentYear;
    });
  };

  RXR.initContactTracking = function() {
    document.addEventListener('click', function(e) {
      const phoneLink = e.target.closest('a[href^="tel:"]');
      if (phoneLink) {
        RXR.trackEvent('phone_click', {
          'event_category': 'engagement',
          'event_label': 'Phone Contact',
          'phone_number': (phoneLink.getAttribute('href') || '').replace('tel:', ''),
          'page_path': location.pathname,
          'value': 1
        });
        RXR.trackConversion('phone_contact');
      }

      const whatsappLink = e.target.closest('a[href*="wa.me"]');
      if (whatsappLink) {
        RXR.trackEvent('whatsapp_click', {
          'event_category': 'engagement',
          'event_label': 'WhatsApp Contact',
          'link_url': whatsappLink.href,
          'page_path': location.pathname,
          'value': 1
        });
        RXR.trackConversion('whatsapp_contact');
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      RXR.updateYear();
      RXR.initContactTracking();
    });
  } else {
    RXR.updateYear();
    RXR.initContactTracking();
  }

})();
