import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'
import { scrollToSection } from '../lib/scroll'

function LocationPin() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.hero-rv')
    if (!items?.length || reducedMotion) return

    const anim = gsap.from(items, {
      opacity: 0,
      y: 22,
      duration: 0.72,
      stagger: 0.06,
      ease: 'expo.out',
      clearProps: 'transform,opacity',
    })

    return () => {
      anim.kill()
    }
  }, [reducedMotion])

  const goToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection(document.getElementById('work'))
  }

  return (
    <section ref={sectionRef} id="hero" className="hero">
      <div className="container">
        <div className="hero-layout">
          <div>
            <div className="hero-status hero-rv">
              <span className="status-dot" aria-hidden="true" />
              <span>Open for OJT / Internship &middot; BSIT 4th Year</span>
            </div>

            <h1 className="hero-h1 hero-rv">Ryan Marc L. Salon</h1>
            <p className="hero-role hero-rv">Full-Stack Web Developer</p>

            <p className="hero-lead hero-rv">
              4th-year BS Information Technology student at Camiguin Polytechnic State College building civic, healthcare, LGU, and local business web applications — backed by a defended IoT + web capstone.
            </p>

            <div className="hero-meta-row hero-rv">
              <span className="hero-loc">
                <LocationPin />
                <span>Poblacion, Mahinog, Camiguin, Philippines</span>
              </span>
            </div>

            <div className="hero-actions hero-rv">
              <a href="#work" className="btn-primary" onClick={goToWork}>
                View Projects
              </a>
              <a href="mailto:ryanmarcsalon04@gmail.com" className="btn-secondary">
                Email Me
              </a>
              <a
                href="https://github.com/ryansalon"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text"
              >
                GitHub
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>

          <div className="hero-portrait-wrap hero-rv">
            <figure className="hero-portrait">
              <img
                src="/assets/pfp.jpg"
                alt="Portrait of Ryan Marc L. Salon"
                width={246}
                height={270}
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          </div>
        </div>

        <div className="summary-bar">
          <div className="summary-item hero-rv">
            <b>6 Systems</b>
            <span>Shipped web &amp; civic projects</span>
          </div>
          <div className="summary-item hero-rv">
            <b>1st / 9 Teams</b>
            <span>Annual Reverse Pitching Champion</span>
          </div>
          <div className="summary-item hero-rv">
            <b>Top 20</b>
            <span>PSC XI Regional Finalist (R10)</span>
          </div>
          <div className="summary-item hero-rv">
            <b>Defended</b>
            <span>IoT &amp; Web Health Kiosk Capstone</span>
          </div>
        </div>
      </div>
    </section>
  )
}
