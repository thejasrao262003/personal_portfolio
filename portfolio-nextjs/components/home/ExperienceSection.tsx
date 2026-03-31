// ── Experience Section ────────────────────────────────────────
// Server component — renders the "Worked with" table.
// Data is fetched server-side in the page component and passed in.

import type { Experience } from '@/types'

interface ExperienceSectionProps {
  experience: Experience[]
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section className="experience-section" aria-label="Work experience">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header reveal">
          <h2 className="section-title">Worked with</h2>
          <sup className="section-count">({experience.length})</sup>
        </div>

        <div className="exp-table" role="table">
          {experience.map((exp, idx) => (
            <div
              key={exp._id ?? exp.company}
              className={`exp-row reveal${idx > 0 ? ` reveal-delay-${idx}` : ''}`}
              role="row"
            >
              <div className="exp-company" role="cell">{exp.company}</div>
              <div className="exp-role" role="cell">{exp.role}</div>
              <div className="exp-date" role="cell">{exp.period}</div>
              <div className="exp-location" role="cell">{exp.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
