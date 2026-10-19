import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Toolkit() {
  return (
    <section id="herramientas" className="relative surface-paper-2 py-24 md:py-32 border-t border-paper-rule">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative overflow-hidden border border-paper-rule"
        >
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-0">
            <div className="bg-paper p-10 md:p-14 flex flex-col justify-center">
              <div className="kicker text-teal mb-5">Herramienta propia · versión extendida</div>
              <h3 className="text-3xl md:text-4xl font-medium text-ink tracking-[-0.025em] leading-tight mb-5">
                Diagnóstico Empresarial 360°
              </h3>
              <p className="text-base md:text-lg text-fg-on-light-mute leading-relaxed mb-8">
                La versión completa evalúa <strong className="text-ink">12 dimensiones clave</strong>{' '}
                con escala Likert y entrega recomendaciones personalizadas. 10 minutos. Gratis.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  'Innovación · Talento · Finanzas · Marketing',
                  'Operaciones · Liderazgo · Cultura · Tecnología',
                  'Clientes · Procesos · Sostenibilidad · Crecimiento',
                ].map((row) => (
                  <li key={row} className="flex items-start gap-3 text-sm text-fg-on-light-mute">
                    <span className="h-5 w-5 rounded-full border border-teal flex items-center justify-center shrink-0 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                    </span>
                    {row}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/diagnostico" className="btn-ink group">
                  Hacer el diagnóstico completo
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
                <Link to="/contacto" className="btn-ghost-light">
                  Hablar con un consultor
                </Link>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-paper-2 to-paper overflow-hidden min-h-[400px]">
              <img
                src="/assets/img/diagnostico-360.png"
                alt="Diagnóstico Empresarial 360°"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
