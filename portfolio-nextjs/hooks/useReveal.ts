'use client'
// ── useReveal ─────────────────────────────────────────────────
// Attaches an IntersectionObserver to all .reveal elements
// and adds .visible when they enter the viewport.
// Called once from the root layout so it runs on every page.

import { useEffect } from 'react'

export function useReveal() {
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    items.forEach((item) => obs.observe(item))
    return () => obs.disconnect()
  })
}
