'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchRedirect() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) router.push(`/buscar?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="group relative mx-auto max-w-2xl">
      <div className="from-primary/20 to-primary/10 absolute -inset-1 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity group-focus-within:opacity-100" />
      <div className="border-primary/5 relative flex items-center rounded-2xl border bg-white shadow-xl dark:bg-slate-900">
        <div className="flex flex-1 items-center px-4">
          <span className="material-icons mr-3 text-slate-400">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribe el nombre del producto, marca o modelo..."
            className="w-full bg-transparent py-4 text-base font-medium outline-none placeholder:text-slate-400"
          />
        </div>
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="px-3 text-slate-400 transition-colors hover:text-slate-600"
          >
            <span className="material-icons text-xl">close</span>
          </button>
        )}
        <button
          type="submit"
          className="bg-primary m-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
    </form>
  )
}
