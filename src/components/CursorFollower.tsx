import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Puntero propio: un disco pequeño + anillo que persigue con spring.
 * Se oculta cuando prefersReducedMotion está activo o en touch devices.
 */
export function CursorFollower() {
  const [visible, setVisible] = useState(false)
  const [touch, setTouch] = useState(false)
  const [hovering, setHovering] = useState(false)
  const reduced = useReducedMotion()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) {
      setTouch(true)
      return
    }
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onEnter = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) setHovering(true)
    }
    const onLeave = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) setHovering(false)
    }
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onEnter)
    document.addEventListener('pointerout', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onEnter)
      document.removeEventListener('pointerout', onLeave)
    }
  }, [x, y])

  if (touch || reduced) return null

  return (
    <>
      {/* Disco pequeño sin lag */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
        aria-hidden
      >
        <div
          className={`h-2 w-2 rounded-full bg-white -translate-x-1/2 -translate-y-1/2 transition-opacity ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </motion.div>
      {/* Anillo con spring */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-none fixed top-0 left-0 z-[99]"
        aria-hidden
      >
        <motion.div
          animate={{
            width: hovering ? 60 : 36,
            height: hovering ? 60 : 36,
            opacity: visible ? (hovering ? 0.9 : 0.5) : 0,
          }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="border border-teal-glow -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </motion.div>
    </>
  )
}
