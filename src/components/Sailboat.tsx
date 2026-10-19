import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Signature CTA: velero animado.
 * - Al cargar: gira en círculo sin rumbo (parábola de la vela).
 * - Al entrar en viewport: endereza su curso y la vela se infla.
 * - Hover sobre la vela: respira suavemente.
 */
export function Sailboat() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [enderezado, setEnderezado] = useState(false)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Al entrar la sección en viewport, el velero se endereza.
  useEffect(() => {
    if (prefersReduced) {
      setEnderezado(true)
      return
    }
    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.25 && !enderezado) setEnderezado(true)
    })
    return () => unsub()
  }, [scrollYProgress, enderezado, prefersReduced])

  // Horizonte parallax
  const horizonteY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const horizonteYSmooth = useSpring(horizonteY, { stiffness: 100, damping: 20 })

  return (
    <section ref={sectionRef} className="relative surface-ink py-32 md:py-40 overflow-hidden">
      {/* Horizonte / mar */}
      <motion.div
        style={{ y: horizonteYSmooth }}
        className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/60 to-transparent" />
        {/* Líneas de agua */}
        <svg
          viewBox="0 0 1600 300"
          className="absolute inset-x-0 bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          {[0, 30, 60, 90, 120, 150, 180].map((y, i) => (
            <motion.path
              key={y}
              d={`M 0 ${150 + y} Q 400 ${140 + y} 800 ${150 + y} T 1600 ${150 + y}`}
              stroke="rgb(var(--teal-glow))"
              strokeWidth="1"
              strokeOpacity={0.08 + i * 0.015}
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: i * 0.1, ease: 'easeOut' }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Estrellas sutiles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-px w-px rounded-full bg-teal-glow"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 60}%`,
            }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3 + (i % 3), delay: (i % 5) * 0.4, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="container-x relative">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          {/* Texto editorial */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="kicker text-teal-glow mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-teal" />
              Signature
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.03] text-fg-on-dark max-w-xl"
            >
              Su barco ya está en el mar.
              <br />
              <span className="text-teal-glow">Es hora de levantar la vela.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="mt-8 text-lg md:text-xl text-fg-on-dark-mute leading-relaxed max-w-lg"
            >
              La fuerza de su equipo ya existe. Lo que falta es dirección. No reemplazamos a su
              tripulación: les enseñamos a usar el viento a su favor.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-3 items-start"
            >
              <Link to="/contacto" className="btn-teal group">
                Levante la vela con nosotros
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link to="/herramientas" className="btn-ghost-dark">
                Primero haga el diagnóstico
              </Link>
            </motion.div>
          </div>

          {/* Velero SVG animado */}
          <div className="relative aspect-square max-w-[520px] mx-auto w-full">
            <SailboatSVG enderezado={enderezado} reduced={!!prefersReduced} />
          </div>
        </div>
      </div>
    </section>
  )
}

function SailboatSVG({ enderezado, reduced }: { enderezado: boolean; reduced: boolean }) {
  // Hover state para "respiración" de la vela
  const [hover, setHover] = useState(false)

  return (
    <motion.svg
      viewBox="0 0 400 400"
      className="w-full h-full cursor-pointer"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      aria-label="Velero navegando"
      // Antes de enderezarse: gira sin rumbo (barco perdido)
      animate={
        reduced || enderezado
          ? { rotate: 0 }
          : { rotate: [0, 15, -8, 20, -5, 10, 0] }
      }
      transition={
        reduced || enderezado
          ? { duration: 1.4, ease: [0.32, 0.72, 0, 1] }
          : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
      }
    >
      <defs>
        <linearGradient id="sail-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--teal-glow))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="rgb(var(--teal-deep))" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="hull-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--fg-on-dark))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgb(var(--fg-on-dark))" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Círculo guía (sello editorial) */}
      <motion.circle
        cx="200"
        cy="200"
        r="180"
        stroke="rgb(var(--teal-glow))"
        strokeOpacity="0.1"
        strokeWidth="1"
        fill="none"
        strokeDasharray="2 6"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '200px', originY: '200px' }}
      />

      {/* Palabras cardinales */}
      {['N', 'E', 'S', 'O'].map((d, i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180)
        const r = 195
        const x = 200 + Math.cos(angle) * r
        const y = 200 + Math.sin(angle) * r + 4
        return (
          <text
            key={d}
            x={x}
            y={y}
            fill="rgb(var(--teal-glow))"
            opacity="0.4"
            fontSize="11"
            textAnchor="middle"
            fontFamily="Satoshi, sans-serif"
            letterSpacing="0.2em"
          >
            {d}
          </text>
        )
      })}

      {/* Mástil */}
      <line
        x1="200"
        y1="100"
        x2="200"
        y2="290"
        stroke="rgb(var(--fg-on-dark))"
        strokeOpacity="0.5"
        strokeWidth="2"
      />

      {/* VELA grande — se infla con enderezado y respira con hover */}
      <motion.path
        d="M 200 100 L 200 270"
        stroke="none"
        fill="url(#sail-g)"
        initial={{ d: 'M 200 100 L 200 270' }}
        animate={{
          d: enderezado
            ? hover
              ? 'M 200 100 Q 320 180 200 270'
              : 'M 200 100 Q 290 180 200 270'
            : 'M 200 100 Q 220 180 200 270',
        }}
        transition={{
          duration: hover ? 1.6 : 1.2,
          ease: [0.23, 1, 0.32, 1],
        }}
        style={{ transformOrigin: '200px 185px' }}
      />

      {/* Pequeña vela delantera */}
      <motion.path
        d="M 200 130 L 200 240"
        stroke="none"
        fill="rgb(var(--fg-on-dark))"
        fillOpacity="0.3"
        animate={{
          d: enderezado
            ? 'M 200 130 Q 155 200 200 240'
            : 'M 200 130 L 200 240',
        }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Casco */}
      <path
        d="M 110 290 Q 200 335 290 290 L 265 310 Q 200 335 135 310 Z"
        fill="url(#hull-g)"
      />

      {/* Línea de agua con olas sutiles */}
      <motion.path
        d="M 60 320 Q 130 316 200 320 T 340 320"
        stroke="rgb(var(--teal-glow))"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        fill="none"
        animate={{
          d: [
            'M 60 320 Q 130 316 200 320 T 340 320',
            'M 60 320 Q 130 324 200 320 T 340 320',
            'M 60 320 Q 130 316 200 320 T 340 320',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M 40 335 Q 120 331 200 335 T 360 335"
        stroke="rgb(var(--teal-glow))"
        strokeOpacity="0.25"
        strokeWidth="1"
        fill="none"
        animate={{
          d: [
            'M 40 335 Q 120 331 200 335 T 360 335',
            'M 40 335 Q 120 339 200 335 T 360 335',
            'M 40 335 Q 120 331 200 335 T 360 335',
          ],
        }}
        transition={{ duration: 5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Caption dinámico */}
      <motion.text
        x="200"
        y="372"
        fill="rgb(var(--teal-glow))"
        fontSize="9"
        textAnchor="middle"
        fontFamily="Satoshi, sans-serif"
        letterSpacing="0.3em"
        animate={{ opacity: enderezado ? 1 : 0.5 }}
        transition={{ duration: 0.8 }}
      >
        {enderezado ? 'RUMBO FIJADO' : 'SIN RUMBO'}
      </motion.text>
    </motion.svg>
  )
}
