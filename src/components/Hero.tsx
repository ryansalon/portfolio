import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ParticleBackground from './ParticleBackground'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const heroTopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = heroTopRef.current?.querySelectorAll('.hero-reveal')
    if (!items?.length) return

    items.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, delay: 2.0 + i * 0.2, ease: 'power3.out' }
      )
    })

    const section = sectionRef.current
    if (!section) return
    const onScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const progress = Math.min(scrollY / (vh * 0.5), 1)
      const top = heroTopRef.current
      if (top) {
        top.style.opacity = `${1 - progress}`
        top.style.transform = `translate3d(0, ${-progress * 60}px, 0) scale(${1 - progress * 0.05})`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      <ParticleBackground />
      <div ref={heroTopRef} className="hero-top" style={{ position: 'relative', zIndex: 1 }}>
        <div className="eyebrow hero-reveal">
          <span className="dot" />
          RYAN MARC L SALON
        </div>
        <h1 className="display h-hero hero-reveal" style={{ fontSize: 'clamp(72px, 14vw, 200px)', lineHeight: 0.85, letterSpacing: '-.04em' }}>
          Build Without<br />Limits
        </h1>
        <p className="hero-sub hero-reveal" style={{ marginTop: '40px', fontSize: 'clamp(18px, 1.8vw, 26px)', lineHeight: 1.72, color: 'var(--bone-dim)', fontWeight: 300, maxWidth: '620px' }}>
          BSIT Student specializing in architectural web systems and high-precision digital tools.
        </p>
      </div>
    </section>
  )
}
