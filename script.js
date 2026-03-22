/* ============================================================
   HAMID RAFIQUE — CYBERSECURITY PORTFOLIO
   JavaScript (script.js)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== AUTO-UPDATE COPYRIGHT YEAR (Fix 7) =====
    // Dynamically sets the footer copyright year so it never goes stale
    const copyrightEl = document.getElementById('copyright-year');
    if (copyrightEl) {
        copyrightEl.textContent = `© ${new Date().getFullYear()} Hamid Rafique`;
    }


    // ===== NEURAL NETWORK CANVAS BACKGROUND =====
    // Draws animated dots connected by faint lines as a living background
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PARTICLE_COUNT = isMobile ? 30 : 80;
    const CONNECTION_DISTANCE = isMobile ? 100 : 150;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DISTANCE) {
                    const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 245, 255, 0.6)';
            ctx.fill();
        }
    }

    function updateParticles() {
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }
    }

    // Desktop animation: full 60fps
    function animateCanvasDesktop() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animateCanvasDesktop);
    }

    // Mobile animation: capped at ~30fps to save battery (Fix 4)
    function animateCanvasMobile() {
        updateParticles();
        drawParticles();
        animationId = setTimeout(() => {
            requestAnimationFrame(animateCanvasMobile);
        }, 33); // ~30fps
    }

    resizeCanvas();
    createParticles();

    // Stop animation entirely if user prefers reduced motion (Fix 4)
    if (prefersReducedMotion) {
        canvas.style.display = 'none';
    } else if (!isMobile) {
        animateCanvasDesktop();
    } else {
        animateCanvasMobile();
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
        if (prefersReducedMotion) return;
        if (isMobile) drawParticles();
    });


    // ===== SCROLL PROGRESS BAR =====
    // Updates the thin cyan line at the top as the user scrolls
    const scrollProgress = document.getElementById('scroll-progress');

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }


    // ===== NAVBAR SCROLL EFFECT =====
    // Adds glassmorphism blur when user scrolls past 50px
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }


    // ===== BACK TO TOP BUTTON =====
    // Shows/hides the floating back-to-top button
    const backToTop = document.getElementById('back-to-top');

    function handleBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // Combined scroll handler
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        handleNavbarScroll();
        handleBackToTop();
    });


    // ===== MOBILE HAMBURGER MENU (Fix 2 — fully functional) =====
    // Toggles the full-screen mobile navigation overlay with escape and outside-click support
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Helper to open/close the mobile menu
    function openMobileMenu() {
        hamburger.classList.add('active');
        mobileOverlay.classList.add('active');
        mobileOverlay.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Close navigation menu');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
        document.body.style.overflow = '';
    }

    // Toggle on hamburger click
    hamburger.addEventListener('click', () => {
        if (mobileOverlay.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close when a nav link inside the overlay is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close when clicking outside the nav links (on the overlay background)
    mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
            closeMobileMenu();
        }
    });


    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    // Updates the active nav link based on which section is in view
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === sectionId);
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -60% 0px'
    });

    sections.forEach(section => navObserver.observe(section));


    // ===== HERO BOOT SEQUENCE =====
    // Plays a terminal boot animation, then reveals the main hero content
    const bootLines = document.querySelectorAll('.boot-line');
    const heroContent = document.getElementById('hero-content');

    bootLines.forEach((line, index) => {
        const delay = parseInt(line.dataset.delay) || index * 500;
        setTimeout(() => {
            line.classList.add('visible');
        }, delay + 300);
    });

    // Show hero content after boot finishes
    setTimeout(() => {
        heroContent.classList.add('visible');
        triggerGlitch(document.querySelector('.hero-name'));
        startTypewriter();
    }, 2400);


    // ===== TYPEWRITER EFFECT =====
    // Cycles through role strings with a typing and erasing animation
    const typewriterEl = document.getElementById('typewriter-text');
    const roles = [
        'BS Cybersecurity Student',
        'Ethical Hacker in Training',
        'CTF Player | HTB & TryHackMe',
        'Aspiring SOC Analyst'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isErasing = false;

    function startTypewriter() {
        const currentRole = roles[roleIndex];
        if (!isErasing) {
            typewriterEl.textContent = currentRole.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex <= currentRole.length) {
                setTimeout(startTypewriter, 60);
            } else {
                isErasing = true;
                setTimeout(startTypewriter, 2000);
            }
        } else {
            typewriterEl.textContent = currentRole.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex > 0) {
                setTimeout(startTypewriter, 30);
            } else {
                isErasing = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(startTypewriter, 500);
            }
        }
    }


    // ===== GLITCH EFFECT =====
    // Triggers chromatic aberration glitch on an element
    function triggerGlitch(el) {
        if (!el) return;
        el.classList.add('glitching');
        setTimeout(() => el.classList.remove('glitching'), 500);
    }


    // ===== INTERSECTION OBSERVER — FADE IN + GLITCH HEADINGS =====
    // Fades in sections and triggers glitch on headings when they enter viewport

    // Add fade-in class to elements we want to animate
    const fadeTargets = document.querySelectorAll(
        '.skill-card, .project-card, .cert-card, .contact-card, .about-grid, .timeline, .contact-socials'
    );
    fadeTargets.forEach(el => el.classList.add('fade-in'));

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger cards within grids
                const parent = entry.target.closest('.skills-grid, .projects-grid, .cert-grid, .contact-grid');
                if (parent) {
                    const cards = Array.from(parent.querySelectorAll('.fade-in'));
                    const index = cards.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                } else {
                    entry.target.classList.add('visible');
                }
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeTargets.forEach(el => fadeObserver.observe(el));

    // Glitch headings on enter
    const glitchHeadings = document.querySelectorAll('.glitch-heading');
    const glitchObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerGlitch(entry.target);
                glitchObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    glitchHeadings.forEach(h => glitchObserver.observe(h));


    // ===== SYSTEM INFO PANEL — SEQUENTIAL TYPING =====
    // Types out each line of the system info when the panel comes into view
    const systemPanel = document.getElementById('system-info-panel');
    const infoLines = systemPanel ? systemPanel.querySelectorAll('.info-line') : [];

    const panelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                infoLines.forEach((line, i) => {
                    const delay = parseInt(line.dataset.delay) || i * 100;
                    setTimeout(() => line.classList.add('visible'), delay + 200);
                });
                panelObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (systemPanel) panelObserver.observe(systemPanel);


    // ===== MAGNETIC 3D TILT ON CARDS =====
    // Cards tilt toward the cursor position on mousemove
    const magneticCards = document.querySelectorAll('.magnetic-card');

    magneticCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });


    // ===== PROJECT CARD EXPAND/COLLAPSE =====
    // Toggles the card--expanded class to show/hide project details
    const expandBtns = document.querySelectorAll('.btn-expand');

    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            const isExpanded = card.classList.contains('card--expanded');
            card.classList.toggle('card--expanded');
            btn.querySelector('.expand-text').textContent = isExpanded ? 'View Details' : 'Hide Details';
        });
    });


    // ===== CERTIFICATION FILTER =====
    // Filters certification cards by issuer category using data attributes
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            certCards.forEach(card => {
                if (filter === 'all' || card.dataset.filter === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    // ===== COPY TO CLIPBOARD =====
    // Copies the data-copy value to clipboard and briefly shows 'Copied!' tooltip
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.copy;
            navigator.clipboard.writeText(text).then(() => {
                btn.classList.add('copied');
                setTimeout(() => btn.classList.remove('copied'), 1500);
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                btn.classList.add('copied');
                setTimeout(() => btn.classList.remove('copied'), 1500);
            });
        });
    });

});
