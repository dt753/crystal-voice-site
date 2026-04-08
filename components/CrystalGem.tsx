'use client'

interface Props {
  size?: number      // ширина в px, высота масштабируется автоматически
  className?: string
  opacity?: number
}

/**
 * Кристалл — точная копия SVG из приложения (overlay.html).
 * ViewBox 0 0 14 26, грани: левая (#9b7dff→#b8a0ff), правая (#ddd5ff→#f5f2ff), верхняя крышка (#f5f2ff).
 */
export default function CrystalGem({ size = 12, className = '', opacity = 1 }: Props) {
  const w = size
  const h = Math.round(size * 26 / 14)
  const uid = `cg-${size}`

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 14 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={`${uid}-l`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#9b7dff" />
          <stop offset="100%" stopColor="#b8a0ff" />
        </linearGradient>
        <linearGradient id={`${uid}-r`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#ddd5ff" />
          <stop offset="100%" stopColor="#f5f2ff" />
        </linearGradient>
      </defs>

      {/* Левая / передняя грань */}
      <polygon
        points="7,1 4,5 4,21 7,25 10,21 10,5"
        fill={`url(#${uid}-l)`}
        stroke="#4a3070"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />

      {/* Правая / боковая грань */}
      <polygon
        points="10,5 7,1 13,4 13,22 10,25 7,25 10,21"
        fill={`url(#${uid}-r)`}
        stroke="#4a3070"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />

      {/* Верхняя крышка */}
      <polygon
        points="7,1 13,4 10,5 4,5"
        fill="#f5f2ff"
        stroke="#4a3070"
        strokeWidth="0.7"
      />

      {/* Бликовый акцент на верхушке */}
      <polygon
        points="7.5,1.5 11.5,3.8 9.5,4.5 7,3"
        fill="rgba(255,255,255,0.65)"
      />
    </svg>
  )
}
