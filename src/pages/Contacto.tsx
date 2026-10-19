import { PageHero } from '../components/PageHero'
import { Contact } from '../components/sections/Contact'

export default function Contacto() {
  return (
    <>
      <PageHero
        kicker="Hablemos"
        edition="Capítulo 07"
        title={
          <>
            ¿Un desafío estratégico <span className="text-teal-glow">sobre la mesa?</span>
          </>
        }
        sub="Agende 30 minutos con nuestro equipo. Sin costo, sin fricción, sin presentación de powerpoint."
      />
      <Contact />
    </>
  )
}
