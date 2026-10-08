# Ryan Marc L. Salon — Portfolio

Personal developer portfolio built with React, TypeScript, and GSAP. A cinematic single-page experience with a centered landing hero, scroll-driven animations, matrix-style particle background, and a dark / light theme.

## Live Demo

**[ryanmarcsalon-portfolio.netlify.app](https://ryanmarcsalon-portfolio.netlify.app/)**

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Utility-first styling
- **GSAP** — Scroll-triggered animations and reveals
- **Lenis** — Smooth scrolling

## Features

- Centered landing hero — portrait, name, role, location, CTAs, and theme toggle
- Matrix-style canvas particle background (falling glyphs, beams, and node network)
- Theme-aware portrait — dark mode: gray → color on hover; light mode: color → gray on hover
- Dark / light theme toggle (persisted in localStorage, no flash on load)
- Fixed navigation that stays hidden over the hero and appears on scroll
- Dashboard grid — Experience & Education timelines, About, and categorized Tech Stack cards
- Scroll-triggered reveal animations on every section
- Project cards with hover effects
- Preloader with animated progress bar
- Film grain and vignette overlays
- Custom cursor and scroll progress rail
- Responsive — phone, tablet, desktop

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output goes to `dist/`. Deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages).

## Project Structure

```
src/
  components/
    Hero.tsx               # Landing hero — portrait, name, CTAs, theme toggle
    ParticleBackground.tsx # Canvas matrix-style particle background
    Nav.tsx                # Fixed nav (hidden over hero), theme toggle, mobile menu
    Dashboard.tsx          # O2 Profile — experience, education, about, tech stack
    Projects.tsx           # O3 Solutions — project showcase cards
    Manifesto.tsx          # Manifesto lines
    Contact.tsx            # O4 Connect — contact section
    Footer.tsx             # Footer
    Preloader.tsx          # Loading screen
    ThemeIcon.tsx          # Sun / moon icon for theme toggles
    GrainOverlay.tsx       # Film grain effect
    Vignette.tsx           # Vignette overlay
    CustomCursor.tsx       # Custom cursor
    ProgressRail.tsx       # Scroll progress indicator
  hooks/
    useScrollReveal.ts     # Reusable GSAP scroll animation hook
    useReducedMotion.ts    # prefers-reduced-motion hook
  lib/
    scroll.ts              # Lenis instance helpers
  theme.tsx                # Dark/light theme provider (persists to localStorage)
  index.css                # Global styles and responsive breakpoints
  App.tsx                  # App shell
  main.tsx                 # Entry point
public/
  assets/                  # pfp.jpg, resume.pdf (replace the placeholder)
  favicon.jpg              # Site favicon
```

## Customizing

- **Profile dashboard** — edit the `experience`, `education`, `stack`, and `aboutParagraphs` arrays at the top of `src/components/Dashboard.tsx`.
- **Resume** — replace `public/assets/resume.pdf` with your real resume (same filename).
- **Portrait** — replace `public/assets/pfp.jpg` with a higher-resolution photo (same filename).

## License

MIT
