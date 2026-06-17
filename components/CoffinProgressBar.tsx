'use client'

import { useEffect, useRef } from 'react'
import { ProgressBarProps } from '@/types'

export function CoffinProgressBar({ current, goal, label }: ProgressBarProps) {
  const fillRef = useRef<HTMLDivElement>(null)
  const percentage = Math.min((current / goal) * 100, 100)
  const remaining = goal - current

  useEffect(() => {
    if (!fillRef.current) return
    fillRef.current.style.setProperty('--bar-width', `${percentage}%`)
    const timer = setTimeout(() => {
      fillRef.current?.classList.add('animate-fill-bar')
    }, 300)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-violet-light/60 text-xs font-mono uppercase tracking-widest">
            {label ?? 'Progressione'}
          </p>
          <p className="text-violet-ghost font-display font-bold text-lg mt-0.5">
            {current.toLocaleString()}
            <span className="text-violet-light/40 text-sm font-body font-normal ml-1">
              / {goal.toLocaleString()}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-violet-light/40 text-xs font-mono">{percentage.toFixed(1)}%</p>
          <p className="text-violet-bright text-sm font-mono font-medium">
            −{remaining.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="relative h-7">
        <div
          className="absolute inset-0 bg-abyss/80 border border-violet-core/30 rounded-sm overflow-hidden"
          style={{
            clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%)',
          }}
        >
          <div
            ref={fillRef}
            className="absolute inset-0 bg-progress-fill"
            style={{
              width: '0%',
              clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%)',
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-6 blur-sm bg-violet-bright/60 pointer-events-none"
            style={{ left: `calc(${percentage}% - 12px)` }}
          />
        </div>

        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-violet-ghost/20"
            style={{ left: `${pct}%` }}
          />
        ))}
      </div>

      <div className="flex justify-between mt-1.5 px-1">
        {[0, 625, 1250, 1875, 2500].map((milestone) => (
          <span
            key={milestone}
            className={`text-xs font-mono ${
              current >= milestone ? 'text-violet-bright/70' : 'text-violet-light/20'
            }`}
          >
            {milestone === 0 ? '0' : milestone >= 1000 ? `${milestone / 1000}k` : milestone}
          </span>
        ))}
      </div>
    </div>
  )
}
