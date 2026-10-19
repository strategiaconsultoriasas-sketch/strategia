import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const items = [
  {
    img: '/assets/img/ciclo-estrategico.png',
    title: 'El ciclo estratégico',
    sub: 'Un sistema que todo CEO debe conocer e implementar para escalar.',
    tag: 'Metodología',
  },
  {
    img: '/assets/img/5-principios.png',
    title: '5 principios empresariales',
    sub: 'Para etapas iniciales del negocio.',
    tag: 'Fundamentos',
  },
  {
    img: '/assets/img/que-hace-rentable.png',
    title: '¿Qué hace rentable a un negocio?',
    sub: 'Palancas de rentabilidad que casi nadie activa a la vez.',
    tag: 'Finanzas',
  },
]

export function Gallery() {
  return (
    <section className="relative surface-paper-2 py-28 md:py-36 border-t border-paper-rule">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div className="max-w-xl">
            <div className="kicker text-teal mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              Contenidos de valor
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.03em] leading-[1.1] text-ink">
              Publicamos los modelos que usamos con nuestros clientes.
            </h2>
          </div>
          <p className="text-base text-fg-on-light-mute leading-relaxed max-w-sm">
            Nuestra forma de hacer consultoría es abierta: compartimos los frameworks y hojas
            de ruta en redes para que los equipos empiecen a pensar diferente desde ya.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.a
              key={it.title}
              href="https://www.facebook.com/strategiaconsultoriaeinnovacion"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="group block bg-paper border border-paper-rule overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden bg-paper-2 p-4">
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-full h-full object-contain transition-transform duration-700 ease-out-strong group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-6 border-t border-paper-rule">
                <div className="flex items-center justify-between mb-3">
                  <span className="kicker text-fg-on-light-dim">{it.tag}</span>
                  <ArrowUpRight
                    size={14}
                    className="text-fg-on-light-dim group-hover:text-teal transition-colors"
                  />
                </div>
                <h3 className="text-lg font-medium text-ink tracking-tight leading-tight mb-2">
                  {it.title}
                </h3>
                <p className="text-sm text-fg-on-light-mute leading-relaxed">{it.sub}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://www.facebook.com/strategiaconsultoriaeinnovacion"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-light"
          >
            Ver más contenidos en Facebook
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
