(function () {
  'use strict';

  const FEED_URL = 'https://feeds.behold.so/3nVTXEc9DkXMC5BLJr2Z';
  const PROFILE_URL = 'https://www.instagram.com/rxrperformance';
  const HERO_SLIDES = 4;
  const HERO_INTERVAL = 7000;
  const OPEN_CHIP = '<span class="slide__open" aria-hidden="true">Vezi<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></span>';
  const PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  const BRANDS = ['bmw', 'audi', 'volkswagen', 'golf', 'passat', 'skoda', 'octavia', 'superb', 'seat', 'cupra', 'mercedes', 'porsche', 'ford', 'opel', 'renault', 'dacia', 'peugeot', 'citroen', 'mazda', 'toyota', 'honda', 'hyundai', 'kia', 'nissan', 'mini', 'jaguar', 'land rover', 'range rover', 'volvo', 'alfa', 'fiat', 'jeep', 'subaru', 'mitsubishi', 'ssangyong', 'suzuki', 'lexus', 'infiniti', 'tesla', 'maserati', 'ferrari', 'lamborghini', 'bentley', 'aston martin', 'mclaren', 'smart', 'iveco', 'scania', 'daf'];
  const SERVICES = [
    { re: /stage\s?2/, label: 'Stage 2' },
    { re: /stage\s?1/, label: 'Stage 1' },
    { re: /codar|coding/, label: 'Codari' },
    { re: /\btcu\b|cutie/, label: 'TCU' },
    { re: /diagnoz/, label: 'Diagnoza' },
    { re: /retrofit/, label: 'Retrofit' }
  ];

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

  function plain(str) {
    return String(str).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function captionLines(post) {
    return (post.prunedCaption || post.caption || '')
      .split('\n')
      .map(cleanText)
      .filter(Boolean);
  }

  function titleFor(post) {
    const lines = captionLines(post);
    const car = lines.find(function (line) {
      if (line.length > 70) return false;
      const low = plain(line);
      return BRANDS.some(function (b) { return low.indexOf(b) > -1; });
    });
    const parts = (car || lines[0] || '').split(/\s[\u2014\u2013|-]\s|\s\u00b7\s/);
    return {
      model: (parts[0] || 'Proiect RXR').slice(0, 42),
      detail: parts.slice(1).join(' \u00b7 ').slice(0, 60)
    };
  }

  function tagsFor(post) {
    const line = captionLines(post)[0] || '';
    const out = [];

    SERVICES.some(function (svc) {
      if (!svc.re.test(plain(line))) return false;
      out.push(svc.label);
      return true;
    });

    const re = /(~?)(\d{2,4})(\+?)\s?(hp|cp|nm)\b/gi;
    const seen = {};
    let m;
    while ((m = re.exec(line)) !== null && out.length < 3) {
      const unit = m[4].toLowerCase() === 'nm' ? 'Nm' : 'CP';
      if (seen[unit]) continue;
      seen[unit] = true;
      out.push(m[1] + m[2] + m[3] + ' ' + unit);
    }
    return out;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function postCard(post, size, index) {
    const t = titleFor(post);
    const img = imageFor(post, size);
    if (!img) return '';
    const isVideo = post.mediaType === 'VIDEO';
    const tags = tagsFor(post);
    const num = ('0' + (index + 1)).slice(-2);
    return (
      '<a class="slide" href="' + escapeHtml(post.permalink || PROFILE_URL) + '" target="_blank" rel="noopener noreferrer">' +
        '<img src="' + escapeHtml(img) + '" alt="' + escapeHtml(t.model + (t.detail ? ' - ' + t.detail : '')) + '" loading="lazy" decoding="async">' +
        '<span class="slide__num" aria-hidden="true">' + num + '</span>' +
        (isVideo ? '<span class="slide__badge" aria-hidden="true">' + PLAY_ICON + '</span>' : '') +
        OPEN_CHIP +
        '<span class="slide__cap">' +
          (tags.length ? '<span class="slide__tags">' + tags.map(function (tag) { return '<b>' + escapeHtml(tag) + '</b>'; }).join('') + '</span>' : '') +
          '<span class="slide__model">' + escapeHtml(t.model) + '</span>' +
          (t.detail && tags.length < 2 ? '<span class="slide__detail">' + escapeHtml(t.detail) + '</span>' : '') +
        '</span>' +
      '</a>'
    );
  }

  function heroPosts(posts) {
    const stills = posts.filter(function (p) { return p.mediaType !== 'VIDEO'; });
    const clips = posts.filter(function (p) { return p.mediaType === 'VIDEO'; });
    return stills.concat(clips).slice(0, HERO_SLIDES);
  }

  function renderHero(posts) {
    const picks = heroPosts(posts).map(function (p) { return imageFor(p, window.innerWidth < 760 ? 'medium' : 'large'); }).filter(Boolean);
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
    container.innerHTML = posts.slice(0, limit).map(function (p, i) { return postCard(p, size, i); }).join('');
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
      const size = window.innerWidth < 760 ? 'medium' : 'large';
      sliders.forEach(function (s) { renderInto(s, posts, size); });
      grids.forEach(function (g) { renderInto(g, posts, size); });
    })
    .catch(function (err) {
      if (window.console) console.warn('[RXR instagram] feed unavailable -', err.message);
      fail();
    });
})();
