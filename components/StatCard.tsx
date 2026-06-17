import { StatCardProps } from '@/types'

export function StatCard({ label, value, subLabel, highlight = false, delay = 0 }: StatCardProps) {
  return (
    <div
      className={`
        relative group rounded-xl border p-5 transition-all duration-300
        ${highlight
          ? 'border-violet-core/50 bg-gradient-to-br from-violet-core/20 to-crypt/80 shadow-violet'
          : 'border-violet-core/20 bg-crypt/60 hover:border-violet-core/40 hover:shadow-violet-sm'
        }
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow corner accent */}
      {highlight && (
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-violet-glow/10 blur-2xl pointer-events-none" />
      )}

      <p className="text-violet-light/60 text-xs font-mono uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className={`font-display font-bold leading-none ${highlight ? 'text-3xl text-violet-ghost' : 'text-2xl text-violet-ghost/90'}`}>
        {value}
      </p>
      {subLabel && (
        <p className="text-violet-light/40 text-xs font-body mt-1">{subLabel}</p>
      )}

      {/* Bottom highlight line */}
      <div className={`
        absolute bottom-0 left-4 right-4 h-px rounded-full transition-all duration-300
        ${highlight ? 'bg-gradient-to-r from-transparent via-violet-glow to-transparent opacity-60' : 'bg-transparent group-hover:bg-violet-core/30'}
      `} />
    </div>
  )
}
