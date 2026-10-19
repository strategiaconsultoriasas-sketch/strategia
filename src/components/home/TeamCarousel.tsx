import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { team } from '../../data'

/**
 * 07. Equipo — layout editorial tipo revista, sin cards simétricos.
 * Lista indexada estilo "staff" + una tarjeta destacada con foto conceptual.
 */
export function TeamCarousel() {
  return (
    <section className="relative surface-ink py-24 md:py-28 overflow-hidden">
      {/* Imagen de fondo editorial */}
      <div className="absolute inset-0 opacity-[0.12]" aria-hidden>
        <img
          src="/assets/img/estructura.jpg"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover object-right"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60 pointer-events-none" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <div className="kicker text-teal-glow mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              Equipo
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-fg-on-dark">
              Seis mentes multidisciplinarias, un solo sistema.
            </h2>
          </div>
          <Link to="/equipo" className="btn-ghost-dark group self-start lg:self-end whitespace-nowrap">
            Conocer al equipo
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* Listado editorial: líder destacado + 5 inline */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* Líder destacado */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-ink-deep border-l-2 border-teal">
              <img
                src="/assets/img/cultura.jpg"
                alt="Equipo trabajando"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-10">
                <div className="font-sans text-6xl md:text-8xl font-light text-teal-glow leading-none tabular-nums mb-6">
                  01
                </div>
                <div className="kicker text-teal-glow mb-3">Dirección estratégica</div>
                <h3 className="text-2xl md:text-3xl font-medium text-fg-on-dark tracking-tight leading-tight mb-4">
                  {team[0].role}
                </h3>
                <p className="text-sm md:text-base text-fg-on-dark leading-relaxed max-w-md">
                  {team[0].bio}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Resto del equipo — lista editorial sin cards */}
          <div className="divide-y divide-white/10">
            {team.slice(1).map((m, i) => (
              <TeamRow key={m.kicker} member={m} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamRow({ member, index }: { member: (typeof team)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="group py-6 md:py-7 flex items-start gap-6 md:gap-8"
    >
      <div className="shrink-0 w-16 md:w-20">
        <div className="font-sans text-4xl md:text-5xl font-light text-teal-glow leading-none tabular-nums">
          0{index + 1}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="kicker text-teal-glow mb-2 opacity-70">
          {rolesMap[member.role as keyof typeof rolesMap]}
        </div>
        <h4 className="text-xl md:text-2xl font-medium text-fg-on-dark tracking-tight mb-2 group-hover:text-teal-glow transition-colors">
          {member.role}
        </h4>
        <p className="text-sm md:text-base text-fg-on-dark leading-relaxed max-w-2xl">
          {member.bio}
        </p>
      </div>
    </motion.article>
  )
}

// Sub-label por rol para variar vocabulario (anti-tell: no todo igual)
const rolesMap = {
  'La Visión Financiera': 'Finanzas · Modelos',
  'La Brújula Humana': 'Cultura · Cambio',
  'El Artífice de la Comunicación': 'Marketing · Narrativa',
  'El Visionario Digital': 'IA · Datos',
  'El Impulsor del Emprendimiento': 'Emprendimiento · Pymes',
}
