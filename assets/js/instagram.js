(function () {
  'use strict';

  const FEED_URL = 'https://feeds.behold.so/3nVTXEc9DkXMC5BLJr2Z';
  const PROFILE_URL = 'https://www.instagram.com/rxrperformance';
  const HERO_SLIDES = 4;
  const HERO_INTERVAL = 7000;
  const PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  const hero = document.getElementById('hero-media');
  const sliders = document.querySelectorAll('[data-ig-slider]');
  const grids = document.querySelectorAll('[data-ig-grid]');
  if (!hero && !sliders.length && !grids.length) return;

  function imageFor(post, size) {
    const sizes = post.sizes || {};
    const pick = sizes[size] || sizes.large || sizes.medium || sizes.small;
    if (pick && pick.mediaUrl) return pick.mediaUrl;
    return post.thumbnailUrl || post.mediaUrl || '';
  }

  function cleanText(str) {
    return (str || '')
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function titleFor(post) {
    const firstLine = (post.prunedCaption || post.caption || '').split('\n')[0];
    const parts = cleanText(firstLine).split(/\s[—–|]\s/);
    return {
      model: parts[0] || 'Proiect RXR',
      detail: parts.slice(1).join(' · ')
    };
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function postCard(post, size) {
    const t = titleFor(post);
    const img = imageFor(post, size);
    if (!img) return '';
    const isVideo = post.mediaType === 'VIDEO';
    return (
      '<a class="slide" href="' + escapeHtml(post.permalink || PROFILE_URL) + '" target="_blank" rel="noopener noreferrer">' +
        '<img src="' + escapeHtml(img) + '" alt="' + escapeHtml(t.model + (t.detail ? ' - ' + t.detail : '')) + '" loading="lazy" decoding="async">' +
        (isVideo ? '<span class="slide__badge" aria-hidden="true">' + PLAY_ICON + '</span>' : '') +
        '<span class="slide__cap">' +
          '<span class="slide__model">' + escapeHtml(t.model) + '</span>' +
          (t.detail ? '<span class="slide__detail">' + escapeHtml(t.detail) + '</span>' : '') +
        '</span>' +
      '</a>'
    );
  }

  function renderHero(posts) {
    const picks = posts.slice(0, HERO_SLIDES).map(function (p) { return imageFor(p, 'large'); }).filter(Boolean);
    if (!picks.length) return;

    const slides = picks.map(function (url) {
      const el = document.createElement('div');
      el.className = 'hero__slide';
      el.style.backgroundImage = 'url("' + url + '")';
      hero.appendChild(el);
      return el;
    });

    const first = new Image();
    first.onload = function () { slides[0].classList.add('is-active'); };
    first.src = picks[0];

    if (slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0;
    window.setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.remove('is-active');
      void slides[i].offsetWidth;
      slides[i].classList.add('is-active');
    }, HERO_INTERVAL);
  }

  function renderInto(container, posts, size) {
    const limit = parseInt(container.dataset.limit || '12', 10);
    container.innerHTML = posts.slice(0, limit).map(function (p) { return postCard(p, size); }).join('');
    const root = container.closest('[data-ig-root]');
    if (root) root.dataset.igState = 'ready';
  }

  function fail() {
    document.querySelectorAll('[data-ig-root]').forEach(function (root) {
      root.dataset.igState = 'error';
    });
  }

  fetch(FEED_URL, { mode: 'cors' })
    .then(function (r) {
      if (!r.ok) throw new Error('Behold feed ' + r.status);
      return r.json();
    })
    .then(function (data) {
      const posts = (data.posts || []).filter(function (p) {
        return p.visibility !== 'hidden' && imageFor(p, 'medium');
      });
      if (!posts.length) throw new Error('No posts');
      if (hero) renderHero(posts);
      sliders.forEach(function (s) { renderInto(s, posts, 'medium'); });
      grids.forEach(function (g) { renderInto(g, posts, 'medium'); });
    })
    .catch(function (err) {
      if (window.console) console.warn('[RXR instagram] feed unavailable -', err.message);
      fail();
    });
})();
