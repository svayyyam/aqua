/* ═══════════════════════════════════════════════════════
   AQUA ENTERPRISE — Premium Tiles Animations
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Scroll Reveal Animation ──
  const revealElements = document.querySelectorAll('.premium-tiles__brand-card, .premium-tiles__catalog-block');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 0.8s ease ' + (i % 2 * 0.15) + 's, transform 0.8s ease ' + (i % 2 * 0.15) + 's';
      observer.observe(el);
    });
  }
})();
