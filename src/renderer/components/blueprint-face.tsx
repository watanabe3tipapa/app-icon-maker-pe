import { BLUEPRINT_SQUICLE_D } from "@/components/squircle"

const COPPER = "#b87333"
const GOLD = "#d4a843"

export function BlueprintFace({ scanning }: { scanning: boolean }) {
  return (
    <svg
      viewBox="0 0 144 144"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        {/* Fine 12px grid — copper tone. */}
        <pattern id="bp-fine" width="12" height="12" patternUnits="userSpaceOnUse">
          <path
            d="M 12 0 L 0 0 0 12"
            fill="none"
            stroke={COPPER}
            strokeOpacity="0.1"
            strokeWidth="0.5"
          />
        </pattern>
        {/* Major 36px grid overlaid on fine. */}
        <pattern id="bp-major" width="36" height="36" patternUnits="userSpaceOnUse">
          <rect width="36" height="36" fill="url(#bp-fine)" />
          <path
            d="M 36 0 L 0 0 0 36"
            fill="none"
            stroke={COPPER}
            strokeOpacity="0.18"
            strokeWidth="0.5"
          />
        </pattern>
        {/* Scan line gradient for the generating sweep — warm copper glow. */}
        <linearGradient id="scan-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={GOLD} stopOpacity="0" />
          <stop offset="30%"  stopColor={GOLD} stopOpacity="0.06" />
          <stop offset="50%"  stopColor={GOLD} stopOpacity="0.18" />
          <stop offset="70%"  stopColor={GOLD} stopOpacity="0.06" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background — warm dark board. */}
      <rect width="144" height="144" fill="oklch(0.14 0.015 55)" />

      {/* Grid. */}
      <rect width="144" height="144" fill="url(#bp-major)" />

      {/* Center dashed guidelines — copper tone. */}
      <line x1="72" y1="0"   x2="72"  y2="144" stroke={COPPER} strokeOpacity="0.18" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="0"  y1="72"  x2="144" y2="72"  stroke={COPPER} strokeOpacity="0.18" strokeWidth="0.75" strokeDasharray="3 3" />

      {/* Inner canvas — dashed squicle (superellipse), same class of curve as the icon mask. */}
      <path
        d={BLUEPRINT_SQUICLE_D}
        fill="none"
        stroke={COPPER}
        strokeOpacity="0.25"
        strokeWidth="0.75"
        strokeDasharray="4 3"
      />

      {/* Center crosshair — gold. */}
      <line x1="67" y1="72" x2="77" y2="72" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1" strokeLinecap="round" />
      <line x1="72" y1="67" x2="72" y2="77" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1" strokeLinecap="round" />
      <circle cx="72" cy="72" r="1.5" fill={GOLD} fillOpacity="0.3" />

      {/* Corner registration marks (circuit board style). */}
      <path d="M 12 8 L 12 12 L 16 12" fill="none" stroke={COPPER} strokeOpacity="0.25" strokeWidth="0.75" />
      <path d="M 132 8 L 132 12 L 128 12" fill="none" stroke={COPPER} strokeOpacity="0.25" strokeWidth="0.75" />
      <path d="M 12 136 L 12 132 L 16 132" fill="none" stroke={COPPER} strokeOpacity="0.25" strokeWidth="0.75" />
      <path d="M 132 136 L 132 132 L 128 132" fill="none" stroke={COPPER} strokeOpacity="0.25" strokeWidth="0.75" />

      {/* Scanning sweep — only visible while generating. */}
      {scanning && (
        <rect
          x="0" y="-40" width="144" height="40"
          fill="url(#scan-grad)"
          className="blueprint-scan"
        />
      )}
    </svg>
  )
}
