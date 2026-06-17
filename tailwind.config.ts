import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        abyss: '#0A0A0F',
        void: '#0D0D1A',
        crypt: '#12102A',
        violet: {
          core: '#6D28D9',
          glow: '#9333EA',
          bright: '#A855F7',
          light: '#C4B5FD',
          ghost: '#E2D9FF',
        },
        bone: '#F0EBE3',
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'mortis-radial':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(109,40,217,0.25) 0%, rgba(10,10,15,0) 70%)',
        'card-gradient':
          'linear-gradient(135deg, rgba(109,40,217,0.12) 0%, rgba(18,16,42,0.95) 100%)',
        'progress-fill':
          'linear-gradient(90deg, #6D28D9 0%, #A855F7 60%, #C4B5FD 100%)',
      },
      boxShadow: {
        violet: '0 0 32px rgba(109,40,217,0.45)',
        'violet-sm': '0 0 12px rgba(109,40,217,0.3)',
        'violet-lg': '0 0 64px rgba(109,40,217,0.55)',
        card: '0 4px 48px rgba(0,0,0,0.7), 0 0 1px rgba(109,40,217,0.4)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'fill-bar': 'fillBar 2s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(109,40,217,0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(168,85,247,0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fillBar: {
          from: { width: '0%' },
          to: { width: 'var(--bar-width)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
