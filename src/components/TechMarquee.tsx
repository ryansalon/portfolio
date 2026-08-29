import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const techIcons = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML5' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS3' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', alt: 'PHP' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', alt: 'SQL' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', alt: 'GitHub', darkInvert: true },
  { src: '/assets/xampp.svg', alt: 'XAMPP' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg', alt: 'CodeIgniter' },
]

export default function TechMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeRef.current) return
    const anim = gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: 'none',
    })
    return () => { anim.kill() }
  }, [])

  return (
    <div style={{ padding: '48px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', overflow: 'hidden' }}>
      <div ref={marqueeRef} style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}>
        {[1, 2].map((setIndex) => (
          <div key={setIndex} style={{ display: 'flex', alignItems: 'center', gap: '128px', paddingRight: '128px' }}>
            {techIcons.map((icon) => (
              <img
                key={`${setIndex}-${icon.alt}`}
                src={icon.src}
                alt={icon.alt}
                loading="lazy"
                style={{ height: '48px', width: '48px', opacity: 0.7, transition: 'opacity .3s, transform .3s', ...(icon.darkInvert ? { filter: 'invert(1)' } : {}) }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.15)' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.transform = 'scale(1)' }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
