// ============================================================
// ABOUT PAGE — app/about/page.tsx
// ============================================================

import type { Metadata } from 'next'
import { TypeWriter } from '@/components/ui/TypeWriter'
import { BentoGrid } from '@/components/about/BentoGrid'
import { RecognitionTable } from '@/components/about/RecognitionTable'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Thejas Rao — Backend Developer from Bengaluru. Fascinated by systems, scale, and cloud architecture.',
}

const TYPING_STRINGS = [
  'Curious Builder',
  'Backend Engineer',
  'Hackathon Winner',
  'Systems Learner',
]

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="page-hero" aria-label="About page introduction">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-headline">
            <span className="dim">A page </span>
            <span className="bright">About me.</span>
          </h1>
          <p className="hero-typing-line" aria-live="polite">
            <span className="prefix dim">I&apos;m a&nbsp;</span>
            <TypeWriter strings={TYPING_STRINGS} />
          </p>
          <p className="hero-subtext">
            I&apos;m fascinated by how systems scale, how infrastructure behaves under load,
            and how architectural decisions impact performance.
          </p>
        </div>
      </section>

      {/* Bento grid + Recognition */}
      <div className="page-content">
        <div className="section-header" style={{ marginBottom: 32 }}>
          <h2 className="section-title">The Details</h2>
          <sup className="section-count">(6)</sup>
        </div>

        <BentoGrid />
        <RecognitionTable />
      </div>
    </>
  )
}
