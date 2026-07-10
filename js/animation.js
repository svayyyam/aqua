document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Helper for low-concurrency background image loading
    function startBackgroundLoading(imagesArray, totalCount, pathResolver, startIndex) {
        let index = startIndex;
        const concurrency = 4; // limit parallel downloads to keep browser highly responsive
        
        function loadNext() {
            if (index >= totalCount) return;
            const currentIdx = index++;
            const img = imagesArray[currentIdx];
            img.onload = () => {
                loadNext();
            };
            img.onerror = () => {
                loadNext(); // skip bad frame
            };
            img.src = pathResolver(currentIdx);
        }

        for (let c = 0; c < concurrency; c++) {
            loadNext();
        }
    }

    // ─── Pool Animation (Why Us Section) ───
    const poolCanvas = document.getElementById("pool-animation-canvas");
    if (poolCanvas) {
        const poolCtx = poolCanvas.getContext("2d");
        const poolFrameCount = 123;
        const poolImages = [];
        const poolObj = { frame: 0 };
        const poolFramePath = index => `assets/pool animation /ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

        // Pre-create image elements
        for (let i = 0; i < poolFrameCount; i++) {
            poolImages.push(new Image());
        }

        // Helper to find closest loaded frame
        const getClosestPoolFrame = (target) => {
            if (poolImages[target] && poolImages[target].complete && poolImages[target].naturalWidth !== 0) {
                return poolImages[target];
            }
            for (let offset = 1; offset < poolFrameCount; offset++) {
                if (target - offset >= 0) {
                    const img = poolImages[target - offset];
                    if (img && img.complete && img.naturalWidth !== 0) return img;
                }
                if (target + offset < poolFrameCount) {
                    const img = poolImages[target + offset];
                    if (img && img.complete && img.naturalWidth !== 0) return img;
                }
            }
            return null;
        };

        const renderPool = () => {
            const frame = Math.round(poolObj.frame);
            const img = getClosestPoolFrame(frame);
            if (!img) return;
            // Draw at native resolution (no DPR multiplier to prevent huge canvas rendering lag in Safari)
            const imgW = img.naturalWidth;
            const imgH = img.naturalHeight;
            if (poolCanvas.width !== imgW || poolCanvas.height !== imgH) {
                poolCanvas.width = imgW;
                poolCanvas.height = imgH;
                poolCtx.imageSmoothingEnabled = true;
                poolCtx.imageSmoothingQuality = 'low';
            }
            poolCtx.clearRect(0, 0, imgW, imgH);
            poolCtx.drawImage(img, 0, 0, imgW, imgH);
        };

        // Load frame 0 first to render immediately
        poolImages[0].onload = () => {
            renderPool();
            initPoolScrollTrigger();
            startBackgroundLoading(poolImages, poolFrameCount, poolFramePath, 1);
        };
        poolImages[0].src = poolFramePath(0);

        function initPoolScrollTrigger() {
            gsap.to(poolObj, {
                frame: poolFrameCount - 1,
                snap: "frame",
                ease: "none",
                scrollTrigger: {
                    trigger: ".why-us",
                    start: "46% center",
                    end: "+=2000",
                    scrub: 0.5,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: renderPool
                }
            });

            let poolResizeTimer;
            window.addEventListener('resize', () => {
              clearTimeout(poolResizeTimer);
              poolResizeTimer = setTimeout(renderPool, 150);
            });

            ScrollTrigger.sort();
            ScrollTrigger.refresh();
        }
    }

    // ─── Process Animation (New Process Section) ───
    const processCanvas = document.getElementById("process-canvas");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (processCanvas && !isMobile) {
        const processCtx = processCanvas.getContext("2d");
        const processFrameCount = 241;
        const processImages = [];
        const processObj = { frame: 0 };
        const processFramePath = index => `assets/process /ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

        // Pre-create image elements
        for (let i = 0; i < processFrameCount; i++) {
            processImages.push(new Image());
        }

        const getClosestProcessFrame = (target) => {
            if (processImages[target] && processImages[target].complete && processImages[target].naturalWidth !== 0) {
                return processImages[target];
            }
            for (let offset = 1; offset < processFrameCount; offset++) {
                if (target - offset >= 0) {
                    const img = processImages[target - offset];
                    if (img && img.complete && img.naturalWidth !== 0) return img;
                }
                if (target + offset < processFrameCount) {
                    const img = processImages[target + offset];
                    if (img && img.complete && img.naturalWidth !== 0) return img;
                }
            }
            return null;
        };

        const renderProcess = () => {
            const frame = Math.round(processObj.frame);
            const img = getClosestProcessFrame(frame);
            if (!img) return;
            const imgW = img.naturalWidth;
            const imgH = img.naturalHeight;
            if (processCanvas.width !== imgW || processCanvas.height !== imgH) {
                processCanvas.width = imgW;
                processCanvas.height = imgH;
                processCtx.imageSmoothingEnabled = true;
                processCtx.imageSmoothingQuality = 'low';
            }
            processCtx.clearRect(0, 0, imgW, imgH);
            processCtx.drawImage(img, 0, 0, imgW, imgH);
        };

        // Load frame 0 first to render immediately
        processImages[0].onload = () => {
            renderProcess();
            initProcessScrollTrigger();
            startBackgroundLoading(processImages, processFrameCount, processFramePath, 1);
        };
        processImages[0].src = processFramePath(0);

        function initProcessScrollTrigger() {
            let mm = gsap.matchMedia();

            mm.add("(min-width: 769px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".process-gsap",
                        start: "bottom bottom",
                        end: "+=300%",
                        scrub: 0.3,
                        pin: true,
                        anticipatePin: 1
                    }
                });

                tl.to(processObj, {
                    frame: processFrameCount - 1,
                    snap: "frame",
                    ease: "none",
                    onUpdate: renderProcess
                });
            });

            let processResizeTimer;
            window.addEventListener('resize', () => {
              clearTimeout(processResizeTimer);
              processResizeTimer = setTimeout(renderProcess, 150);
            });

            ScrollTrigger.sort();
            ScrollTrigger.refresh();
        }
    }

    // ─── Progressive Video Fade-in (Hero Section) ───
    const heroVideo = document.getElementById("hero-bg-video");
    if (heroVideo) {
        if (heroVideo.readyState >= 3) {
            heroVideo.classList.add("video-loaded");
        } else {
            heroVideo.addEventListener("playing", () => {
                heroVideo.classList.add("video-loaded");
            });
            heroVideo.addEventListener("canplay", () => {
                heroVideo.classList.add("video-loaded");
            });
        }
    }
});
