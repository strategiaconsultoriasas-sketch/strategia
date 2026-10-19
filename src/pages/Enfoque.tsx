import { PageHero } from '../components/PageHero'
import { Pillars } from '../components/sections/Pillars'
import { Sailboat } from '../components/Sailboat'

export default function Enfoque() {
  return (
    <>
      <PageHero
        kicker="Nuestro enfoque"
        edition="Capítulo 02"
        title={
          <>
            Tres disciplinas <span className="text-teal-glow">que trabajan</span> como un
            solo sistema.
          </>
        }
        sub="Pensamiento estratégico, prospectiva e innovación, y toma de decisiones basada en datos. Un método, un lenguaje, un equipo."
      />
      <Pillars withHeader={false} />
      <Sailboat />
    </>
  )
}
