# Ryan Marc L. Salon — Portfolio

Personal developer portfolio built with React, TypeScript, and GSAP. Designed as a dark, cinematic single-page experience with scroll-driven animations and a particle drift hero background.

## Live Demo

[portfolioryanmarcsalon.netlify.app](https://portfolioryanmarcsalon.netlify.app)

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Utility-first styling
- **GSAP** — Scroll-triggered animations, parallax, and reveals
- **Lenis** — Smooth scrolling
- **ThreeUI (ConstellationField)** — Canvas particle drift hero background

## Features

- Particle drift hero background (ASCII node network with mouse interaction)
- Scroll-triggered reveal animations on every section
- GSAP-powered marquee tech stack carousel
- Project cards with hover scale and gradient effects
- Preloader with animated progress bar
- Film grain and vignette overlays
- Custom cursor
- Responsive — phone, tablet, desktop
- Dark-mode only design

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
    Hero.tsx              # Hero section with particle background
    ParticleBackground.tsx # Canvas particle drift animation
    Nav.tsx               # Fixed navigation with mobile hamburger
    Profile.tsx           # About / profile section
    TechStack.tsx         # Tech stack section
    TechMarquee.tsx       # Infinite scrolling icon marquee
    Projects.tsx          # Project showcase cards
    Manifesto.tsx         # Manifesto lines
    Contact.tsx           # Contact section
    Footer.tsx            # Footer
    Preloader.tsx         # Loading screen
    GrainOverlay.tsx      # Film grain effect
    Vignette.tsx          # Vignette overlay
    CustomCursor.tsx      # Custom cursor
    ProgressRail.tsx      # Scroll progress indicator
  hooks/
    useScrollReveal.ts    # Reusable GSAP scroll animation hook
  index.css               # Global styles and responsive breakpoints
  App.tsx                 # App shell
  main.tsx                # Entry point
public/
  assets/                 # Static images (project screenshots, icons)
```

## License

MIT
