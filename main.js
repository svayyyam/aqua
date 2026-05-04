document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer - Fade in elements on scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // If it's a counter, animate it
                const counters = entry.target.querySelectorAll('.mini-stat__number');
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    const suffix = counter.dataset.suffix || '';
                    animateCounter(counter, target, 2000, suffix);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // 2. Sticky nav scroll behavior
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
    });

    // 3. Counter animation function
    function animateCounter(el, target, duration, suffix) {
        let start = 0;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            el.textContent = Math.floor(progress * target) + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }

    // 4. Mobile hamburger menu
    const hamburger = document.querySelector('.nav__hamburger');
    const navLinks = document.querySelector('.nav__links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav__links--open');
            hamburger.classList.toggle('is-open');
        });
    }

    // 5. Horizontal testimonials auto-scroll
    const track = document.getElementById('testimonialsTrack');
    if (track) {
        let autoScrollInterval = setInterval(() => {
            track.scrollBy({ left: 350, behavior: 'smooth' });
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            }
        }, 3500);
        track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    }

    // 6. Pill selector toggle (contact page)
    document.querySelectorAll('.pill-selector').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
        });
    });

    // 7. Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
