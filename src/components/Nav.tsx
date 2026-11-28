import { useEffect, useRef, useState } from 'react'
import { getFocusableElements, trapFocusOnTab } from '../lib/focusTrap'
import { pauseScroll, resumeScroll, subscribeActiveSection } from '../lib/scroll'
import { useTheme } from '../theme'
import ThemeIcon from './ThemeIcon'

export interface NavSection {
  id: string
  label: string
}

export type AppPage = 'home' | 'why-me' | 'achievements'

interface NavProps {
  sections: NavSection[]
  allSectionIds: string[]
  currentPage: AppPage
  onNavigateHomeSection: (id: string) => void
  onNavigateWhyMe: () => void
  onNavigateAchievements: () => void
}

export default function Nav({
  sections,
  allSectionIds,
  currentPage,
  onNavigateHomeSection,
  onNavigateWhyMe,
  onNavigateAchievements,
}: NavProps) {
  const burgerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLElement>(null)
  const wasOpenRef = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState(allSectionIds[0] ?? 'hero')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    return subscribeActiveSection((index) => {
      setActiveId(allSectionIds[index] ?? 'hero')
    })
  }, [allSectionIds])

  useEffect(() => {
    if (menuOpen) {
      wasOpenRef.current = true
      document.body.classList.add('nav-open')
      pauseScroll()
      const focusables = getFocusableElements(drawerRef.current)
      focusables[0]?.focus()

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMenuOpen(false)
          return
        }
        trapFocusOnTab(e, drawerRef.current)
      }

      document.addEventListener('keydown', onKeyDown)
      return () => {
        document.removeEventListener('keydown', onKeyDown)
        document.body.classList.remove('nav-open')
        resumeScroll()
      }
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false
      burgerRef.current?.focus()
    }
  }, [menuOpen])

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    wasOpenRef.current = false
    setMenuOpen(false)
    onNavigateHomeSection(id)
  }

  const handleWhyMeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    wasOpenRef.current = false
    setMenuOpen(false)
    onNavigateWhyMe()
  }

  const handleAchievementsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    wasOpenRef.current = false
    setMenuOpen(false)
    onNavigateAchievements()
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <a
            href="#hero"
            className="brand-link"
            onClick={(e) => handleSectionClick(e, 'hero')}
          >
            <span className="brand-mark" aria-hidden="true">
              &lt;R/&gt;
            </span>
            <span>Ryan Marc L. Salon</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {sections.map((item) => {
              const isActive = currentPage === 'home' && activeId === item.id
              return (
                <a
                  key={item.id}
                  className={`nav-item${isActive ? ' on' : ''}`}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => handleSectionClick(e, item.id)}
                >
                  {item.label}
                </a>
              )
            })}

            <a
              className={`nav-item${currentPage === 'why-me' ? ' on' : ''}`}
              href="#/why-me"
              aria-current={currentPage === 'why-me' ? 'page' : undefined}
              onClick={handleWhyMeClick}
            >
              Why Me
            </a>

            <a
              className={`nav-item${currentPage === 'achievements' ? ' on' : ''}`}
              href="#/achievements"
              aria-current={currentPage === 'achievements' ? 'page' : undefined}
              onClick={handleAchievementsClick}
            >
              Achievements
            </a>
          </nav>

          <div className="nav-controls">
            <button
              type="button"
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              <ThemeIcon theme={theme} />
            </button>

            <a
              href="#contact"
              className="nav-cta-btn"
              onClick={(e) => handleSectionClick(e, 'contact')}
            >
              Contact Me
            </a>

            <button
              ref={burgerRef}
              type="button"
              className={`burger-btn${menuOpen ? ' active' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-backdrop${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        ref={drawerRef}
        id="mobile-drawer"
        className={`mobile-drawer${menuOpen ? ' open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!menuOpen}
      >
        {sections.map((item) => {
          const isActive = currentPage === 'home' && activeId === item.id
          return (
            <a
              key={item.id}
              className={`nav-item${isActive ? ' on' : ''}`}
              href={`#${item.id}`}
              tabIndex={menuOpen ? 0 : -1}
              aria-current={isActive ? 'location' : undefined}
              onClick={(e) => handleSectionClick(e, item.id)}
            >
              {item.label}
            </a>
          )
        })}

        <a
          className={`nav-item${currentPage === 'why-me' ? ' on' : ''}`}
          href="#/why-me"
          tabIndex={menuOpen ? 0 : -1}
          aria-current={currentPage === 'why-me' ? 'page' : undefined}
          onClick={handleWhyMeClick}
        >
          Why Me
        </a>

        <a
          className={`nav-item${currentPage === 'achievements' ? ' on' : ''}`}
          href="#/achievements"
          tabIndex={menuOpen ? 0 : -1}
          aria-current={currentPage === 'achievements' ? 'page' : undefined}
          onClick={handleAchievementsClick}
        >
          Achievements
        </a>

        <a
          href="#contact"
          className="btn-primary"
          style={{ marginTop: '24px' }}
          tabIndex={menuOpen ? 0 : -1}
          onClick={(e) => handleSectionClick(e, 'contact')}
        >
          Contact Me
        </a>
      </nav>
    </>
  )
}
