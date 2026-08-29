import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Profile() {
  const sectionRef = useScrollReveal('[data-rv]', { y: 40, stagger: 0.12 })

  return (
    <section ref={sectionRef} id="about" className="sec">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="sec-head" data-rv>
          <span className="k"><b>O2</b> — Profile</span>
          <span className="rule" />
        </div>

        <div className="grid-profile">
          <div data-rv>
            <h2 className="display h-sec" style={{ maxWidth: '11ch' }}>
              Architecting the digital experience.
            </h2>
          </div>
          <div data-rv>
            <p style={{ fontSize: 'clamp(14px, 2.5vw, 19px)', lineHeight: 1.66, color: 'var(--bone-dim)', marginBottom: '20px' }}>
              I bridge the gap between architectural design and technical execution. My process is rooted in precision, ensuring zero-defect deployments for every interface.
            </p>
            <div className="grid-info">
              {[
                { label: 'Capability', value: 'Full-Stack' },
                { label: 'Location', value: 'Camiguin, PH' },
                { label: 'Availability', value: 'Immediate' },
              ].map((item) => (
                <div key={item.label} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="gate-stats" data-rv>
              <div>
                <b style={{ fontVariantNumeric: 'tabular-nums' }}>3+</b>
                <span>Years Coding</span>
              </div>
              <div>
                <b style={{ fontVariantNumeric: 'tabular-nums' }}>12</b>
                <span>Projects Built</span>
              </div>
              <div>
                <b style={{ fontVariantNumeric: 'tabular-nums' }}>100%</b>
                <span>Precision Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
