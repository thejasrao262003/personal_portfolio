'use client'
// ── Menu Sidebar ──────────────────────────────────────────────
// Full-screen overlay that slides in from the left.
// The giant typography links are your signature nav style.
// Uses Framer Motion for the slide + stagger entrance.

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface MenuSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
]

export function MenuSidebar({ isOpen, onClose }: MenuSidebarProps) {
  const pathname = usePathname()

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const slug = pathname === '/' ? 'home' : pathname.slice(1)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dim overlay — click to close */}
          <motion.div
            className="site-overlay active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sidebar panel */}
          <motion.div
            className="menu-overlay open"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Background landscape image */}
            <div className="menu-bg-image" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://framerusercontent.com/images/cs9Fyw9Sw4o3cwgMxVmyTi6Jh0.png?scale-down-to=2048&width=3802&height=1881"
                alt=""
              />
            </div>

            {/* Close button */}
            <button className="menu-close-btn" onClick={onClose} aria-label="Close menu">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 1l10 10M11 1L1 11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              Close
            </button>

            {/* Current page label */}
            <p className="menu-current-page">thejas-rao.dev / {slug}</p>

            {/* Giant nav links */}
            <nav>
              <ul className="menu-links">
                {NAV_LINKS.map((link, idx) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      style={{ color: pathname === link.href ? 'white' : undefined }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Social icons */}
            <motion.div
              className="menu-socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <a
                href="https://www.linkedin.com/in/thejasprao/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://github.com/thejasrao262003"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a href="mailto:thejasrao262003@gmail.com" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
