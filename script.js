/**
 * script.js
 * Interaction Layer — "Signal & Precision" Portfolio
 * Theme · Dynamic Hero · System Status · Case Study · Canvas · Cursor
 */

document.addEventListener("DOMContentLoaded", () => {
    // === Preferences & Device Detection ===
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth <= 768;
    const hasTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    // Footer year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ========================================================================
    // 1. THEME SYSTEM
    // ========================================================================
    const themeToggles = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile");

    function getTheme() {
        return document.documentElement.getAttribute("data-theme") || "light";
    }

    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
        themeToggles.forEach(btn => btn.setAttribute("aria-label", label));
    }

    // Initialize labels
    setTheme(getTheme());

    themeToggles.forEach(btn => {
        btn.addEventListener("click", () => {
            const next = getTheme() === "dark" ? "light" : "dark";
            setTheme(next);
        });
    });

    // Listen for OS theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
        }
    });

    // ========================================================================
    // 2. MOBILE MENU
    // ========================================================================
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileOverlay = document.getElementById("mobile-nav-overlay");
    let menuOpen = false;

    function openMenu() {
        menuOpen = true;
        mobileOverlay.classList.add("active");
        mobileOverlay.setAttribute("aria-hidden", "false");
        mobileBtn.setAttribute("aria-expanded", "true");
        mobileBtn.setAttribute("aria-label", "Close menu");
        document.body.classList.add("menu-open");
        // Focus first link
        const firstLink = mobileOverlay.querySelector("a");
        if (firstLink) firstLink.focus();
    }

    function closeMenu() {
        menuOpen = false;
        mobileOverlay.classList.remove("active");
        mobileOverlay.setAttribute("aria-hidden", "true");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.setAttribute("aria-label", "Open menu");
        document.body.classList.remove("menu-open");
        mobileBtn.focus();
    }

    if (mobileBtn && mobileOverlay) {
        mobileBtn.addEventListener("click", () => {
            menuOpen ? closeMenu() : openMenu();
        });

        // Close on link click
        mobileOverlay.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && menuOpen) {
                closeMenu();
            }
        });
    }

    // ========================================================================
    // 3. DYNAMIC HERO TEXT
    // ========================================================================
    const dynamicTextEl = document.getElementById("dynamic-text");
    const signals = [
        "Detection Engineering",
        "Network Security",
        "Web Exploitation",
        "CTF Research",
        "SOC Analysis",
        "Security Engineering"
    ];
    let signalIndex = 0;

    if (dynamicTextEl && !prefersReducedMotion) {
        setInterval(() => {
            dynamicTextEl.style.opacity = "0";
            setTimeout(() => {
                signalIndex = (signalIndex + 1) % signals.length;
                dynamicTextEl.textContent = signals[signalIndex];
                dynamicTextEl.style.opacity = "1";
            }, 350);
        }, 3200);
    }

    // ========================================================================
    // 4. SYSTEM STATUS INDICATOR
    // ========================================================================
    const ssValueEl = document.getElementById("ss-value");
    const statusSections = document.querySelectorAll("[data-status]");

    if (ssValueEl && statusSections.length > 0 && !isMobile) {
        const statusObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const newVal = entry.target.getAttribute("data-status");
                    if (newVal && ssValueEl.textContent !== newVal) {
                        ssValueEl.style.opacity = "0";
                        setTimeout(() => {
                            ssValueEl.textContent = newVal;
                            ssValueEl.style.opacity = "1";
                        }, 150);
                    }
                }
            });
        }, { threshold: 0.3 });

        statusSections.forEach(section => statusObserver.observe(section));
    }

    // ========================================================================
    // 5. CASE STUDY MAP (Flagship)
    // ========================================================================
    const csNodes = document.querySelectorAll(".cs-node");
    const csDetailText = document.getElementById("cs-detail-text");

    csNodes.forEach(node => {
        function activate() {
            // Deactivate siblings
            csNodes.forEach(n => {
                n.classList.remove("active");
                n.setAttribute("aria-expanded", "false");
            });
            node.classList.add("active");
            node.setAttribute("aria-expanded", "true");
            if (csDetailText) {
                csDetailText.textContent = node.getAttribute("data-detail") || "";
            }
        }
        node.addEventListener("click", activate);
        node.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate();
            }
        });
    });

    // ========================================================================
    // 6. SMOOTH SCROLL (Lenis)
    // ========================================================================
    let lenis;
    if (!prefersReducedMotion && typeof Lenis !== "undefined") {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function rafLenis(time) {
            lenis.raf(time);
            requestAnimationFrame(rafLenis);
        }
        requestAnimationFrame(rafLenis);
    }

    // ========================================================================
    // 7. GSAP SCROLL REVEALS
    // ========================================================================
    if (!prefersReducedMotion && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        if (lenis) {
            lenis.on("scroll", ScrollTrigger.update);
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);
        }

        // Reveal elements
        const revealElements = document.querySelectorAll(".gs-reveal");
        revealElements.forEach((el) => {
            el.classList.add("js-hidden");
            gsap.set(el, { autoAlpha: 0, y: 30 });

            ScrollTrigger.create({
                trigger: el,
                start: "top 88%",
                onEnter: () => {
                    gsap.to(el, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power3.out",
                        clearProps: "all"
                    });
                },
                once: true
            });
        });

        // Stagger bento cards
        const bentoCards = gsap.utils.toArray(".bento-card");
        if (bentoCards.length > 0) {
            gsap.set(bentoCards, { autoAlpha: 0, y: 25 });
            ScrollTrigger.create({
                trigger: ".bento-grid",
                start: "top 82%",
                onEnter: () => {
                    gsap.to(bentoCards, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: "power2.out",
                        clearProps: "all"
                    });
                },
                once: true
            });
        }

        // Stagger proof items
        const proofItems = gsap.utils.toArray(".proof-item");
        if (proofItems.length > 0) {
            gsap.set(proofItems, { autoAlpha: 0, y: 20 });
            ScrollTrigger.create({
                trigger: ".proof-grid",
                start: "top 82%",
                onEnter: () => {
                    gsap.to(proofItems, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out",
                        clearProps: "all"
                    });
                },
                once: true
            });
        }

        // ========================================================================
        // 7.1 "NOISE -> SIGNAL -> ORDER" INTERACTION SYSTEM
        // ========================================================================

        // A. Text Assembly (About Section)
        const splitContainers = document.querySelectorAll(".split-text-container");
        splitContainers.forEach(container => {
            const paragraphs = container.querySelectorAll(".split-text");
            let allWords = [];
            
            paragraphs.forEach(p => {
                const words = p.innerText.split(/\s+/);
                p.innerHTML = "";
                words.forEach(word => {
                    if (word.trim() === "") return;
                    const span = document.createElement("span");
                    span.className = "signal-word";
                    span.setAttribute("aria-hidden", "true");
                    span.innerText = word + " ";
                    p.appendChild(span);
                    allWords.push(span);
                });
            });

            // Set initial scattered state
            const scatterRadius = window.innerWidth < 768 ? 15 : 40;
            allWords.forEach(word => {
                const tx = (Math.random() - 0.5) * scatterRadius * 2;
                const ty = (Math.random() - 0.5) * scatterRadius * 2;
                const rot = (Math.random() - 0.5) * 10;
                const blur = Math.random() * 2;
                
                gsap.set(word, {
                    x: tx,
                    y: ty,
                    rotation: rot,
                    opacity: 0.2 + Math.random() * 0.3,
                    filter: `blur(${blur}px)`
                });
            });

            // Scrubbed assembly
            gsap.to(allWords, {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                stagger: 0.005,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                    end: "center 40%",
                    scrub: 1
                }
            });
        });

        // B. Proof of Work Connecting Lines
        const proofArrows = document.querySelectorAll(".proof-arrow svg");
        proofArrows.forEach(arrow => {
            gsap.to(arrow, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: arrow.closest(".proof-item"),
                    start: "top 75%",
                    end: "bottom 60%",
                    scrub: 0.5
                }
            });
        });

        // C. Case Study Map Connectors (Flagship)
        const csConnectors = document.querySelectorAll(".cs-connector span");
        gsap.set(csConnectors, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.create({
            trigger: ".case-study-map",
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
            animation: gsap.to(csConnectors, {
                scaleX: 1,
                stagger: 0.2,
                ease: "none"
            })
        });

        // D. Timeline Fill & Nodes
        const timelineFill = document.getElementById("timeline-fill");
        if (timelineFill) {
            gsap.to(timelineFill, {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top 60%",
                    end: "bottom 60%",
                    scrub: 0.5
                }
            });

            const timelineItems = document.querySelectorAll(".timeline-item");
            timelineItems.forEach(item => {
                ScrollTrigger.create({
                    trigger: item,
                    start: "top 60%", // sync with line fill
                    onEnter: () => item.classList.add("active-node"),
                    onLeaveBack: () => item.classList.remove("active-node")
                });
            });
        }
    }

    // ========================================================================
    // 8. CUSTOM CURSOR
    // ========================================================================
    const cursor = document.getElementById("custom-cursor");
    if (cursor && !hasTouch && !prefersReducedMotion) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        const speed = 0.18;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const hoverEls = document.querySelectorAll("a, button, [data-cursor='hover'], .cs-node, .bento-card, .cred-card, .timeline-item");
        hoverEls.forEach(el => {
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

    // ========================================================================
    // 9. SIGNAL CANVAS (Idle-Guarded)
    // ========================================================================
    const canvas = document.getElementById("signal-canvas");
    if (canvas && !isMobile && !prefersReducedMotion) {
        const ctx = canvas.getContext("2d");
        let width, height;
        let framesIdle = 0;
        const MAX_IDLE = 90;
        let isAnimating = true;
        let scrollY = window.scrollY;
        let phase = 0;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resize);
        resize();

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
            if (framesIdle > MAX_IDLE) {
                isAnimating = false;
                return;
            }

            ctx.clearRect(0, 0, width, height);

            phase += 0.015;

            // Get accent color from CSS variable
            const style = getComputedStyle(document.documentElement);
            const accentColor = style.getPropertyValue("--accent").trim() || "#D97745";

            ctx.beginPath();
            ctx.strokeStyle = accentColor;
            ctx.globalAlpha = 0.3;
            ctx.lineWidth = 1.5;

            const centerX = width * 0.85;

            for (let y = -50; y < height + 50; y += 8) {
                const scrollOffset = scrollY * 0.08;
                const wave = Math.sin(y * 0.008 + phase) * 18
                           + Math.cos(y * 0.015 - scrollOffset * 0.04) * 12;
                const x = centerX + wave;

                if (y === -50) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
            ctx.globalAlpha = 1;

            requestAnimationFrame(renderCanvas);
        }

        wakeUp();
    }
});
