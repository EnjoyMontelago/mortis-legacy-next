'use client'

import { BrawlApiError, BrawlApiErrorKind } from '@/types/brawlApi'

interface ErrorStateProps {
  readonly error: BrawlApiError
  readonly onRetry: () => void
}

interface ErrorConfig {
  readonly icon: string
  readonly title: string
  readonly hint: string
}

const ERROR_CONFIG: Record<BrawlApiErrorKind, ErrorConfig> = {
  NOT_FOUND: {
    icon: '🔍',
    title: 'Giocatore non trovato',
    hint: 'Controlla che il tag sia corretto in components/PlayerRoot.tsx',
  },
  UNAUTHORIZED: {
    icon: '🔑',
    title: 'API Key non valida',
    hint: 'Aggiungi BRAWL_API_KEY=... al file .env.local (ottienila su developer.brawlstars.com)',
  },
  RATE_LIMITED: {
    icon: '⏳',
    title: 'Troppe richieste',
    hint: "Attendi qualche secondo e riprova.",
  },
  SERVER_ERROR: {
    icon: '⚡',
    title: 'Errore server Brawl Stars',
    hint: "I server di Brawl Stars sono temporaneamente non disponibili.",
  },
  NETWORK_ERROR: {
    icon: '📡',
    title: 'Errore di rete',
    hint: "Controlla che BRAWL_API_KEY sia impostata nelle variabili d'ambiente Vercel.",
  },
  BRAWLER_NOT_FOUND: {
    icon: '☠',
    title: 'Mortis non trovato',
    hint: "Mortis non è sbloccato su questo account.",
  },
  UNKNOWN: {
    icon: '👻',
    title: 'Errore sconosciuto',
    hint: 'Apri la console per maggiori dettagli.',
  },
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const config = ERROR_CONFIG[error.kind]

  return (
    <main className="w-full max-w-2xl mx-auto px-4 pb-16">
      <div className="relative rounded-2xl border border-violet-core/30 bg-card-gradient shadow-card overflow-hidden">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        <div className="p-8 sm:p-12 flex flex-col items-center text-center space-y-6">
          <span className="text-5xl block">{config.icon}</span>

          {error.statusCode && (
            <span className="px-2.5 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-red-400/80 text-xs font-mono">
              HTTP {error.statusCode}
            </span>
          )}

          <h2 className="font-display text-2xl font-bold text-violet-ghost">
            {config.title}
          </h2>

          <p className="text-violet-light/60 text-sm font-mono bg-abyss/60 rounded-lg px-4 py-3 max-w-sm leading-relaxed">
            {error.message}
          </p>

          <div className="rounded-xl border border-violet-core/20 bg-crypt/40 px-5 py-4 max-w-sm">
            <p className="text-violet-light/40 text-xs font-mono uppercase tracking-widest mb-1.5">
              Come risolvere
            </p>
            <p className="text-violet-light/70 text-sm leading-relaxed">{config.hint}</p>
          </div>

          <button
            onClick={onRetry}
            className="px-8 py-3 rounded-lg border border-violet-core/40 bg-violet-core/10 text-violet-light text-sm font-mono tracking-widest uppercase transition-all duration-200 hover:border-violet-glow/60 hover:bg-violet-core/20 hover:shadow-violet-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-glow"
          >
            ↺ Riprova
          </button>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-glow to-transparent opacity-20" />
      </div>
    </main>
  )
}
