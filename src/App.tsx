import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './hooks/useReducedMotion'
import { setLenis } from './lib/scroll'
import { ThemeProvider } from './theme'
import Preloader from './components/Preloader'
import GrainOverlay from './components/GrainOverlay'
import Vignette from './components/Vignette'
import CustomCursor from './components/CustomCursor'
import ProgressRail from './components/ProgressRail'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Projects from './components/Projects'
import Manifesto from './components/Manifesto'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

const SECTION_IDS = ['hero', 'about', 'projects', 'manifesto', 'contact']

function App() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    if (reducedMotion) {
      setLenis(null)
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
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
      <Preloader />
      <GrainOverlay />
      <Vignette />
      <CustomCursor />
      <ProgressRail sectionIds={SECTION_IDS} />
      <Nav sectionIds={SECTION_IDS} />
      <div className="page">
        <Hero />
        <Dashboard />
        <Projects />
        <Manifesto />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
