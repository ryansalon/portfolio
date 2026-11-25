import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './hooks/useReducedMotion'
import { scrollToSection, setLenis, startActiveSectionTracking } from './lib/scroll'
import { ThemeProvider } from './theme'
import type { ProjectItem } from './data/projects'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import { AboutSection, AchievementsTeaser } from './components/Dashboard'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AchievementsPage from './components/AchievementsPage'

gsap.registerPlugin(ScrollTrigger)

const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const ALL_SECTION_IDS = ['hero', 'about', 'work', 'contact']

type Page = 'home' | 'achievements'

function readPageFromHash(): Page {
  return window.location.hash === '#/achievements' ? 'achievements' : 'home'
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
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

function App() {
  const reducedMotion = usePrefersReducedMotion()
  const [page, setPage] = useState<Page>(readPageFromHash)
  const [inspected, setInspected] = useState<{ project: ProjectItem; mediaIndex: number } | null>(
    null
  )
  const modalCloseRef = useRef<HTMLButtonElement>(null)

  const openProjectModal = useCallback((project: ProjectItem, startIndex: number = 0) => {
    setInspected({ project, mediaIndex: startIndex })
  }, [])

  useEffect(() => {
    const onHashChange = () => setPage(readPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.title =
      page === 'achievements'
        ? 'Competitions & Achievements | Ryan Marc L. Salon'
        : 'Ryan Marc L. Salon | Full-Stack Web Developer'

    if (page === 'home') {
      startActiveSectionTracking(ALL_SECTION_IDS)
      ScrollTrigger.refresh()
    } else {
      window.scrollTo(0, 0)
    }
  }, [page])

  useEffect(() => {
    document.body.classList.toggle('modal-open', Boolean(inspected))
    if (!inspected) return

    modalCloseRef.current?.focus()
    const total = inspected.project.gallery?.length ?? 1

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInspected(null)
      } else if (total > 1 && e.key === 'ArrowLeft') {
        setInspected((prev) =>
          prev ? { ...prev, mediaIndex: (prev.mediaIndex - 1 + total) % total } : null
        )
      } else if (total > 1 && e.key === 'ArrowRight') {
        setInspected((prev) =>
          prev ? { ...prev, mediaIndex: (prev.mediaIndex + 1) % total } : null
        )
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [inspected])

  useEffect(() => {
    if (reducedMotion) {
      setLenis(null)
      return
    }

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      infinite: false,
    })
    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const onVisibility = () => {
      if (document.visibilityState === 'visible') gsap.ticker.add(raf)
      else gsap.ticker.remove(raf)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      gsap.ticker.remove(raf)
      setLenis(null)
      lenis.destroy()
    }
  }, [reducedMotion])

  const navigateAchievements = useCallback(() => {
    if (window.location.hash !== '#/achievements') {
      window.location.hash = '#/achievements'
    }
    setPage('achievements')
    window.scrollTo(0, 0)
  }, [])

  const navigateHomeSection = useCallback(
    (id: string) => {
      if (page !== 'home') {
        window.history.pushState(null, '', id === 'hero' ? '#' : `#${id}`)
        setPage('home')
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (id === 'hero') window.scrollTo(0, 0)
            else scrollToSection(document.getElementById(id))
          })
        })
      } else {
        scrollToSection(document.getElementById(id))
      }
    },
    [page]
  )

  const modalMediaList = inspected
    ? inspected.project.gallery ?? [
        {
          src: inspected.project.image,
          alt: inspected.project.alt,
          caption: inspected.project.title,
        },
      ]
    : []

  const activeMedia = inspected ? modalMediaList[inspected.mediaIndex] ?? modalMediaList[0] : null

  return (
    <ThemeProvider>
      <a href={page === 'home' ? '#about' : '#main-content'} className="skip-link">
        Skip to content
      </a>

      <Nav
        sections={NAV_SECTIONS}
        allSectionIds={ALL_SECTION_IDS}
        currentPage={page}
        onNavigateHomeSection={navigateHomeSection}
        onNavigateAchievements={navigateAchievements}
      />

      <main id="main-content">
        {page === 'achievements' ? (
          <AchievementsPage onBackHome={() => navigateHomeSection('hero')} />
        ) : (
          <>
            <Hero />
            <AboutSection />
            <Projects onInspectProject={openProjectModal} />
            <AchievementsTeaser onOpenAchievements={navigateAchievements} />
            <Contact />
          </>
        )}
      </main>

      <Footer />

      {inspected && activeMedia && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setInspected(null)
          }}
        >
          <div className="modal-dialog">
            <div className="modal-head">
              <div>
                <h3 id="project-modal-title" className="display h-md">
                  {inspected.project.title}
                </h3>
                <span className="mono-meta">
                  {inspected.project.categoryLabel}
                  {modalMediaList.length > 1
                    ? ` · ${inspected.mediaIndex + 1} / ${modalMediaList.length}`
                    : ''}
                </span>
              </div>
              <button
                ref={modalCloseRef}
                type="button"
                className="modal-close"
                onClick={() => setInspected(null)}
                aria-label="Close project preview"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-media modal-media-stage">
              <img src={activeMedia.src} alt={activeMedia.alt} />
            </div>

            {modalMediaList.length > 1 && (
              <div className="modal-gallery-bar">
                <p className="modal-caption">{activeMedia.caption}</p>
                <div className="modal-nav-pair">
                  <button
                    type="button"
                    className="work-action-btn"
                    onClick={() =>
                      setInspected((prev) =>
                        prev
                          ? {
                              ...prev,
                              mediaIndex:
                                (prev.mediaIndex - 1 + modalMediaList.length) %
                                modalMediaList.length,
                            }
                          : null
                      )
                    }
                  >
                    <ChevronLeftIcon />
                    Prev
                  </button>
                  <button
                    type="button"
                    className="work-action-btn"
                    onClick={() =>
                      setInspected((prev) =>
                        prev
                          ? { ...prev, mediaIndex: (prev.mediaIndex + 1) % modalMediaList.length }
                          : null
                      )
                    }
                  >
                    Next
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            )}

            {modalMediaList.length > 1 && (
              <div className="modal-thumb-strip" role="tablist" aria-label="Select project view">
                {modalMediaList.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    role="tab"
                    aria-selected={i === inspected.mediaIndex}
                    className={`modal-thumb${i === inspected.mediaIndex ? ' active' : ''}`}
                    onClick={() =>
                      setInspected((prev) => (prev ? { ...prev, mediaIndex: i } : null))
                    }
                  >
                    <img src={item.src} alt={item.alt} />
                  </button>
                ))}
              </div>
            )}

            <p className="work-desc" style={{ marginBottom: '16px' }}>
              {inspected.project.description}
            </p>

            <div className="tag-row">
              {inspected.project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            {(inspected.project.liveUrl || inspected.project.repoUrl) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                {inspected.project.liveUrl && (
                  <a
                    href={inspected.project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Visit Live Site
                    <ArrowUpRightIcon />
                  </a>
                )}
                {inspected.project.repoUrl && (
                  <a
                    href={inspected.project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    View on GitHub
                    <ArrowUpRightIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </ThemeProvider>
  )
}

export default App
