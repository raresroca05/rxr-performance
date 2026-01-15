
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

    
    function displayResults(brand, model, generation, engine, vehicle) {
      const hpGain = vehicle.stage1HP - vehicle.stockHP;
      const hpGainPercent = Math.round((hpGain / vehicle.stockHP) * 100);

      document.getElementById('result-vehicle-name').textContent = `${brand} ${model}`;
      document.getElementById('result-vehicle-year').textContent = `${engine} • ${generation}`;
      document.getElementById('result-stock-hp').textContent = vehicle.stockHP;
      document.getElementById('result-stage1-hp').textContent = vehicle.stage1HP;
      document.getElementById('result-hp-gain').textContent = `(+${hpGain} HP / +${hpGainPercent}%)`;

      
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
        `Bună! Sunt interesat de tuning Stage 1 pentru ${brand} ${model} ${engine}. Aș vrea mai multe detalii despre creșterea la ${vehicle.stage1HP} HP (de la ${vehicle.stockHP} HP).`
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
