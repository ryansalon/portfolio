import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const EMAIL = 'ryanmarcsalon04@gmail.com'

function ArrowUpRightIcon() {
  return (
    <svg className="channel-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
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

export default function Contact() {
  const sectionRef = useScrollReveal('[data-rv]', { y: 20, stagger: 0.08 })
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      /* clipboard permission unavailable */
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="sec">
      <div className="container">
        <div className="contact-panel" data-rv>
          <div>
            <h2 className="display h-sec">Let&apos;s Talk</h2>
            <p className="contact-lead">
              I&apos;m finishing my 4th year of BSIT at Camiguin Polytechnic State College and actively looking for an OJT / internship where I can contribute and keep building useful software.
            </p>

            <div className="contact-actions">
              <a href={`mailto:${EMAIL}`} className="btn-primary">
                Send an Email
              </a>
              <button type="button" className="btn-secondary" onClick={handleCopy}>
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? 'Email Copied' : 'Copy Email'}</span>
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? 'Email address copied to clipboard.' : ''}
              </span>
            </div>
          </div>

          <div className="channel-list">
            <a href={`mailto:${EMAIL}`} className="channel-row">
              <span>
                Email
                <span className="channel-sub">{EMAIL}</span>
              </span>
              <ArrowUpRightIcon />
            </a>

            <a
              href="https://github.com/ryansalon"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-row"
            >
              <span>
                GitHub
                <span className="channel-sub">github.com/ryansalon</span>
              </span>
              <ArrowUpRightIcon />
            </a>

            <a
              href="https://www.facebook.com/rynn.merxx.56884"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-row"
            >
              <span>
                Facebook
                <span className="channel-sub">facebook.com/rynn.merxx.56884</span>
              </span>
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
