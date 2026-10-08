import { useScrollReveal } from '../hooks/useScrollReveal'

interface Project {
  id: string
  title: string
  tags: string[]
  image: string
  alt: string
  imageFirst: boolean
  description: string
}

const projects: Project[] = [
  {
    id: 'O1',
    title: 'Voting System',
    tags: ['PHP', 'MySQL'],
    image: '/assets/voting-system.png',
    alt: 'Voting System',
    imageFirst: false,
    description:
      'A browser-based voting system built on PHP and MySQL for casting ballots and tallying results.',
  },
  {
    id: 'O2',
    title: 'Pacudan Bakeshop',
    tags: ['E-Commerce'],
    image: '/assets/pacudan bakeshop.png',
    alt: 'Pacudan Bakeshop',
    imageFirst: true,
    description:
      'An online storefront where customers browse the bakeshop catalogue and place orders.',
  },
  {
    id: 'O3',
    title: 'Camiguin Tourism',
    tags: ['Next.js', 'Leaflet'],
    image: '/assets/camiguin tourism.png',
    alt: 'Camiguin Tourism',
    imageFirst: false,
    description:
      'A tourism guide that plots Camiguin destinations on an interactive Leaflet map.',
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={`project-card ${project.imageFirst ? 'grid-project-alt' : 'grid-project'}`}
      data-rv
      data-cursor
      style={{ borderBottom: '1px solid var(--line)' }}
    >
      <div className="project-media">
        <img src={project.image} alt={project.alt} loading="lazy" />
      </div>

      <div className="project-body">
        <div>
          <span className="project-id">{project.id}</span>
          <h3 className="display h-md">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="project-cta">View Project ↗</div>
      </div>

      <div className="bar" />
    </div>
  )
}

export default function Projects() {
  const sectionRef = useScrollReveal('[data-rv]', { y: 60, scale: 0.97, stagger: 0.15 })

  return (
    <section ref={sectionRef} id="projects" className="sec">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="sec-head" data-rv>
          <span className="k">
            <b>O3</b> — Solutions
          </span>
          <span className="rule" />
        </div>
        <h2 className="display h-xl" data-rv style={{ marginBottom: 'clamp(24px, 4vh, 66px)' }}>
          PROJECTS
        </h2>

        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
