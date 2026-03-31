'use client'
// ── Hero Parallax ─────────────────────────────────────────────
// Wraps hero content in a div that gently translates on scroll.
// Disabled on mobile. Separated so HeroSection stays a server component.

import { useEffect, useRef, type ReactNode } from 'react'

export function HeroParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.innerWidth <= 768) return
    const el = ref.current
    if (!el) return

    const handler = () => {
      el.style.transform = `translateY(${window.scrollY * 0.12}px)`
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div ref={ref} className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
      {children}
    </div>
  )
}
