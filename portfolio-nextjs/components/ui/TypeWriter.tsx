'use client'
// ── TypeWriter ────────────────────────────────────────────────
// Cycles through an array of strings with typing + deleting
// animation. Converted from your vanilla JS initTyping() fn.
//
// Props:
//   strings  — array of phrases to cycle through
//   speed    — typing delay in ms (default 55)

import { useEffect, useRef } from 'react'

interface TypeWriterProps {
  strings: string[]
  speed?: number
}

export function TypeWriter({ strings, speed = 55 }: TypeWriterProps) {
  const elRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = elRef.current!
    if (!el || strings.length === 0) return

    let i = 0       // current string index
    let j = 0       // char position
    let deleting = false
    let timerId: ReturnType<typeof setTimeout>

    const SPEED = { type: speed, delete: 30, pause: 1600 }

    function tick() {
      const current = strings[i]

      if (!deleting) {
        el.textContent = current.slice(0, j + 1)
        j++
        if (j === current.length) {
          timerId = setTimeout(() => { deleting = true; tick() }, SPEED.pause)
          return
        }
      } else {
        el.textContent = current.slice(0, j - 1)
        j--
        if (j === 0) {
          deleting = false
          i = (i + 1) % strings.length
        }
      }

      const delay = deleting ? SPEED.delete : SPEED.type + (Math.random() * 20 - 10)
      timerId = setTimeout(tick, delay)
    }

    tick()
    return () => clearTimeout(timerId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <span ref={elRef} className="typed-text" />
      <span className="cursor-blink" aria-hidden="true" />
    </>
  )
}
