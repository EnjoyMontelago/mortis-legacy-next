import type { Metadata, Viewport } from 'next'
import './globals.css'

// ─── Static metadata ───────────────────────────────────────────────────────────
// Per-page metadata (player profiles) overrides this via generateMetadata().

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://mortis-legacy.vercel.app'),

  title: {
    default: 'Mortis Legacy — Brawl Stars Tracker',
    template: '%s | Mortis Legacy',
  },
  description:
    'Track your Mortis trophies, history and rank. The ultimate Brawl Stars Mortis tracker.',
  keywords: ['Mortis', 'Brawl Stars', 'trophies', 'tracker', 'rank'],

  openGraph: {
    type: 'website',
    siteName: 'Mortis Legacy',
    title: 'Mortis Legacy — Brawl Stars Tracker',
    description: 'Track your Mortis trophies, history and rank.',
    images: [
      {
        url: '/og-default.png',   // place a 1200×630 image in /public
        width: 1200,
        height: 630,
        alt: 'Mortis Legacy',
      },
    ],
  },

  // Discord uses Twitter card tags
  twitter: {
    card: 'summary_large_image',
    title: 'Mortis Legacy — Brawl Stars Tracker',
    description: 'Track your Mortis trophies, history and rank.',
    images: ['/og-default.png'],
  },

  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#6D28D9',
  width: 'device-width',
  initialScale: 1,
}

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Using <link> in layout rather than next/font because Google Fonts CDN
// is fast enough and avoids self-hosting complexity for now.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
