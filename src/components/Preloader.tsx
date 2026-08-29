import { useEffect, useRef, useState } from 'react'

export default function Preloader() {
  const preRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (fillRef.current) fillRef.current.style.right = `${100 - progress}%`
  }, [progress])

  return (
    <div ref={preRef} id="pre">
      <div className="pre-inner">
        <div className="pre-mark">
          <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="44" height="44" rx="8" fill="currentColor" fillOpacity="0.08" />
            <path d="M12 16h20v3H12zM12 22h16v3H12zM12 28h10v3H12z" fill="currentColor" fillOpacity="0.6" />
          </svg>
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
