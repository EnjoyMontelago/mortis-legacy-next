import { MortisIcon } from '@/components/MortisIcon'

export function LoadingState() {
  return (
    <main className="w-full max-w-2xl mx-auto px-4 pb-16">
      <div className="relative rounded-2xl border border-violet-core/30 bg-card-gradient shadow-card overflow-hidden">
        {/* Top glow strip */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-glow to-transparent opacity-60" />

        <div className="p-6 sm:p-8 space-y-8">
          {/* Section label skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-glow to-violet-core" />
            <div className="h-3 w-36 rounded bg-violet-core/20 animate-pulse" />
          </div>

          {/* Primary stat skeletons */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <SkeletonCard tall />
            <SkeletonCard tall />
          </div>

          {/* Secondary stat skeletons */}
          <div className="grid grid-cols-3 gap-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-violet-core/20 to-transparent" />

          {/* Progress bar skeleton */}
          <div className="space-y-3">
            <div className="h-3 w-48 rounded bg-violet-core/20 animate-pulse" />
            <div className="h-7 w-full rounded bg-violet-core/10 animate-pulse" />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-violet-core/20 to-transparent" />

          {/* Equipment skeletons */}
          <div className="grid grid-cols-3 gap-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>

        {/* Centre spinner overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-abyss/40 backdrop-blur-[1px]">
          <div className="relative">
            {/* Spinning ring */}
            <div className="w-20 h-20 rounded-full border-2 border-violet-core/20 border-t-violet-glow animate-spin" />
            {/* Icon in centre */}
            <div className="absolute inset-0 flex items-center justify-center">
              <MortisIcon size={36} className="opacity-80" />
            </div>
          </div>
          <p className="mt-5 text-violet-light/50 text-xs font-mono uppercase tracking-widest">
            Recupero dati in corso…
          </p>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-glow to-transparent opacity-30" />
      </div>
    </main>
  )
}

function SkeletonCard({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`rounded-xl border border-violet-core/15 bg-crypt/40 p-5 space-y-2 ${tall ? 'py-6' : ''}`}
    >
      <div className="h-2.5 w-16 rounded bg-violet-core/15 animate-pulse" />
      <div className="h-7 w-20 rounded bg-violet-core/20 animate-pulse" />
      <div className="h-2 w-24 rounded bg-violet-core/10 animate-pulse" />
    </div>
  )
}
