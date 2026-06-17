import { MortisIcon } from '@/components/MortisIcon'

interface HeaderProps {
  playerTag: string
}

export function Header({ playerTag }: HeaderProps) {
  return (
    <header className="relative w-full flex flex-col items-center pt-12 pb-6 px-4">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-mortis-radial pointer-events-none" />

      {/* Floating Mortis icon */}
      <div className="animate-float mb-6 relative">
        <div className="absolute inset-0 rounded-full bg-violet-glow/20 blur-2xl scale-150" />
        <div className="relative p-3 rounded-2xl border border-violet-core/30 bg-crypt/80 shadow-violet animate-pulse-glow">
          <MortisIcon size={72} />
        </div>
      </div>

      {/* Title */}
      <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase text-center">
        <span className="bg-gradient-to-b from-violet-ghost via-violet-light to-violet-bright bg-clip-text text-transparent">
          MORTIS
        </span>
        <br />
        <span className="bg-gradient-to-b from-violet-light to-violet-core bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl tracking-[0.3em]">
          LEGACY
        </span>
      </h1>

      {/* Divider */}
      <div className="flex items-center gap-3 mt-4 w-full max-w-xs">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-violet-core/50" />
        <span className="text-violet-bright/50 text-xs">✦</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-violet-core/50" />
      </div>

      {/* Player tag */}
      <div className="mt-4 px-4 py-1.5 rounded-full border border-violet-core/30 bg-violet-core/10">
        <p className="font-mono text-sm text-violet-light tracking-widest">{playerTag}</p>
      </div>
    </header>
  )
}
