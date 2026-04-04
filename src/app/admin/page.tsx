'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type SolotodoCategory = { id: number; name: string }
type DbCategory = { id: string; name: string; slug: string }

type SolotodoProduct = {
  id: number
  name: string
  picture_url: string | null
  category: string
}

type AdminProduct = {
  id: string
  name: string
  slug: string
  solotodo_id: number
  min_price: number | null
  last_fetched: string | null
}

type ImportStatus = 'idle' | 'importing' | 'success' | 'exists' | 'error'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number | null): string {
  if (price === null) return '—'
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(price)
}

function formatDate(iso: string | null): string {
  if (!iso) return 'Nunca'
  return new Date(iso).toLocaleString('es-CL', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ─── ImportTab ────────────────────────────────────────────────────────────────

function ImportTab({
  importedIds,
  onImportSuccess,
}: {
  importedIds: Set<number>
  onImportSuccess: () => void
}) {
  const [query, setQuery] = useState('')
  const [solotodoCategoryId, setSolotodoCategoryId] = useState<number | ''>('')
  const [dbCategoryId, setDbCategoryId] = useState<string>('')
  const [solotodoCategories, setSolotodoCategories] = useState<SolotodoCategory[]>([])
  const [dbCategories, setDbCategories] = useState<DbCategory[]>([])
  const [results, setResults] = useState<SolotodoProduct[]>([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [statuses, setStatuses] = useState<Record<number, ImportStatus>>({})

  useEffect(() => {
    fetch('/api/admin/solotodo-categories')
      .then((r) => r.json())
      .then((d) => setSolotodoCategories(Array.isArray(d) ? d : []))
      .catch(() => {})

    fetch('/api/admin/db-categories')
      .then((r) => r.json())
      .then((d) => setDbCategories(Array.isArray(d) ? d : []))
      .catch(() => {})
  }, [])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setSearching(true)
    setSearchError(null)
    setResults([])

    const params = new URLSearchParams({ q: query.trim() })
    if (solotodoCategoryId) params.set('categoryId', String(solotodoCategoryId))

    try {
      const r = await fetch(`/api/admin/search-solotodo?${params}`)
      if (!r.ok) throw new Error('Error en la búsqueda')
      const data = await r.json()
      setResults(Array.isArray(data) ? data : [])
      if (!Array.isArray(data) || data.length === 0) {
        setSearchError('No se encontraron resultados en SoloTodo')
      }
    } catch {
      setSearchError('Error al conectar con SoloTodo')
    } finally {
      setSearching(false)
    }
  }

  async function handleImport(product: SolotodoProduct) {
    if (!dbCategoryId) return
    setStatuses((prev) => ({ ...prev, [product.id]: 'importing' }))

    try {
      const r = await fetch('/api/admin/import-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solotodoProductId: product.id,
          categoryId: dbCategoryId,
        }),
      })

      if (r.status === 409) {
        setStatuses((prev) => ({ ...prev, [product.id]: 'exists' }))
      } else if (r.ok) {
        setStatuses((prev) => ({ ...prev, [product.id]: 'success' }))
        onImportSuccess()
      } else {
        setStatuses((prev) => ({ ...prev, [product.id]: 'error' }))
      }
    } catch {
      setStatuses((prev) => ({ ...prev, [product.id]: 'error' }))
    }
  }

  function importButtonContent(product: SolotodoProduct) {
    const status = statuses[product.id] ?? 'idle'
    const alreadyImported = importedIds.has(product.id)

    if (alreadyImported || status === 'success' || status === 'exists') {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
          <span className="material-icons text-[14px]">check_circle</span>
          Importado
        </span>
      )
    }
    if (status === 'importing') {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
          <span className="material-icons animate-spin text-[14px]">sync</span>
          Importando...
        </span>
      )
    }
    if (status === 'error') {
      return (
        <button
          onClick={() => handleImport(product)}
          disabled={!dbCategoryId}
          className="text-xs text-red-600 underline hover:text-red-800"
        >
          Error — reintentar
        </button>
      )
    }

    return (
      <button
        onClick={() => handleImport(product)}
        disabled={!dbCategoryId}
        className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Importar
      </button>
    )
  }

  return (
    <div className="space-y-6">
      {/* Formulario de búsqueda */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Buscar en SoloTodo
        </h2>
        <form onSubmit={handleSearch} className="flex flex-wrap gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Samsung Galaxy S24"
            className="min-w-[260px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
          />
          <select
            value={solotodoCategoryId}
            onChange={(e) =>
              setSolotodoCategoryId(e.target.value ? parseInt(e.target.value) : '')
            }
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
          >
            <option value="">Categoría SoloTodo (opcional)</option>
            {solotodoCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={searching || !query.trim()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {searching ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {/* Selector de categoría destino */}
        <div className="mt-4 flex items-center gap-3">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
            Categoría destino (requerida para importar):
          </label>
          <select
            value={dbCategoryId}
            onChange={(e) => setDbCategoryId(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
          >
            <option value="">Seleccionar categoría...</option>
            {dbCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {!dbCategoryId && (
            <span className="text-xs text-amber-600">
              Selecciona una categoría antes de importar
            </span>
          )}
        </div>
      </div>

      {/* Error de búsqueda */}
      {searchError && (
        <p className="text-sm text-red-600">{searchError}</p>
      )}

      {/* Resultados */}
      {results.length > 0 && (
        <div>
          <p className="mb-3 text-xs text-slate-500">
            {results.length} resultado{results.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((product) => {
              const img = product.picture_url
              return (
                <div
                  key={product.id}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
                >
                  {img ? (
                    <img
                      src={img}
                      alt={product.name}
                      className="mb-3 h-36 w-full rounded-lg object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const parent = e.currentTarget.parentElement
                        if (!parent) return
                        e.currentTarget.remove()
                        parent.innerHTML =
                          '<div class="mb-3 flex h-36 items-center justify-center rounded-lg bg-slate-100"><span class="material-icons text-3xl text-slate-400">image_not_supported</span></div>'
                      }}
                    />
                  ) : (
                    <div className="mb-3 flex h-36 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                      <span className="material-icons text-3xl text-slate-400">
                        image_not_supported
                      </span>
                    </div>
                  )}
                  <p className="mb-1 text-xs text-slate-400">
                    ID: {product.id}
                  </p>
                  <p className="mb-3 flex-1 text-sm font-medium leading-snug text-slate-900 dark:text-slate-100">
                    {product.name}
                  </p>
                  <div>{importButtonContent(product)}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PricesTab ────────────────────────────────────────────────────────────────

function PricesTab() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshingAll, setRefreshingAll] = useState(false)
  const [refreshingIds, setRefreshingIds] = useState<Set<string>>(new Set())
  const [summary, setSummary] = useState<{
    updated: number
    errors: number
    total: number
  } | null>(null)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/products')
      const data = await r.json()
      setProducts(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  async function handleRefreshAll() {
    setRefreshingAll(true)
    setSummary(null)
    try {
      const r = await fetch('/api/admin/refresh-prices', { method: 'POST' })
      const data = await r.json()
      setSummary(data)
      loadProducts()
    } finally {
      setRefreshingAll(false)
    }
  }

  async function handleRefreshOne(productId: string) {
    setRefreshingIds((prev) => new Set([...prev, productId]))
    try {
      await fetch('/api/admin/refresh-prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      await loadProducts()
    } finally {
      setRefreshingIds((prev) => {
        const next = new Set(prev)
        next.delete(productId)
        return next
      })
    }
  }

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-slate-500">
        Cargando productos...
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
        <span className="material-icons mb-3 block text-4xl text-slate-300">
          inventory_2
        </span>
        <p className="text-sm text-slate-500">
          No hay productos importados desde SoloTodo todavía.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {products.length} producto{products.length !== 1 ? 's' : ''} con
          SoloTodo ID
        </p>
        <button
          onClick={handleRefreshAll}
          disabled={refreshingAll}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          <span
            className={`material-icons text-[16px] ${refreshingAll ? 'animate-spin' : ''}`}
          >
            sync
          </span>
          {refreshingAll ? 'Actualizando...' : 'Actualizar todos'}
        </button>
      </div>

      {summary && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-300">
          Actualización completada: {summary.updated} exitosos
          {summary.errors > 0 ? `, ${summary.errors} errores` : ''} de{' '}
          {summary.total} productos.
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                Producto
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                SoloTodo ID
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400">
                Precio mín.
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                Última actualización
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {products.map((product) => {
              const isRefreshing = refreshingIds.has(product.id)
              return (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <td className="px-4 py-3">
                    <a
                      href={`/producto/${product.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-900 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
                    >
                      {product.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {product.solotodo_id}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-slate-900 dark:text-slate-100">
                    {formatPrice(product.min_price)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {formatDate(product.last_fetched)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleRefreshOne(product.id)}
                      disabled={isRefreshing || refreshingAll}
                      className="inline-flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-blue-600 disabled:opacity-50 dark:hover:text-blue-400"
                    >
                      <span
                        className={`material-icons text-[14px] ${isRefreshing ? 'animate-spin' : ''}`}
                      >
                        sync
                      </span>
                      {isRefreshing ? 'Actualizando' : 'Actualizar'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [tab, setTab] = useState<'import' | 'prices'>('import')
  const [importedIds, setImportedIds] = useState<Set<number>>(new Set())

  // Cargar los solotodo_ids ya importados para el estado inicial
  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((data: AdminProduct[]) => {
        if (Array.isArray(data)) {
          setImportedIds(new Set(data.map((p) => p.solotodo_id)))
        }
      })
      .catch(() => {})
  }, [])

  function handleImportSuccess() {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((data: AdminProduct[]) => {
        if (Array.isArray(data)) {
          setImportedIds(new Set(data.map((p) => p.solotodo_id)))
        }
      })
      .catch(() => {})
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Panel de administración
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Importa productos desde SoloTodo y mantén los precios actualizados.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
        {(
          [
            { key: 'import', label: 'Importar producto', icon: 'add_box' },
            { key: 'prices', label: 'Actualizar precios', icon: 'price_change' },
          ] as const
        ).map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === key
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
          >
            <span className="material-icons text-[16px]">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {tab === 'import' && (
        <ImportTab
          importedIds={importedIds}
          onImportSuccess={handleImportSuccess}
        />
      )}
      {tab === 'prices' && <PricesTab />}
    </div>
  )
}
