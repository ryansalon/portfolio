export default function ThemeIcon({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {theme === 'dark' ? (
        <path d="M10 4.5a5.5 5.5 0 0 0 0 11z" fill="currentColor" />
      ) : (
        <>
          <circle cx="10" cy="10" r="2.4" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M10 1.6v2M10 16.4v2M1.6 10h2M16.4 10h2M4.1 4.1l1.4 1.4M14.5 14.5l1.4 1.4M15.9 4.1l-1.4 1.4M5.5 14.5l-1.4 1.4" />
          </g>
        </>
      )}
    </svg>
  )
}
