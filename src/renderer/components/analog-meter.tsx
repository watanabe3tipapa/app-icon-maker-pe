import { cn } from "@/lib/utils"

const START_ANGLE = -120
const END_ANGLE = 120
const RADIUS = 52
const CX = 64
const CY = 64

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, end)
  const e = polarToCartesian(cx, cy, r, start)
  const large = end - start > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}`
}

function fractionToAngle(f: number): number {
  return START_ANGLE + f * (END_ANGLE - START_ANGLE)
}

export function AnalogMeter({
  fraction,
  label,
  isError,
  visible,
}: {
  fraction: number
  label: string
  isError: boolean
  visible: boolean
}) {
  if (!visible) return null

  const angle = fractionToAngle(Math.min(1, Math.max(0, fraction)))
  const needleEnd = polarToCartesian(CX, CY, RADIUS - 8, angle)
  const pct = Math.round(fraction * 100)

  const ticks: { angle: number; major: boolean }[] = []
  const totalTicks = 10
  for (let i = 0; i <= totalTicks; i++) {
    const f = i / totalTicks
    ticks.push({ angle: fractionToAngle(f), major: i % 2 === 0 })
  }

  return (
    <div
      className="absolute top-0 left-0 right-0 z-40 flex items-center justify-center pointer-events-none"
      style={{ height: 56 }}
    >
      <svg
        width="160"
        height="72"
        viewBox="0 0 128 72"
        className="select-none"
        aria-hidden
      >
        {/* Background arc track */}
        <path
          d={describeArc(CX, CY, RADIUS, -130, 130)}
          fill="none"
          stroke="oklch(0.3 0.03 55)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={isError ? 0.3 : 0.6}
        />

        {/* Active arc (filled portion) */}
        {!isError && fraction > 0 && (
          <path
            d={describeArc(CX, CY, RADIUS, -130, angle)}
            fill="none"
            stroke="url(#vu-grad)"
            strokeWidth="6"
            strokeLinecap="round"
            opacity={0.8}
          />
        )}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="vu-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4a7a4a" />
            <stop offset="50%" stopColor="#d4a843" />
            <stop offset="100%" stopColor="#e8734a" />
          </linearGradient>
        </defs>

        {/* Scale ticks */}
        {ticks.map((t, i) => {
          const inner = polarToCartesian(CX, CY, RADIUS - (t.major ? 6 : 3), t.angle)
          const outer = polarToCartesian(CX, CY, RADIUS + 1, t.angle)
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="oklch(0.55 0.02 60)"
              strokeWidth={t.major ? 1 : 0.5}
              opacity={0.5}
            />
          )
        })}

        {/* Needle */}
        <g>
          <line
            x1={CX}
            y1={CY + 4}
            x2={needleEnd.x}
            y2={needleEnd.y}
            stroke={isError ? "#e8734a" : "#d4a843"}
            strokeWidth="1.5"
            strokeLinecap="round"
            className={cn(fraction > 0 && !isError && "needle-live")}
            style={{
              "--needle-rest": `${fractionToAngle(0)}deg`,
              "--needle-peak": `${angle}deg`,
            } as React.CSSProperties}
          />
          <circle cx={CX} cy={CY + 4} r="3" fill="#d4a843" />
          <circle cx={CX} cy={CY + 4} r="1.5" fill="#121212" />
        </g>

        {/* Percentage label */}
        <text
          x={CX}
          y={CY + 30}
          textAnchor="middle"
          fill={isError ? "#e8734a" : "oklch(0.65 0.02 60)"}
          fontSize="9"
          fontFamily="monospace"
          fontWeight="600"
        >
          {isError ? "ERR" : `${pct}%`}
        </text>

        {/* Small label */}
        {label && (
          <text
            x={CX}
            y={CY + 42}
            textAnchor="middle"
            fill="oklch(0.45 0.02 55)"
            fontSize="5"
            fontFamily="monospace"
          >
            {label.length > 20 ? label.slice(0, 20) + "…" : label}
          </text>
        )}
      </svg>
    </div>
  )
}
