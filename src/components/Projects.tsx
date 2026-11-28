import { useRef, useState } from 'react'
import { projects, type ProjectCategory, type ProjectItem } from '../data/projects'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface ProjectsProps {
  onInspectProject: (
    project: ProjectItem,
    startIndex?: number,
    trigger?: HTMLElement | null
  ) => void
}

type FilterKey = 'all' | ProjectCategory

const FILTER_ORDER: FilterKey[] = ['all', 'civic', 'web']

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
  const [filter, setFilter] = useState<FilterKey>('all')
  const tabRefs = useRef<Record<FilterKey, HTMLButtonElement | null>>({
    all: null,
    civic: null,
    web: null,
  })

  const civicCount = projects.filter((p) => p.category === 'civic').length
  const webCount = projects.filter((p) => p.category === 'web').length
  const visibleProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  const regularProjects = visibleProjects.filter((p) => !(p.featured && p.gallery?.length))
  const trailingOddId =
    regularProjects.length % 2 === 1 ? regularProjects[regularProjects.length - 1]?.id : null

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, current: FilterKey) => {
    const idx = FILTER_ORDER.indexOf(current)
    let nextIdx: number | null = null
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % FILTER_ORDER.length
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + FILTER_ORDER.length) % FILTER_ORDER.length
    else if (e.key === 'Home') nextIdx = 0
    else if (e.key === 'End') nextIdx = FILTER_ORDER.length - 1

    if (nextIdx !== null) {
      e.preventDefault()
      const nextKey = FILTER_ORDER[nextIdx]
      setFilter(nextKey)
      tabRefs.current[nextKey]?.focus()
    }
  }

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
              ref={(el) => {
                tabRefs.current.all = el
              }}
              id="tab-all"
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              aria-controls="projects-panel"
              tabIndex={filter === 'all' ? 0 : -1}
              className={`filter-tab${filter === 'all' ? ' active' : ''}`}
              onClick={() => setFilter('all')}
              onKeyDown={(e) => handleTabKeyDown(e, 'all')}
            >
              All ({projects.length})
            </button>
            <button
              ref={(el) => {
                tabRefs.current.civic = el
              }}
              id="tab-civic"
              type="button"
              role="tab"
              aria-selected={filter === 'civic'}
              aria-controls="projects-panel"
              tabIndex={filter === 'civic' ? 0 : -1}
              className={`filter-tab${filter === 'civic' ? ' active' : ''}`}
              onClick={() => setFilter('civic')}
              onKeyDown={(e) => handleTabKeyDown(e, 'civic')}
            >
              Civic &amp; Health ({civicCount})
            </button>
            <button
              ref={(el) => {
                tabRefs.current.web = el
              }}
              id="tab-web"
              type="button"
              role="tab"
              aria-selected={filter === 'web'}
              aria-controls="projects-panel"
              tabIndex={filter === 'web' ? 0 : -1}
              className={`filter-tab${filter === 'web' ? ' active' : ''}`}
              onClick={() => setFilter('web')}
              onKeyDown={(e) => handleTabKeyDown(e, 'web')}
            >
              Web &amp; Commerce ({webCount})
            </button>
          </div>
        </div>

        <div
          id="projects-panel"
          role="tabpanel"
          aria-labelledby={`tab-${filter}`}
          className="work-grid"
        >
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
                        onClick={(e) => onInspectProject(project, 0, e.currentTarget)}
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
                          onClick={(e) => onInspectProject(project, idx + 1, e.currentTarget)}
                          aria-label={`Inspect ${media.caption}`}
                        >
                          <img src={media.src} alt={media.alt} loading="lazy" />
                          <span>{media.thumbLabel ?? `View ${idx + 2}`}</span>
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
                        onClick={(e) => onInspectProject(project, 0, e.currentTarget)}
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

            const isWide = project.id === trailingOddId

            return (
              <article
                key={project.id}
                className={`work-card${isWide ? ' is-wide' : ''}`}
                data-rv
              >
                <div className="work-media-frame">
                  <button
                    type="button"
                    className="work-media-btn"
                    onClick={(e) => onInspectProject(project, 0, e.currentTarget)}
                    aria-label={`Open details for ${project.title}`}
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
                      onClick={(e) => onInspectProject(project, 0, e.currentTarget)}
                    >
                      Inspect Details
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
