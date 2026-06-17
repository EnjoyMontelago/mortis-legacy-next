import type { NextConfig } from 'next'

const config: NextConfig = {
  // Strict mode for catching bugs early
  reactStrictMode: true,

  // Future player avatar images from Brawl Stars CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.brawlify.com',
      },
    ],
  },

  // No proxy needed — the /api/brawl route handler does it server-side
}

export default config
