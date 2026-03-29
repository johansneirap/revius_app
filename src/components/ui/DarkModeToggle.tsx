'use client'

export default function DarkModeToggle() {
  return (
    <button
      onClick={() => document.documentElement.classList.toggle('dark')}
      className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-yellow-400 dark:hover:bg-slate-800"
    >
      <span className="material-icons dark:hidden">dark_mode</span>
      <span className="material-icons hidden dark:block">light_mode</span>
    </button>
  )
}
