import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * 02. Storytelling — Parábola de la vela.
 * Scroll pinned de 4 fases con ventanas limpias (sin solape incorrecto).
 * - Cada fase ocupa 1/4 del scroll y entra/sale con un fade suave de 0.08.
 * - La última fase se queda visible hasta el final (sin desvanecerse).
 * - Indicador de progreso 01—02—03—04 fijo para orientación del usuario.
 */
const phases = [
  {
    kicker: 'Parábola de la vela · 01',
    title: 'Un CEO giraba en círculos.',
    body: '"No necesitamos brújula", gritaba, mientras su tripulación remaba sin rumbo. Los marineros se agotaban, la carga se perdía.',
  },
  {
    kicker: 'Parábola de la vela · 02',
    title: 'Un consultor subió a bordo.',
    body: 'Observó el caos. "Su pasión es admirable", dijo. "Pero están remando en dirección opuesta a la corriente".',
  },
  {
    kicker: 'Parábola de la vela · 03',
    title: 'Y les mostró la vela.',
    body: 'La herramienta más poderosa estuvo siempre a bordo. Solo faltaba quién les enseñara a usarla.',
  },
  {
    kicker: 'Nuestra promesa',
    title: 'Su empresa ya tiene una vela.',
    body: 'No reemplazamos a su tripulación. Les enseñamos a usar el viento a su favor.',
  },
]

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null)
  // offset start/start → end/end hace que progress 0 = sticky empieza, progress 1 = sticky termina
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 25, mass: 0.3 })

  // Rotación del barco: va de 18° (sin rumbo) a 0° al 60%, se mantiene recto
  const boatRot = useSpring(useTransform(smooth, [0, 0.6, 1], [18, 0, 0]), {
    stiffness: 50,
    damping: 25,
  })
  // Vela se infla progresivamente, con picos en fase 3 y 4
  const sailBow = useSpring(useTransform(smooth, [0, 0.5, 0.7, 1], [5, 20, 55, 55]), {
    stiffness: 50,
    damping: 25,
  })
  // Barco desplaza suavemente de -8% a 8% sin desaparecer
  const boatX = useSpring(useTransform(smooth, [0, 1], ['-8%', '8%']), {
    stiffness: 40,
    damping: 25,
  })

  return (
    <section ref={ref} className="relative surface-ink h-[400vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Fondo */}
        <SceneBackground />

        {/* Indicador de progreso editorial — vertical a la izquierda */}
        <ProgressIndicator progress={smooth} />

        <div className="relative z-10 container-x w-full grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
          {/* Columna texto — una fase visible a la vez */}
          <div className="relative min-h-[320px] md:min-h-[380px]">
            {phases.map((phase, i) => (
              <PhasePanel key={i} phase={phase} index={i} progress={smooth} />
            ))}
          </div>

          {/* Columna visual: barco */}
          <div className="relative aspect-square max-w-[520px] mx-auto w-full flex items-center justify-center">
            <motion.div style={{ x: boatX, rotate: boatRot }} className="w-full h-full">
              <StoryBoat sailBow={sailBow} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Panel de fase. Cada fase ocupa 1/4 del scroll (0.25).
 * Fade-in de 0.06 al inicio de su ventana, fade-out de 0.06 al final.
 * EXCEPTO la última, que no se desvanece.
 */
function PhasePanel({
  phase,
  index,
  progress,
}: {
  phase: (typeof phases)[number]
  index: number
  progress: ReturnType<typeof useSpring>
}) {
  const windowSize = 1 / phases.length // 0.25
  const start = index * windowSize
  const end = start + windowSize

  // fade-in: 0.06 justo después del inicio de la ventana
  const fadeIn = Math.min(0.06, windowSize * 0.3)
  // fade-out: 0.06 antes del final de la ventana (solo si no es la última)
  const fadeOut = index === phases.length - 1 ? 0 : fadeIn

  const isLast = index === phases.length - 1
  const opacity = useTransform(
    progress,
    isLast
      ? [start - fadeIn, start + fadeIn, 1]
      : [
          Math.max(0, start - fadeIn),
          start + fadeIn,
          end - fadeOut,
          end + fadeIn,
        ],
    isLast ? [0, 1, 1] : [0, 1, 1, 0],
  )

  // Pequeño slide-up al entrar
  const y = useTransform(
    progress,
    [Math.max(0, start - fadeIn), start + fadeIn],
    [20, 0],
  )

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="kicker text-teal-glow mb-5 flex items-center gap-3">
        <span className="h-px w-10 bg-teal" />
        {phase.kicker}
      </div>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-fg-on-dark mb-6">
        {phase.title}
      </h2>
      <p className="text-base md:text-lg text-fg-on-dark leading-relaxed max-w-lg">
        {phase.body}
      </p>
    </motion.div>
  )
}

/** Indicador vertical fijo que muestra en qué fase va el usuario */
function ProgressIndicator({ progress }: { progress: ReturnType<typeof useSpring> }) {
  return (
    <div className="hidden md:flex absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-3">
      {phases.map((_, i) => {
        const start = i / phases.length
        const end = start + 1 / phases.length
        // Un marker se "activa" cuando progress está en su ventana o después
        const activeOpacity = useTransform(
          progress,
          [start - 0.02, start + 0.03, end + 0.05],
          i === phases.length - 1 ? [0.3, 1, 1] : [0.3, 1, 0.3],
        )
        return (
          <div key={i} className="flex items-center gap-3">
            <motion.span
              style={{ opacity: activeOpacity }}
              className="kicker text-teal-glow tabular-nums text-[10px]"
            >
              {String(i + 1).padStart(2, '0')}
            </motion.span>
            <motion.span
              style={{ opacity: activeOpacity }}
              className="block h-px w-6 bg-teal-glow"
            />
          </div>
        )
      })}
    </div>
  )
}

function SceneBackground() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Estrellas */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-px w-px rounded-full bg-teal-glow"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 51) % 50}%` }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 3 + (i % 4), delay: (i % 5) * 0.4, repeat: Infinity }}
          />
        ))}
      </div>
      {/* Olas */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[30%] w-full"
        viewBox="0 0 1600 300"
        preserveAspectRatio="none"
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M -50 ${80 + i * 55} Q 400 ${60 + i * 55} 800 ${80 + i * 55} T 1700 ${80 + i * 55}`}
            stroke="rgb(56 189 203)"
            strokeOpacity={0.08 + i * 0.02}
            strokeWidth="1"
            fill="none"
            animate={{
              d: [
                `M -50 ${80 + i * 55} Q 400 ${60 + i * 55} 800 ${80 + i * 55} T 1700 ${80 + i * 55}`,
                `M -50 ${80 + i * 55} Q 400 ${100 + i * 55} 800 ${80 + i * 55} T 1700 ${80 + i * 55}`,
                `M -50 ${80 + i * 55} Q 400 ${60 + i * 55} 800 ${80 + i * 55} T 1700 ${80 + i * 55}`,
              ],
            }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  )
}

function StoryBoat({ sailBow }: { sailBow: ReturnType<typeof useSpring> }) {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id="story-sail" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(56 189 203)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="rgb(29 115 128)" stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id="story-glow">
          <stop offset="0%" stopColor="rgb(56 189 203)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="rgb(56 189 203)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="180" fill="url(#story-glow)" />

      <circle
        cx="200"
        cy="200"
        r="170"
        stroke="rgb(56 189 203)"
        strokeOpacity="0.1"
        strokeWidth="1"
        strokeDasharray="2 6"
        fill="none"
      />

      {['N', 'E', 'S', 'O'].map((d, i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180)
        const r = 182
        const x = 200 + Math.cos(angle) * r
        const y = 200 + Math.sin(angle) * r + 4
        return (
          <text
            key={d}
            x={x}
            y={y}
            fill="rgb(56 189 203)"
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

      <line
        x1="200"
        y1="100"
        x2="200"
        y2="285"
        stroke="rgb(243 243 240)"
        strokeOpacity="0.6"
        strokeWidth="2"
      />

      <motion.path
        fill="url(#story-sail)"
        style={{
          d: useTransform(sailBow, (b) => `M 200 100 Q ${200 + b * 2.5} 180 200 265`),
        } as unknown as React.CSSProperties}
      />
      <motion.path
        fill="rgb(243 243 240)"
        fillOpacity="0.3"
        style={{
          d: useTransform(sailBow, (b) => `M 200 120 Q ${200 - b * 1.3} 190 200 255`),
        } as unknown as React.CSSProperties}
      />

      <path
        d="M 110 285 Q 200 325 290 285 L 265 305 Q 200 325 135 305 Z"
        fill="rgb(243 243 240)"
        fillOpacity="0.8"
      />

      <motion.path
        stroke="rgb(56 189 203)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        fill="none"
        animate={{
          d: [
            'M 50 315 Q 125 311 200 315 T 350 315',
            'M 50 315 Q 125 319 200 315 T 350 315',
            'M 50 315 Q 125 311 200 315 T 350 315',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        stroke="rgb(56 189 203)"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
        animate={{
          d: [
            'M 30 335 Q 110 331 200 335 T 370 335',
            'M 30 335 Q 110 339 200 335 T 370 335',
            'M 30 335 Q 110 331 200 335 T 370 335',
          ],
        }}
        transition={{ duration: 5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}
