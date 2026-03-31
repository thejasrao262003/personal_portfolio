// ============================================================
// ROOT LAYOUT — app/layout.tsx
//
// This is the shell that wraps EVERY page in the app.
// WHY App Router: unlike pages/_, this layout never unmounts
// between route changes, so Navbar + Footer persist and
// client-state (menu open/closed) survives navigation.
//
// Server component by default — only client bits are the
// interactive UI helpers (cursor, scroll progress, reveal).
// ============================================================

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { RevealObserver } from '@/components/ui/RevealObserver'

// Next.js font optimisation — loads Inter from Google Fonts
// with font-display: swap and self-hosts the font files.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Default metadata — overridden per-page via generateMetadata()
export const metadata: Metadata = {
  title: {
    default: 'Thejas Rao — Backend Developer & Software Engineer',
    template: '%s — Thejas Rao',
  },
  description:
    'Thejas Rao — Backend Developer based in Bengaluru. Building scalable systems, cloud infrastructure, and agentic workflows.',
  keywords: [
    'Thejas Rao', 'Backend Developer', 'Software Engineer', 'Bengaluru',
    'AWS', 'FastAPI', 'Python', 'Cloud', 'Distributed Systems',
  ],
  authors: [{ name: 'Thejas Rao', url: 'https://thejas-rao.dev' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Thejas Rao',
    title: 'Thejas Rao — Backend Developer & Software Engineer',
    description: 'Building scalable systems, cloud infrastructure, and agentic workflows.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thejas Rao — Backend Developer',
    description: 'Building scalable systems, cloud infrastructure, and agentic workflows.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      {/*
        suppressHydrationWarning prevents React warnings caused by
        browser extensions injecting attributes into <html>.
        The `dark` class enables dark mode CSS variables globally.
      */}
      <body>
        {/* Global client-side utilities that render nothing visually */}
        <ScrollProgress />
        <CustomCursor />
        <RevealObserver />

        {/* Persistent navigation */}
        <Navbar />

        {/* Page content — each route's page.tsx renders here */}
        <main>{children}</main>

        {/* Persistent footer */}
        <Footer />
      </body>
    </html>
  )
}
