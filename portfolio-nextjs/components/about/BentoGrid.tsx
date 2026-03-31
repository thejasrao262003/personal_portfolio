'use client'
// ── About Bento Grid ─────────────────────────────────────────
// The bento layout from about.html — profile, bio, clock,
// status, skills, stats, blogs, tools.
// LiveClock needs client-side timer, rest is mostly static.

import { useEffect, useState } from 'react'
import Image from 'next/image'

const SKILLS = [
  'Python', 'C++', 'FastAPI', 'AWS', 'Lambda', 'ECS', 'SQS', 'EC2',
  'API Gateway', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Redis',
  'LangChain', 'LangGraph', 'MCP', 'Git', 'Linux', 'Go (Learning)',
  'Celery', 'Locust',
]

const TOOLS = [
  'VS Code', 'Neovim', 'AWS Console', 'Postman',
  'TablePlus', 'Obsidian', 'Figma', 'Linear',
]

const BLOGS = [
  { title: 'FastAPI Deployment on ECS + API Gateway', views: '~1.5K views' },
  { title: 'Production Microservices Architecture Patterns', views: '~800 views' },
  { title: 'Redis Internals & Memory Model Deep Dive', views: '~600 views' },
]

function LiveClock() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    function tick() {
      const now = new Date()
      const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
      const h = String(ist.getHours()).padStart(2, '0')
      const m = String(ist.getMinutes()).padStart(2, '0')
      const s = String(ist.getSeconds()).padStart(2, '0')
      setTime(`${h}:${m}:${s}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <div id="live-clock">{time}</div>
}

// Animated counter using IntersectionObserver
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useState(() => ({ current: false }))[0]

  useEffect(() => {
    const el = document.querySelector(`[data-stat="${value}"]`)
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || ref.current) return
        ref.current = true

        const duration = 1600
        const start = performance.now()
        function step(now: number) {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(value * eased))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="stat-number" data-stat={value}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export function BentoGrid() {
  return (
    <div className="bento-grid">

      {/* ── Profile Card ──────────────────────────────────── */}
      <div className="bento-card b-photo" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0, overflow: 'hidden' }}>
        <div style={{ position: 'relative', flex: 1, minHeight: 260 }}>
          <Image
            src="/assets/images/profile.png"
            alt="Thejas Rao"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 50vw, 380px"
            priority
          />
        </div>
        <div style={{ padding: '16px 20px' }}>
          <div className="location-chip">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1C3.34 1 2 2.34 2 4c0 2.25 3 5 3 5s3-2.75 3-5c0-1.66-1.34-3-3-3zm0 4.1A1.1 1.1 0 1 1 5 2.9a1.1 1.1 0 0 1 0 2.2z" fill="currentColor" />
            </svg>
            Bengaluru, India
          </div>
          <div className="live-status">
            <div className="live-dot" />
            Building
          </div>
        </div>
      </div>

      {/* ── Bio Card ──────────────────────────────────────── */}
      <div className="bento-card b-bio ">
        <div className="bento-label">Me in Brief</div>
        <h3>Backend-focused engineer</h3>
        <p className="bio-text">
          I like building backend systems that don&apos;t break — and that actually move metrics.
        </p>
        <p className="bio-text">
          Right now, I&apos;m focused on backend engineering, complex systems, cloud infrastructure,
          and agentic workflows — the kind of problems where small architectural decisions have
          real consequences at scale.
        </p>
        <p className="bio-text">
          My work has helped power systems handling 20k+ concurrent users, reduced failure rates
          to under 1% during peak traffic, and accelerated parallel processing pipelines by up
          to 50x. I&apos;ve contributed to infrastructure optimizations that improved resource
          utilization while sustaining reliability under load.
        </p>
        <p className="bio-text">
          I care about clean abstractions, measurable impact, and systems that hold up in
          production — not just in theory.
        </p>
        <p className="bio-text">
          When I&apos;m not at a terminal, I&apos;m usually at a trailhead or on a long bike ride.
          I like hard climbs — in code and in real life. I vibe code most of the UI/Frontend.
        </p>
      </div>

      {/* ── Clock Card ────────────────────────────────────── */}
      <div className="bento-card b-clock ">
        <div className="bento-label">Local Time</div>
        <LiveClock />
        <div className="timezone-label">IST — UTC+5:30 · Bengaluru</div>
      </div>

      {/* ── Status Card ───────────────────────────────────── */}
      <div className="bento-card b-status ">
        <div className="bento-label">Current Focus</div>
        <h3 style={{ fontSize: 15, marginBottom: 10 }}>Open to opportunities</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Backend / Software Engineer roles. Full-time &amp; internships.
        </p>
        <div className="live-status" style={{ marginTop: 12 }}>
          <div className="live-dot" />
          Available
        </div>
      </div>

      {/* ── Skills Card ───────────────────────────────────── */}
      <div className="bento-card b-skills">
        <div className="bento-label">Skills &amp; Tech Stack</div>
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <span key={s} className="tag">{s}</span>
          ))}
        </div>
      </div>

      {/* ── Stats Card ────────────────────────────────────── */}
      <div className="bento-card b-stats ">
        <div className="bento-label">By the numbers</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, paddingTop: 8 }}>
          <AnimatedStat value={20000} suffix="+" label="Peak concurrent users" />
          <AnimatedStat value={50} suffix="×" label="Pipeline throughput gain" />
          <AnimatedStat value={9} suffix=".06" label="University CGPA" />
          <AnimatedStat value={1500} suffix="+" label="Blog article views" />
        </div>
      </div>

      {/* ── Blogs Card ────────────────────────────────────── */}
      <div className="bento-card b-blogs">
        <div className="bento-label">Technical Writing</div>
        <h3>Published Blogs</h3>
        <div style={{ marginTop: 16 }}>
          {BLOGS.map((blog) => (
            <div key={blog.title} className="blog-item">
              <span className="blog-title">{blog.title}</span>
              <span className="blog-views">{blog.views}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tools Card ────────────────────────────────────── */}
      <div className="bento-card b-tech ">
        <div className="bento-label">Tools I Use Daily</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {TOOLS.map((tool) => (
            <span key={tool} className="tech-logo-item">{tool}</span>
          ))}
        </div>
      </div>

    </div>
  )
}
