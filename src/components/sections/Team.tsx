import { motion } from 'framer-motion'
import { team } from '../../data'

export function Team({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <section id="equipo" className="relative surface-paper py-28 md:py-36 overflow-hidden">
      <div className="container-x relative">
        {withHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl mb-20"
          >
            <div className="kicker text-teal mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              Equipo
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-ink">
              Más allá de los títulos. Seis mentes, un sistema.
            </h2>
            <p className="mt-6 text-lg text-fg-on-light-mute leading-relaxed">
              Somos un equipo multidisciplinario donde cada miembro aporta una pieza clave para
              resolver los desafíos de hoy. Nuestra fuerza reside en la combinación única de
              experiencia y perspectivas.
            </p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {team.map((m, i) => (
            <motion.div
              key={m.kicker}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="group relative p-6 md:p-8 border-l-2 border-paper-rule hover:border-teal transition-colors"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-sans text-4xl font-light text-teal leading-none tabular-nums">
                  {m.kicker}
                </span>
                <span className="h-px flex-1 bg-paper-rule group-hover:bg-teal/60 transition-colors" />
              </div>
              <h3 className="text-xl font-medium text-ink mb-3 tracking-tight">{m.role}</h3>
              <p className="text-sm text-fg-on-light-mute leading-relaxed">{m.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
