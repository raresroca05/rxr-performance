
(function() {
  'use strict';

  function initPasswordProtection() {
    
    if (window.RXR && typeof window.RXR.updateYear === 'function') {
      window.RXR.updateYear();
    } else {
      
      const yearElement = document.getElementById('year');
      if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
      }
    }

    
    const CORRECT_PASSWORD = "rxr2024"; 
    const PASSWORD_OVERLAY = document.getElementById('password-overlay');
    const MAIN_CONTENT = document.getElementById('main-content');
    const PASSWORD_FORM = document.getElementById('password-form');
    const PASSWORD_INPUT = document.getElementById('password-input');
    const ERROR_MESSAGE = document.getElementById('error-message');

    
    if (!PASSWORD_OVERLAY || !MAIN_CONTENT || !PASSWORD_FORM || !PASSWORD_INPUT || !ERROR_MESSAGE) {
      return; 
    }

    
    function unlockPage() {
      PASSWORD_OVERLAY.classList.add('hidden');
      MAIN_CONTENT.classList.add('unlocked');
    }

    
    if (sessionStorage.getItem('pricePageUnlocked') === 'true') {
      unlockPage();
    }

    
    PASSWORD_FORM.addEventListener('submit', function(e) {
    e.preventDefault();

    const enteredPassword = PASSWORD_INPUT.value.trim();

    if (enteredPassword === CORRECT_PASSWORD) {
      
      sessionStorage.setItem('pricePageUnlocked', 'true');
      unlockPage();
    } else {
      
      ERROR_MESSAGE.classList.remove('hidden');
      PASSWORD_INPUT.classList.add('shake');
      PASSWORD_INPUT.value = '';
      PASSWORD_INPUT.focus();

      
      setTimeout(() => {
        PASSWORD_INPUT.classList.remove('shake');
      }, 400);

      
      setTimeout(() => {
        ERROR_MESSAGE.classList.add('hidden');
      }, 3000);
    }
    });

    
    if (PASSWORD_INPUT) {
      PASSWORD_INPUT.focus();
    }
  }

  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordProtection);
  } else {
    
    initPasswordProtection();
  }
})();
