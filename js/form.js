/* ═══════════════════════════════════════════════════════
   AQUA ENTERPRISE — Contact Form Interactions
   ═══════════════════════════════════════════════════════ */

(function () {
  // Interest pill toggle
  const pills = document.querySelectorAll('.interest-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
    });
  });

  // Form submission handler
  const form = document.getElementById('contact-form');
  const successMessage = document.querySelector('.contact-form__success');
  
  if (form && successMessage) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Hide the form
      form.style.display = 'none';
      
      // Show success message
      successMessage.classList.add('show');
    });
  }
})();
