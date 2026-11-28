import { useCallback, useEffect, useRef, useState } from 'react'
import { trapFocusOnTab } from '../lib/focusTrap'
import { pauseScroll, resumeScroll, scrollToSection } from '../lib/scroll'

interface CompetitionPhoto {
  src: string
  alt: string
  caption: string
}

interface Competition {
  id: string
  title: string
  organizer: string
  team: string
  placement: string
  score: string
  summary: string
  highlights: { value: string; label: string }[]
  photos: CompetitionPhoto[]
}

/** Add more competitions here — they render automatically on this page */
const competitions: Competition[] = [
  {
    id: 'outstanding-youth-innovators',
    title: 'Outstanding Youth Innovators Award',
    organizer: 'DICT Camiguin · Awarded by Engr. James Kevin M. Sagocsoc (Provincial Officer)',
    team: 'Internix IT Solutions',
    placement: 'Pioneering Startup Award',
    score: 'June 25, 2026',
    summary:
      'Presented to Internix by the Provincial Officer of DICT Camiguin at Camiguin Polytechnic State College in recognition of our historic milestone as the pioneering tech startup of Camiguin — from incubation under DICT Camiguin to scaling up into the province’s premier youth-led ICT startup.',
    highlights: [
      { value: '1st Startup', label: 'Pioneering Tech Startup in Camiguin' },
      { value: 'DICT Camiguin', label: 'Provincial Officer Recognition' },
      { value: 'June 2026', label: 'Awarded at CPSC, Mambajao' },
    ],
    photos: [
      {
        src: '/assets/awards/outstanding-youth-innovators.jpg',
        alt: 'Outstanding Youth Innovators Award plaque presented to Internix by Engr. James Kevin M. Sagocsoc, Provincial Officer of DICT Camiguin',
        caption: 'Outstanding Youth Innovators Award presented to Internix by DICT Camiguin Provincial Officer Engr. James Kevin M. Sagocsoc',
      },
    ],
  },
  {
    id: 'reverse-pitching',
    title: 'Annual Reverse Pitching — Champion',
    organizer: 'Regional Reverse Pitching Competition',
    team: 'CTRL+Ventures',
    placement: 'Winner · 1st / 9 Teams',
    score: 'eGABAY Pitch',
    summary:
      'Won 1st place out of 9 competing teams as CTRL+Ventures by pitching eGABAY: An Integrated Digital Health and Social Welfare System — addressing real community service gaps with a unified digital platform for local health and welfare workflows.',
    highlights: [
      { value: '1st / 9', label: 'Champion Placement' },
      { value: 'eGABAY', label: 'Winning Pitch Concept' },
      { value: 'Awarded', label: 'Winning Certificate' },
    ],
    photos: [
      {
        src: '/assets/reverse-pitching/pitch.jpg',
        alt: 'CTRL+Ventures presenting eGABAY: An Integrated Digital Health and Social Welfare System on stage',
        caption: 'Pitching eGABAY: An Integrated Digital Health and Social Welfare System',
      },
      {
        src: '/assets/reverse-pitching/awarding-1.jpg',
        alt: 'Ryan holding the winning certificate center-stage with teammates and panelists',
        caption: 'Receiving the winning award on stage with the judging panel',
      },
      {
        src: '/assets/reverse-pitching/team-table.jpg',
        alt: 'Ryan and fellow CPSC classmates participating in the Annual Reverse Pitching sessions',
        caption: 'With fellow CPSC classmates participating in the competition',
      },
      {
        src: '/assets/reverse-pitching/prep.jpg',
        alt: 'Ryan and teammate reviewing their pitch deck on a laptop before presenting',
        caption: 'Final pitch review and technical check before stepping on stage',
      },
      {
        src: '/assets/reverse-pitching/awarding-2.jpg',
        alt: 'Full awarding ceremony group photo with organizers, judges, and winning team',
        caption: 'Awarding ceremony with organizers and fellow panelists',
      },
      {
        src: '/assets/reverse-pitching/bts.jpg',
        alt: 'Candid behind-the-scenes moment of the team captured through a camera viewfinder',
        caption: 'Behind-the-scenes moment captured during the event',
      },
    ],
  },
  {
    id: 'rstw-2026',
    title: '2026 RSTW — 3-Day Startup Exhibitor',
    organizer: 'DOST Northern Mindanao · Partnered with DICT Camiguin',
    team: 'Internix IT Solutions (DICT-Incubated Startup)',
    placement: '3-Day Exhibitor',
    score: 'Plaque of Appreciation',
    summary:
      'Participated for 3 full days at the 2026 Regional Science, Technology, and Innovation Week (RSTW) in Mambajao, Camiguin as a developer representing Internix IT Solutions — Camiguin’s first DICT-incubated startup building systems for LGUs and MSMEs. Partnered directly with DICT Camiguin in a shared exhibition booth and received the DOST Plaque of Appreciation.',
    highlights: [
      { value: '3 Days', label: 'Regional Tech Exhibition' },
      { value: 'DICT Partner', label: 'Shared Booth in Camiguin' },
      { value: 'Plaque', label: 'DOST Appreciation Award' },
    ],
    photos: [
      {
        src: '/assets/rstw/booth-plaque.jpg',
        alt: '2026 RSTW Plaque of Appreciation held in front of the Internix IT Solutions and DICT Camiguin exhibition booth',
        caption: 'Internix IT Solutions & DICT Camiguin booth with the 2026 RSTW Plaque of Appreciation',
      },
      {
        src: '/assets/rstw/booth-full.jpg',
        alt: 'Full view of the shared Internix IT Solutions and DICT Camiguin exhibition booth at 2026 RSTW',
        caption: 'Our shared Internix IT Solutions & DICT Camiguin exhibition booth during the 3-day RSTW event',
      },
      {
        src: '/assets/rstw/stage-1.jpg',
        alt: 'Internix IT Solutions team on stage at 2026 RSTW holding the Plaque of Appreciation',
        caption: 'Team on the 2026 RSTW stage celebrating our 3-day exhibition showcase',
      },
      {
        src: '/assets/rstw/stage-2.jpg',
        alt: 'Team celebrating under the stage lights with the 2026 RSTW trophy plaque',
        caption: 'Closing night with the 2026 RSTW DOST appreciation award',
      },
    ],
  },
  {
    id: 'psc-xi',
    title: 'Philippine Startup Challenge XI (R10)',
    organizer: 'DICT · ICT Industry Development Bureau (IIDB) · Startup PH',
    team: 'Regional Pitching Competition — Region 10',
    placement: 'Top 20 Finalist',
    score: 'Region 10',
    summary:
      'Represented Camiguin Polytechnic State College at the Philippine Startup Challenge XI Regional Pitching Competition for Region 10, advancing into the Top 20 Finalists (in no particular order) and pitching live on stage before regional startup judges.',
    highlights: [
      { value: 'Top 20', label: 'Regional Finalist (R10)' },
      { value: 'PSC XI', label: 'DICT & Startup PH' },
      { value: 'Awarded', label: 'Certificate of Participation' },
    ],
    photos: [
      {
        src: '/assets/psc-xi/stage-awarding.jpg',
        alt: 'Team receiving Certificates of Participation on stage under the Philippine Startup Challenge XI banner',
        caption: 'On stage receiving Certificates of Participation at PSC XI Region 10',
      },
      {
        src: '/assets/psc-xi/pitch-1.jpg',
        alt: 'Team presenting their startup pitch at the auditorium podium',
        caption: 'Delivering our startup pitch live on stage before the Region 10 panel',
      },
      {
        src: '/assets/psc-xi/pitch-2.jpg',
        alt: 'Teammates running slides and answering during the live pitch presentation',
        caption: 'Walking judges through the pitch deck and product demo',
      },
      {
        src: '/assets/psc-xi/walkout.jpg',
        alt: 'Team walking down the auditorium aisle toward the stage before pitching',
        caption: 'Heading down the auditorium stairs to take the stage',
      },
    ],
  },
  {
    id: 'hack4gov',
    title: 'Hack4Gov 5',
    organizer: 'Department of Information and Communications Technology (DICT)',
    team: 'Team Phish & Chips',
    placement: '6th Place / 12 Teams',
    score: '500 Points',
    summary:
      'Competed in DICT’s Hack4Gov 5 cybersecurity Capture the Flag competition alongside my teammates from Camiguin Polytechnic State College. Working under tight time pressure across live challenges, our team captured 500 points to place 6th out of 12 competing teams.',
    highlights: [
      { value: '500 pts', label: 'Points Captured' },
      { value: '6th / 12', label: 'Final Team Rank' },
      { value: 'Awarded', label: 'Certificate of Participation' },
    ],
    photos: [
      {
        src: '/assets/hack4gov/awarding.jpg',
        alt: 'Team receiving certificates on stage during the Hack4Gov 5 awarding ceremony',
        caption: 'Awarding of certificates on stage with DICT organizers',
      },
      {
        src: '/assets/hack4gov/focus.jpg',
        alt: 'Ryan focused at his laptop working through a Hack4Gov challenge',
        caption: 'Locked in during the live Capture the Flag rounds',
      },
      {
        src: '/assets/hack4gov/team.jpg',
        alt: 'Full Team Phish & Chips group photo at the competition table',
        caption: 'Team Phish & Chips at the Hack4Gov 5 arena',
      },
      {
        src: '/assets/hack4gov/collab.jpg',
        alt: 'Teammates collaborating closely over a laptop during the competition',
        caption: 'Debugging and analyzing challenge clues together',
      },
      {
        src: '/assets/hack4gov/strategy.jpg',
        alt: 'Team members discussing strategy across laptops during Hack4Gov',
        caption: 'Coordinating strategy and dividing challenges across the team',
      },
    ],
  },
  {
    id: 'tech-tuesdays',
    title: 'Tech-Tuesdays — MSME Digitalization Pitch',
    organizer: 'DICT Region 10 & DTI Philippines',
    team: 'CPSC Student Presenters',
    placement: 'Certificate of Appreciation',
    score: 'MSME Pitch',
    summary:
      'Pitched a practical digitalization solution directly to local Micro, Small, and Medium Enterprises (MSMEs) during the DICT 10 and DTI 10 Tech-Tuesdays session — helping local business owners explore digital tools and workflows to modernize their operations.',
    highlights: [
      { value: 'MSMEs', label: 'Local Business Audience' },
      { value: 'DICT & DTI', label: 'Partner Agencies' },
      { value: 'Awarded', label: 'Certificate of Appreciation' },
    ],
    photos: [
      {
        src: '/assets/tech-tuesday/certificate.jpg',
        alt: 'Team holding the Certificate of Appreciation with a DICT representative in front of the Tech-Tuesdays screen',
        caption: 'Receiving the Certificate of Appreciation alongside DICT Region 10',
      },
      {
        src: '/assets/tech-tuesday/session.jpg',
        alt: 'Wide view of the Tech-Tuesdays pitching session with local MSME attendees at DTI',
        caption: 'Presenting our digitalization pitch to local MSMEs at the DTI venue',
      },
    ],
  },
]

interface AchievementsPageProps {
  onBackHome: () => void
  targetId?: string | null
  onTargetConsumed?: () => void
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
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

export default function AchievementsPage({
  onBackHome,
  targetId,
  onTargetConsumed,
}: AchievementsPageProps) {
  const [lightbox, setLightbox] = useState<{ photos: CompetitionPhoto[]; index: number } | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)
  const isLightboxOpen = Boolean(lightbox)

  useEffect(() => {
    if (!targetId) return
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(targetId)
      if (el) scrollToSection(el, -88)
      onTargetConsumed?.()
    })
    return () => cancelAnimationFrame(raf)
  }, [targetId, onTargetConsumed])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  useEffect(() => {
    if (!isLightboxOpen) {
      if (lastTriggerRef.current) {
        lastTriggerRef.current.focus()
        lastTriggerRef.current = null
      }
      return
    }

    document.body.classList.add('modal-open')
    pauseScroll()
    closeBtnRef.current?.focus()

    return () => {
      document.body.classList.remove('modal-open')
      resumeScroll()
    }
  }, [isLightboxOpen])

  useEffect(() => {
    if (!isLightboxOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        setLightbox((prev) =>
          prev && prev.photos.length > 1
            ? { ...prev, index: (prev.index - 1 + prev.photos.length) % prev.photos.length }
            : prev
        )
      } else if (e.key === 'ArrowRight') {
        setLightbox((prev) =>
          prev && prev.photos.length > 1
            ? { ...prev, index: (prev.index + 1) % prev.photos.length }
            : prev
        )
      } else {
        trapFocusOnTab(e, dialogRef.current)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isLightboxOpen, closeLightbox])

  const openPhoto = (photos: CompetitionPhoto[], index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger
    setLightbox({ photos, index })
  }

  return (
    <section className="ach-page">
      <div className="container">
        <div className="ach-top-bar">
          <button type="button" className="btn-secondary" onClick={onBackHome}>
            <ArrowLeftIcon />
            Back to Portfolio
          </button>
        </div>

        <header className="ach-hero">
          <h1 className="display h-sec">Competitions &amp; Achievements</h1>
          <p className="sec-intro">
            Competitions joined, team placements, and milestones earned beyond regular coursework.
          </p>
        </header>

        <div className="comp-list">
          {competitions.map((comp, compIdx) => (
            <article key={comp.id} id={comp.id} className="comp-card">
              <div className="comp-head">
                <div>
                  <h2 className="display h-md">{comp.title}</h2>
                  <p className="comp-org">
                    {comp.organizer} &middot; {comp.team}
                  </p>
                </div>

                <div className="comp-badges">
                  <span className="badge-accent">{comp.placement}</span>
                  <span className="badge-neutral">{comp.score}</span>
                </div>
              </div>

              <p className="comp-summary">{comp.summary}</p>

              <div className="comp-stats">
                {comp.highlights.map((item) => (
                  <div key={item.label} className="comp-stat-box">
                    <b>{item.value}</b>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              <div
                className={`comp-photo-grid${
                  comp.photos.length === 1
                    ? ' is-single'
                    : comp.photos.length === 2
                      ? ' is-duo'
                      : comp.photos.length === 3
                        ? ' is-trio'
                        : comp.photos.length === 4
                          ? ' is-quad'
                          : comp.photos.length === 6
                            ? ' is-six'
                            : ''
                }`}
              >
                {comp.photos.map((photo, idx) => (
                  <button
                    key={photo.src}
                    type="button"
                    className={`comp-photo-tile${comp.photos.length === 5 && idx === 0 ? ' is-featured' : ''}`}
                    onClick={(e) => openPhoto(comp.photos, idx, e.currentTarget)}
                    aria-label={`View full photo: ${photo.caption}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading={compIdx === 0 && idx === 0 ? 'eager' : 'lazy'}
                    />
                    <span className="comp-photo-caption">{photo.caption}</span>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Competition photo viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox()
          }}
        >
          <div ref={dialogRef} className="modal-dialog">
            <div className="modal-head">
              <p className="modal-caption">
                {lightbox.photos[lightbox.index].caption} ({lightbox.index + 1}/{lightbox.photos.length})
              </p>
              <button
                ref={closeBtnRef}
                type="button"
                className="modal-close"
                onClick={closeLightbox}
                aria-label="Close photo viewer"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-media modal-media-stage">
              <img
                src={lightbox.photos[lightbox.index].src}
                alt={lightbox.photos[lightbox.index].alt}
              />
            </div>

            {lightbox.photos.length > 1 && (
              <div className="modal-nav-spread">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() =>
                    setLightbox((prev) =>
                      prev
                        ? { ...prev, index: (prev.index - 1 + prev.photos.length) % prev.photos.length }
                        : null
                    )
                  }
                >
                  <ChevronLeftIcon />
                  Previous
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() =>
                    setLightbox((prev) =>
                      prev ? { ...prev, index: (prev.index + 1) % prev.photos.length } : null
                    )
                  }
                >
                  Next
                  <ChevronRightIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
