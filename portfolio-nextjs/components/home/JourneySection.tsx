'use client'
// ── Journey / Timeline Section ────────────────────────────────
// Alternating image-text pairs with a growing progress line.
// Checkpoints activate as you scroll past each item.

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { JourneyItem } from '@/types'

interface JourneySectionProps {
  items: JourneyItem[]
}

export function JourneySection({ items }: JourneySectionProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const progressLine = progressRef.current
    if (!track || !progressLine) return

    const checkpoints = track.querySelectorAll<HTMLElement>('.tl-checkpoint')
    const tlItems = track.querySelectorAll<HTMLElement>('.tl-item')

    function update() {
      const rect = track!.getBoundingClientRect()
      const vh = window.innerHeight
      const triggerY = vh * 0.5

      const progressPx = triggerY - rect.top
      if (progressPx < 0) {
        progressLine!.style.height = '0%'
      } else if (progressPx > rect.height) {
        progressLine!.style.height = '100%'
      } else {
        progressLine!.style.height = ((progressPx / rect.height) * 100) + '%'
      }

      checkpoints.forEach((dot, i) => {
        const itemRect = tlItems[i]?.getBoundingClientRect()
        if (!itemRect) return
        const center = itemRect.top + itemRect.height / 2
        dot.classList.toggle('active', center < triggerY)
      })
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section id="journey-section" className="journey-section" aria-label="Career journey milestones">
      <div className="journey-header-top">
        <h2>
          What I&apos;ve <span>Built</span> &amp; What <span>Drives Me</span>
        </h2>
      </div>

      <div ref={trackRef} className="journey-track" id="journey-track">
        <div className="journey-timeline-line" aria-hidden="true" />
        <div ref={progressRef} className="journey-timeline-progress" aria-hidden="true" />

        {items.map((item, idx) => (
          <div
            key={item.title}
            className={`tl-item tl-${item.side}`}
          >
            <div className="tl-checkpoint" />

            <div className="tl-image-area">
              <Image
                src={item.image}
                alt={item.imageAlt}
                width={500}
                height={260}
                className="w-full rounded-xl object-cover"
                style={{ height: '260px' }}
              />
            </div>

            <div className="tl-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
