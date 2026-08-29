import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import GrainOverlay from './components/GrainOverlay'
import Vignette from './components/Vignette'
import CustomCursor from './components/CustomCursor'
import ProgressRail from './components/ProgressRail'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Profile from './components/Profile'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Manifesto from './components/Manifesto'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

const SECTION_IDS = ['hero', 'about', 'stack', 'projects', 'manifesto', 'contact']

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

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
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Preloader />
      <GrainOverlay />
      <Vignette />
      <CustomCursor />
      <ProgressRail sectionIds={SECTION_IDS} />
      <Nav sectionIds={SECTION_IDS} />
      <div className="page">
        <Hero />
        <Profile />
        <TechStack />
        <Projects />
        <Manifesto />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
