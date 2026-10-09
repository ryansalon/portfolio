import { useEffect, useRef } from 'react'

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()'.split('')
const LINK_DIST = 120
const MOUSE_DIST = 180
const MAX_LINK_DIST_SQ = LINK_DIST * LINK_DIST
const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST
const CELL = LINK_DIST
const CONNECTIONS_PER_NODE = 6

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 0
    let height = 0
    let nodes: { x: number; y: number; vy: number; char: string }[] = []
    let beams: { x: number; y: number; length: number; speed: number; opacity: number }[] = []
    let mouse = { x: -1000, y: -1000 }
    let raf = 0
    let running = false

    function nodeCount() {
      const cores = navigator.hardwareConcurrency || 4
      if (cores <= 2) return 40
      if (cores <= 4) return 60
      return 90
    }

    function beamCount() {
      const cores = navigator.hardwareConcurrency || 4
      if (cores <= 4) return 12
      return 25
    }

    function resize() {
      width = canvas!.clientWidth
      height = canvas!.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function initParticles() {
      const n = nodeCount()
      const b = beamCount()
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: Math.random() * 0.4 + 0.1,
        char: chars[Math.floor(Math.random() * chars.length)],
      }))
      beams = Array.from({ length: b }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 6 + 3,
        opacity: Math.random() * 0.5 + 0.3,
      }))
    }

    function drawLinks() {
      const cols = Math.max(1, Math.ceil(width / CELL))
      const grid = new Map<number, number[]>()

      for (let i = 0; i < nodes.length; i++) {
        const cellX = Math.floor(nodes[i].x / CELL)
        const cellY = Math.floor(nodes[i].y / CELL)
        const key = cellY * cols + cellX
        let bucket = grid.get(key)
        if (!bucket) {
          bucket = []
          grid.set(key, bucket)
        }
        bucket.push(i)
      }

      ctx!.lineWidth = 0.5

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]
        const cellX = Math.floor(n1.x / CELL)
        const cellY = Math.floor(n1.y / CELL)
        let drawn = 0

        for (let oy = -1; oy <= 1 && drawn < CONNECTIONS_PER_NODE; oy++) {
          for (let ox = -1; ox <= 1 && drawn < CONNECTIONS_PER_NODE; ox++) {
            const bucket = grid.get((cellY + oy) * cols + (cellX + ox))
            if (!bucket) continue

            for (let k = 0; k < bucket.length && drawn < CONNECTIONS_PER_NODE; k++) {
              const j = bucket[k]
              if (j <= i) continue
              const n2 = nodes[j]
              const dx = n1.x - n2.x
              const dy = n1.y - n2.y
              const dSq = dx * dx + dy * dy
              if (dSq >= MAX_LINK_DIST_SQ) continue
              const d = Math.sqrt(dSq)
              ctx!.strokeStyle = `rgba(156, 163, 175, ${0.15 * (1 - d / LINK_DIST)})`
              ctx!.beginPath()
              ctx!.moveTo(n1.x, n1.y)
              ctx!.lineTo(n2.x, n2.y)
              ctx!.stroke()
              drawn++
            }
          }
        }
      }
    }

    function drawBeams() {
      ctx!.lineWidth = 1.5
      for (let i = 0; i < beams.length; i++) {
        const b = beams[i]
        b.y -= b.speed
        if (b.y + b.length < 0) {
          b.y = height + 100
          b.x = Math.random() * width
        }
        ctx!.strokeStyle = `rgba(96, 165, 250, ${b.opacity * 0.35})`
        ctx!.beginPath()
        ctx!.moveTo(b.x, b.y)
        ctx!.lineTo(b.x, b.y + b.length)
        ctx!.stroke()
      }
    }

    function drawNodes() {
      ctx!.font = '12px monospace'
      ctx!.textAlign = 'center'
      ctx!.textBaseline = 'middle'

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.y += n.vy
        if (n.y > height + 20) {
          n.y = -20
          n.x = Math.random() * width
        }

        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const distSq = dx * dx + dy * dy
        const nearMouse = distSq < MOUSE_DIST_SQ

        if (nearMouse || Math.random() > 0.98) {
          n.char = chars[Math.floor(Math.random() * chars.length)]
        }

        if (nearMouse) {
          const dist = Math.sqrt(distSq)
          ctx!.strokeStyle = `rgba(96, 165, 250, ${0.5 * (1 - dist / MOUSE_DIST)})`
          ctx!.beginPath()
          ctx!.moveTo(n.x, n.y)
          ctx!.lineTo(mouse.x, mouse.y)
          ctx!.stroke()
        }

        ctx!.fillStyle = nearMouse ? '#60A5FA' : 'rgba(156, 163, 175, 0.4)'
        ctx!.fillText(n.char, n.x, n.y)
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      drawBeams()
      drawLinks()
      drawNodes()
      if (running) raf = requestAnimationFrame(draw)
    }

    function start() {
      if (running || reducedMq.matches || document.visibilityState !== 'visible') return
      running = true
      raf = requestAnimationFrame(draw)
    }

    function stop() {
      running = false
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    function onResize() {
      resize()
      initParticles()
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function onVisibility() {
      if (document.visibilityState === 'visible') start()
      else stop()
    }

    function onMotionChange() {
      if (reducedMq.matches) {
        stop()
        ctx!.clearRect(0, 0, width, height)
      } else {
        start()
      }
    }

    resize()
    initParticles()
    if (reducedMq.matches) {
      ctx!.clearRect(0, 0, width, height)
    } else {
      start()
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    reducedMq.addEventListener('change', onMotionChange)

    return () => {
      stop()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibility)
      reducedMq.removeEventListener('change', onMotionChange)
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
