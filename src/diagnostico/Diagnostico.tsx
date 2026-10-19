import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  MessageCircle,
  ChevronRight,
  Target,
  LineChart,
  Megaphone,
  Cpu,
  Settings,
  Users,
  Calendar,
  ShieldCheck,
  Sprout,
} from 'lucide-react'
import { themes, scoreFor, tierLabel, tierDescription, type Tier } from './data'
import { Radar } from './Radar'
import { generatePdf } from './pdfReport'

const ICONS: Record<string, typeof Target> = {
  Target, LineChart, Megaphone, Cpu, Settings, Users, Calendar, ShieldCheck, Sprout,
}

type Profile = { name: string; company: string; email: string; whatsapp: string }

type Step =
  | { kind: 'intro' }
  | { kind: 'profile' }
  | { kind: 'theme'; themeIndex: number; questionIndex: number }
  | { kind: 'result' }

const LS_KEY = 'strategia-diagnostico-v1'

export function Diagnostico() {
  const [step, setStep] = useState<Step>({ kind: 'intro' })
  const [profile, setProfile] = useState<Profile>({ name: '', company: '', email: '', whatsapp: '' })
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const topRef = useRef<HTMLDivElement>(null)

  // Persist
  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.profile) setProfile(data.profile)
        if (data.answers) setAnswers(data.answers)
      } catch { /* ignore */ }
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ profile, answers }))
  }, [profile, answers])

  // Scroll al cambiar paso
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  const totalQuestions = useMemo(
    () => themes.reduce((a, t) => a + t.questions.length, 0),
    [],
  )
  const answeredCount = Object.keys(answers).length
  const progress = answeredCount / totalQuestions

  const results = useMemo(() => {
    const byTheme = themes.map((theme) => {
      const vals = theme.questions.map((q) => answers[q.id] ?? 0)
      const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0
      const score = Math.round((avg / 5) * 100)
      const tier = scoreFor(avg)
      return {
        theme,
        avg,
        score,
        tier,
        recommendations: theme.recommendations[tier],
      }
    })
    const totalWeight = themes.reduce((a, t) => a + t.weight, 0)
    const overall =
      byTheme.reduce((acc, r) => acc + r.score * r.theme.weight, 0) / totalWeight
    return { byTheme, overall }
  }, [answers])

  function startDiagnostico() {
    setStep({ kind: 'profile' })
  }

  function goToFirstQuestion() {
    setStep({ kind: 'theme', themeIndex: 0, questionIndex: 0 })
  }

  function next() {
    if (step.kind !== 'theme') return
    const theme = themes[step.themeIndex]
    if (step.questionIndex + 1 < theme.questions.length) {
      setStep({ ...step, questionIndex: step.questionIndex + 1 })
    } else if (step.themeIndex + 1 < themes.length) {
      setStep({ kind: 'theme', themeIndex: step.themeIndex + 1, questionIndex: 0 })
    } else {
      setStep({ kind: 'result' })
    }
  }

  function prev() {
    if (step.kind !== 'theme') {
      if (step.kind === 'result') {
        const last = themes[themes.length - 1]
        setStep({
          kind: 'theme',
          themeIndex: themes.length - 1,
          questionIndex: last.questions.length - 1,
        })
      } else {
        setStep({ kind: 'intro' })
      }
      return
    }
    if (step.questionIndex > 0) {
      setStep({ ...step, questionIndex: step.questionIndex - 1 })
    } else if (step.themeIndex > 0) {
      const prev = themes[step.themeIndex - 1]
      setStep({
        kind: 'theme',
        themeIndex: step.themeIndex - 1,
        questionIndex: prev.questions.length - 1,
      })
    } else {
      setStep({ kind: 'profile' })
    }
  }

  function pick(questionId: string, value: number) {
    setAnswers((a) => ({ ...a, [questionId]: value }))
    // auto-advance
    setTimeout(next, 300)
  }

  function reset() {
    setAnswers({})
    setProfile({ name: '', company: '', email: '', whatsapp: '' })
    localStorage.removeItem(LS_KEY)
    setStep({ kind: 'intro' })
  }

  return (
    <section className="relative surface-ink pt-28 pb-16 min-h-screen" ref={topRef}>
      {/* Barra de progreso superior */}
      <div className="fixed top-20 inset-x-0 h-0.5 z-40 bg-white/5">
        <motion.div
          initial={false}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformOrigin: 'left' }}
          className="h-full bg-teal-glow"
        />
      </div>

      <div className="container-x">
        <AnimatePresence mode="wait">
          {step.kind === 'intro' && (
            <IntroStep key="intro" onStart={startDiagnostico} />
          )}
          {step.kind === 'profile' && (
            <ProfileStep
              key="profile"
              profile={profile}
              onChange={setProfile}
              onBack={() => setStep({ kind: 'intro' })}
              onNext={goToFirstQuestion}
            />
          )}
          {step.kind === 'theme' && (
            <QuestionStep
              key={`${step.themeIndex}-${step.questionIndex}`}
              themeIndex={step.themeIndex}
              questionIndex={step.questionIndex}
              answers={answers}
              onPick={pick}
              onBack={prev}
              onNext={next}
              answered={answeredCount}
              total={totalQuestions}
            />
          )}
          {step.kind === 'result' && (
            <ResultStep
              key="result"
              profile={profile}
              results={results}
              onPrev={prev}
              onReset={reset}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* =========================== INTRO =========================== */

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="max-w-3xl mx-auto text-center py-10"
    >
      <div className="kicker text-teal-glow mb-6 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-teal" />
        Diagnóstico Empresarial 360°
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-fg-on-dark mb-8">
        En 9 ejes y 15 minutos, una lectura clara de dónde está hoy su organización.
      </h1>
      <p className="text-lg text-fg-on-dark-mute leading-relaxed max-w-2xl mx-auto mb-12">
        Evaluamos nueve dimensiones críticas con escala Likert y le entregamos una
        puntuación ponderada por eje, recomendaciones concretas y un reporte PDF
        descargable. Sin costo.
      </p>

      {/* Grid de los 9 temas */}
      <div className="grid grid-cols-3 md:grid-cols-9 gap-3 mb-14">
        {themes.map((t, i) => {
          const Icon = ICONS[t.icon] ?? Target
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <div className="h-11 w-11 rounded-full border border-teal-glow/30 bg-teal/5 flex items-center justify-center">
                <Icon size={16} className="text-teal-glow" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-fg-on-dark-mute text-center">
                {t.label}
              </span>
            </motion.div>
          )
        })}
      </div>

      <button
        onClick={onStart}
        className="btn-teal group text-base px-6 py-3.5"
      >
        Comenzar diagnóstico
        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>
      <div className="mt-6 text-xs text-fg-on-dark-dim">
        ~15 minutos · Sin costo · Puede pausar y continuar después
      </div>
    </motion.div>
  )
}

/* =========================== PROFILE =========================== */

function ProfileStep({
  profile,
  onChange,
  onBack,
  onNext,
}: {
  profile: Profile
  onChange: (p: Profile) => void
  onBack: () => void
  onNext: () => void
}) {
  const canContinue =
    profile.name.trim().length > 1 &&
    profile.company.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(profile.email.trim()) &&
    profile.whatsapp.replace(/\D/g, '').length >= 7

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="max-w-2xl mx-auto py-8"
    >
      <div className="kicker text-teal-glow mb-4 flex items-center gap-3">
        <span className="h-px w-10 bg-teal" />
        Paso 01 · Datos de contacto
      </div>
      <h2 className="text-3xl md:text-4xl font-medium text-fg-on-dark tracking-[-0.025em] mb-4">
        ¿A quién va dirigido el reporte?
      </h2>
      <p className="text-base text-fg-on-dark-mute leading-relaxed mb-10 max-w-lg">
        Enviamos el reporte PDF a su correo y le damos seguimiento personalizado por
        WhatsApp. No compartimos sus datos con terceros.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-10">
        <Field
          label="Nombre completo"
          value={profile.name}
          onChange={(v) => onChange({ ...profile, name: v })}
          placeholder="Juan Pérez"
        />
        <Field
          label="Empresa u organización"
          value={profile.company}
          onChange={(v) => onChange({ ...profile, company: v })}
          placeholder="Industrias ABC S.A.S."
        />
        <Field
          label="Correo electrónico"
          type="email"
          value={profile.email}
          onChange={(v) => onChange({ ...profile, email: v })}
          placeholder="juan@empresa.com"
        />
        <Field
          label="WhatsApp"
          type="tel"
          value={profile.whatsapp}
          onChange={(v) => onChange({ ...profile, whatsapp: v })}
          placeholder="+57 300 123 4567"
        />
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-ghost-dark text-sm">
          <ArrowLeft size={14} /> Volver
        </button>
        <button onClick={onNext} disabled={!canContinue} className="btn-teal disabled:opacity-40 disabled:cursor-not-allowed">
          Continuar al diagnóstico <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="block kicker text-fg-on-dark-mute mb-2">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-white/15 focus:border-teal-glow outline-none text-fg-on-dark text-lg py-2.5 transition-colors"
      />
    </label>
  )
}

/* =========================== QUESTION =========================== */

function QuestionStep({
  themeIndex,
  questionIndex,
  answers,
  onPick,
  onBack,
  onNext,
  answered,
  total,
}: {
  themeIndex: number
  questionIndex: number
  answers: Record<string, number>
  onPick: (id: string, value: number) => void
  onBack: () => void
  onNext: () => void
  answered: number
  total: number
}) {
  const theme = themes[themeIndex]
  const question = theme.questions[questionIndex]
  const Icon = ICONS[theme.icon] ?? Target
  const picked = answers[question.id]

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="max-w-3xl mx-auto py-8"
    >
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full border border-teal-glow/30 bg-teal/5 flex items-center justify-center">
            <Icon size={14} className="text-teal-glow" strokeWidth={1.5} />
          </div>
          <div>
            <div className="kicker text-teal-glow">
              Eje {String(themeIndex + 1).padStart(2, '0')} · {theme.label}
            </div>
            <div className="text-xs text-fg-on-dark-dim mt-0.5">{theme.description}</div>
          </div>
        </div>
        <div className="kicker text-fg-on-dark-dim">
          {answered}/{total} respondidas
        </div>
      </div>

      {/* Pregunta */}
      <h2 className="text-2xl md:text-4xl font-medium text-fg-on-dark tracking-[-0.025em] leading-tight mb-10">
        {question.text}
      </h2>

      {/* Opciones */}
      <div className="space-y-2.5 mb-10">
        {question.options.map((opt) => {
          const active = picked === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onPick(question.id, opt.value)}
              className={`group w-full flex items-center justify-between gap-6 p-5 border transition-all duration-200 ease-out-strong active:scale-[0.995] ${
                active
                  ? 'border-teal-glow bg-teal/10 text-fg-on-dark'
                  : 'border-white/10 hover:border-teal-glow/50 hover:bg-teal/5 text-fg-on-dark-mute hover:text-fg-on-dark'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span
                  className={`shrink-0 h-6 w-6 rounded-full border flex items-center justify-center transition-colors ${
                    active ? 'border-teal-glow bg-teal-glow' : 'border-white/20'
                  }`}
                >
                  {active && <Check size={12} className="text-ink" strokeWidth={3} />}
                </span>
                <span className="text-sm md:text-base text-left">{opt.label}</span>
              </div>
              <ChevronRight size={16} className="text-fg-on-dark-dim shrink-0 group-hover:text-teal-glow transition-colors" />
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-ghost-dark text-sm">
          <ArrowLeft size={14} /> Anterior
        </button>
        {picked !== undefined && (
          <button onClick={onNext} className="btn-teal text-sm">
            Siguiente <ArrowRight size={16} />
          </button>
        )}
      </div>
    </motion.div>
  )
}

/* =========================== RESULT =========================== */

function ResultStep({
  profile,
  results,
  onPrev,
  onReset,
}: {
  profile: Profile
  results: ReturnType<typeof useMemo> extends never ? never : { byTheme: Array<{ theme: typeof themes[number]; avg: number; score: number; tier: Tier; recommendations: string[] }>; overall: number }
  onPrev: () => void
  onReset: () => void
}) {
  const [downloading, setDownloading] = useState(false)

  const sorted = [...results.byTheme].sort((a, b) => a.score - b.score)
  const weakest = sorted.slice(0, 2)
  const strongest = sorted.slice(-2).reverse()

  function downloadPdf() {
    setDownloading(true)
    try {
      const pdf = generatePdf({
        profile,
        overall: results.overall,
        byTheme: results.byTheme,
      })
      pdf.save(`diagnostico-strategia-${slug(profile.company)}.pdf`)
    } finally {
      setDownloading(false)
    }
  }

  const whatsappText =
    `Hola Strategia, acabo de hacer el Diagnóstico 360°. ` +
    `Soy ${profile.name} de ${profile.company}. ` +
    `Mi puntaje general es ${Math.round(results.overall)}/100. ` +
    `Los ejes más críticos: ${weakest.map((w) => w.theme.label).join(', ')}. ` +
    `Me gustaría agendar la conversación de 30 minutos.`

  const whatsappUrl =
    'https://wa.me/573203047445?text=' + encodeURIComponent(whatsappText)

  const radarData = results.byTheme.map((r) => ({
    label: r.theme.label.split(' ')[0],
    value: r.avg,
    max: 5,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="max-w-6xl mx-auto py-8"
    >
      {/* Header */}
      <div className="text-center mb-14">
        <div className="kicker text-teal-glow mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-teal" />
          Resultado · {profile.company}
        </div>
        <h2 className="text-3xl md:text-5xl font-medium text-fg-on-dark tracking-[-0.03em] leading-[1.05] mb-5">
          Lectura estratégica preparada para {profile.name.split(' ')[0]}.
        </h2>
      </div>

      {/* Grid principal: puntaje grande + radar */}
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 mb-16">
        {/* Puntaje general */}
        <div className="flex flex-col justify-center">
          <div className="kicker text-teal-glow mb-4">Índice de madurez estratégica</div>
          <div className="flex items-baseline gap-2">
            <span className="text-[8rem] md:text-[12rem] font-medium text-teal-glow tabular-nums leading-none tracking-[-0.06em]">
              {Math.round(results.overall)}
            </span>
            <span className="text-4xl md:text-5xl font-medium text-fg-on-dark-mute tabular-nums leading-none">
              /100
            </span>
          </div>
          <p className="mt-6 text-base md:text-lg text-fg-on-dark leading-relaxed max-w-md">
            {results.overall < 40 &&
              'Hay riesgos y oportunidades inmediatas. Priorizar los dos ejes más débiles tendría impacto en pocas semanas.'}
            {results.overall >= 40 && results.overall < 70 &&
              'Fundaciones sólidas con techo visible. El salto está en pasar de lo táctico a lo sistemático.'}
            {results.overall >= 70 &&
              'Base madura. El siguiente nivel es la mejora continua y los frentes de innovación.'}
          </p>
        </div>

        {/* Radar */}
        <div className="border border-white/10 bg-ink-deep/60 p-6 md:p-8">
          <div className="kicker text-teal-glow mb-5">Mapa de los 9 ejes</div>
          <Radar data={radarData} size={420} />
        </div>
      </div>

      {/* Débiles vs fuertes */}
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        <HighlightCard title="Primeros frentes a intervenir" items={weakest} tone="warn" />
        <HighlightCard title="Fortalezas desde donde proyectar" items={strongest} tone="ok" />
      </div>

      {/* Lista completa por eje con recomendaciones */}
      <div className="mb-14">
        <div className="kicker text-teal-glow mb-5">Diagnóstico por eje · 9 ejes</div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {results.byTheme.map((r) => {
            const Icon = ICONS[r.theme.icon] ?? Target
            return (
              <div key={r.theme.id} className="py-6 grid md:grid-cols-[1fr_2fr] gap-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full border border-teal-glow/30 bg-teal/5 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-teal-glow" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-fg-on-dark">{r.theme.label}</h3>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-medium text-teal-glow tabular-nums">
                        {Math.round(r.score)}
                      </span>
                      <span className="text-sm text-fg-on-dark-dim">/ 100</span>
                      <span className="text-xs ml-2 px-2 py-0.5 border border-teal-glow/30 text-teal-glow uppercase tracking-wider">
                        {tierLabel(r.tier)}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-fg-on-dark-mute leading-snug">
                      {tierDescription(r.tier)}
                    </div>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {r.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-fg-on-dark leading-relaxed">
                      <span className="text-xs font-mono text-teal-glow mt-1 tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTAs finales */}
      <div className="border border-teal-glow/30 bg-teal/5 p-8 md:p-12">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
          <div>
            <div className="kicker text-teal-glow mb-3">Siguiente paso</div>
            <h3 className="text-2xl md:text-3xl font-medium text-fg-on-dark tracking-[-0.025em] leading-tight mb-4">
              Agende 30 minutos con un consultor para revisar los dos ejes más críticos
              de su organización.
            </h3>
            <p className="text-sm text-fg-on-dark-mute leading-relaxed">
              Sin costo. Sin presentación de PowerPoint. Una conversación clara basada
              en su propio diagnóstico.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal group text-sm w-full"
            >
              <MessageCircle size={16} /> Agendar por WhatsApp
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={downloadPdf}
              disabled={downloading}
              className="btn-ghost-dark text-sm w-full"
            >
              <Download size={16} />
              {downloading ? 'Generando PDF…' : 'Descargar reporte PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="mt-10 flex items-center justify-between text-xs">
        <button onClick={onPrev} className="text-fg-on-dark-dim hover:text-fg-on-dark transition-colors">
          ← Volver a las preguntas
        </button>
        <button onClick={onReset} className="text-fg-on-dark-dim hover:text-fg-on-dark transition-colors">
          Hacer diagnóstico otra vez
        </button>
      </div>
    </motion.div>
  )
}

function HighlightCard({
  title,
  items,
  tone,
}: {
  title: string
  items: Array<{ theme: typeof themes[number]; score: number; tier: Tier }>
  tone: 'warn' | 'ok'
}) {
  return (
    <div
      className={`p-6 md:p-7 border ${
        tone === 'warn' ? 'border-amber-400/30 bg-amber-500/5' : 'border-emerald-400/30 bg-emerald-500/5'
      }`}
    >
      <div className={`kicker mb-4 ${tone === 'warn' ? 'text-amber-300' : 'text-emerald-300'}`}>
        {title}
      </div>
      <ul className="space-y-3">
        {items.map((r) => (
          <li key={r.theme.id} className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-base font-medium text-fg-on-dark">{r.theme.label}</div>
              <div className="text-xs text-fg-on-dark-mute">{tierLabel(r.tier)}</div>
            </div>
            <div className="text-xl font-medium text-fg-on-dark tabular-nums">
              {Math.round(r.score)}
              <span className="text-sm text-fg-on-dark-dim">/100</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function slug(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40)
}
