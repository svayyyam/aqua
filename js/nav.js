/* ═══════════════════════════════════════════════════════
   AQUA ENTERPRISE — Navigation Behavior
   ═══════════════════════════════════════════════════════ */

(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Scroll-triggered background
  function handleNavScroll() {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on page load

  // Mobile hamburger menu
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileOverlay = document.querySelector('.nav__mobile-overlay');

  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileOverlay.classList.toggle('open');
      document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
    });

    // Close on mobile link click
    const mobileLinks = mobileOverlay.querySelectorAll('.nav__mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth page transitions
  const navLinks = document.querySelectorAll('a[href$=".html"], a[href="index.html"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // skip external, hash, or same page links
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
      e.preventDefault();
      const main = document.querySelector('main');
      if (main) {
        main.classList.add('page-transition-out');
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      } else {
        window.location.href = href;
      }
    });
  });
})();
