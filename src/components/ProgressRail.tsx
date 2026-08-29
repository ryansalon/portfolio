import { useEffect, useRef, useState } from 'react'

interface ProgressRailProps {
  sectionIds: string[]
}

export default function ProgressRail({ sectionIds }: ProgressRailProps) {
  const [active, setActive] = useState(0)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return

    const onScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      let closest = 0
      let minDist = Infinity
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - vh / 2)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      })
      setActive(closest)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds])

  const scrollTo = (index: number) => {
    const el = document.getElementById(sectionIds[index])
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div ref={railRef} className="rail">
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
