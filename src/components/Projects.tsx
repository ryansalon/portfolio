import { useScrollReveal } from '../hooks/useScrollReveal'

const projects = [
  {
    id: 'O1',
    title: 'Voting System',
    tags: ['PHP', 'MySQL'],
    image: '/assets/voting-system.png',
    alt: 'Voting System',
    imageFirst: false,
  },
  {
    id: 'O2',
    title: 'Pacudan Bakeshop',
    tags: ['E-Commerce'],
    image: '/assets/pacudan bakeshop.png',
    alt: 'Pacudan Bakeshop',
    imageFirst: true,
  },
  {
    id: 'O3',
    title: 'Camiguin Tourism',
    tags: ['Next.js', 'Leaflet'],
    image: '/assets/camiguin tourism.png',
    alt: 'Camiguin Tourism',
    imageFirst: false,
  },
]

export default function Projects() {
  const sectionRef = useScrollReveal('[data-rv]', { y: 60, scale: 0.97, stagger: 0.15 })

  return (
    <section ref={sectionRef} id="projects" className="sec">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="sec-head" data-rv>
          <span className="k"><b>O4</b> — Solutions</span>
          <span className="rule" />
        </div>
        <h2 className="display" data-rv style={{ fontSize: 'clamp(36px, 10vw, 120px)', lineHeight: 0.9, letterSpacing: '-.03em', marginBottom: 'clamp(24px, 4vh, 66px)' }}>
          PROJECTS
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', borderTop: '1px solid var(--line)' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card ${project.imageFirst ? 'grid-project-alt' : 'grid-project'}`}
              data-rv
              data-cursor
              style={{ borderBottom: '1px solid var(--line)' }}
            >
              {project.imageFirst ? (
                <>
                  <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1' }}>
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                  <div className="project-content" style={{ borderLeft: '1px solid var(--line)' }}>
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: 500, opacity: 0.4, marginBottom: '12px', display: 'block' }}>{project.id}</span>
                      <h3 className="display" style={{ fontSize: 'clamp(24px, 5vw, 56px)', letterSpacing: '-.02em', marginBottom: '16px' }}>
                        {project.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {project.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase', padding: '5px 12px', border: '1px solid var(--line)', borderRadius: '100px', color: 'var(--bone-dim)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '20px' }}>
                      View Project ↗
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="project-content" style={{ borderRight: '1px solid var(--line)' }}>
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: 500, opacity: 0.4, marginBottom: '12px', display: 'block' }}>{project.id}</span>
                      <h3 className="display" style={{ fontSize: 'clamp(24px, 5vw, 56px)', letterSpacing: '-.02em', marginBottom: '16px' }}>
                        {project.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {project.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase', padding: '5px 12px', border: '1px solid var(--line)', borderRadius: '100px', color: 'var(--bone-dim)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '20px' }}>
                      View Project ↗
                    </div>
                  </div>
                  <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1' }}>
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                </>
              )}
              <div className="bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
