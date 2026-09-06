import { IconFace } from "@/components/icon-face"
import {
  ICON_CLIP_FILTER_BASE,
  SQUICLE_PATH_100,
  appIconShapeClip,
} from "@/components/squircle"

export function VariantPicker({
  selected,
  onSelect,
  variants,
}: {
  selected: number | null
  onSelect: (i: number) => void
  variants: (string | null)[]
}) {
  const iconPx = 144
  const selectionRingPx = 4
  // Extra layout space so the stroke (centered on the path) is not clipped at the squircle extrema.
  const cellPx = iconPx + selectionRingPx
  const vbPad = (selectionRingPx / 2) * (100 / iconPx)
  const viewBoxVb = `${-vbPad} ${-vbPad} ${100 + 2 * vbPad} ${100 + 2 * vbPad}`
  const ringStrokeVb = String((selectionRingPx * 100) / iconPx)

  return (
    <div className="flex gap-8">
      {[0, 1, 2].map((i) => {
        const isSelected = selected === i
        const src = variants[i]
        return (
          <div key={i} className="flex flex-col items-center gap-2">
            <button
              onClick={() => onSelect(i)}
              className="group relative flex items-center justify-center overflow-visible rounded-none focus:outline-none"
              type="button"
              style={{
                width: cellPx,
                height: cellPx,
                filter: ICON_CLIP_FILTER_BASE,
              }}
            >
              <div
                className="relative z-0 shrink-0 overflow-hidden"
                style={{
                  width: iconPx,
                  height: iconPx,
                  ...appIconShapeClip,
                }}
              >
                <IconFace state="generated" src={src} />
              </div>
              {!isSelected && (
                <svg
                  className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  viewBox={viewBoxVb}
                  preserveAspectRatio="none"
                  overflow="visible"
                  aria-hidden
                >
                  <path
                    d={SQUICLE_PATH_100}
                    fill="none"
                    stroke="rgb(156, 163, 175)"
                    strokeWidth={ringStrokeVb}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {isSelected && (
                <svg
                  className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
                  viewBox={viewBoxVb}
                  preserveAspectRatio="none"
                  overflow="visible"
                  aria-hidden
                >
                  <path
                    d={SQUICLE_PATH_100}
                    fill="none"
                    stroke="white"
                    strokeWidth={ringStrokeVb}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>

            {/* LC parallel resonance tag for each filter variant. */}
            <div className="flex flex-col items-center gap-1 opacity-60">
              <svg width="30" height="15" viewBox="0 0 30 15" fill="none" stroke="#d4a843" strokeWidth="1" aria-hidden>
                <path d="M2 3 H28" />
                <path d="M2 11 H28" />
                <path d="M8 3 q 2.5 5 5 0 q 2.5 5 5 0" />
                <line x1="21" y1="3" x2="21" y2="11" />
                <line x1="24" y1="3" x2="24" y2="11" />
                <circle cx="8" cy="7" r="1.4" fill="#d4a843" />
              </svg>
              <span className="font-mono text-[9px] tracking-widest text-[#d4a843]">LC{i + 1}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
