import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '../../data'

export function HomeShowcase() {
  const [active, setActive] = useState(0)
  const current = portfolio[active]

  return (
    <section className="relative surface-ink py-28 md:py-36 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-x relative">
        {/* Header */}
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
              Portafolio
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-fg-on-dark">
              Algunos desarrollos personalizados para nuestros clientes.
            </h2>
          </div>
          <Link
            to="/portafolio"
            className="btn-ghost-dark group self-start lg:self-end whitespace-nowrap"
          >
            Ver portafolio completo
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>

        {/* Showcase: imagen grande + lista */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-12 items-start">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <a
              href={current.url ?? '#'}
              target={current.url ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group relative block aspect-[16/10] overflow-hidden bg-ink-deep border border-white/10"
            >
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out-strong group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-ink via-ink/60 to-transparent">
                <div className="flex items-end justify-between gap-6">
                  <div className="min-w-0">
                    <div className="kicker text-teal-glow mb-2 truncate">
                      {current.kind} · {current.sector}
                    </div>
                    <h3 className="text-2xl md:text-4xl font-medium text-fg-on-dark tracking-[-0.02em]">
                      {current.name}
                    </h3>
                  </div>
                  {current.url && (
                    <div className="h-14 w-14 rounded-full border border-teal-glow/40 bg-teal/20 backdrop-blur flex items-center justify-center shrink-0 transition-transform duration-200 ease-out-strong group-hover:scale-110 group-active:scale-95">
                      <ArrowUpRight size={18} className="text-fg-on-dark" />
                    </div>
                  )}
                </div>
              </div>
            </a>

            <div className="mt-4 flex items-center justify-between text-xs text-fg-on-dark-mute">
              <span>{current.status}</span>
              <span className="font-mono">
                {String(active + 1).padStart(2, '0')} / {String(portfolio.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>

          <div>
            {portfolio.map((p, i) => (
              <motion.button
                key={p.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group text-left w-full py-5 border-t border-white/10 cursor-pointer transition-colors ${
                  active === i ? 'text-fg-on-dark' : 'text-fg-on-dark-mute hover:text-fg-on-dark'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <span
                      className={`text-xs font-mono tabular-nums shrink-0 mt-1.5 transition-colors ${
                        active === i ? 'text-teal-glow' : 'text-fg-on-dark-dim'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-base md:text-lg font-medium leading-tight">{p.name}</div>
                      <div className="mt-1 text-xs text-fg-on-dark-mute truncate">{p.sector}</div>
                    </div>
                  </div>
                  <motion.span
                    animate={{
                      scaleX: active === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformOrigin: 'right' }}
                    className="block h-px w-12 bg-teal mt-3 shrink-0"
                  />
                </div>
              </motion.button>
            ))}
            <div className="h-px bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  )
}
