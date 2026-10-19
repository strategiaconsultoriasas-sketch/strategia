import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Target, X } from 'lucide-react'

/**
 * FAB stack:
 * - FAB principal (abajo, grande, teal, pulse ring + glow + label siempre visible): Diagnóstico 360°
 * - FAB secundario (arriba, pequeño, verde): WhatsApp directo
 *
 * El diagnóstico es la acción primaria del sitio.
 */
const WHATSAPP_URL =
  'https://wa.me/573203047445?text=' +
  encodeURIComponent(
    'Hola Strategia, me interesa agendar una llamada para hablar sobre consultoría estratégica.',
  )

export function ContactFab() {
  const reduced = useReducedMotion()
  const [attention, setAttention] = useState(false)
  const [hintSeen, setHintSeen] = useState(false)
  const [hintClosed, setHintClosed] = useState(false)

  // Shake sutil cada 15s (menos invasivo que antes)
  useEffect(() => {
    if (reduced) return
    const t = window.setInterval(() => {
      setAttention(true)
      window.setTimeout(() => setAttention(false), 900)
    }, 15000)
    return () => window.clearInterval(t)
  }, [reduced])

  // Hint pop-up: aparece 4s después de cargar y desaparece a los 10s (6s visible)
  useEffect(() => {
    if (hintClosed) return
    const t1 = window.setTimeout(() => setHintSeen(true), 4000)
    const t2 = window.setTimeout(() => setHintSeen(false), 10000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [hintClosed])

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[91] flex flex-col items-end gap-5 md:gap-6">
      {/* FAB WhatsApp secundario */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.8, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative h-12 w-12 md:h-14 md:w-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-8px_rgba(37,211,102,0.55)] flex items-center justify-center transition-shadow duration-300 hover:shadow-[0_12px_40px_-8px_rgba(37,211,102,0.7)]"
        aria-label="WhatsApp directo"
      >
        <WhatsAppIcon size={20} />
        {/* Tooltip simple en hover (solo desktop) */}
        <span className="pointer-events-none hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap bg-ink text-fg-on-dark text-xs font-medium px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          WhatsApp directo
        </span>
      </motion.a>

      {/* Hint pop-up para el diagnóstico */}
      <AnimatePresence>
        {hintSeen && !hintClosed && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 0, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-24 md:bottom-28 right-0 max-w-[270px]"
          >
            <div className="relative bg-ink text-fg-on-dark border border-teal-glow/40 shadow-xl pl-5 pr-8 py-3.5 text-sm leading-snug">
              <button
                onClick={() => {
                  setHintClosed(true)
                  setHintSeen(false)
                }}
                aria-label="Cerrar"
                className="absolute top-2 right-2 h-5 w-5 flex items-center justify-center text-fg-on-dark-mute hover:text-fg-on-dark transition-colors"
              >
                <X size={11} />
              </button>
              <div className="kicker text-teal-glow mb-1">Nuevo</div>
              <div className="text-xs md:text-sm">
                <strong>Diagnóstico 360°</strong> — 9 ejes, 15 min, reporte PDF.
              </div>
              {/* Flecha hacia el FAB principal */}
              <div className="absolute -bottom-2 right-10 w-3 h-3 bg-ink border-r border-b border-teal-glow/40 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB principal — Diagnóstico */}
      <motion.div
        initial={{ scale: 0, y: 40 }}
        animate={
          attention
            ? { scale: 1, y: 0, rotate: [0, -5, 5, -3, 3, 0] }
            : { scale: 1, y: 0, rotate: 0 }
        }
        transition={
          attention
            ? { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
            : { delay: 1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }
        }
        className="relative"
      >
        {/* Label siempre visible al lado (solo desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-4 whitespace-nowrap pointer-events-none"
        >
          <div className="bg-ink border border-teal-glow/30 px-4 py-2 shadow-xl">
            <div className="text-xs font-semibold text-fg-on-dark tracking-tight">
              Diagnóstico 360°
            </div>
            <div className="kicker text-teal-glow mt-0.5">Gratis · 15 min</div>
          </div>
          {/* Flecha */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-px w-2 h-2 bg-ink border-r border-t border-teal-glow/30 rotate-45" />
        </motion.div>

        {/* Pulse rings */}
        {!reduced && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-teal-glow pointer-events-none"
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-teal-glow pointer-events-none"
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 1.1,
              }}
            />
          </>
        )}

        {/* Glow background */}
        <div className="absolute inset-0 rounded-full bg-teal-glow/35 blur-2xl pointer-events-none scale-125" />

        <Link
          to="/diagnostico"
          onClick={() => {
            setHintSeen(false)
            setHintClosed(true)
          }}
          aria-label="Hacer diagnóstico empresarial 360° gratis"
          className="relative h-16 w-16 md:h-20 md:w-20 rounded-full bg-teal-glow text-ink shadow-[0_15px_50px_-10px_rgba(56,189,203,0.7)] flex items-center justify-center transition-transform duration-200 ease-out-strong hover:scale-110 active:scale-95"
        >
          {/* Órbita punteada que gira */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-ink/30"
          />
          <Target size={28} strokeWidth={1.75} className="relative z-10" />
        </Link>
      </motion.div>
    </div>
  )
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
    </svg>
  )
}
