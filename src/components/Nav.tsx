import { useEffect, useRef, useState } from 'react'
import { scrollToSection, subscribeActiveSection } from '../lib/scroll'
import { useTheme } from '../theme'
import ThemeIcon from './ThemeIcon'

interface NavProps {
  sectionIds: string[]
}

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Profile' },
  { id: 'projects', label: 'Works' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ sectionIds }: NavProps) {
  const navRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const lastScroll = useRef(0)
  const menuOpenRef = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    menuOpenRef.current = menuOpen
  }, [menuOpen])

  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-link'))
    let raf = 0

    const updateChrome = () => {
      raf = 0
      const y = window.scrollY
      const nav = navRef.current
      if (!nav) return

      nav.classList.toggle('stuck', y > 40)
      nav.classList.toggle('over-hero', !menuOpenRef.current && y < window.innerHeight * 0.6)
      if (!menuOpenRef.current) {
        nav.classList.toggle('hide', y > lastScroll.current + 4 && y > window.innerHeight * 0.8)
      }
      lastScroll.current = y
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateChrome)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateChrome()

    const unsubscribe = subscribeActiveSection((index) => {
      const activeId = sectionIds[index]
      links.forEach((link) => {
        link.classList.toggle('on', link.getAttribute('href') === `#${activeId}`)
      })
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
      unsubscribe()
    }
  }, [sectionIds])

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const next = !prev
      document.body.classList.toggle('nav-open', next)
      return next
    })
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMenuOpen(false)
    document.body.classList.remove('nav-open')
    scrollToSection(document.getElementById(id))
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        document.body.classList.remove('nav-open')
        burgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <nav ref={navRef} className="nav">
        <span className="nav-brand">
          <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="44" height="44" rx="8" fill="currentColor" fillOpacity="0.08" />
            <path className="mark" d="M12 16h20v3H12zM12 22h16v3H12zM12 28h10v3H12z" />
          </svg>
          Ryan Salon
        </span>
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              className="nav-link"
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              data-cursor
            >
              <span>{item.label}</span>
              <span className="alt">{item.label}</span>
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="nav-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            data-cursor
          >
            <ThemeIcon theme={theme} />
          </button>
          <button
            ref={burgerRef}
            className={`nav-burger${menuOpen ? ' active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            data-cursor
          >
            <i /><i />
          </button>
        </div>
      </nav>

      <div className={`nav-panel${menuOpen ? ' open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            className="nav-link"
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            data-cursor
          >
            <span>{item.label}</span>
            <span className="alt">{item.label}</span>
          </a>
        ))}
      </div>
    </>
  )
}
