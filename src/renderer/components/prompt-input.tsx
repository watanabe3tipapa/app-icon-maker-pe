import { useRef, type ChangeEvent, type KeyboardEvent } from "react"
import { ChevronRight, ImagePlus, RefreshCw, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type PrimaryAction = "submit" | "stop" | "refresh" | "select"

export function PromptInput({
  value,
  onChange,
  primaryAction,
  onPrimary,
  primaryEnabled,
  onRegenerate,
  regenerateEnabled,
  inputDisabled,
  placeholder,
  attachments,
  onAttachmentsChange,
  onOpenApiKeySettings,
}: {
  value: string
  onChange: (v: string) => void
  primaryAction: PrimaryAction
  onPrimary: () => void
  primaryEnabled: boolean
  onRegenerate?: () => void
  regenerateEnabled?: boolean
  inputDisabled: boolean
  placeholder: string
  attachments: string[]
  onAttachmentsChange: (attachments: string[]) => void
  onOpenApiKeySettings: () => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (primaryAction === "select") return
      if (primaryEnabled) onPrimary()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const newUrls = files.map((file) => URL.createObjectURL(file))
    onAttachmentsChange([...attachments, ...newUrls])
    e.target.value = ""
  }

  const removeAttachment = (index: number) => {
    const removed = attachments[index]
    URL.revokeObjectURL(removed)
    onAttachmentsChange(attachments.filter((_, i) => i !== index))
  }

  return (
    <div className="relative w-full group">
      {/* Variable capacitor (バリコン) decoration — left side */}
      <svg
        className="absolute -left-7 top-1/2 -translate-y-1/2 w-6 h-24 pointer-events-none select-none"
        viewBox="0 0 24 96"
        aria-hidden
      >
        <line x1="12" y1="4" x2="12" y2="92" stroke="#d4a843" strokeWidth="1" opacity="0.35" />
        {/* Stator plates (top) */}
        <line x1="12" y1="8" x2="4" y2="8" stroke="#d4a843" strokeWidth="1.2" opacity="0.4" />
        <line x1="12" y1="16" x2="4" y2="16" stroke="#d4a843" strokeWidth="1.2" opacity="0.4" />
        <line x1="12" y1="24" x2="4" y2="24" stroke="#d4a843" strokeWidth="1.2" opacity="0.4" />
        <line x1="12" y1="32" x2="4" y2="32" stroke="#d4a843" strokeWidth="1.2" opacity="0.4" />
        {/* Rotor plates (bottom) */}
        <line x1="12" y1="64" x2="20" y2="64" stroke="#d4a843" strokeWidth="1.2" opacity="0.4" />
        <line x1="12" y1="72" x2="20" y2="72" stroke="#d4a843" strokeWidth="1.2" opacity="0.4" />
        <line x1="12" y1="80" x2="20" y2="80" stroke="#d4a843" strokeWidth="1.2" opacity="0.4" />
        <line x1="12" y1="88" x2="20" y2="88" stroke="#d4a843" strokeWidth="1.2" opacity="0.4" />
        {/* Tuning arrow */}
        <path d="M 14 44 L 18 48 L 14 52" fill="none" stroke="#d4a843" strokeWidth="0.8" opacity="0.5" />
        <text x="24" y="49" fill="#d4a843" fontSize="5" fontFamily="monospace" opacity="0.35">TUNE</text>
      </svg>

      <div
        className={cn(
          "w-full rounded-none border border-border/60 bg-secondary/30 transition-all duration-200",
          "focus-within:border-[#d4a843]/30 focus-within:bg-secondary/50 p-3",
          "shadow-[inset_0_1px_0_rgba(212,168,67,0.06)]"
        )}
      >
        {/* Textarea. */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={inputDisabled}
          placeholder={placeholder}
          rows={2}
          className={cn(
            "w-full bg-transparent resize-none border-0 outline-none ring-0",
            "text-sm text-foreground placeholder:text-muted-foreground/50",
            "leading-relaxed overflow-y-auto m-1.5",
            inputDisabled && "opacity-60"
          )}
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(212,168,67,0.15) transparent" }}
        />

        {/* Bottom action bar. */}
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex items-center gap-0.5",
              inputDisabled && "pointer-events-none opacity-60"
            )}
          >
            {/* Attach reference image. */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-none",
                "text-muted-foreground hover:text-[#d4a843] hover:bg-[#d4a843]/10",
                "transition-colors shrink-0"
              )}
              title="Attach reference image"
            >
              <ImagePlus className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenApiKeySettings}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-none",
                "text-muted-foreground hover:text-[#d4a843] hover:bg-[#d4a843]/10",
                "transition-colors shrink-0"
              )}
              title="OpenAI API key"
              aria-label="OpenAI API key settings"
            >
              {/* Antenna + ground (アンテナ / アース) */}
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M8 1 V8" />
                <path d="M8 4 L4 2 M8 4 L12 2 M8 7 L5 9 M8 7 L11 9" />
                <path d="M3 11 h10 M5 13 h6 M7 15 h2" />
              </svg>
            </button>

            {/* Inline attachment thumbnails — same row, no height change. */}
            {attachments.map((src, i) => (
              <div
                key={i}
                className="relative group w-7 h-7 rounded-none overflow-hidden shrink-0 border border-[#d4a843]/20"
              >
                <img src={src} alt="Reference" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeAttachment(i)}
                  className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onRegenerate != null && (
              <button
                type="button"
                onClick={onRegenerate}
                disabled={!regenerateEnabled}
                className={cn(
                  "flex items-center justify-center transition-all duration-200 shrink-0 w-8 min-w-8 h-8 px-0",
                  "rounded-none border border-border/40",
                  regenerateEnabled
                    ? "text-foreground hover:border-[#d4a843]/30 hover:text-[#d4a843]"
                    : "text-muted-foreground cursor-not-allowed opacity-40"
                )}
                title="Regenerate: three new variants from the same prompt"
                aria-label="Regenerate"
              >
                <RefreshCw className="w-4 h-4" strokeWidth={2.5} />
              </button>
            )}
            <button
              type="button"
              onClick={onPrimary}
              disabled={!primaryEnabled}
              className={cn(
                "flex items-center justify-center gap-0.5 transition-all duration-200 shrink-0 h-8 font-mono text-xs tracking-wider",
                primaryAction === "select" ? "min-w-[88px] px-3" : "w-8 min-w-8 px-0",
                "rounded-none border",
                primaryEnabled
                  ? "bg-[#d4a843]/15 text-[#d4a843] border-[#d4a843]/30 hover:bg-[#d4a843]/25 shadow-sm"
                  : "bg-muted text-muted-foreground cursor-not-allowed border-border/30"
              )}
              title={
                primaryAction === "stop"
                  ? "Stop generation"
                  : primaryAction === "refresh"
                    ? "Re-generate all variants (Enter)"
                    : primaryAction === "select"
                      ? "Use this design as the base: remove other variants, then describe how to build three new ones"
                      : "Generate (Enter)"
              }
              aria-label={
                primaryAction === "stop"
                  ? "Stop"
                  : primaryAction === "refresh"
                    ? "Refresh"
                    : primaryAction === "select"
                      ? "Select"
                      : "Submit"
              }
            >
              {primaryAction === "stop" && (
                <span className="w-2.5 h-2.5 rounded-[1px] bg-current" aria-hidden />
              )}
              {primaryAction === "refresh" && <RefreshCw className="w-4 h-4" strokeWidth={2.5} />}
              {primaryAction === "submit" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                  className={cn(primaryEnabled && "signal-pulse")}
                  aria-hidden
                >
                  <polygon points="1.5,1.5 1.5,12.5 7,7" />
                  <line x1="7" y1="1.5" x2="7" y2="12.5" />
                  <line x1="10" y1="1.5" x2="10" y2="12.5" />
                </svg>
              )}
              {primaryAction === "select" && (
                <>
                  <span>SELECT</span>
                  <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
