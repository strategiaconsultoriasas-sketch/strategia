import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, Landmark } from 'lucide-react'
import { servicesEmpresarial, servicesPublico } from '../../data'

/**
 * 06. Líneas de negocio — split screen interactivo.
 * Al hover sobre Empresarial, ese lado se expande a 65/35.
 * Al hover sobre Público, se invierte.
 */
export function SplitLines() {
  const [hover, setHover] = useState<'empresarial' | 'publico' | null>(null)

  return (
    <section className="relative surface-paper-2 py-24 md:py-32 overflow-hidden">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-2xl mb-14"
        >
          <div className="kicker text-teal mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-teal" />
            Líneas de negocio
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-ink">
            Elija su frente. Nosotros hablamos los dos idiomas.
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[520px] border border-paper-rule bg-paper overflow-hidden">
          <SplitPanel
            side="empresarial"
            icon={Building2}
            kicker="Sector empresarial"
            title="Para empresas que buscan crecer."
            img="/assets/img/crecimiento.jpg"
            services={servicesEmpresarial}
            active={hover === 'empresarial'}
            dimmed={hover === 'publico'}
            onEnter={() => setHover('empresarial')}
            onLeave={() => setHover(null)}
          />
          <SplitPanel
            side="publico"
            icon={Landmark}
            kicker="Sector público"
            title="Para entidades que modernizan."
            img="/assets/img/estructura.jpg"
            services={servicesPublico}
            active={hover === 'publico'}
            dimmed={hover === 'empresarial'}
            onEnter={() => setHover('publico')}
            onLeave={() => setHover(null)}
          />
        </div>

        <div className="mt-10 flex justify-end">
          <Link to="/servicios" className="btn-ghost-light group">
            Ver los 12 servicios
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

function SplitPanel({
  side,
  icon: Icon,
  kicker,
  title,
  img,
  services,
  active,
  dimmed,
  onEnter,
  onLeave,
}: {
  side: 'empresarial' | 'publico'
  icon: typeof Building2
  kicker: string
  title: string
  img: string
  services: { title: string; body: string }[]
  active: boolean
  dimmed: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={false}
      animate={{
        flexGrow: active ? 1.6 : dimmed ? 0.65 : 1,
      }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className={`relative group cursor-pointer overflow-hidden ${
        side === 'empresarial' ? 'border-b lg:border-b-0 lg:border-r' : ''
      } border-paper-rule`}
      style={{ flexBasis: 0 }}
    >
      {/* Fondo foto */}
      <div className="absolute inset-0">
        <img loading="lazy" decoding="async" src={img} alt="" className="w-full h-full object-cover" />
        <motion.div
          animate={{
            opacity: active ? 0.75 : 0.9,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-ink/70"
        />
      </div>

      {/* Contenido */}
      <div className="relative p-8 md:p-12 min-h-[520px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-11 w-11 rounded-sm bg-teal/20 border border-teal/40 backdrop-blur flex items-center justify-center">
              <Icon size={18} className="text-teal-glow" strokeWidth={1.5} />
            </div>
            <div>
              <div className="kicker text-teal-glow">{kicker}</div>
              <div className="text-xs text-fg-on-dark-mute mt-0.5">
                {services.length} especialidades
              </div>
            </div>
          </div>
          <h3 className="text-3xl md:text-4xl font-medium text-fg-on-dark tracking-[-0.025em] leading-tight mb-6 max-w-md">
            {title}
          </h3>
        </div>

        {/* Services list visible al hover */}
        <AnimatePresence>
          {active && (
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-8"
            >
              {services.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }}
                  className="flex items-start gap-2.5 text-sm text-fg-on-dark"
                >
                  <span className="text-xs font-mono text-teal-glow tabular-nums shrink-0 mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="leading-tight">{s.title}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {!active && (
          <div className="mt-8 kicker text-teal-glow flex items-center gap-2">
            Pase el cursor para abrir
            <ArrowUpRight size={14} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
