import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'
import { scrollToSection } from '../lib/scroll'

function LocationPin() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.hero-reveal')
    if (!items?.length || reducedMotion) return

    const anim = gsap.from(items, {
      opacity: 0,
      y: 22,
      duration: 0.72,
      stagger: 0.065,
      ease: 'expo.out',
      clearProps: 'transform,opacity',
    })

    return () => {
      anim.kill()
    }
  }, [reducedMotion])

  const handleViewProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection(document.getElementById('projects'))
  }

  return (
    <section ref={sectionRef} id="hero" className="hero">
      <div className="container">
        <div className="landing-grid">
          <figure className="landing-pfp hero-reveal">
            <img
              src="/assets/pfp.jpg"
              alt="Portrait of Ryan Marc L. Salon"
              width={224}
              height={224}
              fetchPriority="high"
              decoding="async"
            />
          </figure>

          <div className="landing-copy">
            <h1 className="landing-name hero-reveal">Ryan Marc L. Salon</h1>

            <p className="landing-role hero-reveal">
              Aspiring Full Stack Developer building practical web applications for local communities and businesses.
            </p>

            <div className="landing-meta hero-reveal">
              <span className="status-badge">
                <span className="status-dot" aria-hidden="true" />
                4th-Year BSIT · Open for OJT / Internship
              </span>
              <span className="landing-loc">
                <LocationPin />
                <span>Poblacion, Mahinog, Camiguin, Philippines</span>
              </span>
            </div>

            <div className="landing-actions hero-reveal">
              <a
                href="#projects"
                onClick={handleViewProjects}
                className="btn-solid"
              >
                View Projects
                <ArrowDownIcon />
              </a>

              <a href="mailto:ryanmarcsalon04@gmail.com" className="btn-ghost">
                Email Me
              </a>

              <a
                href="https://github.com/ryansalon"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                GitHub
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
