import { PageHero } from '../components/PageHero'
import { Portfolio } from '../components/sections/Portfolio'
import { Clients } from '../components/sections/Clients'

export default function Portafolio() {
  return (
    <>
      <PageHero
        kicker="Portafolio"
        edition="Capítulo 04"
        title={
          <>
            Lo nuestro no se queda <span className="text-teal-glow">en PowerPoint.</span>
          </>
        }
        sub="Cada producto y sitio que listamos tiene usuarios reales, cobra, se mantiene y evoluciona. Esta es nuestra línea de Transformación Digital e Innovación en acción."
      />
      <Portfolio withHeader={false} />
      <Clients />
    </>
  )
}
