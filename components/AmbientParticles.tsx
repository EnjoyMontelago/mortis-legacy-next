'use client'

// Must be a Client Component: Math.random() during SSR would produce different
// values than on the client, causing a React hydration mismatch.

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: (i * 7 + 13) % 4 + 1,          // deterministic but varied
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 29) % 100,
  delay: (i * 0.4) % 4,
  duration: (i * 0.3) % 4 + 4,
}))

export function AmbientParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-violet-glow opacity-0"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `fadeUp ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}
