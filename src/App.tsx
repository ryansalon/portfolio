import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './hooks/useReducedMotion'
import { setLenis, startActiveSectionTracking } from './lib/scroll'
import { ThemeProvider } from './theme'
import GrainOverlay from './components/GrainOverlay'
import ProgressRail from './components/ProgressRail'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Profile' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const SECTION_IDS = SECTIONS.map((s) => s.id)

function App() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    startActiveSectionTracking(SECTION_IDS)

    if (reducedMotion) {
      setLenis(null)
      return
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      infinite: false,
    })
    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        gsap.ticker.add(raf)
      } else {
        gsap.ticker.remove(raf)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      gsap.ticker.remove(raf)
      setLenis(null)
      lenis.destroy()
    }
  }, [reducedMotion])

  return (
    <ThemeProvider>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <GrainOverlay />
      <ProgressRail sections={SECTIONS} />
      <Nav sections={SECTIONS} />
      <main className="page">
        <Hero />
        <Dashboard />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default App
