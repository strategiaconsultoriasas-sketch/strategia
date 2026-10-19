import { motion } from 'framer-motion'

const pillars = [
  {
    kicker: '01',
    label: 'Pensamiento estratégico',
    title: 'Claridad de dirección y objetivos de largo plazo.',
    body: 'Definimos el rumbo. Clarificamos dónde está hoy la organización y hacia dónde debe navegar en los próximos cinco años. Sin dirección, el esfuerzo no suma.',
    image: '/assets/img/cultura.jpg',
    caption: 'Trabajo con comités directivos',
  },
  {
    kicker: '02',
    label: 'Prospectiva e innovación',
    title: 'Anticipación de escenarios y oportunidades.',
    body: 'Metodologías de futuros, no de pronósticos. Convertimos las señales débiles del mercado en decisiones concretas de corto plazo.',
    image: '/assets/img/innovacion.jpg',
    caption: 'Innovación como disciplina',
  },
  {
    kicker: '03',
    label: 'Toma de decisiones',
    title: 'Metodologías basadas en datos y análisis sistémico.',
    body: 'Las decisiones importantes no se toman con intuición: se toman con evidencia estructurada. Modelos cuantitativos y lectura de contexto.',
    image: '/assets/img/propuesta-valor.jpg',
    caption: 'Modelos y análisis sistémico',
  },
]

export function Pillars({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <section id="enfoque" className="relative surface-paper py-28 md:py-36">
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
              Nuestro enfoque
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-ink">
              Tres disciplinas que trabajan como un solo sistema.
            </h2>
            <p className="mt-6 text-lg text-fg-on-light-mute leading-relaxed max-w-xl">
              No vendemos recetas aisladas. Nuestro trabajo integra pensamiento estratégico,
              prospectiva y toma de decisiones basada en datos en un único método de intervención.
            </p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((p, i) => (
            <motion.article
              key={p.kicker}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="group flex flex-col bg-paper-2 border border-paper-rule overflow-hidden"
            >
              {/* Imagen */}
              <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                <img
                  src={p.image}
                  alt={p.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-strong group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-fg-on-dark">
                  <span className="font-sans text-5xl font-light leading-none tabular-nums">
                    {p.kicker}
                  </span>
                  <span className="kicker text-teal-glow text-right">{p.label}</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-ink mb-4 leading-tight">
                  {p.title}
                </h3>
                <p className="text-base text-fg-on-light-mute leading-relaxed">{p.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
