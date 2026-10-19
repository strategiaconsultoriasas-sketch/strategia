import { motion } from 'framer-motion'
import { Mail, MessageCircle, Phone, ArrowUpRight } from 'lucide-react'

export function Contact() {
  return (
    <section id="contacto" className="relative surface-paper py-28 md:py-36">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-md"
          >
            <p className="text-lg text-fg-on-light-mute leading-relaxed">
              Elija el canal que le quede más cómodo. Respondemos todas las conversaciones de
              estrategia dentro del siguiente día hábil.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="divide-y divide-paper-rule border-y border-paper-rule"
          >
            <ContactRow
              icon={MessageCircle}
              label="WhatsApp"
              value="+57 320 304 7445"
              href="https://wa.me/573203047445"
            />
            <ContactRow
              icon={Phone}
              label="Teléfono · Colombia"
              value="+57 320 304 7445"
              href="tel:+573203047445"
            />
            <ContactRow
              icon={Mail}
              label="Correo electrónico"
              value="strategiaconsultoriasas@gmail.com"
              href="mailto:strategiaconsultoriasas@gmail.com"
            />
            <div className="py-7 grid sm:grid-cols-3 gap-4 text-sm">
              <ContactCell label="Base" value="Yopal, Casanare · Colombia" />
              <ContactCell label="Cobertura" value="Nacional · Remoto" />
              <ContactCell label="Horario" value="Lun–Sáb · 8am–7pm (COT)" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail
  label: string
  value: string
  href: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-6 py-7"
    >
      <div className="flex items-center gap-5">
        <div className="h-10 w-10 rounded-sm bg-ink/5 flex items-center justify-center">
          <Icon size={18} className="text-ink" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-fg-on-light-dim mb-1">
            {label}
          </div>
          <div className="text-lg font-medium text-ink tracking-tight">{value}</div>
        </div>
      </div>
      <ArrowUpRight
        size={18}
        className="text-fg-on-light-dim group-hover:text-teal transition-colors -translate-x-1 group-hover:translate-x-0"
      />
    </a>
  )
}

function ContactCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-fg-on-light-dim mb-1.5">
        {label}
      </div>
      <div className="text-sm font-medium text-ink">{value}</div>
    </div>
  )
}
