/**
 * script.js
 * Interaction Layer for "Signal & Noise" Portfolio
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Check Preferences & Fallbacks
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth <= 768;
    const hasTouch = (window.matchMedia("(hover: none) and (pointer: coarse)").matches);

    // Set current year in footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileOverlay = document.getElementById("mobile-nav-overlay");
    if (mobileBtn && mobileOverlay) {
        mobileBtn.addEventListener("click", () => {
            const isActive = mobileOverlay.classList.contains("active");
            if (isActive) {
                mobileOverlay.classList.remove("active");
                mobileBtn.setAttribute("aria-expanded", "false");
            } else {
                mobileOverlay.classList.add("active");
                mobileBtn.setAttribute("aria-expanded", "true");
            }
        });
        
        mobileOverlay.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileOverlay.classList.remove("active");
                mobileBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 2. Smooth Scroll Setup (Lenis)
    let lenis;
    if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
        // Initialize Lenis but ensure it doesn't hijack native keyboard accessibility
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Start rAF loop for lenis
        function rafLenis(time) {
            lenis.raf(time);
            requestAnimationFrame(rafLenis);
        }
        requestAnimationFrame(rafLenis);
    }

    // 3. GSAP Scroll Reveals (Additive enhancement)
    if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        if (lenis) {
            // Sync Lenis with ScrollTrigger
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }

        // Apply CSS-first hiding only if GSAP loaded successfully
        // This guarantees if the CDN fails, elements remain visible.
        const revealElements = document.querySelectorAll(".gs-reveal");
        
        revealElements.forEach((el) => {
            // Hide element via JS just before setting up animation
            el.classList.add("js-hidden");
            gsap.set(el, { autoAlpha: 0, y: 40 });

            if (el.classList.contains("gs-stagger")) {
                // If it's a stagger parent, we don't animate the container but the children
                // Wait, in HTML I placed gs-stagger on individual elements directly or groups?
                // Actually I placed it on the elements themselves. 
                // We'll handle them normally.
            }

            ScrollTrigger.create({
                trigger: el,
                start: "top 85%",
                onEnter: () => {
                    gsap.to(el, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        clearProps: "all" // removes inline styles after animation for accessibility
                    });
                },
                once: true
            });
        });

        // Stagger groups (e.g. bento cards, timeline items)
        const bentoCards = gsap.utils.toArray('.bento-card');
        if (bentoCards.length > 0) {
            gsap.set(bentoCards, { autoAlpha: 0, y: 30 });
            ScrollTrigger.create({
                trigger: '.bento-grid',
                start: "top 80%",
                onEnter: () => {
                    gsap.to(bentoCards, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        clearProps: "all"
                    });
                },
                once: true
            });
        }
    }

    // 4. Custom Context-Aware Cursor
    const cursor = document.getElementById("custom-cursor");
    if (cursor && !hasTouch) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        const speed = 0.2;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const hoverElements = document.querySelectorAll("a, button, [data-cursor='hover']");
        hoverElements.forEach(el => {
            el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
        });

        function updateCursor() {
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(updateCursor);
        }
        updateCursor();
    } else if (cursor) {
        cursor.style.display = "none";
    }

    // 5. Idle-Guarded Performance Canvas (Signal Thread)
    const canvas = document.getElementById("signal-canvas");
    if (canvas && !isMobile && !prefersReducedMotion) {
        const ctx = canvas.getContext("2d");
        let width, height;
        
        let framesIdle = 0;
        const MAX_IDLE_FRAMES = 90; // approx 1.5 seconds at 60fps
        let isAnimating = true;
        let scrollY = window.scrollY;
        
        let phase = 0;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resize);
        resize();

        // Wake up logic
        function wakeUp() {
            framesIdle = 0;
            if (!isAnimating) {
                isAnimating = true;
                renderCanvas();
            }
        }

        window.addEventListener("mousemove", wakeUp);
        window.addEventListener("scroll", () => {
            scrollY = window.scrollY;
            wakeUp();
        }, { passive: true });

        function renderCanvas() {
            if (!isAnimating) return;
            
            framesIdle++;
            if (framesIdle > MAX_IDLE_FRAMES) {
                isAnimating = false; // Sleep
                return;
            }

            ctx.clearRect(0, 0, width, height);
            
            // Draw an abstract signal line based on scroll
            phase += 0.02;
            
            ctx.beginPath();
            ctx.strokeStyle = "rgba(37, 99, 235, 0.4)"; // Azure blue
            ctx.lineWidth = 2;
            
            const startY = -50;
            const endY = height + 50;
            const centerX = width * 0.8; // right aligned side
            
            for (let y = startY; y < endY; y += 10) {
                // Modulate wave based on scroll position and time
                const scrollOffset = scrollY * 0.1;
                const wave = Math.sin(y * 0.01 + phase) * 20 
                           + Math.cos(y * 0.02 - scrollOffset * 0.05) * 15;
                
                const x = centerX + wave;
                
                if (y === startY) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            requestAnimationFrame(renderCanvas);
        }
        
        // Initial kick-off
        wakeUp();
    }
});
