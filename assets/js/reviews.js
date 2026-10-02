/**
 * RXR Performance — Google Reviews loader.
 *
 * SETUP:
 *   1. Get a Google Maps JavaScript API key with "Places API" enabled:
 *      https://console.cloud.google.com/google/maps-apis
 *   2. Find your Google Place ID (Place ID Finder):
 *      https://developers.google.com/maps/documentation/places/web-service/place-id
 *   3. Edit the CONFIG block below with both values.
 *   4. Add this domain to the API key's referrer restrictions for security.
 *
 * Until configured, the page shows the static fallback reviews already in HTML.
 */
(function () {
  'use strict';

  const CONFIG = {
    // TODO: replace with your Google Maps JavaScript API key.
    apiKey: '',
    // TODO: replace with your Google Place ID (Place ID Finder link above).
    placeId: '',
    // Public Google reviews page; updated to point to your place when placeId is set.
    fallbackReviewsUrl: 'https://www.google.com/search?q=RXR+Performance+Cluj+Napoca',
    maxReviews: 6
  };

  function updateReviewsLink() {
    const link = document.getElementById('google-reviews-link');
    if (!link) return;
    if (CONFIG.placeId) {
      link.href = `https://search.google.com/local/reviews?placeid=${encodeURIComponent(CONFIG.placeId)}`;
    } else {
      link.href = CONFIG.fallbackReviewsUrl;
    }
  }

  function renderStars(rating) {
    const r = Math.round(rating);
    let html = '<span class="stars" aria-label="' + r + ' stele">';
    for (let i = 0; i < 5; i++) {
      const style = i < r ? '' : ' style="color:var(--text-3)"';
      html += '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"' + style + '><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }
    html += '</span>';
    return html;
  }

  function reviewCard(review) {
    const author = (review.author_name || 'Anonim').trim();
    const initial = author.charAt(0).toUpperCase();
    const text = (review.text || '').replace(/[<>]/g, '');
    const truncated = text.length > 220 ? text.slice(0, 220).trim() + '…' : text;
    return [
      '<article class="card review is-in">',
        renderStars(review.rating || 5),
        '<p class="review__text">„', truncated, '”</p>',
        '<div class="review__author">',
          '<span class="review__avatar">', initial, '</span>',
          '<div>',
            '<p class="review__name">', author, '</p>',
            '<p class="review__meta">Recenzie Google</p>',
          '</div>',
        '</div>',
      '</article>'
    ].join('');
  }

  function injectReviews(place) {
    if (!place) return;

    if (place.rating) {
      const ratingValue = document.getElementById('reviews-rating-value');
      const ratingCount = document.getElementById('reviews-rating-count');
      if (ratingValue) ratingValue.textContent = Number(place.rating).toFixed(1);
      if (ratingCount && place.user_ratings_total) {
        ratingCount.textContent = `${place.user_ratings_total} recenzii Google`;
      }
    }

    const reviews = (place.reviews || []).slice(0, CONFIG.maxReviews);
    if (!reviews.length) return;
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;
    grid.innerHTML = reviews.map(reviewCard).join('');
  }

  function loadGoogleMapsSdk() {
    return new Promise(function (resolve, reject) {
      if (window.google && window.google.maps && window.google.maps.places) {
        resolve(window.google);
        return;
      }
      const cb = '__rxrReviewsCb_' + Date.now();
      window[cb] = function () { resolve(window.google); delete window[cb]; };
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(CONFIG.apiKey) + '&libraries=places&callback=' + cb;
      script.async = true;
      script.defer = true;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function fetchPlaceDetails() {
    return loadGoogleMapsSdk().then(function () {
      return new Promise(function (resolve, reject) {
        const container = document.createElement('div');
        const service = new window.google.maps.places.PlacesService(container);
        service.getDetails(
          { placeId: CONFIG.placeId, fields: ['name', 'rating', 'user_ratings_total', 'reviews'] },
          function (place, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(place);
            } else {
              reject(new Error('Google Places status: ' + status));
            }
          }
        );
      });
    });
  }

  function init() {
    updateReviewsLink();
    if (!CONFIG.apiKey || !CONFIG.placeId) {
      // Static fallback already rendered in HTML — nothing else to do.
      return;
    }
    fetchPlaceDetails().then(injectReviews).catch(function (err) {
      // Keep the static reviews in place if the API call fails.
      if (window.console) console.warn('[RXR reviews] live reviews unavailable —', err.message);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
