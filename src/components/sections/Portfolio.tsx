import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '../../data'

export function Portfolio({ withHeader = true }: { withHeader?: boolean }) {
  const [active, setActive] = useState(0)

  return (
    <section id="portafolio" className="relative surface-paper py-28 md:py-36">
      <div className="container-x">
        {withHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl mb-16"
          >
            <div className="kicker text-teal mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              Transformación digital, en vivo
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-ink">
              La línea de innovación no se queda en PowerPoint.
            </h2>
            <p className="mt-6 text-lg text-fg-on-light-mute leading-relaxed">
              Cuando el problema lo pide, construimos la tecnología. Estos son los productos y
              sitios que operan hoy, respaldando nuestra línea de Transformación Digital e
              Innovación.
            </p>
          </motion.div>
        )}

        {/* Showcase principal — grande + lista */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-10 items-start">
          {/* Imagen grande del activo */}
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="lg:sticky lg:top-28"
          >
            <a
              href={portfolio[active].url ?? '#'}
              target={portfolio[active].url ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group relative block aspect-[16/10] overflow-hidden border border-paper-rule bg-ink"
            >
              <img
                src={portfolio[active].image}
                alt={portfolio[active].name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out-strong group-hover:scale-[1.03]"
              />
              {/* overlay inferior con metadata */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-ink via-ink/70 to-transparent">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <div className="kicker text-teal-glow mb-2">
                      {portfolio[active].kind} · {portfolio[active].sector}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium text-fg-on-dark tracking-tight">
                      {portfolio[active].name}
                    </h3>
                    <p className="mt-2 text-sm text-fg-on-dark-mute max-w-xl">
                      {portfolio[active].body}
                    </p>
                  </div>
                  {portfolio[active].url && (
                    <div className="h-12 w-12 rounded-full border border-teal-glow/40 bg-teal/20 backdrop-blur flex items-center justify-center shrink-0 transition-transform duration-200 ease-out-strong group-hover:scale-110 group-active:scale-95">
                      <ArrowUpRight size={18} className="text-fg-on-dark" />
                    </div>
                  )}
                </div>
              </div>
            </a>
            <div className="mt-3 flex items-center justify-between text-xs text-fg-on-light-dim">
              <span>{portfolio[active].status}</span>
              {portfolio[active].url && (
                <a
                  href={portfolio[active].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal hover:text-teal-deep transition-colors inline-flex items-center gap-1.5"
                >
                  Visitar el sitio <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Lista navegable */}
          <div className="flex flex-col">
            <div className="kicker text-fg-on-light-dim mb-5 hidden lg:block">Explorar</div>
            {portfolio.map((p, i) => (
              <motion.button
                key={p.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`group text-left py-4 border-t border-paper-rule transition-colors cursor-pointer ${
                  active === i ? 'text-ink' : 'text-fg-on-light-mute hover:text-ink'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-mono tabular-nums transition-colors ${
                          active === i ? 'text-teal' : 'text-fg-on-light-dim'
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="text-base md:text-lg font-medium">{p.name}</span>
                    </div>
                    <div className="mt-1 text-xs text-fg-on-light-dim">{p.sector}</div>
                  </div>
                  <motion.span
                    animate={{
                      scaleX: active === i ? 1 : 0,
                      opacity: active === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformOrigin: 'right' }}
                    className="block h-px w-12 bg-teal mt-3 shrink-0"
                  />
                </div>
              </motion.button>
            ))}
            <div className="h-px bg-paper-rule" />
          </div>
        </div>
      </div>
    </section>
  )
}
