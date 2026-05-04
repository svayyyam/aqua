/* ═══════════════════════════════════════════════════════
   AQUA ENTERPRISE — Counter Animation
   ═══════════════════════════════════════════════════════ */

(function () {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1500;
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current + (el.getAttribute('data-suffix') || '');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + (el.getAttribute('data-suffix') || '');
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(el => observer.observe(el));
})();
