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
