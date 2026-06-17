interface MortisIconProps {
  className?: string
  size?: number
}

export function MortisIcon({ className = '', size = 48 }: MortisIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Coffin/cape shape */}
      <path
        d="M50 5 L75 20 L80 55 L65 95 L35 95 L20 55 L25 20 Z"
        fill="url(#capeGrad)"
        opacity="0.6"
      />
      {/* Head */}
      <ellipse cx="50" cy="38" rx="22" ry="24" fill="url(#headGrad)" />
      {/* Hat */}
      <path
        d="M28 30 L35 10 L65 10 L72 30 Z"
        fill="#1A0A2E"
        stroke="#6D28D9"
        strokeWidth="1.5"
      />
      <rect x="24" y="28" width="52" height="5" rx="2" fill="#6D28D9" />
      {/* Hat band accent */}
      <path
        d="M36 10 L40 28 M64 10 L60 28"
        stroke="#9333EA"
        strokeWidth="1"
        opacity="0.6"
      />
      {/* Eyes */}
      <ellipse cx="40" cy="38" rx="6" ry="7" fill="#0A0A0F" />
      <ellipse cx="60" cy="38" rx="6" ry="7" fill="#0A0A0F" />
      {/* Eye glow */}
      <ellipse cx="40" cy="38" rx="3.5" ry="4.5" fill="#9333EA" opacity="0.9" />
      <ellipse cx="60" cy="38" rx="3.5" ry="4.5" fill="#9333EA" opacity="0.9" />
      <ellipse cx="40" cy="37" rx="1.5" ry="2" fill="#C4B5FD" />
      <ellipse cx="60" cy="37" rx="1.5" ry="2" fill="#C4B5FD" />
      {/* Nose */}
      <path d="M47 45 L50 50 L53 45" stroke="#6D28D9" strokeWidth="1.5" fill="none" />
      {/* Mouth */}
      <path
        d="M38 55 Q50 62 62 55"
        stroke="#6D28D9"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Teeth */}
      <rect x="43" y="55" width="4" height="5" rx="1" fill="#C4B5FD" opacity="0.7" />
      <rect x="49" y="55" width="4" height="5" rx="1" fill="#C4B5FD" opacity="0.7" />
      {/* Bat wings */}
      <path
        d="M28 45 L8 35 L15 50 L5 48 L20 60 L30 52"
        fill="#6D28D9"
        opacity="0.7"
      />
      <path
        d="M72 45 L92 35 L85 50 L95 48 L80 60 L70 52"
        fill="#6D28D9"
        opacity="0.7"
      />
      <defs>
        <linearGradient id="capeGrad" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#1A0A2E" />
        </linearGradient>
        <linearGradient id="headGrad" x1="50" y1="14" x2="50" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2D9FF" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>
    </svg>
  )
}
