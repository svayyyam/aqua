/* ═══════════════════════════════════════════════════════
   AQUA ENTERPRISE — Process Parallax Animation
   Pure GSAP. Single timeline. Zero latency.
   ═══════════════════════════════════════════════════════ */

(function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  // ── Set z-index for stacked images ──
  document.querySelectorAll(".process-img-wrapper").forEach((el) => {
    const idx = el.getAttribute("data-index");
    if (idx !== null) el.style.zIndex = idx;
  });

  const imgs = gsap.utils.toArray(".process-img-wrapper img");
  if (!imgs.length) return;

  // ── Blue palette: light → dark (from reference) ──
  const bgColors = [
    "#9CB4CC", // Phase 1 (Darkened for legibility)
    "#8EBBE9", // Pantone 283 CP (Phase 2)
    "#7D9BC1", // Pantone 652 CP (Phase 3)
    "#5D7DA6", // Transition (Phase 4)
    "#3D5E8C", // Pantone 19-4039 TCX (Phase 5)
    "#28466F", // Transition (Phase 6)
    "#132E53"  // Pantone 289 CP (Phase 7)
  ];

  // ── Mobile interleave ordering ──
  function handleMobileLayout() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const steps = gsap.utils.toArray(".process-arch__left .process-step");
    const wrappers = gsap.utils.toArray(".process-arch__right .process-img-wrapper");

    if (isMobile) {
      steps.forEach((s, i) => (s.style.order = i * 2));
      wrappers.forEach((w, i) => (w.style.order = i * 2 + 1));
    } else {
      steps.forEach((s) => (s.style.order = ""));
      wrappers.forEach((w) => (w.style.order = ""));
    }
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleMobileLayout, 120);
  });
  handleMobileLayout();

  // ── GSAP Scroll Animations ──
  ScrollTrigger.matchMedia({

    /* ════ DESKTOP ════ */
    "(min-width: 769px)": function () {

      // Single master timeline: pin + scrub together = perfect sync
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".process-arch",
          start: "top top",
          end: "bottom bottom",
          pin: ".process-arch__right",
          scrub: true   // true = instant sync with scroll, no interpolation delay
        }
      });

      // All images start fully visible; stacking order handles visibility
      gsap.set(imgs, {
        clipPath: "inset(0% 0% 0% 0%)",
        objectPosition: "center 20%"
      });

      // Build the timeline: for each transition, clip away the current top image
      imgs.forEach((currentImg, index) => {
        const nextImg = imgs[index + 1];
        if (!nextImg) return; // last image — nothing to transition to

        const sectionTL = gsap.timeline();

        // Transition background color
        sectionTL.to(
          ".process-parallax",
          {
            backgroundColor: bgColors[(index + 1) % bgColors.length],
            duration: 1.5,
            ease: "power1.inOut"
          },
          0
        );

        // Clip away current image from bottom → reveals next image underneath
        sectionTL.to(
          currentImg,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            objectPosition: "center 80%",
            duration: 1.5,
            ease: "none"
          },
          0
        );

        // Subtle parallax shift on the incoming image
        sectionTL.fromTo(
          nextImg,
          { objectPosition: "center 0%" },
          {
            objectPosition: "center 30%",
            duration: 1.5,
            ease: "none"
          },
          0
        );

        mainTimeline.add(sectionTL);
      });

      // Text fade-in (separate from the main timeline, won't affect sync)
      const steps = gsap.utils.toArray(".process-arch__left .process-step");
      steps.forEach((step) => {
        const inner = step.querySelector(".process-step__inner");
        gsap.fromTo(
          inner,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      });
    },

    /* ════ MOBILE ════ */
    "(max-width: 768px)": function () {
      // Simple scale-up reveal + bg color change per image
      const wrappers = gsap.utils.toArray(".process-img-wrapper");
      wrappers.forEach((wrapper, index) => {
        const img = wrapper.querySelector("img");

        gsap.fromTo(
          img,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
              end: "bottom 15%",
              scrub: 1,
            },
          }
        );

        // Background color transition
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top 60%",
          onEnter: () => {
            gsap.to(".process-parallax", {
              backgroundColor: bgColors[index % bgColors.length],
              duration: 0.6,
              ease: "power2.inOut"
            });
          },
          onEnterBack: () => {
            gsap.to(".process-parallax", {
              backgroundColor: bgColors[Math.max(0, index - 1) % bgColors.length] || bgColors[0],
              duration: 0.6,
              ease: "power2.inOut"
            });
          }
        });
      });
    },
  });
})();
