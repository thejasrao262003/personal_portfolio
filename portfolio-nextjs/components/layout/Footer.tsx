// ── Footer ────────────────────────────────────────────────────
// Server component — no interactivity needed except back-to-top.
// Back-to-top is isolated to a small client component.

import Link from 'next/link'
import { BackToTop } from './BackToTop'

export function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo-large">T.R.</div>

        <div className="footer-col">
          <h4>Credits</h4>
          <p style={{ fontSize: '16px', color: 'var(--text-primary)' }}>© T.R. - 2026</p>
        </div>

        <div className="footer-col">
          <h4>Menu</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <div className="footer-social-logos">
            <a href="https://www.linkedin.com/in/thejasprao/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://github.com/thejasrao262003" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href="mailto:thejasrao262003@gmail.com" aria-label="Email">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>

        <div className="back-to-top-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span className="back-to-top-text" style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>Back to top</span>
          <BackToTop />
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Thejas Rao — Bengaluru, India</span>
        <span>Built with Next.js, TypeScript & Tailwind CSS</span>
      </div>
    </footer>
  )
}
