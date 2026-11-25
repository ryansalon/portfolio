import { useScrollReveal } from '../hooks/useScrollReveal'

interface TimelineItem {
  title: string
  sub: string
  year: string
  badge?: string
}

/* Edit these arrays to update your details */
const currentFocus: TimelineItem[] = [
  {
    title: 'BS Information Technology — 4th Year',
    sub: 'Camiguin Polytechnic State College',
    year: '2026',
    badge: 'Current',
  },
  {
    title: 'OJT / Internship',
    sub: 'Actively seeking placement in web development',
    year: 'Open',
  },
  {
    title: 'Capstone Project',
    sub: 'Design and Development of a Smart Barangay Health Monitoring Kiosk for Basic Vital Signs Assessment and BMI Computation',
    year: 'Ongoing',
  },
]

const education: TimelineItem[] = [
  {
    title: 'Camiguin Polytechnic State College',
    sub: 'BS Information Technology',
    year: 'Present',
  },
  {
    title: 'Columbia St. Michaels Parish High School',
    sub: 'Senior High School — GAS Strand',
    year: '2021–2022',
  },
]

const stack = [
  {
    label: 'Frontend',
    techs: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS', 'Leaflet'],
  },
  {
    label: 'Backend',
    techs: ['PHP', 'CodeIgniter', 'Node.js', 'MySQL'],
  },
  {
    label: 'Tools',
    techs: ['GitHub', 'VS Code', 'XAMPP'],
  },
]

const aboutParagraphs = [
  "I'm a 4th-year BS Information Technology student at Camiguin Polytechnic State College who enjoys building things for the web. I got into full-stack development because I like seeing an idea turn into something real — something people can actually use.",
  'I learn by doing. I pick up a tool, break it, figure out why, and keep going. Most of what I know comes from shipping real projects: a voting system, an online storefront for a local bakeshop, and a tourism guide that maps Camiguin’s best destinations.',
  "Right now I'm finishing my degree and actively looking for an OJT / internship where I can apply what I've been building. I'm based in Poblacion, Mahinog, Camiguin, Philippines — early in the journey, but genuinely excited about where it's going.",
]

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <div key={item.title} className={`tl-item${item.badge ? ' is-active' : ''}`}>
          <span className="tl-marker" aria-hidden="true">
            <i className="tl-dot" />
          </span>
          <div className="tl-body">
            <div className="tl-text">
              <h4 className="tl-title">{item.title}</h4>
              <p className="tl-sub">{item.sub}</p>
            </div>
            {item.badge ? (
              <span className="tl-badge">{item.badge}</span>
            ) : (
              <span className="tl-year">{item.year}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const sectionRef = useScrollReveal('[data-rv]', { y: 24, stagger: 0.08 })

  return (
    <section ref={sectionRef} id="about" className="sec">
      <div className="container">
        <div className="sec-title-row" data-rv>
          <h2 className="display h-sec">About &amp; Background</h2>
          <span className="sec-meta">Coding since 2023</span>
        </div>

        <div className="profile-layout">
          <div data-rv>
            <div className="about-text">
              {aboutParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="profile-facts">
              <div className="profile-fact">
                <b>3+ Years</b>
                <span>Building for the web</span>
              </div>
              <div className="profile-fact">
                <b>4th Year</b>
                <span>BSIT at CPSC</span>
              </div>
              <div className="profile-fact">
                <b>3 Shipped</b>
                <span>Community web apps</span>
              </div>
            </div>
          </div>

          <div className="profile-sidebar">
            <div data-rv>
              <h3 className="sub-heading">Current Focus</h3>
              <Timeline items={currentFocus} />
            </div>

            <div data-rv>
              <h3 className="sub-heading">Education</h3>
              <Timeline items={education} />
            </div>
          </div>
        </div>

        <div className="stack-band" data-rv>
          <h3 className="sub-heading">Tech Stack</h3>
          <div className="stack-grid">
            {stack.map((group) => (
              <div key={group.label}>
                <h4 className="stack-group-title">{group.label}</h4>
                <div className="stack-pills">
                  {group.techs.map((tech) => (
                    <span key={tech} className="stack-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
