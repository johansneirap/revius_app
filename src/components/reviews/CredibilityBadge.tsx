'use client'

type Props = {
  score: number | null
  size?: 'sm' | 'lg'
}

type Level = {
  label: string
  containerClass: string
  iconSymbol: React.ReactNode
}

function getLevel(score: number | null): Level {
  if (score === null) {
    return {
      label: 'Analizando…',
      containerClass: 'bg-gray-100 text-gray-600',
      iconSymbol: <circle cx="6.5" cy="6.5" r="1" fill="currentColor" />,
    }
  }
  if (score >= 0.7) {
    return {
      label: 'Alta confiabilidad',
      containerClass: 'bg-green-50 text-green-800',
      iconSymbol: (
        <path
          d="M4.5 6.5L6 8L8.5 5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ),
    }
  }
  if (score >= 0.4) {
    return {
      label: 'Confiabilidad media',
      containerClass: 'bg-amber-50 text-amber-800',
      iconSymbol: (
        <path
          d="M4.5 6.5H8.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      ),
    }
  }
  return {
    label: 'Baja confiabilidad',
    containerClass: 'bg-red-50 text-red-800',
    iconSymbol: (
      <path
        d="M6.5 4.5V7M6.5 8.5V9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    ),
  }
}

export default function CredibilityBadge({ score, size = 'sm' }: Props) {
  const level = getLevel(score)

  const containerClass =
    size === 'sm'
      ? 'px-2 py-1 text-xs'
      : 'px-3 py-1.5 text-sm'

  const iconSize = size === 'sm' ? 10 : 13

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${containerClass} ${level.containerClass}`}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6.5 1L8.5 3H11.5V6C11.5 8.5 9.5 10.5 6.5 12C3.5 10.5 1.5 8.5 1.5 6V3H4.5L6.5 1Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
        {level.iconSymbol}
      </svg>
      {level.label}
    </span>
  )
}
