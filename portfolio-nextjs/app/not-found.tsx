// ── 404 Page ──────────────────────────────────────────────────
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
      <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 16 }}>404</p>
      <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 500, letterSpacing: '-3px', marginBottom: 16 }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40, maxWidth: 400 }}>
        This page doesn&apos;t exist or was moved. Let&apos;s get you back on track.
      </p>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', color: '#010101', padding: '12px 24px', borderRadius: 8, fontWeight: 500, textDecoration: 'none', fontSize: 14 }}>
        ← Back home
      </Link>
    </div>
  )
}
