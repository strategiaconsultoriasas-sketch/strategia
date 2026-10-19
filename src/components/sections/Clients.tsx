import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { clients, type ClientEntry } from '../../data'

/**
 * Clientes & Aliados — carrusel infinito horizontal con pausa al hover.
 * Doble fila corriendo en direcciones opuestas para dar sensación de abundancia.
 * Cada logo tiene lift + scale al hover, link al sitio si existe.
 */
export function Clients() {
  // Dividimos la lista en 2 filas intercaladas para que ambas tengan variedad
  const row1 = clients.filter((_, i) => i % 2 === 0)
  const row2 = clients.filter((_, i) => i % 2 === 1)

  return (
    <section className="relative surface-paper-2 py-20 md:py-28 border-y border-paper-rule overflow-hidden">
      {/* Dots pattern sutil de fondo */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgb(13 59 69) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative">
        {/* Header centrado */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="container-x text-center max-w-2xl mx-auto mb-14"
        >
          <div className="kicker text-teal mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-teal" />
            Clientes & aliados
            <span className="h-px w-10 bg-teal" />
          </div>
          <h3 className="text-2xl md:text-4xl font-medium text-ink tracking-[-0.025em] leading-tight">
            {clients.length} organizaciones que ya navegan con nosotros.
          </h3>
          <p className="mt-4 text-sm text-fg-on-light-mute">
            Pase el cursor sobre un cliente para detener el carrusel.
          </p>
        </motion.div>

        {/* Fila 1: izquierda → derecha */}
        <MarqueeRow entries={row1} direction="left" duration={55} />
        {/* Fila 2: derecha → izquierda */}
        <div className="mt-6">
          <MarqueeRow entries={row2} direction="right" duration={65} />
        </div>
      </div>

      {/* Fade a los lados */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-paper-2 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-paper-2 to-transparent z-10" />
    </section>
  )
}

function MarqueeRow({
  entries,
  direction,
  duration,
}: {
  entries: ClientEntry[]
  direction: 'left' | 'right'
  duration: number
}) {
  const controls = useAnimationControls()
  const [paused, setPaused] = useState(false)
  const progressRef = useRef(direction === 'left' ? 0 : -50)

  // Triplicamos para que el loop sea invisible
  const loop = [...entries, ...entries, ...entries]
  const from = direction === 'left' ? '0%' : '-50%'
  const to = direction === 'left' ? '-50%' : '0%'

  useEffect(() => {
    if (paused) {
      controls.stop()
      return
    }
    const start = progressRef.current
    const target = direction === 'left' ? -50 : 0
    const remaining = Math.abs(target - start) / 50
    controls.start({
      x: [`${start}%`, `${target}%`],
      transition: { duration: duration * remaining, ease: 'linear' },
    }).then(() => {
      if (!paused) {
        progressRef.current = direction === 'left' ? 0 : -50
        controls.start({
          x: [from, to],
          transition: { duration, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
        })
      }
    })
    // On start/restart
  }, [paused, controls, direction, duration, from, to])

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        animate={controls}
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
        className="flex gap-6 md:gap-10 w-max"
      >
        {loop.map((c, i) => (
          <ClientChip key={`${c.name}-${i}`} client={c} />
        ))}
      </motion.div>
    </div>
  )
}

function ClientChip({ client }: { client: ClientEntry }) {
  const content = (
    <motion.div
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="group relative shrink-0 w-[220px] md:w-[260px] h-28 md:h-32 bg-paper border border-paper-rule flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Hover highlight — líneas teal que entran */}
      <motion.span
        className="absolute inset-x-0 top-0 h-px bg-teal origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.span
        className="absolute inset-x-0 bottom-0 h-px bg-teal origin-right"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      />

      {client.logo ? (
        <img
          src={client.logo}
          alt={client.name}
          loading="lazy"
          className="max-h-16 md:max-h-20 max-w-[180px] w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        />
      ) : (
        <span className="serif text-xl md:text-2xl text-ink/60 group-hover:text-ink text-center leading-tight tracking-tight transition-colors">
          {client.name}
        </span>
      )}

      {/* Tooltip con nombre + flecha */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out-strong bg-ink px-4 py-2 flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-fg-on-dark truncate">{client.name}</span>
        {client.url && <ArrowUpRight size={12} className="text-teal-glow shrink-0" />}
      </div>
    </motion.div>
  )

  return client.url ? (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={client.name}
      className="block"
    >
      {content}
    </a>
  ) : (
    content
  )
}
