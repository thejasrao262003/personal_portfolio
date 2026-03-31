'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TERMINAL_LINES: { type: 'cmd' | 'success' | 'stat' | 'muted'; text: string }[] = [
  { type: 'cmd',     text: 'docker compose up --scale api=3' },
  { type: 'success', text: '✓  api_1  api_2  api_3  running' },
  { type: 'cmd',     text: 'locust --headless -u 20000 -r 500' },
  { type: 'stat',    text: '→  2,041 RPS   ·   0.7% err rate' },
  { type: 'muted',   text: '   p50:42ms  p95:118ms  p99:210ms' },
  { type: 'cmd',     text: 'aws sqs send-message --queue kantara' },
  { type: 'success', text: '✓  message queued, workers processing' },
  { type: 'cmd',     text: 'python -m narratron.pipeline --run' },
  { type: 'stat',    text: '→  script → tts → render: 4m 32s' },
  { type: 'cmd',     text: 'git push origin main' },
  { type: 'success', text: '✓  pipeline triggered → deploying' },
]

const COLOR = {
  cmd:     '#e2e8f0',
  success: '#4ade80',
  stat:    '#60a5fa',
  muted:   '#475569',
}

const METRICS = [
  { label: 'RPS',      value: '2,041', color: '#4ade80',  delay: 0   },
  { label: 'Latency',  value: '42ms',  color: '#60a5fa',  delay: 0.4 },
  { label: 'Uptime',   value: '99.9%', color: '#a78bfa',  delay: 0.8 },
  { label: 'Err rate', value: '0.7%',  color: '#fb923c',  delay: 1.2 },
]

export function Laptop3D() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    TERMINAL_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleLines((prev) => Math.max(prev, i + 1)), 300 + i * 350)
      )
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 480 }}>

      {/* ── Back: metrics card ── */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute',
          top: '8%',
          right: '0%',
          width: 210,
          background: 'rgba(12,12,18,0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          padding: '14px 18px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          transform: 'perspective(600px) rotateY(-6deg) rotateX(2deg)',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontSize: 9, color: '#3a3a4a', fontFamily: 'monospace', marginLeft: 4 }}>
            metrics.live
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {METRICS.map((m) => (
            <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: '#4a4a5a', fontFamily: 'monospace' }}>{m.label}</span>
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: m.delay }}
                style={{ fontSize: 13, fontWeight: 700, color: m.color, fontFamily: 'monospace' }}
              >
                {m.value}
              </motion.span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }}
          />
          <span style={{ fontSize: 9, color: '#4ade80', fontFamily: 'monospace', letterSpacing: 1 }}>LIVE</span>
        </div>
      </motion.div>

      {/* ── Main: terminal window ── */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          width: 490,
          background: '#0d0d0f',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px rgba(74,222,128,0.04)',
          transform: 'perspective(800px) rotateY(-8deg) rotateX(3deg)',
          zIndex: 2,
        }}
      >
        {/* Title bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {(['#ff5f57','#febc2e','#28c840'] as const).map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, boxShadow: `0 0 6px ${c}66` }} />
            ))}
          </div>
          <span style={{ flex: 1, textAlign: 'center', fontSize: 11, color: '#3a3a4a', fontFamily: 'monospace' }}>
            thejas@prod — zsh — 80×24
          </span>
        </div>

        {/* Terminal body */}
        <div style={{ padding: '16px 18px 20px', minHeight: 300 }}>
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 10,
                marginBottom: 5,
                fontFamily: '"SF Mono","Fira Code","Cascadia Code",monospace',
                fontSize: 11.5,
                lineHeight: 1.65,
                color: COLOR[line.type],
                opacity: 1,
              }}
            >
              <span style={{ color: line.type === 'cmd' ? '#4ade80' : 'transparent', minWidth: 10, userSelect: 'none' }}>
                {line.type === 'cmd' ? '$' : ' '}
              </span>
              <span>{line.text}</span>
            </div>
          ))}

          {/* Blinking cursor — shows after all lines or while typing */}
          <div style={{ display: 'flex', gap: 10, fontFamily: 'monospace', fontSize: 11.5, marginTop: 2 }}>
            <span style={{ color: '#4ade80' }}>$</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
              style={{
                display: 'inline-block',
                width: 7,
                height: 13,
                background: '#4ade80',
                verticalAlign: 'middle',
                borderRadius: 1,
                marginTop: 2,
              }}
            />
          </div>
        </div>

        {/* Bottom glow */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: 80,
          background: 'linear-gradient(to top, rgba(74,222,128,0.04), transparent)',
          pointerEvents: 'none',
        }} />
      </motion.div>

    </div>
  )
}
