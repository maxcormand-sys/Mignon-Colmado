export function MarqueeBand() {
  const words = [
    "Lamparas",
    "Ceramica",
    "Textiles",
    "Figuras",
    "Cristaleria",
    "Ropa vintage",
    "Objetos",
    "Iluminacion",
    "Porcelana",
    "Decoracion",
  ]

  const content = words.map((w, i) => (
    <span key={i} className="flex items-center gap-5">
      <span className="font-serif italic text-lg md:text-xl">{w}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-30 flex-shrink-0" aria-hidden="true" />
    </span>
  ))

  return (
    <div className="bg-foreground text-background py-3.5 overflow-hidden" aria-hidden="true">
      <div className="flex whitespace-nowrap animate-marquee gap-5">
        <div className="flex gap-5 pr-5">{content}</div>
        <div className="flex gap-5 pr-5">{content}</div>
        <div className="flex gap-5 pr-5">{content}</div>
        <div className="flex gap-5 pr-5">{content}</div>
      </div>
    </div>
  )
}
