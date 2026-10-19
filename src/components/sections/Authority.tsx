import { authority } from '../../data'

export function Authority() {
  const loop = [...authority, ...authority]
  return (
    <section className="relative surface-ink-deep border-y border-white/5 py-5 overflow-hidden">
      <div className="flex overflow-hidden">
        <div className="marquee-track flex shrink-0 gap-14 pr-14">
          {loop.map((a, i) => (
            <div key={i} className="flex items-center gap-4 shrink-0">
              <span className="text-2xl md:text-3xl font-medium text-teal-glow tracking-tight">
                {a.stat}
              </span>
              <span className="text-sm text-fg-on-dark-mute max-w-sm">{a.text}</span>
              <span className="text-xs text-fg-on-dark-dim uppercase tracking-[0.2em] whitespace-nowrap">
                — {a.source}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
