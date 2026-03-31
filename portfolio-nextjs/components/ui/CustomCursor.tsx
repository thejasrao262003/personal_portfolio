'use client'
// ── Custom Cursor ─────────────────────────────────────────────
// Replaces the system cursor with a small dot that lerps toward
// the mouse (the "lag" creates a smooth, premium feel).
// Hidden on touch/mobile devices.

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current!
    if (!cursor) return

    // Hide on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      cursor.style.display = 'none'
      return
    }

    let mx = -100, my = -100
    let cx = -100, cy = -100
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    const onMouseDown = () => cursor.classList.add('clicking')
    const onMouseUp = () => cursor.classList.remove('clicking')

    // Interactive element hover expansion
    const hoverTargets = 'a, button, [role="button"], .proj-card, .work-card, .bento-card'
    function handleHoverIn() { cursor.classList.add('hovering') }
    function handleHoverOut() { cursor.classList.remove('hovering') }

    function attachHoverListeners() {
      document.querySelectorAll(hoverTargets).forEach((el) => {
        el.addEventListener('mouseenter', handleHoverIn)
        el.addEventListener('mouseleave', handleHoverOut)
      })
    }

    // Lerp animation loop
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function animate() {
      cx = lerp(cx, mx, 0.12)
      cy = lerp(cy, my, 0.12)
      cursor.style.left = cx + 'px'
      cursor.style.top = cy + 'px'
      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    attachHoverListeners()
    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={cursorRef} id="custom-cursor" aria-hidden="true" />
}
