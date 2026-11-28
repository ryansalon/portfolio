import { useEffect, useRef, useState } from 'react'

const EMAIL = 'ryanmarcsalon04@gmail.com'

interface WhyMePageProps {
  onBackHome: () => void
  onViewProjects: () => void
  onViewAchievements: () => void
}

const pillars = [
  {
    label: 'Track Record',
    title: 'I learn by shipping real software, not just finishing tutorials',
    body: 'Most of my skills come from building systems meant for actual users — including our defended IoT + web Barangay Health Monitor for RHU Mahinog, a campus outpatient clinic queue & EMR app, a municipal payroll system for LGU-Mahinog, a local bakeshop storefront, an interactive Camiguin map, and a campus voting platform.',
    proof: '6 completed web & IoT projects built since 2023',
  },
  {
    label: 'Startup & Users',
    title: 'Already used to real stakeholders, deadlines, and teamwork',
    body: 'Working as a developer at Internix IT Solutions — Camiguin’s first DICT-incubated startup — taught me how to build around real municipal and small-business needs. From staffing a 3-day exhibition booth with DICT Camiguin at 2026 RSTW to pitching live at regional startup competitions, I am comfortable communicating with both teammates and non-technical users.',
    proof: 'Developer at Internix IT Solutions · DICT Camiguin & Region 10 events',
  },
  {
    label: 'Technical Range',
    title: 'Practical foundation across frontend, backend, and databases',
    body: 'I work comfortably with React, Next.js, TypeScript, Tailwind CSS, and JavaScript on the frontend, and PHP, CodeIgniter, Node.js, and MySQL on the backend — plus integrating web dashboards with IoT hardware. If your team uses a different framework or workflow, I am willing to read the docs, ask smart questions, and ramp up quickly.',
    proof: 'React · Next.js · TypeScript · PHP · CodeIgniter · Node.js · MySQL',
  },
  {
    label: 'Work Ethic',
    title: 'Low ego, coachable, and willing to do the unglamorous work',
    body: 'I do not pretend to know everything as a graduating BSIT student. What I do bring is consistency: showing up prepared, taking code reviews seriously, testing edge cases, fixing responsive and UI details, and speaking up early when blocked so the team never gets surprised.',
    proof: 'Open to feedback, pair programming, and production engineering habits',
  },
]

const earlyContributions = [
  'Build clean, responsive UI screens and reusable components in React, Next.js, or Tailwind CSS.',
  'Implement CRUD modules, form validation, authentication flows, and MySQL queries in PHP, CodeIgniter, or Node.js.',
  'Track down layout bugs, mobile responsiveness issues, and accessibility gaps across existing pages.',
  'Turn wireframes or stakeholder notes into working prototypes fast so teams can test ideas early.',
]

const teamHabits = [
  'Ask clear, researched questions early instead of staying silently stuck for hours.',
  'Welcome direct code reviews and treat feedback as the fastest path to cleaner code.',
  'Keep commits focused, write readable code, and test changes on both desktop and mobile before handing off.',
  'Adapt smoothly to your existing codebase, Git workflow, and team conventions.',
]

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function WhyMePage({
  onBackHome,
  onViewProjects,
  onViewAchievements,
}: WhyMePageProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  const handleCopy = async () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopyState('copied')
      timerRef.current = window.setTimeout(() => setCopyState('idle'), 2400)
    } catch {
      setCopyState('error')
      timerRef.current = window.setTimeout(() => setCopyState('idle'), 4500)
    }
  }

  return (
    <section className="why-page">
      <div className="container">
        <div className="ach-top-bar">
          <button type="button" className="btn-secondary" onClick={onBackHome}>
            <ArrowLeftIcon />
            Back to Portfolio
          </button>
        </div>

        <header className="why-hero">
          <h1 className="display h-sec">Why Work With Me</h1>
          <p className="why-lead">
            Bringing on an OJT intern or junior web developer is a bet on how fast they learn, how reliably they ship, and how well they work with your team. Here is an honest breakdown of what I bring from day one — grounded in what I have actually built.
          </p>
        </header>

        <div className="why-pillars" aria-label="Reasons to work with Ryan">
          {pillars.map((pillar) => (
            <article key={pillar.label} className="why-pillar-row">
              <div className="why-pillar-meta">
                <span className="why-pillar-label">{pillar.label}</span>
              </div>
              <div className="why-pillar-body">
                <h2 className="display h-md">{pillar.title}</h2>
                <p>{pillar.body}</p>
                <span className="mono-meta why-pillar-proof">{pillar.proof}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="why-fit-grid">
          <section className="why-fit-panel" aria-labelledby="contribute-heading">
            <h2 id="contribute-heading" className="display h-md">
              Where I Can Contribute Early
            </h2>
            <ul className="why-check-list">
              {earlyContributions.map((item) => (
                <li key={item}>
                  <span className="why-bullet" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="why-fit-panel" aria-labelledby="habits-heading">
            <h2 id="habits-heading" className="display h-md">
              How I Work With a Team
            </h2>
            <ul className="why-check-list">
              {teamHabits.map((item) => (
                <li key={item}>
                  <span className="why-bullet" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="why-cta-panel" aria-labelledby="why-cta-heading">
          <div>
            <h2 id="why-cta-heading" className="display h-md">
              Looking for an OJT intern or junior web developer?
            </h2>
            <p className="why-cta-copy">
              I&apos;d love to hear about your team, walk you through any of my projects, and see how I can help.
            </p>
            <div className="contact-actions">
              <a href={`mailto:${EMAIL}`} className="btn-primary">
                Send an Email
              </a>
              <button type="button" className="btn-secondary" onClick={handleCopy}>
                {copyState === 'copied' ? <CheckIcon /> : <CopyIcon />}
                <span>{copyState === 'copied' ? 'Email Copied' : 'Copy Email'}</span>
              </button>
            </div>
            <p className="copy-feedback" role="status" aria-live="polite">
              {copyState === 'copied'
                ? `Copied ${EMAIL} to your clipboard.`
                : copyState === 'error'
                  ? `Clipboard access was blocked — you can reach me directly at ${EMAIL}.`
                  : ''}
            </p>
          </div>

          <div className="why-cta-links">
            <button type="button" className="channel-row" onClick={onViewProjects}>
              <span>
                Inspect Shipped Projects
                <span className="channel-sub">6 real web &amp; IoT systems</span>
              </span>
              <ArrowRightIcon />
            </button>

            <button type="button" className="channel-row" onClick={onViewAchievements}>
              <span>
                View Competitions &amp; Awards
                <span className="channel-sub">DICT, DOST RSTW, PSC XI &amp; Hack4Gov</span>
              </span>
              <ArrowRightIcon />
            </button>
          </div>
        </section>
      </div>
    </section>
  )
}
