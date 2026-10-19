import { Hero } from '../components/sections/Hero'
import { ScrollStory } from '../components/home/ScrollStory'
import { ImpactCounters } from '../components/home/ImpactCounters'
import { HomeShowcase } from '../components/sections/HomeShowcase'
import { SocialFeed } from '../components/home/SocialFeed'
import { Clients } from '../components/sections/Clients'
import { Sailboat } from '../components/Sailboat'

/**
 * Home (post-critique 19/10/2026 · iter 2):
 * - Fuera PillarsFlip (NUESTRO ENFOQUE) — vive en /enfoque
 * - Portafolio dentro del home vía HomeShowcase (preview → /portafolio para detalle)
 * - Diagnóstico vive en el FAB protagonista flotante
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ScrollStory />
      <ImpactCounters />
      <HomeShowcase />
      <Clients />
      <SocialFeed />
      <Sailboat />
    </>
  )
}
