import { useState } from 'react'
import { projects, type ProjectCategory, type ProjectItem } from '../data/projects'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface ProjectsProps {
  onInspectProject: (project: ProjectItem, startIndex?: number) => void
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export default function Projects({ onInspectProject }: ProjectsProps) {
  const sectionRef = useScrollReveal('[data-rv]', { y: 22, stagger: 0.08 })
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')

  const civicCount = projects.filter((p) => p.category === 'civic').length
  const webCount = projects.filter((p) => p.category === 'web').length
  const visibleProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section ref={sectionRef} id="work" className="sec">
      <div className="container">
        <div className="sec-head-row" data-rv>
          <div>
            <h2 className="display h-sec">Selected Projects</h2>
            <p className="sec-intro">
              Practical IoT and web systems developed for municipal offices, campus healthcare, local commerce, and island tourism.
            </p>
          </div>

          <div className="filter-tabs" role="tablist" aria-label="Filter projects">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`filter-tab${filter === 'all' ? ' active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({projects.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'civic'}
              className={`filter-tab${filter === 'civic' ? ' active' : ''}`}
              onClick={() => setFilter('civic')}
            >
              Civic &amp; Health ({civicCount})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'web'}
              className={`filter-tab${filter === 'web' ? ' active' : ''}`}
              onClick={() => setFilter('web')}
            >
              Web &amp; Commerce ({webCount})
            </button>
          </div>
        </div>

        <div className="work-grid">
          {visibleProjects.map((project) => {
            const isFeatured = Boolean(project.featured && project.gallery?.length)

            if (isFeatured && project.gallery) {
              return (
                <article key={project.id} className="work-card is-featured" data-rv>
                  <div className="featured-media-col">
                    <div className="work-media-frame">
                      <button
                        type="button"
                        className="work-media-btn"
                        onClick={() => onInspectProject(project, 0)}
                        aria-label={`Open full preview of ${project.title}`}
                      >
                        <img src={project.image} alt={project.alt} loading="lazy" />
                      </button>
                    </div>

                    <div className="prototype-thumbs" aria-label="Capstone hardware prototype gallery">
                      {project.gallery.slice(1).map((media, idx) => (
                        <button
                          key={media.src}
                          type="button"
                          className="prototype-thumb-btn"
                          onClick={() => onInspectProject(project, idx + 1)}
                          aria-label={`Inspect ${media.caption}`}
                        >
                          <img src={media.src} alt={media.alt} loading="lazy" />
                          <span>{idx === 2 ? 'Blueprint' : `Prototype ${idx + 1}`}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="work-body">
                    <div style={{ marginBottom: '10px' }}>
                      <span className="badge-accent">{project.categoryLabel}</span>
                    </div>

                    <h3 className="display h-md" style={{ marginBottom: '10px' }}>
                      {project.title}
                    </h3>

                    <p className="work-desc">{project.description}</p>

                    <div className="tag-row">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="work-footer">
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => onInspectProject(project, 0)}
                      >
                        Inspect Web &amp; Prototype ({project.gallery.length})
                        <ExpandIcon />
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="work-action-btn"
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
                          className="work-action-btn"
                        >
                          GitHub
                          <ArrowUpRightIcon />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )
            }

            return (
              <article key={project.id} className="work-card" data-rv>
                <div className="work-media-frame">
                  <button
                    type="button"
                    className="work-media-btn"
                    onClick={() => onInspectProject(project, 0)}
                    aria-label={`Open full preview of ${project.title}`}
                  >
                    <img src={project.image} alt={project.alt} loading="lazy" />
                  </button>
                </div>

                <div className="work-body">
                  <div className="work-top">
                    <h3 className="display h-md">{project.title}</h3>
                    <span className="mono-meta">{project.categoryLabel}</span>
                  </div>

                  <p className="work-desc">{project.description}</p>

                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="work-footer">
                    <button
                      type="button"
                      className="work-action-btn"
                      onClick={() => onInspectProject(project, 0)}
                    >
                      Inspect Preview
                      <ExpandIcon />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-action-btn"
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
                        className="work-action-btn"
                      >
                        GitHub
                        <ArrowUpRightIcon />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
