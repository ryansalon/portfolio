import { useScrollReveal } from '../hooks/useScrollReveal'

const aboutParagraphs = [
  "I'm a 4th-year BS Information Technology student at Camiguin Polytechnic State College who enjoys building reliable software for the web. I got into full-stack development because I like turning practical requirements into working systems people can use every day.",
  'I learn by shipping. Most of what I know comes from building real systems: an IoT-backed barangay health monitoring platform, a campus outpatient clinic manager, a municipal payroll platform, a voting system, an online storefront for a local bakeshop, and an interactive Camiguin tourism map.',
  "Right now I'm finishing my degree and actively seeking an OJT / internship where I can contribute to an engineering team, learn strong production habits, and keep growing.",
]

const stackGroups = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS', 'Leaflet'],
  },
  {
    label: 'Backend',
    items: ['PHP', 'CodeIgniter', 'Node.js', 'MySQL', 'IoT Web Integration'],
  },
  {
    label: 'Tools',
    items: ['GitHub', 'VS Code', 'Antigravity', 'XAMPP'],
  },
  {
    label: 'AI',
    items: ['Ollama', 'Gemini', 'Claude', 'OpenCode', 'DeepSeek'],
  },
]

const competitionHighlights = [
  {
    rank: '1st / 9',
    name: 'Annual Reverse Pitching — Champion',
    meta: 'CTRL+Ventures · Winning pitch: eGABAY Digital Health & Social Welfare System',
  },
  {
    rank: 'Top 20',
    name: 'Philippine Startup Challenge XI (Region 10)',
    meta: 'Regional Pitching Competition Finalist · DICT & Startup PH',
  },
  {
    rank: '6th / 12',
    name: 'Hack4Gov 5 — Cybersecurity CTF',
    meta: '500 Points Captured · Team Phish & Chips · DICT',
  },
  {
    rank: 'Awarded',
    name: 'Tech-Tuesdays — MSME Digitalization Pitch',
    meta: 'Certificate of Appreciation · DICT Region 10 & DTI Philippines',
  },
]

interface DashboardProps {
  onOpenAchievements: () => void
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function AboutSection() {
  const aboutRef = useScrollReveal('[data-rv]', { y: 20, stagger: 0.08 })

  return (
    <section ref={aboutRef} id="about" className="sec sec-alt">
      <div className="container">
        <div className="sec-head-row" data-rv>
          <h2 className="display h-sec">About &amp; Technical Profile</h2>
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
              <h3 className="sub-heading">Education &amp; Milestones</h3>
              <div className="timeline-list">
                <div className="timeline-row">
                  <div>
                    <h4>Smart Barangay Health Monitoring Kiosk</h4>
                    <p>Defended IoT &amp; web capstone for basic vital signs assessment and BMI computation · CPSC &amp; RHU Mahinog</p>
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
                    <p>Actively seeking web development placement</p>
                  </div>
                  <span className="badge-neutral">Open</span>
                </div>

                <div className="timeline-row">
                  <div>
                    <h4>Senior High School — GAS Strand</h4>
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

export function AchievementsTeaser({ onOpenAchievements }: DashboardProps) {
  const winsRef = useScrollReveal('[data-rv]', { y: 20, stagger: 0.07 })

  return (
    <section ref={winsRef} className="sec sec-alt" aria-label="Competitions and achievements">
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
            onClick={onOpenAchievements}
          >
            View Photos &amp; Details
            <ArrowRightIcon />
          </button>
        </div>

        <div className="ach-ledger" data-rv>
          {competitionHighlights.map((item) => (
            <button
              key={item.name}
              type="button"
              className="ach-ledger-row"
              onClick={onOpenAchievements}
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
