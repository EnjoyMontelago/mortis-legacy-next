import { PlayerStats } from '@/types'
import { StatCard } from '@/components/StatCard'
import { CoffinProgressBar } from '@/components/CoffinProgressBar'

interface PlayerCardProps {
  readonly stats: PlayerStats
}

export function PlayerCard({ stats }: PlayerCardProps) {
  const { mortis } = stats
  const rankMedal = mortis.rank >= 20 ? '💀' : mortis.rank >= 15 ? '☠' : '✦'

  return (
    <main className="w-full max-w-2xl mx-auto px-4 pb-16">
      {/* ─── Main card ─────────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl border border-violet-core/30 bg-card-gradient shadow-card overflow-hidden">

        {/* Top glow strip */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-glow to-transparent opacity-60" />

        {/* Corner ornaments */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-violet-core/40 rounded-tl-sm" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-violet-core/40 rounded-tr-sm" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-violet-core/40 rounded-bl-sm" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-violet-core/40 rounded-br-sm" />

        <div className="p-6 sm:p-8 space-y-8">

          {/* ─── Player identity strip ──────────────────────────────────────── */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-glow to-violet-core" />
              <p className="text-violet-light/50 text-xs font-mono uppercase tracking-widest">
                Statistiche Brawler
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-violet-ghost/80 text-sm font-display font-semibold truncate max-w-[120px] sm:max-w-none">
                {stats.playerName}
              </span>
              <span className="text-violet-light/30 text-xs font-mono hidden sm:inline">
                {stats.tag}
              </span>
            </div>
          </div>

          {/* ─── Primary stats — Mortis trophies ────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <StatCard
              label="Trofei Mortis"
              value={mortis.trophies.toLocaleString('it-IT')}
              subLabel="Stagione corrente"
              highlight
              delay={0}
            />
            <StatCard
              label="Record Mortis"
              value={mortis.highestTrophies.toLocaleString('it-IT')}
              subLabel="Massimo storico"
              highlight
              delay={80}
            />
          </div>

          {/* ─── Secondary stats ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              label="Rank"
              value={`${rankMedal} ${mortis.rank}`}
              subLabel="Trophy Rank"
              delay={160}
            />
            <StatCard
              label="Power"
              value={`P${mortis.powerLevel}`}
              subLabel="Power Level"
              delay={220}
            />
            <StatCard
              label="Vittorie 3v3"
              value={stats.totalVictories.toLocaleString('it-IT')}
              subLabel="Totale account"
              delay={280}
            />
          </div>

          {/* ─── Account overview ─────────────────────────────────────────────── */}
          <div className="rounded-xl border border-violet-core/15 bg-abyss/40 px-5 py-4">
            <p className="text-violet-light/30 text-xs font-mono uppercase tracking-widest mb-3">
              Panoramica Account
            </p>
            <div className="grid grid-cols-2 gap-4">
              <AccountStat
                label="Trofei Totali"
                value={stats.totalTrophies.toLocaleString('it-IT')}
              />
              <AccountStat
                label="Record Totale"
                value={stats.totalHighestTrophies.toLocaleString('it-IT')}
              />
            </div>
          </div>

          {/* ─── Divider ─────────────────────────────────────────────────────── */}
          <div className="h-px bg-gradient-to-r from-transparent via-violet-core/30 to-transparent" />

          {/* ─── Progress toward goal ─────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-glow to-violet-core" />
              <p className="text-violet-light/50 text-xs font-mono uppercase tracking-widest">
                Obiettivo — {stats.goal.toLocaleString('it-IT')} Trofei
              </p>
            </div>
            <CoffinProgressBar
              current={mortis.trophies}
              goal={stats.goal}
              label="Progressione verso 2500"
            />
          </div>

          {/* ─── Divider ─────────────────────────────────────────────────────── */}
          <div className="h-px bg-gradient-to-r from-transparent via-violet-core/30 to-transparent" />

          {/* ─── Equipment ────────────────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-glow to-violet-core" />
              <p className="text-violet-light/50 text-xs font-mono uppercase tracking-widest">
                Equipaggiamento Mortis
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <EquipmentBadge icon="⚡" label="Gadget" value={mortis.gadgets} max={2} />
              <EquipmentBadge icon="★" label="Star Power" value={mortis.starPowers} max={2} />
              <EquipmentBadge icon="⚙" label="Gear" value={mortis.gears} max={2} />
            </div>
          </div>

        </div>

        {/* Bottom glow strip */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-glow to-transparent opacity-30" />
      </div>

      {/* Footer */}
      <p className="text-center text-violet-light/20 text-xs font-mono mt-6 tracking-widest">
        MORTIS LEGACY · BRAWL STARS TRACKER · LIVE DATA
      </p>
    </main>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface AccountStatProps {
  readonly label: string
  readonly value: string
}

function AccountStat({ label, value }: AccountStatProps) {
  return (
    <div>
      <p className="text-violet-light/30 text-xs font-mono mb-0.5">{label}</p>
      <p className="text-violet-ghost/80 text-base font-display font-semibold">{value}</p>
    </div>
  )
}

interface EquipmentBadgeProps {
  readonly icon: string
  readonly label: string
  readonly value: number
  readonly max: number
}

function EquipmentBadge({ icon, label, value, max }: EquipmentBadgeProps) {
  const isComplete = value >= max
  return (
    <div
      className={`
        relative rounded-lg border p-3 text-center transition-all duration-200
        ${isComplete
          ? 'border-violet-glow/40 bg-violet-core/15'
          : 'border-violet-core/20 bg-abyss/50'
        }
      `}
    >
      <span className="text-xl block mb-1">{icon}</span>
      <p className={`text-xs font-mono font-medium ${isComplete ? 'text-violet-light' : 'text-violet-light/40'}`}>
        {value}/{max}
      </p>
      <p className="text-violet-light/30 text-xs mt-0.5">{label}</p>
      {isComplete && (
        <div className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-bright" />
      )}
    </div>
  )
}
