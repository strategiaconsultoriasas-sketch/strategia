import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'

// Code splitting: solo el Home es eager; el resto se carga bajo demanda
const Enfoque = lazy(() => import('./pages/Enfoque'))
const Servicios = lazy(() => import('./pages/Servicios'))
const Portafolio = lazy(() => import('./pages/Portafolio'))
const Equipo = lazy(() => import('./pages/Equipo'))
const Herramientas = lazy(() => import('./pages/Herramientas'))
const Contacto = lazy(() => import('./pages/Contacto'))
const DiagnosticoPage = lazy(() => import('./pages/DiagnosticoPage'))

function LazyFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-2 border-teal/30 border-t-teal animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/enfoque"
          element={
            <Suspense fallback={<LazyFallback />}>
              <Enfoque />
            </Suspense>
          }
        />
        <Route
          path="/servicios"
          element={
            <Suspense fallback={<LazyFallback />}>
              <Servicios />
            </Suspense>
          }
        />
        <Route
          path="/portafolio"
          element={
            <Suspense fallback={<LazyFallback />}>
              <Portafolio />
            </Suspense>
          }
        />
        <Route
          path="/equipo"
          element={
            <Suspense fallback={<LazyFallback />}>
              <Equipo />
            </Suspense>
          }
        />
        <Route
          path="/herramientas"
          element={
            <Suspense fallback={<LazyFallback />}>
              <Herramientas />
            </Suspense>
          }
        />
        <Route
          path="/contacto"
          element={
            <Suspense fallback={<LazyFallback />}>
              <Contacto />
            </Suspense>
          }
        />
        <Route
          path="/diagnostico"
          element={
            <Suspense fallback={<LazyFallback />}>
              <DiagnosticoPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
