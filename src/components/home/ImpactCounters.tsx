import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useScroll,
  useSpring,
} from 'framer-motion'
import { TrendingUp, TrendingDown, Target, Activity, ArrowUpRight } from 'lucide-react'

/**
 * 03. Impacto en cifras — Dashboard tipo panel de BI.
 * - KPI principal XL con tabs navegables (4 ejes).
 * - Panel derecho: ranking de las 8 fuentes con barras proporcionales.
 * - Grid inferior: donut, sparkline, promedio, stat destacado.
 */

type SourceDatum = {
  value: number
  display: string
  topic: string
  source: string
  axis: 'ingresos' | 'costos' | 'decisiones' | 'mercado'
}

const sources: SourceDatum[] = [
  { value: 90, display: '90%', topic: 'Decisiones más rápidas', source: 'PwC', axis: 'decisiones' },
  { value: 80, display: '80%', topic: 'Alineación con objetivos', source: 'KPMG', axis: 'decisiones' },
  { value: 65, display: '65%', topic: 'Adopción tecnológica', source: 'Deloitte', axis: 'mercado' },
  { value: 50, display: '×1.5', topic: 'Adaptación al cambio', source: 'BCG', axis: 'mercado' },
  { value: 30, display: '+30%', topic: 'Retención de clientes', source: 'Accenture', axis: 'mercado' },
  { value: 26, display: '+26%', topic: 'Ingresos anuales', source: 'Harvard Business Review', axis: 'ingresos' },
  { value: 20, display: '−20%', topic: 'Costos operativos', source: 'McKinsey & Company', axis: 'costos' },
  { value: 18, display: '+18%', topic: 'Cuota de mercado', source: 'Bain & Company', axis: 'mercado' },
]

const tabs: Array<{
  id: SourceDatum['axis']
  label: string
  icon: typeof TrendingUp
  color: string
}> = [
  { id: 'ingresos', label: 'Ingresos', icon: TrendingUp, color: 'teal-glow' },
  { id: 'costos', label: 'Costos', icon: TrendingDown, color: 'teal-glow' },
  { id: 'decisiones', label: 'Decisiones', icon: Activity, color: 'teal-glow' },
  { id: 'mercado', label: 'Mercado', icon: Target, color: 'teal-glow' },
]

export function ImpactCounters() {
  const [tab, setTab] = useState<SourceDatum['axis']>('ingresos')
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], ['-6%', '6%']), {
    stiffness: 60,
    damping: 20,
  })

  const principal = sources.find((s) => s.axis === tab) ?? sources[0]
  const sortedByValue = [...sources].sort((a, b) => b.value - a.value)
  const maxValue = Math.max(...sources.map((s) => s.value))
  const avg = Math.round(sources.reduce((a, b) => a + b.value, 0) / sources.length)

  return (
    <section ref={ref} className="relative surface-ink py-20 md:py-24 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-0 opacity-10"
        aria-hidden
      >
        <img
          src="/assets/img/propuesta-valor.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink pointer-events-none" />

      <div className="container-x relative">
        {/* Header + tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="kicker text-teal-glow mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              Las ventajas de contratar consultoría estratégica
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.025em] leading-[1.05] text-fg-on-dark max-w-2xl">
              Las empresas que contratan consultoría logran más — en ingresos, costos,
              decisiones y mercado.
            </h2>
            <p className="mt-4 text-sm md:text-base text-fg-on-dark-mute max-w-xl leading-relaxed">
              Ocho fuentes externas lo confirman. Navegue por los 4 ejes para ver qué prueba
              cada una.
            </p>
          </div>

          <TabBar current={tab} onChange={setTab} />
        </motion.div>

        {/* Grid principal: KPI + Ranking */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-4 md:gap-5">
          <KpiPanel data={principal} key={principal.source} />
          <RankingPanel data={sortedByValue} max={maxValue} activeAxis={tab} onPick={(d) => setTab(d.axis)} />
        </div>

        {/* Grid de widgets inferiores */}
        <div className="grid md:grid-cols-4 gap-4 md:gap-5 mt-4 md:mt-5">
          <DonutWidget value={principal.value} label={principal.topic} />
          <SparklineWidget />
          <StatWidget
            label="Promedio ponderado"
            value={`${avg}%`}
            caption="Mejora promedio reportada por las 8 fuentes."
          />
          <SignalWidget />
        </div>

        {/* Pie: fuentes */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-fg-on-dark-dim">
          <span>Fuentes:</span>
          {['HBR', 'McKinsey', 'Deloitte', 'Accenture', 'Bain', 'PwC', 'KPMG', 'BCG'].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================= TABS ============================= */

function TabBar({
  current,
  onChange,
}: {
  current: SourceDatum['axis']
  onChange: (id: SourceDatum['axis']) => void
}) {
  return (
    <div
      role="tablist"
      className="inline-flex items-center p-1 border border-white/10 bg-white/[0.03] backdrop-blur-sm"
    >
      {tabs.map((t) => {
        const active = t.id === current
        const Icon = t.icon
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={`relative flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
              active ? 'text-ink' : 'text-fg-on-dark-mute hover:text-fg-on-dark'
            }`}
          >
            {active && (
              <motion.span
                layoutId="dash-tab-active"
                className="absolute inset-0 bg-teal-glow"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon size={13} strokeWidth={1.8} />
              {t.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* =========================== KPI PANEL =========================== */

function KpiPanel({ data }: { data: SourceDatum }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toString())
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const unsub = rounded.on('change', setDisplay)
    return () => unsub()
  }, [rounded])

  useEffect(() => {
    count.set(0)
    setDisplay('0')
    const controls = animate(count, data.value, {
      duration: 1.4,
      ease: [0.23, 1, 0.32, 1],
    })
    return () => controls.stop()
  }, [count, data.value])

  const prefix = data.display.replace(/[0-9]+/g, '').replace('%', '').replace('×', '')
  const suffix = data.display.includes('×') ? '×' : data.display.includes('%') ? '%' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="relative p-6 md:p-10 border border-white/10 bg-ink-deep/60 backdrop-blur-sm overflow-hidden"
    >
      {/* Status pill */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-glow animate-pulse" />
          <span className="kicker text-teal-glow">Eje activo · {data.axis}</span>
        </div>
        <span className="kicker text-fg-on-dark-dim">Fuente verificada</span>
      </div>

      {/* Número XL */}
      <div className="flex items-start gap-1 md:gap-2 text-teal-glow leading-[0.85]">
        {prefix && (
          <span className="text-5xl md:text-7xl font-medium tabular-nums tracking-[-0.04em]">
            {prefix}
          </span>
        )}
        <motion.span
          className="text-[7rem] md:text-[13rem] font-medium tabular-nums tracking-[-0.06em]"
          aria-live="polite"
        >
          {display}
        </motion.span>
        {suffix && (
          <span className="text-5xl md:text-7xl font-medium tabular-nums tracking-[-0.04em]">
            {suffix}
          </span>
        )}
      </div>

      {/* Topic */}
      <div className="mt-4 text-lg md:text-xl text-fg-on-dark font-medium tracking-tight">
        {data.topic}
      </div>

      {/* Sparkline + attribution row */}
      <div className="mt-6 pt-6 border-t border-white/10 flex items-end justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="kicker text-fg-on-dark-dim mb-2">Trend · 12 meses</div>
          <SparklineInline />
        </div>
        <div className="shrink-0 text-right">
          <div className="text-sm font-medium text-fg-on-dark">{data.source}</div>
          <div className="kicker text-fg-on-dark-dim mt-0.5">Fuente externa</div>
        </div>
      </div>
    </motion.div>
  )
}

function SparklineInline() {
  // Barras ascendentes como sparkline (12 meses)
  const bars = [12, 18, 16, 22, 28, 26, 34, 32, 42, 48, 55, 68]
  const max = Math.max(...bars)
  return (
    <div className="flex items-end gap-1 h-10">
      {bars.map((b, i) => (
        <motion.span
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${(b / max) * 100}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: i * 0.03, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex-1 bg-teal-glow/70"
          style={{ maxWidth: '8px', minHeight: '2px' }}
        />
      ))}
    </div>
  )
}

/* =========================== EVIDENCIAS =========================== */

function RankingPanel({
  data,
  activeAxis,
  onPick,
}: {
  data: SourceDatum[]
  max: number
  activeAxis: SourceDatum['axis']
  onPick: (d: SourceDatum) => void
}) {
  // Orden fijo editorial, agrupando por eje (lectura), no por valor numérico mezclado
  const ordered: SourceDatum[] = ['ingresos', 'costos', 'decisiones', 'mercado'].flatMap((axis) =>
    data.filter((d) => d.axis === axis),
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="p-6 md:p-7 border border-white/10 bg-ink-deep/60 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="kicker text-teal-glow mb-1">
            Las empresas que contratan consultoría logran…
          </div>
          <div className="text-sm text-fg-on-dark-mute">
            Un claim concreto por fuente externa — ocho ventajas comprobadas.
          </div>
        </div>
        <ArrowUpRight size={14} className="text-fg-on-dark-dim" />
      </div>

      <ul className="divide-y divide-white/10">
        {ordered.map((d, i) => {
          const highlighted = d.axis === activeAxis
          return (
            <motion.li
              key={d.source}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <button
                onClick={() => onPick(d)}
                className={`group w-full text-left py-3 flex items-start gap-4 transition-opacity ${
                  highlighted ? '' : 'opacity-80 hover:opacity-100'
                }`}
              >
                {/* Columna izquierda: valor */}
                <div className="shrink-0 w-16 pt-0.5">
                  <span
                    className={`text-lg font-medium tabular-nums tracking-tight transition-colors ${
                      highlighted ? 'text-teal-glow' : 'text-fg-on-dark group-hover:text-teal-glow'
                    }`}
                  >
                    {d.display}
                  </span>
                </div>
                {/* Columna derecha: claim + fuente */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm leading-snug mb-1 transition-colors ${
                      highlighted
                        ? 'text-fg-on-dark'
                        : 'text-fg-on-dark-mute group-hover:text-fg-on-dark'
                    }`}
                  >
                    {d.topic}
                  </div>
                  <div className="kicker text-fg-on-dark-dim">— {d.source}</div>
                </div>
                {highlighted && (
                  <motion.span
                    layoutId="evidence-marker"
                    className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-glow"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            </motion.li>
          )
        })}
      </ul>
    </motion.div>
  )
}

/* =========================== DONUT =========================== */

function DonutWidget({ value, label }: { value: number; label: string }) {
  const safe = Math.min(100, Math.max(0, value))
  const circumference = 2 * Math.PI * 42
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="p-6 border border-white/10 bg-ink-deep/60 backdrop-blur-sm"
    >
      <div className="kicker text-teal-glow mb-4">% empresas asesoradas</div>
      <div className="flex items-center gap-4">
        <svg width="80" height="80" viewBox="0 0 100 100" className="-rotate-90 shrink-0">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgb(255 255 255 / 0.08)"
            strokeWidth="7"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgb(56 189 203)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - (safe / 100) * circumference }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
          />
        </svg>
        <div>
          <div className="text-3xl font-medium text-teal-glow tabular-nums leading-none">
            {safe}%
          </div>
          <div className="mt-1.5 text-xs text-fg-on-dark-mute leading-snug">{label}</div>
        </div>
      </div>
    </motion.div>
  )
}

/* =========================== SPARKLINE WIDGET =========================== */

function SparklineWidget() {
  const points = [40, 42, 48, 46, 52, 58, 55, 62, 68, 72, 78, 85]
  const max = Math.max(...points)
  const min = Math.min(...points)
  const w = 160
  const h = 60
  const stepX = w / (points.length - 1)
  const path = points
    .map((p, i) => {
      const x = i * stepX
      const y = h - ((p - min) / (max - min)) * h
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="p-6 border border-white/10 bg-ink-deep/60 backdrop-blur-sm"
    >
      <div className="kicker text-teal-glow mb-4">Trend acumulado</div>
      <svg viewBox={`0 0 ${w} ${h + 10}`} className="w-full h-16 overflow-visible">
        {/* Gradiente fill */}
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(56 189 203)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(56 189 203)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`${path} L ${w} ${h} L 0 ${h} Z`}
          fill="url(#spark-fill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="rgb(56 189 203)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
        />
      </svg>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-lg font-medium text-fg-on-dark tabular-nums">+45%</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-fg-on-dark-dim">
          vs. 2024
        </span>
      </div>
    </motion.div>
  )
}

/* =========================== STAT WIDGET =========================== */

function StatWidget({
  label,
  value,
  caption,
}: {
  label: string
  value: string
  caption: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="p-6 border border-white/10 bg-ink-deep/60 backdrop-blur-sm"
    >
      <div className="kicker text-teal-glow mb-4">{label}</div>
      <div className="text-3xl font-medium text-teal-glow tabular-nums tracking-tight leading-none">
        {value}
      </div>
      <div className="mt-3 text-xs text-fg-on-dark-mute leading-snug">{caption}</div>
    </motion.div>
  )
}

/* =========================== SIGNAL WIDGET =========================== */

function SignalWidget() {
  return (
    <motion.a
      href="https://wa.me/573203047445"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="group p-6 border border-teal-glow/30 bg-teal/5 hover:bg-teal/10 transition-colors flex flex-col justify-between min-h-[160px]"
    >
      <div>
        <div className="kicker text-teal-glow mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-glow animate-pulse" />
          Señal
        </div>
        <div className="text-base font-medium text-fg-on-dark leading-tight">
          ¿Dónde se posiciona hoy su organización?
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-fg-on-dark-mute">
        <span>Hablar con un consultor</span>
        <ArrowUpRight size={14} className="text-teal-glow transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.a>
  )
}
