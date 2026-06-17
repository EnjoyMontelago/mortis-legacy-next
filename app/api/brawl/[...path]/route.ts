import { NextResponse } from 'next/server'

const API_BASE = 'https://api.brawlstars.com/v1'

export async function GET(
  req: Request,
  { params }: any
) {
  try {
    const path = params.path.join('/')

    const response = await fetch(`${API_BASE}/${path}`, {
      headers: {
        Authorization: `Bearer ${process.env.BRAWL_API_KEY}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Proxy error' },
      { status: 500 }
    )
  }
}
