import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface Project {
  id: string
  title: string
  tags: string[]
  image: string
  alt: string
  reversed: boolean
  description: string
  /** Drop in your live demo or GitHub URLs whenever ready */
  liveUrl?: string
  repoUrl?: string
}

const projects: Project[] = [
  {
    id: 'voting-system',
    title: 'Voting System',
    tags: ['PHP', 'MySQL'],
    image: '/assets/voting-system.webp',
    alt: 'Screenshot of the PHP and MySQL Voting System interface',
    reversed: false,
    description:
      'A browser-based voting system built on PHP and MySQL for casting ballots and tallying results.',
  },
  {
    id: 'pacudan-bakeshop',
    title: 'Pacudan Bakeshop',
    tags: ['E-Commerce'],
    image: '/assets/pacudan-bakeshop.webp',
    alt: 'Screenshot of the Pacudan Bakeshop online storefront',
    reversed: true,
    description:
      'An online storefront where customers browse the bakeshop catalogue and place orders.',
  },
  {
    id: 'camiguin-tourism',
    title: 'Camiguin Tourism',
    tags: ['Next.js', 'Leaflet'],
    image: '/assets/camiguin-tourism.webp',
    alt: 'Screenshot of the Camiguin Tourism interactive map website',
    reversed: false,
    description:
      'A tourism guide that plots Camiguin destinations on an interactive Leaflet map.',
  },
]

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export default function Projects() {
  const sectionRef = useScrollReveal('[data-rv]', { y: 28, stagger: 0.1 })
  const [selected, setSelected] = useState<Project | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    document.body.classList.toggle('modal-open', Boolean(selected))
    if (!selected) return

    closeBtnRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null)
        lastTriggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [selected])

  const openPreview = (project: Project, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger
    setSelected(project)
  }

  const closePreview = () => {
    setSelected(null)
    lastTriggerRef.current?.focus()
  }

  return (
    <section ref={sectionRef} id="projects" className="sec">
      <div className="container">
        <div className="sec-title-row" data-rv>
          <h2 className="display h-sec">Selected Projects</h2>
          <span className="sec-meta">{projects.length} projects</span>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`project-card${project.reversed ? ' is-reversed' : ''}`}
              data-rv
            >
              <div className="project-media">
                <img src={project.image} alt={project.alt} loading="lazy" />
              </div>

              <div className="project-body">
                <h3 className="display h-md">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <button
                    type="button"
                    className="project-btn"
                    onClick={(e) => openPreview(project, e.currentTarget)}
                  >
                    Inspect Preview
                    <ExpandIcon />
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn"
                    >
                      Live Demo
                      <ArrowUpRightIcon />
                    </a>
                  )}

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn"
                    >
                      GitHub
                      <ArrowUpRightIcon />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePreview()
          }}
        >
          <div className="modal-dialog">
            <div className="modal-head">
              <div>
                <h3 id="project-modal-title" className="display h-md">
                  {selected.title}
                </h3>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                className="modal-close"
                onClick={closePreview}
                aria-label="Close project preview"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-media">
              <img src={selected.image} alt={selected.alt} />
            </div>

            <p className="project-desc" style={{ maxWidth: '68ch', marginBottom: '18px' }}>
              {selected.description}
            </p>

            <div className="tag-row">
              {selected.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            {(selected.liveUrl || selected.repoUrl) && (
              <div className="project-actions" style={{ marginTop: '20px' }}>
                {selected.liveUrl && (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-solid"
                  >
                    Visit Live Site
                    <ArrowUpRightIcon />
                  </a>
                )}
                {selected.repoUrl && (
                  <a
                    href={selected.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    View Source on GitHub
                    <ArrowUpRightIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
