(function () {
  'use strict';

  const FEED_URL = 'https://feeds.behold.so/3nVTXEc9DkXMC5BLJr2Z';
  const PROFILE_URL = 'https://www.instagram.com/rxrperformance';
  const PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  const SIZES = '(min-width: 1000px) 25vw, (min-width: 700px) 44vw, 76vw';
  const BRANDS = ['bmw', 'audi', 'volkswagen', 'golf', 'passat', 'skoda', 'octavia', 'superb', 'seat', 'cupra', 'mercedes', 'porsche', 'ford', 'opel', 'renault', 'dacia', 'peugeot', 'citroen', 'mazda', 'toyota', 'honda', 'hyundai', 'kia', 'nissan', 'mini', 'jaguar', 'land rover', 'range rover', 'volvo', 'alfa', 'fiat', 'jeep', 'subaru', 'mitsubishi', 'ssangyong', 'suzuki', 'lexus', 'infiniti', 'tesla', 'maserati', 'ferrari', 'lamborghini', 'bentley', 'aston martin', 'mclaren', 'smart', 'iveco', 'scania', 'daf'];
  const SERVICES = [
    { re: /stage\s?2/, label: 'Stage 2' },
    { re: /stage\s?1/, label: 'Stage 1' },
    { re: /codar|coding/, label: 'Codari' },
    { re: /\btcu\b|cutie/, label: 'TCU' },
    { re: /diagnoz/, label: 'Diagnoza' },
    { re: /retrofit/, label: 'Retrofit' }
  ];

  const grids = document.querySelectorAll('[data-ig-grid]');
  if (!grids.length) return;

  function srcset(post) {
    const sizes = post.sizes || {};
    return ['small', 'medium', 'large']
      .filter(function (key) { return sizes[key] && sizes[key].mediaUrl && sizes[key].width; })
      .map(function (key) { return sizes[key].mediaUrl + ' ' + sizes[key].width + 'w'; })
      .join(', ');
  }

  function imageFor(post) {
    const sizes = post.sizes || {};
    const pick = sizes.medium || sizes.large || sizes.small;
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
    return String(str).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
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
    const parts = (car || lines[0] || '').split(/\s[—–|-]\s|\s·\s/);
    return {
      model: (parts[0] || 'Proiect RXR').slice(0, 42),
      detail: parts.slice(1).join(' · ').slice(0, 60)
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

  function postCard(post) {
    const img = imageFor(post);
    if (!img) return '';
    const t = titleFor(post);
    const tags = tagsFor(post);
    const set = srcset(post);
    return (
      '<a class="project" href="' + escapeHtml(/^https:\/\//.test(post.permalink || '') ? post.permalink : PROFILE_URL) + '" target="_blank" rel="noopener noreferrer">' +
        '<img src="' + escapeHtml(img) + '"' +
          (set ? ' srcset="' + escapeHtml(set) + '" sizes="' + SIZES + '"' : '') +
          ' alt="' + escapeHtml(t.model + (t.detail ? ' - ' + t.detail : '')) + '" width="700" height="700" loading="lazy" decoding="async">' +
        (post.mediaType === 'VIDEO' ? '<span class="project__play">' + PLAY_ICON + '</span>' : '') +
        '<span class="project__cap">' +
          (tags.length ? '<span class="project__tags">' + tags.map(function (tag) { return '<b>' + escapeHtml(tag) + '</b>'; }).join('') + '</span>' : '') +
          '<span class="project__model">' + escapeHtml(t.model) + '</span>' +
          (t.detail && tags.length < 2 ? '<span class="project__detail">' + escapeHtml(t.detail) + '</span>' : '') +
        '</span>' +
      '</a>'
    );
  }

  function setState(state) {
    document.querySelectorAll('[data-ig-root]').forEach(function (root) {
      root.dataset.igState = state;
    });
  }

  function load() {
    fetch(FEED_URL, { mode: 'cors' })
      .then(function (r) {
        if (!r.ok) throw new Error('Behold feed ' + r.status);
        return r.json();
      })
      .then(function (data) {
        const posts = (data.posts || []).filter(function (p) {
          return p.visibility !== 'hidden' && imageFor(p);
        });
        if (!posts.length) throw new Error('No posts');
        grids.forEach(function (grid) {
          const limit = parseInt(grid.dataset.limit || '8', 10);
          grid.innerHTML = posts.slice(0, limit).map(postCard).join('');
        });
        setState('ready');
      })
      .catch(function (err) {
        if (window.console) console.warn('[RXR instagram] feed unavailable -', err.message);
        setState('error');
      });
  }

  RXR.whenNear(grids, '800px', load);
})();
