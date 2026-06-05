
(function() {
  'use strict';

  
  function initVehicleLookup() {
    
    if (typeof vehicleDatabase === 'undefined') {
      return;
    }

    
    const trackEvent = window.RXR?.trackEvent || function() {};
    const trackConversion = window.RXR?.trackConversion || function() {};

    
    const brandSelect = document.getElementById('brand-select');
    const modelSelect = document.getElementById('model-select');
    const generationSelect = document.getElementById('generation-select');
    const engineSelect = document.getElementById('engine-select');
    const vehicleResult = document.getElementById('vehicle-result');

    
    if (!brandSelect || !modelSelect || !generationSelect || !engineSelect || !vehicleResult) {
      return;
    }

    
    function getUniqueBrands() {
      const brands = [...new Set(vehicleDatabase.map(v => v.brand))];
      return brands.sort((a, b) => a.localeCompare(b));
    }

    
    function getModelsByBrand(brand) {
      const models = [...new Set(
        vehicleDatabase
          .filter(v => v.brand === brand)
          .map(v => v.model)
      )];
      return models.sort((a, b) => a.localeCompare(b));
    }

    
    function getGenerationsByBrandAndModel(brand, model) {
      const generations = [...new Set(
        vehicleDatabase
          .filter(v => v.brand === brand && v.model === model)
          .map(v => v.generation)
      )];
      return generations.sort((a, b) => a.localeCompare(b));
    }

    
    function getEnginesByBrandModelGeneration(brand, model, generation) {
      const engines = vehicleDatabase
        .filter(v => v.brand === brand && v.model === model && v.generation === generation)
        .map(v => v.engine);
      return engines.sort((a, b) => a.localeCompare(b));
    }

    
    function getVehicleData(brand, model, generation, engine) {
      return vehicleDatabase.find(v =>
        v.brand === brand &&
        v.model === model &&
        v.generation === generation &&
        v.engine === engine
      );
    }

    
    function loadBrands() {
      const brands = getUniqueBrands();
      
      if (brands.length === 0) {
        return;
      }
      
      brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
      });
    }

    
    function loadModels(brand) {
      const models = getModelsByBrand(brand);
      modelSelect.innerHTML = '';
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Selectează modelul';
      modelSelect.appendChild(defaultOption);
      models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
      });
      modelSelect.disabled = false;
    }

    
    function loadGenerations(brand, model) {
      const generations = getGenerationsByBrandAndModel(brand, model);
      generationSelect.innerHTML = '';
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Selectează generația';
      generationSelect.appendChild(defaultOption);
      generations.forEach(generation => {
        const option = document.createElement('option');
        option.value = generation;
        option.textContent = generation;
        generationSelect.appendChild(option);
      });
      generationSelect.disabled = false;
    }

    
    function loadEngines(brand, model, generation) {
      const engines = getEnginesByBrandModelGeneration(brand, model, generation);
      engineSelect.innerHTML = '';
      const defaultEngineOption = document.createElement('option');
      defaultEngineOption.value = '';
      defaultEngineOption.textContent = 'Selectează motorul';
      engineSelect.appendChild(defaultEngineOption);
      engines.forEach(engine => {
        const option = document.createElement('option');
        option.value = engine;
        option.textContent = engine;
        engineSelect.appendChild(option);
      });
      engineSelect.disabled = false;
    }

    const STAGE1_GAIN = 0.28;

    function estimateTorqueProfile(engineStr) {
      const e = (engineStr || '').toLowerCase();
      const dispMatch = e.match(/(\d\.\d)\b/);
      const disp = dispMatch ? parseFloat(dispMatch[1]) : 2.0;
      const isDiesel = /(tdi|tdci|jtd|jtdm|hdi|dci|cdi|cdti|crd|d-4d|bluehdi|multijet|d[\s-]?cat|\bd5\b|\b\d\.\d\s*d\b)/i.test(e);
      const isTurboPetrol = !isDiesel && /(turbo|tfsi|tsi|t-jet|ecoboost|mhev[\s-]?t|gdi[\s-]?t|multiair[\s-]?t|cgi|sidi|ecotec\s*t|hybrid\s*t)/i.test(e);

      let stockFactor;
      let type;

      if (isDiesel) {
        type = 'diesel';
        if (disp <= 1.6) stockFactor = 2.4;
        else if (disp <= 2.4) stockFactor = 2.15;
        else stockFactor = 2.0;
      } else if (isTurboPetrol) {
        type = 'turbo';
        if (disp <= 1.4) stockFactor = 1.65;
        else if (disp <= 2.5) stockFactor = 1.55;
        else stockFactor = 1.4;
      } else {
        type = 'aspirat';
        if (disp <= 1.6) stockFactor = 1.5;
        else if (disp <= 3.0) stockFactor = 1.3;
        else stockFactor = 1.05;
      }
      return { stockFactor, type, disp };
    }

    function roundNm(n) {
      return Math.round(n / 5) * 5;
    }

    function roundHP(n) {
      return Math.round(n);
    }

    function displayResults(brand, model, generation, engine, vehicle) {
      const stage1HP = roundHP(vehicle.stockHP * (1 + STAGE1_GAIN));
      const hpGain = stage1HP - vehicle.stockHP;
      const hpGainPercent = Math.round((hpGain / vehicle.stockHP) * 100);

      const profile = estimateTorqueProfile(engine);
      const stockNm = roundNm(vehicle.stockHP * profile.stockFactor);
      const stage1Nm = roundNm(stockNm * (1 + STAGE1_GAIN));
      const nmGain = stage1Nm - stockNm;
      const nmGainPercent = Math.round((nmGain / stockNm) * 100);

      document.getElementById('result-vehicle-name').textContent = `${brand} ${model}`;
      document.getElementById('result-vehicle-year').textContent = `${engine} • ${generation}`;
      document.getElementById('result-stock-hp').textContent = vehicle.stockHP;
      document.getElementById('result-stage1-hp').textContent = stage1HP;
      document.getElementById('result-hp-gain').textContent = `+${hpGain} HP (+${hpGainPercent}%)`;

      document.getElementById('result-stock-nm').textContent = stockNm;
      document.getElementById('result-stage1-nm').textContent = stage1Nm;
      document.getElementById('result-nm-gain').textContent = `+${nmGain} Nm (+${nmGainPercent}%)`;

      if (typeof trackEvent === 'function') {
        trackEvent('vehicle_lookup', {
          'event_category': 'lead_generation',
          'event_label': `${brand} ${model} ${engine}`,
          'vehicle_brand': brand,
          'vehicle_model': model,
          'hp_gain': hpGain,
          'hp_gain_percent': hpGainPercent,
          'value': 5
        });
        trackConversion('vehicle_lookup');
      }

      const whatsappMessage = encodeURIComponent(
        `Buna! Sunt interesat de tuning Stage 1 pentru ${brand} ${model} ${engine}. Vreau mai multe detalii despre cresterea la ${stage1HP} HP / ${stage1Nm} Nm (de la ${vehicle.stockHP} HP / ${stockNm} Nm).`
      );
      document.getElementById('whatsapp-cta').href = `https://wa.me/40744787446?text=${whatsappMessage}`;

      vehicleResult.classList.remove('hidden');
      setTimeout(() => {
        vehicleResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }

    
    try {
      loadBrands();
      
      if (brandSelect.options.length > 1) {
        brandSelect.disabled = false;
        brandSelect.style.pointerEvents = 'auto';
        brandSelect.style.zIndex = '10';
      }
    } catch (error) {
    }
    
    brandSelect.addEventListener('mousedown', function(e) {
      this.style.zIndex = '9999';
      e.stopPropagation();
    });
    
    brandSelect.addEventListener('focus', function() {
      this.style.zIndex = '9999';
    });
    
    brandSelect.addEventListener('blur', function() {
      this.style.zIndex = '10';
    });

    
    brandSelect.addEventListener('change', function() {
      const selectedBrand = this.value;

      
      modelSelect.innerHTML = '';
      generationSelect.innerHTML = '';
      engineSelect.innerHTML = '';
      const defaultModelOption = document.createElement('option');
      defaultModelOption.value = '';
      defaultModelOption.textContent = 'Selectează modelul';
      modelSelect.appendChild(defaultModelOption);
      const defaultGenOption = document.createElement('option');
      defaultGenOption.value = '';
      defaultGenOption.textContent = 'Selectează generația';
      generationSelect.appendChild(defaultGenOption);
      const defaultEngineOption = document.createElement('option');
      defaultEngineOption.value = '';
      defaultEngineOption.textContent = 'Selectează motorul';
      engineSelect.appendChild(defaultEngineOption);
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

      
      generationSelect.innerHTML = '';
      engineSelect.innerHTML = '';
      const defaultGenOption = document.createElement('option');
      defaultGenOption.value = '';
      defaultGenOption.textContent = 'Selectează generația';
      generationSelect.appendChild(defaultGenOption);
      const defaultEngineOption = document.createElement('option');
      defaultEngineOption.value = '';
      defaultEngineOption.textContent = 'Selectează motorul';
      engineSelect.appendChild(defaultEngineOption);
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

      
      engineSelect.innerHTML = '';
      const defaultEngineOption = document.createElement('option');
      defaultEngineOption.value = '';
      defaultEngineOption.textContent = 'Selectează motorul';
      engineSelect.appendChild(defaultEngineOption);
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
  }

  
  function tryInit() {
    if (typeof vehicleDatabase !== 'undefined' && vehicleDatabase.length > 0) {
      initVehicleLookup();
    } else {
      let retries = 0;
      const maxRetries = 10;
      const retryInterval = setInterval(function() {
        retries++;
        if (typeof vehicleDatabase !== 'undefined' && vehicleDatabase.length > 0) {
          clearInterval(retryInterval);
          initVehicleLookup();
        } else if (retries >= maxRetries) {
          clearInterval(retryInterval);
        }
      }, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      tryInit();
    });
  } else {
    
    tryInit();
  }
})();
