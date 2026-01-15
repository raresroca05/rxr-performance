
(function() {
  'use strict';

  function initFAQ() {
    const faqItems = document.querySelectorAll('details');
    
    if (faqItems.length === 0) {
      return; 
    }
    
    faqItems.forEach(function(details) {
      const summary = details.querySelector('summary');
      const svg = summary?.querySelector('svg');
      
      if (!summary || !svg) return;

      
      function updateArrow() {
        if (details.open) {
          svg.style.transform = 'rotate(180deg)';
          details.classList.add('open');
        } else {
          svg.style.transform = 'rotate(0deg)';
          details.classList.remove('open');
        }
      }

      
      details.addEventListener('toggle', updateArrow);
      
      
      summary.addEventListener('click', function() {
        setTimeout(updateArrow, 10);
      });
      
      
      updateArrow();
    });
  }

  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
  } else {
    initFAQ();
  }
})();
