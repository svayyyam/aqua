document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ─── Pool Animation (Why Us Section) ───
    const poolCanvas = document.getElementById("pool-animation-canvas");
    if (poolCanvas) {
        const poolCtx = poolCanvas.getContext("2d");
        const poolFrameCount = 123;
        const poolImages = [];
        const poolObj = { frame: 0 };

        const poolFramePath = index => `assets/pool animation /ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

        let poolLoaded = 0;
        for (let i = 0; i < poolFrameCount; i++) {
            const img = new Image();
            img.onload = () => {
                poolLoaded++;
                if (poolLoaded === poolFrameCount) {
                    initPoolAnimation();
                }
            };
            img.src = poolFramePath(i);
            poolImages.push(img);
        }

        function initPoolAnimation() {
            const imgW = poolImages[0].naturalWidth;
            const imgH = poolImages[0].naturalHeight;
            const dpr = window.devicePixelRatio || 1;

            poolCanvas.width = imgW * dpr;
            poolCanvas.height = imgH * dpr;
            poolCtx.scale(dpr, dpr);
            poolCtx.imageSmoothingEnabled = true;
            poolCtx.imageSmoothingQuality = 'high';

            const renderPool = () => {
                if (!poolImages[poolObj.frame]) return;
                poolCtx.clearRect(0, 0, imgW, imgH);
                poolCtx.drawImage(
                    poolImages[poolObj.frame],
                    0, 0, imgW, imgH
                );
            };

            renderPool();

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

            window.addEventListener('resize', renderPool);

            ScrollTrigger.sort();
            ScrollTrigger.refresh();
        }
    }

    // ─── Process Animation (New Process Section) ───
    const processCanvas = document.getElementById("process-canvas");
    if (processCanvas) {
        const processCtx = processCanvas.getContext("2d");
        const processFrameCount = 241;
        const processImages = [];
        const processObj = { frame: 0 };

        const processFramePath = index => `assets/process /ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

        let processLoaded = 0;
        for (let i = 0; i < processFrameCount; i++) {
            const img = new Image();
            img.onload = () => {
                processLoaded++;
                if (processLoaded === processFrameCount) {
                    initProcessAnimation();
                }
            };
            img.src = processFramePath(i);
            processImages.push(img);
        }

        function initProcessAnimation() {
            const imgW = processImages[0].naturalWidth;
            const imgH = processImages[0].naturalHeight;

            // Set canvas to native image resolution — no DPR upscaling
            processCanvas.width = imgW;
            processCanvas.height = imgH;
            processCtx.imageSmoothingEnabled = true;
            processCtx.imageSmoothingQuality = 'high';

            const renderProcess = () => {
                const f = Math.round(processObj.frame);
                if (!processImages[f]) return;
                processCtx.clearRect(0, 0, imgW, imgH);
                processCtx.drawImage(processImages[f], 0, 0, imgW, imgH);
            };

            renderProcess();

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

            window.addEventListener('resize', renderProcess);

            ScrollTrigger.sort();
            ScrollTrigger.refresh();
        }
    }
});
