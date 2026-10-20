(function () {
  'use strict';

  const DATABASE_URL = 'assets/js/vehicle-database.js?v=2026-10-20';
  const SELECT_IDS = ['brand-select', 'model-select', 'generation-select', 'engine-select'];
  const PLACEHOLDERS = ['Selecteaza marca', 'Selecteaza modelul', 'Selecteaza generatia', 'Selecteaza motorizarea'];

  function unique(values) {
    return Array.from(new Set(values));
  }

  function byText(a, b) {
    return a.localeCompare(b);
  }

  function startYear(generation) {
    const match = generation.match(/\((\d{4})/);
    return match ? parseInt(match[1], 10) : 0;
  }

  function fillSelect(select, placeholder, values) {
    select.innerHTML = '';
    select.appendChild(new Option(placeholder, ''));
    values.forEach(function (value) {
      select.appendChild(new Option(value, value));
    });
    select.disabled = values.length === 0;
  }

  function setText(id, text) {
    document.getElementById(id).textContent = text;
  }

  function showResult(vehicle, result) {
    const hpGain = vehicle.stage1HP - vehicle.stockHP;
    const hpPercent = Math.round((hpGain / vehicle.stockHP) * 100);
    const nmGain = vehicle.stage1Nm - vehicle.stockNm;
    const nmPercent = Math.round((nmGain / vehicle.stockNm) * 100);

    setText('result-vehicle-name', vehicle.brand + ' ' + vehicle.model);
    setText('result-vehicle-year', vehicle.engine + ' • ' + vehicle.generation);
    setText('result-stock-hp', vehicle.stockHP);
    setText('result-stage1-hp', vehicle.stage1HP);
    setText('result-hp-gain', '+' + hpGain + ' CP (+' + hpPercent + '%)');
    setText('result-stock-nm', vehicle.stockNm);
    setText('result-stage1-nm', vehicle.stage1Nm);
    setText('result-nm-gain', '+' + nmGain + ' Nm (+' + nmPercent + '%)');
    document.getElementById('result-na-note').hidden = !vehicle.na;
    document.getElementById('whatsapp-cta').href = RXR.whatsappUrl(
      'Buna! Sunt interesat de Stage 1 pentru ' + vehicle.brand + ' ' + vehicle.model + ', ' + vehicle.engine +
      '. Calculatorul arata ' + vehicle.stage1HP + ' CP si ' + vehicle.stage1Nm + ' Nm.'
    );

    RXR.trackEvent('vehicle_lookup', {
      'event_category': 'lead_generation',
      'event_label': vehicle.brand + ' ' + vehicle.model + ' ' + vehicle.engine,
      'vehicle_brand': vehicle.brand,
      'vehicle_model': vehicle.model,
      'hp_gain': hpGain,
      'hp_gain_percent': hpPercent,
      'value': 5
    });
    RXR.trackConversion('vehicle_lookup');

    result.classList.remove('hidden');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(function () {
      result.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }, 100);
  }

  function initVehicleLookup() {
    const selects = SELECT_IDS.map(function (id) { return document.getElementById(id); });
    const result = document.getElementById('vehicle-result');
    if (typeof vehicleDatabase === 'undefined' || !result || selects.some(function (s) { return !s; })) return;

    function matching(depth) {
      return vehicleDatabase.filter(function (v) {
        return (depth < 1 || v.brand === selects[0].value) &&
          (depth < 2 || v.model === selects[1].value) &&
          (depth < 3 || v.generation === selects[2].value);
      });
    }

    function optionsFor(depth) {
      const rows = matching(depth);
      if (depth === 0) return unique(rows.map(function (v) { return v.brand; })).sort(byText);
      if (depth === 1) return unique(rows.map(function (v) { return v.model; })).sort(byText);
      if (depth === 2) {
        return unique(rows.map(function (v) { return v.generation; })).sort(function (a, b) {
          return startYear(a) - startYear(b) || byText(a, b);
        });
      }
      return rows
        .slice()
        .sort(function (a, b) { return a.stockHP - b.stockHP || byText(a.engine, b.engine); })
        .map(function (v) { return v.engine; });
    }

    selects.forEach(function (select, depth) {
      select.addEventListener('change', function () {
        for (let i = depth + 1; i < selects.length; i++) fillSelect(selects[i], PLACEHOLDERS[i], []);
        result.classList.add('hidden');
        if (!select.value) return;

        if (depth < selects.length - 1) {
          fillSelect(selects[depth + 1], PLACEHOLDERS[depth + 1], optionsFor(depth + 1));
          return;
        }
        const vehicle = matching(3).find(function (v) { return v.engine === select.value; });
        if (vehicle) showResult(vehicle, result);
      });
    });

    fillSelect(selects[0], PLACEHOLDERS[0], optionsFor(0));
  }

  function loadDatabase(onReady, onError) {
    if (typeof vehicleDatabase !== 'undefined') {
      onReady();
      return;
    }
    const script = document.createElement('script');
    script.src = DATABASE_URL;
    script.onload = onReady;
    script.onerror = onError;
    document.body.appendChild(script);
  }

  function start() {
    const section = document.getElementById('calculator');
    const brandSelect = document.getElementById('brand-select');
    if (!section || !brandSelect) return;

    let started = false;
    function go() {
      if (started) return;
      started = true;
      loadDatabase(initVehicleLookup, function () {
        brandSelect.options[0].textContent = 'Calculatorul nu s-a incarcat';
      });
    }

    section.addEventListener('pointerdown', go, { once: true });
    section.addEventListener('focusin', go, { once: true });
    RXR.whenNear(section, '600px', go);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
