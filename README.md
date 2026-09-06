<div align="center">

# Hamid Rafique
### Cybersecurity Portfolio: "Signal & Noise"

**Blue Team / SOC Aspirant · Competitive CTF Player · Builder**

[![Live Site](https://img.shields.io/badge/live-hamidrafique.github.io-3D5AFE?style=for-the-badge)](https://hamidrafique2-boop.github.io/hamidrafique.github.io/)
[![Resume](https://img.shields.io/badge/resume-download-00D4B4?style=for-the-badge)](./Hamid_Rafique_Resume.pdf)
[![LinkedIn](https://img.shields.io/badge/linkedin-connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/hamid-rafique-299006381)

</div>

---

## About

I'm a 3rd semester BS Cybersecurity student at Air University's National Cyber Security Academy in Islamabad, building toward blue team and SOC analyst work while staying sharp offensively through competitive CTF play (as *Cindrix*). 

I designed and shipped **Fractured Signal**, a custom CTF platform used by ~94 students, co-authored a research paper on Windows persistence attacks, and I'm currently working through a 10-project self-directed SOC detection portfolio.

This repository contains the source code for my portfolio.

**Live:** [hamidrafique2-boop.github.io/hamidrafique.github.io](https://hamidrafique2-boop.github.io/hamidrafique.github.io/)

---

## The "Signal & Noise" Concept

This 2026 iteration of the portfolio deliberately moves away from the cliché "terminal hacker" aesthetic (neon-green-on-black, glitch text). Instead, it adopts a **Trust Architecture** approach suited for modern enterprise cybersecurity—focusing on clarity, progressive disclosure, and precision. 

The color palette leverages a Deep Obsidian background (`#050505`) with Slate elements, accented by sharp Cobalt/Azure Blue and Emerald/Teal. It's designed to read as professional and analytical, putting the focus on the data.

To make the page feel like a single continuous surface rather than a stack of cards, it utilizes a smooth scroll library (Lenis) synced with scroll-triggered narrative reveals (GSAP). An idle-guarded, high-performance canvas "Signal Line" acts as the visual spine of the page, without draining mobile batteries.

---

## What's on the site

| Section | Description |
|---|---|
| **Hero** | Identity, positioning, and verified statistics. |
| **Identity (About)** | Education, current focus, and the "offense-informs-defense" thesis. |
| **Capabilities** | Technical skills broken out by Defensive, Offensive, Tooling, and Languages. |
| **Flagship Build** | Dedicated interactive spotlight for the *Fractured Signal* CTF platform. |
| **Field Record** | A timeline of competitive CTF results, academic projects, and published research. |
| **Credentials** | Verified certifications, highlighting the consolidated Google Cybersecurity Professional Certificate. |
| **Connect** | Direct contact lines. |

---

## Tech Stack & Architecture

This site adheres to a strict zero-backend, zero-build-step requirement, deploying directly to GitHub Pages as static files.

| Layer | Technology |
|---|---|
| **Structure** | Semantic HTML5, accessible ARIA landmarks. |
| **Styling** | Vanilla CSS3 (Custom properties, Grid, Flexbox, fluid typography). |
| **Motion** | Vanilla JS, Lenis (Smooth Scroll), GSAP + ScrollTrigger (Animations). |
| **Performance** | GSAP ScrollTrigger / Idle-guarded Canvas API. |

### Architectural Decisions & Trade-offs
- **CDN Usage & Graceful Degradation:** To achieve Awwwards-caliber motion without a Node build step, Lenis and GSAP are loaded via pinned-version CDNs. The site implements **CSS-first visibility**: if JS fails, is disabled, or CDNs are blocked (e.g. strict corporate networks), all content is fully visible and defaults to native scrolling.
- **Accessibility (a11y):** Lenis is configured to not break keyboard navigation. The CSS includes `@media (prefers-reduced-motion)` which disables smooth scroll and complex reveals for users who request it.
- **Performance:** The visual "Signal Line" is rendered on an HTML5 `<canvas>`. To prevent GPU memory leaks and battery drain, the `requestAnimationFrame` loop is actively idle-guarded, pausing automatically if no scroll or mouse movement is detected for ~60 frames. On mobile widths (<=768px), the canvas is disabled entirely in favor of a static CSS fallback.

---

## File Structure

```text
hamidrafique.github.io/
├── index.html                  # Semantic structure & all content
├── style.css                   # Fluid typography, tokens, components
├── script.js                   # Lenis, GSAP timelines, idle-guarded canvas, custom cursor
├── README.md                   # This document
├── Hamid_Rafique_Resume.pdf    # Current resume
└── certificates/               # PDF artifacts for all credentials
```

---

## Updating Content (For Future Editors)

All content lives directly in `index.html`. 

- **Add a CTF or Project:** Duplicate a `<div class="timeline-item">` block in the `#experience` section.
- **Update Skills:** Modify the `<li>` items within the `.bento-card` lists in the `#capabilities` section.
- **Add a Certificate:** Drop the PDF into the `certificates/` folder, then add a new `<a class="cred-card">` block in the `#credentials` section.
- **Stats:** Update the `.stat-number` spans in the hero section. Note: keep them grounded in verified facts.

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
