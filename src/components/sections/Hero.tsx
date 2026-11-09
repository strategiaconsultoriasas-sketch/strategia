import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax sutil
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Carga diferida del video: el poster pinta el LCP primero, luego llega el video
  useEffect(() => {
    // Respetar prefers-reduced-motion: no cargar video
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    // Esperar al load window + un tick extra para no pelear con el LCP
    const schedule = () => {
      const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => void })
        .requestIdleCallback
      if (idle) idle(() => setShouldLoadVideo(true))
      else setTimeout(() => setShouldLoadVideo(true), 400)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
    return () => window.removeEventListener('load', schedule)
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen surface-ink overflow-hidden">
      {/* Poster como <img> para que sea el candidato LCP */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 bg-ink-deep">
        <img
          src="/assets/img/transformacion.jpg"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            width={1280}
            height={720}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700"
            onCanPlay={(e) => e.currentTarget.classList.remove('opacity-0')}
            aria-hidden
          >
            <source src="/assets/video/encabezado.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Overlay editorial petróleo (más denso abajo para legibilidad) */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 to-ink pointer-events-none" />

      {/* Noise + grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Contenido */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative min-h-screen flex flex-col justify-end container-x pb-16 md:pb-24 pt-32"
      >
        <div className="max-w-4xl">
          {/* Kicker con línea */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="kicker text-teal-glow mb-10 flex items-center gap-3"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              style={{ transformOrigin: 'left' }}
              className="h-px w-16 bg-teal block"
            />
            Firma colombiana · Fundada en Casanare
          </motion.div>

          {/* Headline — con reveal palabra por palabra */}
          <h1 className="text-[2.5rem] sm:text-6xl lg:text-[5.5rem] font-medium tracking-[-0.035em] leading-[0.98] text-fg-on-dark">
            <WordReveal
              text="Transformamos la incertidumbre"
              delay={0.15}
            />
            <br />
            <WordReveal
              text="en ventaja competitiva."
              delay={0.5}
              accent="ventaja competitiva."
            />
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 max-w-xl text-lg md:text-xl text-fg-on-dark leading-[1.55]"
          >
            Firma colombiana de consultoría en{' '}
            <strong className="text-fg-on-dark font-medium">estrategia, prospectiva e innovación</strong>.
            Acompañamos a organizaciones públicas y privadas que lideran el futuro.
          </motion.p>

        </div>

        {/* Scroll indicator — centrado abajo para no chocar con los FABs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-on-dark-mute"
        >
          <span className="kicker text-fg-on-dark-mute">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-9 w-5 border border-fg-on-dark-mute rounded-full flex items-start justify-center pt-1.5"
          >
            <span className="h-1.5 w-0.5 bg-teal-glow rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function WordReveal({
  text,
  delay = 0,
  accent,
}: {
  text: string
  delay?: number
  accent?: string
}) {
  const words = text.split(' ')
  return (
    <span className="inline-flex flex-wrap gap-x-[0.25em]">
      {words.map((w, i) => {
        const isAccentWord =
          accent && accent.toLowerCase().split(' ').includes(w.toLowerCase().replace('.', ''))
        return (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: delay + i * 0.06,
                ease: [0.23, 1, 0.32, 1],
              }}
              className={`inline-block ${isAccentWord ? 'text-teal-glow' : ''}`}
            >
              {w}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
