/**
 * Raw types mirroring the Brawl Stars REST API v1 response schema.
 * Reference: https://developer.brawlstars.com/#/operations/getPlayer
 *
 * Only the fields we actually consume are typed — unknown extras are ignored.
 */

export interface BrawlApiGear {
  readonly id: number
  readonly name: string
  readonly level: number
}

export interface BrawlApiStarPower {
  readonly id: number
  readonly name: string
}

export interface BrawlApiGadget {
  readonly id: number
  readonly name: string
}

export interface BrawlApiBrawler {
  readonly id: number
  readonly name: string
  /** Current season trophies */
  readonly trophies: number
  /** All-time highest trophies */
  readonly highestTrophies: number
  /** Power level 1–11 */
  readonly power: number
  /** Trophy milestone rank 1–35 */
  readonly rank: number
  readonly gears: readonly BrawlApiGear[]
  readonly starPowers: readonly BrawlApiStarPower[]
  readonly gadgets: readonly BrawlApiGadget[]
}

export interface BrawlApiClub {
  readonly tag: string
  readonly name: string
}

export interface BrawlApiPlayerIcon {
  readonly id: number
}

export interface BrawlApiPlayerResponse {
  readonly tag: string
  readonly name: string
  readonly nameColor: string
  readonly icon: BrawlApiPlayerIcon
  readonly trophies: number
  readonly highestTrophies: number
  readonly expLevel: number
  readonly expPoints: number
  /** Total 3v3 victories */
  readonly '3vs3Victories': number
  readonly soloVictories: number
  readonly duoVictories: number
  readonly isQualifiedFromChampionshipChallenge: boolean
  readonly bestRoboRumbleTime: number
  readonly bestTimeAsBigBrawler: number
  readonly club: BrawlApiClub | Record<string, never>
  readonly brawlers: readonly BrawlApiBrawler[]
}

// ─── Error response ────────────────────────────────────────────────────────────

export interface BrawlApiErrorResponse {
  readonly reason: string
  readonly message?: string
  readonly type?: string
  readonly detail?: unknown
}

// ─── Error taxonomy ───────────────────────────────────────────────────────────

export type BrawlApiErrorKind =
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'BRAWLER_NOT_FOUND'
  | 'UNKNOWN'

export class BrawlApiError extends Error {
  readonly kind: BrawlApiErrorKind
  readonly statusCode?: number

  constructor(kind: BrawlApiErrorKind, message: string, statusCode?: number) {
    super(message)
    this.name = 'BrawlApiError'
    this.kind = kind
    if (statusCode !== undefined) this.statusCode = statusCode
  }
}
