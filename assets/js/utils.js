
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

  
  RXR.createWhatsAppCTA = function(text, message = '') {
    const encodedMessage = encodeURIComponent(message || text);
    return `
      <a href="https://wa.me/40744787446?text=${encodedMessage}"
         target="_blank" rel="noopener noreferrer"
         class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-base font-bold rounded-xl shadow-xl shadow-green-500/30 transition-all transform hover:scale-105">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        ${text}
      </a>
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
      const whatsappLink = e.target.closest('a[href*="wa.me"]');
      if (whatsappLink) {
        RXR.trackEvent('whatsapp_click', {
          'event_category': 'engagement',
          'event_label': 'WhatsApp Contact',
          'value': 1
        });
        RXR.trackConversion('whatsapp_contact');
      }

      const phoneLink = e.target.closest('a[href^="tel:"]');
      if (phoneLink) {
        RXR.trackEvent('phone_click', {
          'event_category': 'engagement',
          'event_label': 'Phone Contact',
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
