import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/**
 * Strip de infografías marca STRATEGIA en el home.
 * Marquee horizontal con las infografías reales que ya usamos con clientes.
 */
const items = [
  { img: '/assets/img/ciclo-estrategico.png', title: 'El ciclo estratégico' },
  { img: '/assets/img/5-principios.png', title: '5 principios empresariales' },
  { img: '/assets/img/arte-de-dirigir.png', title: 'El arte de dirigir' },
  { img: '/assets/img/habilidades.png', title: 'Habilidades que abren puertas' },
  { img: '/assets/img/7-verdades-liderazgo.png', title: '7 verdades del liderazgo' },
  { img: '/assets/img/eficiencia-vs-eficacia.png', title: 'Eficiencia vs. eficacia' },
  { img: '/assets/img/formula-exito.png', title: 'La fórmula del éxito' },
  { img: '/assets/img/no-falta-tiempo.png', title: 'No te falta tiempo' },
  { img: '/assets/img/que-hace-rentable.png', title: '¿Qué hace rentable?' },
  { img: '/assets/img/optimizar-estrategia.png', title: 'Optimizar la estrategia' },
]

export function InfographicStrip() {
  const loop = [...items, ...items]
  return (
    <section className="relative surface-paper-2 py-20 md:py-24 border-y border-paper-rule overflow-hidden">
      <div className="container-x mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5"
        >
          <div className="max-w-xl">
            <div className="kicker text-teal mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              Los modelos que publicamos
            </div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.03em] leading-tight text-ink">
              Los mismos frameworks que usamos con nuestros clientes.
            </h2>
          </div>
          <Link to="/herramientas" className="btn-ghost-light group self-start md:self-end whitespace-nowrap">
            Ver la biblioteca completa
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <motion.div
          className="flex gap-5"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: { repeat: Infinity, repeatType: 'loop', duration: 60, ease: 'linear' },
          }}
          style={{ paddingLeft: 'calc((100vw - 1240px) / 2 + 24px)' }}
        >
          {loop.map((it, i) => (
            <a
              key={`${it.title}-${i}`}
              href="https://www.facebook.com/strategiaconsultoriaeinnovacion"
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 w-[280px] md:w-[320px] block"
            >
              <div className="relative aspect-square overflow-hidden bg-paper border border-paper-rule p-3">
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-500 ease-out-strong group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-medium text-ink">{it.title}</span>
                <ArrowUpRight
                  size={14}
                  className="text-fg-on-light-dim group-hover:text-teal transition-colors"
                />
              </div>
            </a>
          ))}
        </motion.div>
        {/* Fade a los lados */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper-2 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper-2 to-transparent" />
      </div>
    </section>
  )
}
