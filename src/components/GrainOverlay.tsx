import { useEffect, useRef } from 'react'

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function GrainOverlay() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const S = 180
    const canvas = document.createElement('canvas')
    canvas.width = S
    canvas.height = S
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.createImageData(S, S)
    const data = imageData.data
    const rng = mulberry32(9)

    for (let i = 0; i < S * S; i++) {
      const v = 110 + rng() * 90
      data[i * 4] = v
      data[i * 4 + 1] = v
      data[i * 4 + 2] = v
      data[i * 4 + 3] = 255
    }

    ctx.putImageData(imageData, 0, 0)

    if (ref.current) {
      ref.current.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
    }
  }, [])

  return <div ref={ref} id="grain" />
}
