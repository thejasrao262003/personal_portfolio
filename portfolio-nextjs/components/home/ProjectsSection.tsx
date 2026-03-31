'use client'
// ── Projects Section — Sticky Flip Carousel ───────────────────
// Replicates your original scroll-driven X-axis flip animation.
//
// HOW IT WORKS:
// 1. The outer <section> is very tall (500vh) — this gives the
//    sticky panel room to pin while the user scrolls.
// 2. The sticky panel stays at top: 0 as the section scrolls.
// 3. We measure scroll progress (0→1) within the section height.
// 4. Progress is divided into COUNT equal slots, one per project.
// 5. Within each slot, a rotateX flip (0→90→-90→0) swaps content
//    at the 90° midpoint (edge-on = invisible).
// 6. The marquee text and counter update with each swap.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/types'

const PROJECT_IMAGES: Record<string, string> = {
  'kantara-contest-backend':      '/assets/images/home_page_projects/Kantara.png',
  'agri-predict-v2':              '/assets/images/home_page_projects/AgriPredict.png',
  'mcp-agentic-ec2':              '/assets/images/home_page_projects/AWS MCP.png',
  'a-lister-amazon-automation':   '/assets/images/home_page_projects/ALister.png',
  'narratron':                    '/assets/images/home_page_projects/Narratron.png',
  'shopperb2b-store':             '/assets/images/home_page_projects/ShopperrB2B.png',
  'naya-global-sourcing':         '/assets/images/home_page_projects/NayaGlobal.png',
  'go-experiments':               '/assets/images/home_page_projects/Go.png',
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const COUNT = projects.length

  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    const card = cardRef.current
    const marquee = marqueeRef.current
    if (!section || !sticky || !card || COUNT === 0) return

    let lastIdx = -1

    function update() {
      const rect = section!.getBoundingClientRect()
      const sectionH = section!.offsetHeight
      const vh = window.innerHeight
      const scrollTop = window.scrollY

      // Sticky pinning (replaces CSS position:sticky for precise control)
      const sectionTop = scrollTop + rect.top
      const sectionBot = sectionTop + sectionH

      if (scrollTop < sectionTop) {
        sticky!.style.position = 'relative'
        sticky!.style.top = '0'
      } else if (scrollTop + vh > sectionBot) {
        sticky!.style.position = 'absolute'
        sticky!.style.bottom = '0'
        sticky!.style.top = 'auto'
      } else {
        sticky!.style.position = 'fixed'
        sticky!.style.top = '0'
        sticky!.style.bottom = 'auto'
      }

      // Scroll progress within section
      const total = sectionH - vh
      if (total <= 0) return

      const scrolled = Math.max(0, Math.min(scrollTop - sectionTop, total))
      const progress = scrolled / total

      const rawSlot = progress * COUNT
      let slot = Math.floor(rawSlot)
      let localT = rawSlot - slot

      if (slot >= COUNT) { slot = COUNT - 1; localT = 1 }

      // Flip thresholds
      const FLIP_START = 0.05
      const MID = 0.5
      const FLIP_END = 0.95

      let angle = 0
      let projIdx = slot

      if (slot < COUNT - 1) {
        if (localT < FLIP_START) {
          angle = 0
          projIdx = slot
        } else if (localT < MID) {
          const t = (localT - FLIP_START) / (MID - FLIP_START)
          angle = t * 90
          projIdx = slot
        } else if (localT < FLIP_END) {
          const t = (localT - MID) / (FLIP_END - MID)
          angle = -90 + t * 90
          projIdx = slot + 1
        } else {
          angle = 0
          projIdx = slot + 1
        }
      } else {
        angle = 0
        projIdx = COUNT - 1
      }

      // Only update DOM when project changes
      if (projIdx !== lastIdx) {
        lastIdx = projIdx
        setCurrent(projIdx)

        // Reset + restart marquee animation
        if (marquee) {
          marquee.style.animation = 'none'
          requestAnimationFrame(() => { marquee.style.animation = '' })
        }
      }

      card!.style.transform = `perspective(1200px) rotateX(${angle}deg)`
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [COUNT])

  if (COUNT === 0) return null

  const project = projects[current]

  return (
    <section
      ref={sectionRef}
      id="proj-section"
      className="proj-section"
      aria-label="Featured projects"
      style={{ height: '500vh' }}
    >
      <div
        ref={stickyRef}
        className="proj-sticky"
        style={{ width: '100%', height: '100vh', position: 'fixed', top: 0 }}
      >
        {/* Scrolling marquee background */}
        <div className="proj-bg-marquee" aria-hidden="true">
          <div ref={marqueeRef} className="proj-marquee-track">
            {project.marquee + project.marquee}
          </div>
        </div>

        {/* Section header */}
        <div className="proj-header">
          <h2>Selected Work</h2>
          <sup>({COUNT})</sup>
        </div>

        {/* Flip card */}
        <div className="proj-deck">
          <div
            ref={cardRef}
            className="proj-card"
            onClick={() => window.open(project.link, '_blank')}
            style={{ transformOrigin: 'center', cursor: 'pointer' }}
            role="link"
            tabIndex={0}
            aria-label={`View ${project.title}`}
            onKeyDown={(e) => { if (e.key === 'Enter') window.open(project.link, '_blank') }}
          >
            {PROJECT_IMAGES[project.slug] ? (
              <div className="proj-card-image" style={{ position: 'relative', overflow: 'hidden' }}>
                <Image
                  src={PROJECT_IMAGES[project.slug]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="520px"
                />
              </div>
            ) : (
              <div className={`proj-card-image ${project.grad}`} />
            )}
            <div className="proj-card-info">
              <h3 className="proj-card-title">{project.title}</h3>
              {project.description && (
                <p className="proj-card-desc">{project.description}</p>
              )}
              <div className="proj-card-tags tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Counter + see all */}
        <div className="proj-footer">
          <div className="proj-counter">
            <span>{current + 1}</span> / {COUNT}
          </div>
          <Link href="/work" className="proj-see-all">
            See all work
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
