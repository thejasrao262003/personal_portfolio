'use client'
// ── Scroll Progress Bar ──────────────────────────────────────
// Thin 2px line at the top of the page that fills as you scroll.
// Uses a requestAnimationFrame loop (not scroll events) for
// smoother performance on modern browsers.

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let rafId: number

    function update() {
      const scrolled = document.documentElement.scrollTop
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      if (bar) bar.style.width = pct + '%'
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      ref={barRef}
      id="scroll-progress"
      aria-hidden="true"
      style={{ width: '0%' }}
    />
  )
}
