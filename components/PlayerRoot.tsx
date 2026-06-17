'use client'

import { Header } from './Header'
import { PlayerCard } from './PlayerCard'
import { LoadingState } from './LoadingState'
import { ErrorState } from './ErrorState'
import { AmbientParticles } from './AmbientParticles'
import { useBrawlPlayer } from '@/hooks/useBrawlPlayer'

interface PlayerRootProps {
  readonly tag: string
}

export function PlayerRoot({ tag }: PlayerRootProps) {
  const { data, loading, error, refetch } = useBrawlPlayer(tag)

  return (
    <div className="min-h-screen bg-abyss relative">
      {/* Void gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% -10%, rgba(109,40,217,0.18) 0%, rgba(10,10,15,0) 65%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(109,40,217,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(109,40,217,1) 1px, transparent 1px), linear-gradient(90deg, rgba(109,40,217,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <AmbientParticles />

      <div className="relative z-10 flex flex-col items-center">
        <Header playerTag={tag} />

        {loading && <LoadingState />}
        {error && !loading && <ErrorState error={error} onRetry={refetch} />}
        {data && !loading && !error && <PlayerCard stats={data} />}
      </div>
    </div>
  )
}
