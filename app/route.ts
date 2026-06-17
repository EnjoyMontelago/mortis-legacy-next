import { NextRequest, NextResponse } from 'next/server'

const BRAWL_STARS_BASE = 'https://api.brawlstars.com/v1'

/**
 * Catch-all proxy route: /api/brawl/[...path]
 *
 * Maps:  GET /api/brawl/players/%2388Q999VL
 * →      GET https://api.brawlstars.com/v1/players/%2388Q999VL
 *
 * The Authorization header is injected here, server-side.
 * BRAWL_API_KEY is never exposed to the browser.
 *
 * Works identically in development and on Vercel.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const apiKey = process.env.BRAWL_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { reason: 'missing_api_key', message: 'BRAWL_API_KEY is not set in environment variables.' },
      { status: 500 },
    )
  }

  // Await params — required in Next.js 15
  const { path } = await params

  // Forward query string (e.g. ?limit=25) unchanged
  const search = request.nextUrl.searchParams.toString()
  const upstream = `${BRAWL_STARS_BASE}/${path.join('/')}${search ? `?${search}` : ''}`

  let upstreamResponse: Response
  try {
    upstreamResponse = await fetch(upstream, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
      // Next.js fetch cache: revalidate player data every 60s on the server
      next: { revalidate: 60 },
    })
  } catch {
    return NextResponse.json(
      { reason: 'network_error', message: 'Could not reach api.brawlstars.com' },
      { status: 502 },
    )
  }

  // Stream body as-is — preserve exact API response, including error shapes
  const body = await upstreamResponse.json() as unknown

  return NextResponse.json(body, {
    status: upstreamResponse.status,
    headers: {
      // Cache-Control: match Brawl Stars API freshness, add stale-while-revalidate
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  })
}
