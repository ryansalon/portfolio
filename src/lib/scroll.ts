import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(l: Lenis | null) {
  instance = l
}

export function scrollToSection(el: HTMLElement | null) {
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset: -80 })
  } else {
    el.scrollIntoView({ block: 'start' })
  }
}

type ActiveListener = (index: number) => void

let sections: HTMLElement[] = []
let activeIndex = 0
let rafId = 0
let listening = false
const listeners = new Set<ActiveListener>()

function measureActive(): number {
  const vh = window.innerHeight
  let closest = 0
  let minDist = Infinity
  for (let i = 0; i < sections.length; i++) {
    const rect = sections[i].getBoundingClientRect()
    const center = rect.top + rect.height / 2
    const dist = Math.abs(center - vh / 2)
    if (dist < minDist) {
      minDist = dist
      closest = i
    }
  }
  return closest
}

function flush() {
  rafId = 0
  const next = measureActive()
  if (next !== activeIndex) {
    activeIndex = next
    listeners.forEach((cb) => cb(activeIndex))
  }
}

function onScroll() {
  if (!rafId) rafId = requestAnimationFrame(flush)
}

export function startActiveSectionTracking(ids: string[]) {
  sections = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el instanceof HTMLElement)

  if (!listening) {
    window.addEventListener('scroll', onScroll, { passive: true })
    listening = true
  }

  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  activeIndex = measureActive()
  listeners.forEach((cb) => cb(activeIndex))
}

export function subscribeActiveSection(cb: ActiveListener): () => void {
  listeners.add(cb)
  cb(activeIndex)
  return () => {
    listeners.delete(cb)
  }
}
