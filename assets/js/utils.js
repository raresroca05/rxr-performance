
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

  
  RXR.createSectionDivider = function(icon, text, colorClass = 'rxrElectric') {
    return `
      <div class="section-divider">
        <div class="section-divider-line" aria-hidden="true">
          <div class="w-full h-px bg-gradient-to-r from-transparent via-${colorClass}/30 to-transparent"></div>
        </div>
        <div class="relative flex justify-center">
          <div class="section-divider-badge border-${colorClass}/40 hover:border-${colorClass}/60">
            <p class="section-divider-text text-${colorClass}">
              <span>${icon}</span>
              ${text}
            </p>
          </div>
        </div>
      </div>
    `;
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
