import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  y?: number
  opacity?: number
  scale?: number
  rotateX?: number
  duration?: number
  stagger?: number
  delay?: number
  ease?: string
  start?: string
  scrub?: boolean | number
}

export function useScrollReveal(
  selector: string = '[data-rv]',
  opts: ScrollRevealOptions = {}
) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const {
      y = 50,
      opacity = 0,
      scale = 0.96,
      rotateX = 0,
      duration = 1.2,
      stagger = 0.1,
      delay = 0,
      ease = 'power3.out',
      start = 'top 88%',
      scrub = false,
    } = opts

    const els = container.querySelectorAll(selector)
    if (!els.length) return

    const anims = gsap.fromTo(
      els,
      { opacity, y, scale, rotateX, transformPerspective: rotateX ? 800 : undefined },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none none',
          scrub,
        },
      }
    )

    return () => {
      anims.scrollTrigger?.kill()
      anims.kill()
    }
  }, [selector, JSON.stringify(opts)])

  return ref
}

export function useParallax(distance: number = 40) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const anim = gsap.to(el, {
      y: distance,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [distance])

  return ref
}
