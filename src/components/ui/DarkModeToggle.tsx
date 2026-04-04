'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-yellow-400 dark:hover:bg-slate-800">
        <span className="material-icons text-[20px] opacity-0">dark_mode</span>
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-yellow-400 dark:hover:bg-slate-800"
    >
      <span className="material-icons text-[20px]">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}
