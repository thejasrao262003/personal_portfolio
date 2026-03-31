'use client'
// ── RevealObserver ────────────────────────────────────────────
// Mounts the IntersectionObserver for .reveal animations.
// This is a client component that renders nothing — it just
// runs the side effect. Placed once in the root layout.

import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal')
    if (!items.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    items.forEach((item) => obs.observe(item))
    return () => obs.disconnect()
  })

  return null
}
