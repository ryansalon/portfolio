import { useEffect, useRef, useState } from 'react'
import { scrollToSection, subscribeActiveSection } from '../lib/scroll'
import { useTheme } from '../theme'
import ThemeIcon from './ThemeIcon'

export interface NavSection {
  id: string
  label: string
}

interface NavProps {
  sections: NavSection[]
}

export default function Nav({ sections }: NavProps) {
  const navRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    let raf = 0

    const updateChrome = () => {
      raf = 0
      const nav = navRef.current
      if (!nav) return
      nav.classList.toggle('stuck', window.scrollY > 24)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateChrome)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateChrome()

    const unsubscribe = subscribeActiveSection(setActiveIndex)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
    return () => {
      document.body.classList.remove('nav-open')
    }
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollToSection(document.getElementById(id))
  }

  return (
    <>
      <header>
        <nav ref={navRef} className="nav" aria-label="Primary">
          <div className="nav-inner">
            <a
              href="#hero"
              className="nav-brand"
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              <span className="nav-brand-mark" aria-hidden="true">
                &lt;R/&gt;
              </span>
              <span>Ryan Marc L. Salon</span>
            </a>

            <div className="nav-links">
              {sections.map((item, i) => (
                <a
                  key={item.id}
                  className={`nav-link${i === activeIndex ? ' on' : ''}`}
                  href={`#${item.id}`}
                  aria-current={i === activeIndex ? 'location' : undefined}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="nav-actions">
              <button
                type="button"
                className="nav-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                <ThemeIcon theme={theme} />
              </button>

              <button
                ref={burgerRef}
                type="button"
                className={`nav-burger${menuOpen ? ' active' : ''}`}
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
              >
                <i />
                <i />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`nav-backdrop${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="mobile-nav"
        className={`nav-panel${menuOpen ? ' open' : ''}`}
        aria-label="Mobile"
        aria-hidden={!menuOpen}
      >
        {sections.map((item, i) => (
          <a
            key={item.id}
            className={`nav-link${i === activeIndex ? ' on' : ''}`}
            href={`#${item.id}`}
            tabIndex={menuOpen ? 0 : -1}
            aria-current={i === activeIndex ? 'location' : undefined}
            onClick={(e) => handleNavClick(e, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </>
  )
}
