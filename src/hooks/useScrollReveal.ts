import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  y?: number
  duration?: number
  stagger?: number
  start?: string
}

export function useScrollReveal(
  selector: string = '[data-rv]',
  opts: ScrollRevealOptions = {}
) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const { y = 20, duration = 0.72, stagger = 0.08, start = 'top 86%' } = opts

  useEffect(() => {
    const container = ref.current
    if (!container || reducedMotion) return

    const els = container.querySelectorAll(selector)
    if (!els.length) return

    const anim = gsap.from(els, {
      opacity: 0,
      y,
      duration,
      stagger,
      ease: 'expo.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: container,
        start,
        once: true,
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [selector, y, duration, stagger, start, reducedMotion])

  return ref
}
