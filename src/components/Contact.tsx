import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Contact() {
  const sectionRef = useScrollReveal('[data-rv]', { y: 50, stagger: 0.12 })

  return (
    <section ref={sectionRef} id="contact" className="sec" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <div className="grid-contact">
          <div data-rv>
            <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '24px' }}>
              <b style={{ color: 'var(--accent)' }}>O4</b> — Connect
            </p>
            <h2 className="display h-xl" style={{ marginBottom: '36px' }}>
              LET'S<br />TALK
            </h2>
            <a
              href="mailto:ryanmarcsalon04@gmail.com"
              className="arrowlink"
              data-cursor
            >
              ryanmarcsalon04@gmail.com
              <span className="ar">
                <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12L12 1M12 1H3.5M12 1V9.5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
            </a>
          </div>

          <div data-rv style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '24px' }}>
            <a
              href="https://www.facebook.com/rynn.merxx.56884"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              data-cursor
              style={{ fontSize: '11px' }}
            >
              <span>Facebook</span>
              <span className="alt">Facebook</span>
            </a>
            <a
              href="https://github.com/ryansalon"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              data-cursor
              style={{ fontSize: '11px' }}
            >
              <span>GitHub</span>
              <span className="alt">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
