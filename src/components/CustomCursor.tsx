import { useEffect, useRef } from 'react'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse || !dotRef.current) {
      if (dotRef.current) dotRef.current.style.display = 'none'
      return
    }

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const tick = () => {
      x = lerp(x, tx, 0.18)
      y = lerp(y, ty, 0.18)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
      }
      requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    requestAnimationFrame(tick)

    const interactives = document.querySelectorAll('[data-cursor]')
    const onEnter = () => dotRef.current?.classList.add('act')
    const onLeave = () => dotRef.current?.classList.remove('act')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('pointermove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return <div ref={dotRef} className="cur-dot" />
}
