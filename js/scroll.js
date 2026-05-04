/* ═══════════════════════════════════════════════════════
   AQUA ENTERPRISE — Scroll Reveal Animations
   ═══════════════════════════════════════════════════════ */

(function () {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
})();

// ── Service Detail Video Loop ──
(function() {
  const video = document.getElementById('service-loop-video');
  if (!video) return;

  const sources = [
    'assets/high pressure pt 2.mp4',
    'assets/waterproofing.mp4',
    'assets/high pressure washing water .mp4'
  ];
  let current = 0;

  function playNext() {
    video.src = sources[current];
    video.load();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play might be blocked, wait for user interaction or just retry
      });
    }
    current = (current + 1) % sources.length;
  }

  video.addEventListener('ended', playNext);
  playNext();
})();
