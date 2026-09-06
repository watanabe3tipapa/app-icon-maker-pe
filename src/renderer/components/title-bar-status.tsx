export function TitleBarStatus({
  fraction,
}: {
  label: string
  fraction: number
  isError: boolean
}) {
  if (fraction <= 0) return null
  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] z-50 overflow-hidden">
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${Math.round(fraction * 100)}%`,
          background: "linear-gradient(90deg, #b87333, #d4a843)",
        }}
      />
    </div>
  )
}
