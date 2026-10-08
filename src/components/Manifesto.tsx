import { useScrollReveal } from '../hooks/useScrollReveal'

const lines = [
  'Design with intent',
  'Build with precision',
  'Deploy with confidence',
]

export default function Manifesto() {
  const sectionRef = useScrollReveal('[data-rv]', { y: 80, scale: 0.92, stagger: 0.18 })

  return (
    <section ref={sectionRef} id="manifesto" className="sec" style={{ textAlign: 'center' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <p data-rv style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '.5em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '48px' }}>
          The Manifesto
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2.6vh, 30px)' }}>
          {lines.map((line) => (
            <div key={line} style={{ overflow: 'hidden', padding: '4px 0' }} data-rv>
              <h2 className="display manifesto-line h-sec" style={{ lineHeight: 1.1 }}>
                {line}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
