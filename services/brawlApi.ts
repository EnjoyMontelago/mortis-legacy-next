import {
  BrawlApiError,
  BrawlApiErrorKind,
  BrawlApiErrorResponse,
  BrawlApiBrawler,
  BrawlApiPlayerResponse,
} from '../types/brawlApi'
import { PlayerStats } from '../types'

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * In Next.js, /api/brawl/[...path] is a server-side route handler.
 * It injects the BRAWL_API_KEY and proxies to api.brawlstars.com.
 * This path works identically in dev (localhost) and on Vercel.
 */
const BRAWL_API_BASE = '/api/brawl'
const MORTIS_BRAWLER_NAME = 'MORTIS' as const
const TROPHY_GOAL = 2500 as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function encodePlayerTag(tag: string): string {
  const normalised = tag.startsWith('#') ? tag : `#${tag}`
  return encodeURIComponent(normalised)
}

function extractMortis(brawlers: readonly BrawlApiBrawler[]): BrawlApiBrawler {
  const mortis = brawlers.find((b) => b.name === MORTIS_BRAWLER_NAME)
  if (!mortis) {
    throw new BrawlApiError(
      'BRAWLER_NOT_FOUND',
      'Mortis is not unlocked for this account.',
    )
  }
  return mortis
}

function transformPlayer(raw: BrawlApiPlayerResponse): PlayerStats {
  const mortis = extractMortis(raw.brawlers)
  return {
    tag: raw.tag,
    playerName: raw.name,
    totalTrophies: raw.trophies,
    totalHighestTrophies: raw.highestTrophies,
    totalVictories: raw['3vs3Victories'],
    goal: TROPHY_GOAL,
    mortis: {
      trophies: mortis.trophies,
      highestTrophies: mortis.highestTrophies,
      rank: mortis.rank,
      powerLevel: mortis.power,
      gadgets: mortis.gadgets.length,
      starPowers: mortis.starPowers.length,
      gears: mortis.gears.length,
    },
  }
}

function classifyHttpError(status: number): BrawlApiErrorKind {
  if (status === 403 || status === 401) return 'UNAUTHORIZED'
  if (status === 404) return 'NOT_FOUND'
  if (status === 429) return 'RATE_LIMITED'
  if (status >= 500) return 'SERVER_ERROR'
  return 'UNKNOWN'
}

function buildErrorMessage(kind: BrawlApiErrorKind, apiMessage?: string): string {
  const messages: Record<BrawlApiErrorKind, string> = {
    NOT_FOUND: 'Player tag not found.',
    UNAUTHORIZED: 'API key missing or invalid. Set BRAWL_API_KEY in environment variables.',
    RATE_LIMITED: 'Too many requests. Try again in a moment.',
    SERVER_ERROR: 'Brawl Stars API is temporarily unavailable.',
    NETWORK_ERROR: 'Cannot reach the Brawl Stars API.',
    BRAWLER_NOT_FOUND: apiMessage ?? 'Mortis is not unlocked on this account.',
    UNKNOWN: apiMessage ?? 'An unexpected error occurred.',
  }
  return messages[kind]
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchPlayer(tag: string): Promise<PlayerStats> {
  const encodedTag = encodePlayerTag(tag)
  const url = `${BRAWL_API_BASE}/players/${encodedTag}`

  let response: Response
  try {
    response = await fetch(url, { headers: { Accept: 'application/json' } })
  } catch {
    throw new BrawlApiError('NETWORK_ERROR', buildErrorMessage('NETWORK_ERROR'))
  }

  if (!response.ok) {
    const kind = classifyHttpError(response.status)
    let apiMessage: string | undefined
    try {
      const errBody = (await response.json()) as BrawlApiErrorResponse
      apiMessage = errBody.message
    } catch { /* ignore */ }
    throw new BrawlApiError(kind, buildErrorMessage(kind, apiMessage), response.status)
  }

  let raw: BrawlApiPlayerResponse
  try {
    raw = (await response.json()) as BrawlApiPlayerResponse
  } catch {
    throw new BrawlApiError('UNKNOWN', 'Failed to parse API response.')
  }

  return transformPlayer(raw)
}
