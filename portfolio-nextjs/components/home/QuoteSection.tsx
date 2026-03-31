'use client'
// ── Quote Section — Scroll-Highlight ─────────────────────────
// Words light up as you scroll through. Replicates your
// original word-reveal effect using span opacity changes.

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const QUOTE =
  "I love to inspire, because I know what it's like to be inspired. Seeing design work and having fun, that's what it's all about."

export function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const el = textRef.current
    if (!section || !el) return

    // Split into word spans
    const words = QUOTE.split(' ')
    el.innerHTML = words
      .map((w) => `<span class="quote-word">${w} </span>`)
      .join('')

    const wordSpans = el.querySelectorAll<HTMLSpanElement>('.quote-word')

    function update() {
      const rect = section!.getBoundingClientRect()
      const vh = window.innerHeight
      const startY = vh
      const endY = -(rect.height * 0.5)
      let progress = (startY - rect.top) / (startY - endY)
      progress = Math.max(0, Math.min(1, progress))

      const revealCount = Math.floor(progress * wordSpans.length * 1.5)
      wordSpans.forEach((span, i) => {
        span.style.opacity = i < revealCount ? '1' : '0.15'
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
    <section
      ref={sectionRef}
      className="quote-section"
      id="quote-section"
      aria-label="Personal statement"
    >
      <div className="quote-container">
        <h2 ref={textRef} className="quote-text">{QUOTE}</h2>
        <div className="quote-image-wrapper">
          <div className="quote-placeholder-img">
            <Image
              src="/assets/images/BIO.png"
              alt="Thejas Rao"
              width={400}
              height={300}
              className="rounded-xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
