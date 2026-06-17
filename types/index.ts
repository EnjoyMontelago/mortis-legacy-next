// ─── Domain model ─────────────────────────────────────────────────────────────
// This is the app's internal data shape — decoupled from the raw API response.
// The service layer is responsible for the transformation.

export interface MortisBrawlerStats {
  /** Current season trophies */
  readonly trophies: number
  /** All-time highest trophies */
  readonly highestTrophies: number
  /** Trophy milestone rank 1–35 */
  readonly rank: number
  /** Power level 1–11 */
  readonly powerLevel: number
  /** Number of gadgets unlocked (max 2) */
  readonly gadgets: number
  /** Number of star powers unlocked (max 2) */
  readonly starPowers: number
  /** Number of gears unlocked (max 2) */
  readonly gears: number
}

export interface PlayerStats {
  readonly tag: string
  readonly playerName: string
  /** Player-wide total trophies */
  readonly totalTrophies: number
  /** Player-wide all-time highest trophies */
  readonly totalHighestTrophies: number
  /** Total 3v3 victories across all brawlers */
  readonly totalVictories: number
  /** Mortis-specific stats */
  readonly mortis: MortisBrawlerStats
  /** Trophy target for the progress bar */
  readonly goal: number
}

// ─── Component prop interfaces ────────────────────────────────────────────────

export interface StatCardProps {
  readonly label: string
  readonly value: string | number
  readonly subLabel?: string
  readonly highlight?: boolean
  readonly delay?: number
}

export interface ProgressBarProps {
  readonly current: number
  readonly goal: number
  readonly label?: string
}
