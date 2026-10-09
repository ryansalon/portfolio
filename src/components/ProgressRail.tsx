import { useEffect, useState } from 'react'
import { scrollToSection, subscribeActiveSection } from '../lib/scroll'

interface ProgressRailProps {
  sectionIds: string[]
}

export default function ProgressRail({ sectionIds }: ProgressRailProps) {
  const [active, setActive] = useState(0)

  useEffect(() => subscribeActiveSection(setActive), [])

  const scrollTo = (index: number) => {
    scrollToSection(document.getElementById(sectionIds[index]))
  }

  return (
    <div className="rail">
      {sectionIds.map((id, i) => (
        <button
          key={id}
          className={i === active ? 'on' : ''}
          onClick={() => scrollTo(i)}
          aria-label={`Section ${i + 1}`}
        >
          <i />
        </button>
      ))}
    </div>
  )
}
