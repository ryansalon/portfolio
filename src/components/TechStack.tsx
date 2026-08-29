import { useScrollReveal } from '../hooks/useScrollReveal'
import TechMarquee from './TechMarquee'

export default function TechStack() {
  const sectionRef = useScrollReveal('[data-rv]', { y: 40, stagger: 0.12 })

  return (
    <section ref={sectionRef} id="stack" className="sec" style={{ overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="sec-head" data-rv>
          <span className="k"><b>O3</b> — Technology</span>
          <span className="rule" />
        </div>
        <h2 className="display" data-rv style={{ fontSize: 'clamp(30px, 4vw, 60px)', marginBottom: 'clamp(30px, 5vh, 66px)' }}>
          THE CORE STACK
        </h2>
      </div>
      <TechMarquee />
    </section>
  )
}
