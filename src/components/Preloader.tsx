import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'

export default function Preloader() {
  const preRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const [progress, setProgress] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      document.body.classList.remove('is-locked')
      return
    }

    let progressVal = 0
    const interval = setInterval(() => {
      progressVal += Math.random() * 15 + 5
      if (progressVal >= 100) {
        progressVal = 100
        clearInterval(interval)
        setTimeout(() => {
          preRef.current?.classList.add('done')
          document.body.classList.remove('is-locked')
        }, 400)
      }
      setProgress(Math.min(Math.round(progressVal), 100))
    }, 120)

    document.body.classList.add('is-locked')

    return () => clearInterval(interval)
  }, [reducedMotion])

  useEffect(() => {
    if (fillRef.current) fillRef.current.style.right = `${100 - progress}%`
  }, [progress])

  return (
    <div ref={preRef} id="pre" hidden={reducedMotion} aria-hidden="true">
      <div className="pre-inner">
        <div className="pre-mark">
          <img src="/favicon.jpg" alt="" width={44} height={44} />
        </div>
        <div className="pre-label">RYAN MARC L. SALON</div>
        <div className="pre-bar">
          <div ref={fillRef} />
        </div>
        <div className="pre-meta">
          <span>Loading</span>
          <b ref={pctRef}>{progress}%</b>
        </div>
      </div>
    </div>
  )
}
