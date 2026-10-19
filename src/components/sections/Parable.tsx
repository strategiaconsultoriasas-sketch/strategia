import { motion } from 'framer-motion'

export function Parable() {
  return (
    <section id="enfoque" className="relative surface-ink py-32 md:py-40 overflow-hidden">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="kicker text-teal-glow mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-teal" />
            Parábola de la vela
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight text-fg-on-dark mb-14">
            El problema no era la fuerza.<br />
            <span className="text-teal-glow">Era la dirección.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_320px] gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg md:text-xl text-fg-on-dark-mute leading-[1.7] space-y-6"
          >
            <p>
              Un CEO estaba convencido de que su empresa era el barco más rápido del océano.
              <span className="text-fg-on-dark"> "No necesitamos brújula"</span>, gritaba, mientras
              su tripulación remaba sin rumbo. Los marineros se agotaban, la carga se perdía y
              el barco giraba en círculos a pesar de todo el esfuerzo.
            </p>
            <p>
              Desesperado, el CEO contrató a una firma consultora. El consultor subió a bordo,
              observó el caos y se limitó a sonreír.{' '}
              <span className="text-fg-on-dark">"Su pasión es admirable"</span>, le dijo.
              "Pero están remando en dirección opuesta a la corriente".
            </p>
            <p>
              En cuestión de días, el barco navegaba a toda vela y llegó a destino antes de lo
              esperado. El CEO, asombrado, preguntó cómo lo había logrado. El consultor,
              sin decir una palabra, le mostró algo que la tripulación había ignorado por
              completo: <span className="text-teal-glow">la vela</span>.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="border-l-2 border-teal pl-6 md:sticky md:top-32"
          >
            <p className="text-2xl md:text-3xl font-medium text-fg-on-dark leading-tight mb-3">
              Su empresa <span className="text-teal-glow">ya tiene</span> una vela.
            </p>
            <p className="text-base text-fg-on-dark-mute leading-relaxed">
              Nosotros le enseñamos a su equipo a usarla bien. No reemplazamos a su tripulación.
              Les damos criterio, método y dirección.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
