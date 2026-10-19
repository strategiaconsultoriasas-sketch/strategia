import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/**
 * 01. HERO — Logo STRATEGIA dibujado con SVG stroke animation
 * + oleaje interactivo que responde al mouse.
 */
export function HeroLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smX = useSpring(mx, { stiffness: 100, damping: 20 })
  const smY = useSpring(my, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width
      const ny = (e.clientY - rect.top) / rect.height
      setMouse({ x: nx, y: ny })
      mx.set(nx - 0.5)
      my.set(ny - 0.5)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen surface-ink overflow-hidden flex flex-col"
    >
      {/* Oleaje interactivo SVG */}
      <WavesBackground mx={mouse.x} my={mouse.y} />

      {/* Logo STRATEGIA con stroke animation */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container-x pt-28 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="kicker text-teal-glow mb-10 flex items-center gap-3"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: 'left' }}
            className="h-px w-16 bg-teal block"
          />
          Consultoría · Innovación · Casanare 2026
        </motion.div>

        {/* Logo STRATEGIA animado */}
        <AnimatedLogoType />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6, ease: [0.23, 1, 0.32, 1] }}
          className="mt-12 max-w-2xl text-xl md:text-2xl text-fg-on-dark leading-[1.4] font-medium"
        >
          Transformamos la incertidumbre en{' '}
          <motion.span
            initial={{ color: 'rgb(243 243 240)' }}
            animate={{ color: 'rgb(56 189 203)' }}
            transition={{ duration: 1, delay: 3.5 }}
          >
            ventaja competitiva.
          </motion.span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.9, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 max-w-xl text-base md:text-lg text-fg-on-dark-mute leading-relaxed"
        >
          Estrategia, prospectiva e innovación al servicio de organizaciones públicas y privadas
          que lideran el futuro.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.3, ease: [0.23, 1, 0.32, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-start gap-3"
        >
          <Link to="/contacto" className="btn-teal group">
            Hablar con un consultor
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <Link to="/herramientas" className="btn-ghost-dark">
            Hacer el diagnóstico
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="relative z-10 flex items-center gap-3 justify-end pr-6 md:pr-10 pb-6 md:pb-8 text-fg-on-dark-mute"
      >
        <span className="kicker text-fg-on-dark-mute">Siga su rumbo</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-10 w-5 border border-fg-on-dark-mute rounded-full flex items-start justify-center pt-1.5"
        >
          <span className="h-1.5 w-0.5 bg-teal-glow rounded-full" />
        </motion.div>
      </motion.div>

      {/* Parallax via motion value — para efecto de luz detrás */}
      <motion.div
        style={{ x: smX.get() * 60, y: smY.get() * 60 }}
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-teal/10 blur-[140px] pointer-events-none"
        aria-hidden
      />
    </section>
  )
}

/* Logo STRATEGIA con reveal cinemático */
function AnimatedLogoType() {
  return (
    <div className="relative flex flex-col items-start">
      {/* Logo real + mask reveal */}
      <div className="relative inline-block">
        {/* Barra teal que recorre el logo */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: [0, 1, 0], originX: [0, 0, 1] }}
          transition={{ duration: 1.6, delay: 0.3, times: [0, 0.5, 1], ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 bg-teal-glow z-20 origin-left"
        />
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10"
        >
          <div className="bg-paper px-6 py-5 md:px-10 md:py-7 rounded-sm">
            <img
              src="/assets/logo.png"
              alt="Strategia"
              className="h-14 sm:h-20 md:h-28 lg:h-32 w-auto"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* Oleaje interactivo que responde al mouse */
function WavesBackground({ mx, my }: { mx: number; my: number }) {
  // Las ondas se desplazan según posición normalizada del mouse (0-1)
  const base = 400
  const amp = 60 + my * 40
  const offsetX = mx * 100

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Grid de fondo */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      {/* Ondas SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
      >
        {[0, 1, 2, 3].map((i) => {
          const y = base + i * 90
          const a = amp - i * 8
          const strokeOpacity = 0.07 + i * 0.015
          return (
            <motion.path
              key={i}
              d={`M -100 ${y} Q 400 ${y - a} 800 ${y} T 1700 ${y}`}
              stroke="rgb(56 189 203)"
              strokeOpacity={strokeOpacity}
              strokeWidth="1.5"
              fill="none"
              animate={{
                d: [
                  `M -100 ${y} Q ${400 + offsetX} ${y - a} 800 ${y} T 1700 ${y}`,
                  `M -100 ${y} Q ${400 + offsetX} ${y + a * 0.5} 800 ${y} T 1700 ${y}`,
                  `M -100 ${y} Q ${400 + offsetX} ${y - a} 800 ${y} T 1700 ${y}`,
                ],
              }}
              transition={{
                duration: 7 + i * 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </svg>
      {/* Overlay de calma */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/80" />
    </div>
  )
}
