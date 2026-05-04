/* ═══════════════════════════════════════════════════════
   AQUA ENTERPRISE — Contact Form Interactions
   ═══════════════════════════════════════════════════════ */

(function () {
  // Interest pill toggle
  const pills = document.querySelectorAll('.interest-pill');
  const interestsInput = document.getElementById('interests-input');

  function updateInterests() {
    if (!interestsInput) return;
    const selected = Array.from(document.querySelectorAll('.interest-pill.selected'))
      .map(p => p.textContent);
    interestsInput.value = selected.join(', ');
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
      updateInterests();
    });
  });

  // Form submission handler
  const form = document.getElementById('contact-form');
  const successMessage = document.querySelector('.contact-form__success');
  
  if (form && successMessage) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Hide the form
          form.style.display = 'none';
          document.querySelector('.contact-form__interests').style.display = 'none';
          document.querySelector('.contact-form__interest-heading').style.display = 'none';
          
          // Show success message
          successMessage.classList.add('show');
        } else {
          const data = await response.json();
          if (Object.hasOwn(data, 'errors')) {
            alert(data["errors"].map(error => error["message"]).join(", "));
          } else {
            alert("Oops! There was a problem submitting your form");
          }
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      } catch (error) {
        alert("Oops! There was a problem submitting your form");
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
})();
