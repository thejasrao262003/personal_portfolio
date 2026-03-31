// ── Recognition Table ─────────────────────────────────────────
// Server component — static awards data rendered as a table.

import { RECOGNITIONS } from '@/lib/data/experience'

export function RecognitionTable() {
  return (
    <div className="recognition-section">
      <div className="section-header">
        <h2 className="section-title">Recognition</h2>
        <sup className="section-count">({RECOGNITIONS.length})</sup>
      </div>

      <div role="table" aria-label="Awards and recognition">
        {RECOGNITIONS.map((r, idx) => (
          <div
            key={r.award}
            className="recognition-row"
            role="row"
          >
            <div className="recognition-award" role="cell">{r.award}</div>
            <div className="recognition-project" role="cell">{r.project}</div>
            <div className="recognition-date" role="cell">{r.date}</div>
            <div className="recognition-org" role="cell">{r.org}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
