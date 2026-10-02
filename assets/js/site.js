(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initHeader() {
    const header = document.getElementById('site-header');
    const progress = document.getElementById('scroll-progress');
    if (!header) return;

    let ticking = false;
    function update() {
      const y = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle('is-scrolled', y > 24);
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = max > 0 ? Math.min(100, (y / max) * 100) + '%' : '0%';
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  function initMenu() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(menu.hidden);
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) setOpen(false);
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const format = function (n) {
      return Math.round(n).toLocaleString('ro-RO');
    };
    if (reduceMotion) {
      el.textContent = prefix + format(target) + suffix;
      return;
    }
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + format(t < 1 ? target * eased : target) + suffix;
      if (t < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  function initReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    const counters = document.querySelectorAll('[data-count]');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      counters.forEach(animateCount);
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        entry.target.querySelectorAll('[data-count]').forEach(function (c) {
          if (!c.dataset.counted) {
            c.dataset.counted = '1';
            animateCount(c);
          }
        });
        if (entry.target.dataset.count !== undefined && !entry.target.dataset.counted) {
          entry.target.dataset.counted = '1';
          animateCount(entry.target);
        }
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { io.observe(el); });
    counters.forEach(function (el) {
      if (!el.closest('[data-reveal]')) io.observe(el);
    });
  }

  function initChapters() {
    const nav = document.getElementById('chapters');
    const sections = document.querySelectorAll('[data-chapter]');
    if (!nav || !sections.length) return;

    const items = [];
    sections.forEach(function (section, i) {
      const num = String(i + 1).padStart(2, '0');
      const a = document.createElement('a');
      a.className = 'chapters__item';
      a.href = '#' + section.id;
      a.innerHTML =
        '<span class="chapters__label">' + (section.dataset.chapter || '') + '</span>' +
        '<span class="chapters__num">' + num + '</span>' +
        '<span class="chapters__bar"></span>';
      nav.appendChild(a);
      items.push(a);
    });

    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const idx = Array.prototype.indexOf.call(sections, entry.target);
        items.forEach(function (a, i) { a.classList.toggle('is-active', i === idx); });
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }

  function initHeroParallax() {
    const media = document.querySelector('.hero__media');
    const content = document.querySelector('.hero__content');
    if (!media || reduceMotion) return;
    let ticking = false;
    function update() {
      const y = window.scrollY || document.documentElement.scrollTop;
      const h = window.innerHeight;
      if (y < h) {
        media.style.transform = 'translate3d(0,' + y * 0.25 + 'px,0)';
        if (content) content.style.opacity = String(Math.max(0, 1 - y / (h * 0.8)));
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  function initSliders() {
    document.querySelectorAll('[data-slider]').forEach(function (slider) {
      let isDown = false;
      let startX = 0;
      let startScroll = 0;
      let moved = false;

      slider.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'touch') return;
        isDown = true;
        moved = false;
        startX = e.clientX;
        startScroll = slider.scrollLeft;
        slider.setPointerCapture(e.pointerId);
      });
      slider.addEventListener('pointermove', function (e) {
        if (!isDown) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 4) {
          moved = true;
          slider.classList.add('is-dragging');
        }
        slider.scrollLeft = startScroll - dx;
      });
      function release() {
        if (!isDown) return;
        isDown = false;
        window.setTimeout(function () { slider.classList.remove('is-dragging'); }, 50);
      }
      slider.addEventListener('pointerup', release);
      slider.addEventListener('pointercancel', release);
      slider.addEventListener('click', function (e) {
        if (moved) {
          e.preventDefault();
          moved = false;
        }
      }, true);

      const wrap = slider.closest('[data-slider-root]') || slider.parentElement;
      const step = function () {
        const first = slider.querySelector('.slide');
        return first ? first.getBoundingClientRect().width + 16 : slider.clientWidth * 0.8;
      };
      wrap.querySelectorAll('[data-slider-prev]').forEach(function (b) {
        b.addEventListener('click', function () { slider.scrollBy({ left: -step() * 2, behavior: 'smooth' }); });
      });
      wrap.querySelectorAll('[data-slider-next]').forEach(function (b) {
        b.addEventListener('click', function () { slider.scrollBy({ left: step() * 2, behavior: 'smooth' }); });
      });
    });
  }

  function init() {
    initHeader();
    initMenu();
    initReveal();
    initChapters();
    initHeroParallax();
    initSliders();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
