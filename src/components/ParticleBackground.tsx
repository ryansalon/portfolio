import { useEffect, useRef } from 'react'

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()'.split('')

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let nodes: { x: number; y: number; vy: number; char: string }[] = []
    let beams: { x: number; y: number; length: number; speed: number; opacity: number }[] = []
    let mouse = { x: -1000, y: -1000 }
    let raf: number

    function resize() {
      width = canvas!.clientWidth
      height = canvas!.clientHeight
      const dpr = window.devicePixelRatio || 1
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.scale(dpr, dpr)
    }

    function initParticles() {
      nodes = Array.from({ length: 90 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: Math.random() * 0.4 + 0.1,
        char: chars[Math.floor(Math.random() * chars.length)],
      }))
      beams = Array.from({ length: 25 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 6 + 3,
        opacity: Math.random() * 0.5 + 0.3,
      }))
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      beams.forEach((b) => {
        b.y -= b.speed
        if (b.y + b.length < 0) {
          b.y = height + 100
          b.x = Math.random() * width
        }
        const g = ctx!.createLinearGradient(b.x, b.y, b.x, b.y + b.length)
        g.addColorStop(0, `rgba(96, 165, 250, ${b.opacity})`)
        g.addColorStop(1, 'transparent')
        ctx!.strokeStyle = g
        ctx!.lineWidth = 1.5
        ctx!.beginPath()
        ctx!.moveTo(b.x, b.y)
        ctx!.lineTo(b.x, b.y + b.length)
        ctx!.stroke()
      })

      ctx!.font = '12px monospace'
      ctx!.textAlign = 'center'
      ctx!.textBaseline = 'middle'
      ctx!.lineWidth = 0.5

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const d = Math.hypot(n1.x - n2.x, n1.y - n2.y)
          if (d < 120) {
            ctx!.strokeStyle = `rgba(156, 163, 175, ${0.15 * (1 - d / 120)})`
            ctx!.beginPath()
            ctx!.moveTo(n1.x, n1.y)
            ctx!.lineTo(n2.x, n2.y)
            ctx!.stroke()
          }
        }
      }

      nodes.forEach((n) => {
        n.y += n.vy
        if (n.y > height + 20) {
          n.y = -20
          n.x = Math.random() * width
        }

        const dist = Math.hypot(mouse.x - n.x, mouse.y - n.y)

        if (dist < 180 || Math.random() > 0.98) {
          n.char = chars[Math.floor(Math.random() * chars.length)]
        }

        if (dist < 180) {
          ctx!.strokeStyle = `rgba(96, 165, 250, ${0.5 * (1 - dist / 180)})`
          ctx!.beginPath()
          ctx!.moveTo(n.x, n.y)
          ctx!.lineTo(mouse.x, mouse.y)
          ctx!.stroke()
        }

        ctx!.fillStyle = dist < 180 ? '#60A5FA' : 'rgba(156, 163, 175, 0.4)'
        ctx!.fillText(n.char, n.x, n.y)
      })

      raf = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    resize()
    initParticles()
    draw()

    window.addEventListener('resize', () => { resize(); initParticles() })
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', () => { resize(); initParticles() })
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
