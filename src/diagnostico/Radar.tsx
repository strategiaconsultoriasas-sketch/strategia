import { motion } from 'framer-motion'

export type RadarDatum = { label: string; value: number; max?: number }

/**
 * Radar chart SVG — hecho a mano, sin dependencias.
 * value y max se asumen en escala 0..5 por defecto.
 */
export function Radar({
  data,
  size = 420,
}: {
  data: RadarDatum[]
  size?: number
}) {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 60
  const n = data.length

  const anglePerPoint = (Math.PI * 2) / n

  function point(i: number, value: number, max: number) {
    const normalized = Math.max(0, Math.min(1, value / max))
    const angle = -Math.PI / 2 + i * anglePerPoint
    return {
      x: cx + Math.cos(angle) * r * normalized,
      y: cy + Math.sin(angle) * r * normalized,
    }
  }

  // Grid rings (1..5)
  const rings = [1, 2, 3, 4, 5]
  const outerPoints = data.map((_, i) => point(i, 1, 1))
  const dataPoints = data.map((d, i) => point(i, d.value, d.max ?? 5))
  const dataPath = dataPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ') + ' Z'

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
      {/* Rings */}
      {rings.map((rr) => {
        const ringR = (r * rr) / 5
        const ringPts = data.map((_, i) => {
          const a = -Math.PI / 2 + i * anglePerPoint
          return `${cx + Math.cos(a) * ringR},${cy + Math.sin(a) * ringR}`
        })
        return (
          <polygon
            key={rr}
            points={ringPts.join(' ')}
            fill="none"
            stroke="rgb(56 189 203)"
            strokeOpacity={rr === 5 ? 0.3 : 0.12}
            strokeWidth="1"
          />
        )
      })}

      {/* Radii */}
      {outerPoints.map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="rgb(56 189 203)"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
      ))}

      {/* Data area */}
      <motion.path
        d={dataPath}
        fill="rgb(56 189 203)"
        fillOpacity="0.18"
        stroke="rgb(56 189 203)"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="rgb(56 189 203)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 + i * 0.08, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        />
      ))}

      {/* Labels */}
      {data.map((d, i) => {
        const angle = -Math.PI / 2 + i * anglePerPoint
        const labelR = r + 28
        const x = cx + Math.cos(angle) * labelR
        const y = cy + Math.sin(angle) * labelR
        const anchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end'
        return (
          <motion.text
            key={d.label}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fill="rgb(243 243 240)"
            fillOpacity={0.75}
            fontSize={11}
            fontFamily="Satoshi, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.05, duration: 0.5 }}
          >
            {d.label}
          </motion.text>
        )
      })}
    </svg>
  )
}
