/* ═══════════════════════════════════════════════════════
   AQUA ENTERPRISE — 3D Slider Logic
   ═══════════════════════════════════════════════════════ */

(function() {
  const slider = document.querySelector('.s3d');
  if (!slider) return;

  const slides = [...document.querySelectorAll('.s3d__slide')];
  const btnPrev = document.querySelector('.s3d__btn--prev');
  const btnNext = document.querySelector('.s3d__btn--next');
  let currentIdx = 0;

  function updateSlides() {
    slides.forEach((slide, i) => {
      slide.removeAttribute('data-current');
      slide.removeAttribute('data-next');
      slide.removeAttribute('data-previous');
      
      if (i === currentIdx) {
        slide.setAttribute('data-current', '');
      } else if (i === (currentIdx + 1) % slides.length) {
        slide.setAttribute('data-next', '');
      } else if (i === (currentIdx - 1 + slides.length) % slides.length) {
        slide.setAttribute('data-previous', '');
      }
    });
  }

  function next() {
    currentIdx = (currentIdx + 1) % slides.length;
    updateSlides();
  }

  function prev() {
    currentIdx = (currentIdx - 1 + slides.length) % slides.length;
    updateSlides();
  }

  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);

  // --- Keyboard Navigation ---
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // --- Tilt Effect ---
  slides.forEach(slide => {
    const inner = slide.querySelector('.s3d__inner');
    const img = slide.querySelector('.s3d__img');
    
    slide.addEventListener('mousemove', (e) => {
      if (!slide.hasAttribute('data-current')) return;
      
      const rect = slide.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      
      gsap.to(inner, {
        duration: 0.5,
        rotateX: -percentY * 15,
        rotateY: percentX * 15,
        ease: 'power2.out'
      });
      
      gsap.to(img, {
        duration: 0.5,
        x: percentX * 20,
        y: percentY * 20,
        ease: 'power2.out'
      });
    });

    slide.addEventListener('mouseleave', () => {
      gsap.to(inner, {
        duration: 0.8,
        rotateX: 0,
        rotateY: 0,
        ease: 'elastic.out(1, 0.3)'
      });
      gsap.to(img, {
        duration: 0.8,
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });

  // Init
  updateSlides();
})();
