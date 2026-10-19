import { PageHero } from '../components/PageHero'
import { Team } from '../components/sections/Team'
import { Sailboat } from '../components/Sailboat'

export default function Equipo() {
  return (
    <>
      <PageHero
        kicker="Equipo"
        edition="Capítulo 05"
        title={
          <>
            Más allá de los títulos. <span className="text-teal-glow">Seis mentes,</span> un
            sistema.
          </>
        }
        sub="Un equipo multidisciplinario donde cada miembro aporta una pieza clave. Nuestra fuerza reside en la combinación única de experiencia y perspectivas."
      />
      <Team withHeader={false} />
      <Sailboat />
    </>
  )
}
