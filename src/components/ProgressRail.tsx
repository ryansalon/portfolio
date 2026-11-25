import { useEffect, useState } from 'react'
import { scrollToSection, subscribeActiveSection } from '../lib/scroll'
import type { NavSection } from './Nav'

interface ProgressRailProps {
  sections: NavSection[]
}

export default function ProgressRail({ sections }: ProgressRailProps) {
  const [active, setActive] = useState(0)

  useEffect(() => subscribeActiveSection(setActive), [])

  const scrollTo = (id: string) => {
    scrollToSection(document.getElementById(id))
  }

  return (
    <aside className="rail" aria-label="Section progress">
      {sections.map((sec, i) => (
        <button
          key={sec.id}
          type="button"
          className={i === active ? 'on' : ''}
          onClick={() => scrollTo(sec.id)}
          aria-label={`Jump to ${sec.label}`}
          aria-current={i === active ? 'location' : undefined}
        >
          <span className="rail-label" aria-hidden="true">
            {sec.label}
          </span>
          <i aria-hidden="true" />
        </button>
      ))}
    </aside>
  )
}
