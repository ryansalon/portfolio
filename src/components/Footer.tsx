import { usePrefersReducedMotion } from '../hooks/useReducedMotion'
import { scrollToTop } from '../lib/scroll'

function ArrowUpIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  )
}

export default function Footer() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-inner">
          <p style={{ margin: 0 }}>
            &copy; 2026 Ryan Marc L. Salon &middot; Poblacion, Mahinog, Camiguin, Philippines
          </p>
          <button
            type="button"
            className="foot-top"
            onClick={() => scrollToTop(reducedMotion)}
          >
            Back to top
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  )
}
