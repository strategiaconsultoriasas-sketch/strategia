import { motion } from 'framer-motion'
import { Building2, Landmark, ArrowUpRight } from 'lucide-react'
import { servicesEmpresarial, servicesPublico } from '../../data'

export function Services({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <section id="servicios" className="relative surface-paper-2 py-28 md:py-36">
      <div className="container-x">
        {withHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-2xl mb-20"
          >
            <div className="kicker text-teal mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              Dos líneas, un equipo
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-ink">
              Consultoría para quien decide — en el sector privado y en el sector público.
            </h2>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <ServiceColumn
            icon={Building2}
            tag="Sector empresarial"
            title="Para empresas"
            image="/assets/img/crecimiento.jpg"
            items={servicesEmpresarial}
          />
          <ServiceColumn
            icon={Landmark}
            tag="Sector público"
            title="Para entidades públicas"
            image="/assets/img/estructura.jpg"
            items={servicesPublico}
          />
        </div>
      </div>
    </section>
  )
}

function ServiceColumn({
  icon: Icon,
  tag,
  title,
  image,
  items,
}: {
  icon: typeof Building2
  tag: string
  title: string
  image: string
  items: { title: string; body: string }[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="bg-paper border border-paper-rule overflow-hidden"
    >
      {/* Header con imagen */}
      <div className="relative aspect-[16/7] overflow-hidden bg-ink">
        <img loading="lazy" decoding="async" src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/60 to-ink/30" />
        <div className="absolute inset-0 p-8 md:p-10 flex items-end">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-sm bg-teal/20 border border-teal/40 flex items-center justify-center backdrop-blur-sm">
              <Icon size={20} className="text-teal-glow" strokeWidth={1.5} />
            </div>
            <div>
              <div className="kicker text-teal-glow">{tag}</div>
              <div className="text-xl md:text-2xl font-medium text-fg-on-dark tracking-tight mt-1">
                {title}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="divide-y divide-paper-rule">
        {items.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="group py-5 px-8 md:px-10 flex items-start gap-5 hover:bg-paper-2 transition-colors"
          >
            <span className="text-xs font-mono text-fg-on-light-dim tabular-nums mt-1 min-w-[2rem]">
              0{i + 1}
            </span>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-ink mb-1 flex items-center gap-2">
                {item.title}
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-60 translate-y-1 group-hover:translate-y-0 transition-all text-teal"
                />
              </h4>
              <p className="text-sm text-fg-on-light-mute leading-relaxed">{item.body}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
