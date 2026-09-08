<div align="center">

# Hamid Rafique
### Cybersecurity Portfolio: "Signal & Precision"

**Blue Team / SOC Aspirant · Competitive CTF Player · Builder**

[![Live Site](https://img.shields.io/badge/live-hamidrafique.github.io-D97745?style=for-the-badge)](https://hamidrafique2-boop.github.io/hamidrafique.github.io/)
[![Resume](https://img.shields.io/badge/resume-download-4A9B8E?style=for-the-badge)](./Hamid_Rafique_Resume.pdf)
[![LinkedIn](https://img.shields.io/badge/linkedin-connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/hamid-rafique-299006381)

</div>

---

## About

I'm a 3rd semester BS Cybersecurity student at Air University's National Cyber Security Academy in Islamabad, building toward blue team and SOC analyst work while staying sharp offensively through competitive CTF play (as *Cindrix*). 

I designed and shipped **Fractured Signal**, a custom CTF platform used by ~94 students, co-authored a research paper on Windows persistence attacks, and I'm currently working through a 10-project self-directed SOC detection portfolio.

This repository contains the source code for my portfolio.

**Live:** [hamidrafique2-boop.github.io/hamidrafique.github.io](https://hamidrafique2-boop.github.io/hamidrafique.github.io/)

---

## The "Signal & Precision" Concept

This iteration of the portfolio moves away from cliché "terminal hacker" aesthetics (neon-green-on-black, glitch text). Instead, it adopts a premium **Signal & Precision** design language suited for modern enterprise cybersecurity—focusing on clarity, intelligent systems, and trust architecture.

The color palette leverages a full light/dark theme system. Light mode uses a warm off-white (`#FAF8F5`) with deep charcoal text, while Dark mode uses deep obsidian (`#111111`) with warm white text. Both are accented by a signature Burnt Orange (`#D97745`) to highlight active signals, data points, and interactions.

To make the page feel like a single continuous intelligence dashboard, it utilizes a smooth scroll library (Lenis) synced with scroll-triggered narrative reveals (GSAP). An idle-guarded, high-performance canvas "Signal Line" acts as the visual spine of the page, adjusting its rendering based on the active theme and device capabilities.

---

## What's on the site

| Section | Description |
|---|---|
| **Hero** | Identity, positioning, dynamic signal rotation, and verified statistics. |
| **Identity (About)** | Education, current focus, and the "offense-informs-defense" thesis. |
| **Capabilities** | Technical skills broken out by Defensive, Offensive, Tooling, and Languages. |
| **Proof of Work** | Connecting core security skills directly to verified repository evidence. |
| **Flagship Build** | Dedicated interactive case-study map for the *Fractured Signal* CTF platform. |
| **Field Record** | A timeline of competitive CTF results, academic projects, and published research. |
| **Credentials** | Verified certifications, including the complete Google Cybersecurity sub-certificates. |
| **Connect** | Direct contact lines with clear external link indicators. |

---

## Tech Stack & Architecture

This site adheres to a strict zero-backend, zero-build-step requirement, deploying directly to GitHub Pages as static files.

| Layer | Technology |
|---|---|
| **Structure** | Semantic HTML5, accessible ARIA landmarks, Open Graph / JSON-LD SEO. |
| **Styling** | Vanilla CSS3 (Custom properties for Light/Dark mode, Grid, Flexbox, fluid typography). |
| **Motion** | Vanilla JS, Lenis (Smooth Scroll), GSAP + ScrollTrigger (Animations). |
| **Performance** | GSAP ScrollTrigger / Idle-guarded Canvas API / IntersectionObserver UI updates. |

### Architectural Decisions & Trade-offs
- **Light/Dark Mode System:** Implemented entirely with CSS Custom Properties and a lightweight inline script in the `<head>` to prevent flash of incorrect theme (FOUC) while respecting the OS `prefers-color-scheme`.
- **CDN Usage & Graceful Degradation:** To achieve Awwwards-caliber motion without a Node build step, Lenis and GSAP are loaded via pinned-version CDNs. The site implements **CSS-first visibility**: if JS fails, is disabled, or CDNs are blocked (e.g. strict corporate networks), all content is fully visible and defaults to native scrolling.
- **Accessibility (a11y):** The mobile menu implements full focus-trapping, body scroll lock, and Escape key support. The CSS includes `@media (prefers-reduced-motion)` which disables smooth scroll, complex reveals, and background canvas rendering for users who request it.
- **Performance:** The visual "Signal Line" is rendered on an HTML5 `<canvas>`. To prevent GPU memory leaks and battery drain, the `requestAnimationFrame` loop is actively idle-guarded, pausing automatically if no scroll or mouse movement is detected for ~60 frames. On mobile widths (<=768px), the canvas is disabled entirely in favor of a static CSS fallback.

---

## File Structure

```text
hamidrafique.github.io/
├── index.html                  # Semantic structure, SEO meta, content
├── style.css                   # Theme system, fluid typography, components
├── script.js                   # Theme toggle, Lenis, GSAP, canvas, system status
├── favicon.svg                 # Scalable vector favicon
├── README.md                   # This document
├── Hamid_Rafique_Resume.pdf    # Current resume
└── certificates/               # PDF artifacts for all credentials (19 files)
```

---

## Updating Content (For Future Editors)

All content lives directly in `index.html`. 

- **Add a CTF or Project:** Duplicate a `<div class="timeline-item">` block in the `#experience` section.
- **Update Skills:** Modify the `<li>` items within the `.bento-card` lists in the `#capabilities` section.
- **Update Proof of Work:** Add a new `<div class="proof-item">` to the `.proof-grid` connecting a skill to evidence.
- **Add a Certificate:** Drop the PDF into the `certificates/` folder, then add a link in the `#credentials` section.

To deploy, simply edit the HTML/CSS/JS files and push to the `main` branch. GitHub Pages will redeploy the static site automatically.

---

## Running Locally

Since there's no build step, you can serve the directory using any basic HTTP server:

```bash
git clone https://github.com/hamidrafique2-boop/hamidrafique.github.io.git
cd hamidrafique.github.io
python3 -m http.server 8000
# open http://localhost:8000
```
