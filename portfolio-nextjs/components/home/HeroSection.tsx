// ── Hero Section ──────────────────────────────────────────────
// Left column: headline + typewriter + subtext
// Right column: interactive 3D lanyard (desktop only, client-only)

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { TypeWriter } from '@/components/ui/TypeWriter'
import { HeroParallax } from './HeroParallax'

// Three.js must never SSR — dynamically import with ssr: false
const Lanyard = dynamic(() => import('@/components/ui/Lanyard'), { ssr: false })

const TYPING_STRINGS = [
  'Backend Developer',
  'Software Engineer',
  'Systems Enthusiast',
  'Cloud & Automation Builder',
  'Always Learning',
]

export function HeroSection() {
  return (
    <section className="hero hero-split" aria-label="Introduction">
      <div className="hero-glow" aria-hidden="true" />

      {/* ── Left: text ────────────────────────────────────── */}
      <div className="hero-text-col">
        <HeroParallax>
          <h1 className="hero-headline">
            <span className="dim">Hey, I&apos;m </span>
            <span className="bright">Thejas.</span>
          </h1>

          <p className="hero-typing-line" aria-live="polite">
            <span className="prefix dim">I&apos;m a&nbsp;</span>
            <TypeWriter strings={TYPING_STRINGS} />
          </p>

          <p className="hero-subtext">
            I enjoy building scalable backend systems, exploring cloud infrastructure,
            and experimenting with automation and agentic workflows.
          </p>

          <p className="hero-drag-hint" aria-hidden="true">Drag the card →</p>
        </HeroParallax>

        {/* Scroll indicator sits under the text */}
        <div className="scroll-indicator" aria-hidden="true">
          <svg viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.75" y="0.75" width="18.5" height="26.5" rx="9.25" stroke="currentColor" strokeWidth="1.5" />
            <rect x="9" y="6" width="2" height="5" rx="1" fill="currentColor">
              <animate attributeName="y" values="6;10;6" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="1.8s" repeatCount="indefinite" />
            </rect>
          </svg>
          <span>Scroll</span>
        </div>
      </div>

      {/* ── Right: 3D lanyard (hidden on mobile) ──────────── */}
      <div className="hero-lanyard-col" aria-hidden="true">
        <Suspense fallback={null}>
          <Lanyard position={[0, 0, 15]} fov={22} />
        </Suspense>
      </div>
    </section>
  )
}
