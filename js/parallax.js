/* ═══════════════════════════════════════════════════════
   AQUA ENTERPRISE — Parallax Effect
   ═══════════════════════════════════════════════════════ */

(function () {
  const heroImg = document.querySelector('.hero__bg img, .page-hero__bg img');
  
  if (!heroImg) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    if (heroImg) {
      heroImg.style.transform = `translate3d(0, ${scrollY * 0.4}px, 0)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
})();
