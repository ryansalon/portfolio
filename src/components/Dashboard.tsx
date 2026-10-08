import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface TimelineItem {
  title: string
  sub: string
  year: string
  active?: boolean
}

/* Edit these arrays to update your details */
const experience: TimelineItem[] = [
  {
    title: 'BS Information Technology — 4th Year',
    sub: 'Camiguin Polytechnic State College',
    year: '2026',
    active: true,
  },
  {
    title: 'OJT / Internship',
    sub: 'Actively seeking placement',
    year: 'Ongoing',
    active: false,
  },
  {
    title: 'Capstone Project',
    sub: 'DESIGN AND DEVELOPMENT OF A SMART BARANGAY HEALTH MONITORING KIOSK FOR BASIC VITAL SIGNS ASSESSMENT AND BMI COMPUTATION',
    year: 'Ongoing',
    active: false,
  },
]

const education: TimelineItem[] = [
  {
    title: 'BS Information Technology — 4th Year',
    sub: 'Camiguin Polytechnic State College',
    year: 'Present',
    active: true,
  },
  {
    title: 'Senior High School — GAS Strand',
    sub: 'Columbia St. Michaels Parish High School',
    year: '2021-2022',
  },
  {
    title: 'Junior High School',
    sub: 'Columbia St. Michaels Parish High School',
    year: '2020-2021',
  },
  {
    title: 'Elementary',
    sub: 'Mahinog Central School',
    year: '2015-2016',
  },
]

const stack = [
  { label: 'Frontend', techs: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Next.js', 'Leaflet'] },
  { label: 'Backend', techs: ['PHP', 'Node.js', 'MySQL', 'CodeIgniter'] },
  { label: 'Tools', techs: ['GitHub', 'VS Code', 'XAMPP'] },
]

const aboutParagraphs = [
  "I'm a 4th-year BS Information Technology student at Camiguin Polytechnic State College, and I just really enjoy building things for the web. I got into full-stack development because I like seeing an idea turn into something real — something people can actually use.",
  'I learn by doing. I pick up a tool, break it, figure out why, and keep going. Most of what I know comes from shipping real projects: a voting system, an online storefront for a local bakeshop, and a tourism guide that maps Camiguin’s best destinations.',
  "Right now I'm finishing my degree and actively looking for an OJT / internship where I can apply what I've been building. I'm based in Poblacion, Mahinog, Camiguin, Philippines — early in the journey, but genuinely excited about where it's going.",
]

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <div key={item.title} className={`tl-item${item.active ? ' is-active' : ''}`}>
          <span className="tl-marker">
            <i className="tl-dot" />
          </span>
          <div className="tl-body">
            <div className="tl-text">
              <h3 className="tl-title">{item.title}</h3>
              <p className="tl-sub">{item.sub}</p>
            </div>
            {item.active ? (
              <span className="tl-badge">Current</span>
            ) : (
              <span className="tl-year">{item.year}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function CardHead({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div className="card-head">
      <h2 className="card-title">{title}</h2>
      {right}
    </div>
  )
}

export default function Dashboard() {
  const sectionRef = useScrollReveal('[data-rv]', { y: 50, stagger: 0.1 })

  return (
    <section ref={sectionRef} id="about" className="sec">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="sec-head" data-rv>
          <span className="k"><b>O2</b> — Profile</span>
          <span className="rule" />
        </div>

        <div className="dash-grid">
          <div className="dash-col">
            <div className="dash-card" data-rv data-cursor>
              <CardHead
                title="Experience"
                right={
                  <span className="card-since">
                    Coding since <b>2023</b>
                  </span>
                }
              />
              <Timeline items={experience} />
            </div>

            <div className="dash-card" data-rv data-cursor>
              <CardHead title="Education" />
              <Timeline items={education} />
            </div>
          </div>

          <div className="dash-col">
            <div className="dash-card" data-rv data-cursor>
              <CardHead title="About" />
              <div className="about-row">
                <figure className="about-pfp">
                  <img src="/assets/pfp.jpg" alt="Ryan Marc L Salon" loading="lazy" />
                </figure>
                <div className="about-text">
                  {aboutParagraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="gate-stats">
                <div>
                  <b style={{ fontVariantNumeric: 'tabular-nums' }}>3+</b>
                  <span>Years Coding</span>
                </div>
                <div>
                  <b style={{ fontVariantNumeric: 'tabular-nums' }}>4th</b>
                  <span>Year BSIT</span>
                </div>
              </div>
            </div>

            <div className="dash-card" data-rv data-cursor>
              <CardHead title="Tech Stack" />
              <div className="stack-groups">
                {stack.map((group) => (
                  <div key={group.label} className="stack-group">
                    <div className="stack-label">
                      <span>{group.label}</span>
                      <span className="rule" />
                    </div>
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
        </div>
      </div>
    </section>
  )
}
