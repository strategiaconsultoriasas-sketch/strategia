import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/**
 * 04. Pilares — layout editorial asimétrico tipo revista.
 * Sin cards cuadrados. Cada pilar: foto grande + número y texto a su lado.
 * Alineación zig-zag: 01 izq, 02 der, 03 izq.
 */
const pillars = [
  {
    kicker: '01',
    label: 'Pensamiento estratégico',
    title: 'Claridad de dirección y objetivos de largo plazo.',
    body: 'Definimos el rumbo. Clarificamos dónde está hoy la organización y hacia dónde debe navegar en los próximos cinco años.',
    bullets: ['Hojas de ruta a 5 años', 'Comités de dirección facilitados', 'Mapas de capacidad'],
    image: '/assets/img/cultura.jpg',
  },
  {
    kicker: '02',
    label: 'Prospectiva e innovación',
    title: 'Anticipación de escenarios y oportunidades.',
    body: 'Metodologías de futuros, no de pronósticos. Convertimos las señales débiles del mercado en decisiones concretas de corto plazo.',
    bullets: ['Análisis de 4 escenarios', 'Vigilancia tecnológica', 'Portafolios de innovación'],
    image: '/assets/img/innovacion.jpg',
  },
  {
    kicker: '03',
    label: 'Toma de decisiones',
    title: 'Metodologías basadas en datos y análisis sistémico.',
    body: 'Las decisiones importantes se toman con evidencia estructurada. Modelos cuantitativos, dashboards vivos e IA aplicada.',
    bullets: ['Modelos predictivos', 'Dashboards ejecutivos', 'IA y ciencia de datos'],
    image: '/assets/img/transformacion.jpg',
  },
]

export function PillarsFlip() {
  return (
    <section className="relative surface-paper py-24 md:py-28">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20"
        >
          <div className="max-w-xl">
            <div className="kicker text-teal mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              Nuestro enfoque
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-ink">
              Un método en tres disciplinas que operan como un solo sistema.
            </h2>
          </div>
          <Link to="/enfoque" className="btn-ghost-light group self-start lg:self-end whitespace-nowrap">
            Explorar enfoque
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {pillars.map((p, i) => (
            <PillarBlock key={p.kicker} pillar={p} reverse={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PillarBlock({
  pillar,
  reverse,
  index,
}: {
  pillar: (typeof pillars)[number]
  reverse: boolean
  index: number
}) {
  return (
    <article
      className={`grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center ${
        reverse ? 'lg:[grid-template-columns:1fr_1.1fr]' : ''
      }`}
    >
      {/* Imagen grande */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        className={`relative aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-ink ${
          reverse ? 'lg:order-2' : ''
        }`}
      >
        <img
          src={pillar.image}
          alt={pillar.label}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* Número editorial XXL sobre la foto */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10">
          <span className="block font-sans text-7xl md:text-9xl font-light text-fg-on-dark leading-none tabular-nums drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            {pillar.kicker}
          </span>
        </div>
        {/* Caption en la foto */}
        <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
          <div className="kicker text-teal-glow">{pillar.label}</div>
        </div>
      </motion.div>

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        className={reverse ? 'lg:order-1' : ''}
      >
        <div className="kicker text-teal mb-5">Capítulo 0{index + 1}</div>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-ink tracking-[-0.025em] leading-[1.1] mb-6">
          {pillar.title}
        </h3>
        <p className="text-lg text-fg-on-light-mute leading-relaxed mb-8 max-w-lg">
          {pillar.body}
        </p>
        <ul className="space-y-3">
          {pillar.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm md:text-base text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-teal mt-2 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </motion.div>
    </article>
  )
}
