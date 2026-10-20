(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) return;

  function initSectionNav() {
    const linksById = {};
    const sections = [];
    document.querySelectorAll('.nav a[href^="#"], .crumbs a[href^="#"]').forEach(function (link) {
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      const section = target.closest('section') || target;
      if (!linksById[section.id]) {
        linksById[section.id] = [];
        sections.push(section);
      }
      linksById[section.id].push(link);
    });
    if (!sections.length) return;
    document.querySelectorAll('main > section[id]').forEach(function (section) {
      if (sections.indexOf(section) === -1) sections.push(section);
    });

    let current = null;

    function scrollIntoStrip(link) {
      const strip = link.closest('ol');
      if (!strip || strip.scrollWidth <= strip.clientWidth) return;
      const item = link.parentElement;
      const left = item.offsetLeft - strip.offsetLeft - (strip.clientWidth - item.offsetWidth) / 2;
      strip.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
    }

    function activate(id) {
      if (id === current) return;
      (linksById[current] || []).forEach(function (link) {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      });
      current = id;
      (linksById[id] || []).forEach(function (link) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'location');
        scrollIntoStrip(link);
      });
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) activate(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { observer.observe(section); });
  }

  function initActionBar() {
    const bar = document.querySelector('.action-bar');
    const ctas = document.querySelectorAll('[data-main-cta]');
    if (!bar || !ctas.length) return;

    const visible = new Set();
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      bar.classList.toggle('is-away', visible.size > 0);
    });

    ctas.forEach(function (cta) { observer.observe(cta); });
  }

  initSectionNav();
  initActionBar();
})();
