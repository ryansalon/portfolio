import { useEffect, useRef, useState } from 'react'

interface NavProps {
  sectionIds: string[]
}

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Profile' },
  { id: 'stack', label: 'Tech' },
  { id: 'projects', label: 'Works' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ sectionIds }: NavProps) {
  const navRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const lastScroll = useRef(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const nav = navRef.current
      if (!nav) return

      nav.classList.toggle('stuck', y > 40)
      if (!menuOpen) {
        nav.classList.toggle('hide', y > lastScroll.current + 4 && y > window.innerHeight * 0.8)
      }
      lastScroll.current = y

      const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
      const vh = window.innerHeight
      let closest = 0
      let minDist = Infinity
      sections.forEach((section, i) => {
        if (!section) return
        const rect = section.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - vh / 2)
        if (dist < minDist) { minDist = dist; closest = i }
      })

      document.querySelectorAll('.nav-link').forEach((link, i) => {
        link.classList.toggle('on', i === closest)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds, menuOpen])

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
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav ref={navRef} className="nav">
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
      </nav>

      <div ref={panelRef} className={`nav-panel${menuOpen ? ' open' : ''}`}>
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
