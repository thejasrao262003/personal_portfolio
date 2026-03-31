'use client'
// ── Navbar ────────────────────────────────────────────────────
// Fixed top bar with hamburger menu button + logo.
// Manages open/close state and passes it to MenuSidebar.

import { useState } from 'react'
import Link from 'next/link'
import { MenuSidebar } from './MenuSidebar'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="portfolio-nav" aria-label="Main navigation">
        <button
          className="nav-menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
            <rect width="16" height="1.2" rx="0.6" fill="currentColor" />
            <rect y="5.4" width="10" height="1.2" rx="0.6" fill="currentColor" />
            <rect y="10.8" width="13" height="1.2" rx="0.6" fill="currentColor" />
          </svg>
          Menu
        </button>

        <Link href="/" className="nav-logo" aria-label="Thejas Rao — home">
          T.R.
        </Link>
      </nav>

      <MenuSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
