import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const items = [
  { kicker: '01', label: 'Intención concentrada', body: 'Focalizamos las acciones hacia objetivos claros para maximizar el impacto.' },
  { kicker: '02', label: 'Perspectiva sistémica', body: 'Analizamos los retos en su contexto integral, con sus interrelaciones.' },
  { kicker: '03', label: 'Análisis temporal', body: 'Integramos aprendizajes históricos con proyecciones de futuro.' },
  { kicker: '04', label: 'Hipótesis fundamentadas', body: 'Formulamos y validamos supuestos con datos y tendencias.' },
  { kicker: '05', label: 'Oportunismo inteligente', body: 'Aprovechamos oportunidades emergentes sin perder los objetivos.' },
]

/**
 * 05. Elementos clave — scrollytelling con tiro al blanco.
 * Panel sticky con 5 anillos que se completan según el progreso de scroll.
 */
export function KeyElementsBullseye() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  return (
    <section ref={ref} className="relative surface-ink h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div className="container-x w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-14 items-center">
            {/* Texto: header más compacto + lista */}
            <div className="min-h-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="mb-6"
              >
                <div className="kicker text-teal-glow mb-3 flex items-center gap-3">
                  <span className="h-px w-10 bg-teal" />
                  Pensamiento estratégico · 5 elementos
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-[-0.025em] leading-tight text-fg-on-dark">
                  Los cinco pasos que separan la táctica de la estrategia.
                </h2>
              </motion.div>

              <ul className="relative">
                {items.map((it, i) => (
                  <KeyPoint key={it.kicker} item={it} index={i} progress={smooth} />
                ))}
              </ul>
            </div>

            {/* Columna derecha: tiro al blanco */}
            <div className="relative aspect-square max-w-[420px] mx-auto w-full hidden lg:block">
              <BullseyeSVG progress={smooth} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function KeyPoint({
  item,
  index,
  progress,
}: {
  item: (typeof items)[number]
  index: number
  progress: ReturnType<typeof useSpring>
}) {
  const start = 0.1 + index * 0.14
  const end = start + 0.08
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  const dotScale = useTransform(progress, [start, end], [0.3, 1])

  return (
    <motion.li
      style={{ opacity }}
      className="relative py-3 border-t border-white/10 flex items-start gap-4"
    >
      <motion.span
        style={{ scale: dotScale }}
        className="font-sans text-2xl md:text-3xl font-light text-teal-glow tabular-nums leading-none shrink-0 min-w-[2.5rem]"
      >
        {item.kicker}
      </motion.span>
      <div>
        <div className="text-base md:text-lg font-medium text-fg-on-dark tracking-tight mb-0.5">
          {item.label}
        </div>
        <p className="text-sm text-fg-on-dark-mute leading-snug">{item.body}</p>
      </div>
    </motion.li>
  )
}

function BullseyeSVG({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const rings = [100, 80, 60, 40, 20]
  const arrowX = useTransform(progress, [0.6, 0.85], ['-80%', '0%'])
  const arrowOpacity = useTransform(progress, [0.6, 0.75], [0, 1])

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="target-g">
          <stop offset="0%" stopColor="rgb(56 189 203)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(13 59 69)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#target-g)" />
      {rings.map((r, i) => {
        const start = 0.1 + i * 0.14
        const end = start + 0.08
        return <Ring key={i} radius={r * 1.6} progress={progress} start={start} end={end} />
      })}
      <motion.circle
        cx="200"
        cy="200"
        r="8"
        fill="rgb(56 189 203)"
        style={{ opacity: useTransform(progress, [0.65, 0.75], [0, 1]) }}
      />
      <motion.g style={{ x: arrowX, opacity: arrowOpacity }}>
        <line
          x1="0"
          y1="200"
          x2="190"
          y2="200"
          stroke="rgb(243 243 240)"
          strokeOpacity="0.8"
          strokeWidth="2"
        />
        <polygon points="200,200 180,195 180,205" fill="rgb(56 189 203)" />
      </motion.g>
      {['FOCO', 'SISTEMA', 'TIEMPO', 'DATO', 'TIMING'].map((w, i) => {
        const angle = (i * 72 - 90) * (Math.PI / 180)
        const r = 185
        const x = 200 + Math.cos(angle) * r
        const y = 200 + Math.sin(angle) * r
        const start = 0.1 + i * 0.14
        const end = start + 0.08
        return <WordLabel key={w} x={x} y={y} word={w} start={start} end={end} progress={progress} />
      })}
    </svg>
  )
}

function Ring({
  radius,
  progress,
  start,
  end,
}: {
  radius: number
  progress: ReturnType<typeof useSpring>
  start: number
  end: number
}) {
  const scale = useTransform(progress, [start, end], [0.3, 1])
  const opacity = useTransform(progress, [start, end], [0.15, 0.5])
  const stroke = useTransform(progress, [start, end], [0.1, 0.4])

  return (
    <motion.circle
      cx="200"
      cy="200"
      r={radius}
      fill="none"
      stroke="rgb(56 189 203)"
      strokeWidth="1.2"
      style={{ scale, opacity, strokeOpacity: stroke, transformOrigin: '200px 200px' }}
    />
  )
}

function WordLabel({
  x,
  y,
  word,
  start,
  end,
  progress,
}: {
  x: number
  y: number
  word: string
  start: number
  end: number
  progress: ReturnType<typeof useSpring>
}) {
  const opacity = useTransform(progress, [start, end], [0, 0.7])
  return (
    <motion.text
      x={x}
      y={y}
      fill="rgb(56 189 203)"
      style={{ opacity }}
      fontSize="10"
      textAnchor="middle"
      fontFamily="Satoshi, sans-serif"
      letterSpacing="0.3em"
    >
      {word}
    </motion.text>
  )
}
