import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'
import { useTheme } from '../theme'
import ParticleBackground from './ParticleBackground'
import ThemeIcon from './ThemeIcon'

function LocationPin() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.hero-reveal')
    if (!items?.length) return

    if (reducedMotion) {
      gsap.set(items, { opacity: 1, y: 0, filter: 'none' })
      return
    }

    items.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, delay: 1.9 + i * 0.11, ease: 'power3.out' }
      )
    })
  }, [reducedMotion])

  return (
    <section ref={sectionRef} id="hero" className="hero landing">
      <ParticleBackground />

      <header className="landing-head hero-reveal">
        <span className="rule-grad" />
        <span className="lbl">Ryan Marc L. Salon || Portfolio 2026</span>
        <span className="rule-grad right" />
      </header>

      <div className="landing-grid">
        <figure className="landing-pfp hero-reveal" data-cursor>
          <img src="/assets/pfp.jpg" alt="Ryan Marc L. Salon" fetchPriority="high" decoding="async" />
        </figure>

        <div className="landing-copy">
          <h1 className="landing-name hero-reveal">Ryan Marc L. Salon</h1>

          <p className="landing-role hero-reveal">
            Aspiring Full Stack Developer
          </p>

          <p className="landing-loc hero-reveal">
            <LocationPin />
            <span>Poblacion, Mahinog, Camiguin, Philippines</span>
          </p>

          <div className="landing-actions hero-reveal">
            <a href="mailto:ryanmarcsalon04@gmail.com" className="btn-solid" data-cursor>
              Email Me
            </a>
          </div>

          <button
            className={`theme-pill hero-reveal${theme === 'dark' ? ' is-dark' : ''}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            data-cursor
          >
            <span className="knob">
              <ThemeIcon theme={theme} />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
