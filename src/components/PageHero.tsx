import { motion } from 'framer-motion'

export function PageHero({
  kicker,
  title,
  sub,
  edition = '',
}: {
  kicker: string
  title: React.ReactNode
  sub?: string
  edition?: string
}) {
  return (
    <section className="relative surface-ink pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden">
      {/* grid de fondo */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* glow sutil */}
      <div className="absolute left-1/4 top-20 w-[500px] h-[500px] rounded-full bg-teal/10 blur-[120px] pointer-events-none -z-0" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="kicker text-teal-glow mb-6 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-teal" />
          {kicker}
          {edition && (
            <span className="text-fg-on-dark-dim normal-case tracking-normal font-normal ml-2">
              · {edition}
            </span>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[1.02] text-fg-on-dark max-w-4xl"
        >
          {title}
        </motion.h1>

        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8 max-w-2xl text-lg md:text-xl text-fg-on-dark-mute leading-relaxed"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  )
}
