'use client'
// ── Work Grid ─────────────────────────────────────────────────
// Animated 2-column project grid with:
// - Staggered fade-in reveal on scroll
// - 3D tilt + magnetic title pull on hover
// - Dimming of non-hovered cards (context: is-hovering)
// - Scroll parallax on background typography
//
// All of these match your original work.html interactions
// but are written as a clean React component.

import { useEffect, useRef } from 'react'
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

interface WorkGridProps {
  projects: Project[]
}

const STATUS_CLASSES: Record<string, string> = {
  Production: '',
  Scalable: 'badge-scalable',
  Automation: 'badge-automation',
  Experimental: 'badge-experimental',
}

export function WorkGrid({ projects }: WorkGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.work-card'))

    // ── Staggered reveal ───────────────────────────────────────
    cards.forEach((card, i) => {
      card.style.opacity = '0'
      card.style.filter = 'blur(6px)'
      card.style.translate = '0 30px'
      card.style.transition = [
        `opacity 0.8s ease ${i * 0.06}s`,
        `filter 0.8s ease ${i * 0.06}s`,
        `translate 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
      ].join(', ')
    })

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const card = e.target as HTMLElement
          card.style.opacity = '1'
          card.style.filter = 'blur(0)'
          card.style.translate = '0 0'
          revealObs.unobserve(card)

          setTimeout(() => {
            card.style.transition =
              'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.4s ease, filter 0.4s ease'
          }, 1000)
        })
      },
      { threshold: 0.1 }
    )

    // ── Hover tilt + dim context ───────────────────────────────
    cards.forEach((card) => {
      const title = card.querySelector<HTMLElement>('.work-card-title')

      card.addEventListener('mouseenter', () => grid.classList.add('is-hovering'))
      card.addEventListener('mouseleave', () => {
        grid.classList.remove('is-hovering')
        card.style.transform = ''
        if (title) title.style.transform = ''
      })

      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const rx = ((y - cy) / cy) * 5
        const ry = ((x - cx) / cx) * -5
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`
        if (title) {
          title.style.transform = `translate(${((x - cx) / cx) * 3}px, ${((y - cy) / cy) * 3}px)`
        }
      })

      revealObs.observe(card)
    })

    // ── Scroll parallax for background text ───────────────────
    if (window.innerWidth > 768) {
      const onScroll = () => {
        cards.forEach((card, i) => {
          const bgText = card.querySelector<HTMLElement>('.card-bg-typography')
          if (bgText) {
            bgText.style.marginLeft = `${window.scrollY * 0.05}px`
          }
          if (i % 2 === 0) {
            card.style.marginTop = `${window.scrollY * 0.04}px`
          }
        })
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', onScroll)
        revealObs.disconnect()
      }
    }

    return () => revealObs.disconnect()
  }, [])

  return (
    <div ref={gridRef} className="work-grid">
      {projects.map((project) => (
        <article
          key={project.slug}
          className="work-card"
          onClick={() => window.open(project.link, '_blank')}
          role="link"
          tabIndex={0}
          aria-label={`${project.title} — ${project.status}`}
          onKeyDown={(e) => { if (e.key === 'Enter') window.open(project.link, '_blank') }}
        >
          {/* Decorative background text */}
          <div className="card-bg-typography" aria-hidden="true">
            {project.title.split(' ')[0].toUpperCase()}
          </div>

          {/* Project image */}
          {PROJECT_IMAGES[project.slug] ? (
            <div className="work-card-image" style={{ position: 'relative' }}>
              <Image
                src={PROJECT_IMAGES[project.slug]}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          ) : (
            <div className={`work-card-image ${project.grad}`} />
          )}

          {/* Card metadata */}
          <div className="work-card-meta">
            <div className="work-card-top-row">
              <h3 className="work-card-title">{project.title}</h3>
              <span className={`work-status-badge ${STATUS_CLASSES[project.status] ?? ''}`}>
                {project.status}
              </span>
            </div>

            <p className="work-card-tags">{project.tags.join(' / ')}</p>

            <div className="work-metrics-row">
              {project.metrics.join(' \u00a0\u2022\u00a0 ')}
            </div>

            <div className="work-card-hover-link">View Project →</div>
          </div>
        </article>
      ))}
    </div>
  )
}
