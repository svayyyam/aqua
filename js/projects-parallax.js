/* ═══════════════════════════════════════════════════════
   AQUA ENTERPRISE — Projects Page Parallax & Lerp Effects
   Inspired by StringTune tutorial-02-parallax & tutorial-04-lerp
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // Wait for DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    // Ensure GSAP & ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[projects-parallax] GSAP/ScrollTrigger not loaded — skipping parallax.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const hero = document.getElementById('projects-hero');
    if (!hero) return;

    const heroBg = hero.querySelector('.projects-hero__bg');
    const heroImage = document.getElementById('hero-lerp-image');
    const heroForeground = document.getElementById('hero-foreground-pool');
    const heroContent = hero.querySelector('.projects-hero__content');
    const titleLine1 = hero.querySelector('.projects-hero__title-line--1');
    const titleLine2 = hero.querySelector('.projects-hero__title-line--2');
    const scrollIndicator = hero.querySelector('.projects-hero__scroll');

    // ─────────────────────────────────────────────────────
    // 1. Multi-Layer Parallax (inspired by tutorial-02-parallax)
    //    Different elements move at different speeds on scroll
    // ─────────────────────────────────────────────────────

    // Background — moves slowest (feels furthest away)
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    }

    // Floating image — moves at medium speed with scale + fade
    if (heroImage) {
      gsap.to(heroImage, {
        y: -120,
        opacity: 0,
        scale: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '80% top',
          scrub: 0.6
        }
      });
    }

    // Foreground pool cutout — moves FASTEST upward (like tutorial-02 image-1)
    // This creates the signature depth illusion: bg slow, mid medium, fg fast
    if (heroForeground) {
      gsap.to(heroForeground, {
        y: -200,
        scale: 1.08,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4
        }
      });
    }

    // Text content — moves fastest (feels closest)
    if (heroContent) {
      gsap.to(heroContent, {
        yPercent: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '70% top',
          scrub: 0.4
        }
      });
    }

    // Title lines — staggered parallax like tutorial-02
    if (titleLine1) {
      gsap.to(titleLine1, {
        x: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    }

    if (titleLine2) {
      gsap.to(titleLine2, {
        x: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    }

    // Scroll indicator fades out
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 0,
        y: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '30% top',
          scrub: true
        }
      });
    }

    // ─────────────────────────────────────────────────────
    // 2. Lerp Clip-Path Effect (inspired by tutorial-04-lerp)
    //    Image reveals with smooth clip-path animation as
    //    user scrolls, creating a cinematic crop effect
    // ─────────────────────────────────────────────────────

    if (heroImage) {
      const heroImg = heroImage.querySelector('img');

      // Lerp value drives the clip-path and image scale
      const lerpObj = { value: 0 };

      gsap.to(lerpObj, {
        value: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3,
          onUpdate: function () {
            const v = lerpObj.value;

            // Clip-path: starts fully visible, clips inward as you scroll
            // Mirrors the polygon lerp effect from tutorial-04
            const clipInset = Math.min(v * 0.15, 12);
            heroImage.style.clipPath = `polygon(
              ${clipInset}% ${clipInset * 0.5}%,
              ${100 - clipInset}% ${clipInset * 0.8}%,
              ${100 - clipInset * 0.7}% ${100 - clipInset}%,
              ${clipInset * 0.5}% ${100 - clipInset * 0.6}%
            )`;

            // Scale the inner image as lerp increases (tutorial-04 style)
            if (heroImg) {
              const imgScale = 1 + Math.min((v * v * 0.00008), 0.3);
              heroImg.style.transform = `scale(${imgScale})`;
            }
          }
        }
      });
    }

    // ─────────────────────────────────────────────────────
    // 3. Project Grid Cards — Scroll-Triggered Reveal
    //    Staggered entrance animations for the project cards
    // ─────────────────────────────────────────────────────

    const projectCards = document.querySelectorAll('.project-grid-card');
    if (projectCards.length) {
      gsap.fromTo(projectCards, 
        {
          y: 60,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // ─────────────────────────────────────────────────────
    // 4. Featured Spotlight — Parallax Image on Scroll
    // ─────────────────────────────────────────────────────

    const spotlightBg = document.querySelector('.featured-spotlight__bg img');
    if (spotlightBg) {
      gsap.to(spotlightBg, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.featured-spotlight',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6
        }
      });
    }

    // ─────────────────────────────────────────────────────
    // 5. Sort & Refresh all ScrollTriggers
    // ─────────────────────────────────────────────────────
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
})();
