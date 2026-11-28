import type Lenis from 'lenis'

let instance: Lenis | null = null
let lockCount = 0

export function setLenis(l: Lenis | null) {
  instance = l
  if (instance && lockCount > 0) {
    instance.stop()
  }
}

export function pauseScroll() {
  lockCount += 1
  instance?.stop()
}

export function resumeScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    instance?.start()
  }
}

export function scrollToSection(el: HTMLElement | null, offset = -80) {
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset })
  } else {
    el.scrollIntoView({ block: 'start' })
  }
}

export function scrollToTop(reducedMotion: boolean) {
  if (instance && !reducedMotion) {
    instance.scrollTo(0)
  } else {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }
}

type ActiveListener = (index: number) => void

let sections: HTMLElement[] = []
let activeIndex = 0
let rafId = 0
let listening = false
const listeners = new Set<ActiveListener>()

function measureActive(): number {
  if (!sections.length) return 0

  const scrollBottom = window.scrollY + window.innerHeight
  const docHeight = document.documentElement.scrollHeight
  if (docHeight - scrollBottom <= 24) {
    return sections.length - 1
  }

  const threshold = Math.min(180, window.innerHeight * 0.28)
  let current = 0
  for (let i = 0; i < sections.length; i++) {
    const rect = sections[i].getBoundingClientRect()
    if (rect.top <= threshold) {
      current = i
    } else {
      break
    }
  }
  return current
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
