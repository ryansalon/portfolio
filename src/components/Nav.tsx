import { useEffect, useRef, useState } from 'react'
import { subscribeActiveSection } from '../lib/scroll'
import { useTheme } from '../theme'
import ThemeIcon from './ThemeIcon'

export interface NavSection {
  id: string
  label: string
}

interface NavProps {
  sections: NavSection[]
  allSectionIds: string[]
  currentPage: 'home' | 'achievements'
  onNavigateHomeSection: (id: string) => void
  onNavigateAchievements: () => void
}

export default function Nav({
  sections,
  allSectionIds,
  currentPage,
  onNavigateHomeSection,
  onNavigateAchievements,
}: NavProps) {
  const burgerRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState(allSectionIds[0] ?? 'hero')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    return subscribeActiveSection((index) => {
      setActiveId(allSectionIds[index] ?? 'hero')
    })
  }, [allSectionIds])

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
    return () => document.body.classList.remove('nav-open')
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        burgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMenuOpen(false)
    onNavigateHomeSection(id)
  }

  const handleAchievementsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
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
