import { Link } from 'react-router-dom'
import { MessageCircle, Mail, Phone } from 'lucide-react'

const TIKTOK_URL = 'https://www.tiktok.com/@strategiaconsultoria'
const FACEBOOK_URL = 'https://www.facebook.com/strategiaconsultoriaeinnovacion'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="surface-ink-deep border-t border-white/5 py-16">
      <div className="container-x">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="h-9 w-9 rounded-sm bg-white/95 flex items-center justify-center transition-transform duration-150 group-active:scale-95 ease-out-strong">
                <img src="/assets/logo.png" alt="Strategia" className="h-6 w-auto" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold tracking-wide text-fg-on-dark">
                  STRATEGIA
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase text-teal-glow mt-0.5">
                  Consultoría · Innovación
                </span>
              </div>
            </Link>
            <p className="text-sm text-fg-on-dark-mute leading-relaxed max-w-xs mb-6">
              Transformamos la incertidumbre en ventaja competitiva. Estrategia, prospectiva e
              innovación.
            </p>
            {/* Social icon bar en el footer */}
            <div className="flex items-center gap-2">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-fg-on-dark-mute hover:text-teal-glow hover:border-teal-glow/40 transition-colors active:scale-95 duration-150 ease-out-strong"
              >
                <FacebookIcon />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-fg-on-dark-mute hover:text-teal-glow hover:border-teal-glow/40 transition-colors active:scale-95 duration-150 ease-out-strong"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://wa.me/573203047445"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-fg-on-dark-mute hover:text-teal-glow hover:border-teal-glow/40 transition-colors active:scale-95 duration-150 ease-out-strong"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:strategiaconsultoriasas@gmail.com"
                aria-label="Correo"
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-fg-on-dark-mute hover:text-teal-glow hover:border-teal-glow/40 transition-colors active:scale-95 duration-150 ease-out-strong"
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>
              <a
                href="tel:+573203047445"
                aria-label="Teléfono"
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-fg-on-dark-mute hover:text-teal-glow hover:border-teal-glow/40 transition-colors active:scale-95 duration-150 ease-out-strong"
              >
                <Phone size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <FooterCol
            title="Navegación"
            links={[
              { label: 'Inicio', href: '/' },
              { label: 'Enfoque', href: '/enfoque' },
              { label: 'Servicios', href: '/servicios' },
              { label: 'Portafolio', href: '/portafolio' },
              { label: 'Equipo', href: '/equipo' },
              { label: 'Herramientas', href: '/herramientas' },
            ]}
          />
          <FooterCol
            title="Contacto"
            links={[
              { label: 'WhatsApp', href: 'https://wa.me/573203047445', external: true },
              { label: 'Colombia +57', href: 'tel:+573203047445' },
              { label: 'Correo', href: 'mailto:strategiaconsultoriasas@gmail.com' },
              { label: 'Diagnóstico 360°', href: '/diagnostico' },
            ]}
          />
          <FooterCol
            title="Redes"
            links={[
              {
                label: 'Facebook · 185 seguidores',
                href: FACEBOOK_URL,
                external: true,
              },
              {
                label: 'TikTok · 710 seguidores',
                href: TIKTOK_URL,
                external: true,
              },
            ]}
          />
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-fg-on-dark-dim">
          <div>© {year} Strategia Consultoría e Innovación. Todos los derechos reservados.</div>
          <div>
            Desarrollado por{' '}
            <span className="text-fg-on-dark-mute font-medium">
              Strategia Consultoría e Innovación
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string; external?: boolean }[]
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-teal-glow mb-4">{title}</div>
      <ul className="space-y-2.5">
        {links.map((l) => {
          const isInternal = l.href.startsWith('/')
          const className =
            'text-sm text-fg-on-dark-mute hover:text-fg-on-dark transition-colors'
          return (
            <li key={l.label}>
              {isInternal ? (
                <Link to={l.href} className={className}>
                  {l.label}
                </Link>
              ) : (
                <a
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noopener noreferrer' : undefined}
                  className={className}
                >
                  {l.label}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
