import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Toolkit } from '../components/sections/Toolkit'

const infographics = [
  { img: '/assets/img/ciclo-estrategico.png', title: 'El ciclo estratégico', tag: 'Metodología' },
  { img: '/assets/img/5-principios.png', title: '5 principios empresariales', tag: 'Fundamentos' },
  { img: '/assets/img/que-hace-rentable.png', title: '¿Qué hace rentable a un negocio?', tag: 'Finanzas' },
  { img: '/assets/img/arte-de-dirigir.png', title: 'El arte de dirigir', tag: 'Liderazgo' },
  { img: '/assets/img/habilidades.png', title: 'Habilidades que abren puertas', tag: 'Talento' },
  { img: '/assets/img/7-verdades-liderazgo.png', title: 'Las 7 verdades del liderazgo', tag: 'Liderazgo' },
  { img: '/assets/img/eficiencia-vs-eficacia.png', title: 'Eficiencia vs. eficacia', tag: 'Operaciones' },
  { img: '/assets/img/formula-exito.png', title: 'La fórmula del éxito', tag: 'Estrategia' },
  { img: '/assets/img/gestionar-tiempo.png', title: 'Aprende a gestionar tu tiempo', tag: 'Productividad' },
  { img: '/assets/img/no-falta-tiempo.png', title: 'No te falta tiempo, te sobran prioridades', tag: 'Enfoque' },
  { img: '/assets/img/optimizar-estrategia.png', title: 'Cómo optimizar tu estrategia', tag: 'Estrategia' },
  { img: '/assets/img/eficiencia.png', title: 'La eficiencia no es hacer más', tag: 'Operaciones' },
]

export default function Herramientas() {
  return (
    <>
      <PageHero
        kicker="Caja de herramientas"
        edition="Capítulo 06"
        title={<>Primero el diagnóstico. Después la estrategia.</>}
        sub="Antes de proponer, escuchamos. Nuestras herramientas y contenidos están disponibles para que empiece a pensar diferente desde ya."
      />

      <Toolkit />

      <section className="surface-paper-2 py-24 md:py-32 border-t border-paper-rule">
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
              <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-tight text-ink">
                Doce modelos que publicamos este año.
              </h2>
            </div>
            <p className="text-base text-fg-on-light-mute leading-relaxed max-w-sm">
              Compartimos los frameworks y hojas de ruta que usamos con nuestros clientes.
              Síganos para no perderse ningún capítulo.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {infographics.map((it, i) => (
              <motion.a
                key={it.title}
                href="https://www.facebook.com/strategiaconsultoriaeinnovacion"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: (i % 4) * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="group block bg-paper border border-paper-rule overflow-hidden transition-transform duration-200 ease-out-strong active:scale-[0.98]"
              >
                <div className="relative aspect-square overflow-hidden bg-paper-2 p-3">
                  <img
                    src={it.img}
                    alt={it.title}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-500 ease-out-strong group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4 border-t border-paper-rule">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-fg-on-light-dim">
                      {it.tag}
                    </span>
                    <ArrowUpRight size={12} className="text-fg-on-light-dim group-hover:text-teal transition-colors" />
                  </div>
                  <h3 className="text-sm font-medium text-ink tracking-tight leading-tight">
                    {it.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="https://www.facebook.com/strategiaconsultoriaeinnovacion"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              Ver más en Facebook
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
