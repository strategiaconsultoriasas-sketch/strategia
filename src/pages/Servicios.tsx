import { PageHero } from '../components/PageHero'
import { Services } from '../components/sections/Services'
import { Sailboat } from '../components/Sailboat'

export default function Servicios() {
  return (
    <>
      <PageHero
        kicker="Servicios"
        edition="Capítulo 03"
        title={
          <>
            Doce frentes. <span className="text-teal-glow">Un criterio.</span> Resultado en
            producción.
          </>
        }
        sub="Dos líneas de servicio para quien decide: sector empresarial y sector público. Cada una con su propio lenguaje, mismo rigor."
      />
      <Services withHeader={false} />
      <Sailboat />
    </>
  )
}
