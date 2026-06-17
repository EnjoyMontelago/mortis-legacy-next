import { useCallback, useEffect, useReducer } from 'react'
import { fetchPlayer } from '@/services/brawlApi'
import { BrawlApiError } from '@/types/brawlApi'
import { PlayerStats } from '@/types'

// ─── State machine ─────────────────────────────────────────────────────────────

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: PlayerStats }
  | { status: 'error'; error: BrawlApiError }

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: PlayerStats }
  | { type: 'FETCH_ERROR'; payload: BrawlApiError }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' }
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload }
    case 'FETCH_ERROR':
      return { status: 'error', error: action.payload }
    default:
      return state
  }
}

// ─── Public result type ────────────────────────────────────────────────────────

export interface UseBrawlPlayerResult {
  /** True while the request is in flight */
  readonly loading: boolean
  /** Non-null when the request has succeeded */
  readonly data: PlayerStats | null
  /** Non-null when the request has failed */
  readonly error: BrawlApiError | null
  /** Re-triggers the fetch (e.g. for a refresh button) */
  readonly refetch: () => void
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Fetches Brawl Stars player data for a given tag.
 * Manages loading / success / error state via a reducer for predictable transitions.
 *
 * @param tag  Player tag, with or without leading '#' (e.g. '#88Q999VL')
 */
export function useBrawlPlayer(tag: string): UseBrawlPlayerResult {
  const [state, dispatch] = useReducer(reducer, { status: 'idle' })

  const load = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })
    try {
      const data = await fetchPlayer(tag)
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (err) {
      // Normalise to BrawlApiError — always (service layer guarantees this)
      const apiError =
        err instanceof BrawlApiError
          ? err
          : new BrawlApiError('UNKNOWN', String(err))
      dispatch({ type: 'FETCH_ERROR', payload: apiError })
    }
  }, [tag])

  // Fetch on mount and whenever tag changes
  useEffect(() => {
    void load()
  }, [load])

  return {
    loading: state.status === 'loading' || state.status === 'idle',
    data: state.status === 'success' ? state.data : null,
    error: state.status === 'error' ? state.error : null,
    refetch: load,
  }
}
