// Password Protection for Preturi Page
(function() {
  'use strict';

  // Update year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Password protection configuration
  const CORRECT_PASSWORD = "rxr2024"; // Change this to your desired password
  const PASSWORD_OVERLAY = document.getElementById('password-overlay');
  const MAIN_CONTENT = document.getElementById('main-content');
  const PASSWORD_FORM = document.getElementById('password-form');
  const PASSWORD_INPUT = document.getElementById('password-input');
  const ERROR_MESSAGE = document.getElementById('error-message');
  const SUBMIT_BTN = document.getElementById('submit-btn');

  // Check if password was already entered (session storage)
  if (sessionStorage.getItem('pricePageUnlocked') === 'true') {
    unlockPage();
  }

  // Password form submission handler
  PASSWORD_FORM.addEventListener('submit', function(e) {
    e.preventDefault();

    const enteredPassword = PASSWORD_INPUT.value.trim();

    if (enteredPassword === CORRECT_PASSWORD) {
      // Correct password
      sessionStorage.setItem('pricePageUnlocked', 'true');
      unlockPage();
    } else {
      // Wrong password
      ERROR_MESSAGE.classList.remove('hidden');
      PASSWORD_INPUT.classList.add('shake');
      PASSWORD_INPUT.value = '';
      PASSWORD_INPUT.focus();

      // Remove shake animation after it completes
      setTimeout(() => {
        PASSWORD_INPUT.classList.remove('shake');
      }, 400);

      // Hide error message after 3 seconds
      setTimeout(() => {
        ERROR_MESSAGE.classList.add('hidden');
      }, 3000);
    }
  });

  // Unlock page function
  function unlockPage() {
    PASSWORD_OVERLAY.classList.add('hidden');
    MAIN_CONTENT.classList.add('unlocked');
  }

  // Auto-focus on password input
  PASSWORD_INPUT.focus();
})();
