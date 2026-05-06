/* ═══════════════════════════════════════════════════════
   AQUA ENTERPRISE — Custom Cursor
   ═══════════════════════════════════════════════════════ */

(function () {
  // Skip on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

/*
  const dot = document.createElement('div');
  dot.className = 'cursor';
  document.body.appendChild(dot);

  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  document.body.appendChild(trail);

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows immediately
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateTrail() {
    // Smooth lerp for the trail
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
*/

  // Update hover interaction to include more elements
  const updateInteractives = () => {
    const interactives = document.querySelectorAll('a, button, .s3d__btn, .nav__link, .nav__cta, .btn-primary, .btn-outline, .btn-ghost, .nav__hamburger, .service-detail__image-wrap, .service-area__pill, .interest-pill');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  };
  updateInteractives();

  // Re-run on dynamic content changes if necessary
  const observer = new MutationObserver(updateInteractives);
  observer.observe(document.body, { childList: true, subtree: true });
})();
