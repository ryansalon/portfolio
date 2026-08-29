import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Footer() {
  const sectionRef = useScrollReveal('[data-rv]', { y: 20, duration: 0.8 })

  return (
    <footer ref={sectionRef} className="foot">
      <div data-rv style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          © 2026 Ryan Marc Salon. Precision Built.
        </p>
      </div>
    </footer>
  )
}
