import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/enfoque', label: 'Enfoque' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/equipo', label: 'Equipo' },
  { to: '/contacto', label: 'Contacto' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Si estamos en una página NO-home el nav debe ser legible desde el inicio
  const forceDark = !isHome

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || forceDark
          ? 'backdrop-blur-md bg-ink/85 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-sm bg-white/95 flex items-center justify-center transition-transform group-active:scale-95 duration-150 ease-out-strong">
            <img src="/assets/logo.png" alt="Strategia" className="h-6 w-auto" />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-wide text-fg-on-dark">STRATEGIA</span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-teal-glow mt-0.5">
              Consultoría · Innovación
            </span>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-teal-glow' : 'text-fg-on-dark-mute hover:text-fg-on-dark'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3 right-3 bottom-0.5 h-px bg-teal"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 text-fg-on-dark active:scale-95 transition-transform duration-150 ease-out-strong"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden overflow-hidden border-t border-white/5 bg-ink-deep/95 backdrop-blur-xl"
          >
            <ul className="container-x py-4 flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `block px-2 py-3 text-sm font-medium ${
                        isActive ? 'text-teal-glow' : 'text-fg-on-dark-mute hover:text-fg-on-dark'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
