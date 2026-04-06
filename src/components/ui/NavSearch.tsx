'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Trigger that can be placed anywhere in the tree
export function SearchMobileTrigger() {
  function open() {
    document.dispatchEvent(new CustomEvent('revius:search:open'))
  }
  return (
    <button
      onClick={open}
      aria-label="Buscar"
      className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
    >
      <span className="material-icons text-[20px]">search</span>
    </button>
  )
}

type SearchResult = {
  id: string
  name: string
  brand: string | null
  slug: string
  image_url: string | null
  avg_score: number | null
  category_name: string | null
  min_price: number | null
}

function formatCLP(price: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function NavSearch({ initialQuery }: { initialQuery?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  // Abrir con ⌘K / Ctrl+K y CustomEvent desde SearchMobileTrigger
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    function onOpen() { setIsOpen(true) }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('revius:search:open', onOpen)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('revius:search:open', onOpen)
    }
  }, [])

  // Auto-focus y reset al abrir/cerrar
  useEffect(() => {
    if (isOpen) {
      // Pequeño delay para que el DOM esté listo
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      setQuery('')
      setResults([])
      setLoading(false)
    }
  }, [isOpen])

  // Bloquear scroll del body cuando el overlay está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const doSearch = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (q.trim().length < 2) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`)
        if (!res.ok) throw new Error('search failed')
        const data = await res.json()
        setResults(Array.isArray(data) ? data : [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    doSearch(val)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q.length >= 2) {
      router.push(`/buscar?q=${encodeURIComponent(q)}`)
      setIsOpen(false)
    }
  }

  function handleResultClick() {
    setIsOpen(false)
  }

  function clearQuery() {
    setQuery('')
    setResults([])
    inputRef.current?.focus()
  }

  return (
    <>
      {/* Trigger desktop — barra de búsqueda */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir búsqueda"
        className="group relative hidden w-full max-w-md cursor-text items-center gap-2 rounded-lg border-none bg-slate-100 px-3 py-2 text-left text-sm text-slate-400 transition-colors hover:bg-slate-200 lg:flex dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        <span className="material-icons text-[18px]">search</span>
        <span className="flex-1 truncate">
          {initialQuery || 'Busca productos, marcas o expertos...'}
        </span>
        <kbd className="hidden rounded border border-slate-300 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:block dark:border-slate-600">
          ⌘K
        </kbd>
      </button>

      {/* Overlay — renderizado en document.body via portal para evitar que
          el backdrop-filter del navbar cree un containing block para position:fixed */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex flex-col items-center px-4 pt-[10vh]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-2xl">
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
            >
              {/* Input */}
              <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5 dark:border-slate-800">
                <span className="material-icons flex-shrink-0 text-slate-400">
                  search
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="Busca productos, marcas..."
                  className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-slate-400 dark:text-slate-100"
                />
                {loading && (
                  <span className="material-icons flex-shrink-0 animate-spin text-[18px] text-slate-400">
                    sync
                  </span>
                )}
                {query && !loading && (
                  <button
                    type="button"
                    onClick={clearQuery}
                    className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <span className="material-icons text-[18px]">close</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="hidden flex-shrink-0 rounded border border-slate-200 px-1.5 py-0.5 text-[11px] text-slate-400 hover:border-slate-300 sm:block dark:border-slate-700"
                >
                  Esc
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {/* Empty state */}
                {query.trim().length === 0 && (
                  <div className="flex flex-col items-center gap-2 py-12 text-slate-400">
                    <span className="material-icons text-4xl">search</span>
                    <p className="text-sm">Escribe para buscar productos</p>
                  </div>
                )}

                {/* No results */}
                {query.trim().length >= 2 && !loading && results.length === 0 && (
                  <div className="flex flex-col items-center gap-2 py-12 text-slate-400">
                    <span className="material-icons text-4xl">search_off</span>
                    <p className="text-sm">
                      No encontramos productos para &ldquo;{query}&rdquo;
                    </p>
                  </div>
                )}

                {/* Results list */}
                {results.length > 0 && (
                  <ul role="listbox">
                    {results.map((result, i) => (
                      <li
                        key={result.id}
                        role="option"
                        aria-selected="false"
                        className={
                          i < results.length - 1
                            ? 'border-b border-slate-50 dark:border-slate-800'
                            : ''
                        }
                      >
                        <Link
                          href={`/producto/${result.slug}`}
                          onClick={handleResultClick}
                          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
                        >
                          {/* Imagen */}
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                            {result.image_url ? (
                              <img
                                src={result.image_url}
                                alt={result.name}
                                className="h-full w-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <span className="material-icons text-[16px] text-slate-300">
                                  image_not_supported
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Texto */}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                              {result.name}
                            </p>
                            <p className="truncate text-xs text-slate-400">
                              {result.category_name ?? result.brand ?? ''}
                            </p>
                          </div>

                          {/* Precio */}
                          {result.min_price !== null && (
                            <p className="text-primary flex-shrink-0 text-sm font-bold">
                              {formatCLP(result.min_price)}
                            </p>
                          )}

                          <span className="material-icons flex-shrink-0 text-[14px] text-slate-300">
                            chevron_right
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Footer: ver todos */}
                {results.length > 0 && (
                  <div className="border-t border-slate-100 px-4 py-2.5 dark:border-slate-800">
                    <button
                      type="submit"
                      className="text-primary text-xs font-medium hover:underline"
                    >
                      Ver todos los resultados para &ldquo;{query}&rdquo; →
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
