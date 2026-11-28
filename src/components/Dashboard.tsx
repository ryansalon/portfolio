import { useScrollReveal } from '../hooks/useScrollReveal'

const aboutParagraphs = [
  "I learn best by shipping. Since 2023, most of my growth as a web developer has come from building working systems for real people around Camiguin — from a defended IoT-backed barangay health kiosk and a campus outpatient clinic tool to a municipal payroll platform, a local bakeshop storefront, and an interactive tourism map.",
  "Alongside my final year of BS Information Technology at Camiguin Polytechnic State College, I work as a developer at Internix IT Solutions — Camiguin's first DICT-incubated startup focused on practical software for local government units and small businesses.",
  "I'm actively looking for an OJT / internship where I can contribute to an engineering team, absorb stronger production habits, and keep improving through honest feedback.",
]

const stackGroups = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS', 'Leaflet'],
  },
  {
    label: 'Backend',
    items: ['PHP', 'CodeIgniter', 'Node.js', 'MySQL', 'IoT Web Integration'],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'XAMPP'],
  },
  {
    label: 'AI Workflow',
    items: ['Claude', 'Gemini', 'Ollama', 'DeepSeek'],
  },
]

const competitionHighlights = [
  {
    id: 'outstanding-youth-innovators',
    rank: 'Awarded',
    name: 'Outstanding Youth Innovators Award — Internix',
    meta: 'DICT Camiguin Provincial Officer Recognition · Pioneering Tech Startup of Camiguin',
  },
  {
    id: 'reverse-pitching',
    rank: '1st / 9',
    name: 'Annual Reverse Pitching — Champion',
    meta: 'CTRL+Ventures · Winning pitch: eGABAY Digital Health & Social Welfare System',
  },
  {
    id: 'rstw-2026',
    rank: '3 Days',
    name: '2026 RSTW — Startup Exhibitor (Internix IT Solutions)',
    meta: 'DICT-Incubated Startup · Shared Booth with DICT Camiguin · DOST Plaque of Appreciation',
  },
  {
    id: 'psc-xi',
    rank: 'Top 20',
    name: 'Philippine Startup Challenge XI (Region 10)',
    meta: 'Regional Pitching Competition Finalist · DICT & Startup PH',
  },
  {
    id: 'hack4gov',
    rank: '6th / 12',
    name: 'Hack4Gov 5 — Cybersecurity CTF',
    meta: '500 Points Captured · Team Phish & Chips · DICT',
  },
  {
    id: 'tech-tuesdays',
    rank: 'Awarded',
    name: 'Tech-Tuesdays — MSME Digitalization Pitch',
    meta: 'Certificate of Appreciation · DICT Region 10 & DTI Philippines',
  },
]

interface AboutSectionProps {
  onOpenWhyMe: () => void
}

interface AchievementsTeaserProps {
  onOpenAchievements: (targetId?: string) => void
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function AboutSection({ onOpenWhyMe }: AboutSectionProps) {
  const aboutRef = useScrollReveal('[data-rv]', { y: 20, stagger: 0.08 })

  return (
    <section ref={aboutRef} id="about" className="sec sec-alt">
      <div className="container">
        <div className="sec-head-row" data-rv>
          <h2 className="display h-sec">About &amp; Technical Profile</h2>
          <button type="button" className="btn-secondary" onClick={onOpenWhyMe}>
            Why Work With Me
            <ArrowRightIcon />
          </button>
        </div>

        <div className="about-grid">
          <div data-rv>
            <div className="profile-block">
              <h3 className="sub-heading">Background</h3>
              <div className="prose">
                {aboutParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="profile-block">
              <h3 className="sub-heading">Technical Stack</h3>
              <div className="stack-table">
                {stackGroups.map((group) => (
                  <div key={group.label} className="stack-table-row">
                    <span className="stack-cat">{group.label}</span>
                    <div className="stack-items">
                      {group.items.map((tech) => (
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

          <div data-rv>
            <div className="profile-block">
              <h3 className="sub-heading">Experience, Education &amp; Milestones</h3>
              <div className="timeline-list">
                <div className="timeline-row">
                  <div>
                    <h4>Developer — Internix IT Solutions</h4>
                    <p>First startup in Camiguin, incubated by DICT · Developing web systems for local government units (LGUs) and small businesses (MSMEs)</p>
                  </div>
                  <span className="badge-accent">Startup</span>
                </div>

                <div className="timeline-row">
                  <div>
                    <h4>Smart Barangay Health Monitoring Kiosk</h4>
                    <p>Defended IoT &amp; web capstone for vital signs assessment and BMI computation · CPSC &amp; Rural Health Unit (RHU) of Mahinog</p>
                  </div>
                  <span className="badge-accent">Defended</span>
                </div>

                <div className="timeline-row">
                  <div>
                    <h4>BS Information Technology — 4th Year</h4>
                    <p>Camiguin Polytechnic State College</p>
                  </div>
                  <span className="mono-meta">Present</span>
                </div>

                <div className="timeline-row">
                  <div>
                    <h4>OJT / Internship</h4>
                    <p>Actively seeking a web development team placement</p>
                  </div>
                  <span className="badge-neutral">Open</span>
                </div>

                <div className="timeline-row">
                  <div>
                    <h4>Senior High School — General Academic Strand (GAS)</h4>
                    <p>Columbia St. Michaels Parish High School</p>
                  </div>
                  <span className="mono-meta">2021–2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AchievementsTeaser({ onOpenAchievements }: AchievementsTeaserProps) {
  const winsRef = useScrollReveal('[data-rv]', { y: 20, stagger: 0.07 })

  return (
    <section
      ref={winsRef}
      id="achievements"
      className="sec sec-alt"
      aria-label="Competitions and achievements"
    >
      <div className="container">
        <div className="sec-head-row" data-rv>
          <div>
            <h2 className="display h-sec">Competitions &amp; Achievements</h2>
            <p className="sec-intro">
              Regional startup pitching, cybersecurity Capture the Flag, and MSME digitalization initiatives.
            </p>
          </div>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => onOpenAchievements()}
          >
            View Photos &amp; Details
            <ArrowRightIcon />
          </button>
        </div>

        <div className="ach-ledger" data-rv>
          {competitionHighlights.map((item) => (
            <button
              key={item.id}
              type="button"
              className="ach-ledger-row"
              onClick={() => onOpenAchievements(item.id)}
            >
              <span className="ach-rank-cell">{item.rank}</span>
              <span className="ach-title-cell">
                <strong>{item.name}</strong>
                <span>{item.meta}</span>
              </span>
              <span className="ach-arrow" aria-hidden="true">
                <ArrowRightIcon />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
