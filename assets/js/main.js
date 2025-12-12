// Main JavaScript for RXR Performance
(function() {
  'use strict';

  // Google Analytics & Ads Tracking Helper
  function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, eventParams);
      console.log('Tracked event:', eventName, eventParams);
    }
  }

  // Track Conversion (for Google Ads)
  function trackConversion(conversionLabel) {
    if (typeof gtag !== 'undefined') {
      // Când vei avea Google Ads ID, decomentează linia de mai jos:
      // gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXXX/' + conversionLabel});
      console.log('Conversion tracked:', conversionLabel);
    }
  }

  // Update year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Track WhatsApp clicks
  document.addEventListener('click', function(e) {
    const whatsappLink = e.target.closest('a[href*="wa.me"]');
    if (whatsappLink) {
      trackEvent('whatsapp_click', {
        'event_category': 'engagement',
        'event_label': 'WhatsApp Contact',
        'value': 1
      });
      trackConversion('whatsapp_contact'); // Google Ads conversion
    }

    // Track phone clicks
    const phoneLink = e.target.closest('a[href^="tel:"]');
    if (phoneLink) {
      trackEvent('phone_click', {
        'event_category': 'engagement',
        'event_label': 'Phone Contact',
        'value': 1
      });
      trackConversion('phone_contact'); // Google Ads conversion
    }
  });

  // Vehicle Lookup Tool with Local Database
  const brandSelect = document.getElementById('brand-select');
  const modelSelect = document.getElementById('model-select');
  const generationSelect = document.getElementById('generation-select');
  const engineSelect = document.getElementById('engine-select');
  const vehicleResult = document.getElementById('vehicle-result');

  // Check if vehicle lookup elements exist (only on pages that have them)
  if (!brandSelect || !modelSelect || !generationSelect || !engineSelect || !vehicleResult) {
    return;
  }

  // Get unique brands from database
  function getUniqueBrands() {
    const brands = [...new Set(vehicleDatabase.map(v => v.brand))];
    return brands.sort((a, b) => a.localeCompare(b));
  }

  // Get models for selected brand
  function getModelsByBrand(brand) {
    const models = [...new Set(
      vehicleDatabase
        .filter(v => v.brand === brand)
        .map(v => v.model)
    )];
    return models.sort((a, b) => a.localeCompare(b));
  }

  // Get generations for selected brand and model
  function getGenerationsByBrandAndModel(brand, model) {
    const generations = [...new Set(
      vehicleDatabase
        .filter(v => v.brand === brand && v.model === model)
        .map(v => v.generation)
    )];
    return generations.sort((a, b) => a.localeCompare(b));
  }

  // Get engines for selected brand, model and generation
  function getEnginesByBrandModelGeneration(brand, model, generation) {
    const engines = vehicleDatabase
      .filter(v => v.brand === brand && v.model === model && v.generation === generation)
      .map(v => v.engine);
    return engines.sort((a, b) => a.localeCompare(b));
  }

  // Get vehicle data
  function getVehicleData(brand, model, generation, engine) {
    return vehicleDatabase.find(v =>
      v.brand === brand &&
      v.model === model &&
      v.generation === generation &&
      v.engine === engine
    );
  }

  // Load brands into dropdown
  function loadBrands() {
    const brands = getUniqueBrands();
    brands.forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      brandSelect.appendChild(option);
    });
  }

  // Load models into dropdown
  function loadModels(brand) {
    const models = getModelsByBrand(brand);
    modelSelect.innerHTML = '<option value="">Selectează modelul</option>';
    models.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
    modelSelect.disabled = false;
  }

  // Load generations into dropdown
  function loadGenerations(brand, model) {
    const generations = getGenerationsByBrandAndModel(brand, model);
    generationSelect.innerHTML = '<option value="">Selectează generația</option>';
    generations.forEach(generation => {
      const option = document.createElement('option');
      option.value = generation;
      option.textContent = generation;
      generationSelect.appendChild(option);
    });
    generationSelect.disabled = false;
  }

  // Load engines into dropdown
  function loadEngines(brand, model, generation) {
    const engines = getEnginesByBrandModelGeneration(brand, model, generation);
    engineSelect.innerHTML = '<option value="">Selectează motorul</option>';
    engines.forEach(engine => {
      const option = document.createElement('option');
      option.value = engine;
      option.textContent = engine;
      engineSelect.appendChild(option);
    });
    engineSelect.disabled = false;
  }

  // Display results
  function displayResults(brand, model, generation, engine, vehicle) {
    const hpGain = vehicle.stage1HP - vehicle.stockHP;
    const hpGainPercent = Math.round((hpGain / vehicle.stockHP) * 100);

    document.getElementById('result-vehicle-name').textContent = `${brand} ${model}`;
    document.getElementById('result-vehicle-year').textContent = `${engine} • ${generation}`;
    document.getElementById('result-stock-hp').textContent = vehicle.stockHP;
    document.getElementById('result-stage1-hp').textContent = vehicle.stage1HP;
    document.getElementById('result-hp-gain').textContent = `(+${hpGain} HP / +${hpGainPercent}%)`;
    document.getElementById('result-stage1-nm').textContent = vehicle.stage1NM;

    // Track Vehicle Lookup (HIGH VALUE EVENT!)
    trackEvent('vehicle_lookup', {
      'event_category': 'lead_generation',
      'event_label': `${brand} ${model} ${engine}`,
      'vehicle_brand': brand,
      'vehicle_model': model,
      'hp_gain': hpGain,
      'hp_gain_percent': hpGainPercent,
      'value': 5  // High value - this is a hot lead!
    });
    trackConversion('vehicle_lookup'); // Google Ads conversion

    // Update WhatsApp link
    const whatsappMessage = encodeURIComponent(
      `Bună! Sunt interesat de tuning Stage 1 pentru ${brand} ${model} ${engine}. Aș vrea mai multe detalii despre creșterea la ${vehicle.stage1HP} HP și ${vehicle.stage1NM} Nm.`
    );
    document.getElementById('whatsapp-cta').href = `https://wa.me/40744787446?text=${whatsappMessage}`;

    vehicleResult.classList.remove('hidden');
    setTimeout(() => {
      vehicleResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  // Initialize by loading brands
  loadBrands();

  // Event listeners for dropdowns
  brandSelect.addEventListener('change', function() {
    const selectedBrand = this.value;

    // Reset dropdowns
    modelSelect.innerHTML = '<option value="">Selectează modelul</option>';
    generationSelect.innerHTML = '<option value="">Selectează generația</option>';
    engineSelect.innerHTML = '<option value="">Selectează motorul</option>';
    modelSelect.disabled = true;
    generationSelect.disabled = true;
    engineSelect.disabled = true;
    vehicleResult.classList.add('hidden');

    if (selectedBrand) {
      loadModels(selectedBrand);
    }
  });

  modelSelect.addEventListener('change', function() {
    const selectedBrand = brandSelect.value;
    const selectedModel = this.value;

    // Reset generation and engine
    generationSelect.innerHTML = '<option value="">Selectează generația</option>';
    engineSelect.innerHTML = '<option value="">Selectează motorul</option>';
    generationSelect.disabled = true;
    engineSelect.disabled = true;
    vehicleResult.classList.add('hidden');

    if (selectedModel) {
      loadGenerations(selectedBrand, selectedModel);
    }
  });

  generationSelect.addEventListener('change', function() {
    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;
    const selectedGeneration = this.value;

    // Reset engine
    engineSelect.innerHTML = '<option value="">Selectează motorul</option>';
    engineSelect.disabled = true;
    vehicleResult.classList.add('hidden');

    if (selectedGeneration) {
      loadEngines(selectedBrand, selectedModel, selectedGeneration);
    }
  });

  engineSelect.addEventListener('change', function() {
    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;
    const selectedGeneration = generationSelect.value;
    const selectedEngine = this.value;

    if (selectedEngine) {
      const vehicleData = getVehicleData(selectedBrand, selectedModel, selectedGeneration, selectedEngine);
      if (vehicleData) {
        displayResults(selectedBrand, selectedModel, selectedGeneration, selectedEngine, vehicleData);
      }
    } else {
      vehicleResult.classList.add('hidden');
    }
  });
})();
