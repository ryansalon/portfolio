import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './hooks/useReducedMotion'
import { trapFocusOnTab } from './lib/focusTrap'
import {
  pauseScroll,
  resumeScroll,
  scrollToSection,
  setLenis,
  startActiveSectionTracking,
} from './lib/scroll'
import { ThemeProvider } from './theme'
import type { ProjectItem } from './data/projects'
import Nav, { type AppPage } from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import { AboutSection, AchievementsTeaser } from './components/Dashboard'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AchievementsPage from './components/AchievementsPage'
import WhyMePage from './components/WhyMePage'

gsap.registerPlugin(ScrollTrigger)

const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
]

const ALL_SECTION_IDS = ['hero', 'about', 'work', 'achievements', 'contact']

function readPageFromHash(): AppPage {
  const hash = window.location.hash
  if (hash === '#/achievements' || hash.startsWith('#/achievements/')) return 'achievements'
  if (hash === '#/why-me') return 'why-me'
  return 'home'
}

function readAchievementTargetFromHash(): string | null {
  const hash = window.location.hash
  if (hash.startsWith('#/achievements/')) {
    return hash.slice('#/achievements/'.length) || null
  }
  return null
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
  const [page, setPage] = useState<AppPage>(readPageFromHash)
  const [achievementTarget, setAchievementTarget] = useState<string | null>(
    readAchievementTargetFromHash
  )
  const [inspected, setInspected] = useState<{ project: ProjectItem; mediaIndex: number } | null>(
    null
  )
  const modalCloseRef = useRef<HTMLButtonElement>(null)
  const modalDialogRef = useRef<HTMLDivElement>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)
  const isModalOpen = Boolean(inspected)

  const openProjectModal = useCallback(
    (project: ProjectItem, startIndex: number = 0, trigger?: HTMLElement | null) => {
      lastTriggerRef.current = trigger ?? (document.activeElement as HTMLElement | null)
      setInspected({ project, mediaIndex: startIndex })
    },
    []
  )

  const closeProjectModal = useCallback(() => {
    setInspected(null)
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const nextPage = readPageFromHash()
      if (
        nextPage === 'home' &&
        window.location.hash.startsWith('#/')
      ) {
        window.history.replaceState(null, '', '#')
      }
      setPage(nextPage)
      setAchievementTarget(readAchievementTargetFromHash())
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.title =
      page === 'achievements'
        ? 'Competitions & Achievements | Ryan Marc L. Salon'
        : page === 'why-me'
          ? 'Why Work With Me | Ryan Marc L. Salon'
          : 'Ryan Marc L. Salon | Web Developer'

    if (page === 'home') {
      startActiveSectionTracking(ALL_SECTION_IDS)
      ScrollTrigger.refresh()
    } else if (!achievementTarget) {
      window.scrollTo(0, 0)
    }
  }, [page, achievementTarget])

  useEffect(() => {
    if (!isModalOpen) {
      if (lastTriggerRef.current) {
        lastTriggerRef.current.focus()
        lastTriggerRef.current = null
      }
      return
    }

    document.body.classList.add('modal-open')
    pauseScroll()
    modalCloseRef.current?.focus()

    return () => {
      document.body.classList.remove('modal-open')
      resumeScroll()
    }
  }, [isModalOpen])

  useEffect(() => {
    if (!isModalOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProjectModal()
      } else if (e.key === 'ArrowLeft') {
        setInspected((prev) => {
          if (!prev) return null
          const total = prev.project.gallery?.length ?? 1
          if (total <= 1) return prev
          return { ...prev, mediaIndex: (prev.mediaIndex - 1 + total) % total }
        })
      } else if (e.key === 'ArrowRight') {
        setInspected((prev) => {
          if (!prev) return null
          const total = prev.project.gallery?.length ?? 1
          if (total <= 1) return prev
          return { ...prev, mediaIndex: (prev.mediaIndex + 1) % total }
        })
      } else {
        trapFocusOnTab(e, modalDialogRef.current)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isModalOpen, closeProjectModal])

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

  const navigateAchievements = useCallback((targetId?: string) => {
    const nextHash = targetId ? `#/achievements/${targetId}` : '#/achievements'
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash
    }
    setAchievementTarget(targetId ?? null)
    setPage('achievements')
    if (!targetId) window.scrollTo(0, 0)
  }, [])

  const navigateWhyMe = useCallback(() => {
    if (window.location.hash !== '#/why-me') {
      window.location.hash = '#/why-me'
    }
    setAchievementTarget(null)
    setPage('why-me')
    window.scrollTo(0, 0)
  }, [])

  const navigateHomeSection = useCallback(
    (id: string) => {
      setAchievementTarget(null)
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
        if (id === 'hero') window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
        else scrollToSection(document.getElementById(id))
      }
    },
    [page, reducedMotion]
  )

  const clearAchievementTarget = useCallback(() => {
    setAchievementTarget(null)
  }, [])

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
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Nav
        sections={NAV_SECTIONS}
        allSectionIds={ALL_SECTION_IDS}
        currentPage={page}
        onNavigateHomeSection={navigateHomeSection}
        onNavigateWhyMe={navigateWhyMe}
        onNavigateAchievements={() => navigateAchievements()}
      />

      <main id="main-content">
        {page === 'achievements' ? (
          <AchievementsPage
            onBackHome={() => navigateHomeSection('hero')}
            targetId={achievementTarget}
            onTargetConsumed={clearAchievementTarget}
          />
        ) : page === 'why-me' ? (
          <WhyMePage
            onBackHome={() => navigateHomeSection('hero')}
            onViewProjects={() => navigateHomeSection('work')}
            onViewAchievements={() => navigateAchievements()}
          />
        ) : (
          <>
            <Hero />
            <AboutSection onOpenWhyMe={navigateWhyMe} />
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
            if (e.target === e.currentTarget) closeProjectModal()
          }}
        >
          <div ref={modalDialogRef} className="modal-dialog">
            <div className="modal-head">
              <div>
                <h3 id="project-modal-title" className="display h-md">
                  {inspected.project.title}
                </h3>
                <span className="mono-meta">
                  {inspected.project.categoryLabel} &middot; {inspected.project.role}
                  {modalMediaList.length > 1
                    ? ` · ${inspected.mediaIndex + 1} / ${modalMediaList.length}`
                    : ''}
                </span>
              </div>
              <button
                ref={modalCloseRef}
                type="button"
                className="modal-close"
                onClick={closeProjectModal}
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
                    Previous
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

            <p className="work-desc" style={{ marginBottom: '14px' }}>
              {inspected.project.description}
            </p>

            {inspected.project.highlights.length > 0 && (
              <ul className="modal-highlights">
                {inspected.project.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}

            <div className="tag-row">
              {inspected.project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            {inspected.project.liveUrl || inspected.project.repoUrl ? (
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
            ) : (
              <p className="modal-deployment-note">{inspected.project.deploymentNote}</p>
            )}
          </div>
        </div>
      )}
    </ThemeProvider>
  )
}

export default App
