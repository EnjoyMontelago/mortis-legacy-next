import { PlayerRoot } from '@/components/PlayerRoot'

// ISR: rebuild this page at most once every 5 minutes on Vercel
export const revalidate = 300

const PLAYER_TAG = '#88Q999VL'

export default function HomePage() {
  // Server Component: no data fetching here yet.
  // PlayerRoot is a Client Component that owns the fetch lifecycle.
  // When Supabase is wired up, initial data will be passed as a prop from here.
  return <PlayerRoot tag={PLAYER_TAG} />
}
