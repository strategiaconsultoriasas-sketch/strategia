import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Play, ArrowUpRight } from 'lucide-react'

/**
 * Sección de redes sociales: dos videos reales + preview del feed +
 * CTA directo a TikTok y Facebook con stats.
 */
const TIKTOK_URL = 'https://www.tiktok.com/@strategiaconsultoria'
const FACEBOOK_URL = 'https://www.facebook.com/strategiaconsultoriaeinnovacion'

export function SocialFeed() {
  return (
    <section className="relative surface-paper py-24 md:py-28">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-xl">
            <div className="kicker text-teal mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              Nos puede seguir en redes
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-ink">
              Publicamos un modelo nuevo cada semana — en video y en imagen.
            </h2>
          </div>
          <div className="flex gap-3">
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink group"
            >
              <TikTokLogo /> 710 en TikTok
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light group"
            >
              <FacebookIcon /> Facebook
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Grid de 2 videos + 1 bloque editorial */}
        <div className="grid lg:grid-cols-[1fr_1fr_1.1fr] gap-5">
          <VideoCard
            src="/assets/video/strategia-1.mp4"
            label="Lo que nos distingue"
            network="Reel"
          />
          <VideoCard
            src="/assets/video/strategia-2.mp4"
            label="Pensamiento estratégico"
            network="Short"
          />
          <motion.a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="group relative surface-ink p-7 md:p-10 flex flex-col justify-between overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'url(/assets/img/arte-de-dirigir.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="relative">
              <div className="kicker text-teal-glow mb-3">Perfil activo · 2026</div>
              <h3 className="text-2xl md:text-3xl font-medium text-fg-on-dark tracking-tight leading-tight mb-6">
                1.134 me gusta en TikTok. 185 seguidores en Facebook.
              </h3>
              <p className="text-sm text-fg-on-dark leading-relaxed">
                Nuestros contenidos — infografías, videos y modelos de gestión — se publican
                antes aquí que en cualquier otro canal.
              </p>
            </div>
            <div className="relative mt-8 flex items-center justify-between">
              <div className="flex items-baseline gap-6">
                <StatBlock n="1.1k" label="likes TikTok" />
                <StatBlock n="710" label="seguidores" />
                <StatBlock n="40+" label="videos" />
              </div>
              <ArrowUpRight
                size={20}
                className="text-teal-glow transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

function VideoCard({
  src,
  label,
  network,
}: {
  src: string
  label: string
  network: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="group relative aspect-[4/5] overflow-hidden bg-ink text-left"
    >
      <video
        ref={videoRef}
        src={src}
        preload="metadata"
        playsInline
        muted
        loop
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent pointer-events-none" />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-teal-glow/90 backdrop-blur flex items-center justify-center shadow-xl transition-transform duration-200 ease-out-strong group-hover:scale-110 group-active:scale-95">
            <Play size={22} className="text-ink translate-x-0.5" fill="currentColor" />
          </div>
        </div>
      )}
      <div className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7 text-fg-on-dark">
        <div className="kicker text-teal-glow mb-2">{network}</div>
        <h4 className="text-lg md:text-xl font-medium tracking-tight">{label}</h4>
      </div>
    </motion.button>
  )
}

function StatBlock({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-xl font-medium text-teal-glow tabular-nums leading-none">{n}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-fg-on-dark-dim">
        {label}
      </div>
    </div>
  )
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function TikTokLogo() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  )
}
