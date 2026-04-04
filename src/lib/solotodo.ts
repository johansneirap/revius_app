const BASE_URL = 'https://publicapi.solotodo.com'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos
const MIN_INTERVAL_MS = 500 // 500ms entre requests

// ─── Types ────────────────────────────────────────────────────────────────────

export type SolotodoCategory = {
  url: string
  id: number
  name: string
  slug: string
}

export type SolotodoPicture = {
  id: number
  url: string
  product: string // URL del producto, ej: https://publicapi.solotodo.com/products/123/
}

export type SolotodoProduct = {
  url: string
  id: number
  name: string
  slug: string
  category: string // URL de la categoría
  specs: Record<string, unknown>
  product_pictures: Array<{ url: string; id: number }> | null
}

export type SolotodoStore = {
  url: string
  id: number
  name: string
  slug: string
}

export type SolotodoActiveRegistry = {
  url: string
  id: number
  entity: string
  timestamp: string
  is_available: boolean
  normal_price: string
  offer_price: string | null
  cell_monthly_payment: number | null
}

export type SolotodoEntity = {
  url: string
  id: number
  product: string // URL
  store: string   // URL
  active_registry: SolotodoActiveRegistry | null
}

// ─── Cache en memoria ─────────────────────────────────────────────────────────

const _cache = new Map<string, { data: unknown; ts: number }>()
let _lastRequestAt = 0

// ─── Core fetch ───────────────────────────────────────────────────────────────

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function apiFetch<T>(path: string): Promise<T | null> {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`
  const now = Date.now()

  const cached = _cache.get(url)
  if (cached && now - cached.ts < CACHE_TTL) {
    return cached.data as T
  }

  const elapsed = now - _lastRequestAt
  if (elapsed < MIN_INTERVAL_MS) {
    await delay(MIN_INTERVAL_MS - elapsed)
  }

  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    _lastRequestAt = Date.now()
    if (!res.ok) return null
    const data = (await res.json()) as T
    _cache.set(url, { data, ts: Date.now() })
    return data
  } catch {
    return null
  }
}

// ─── API pública ──────────────────────────────────────────────────────────────

export async function getCategories(): Promise<SolotodoCategory[]> {
  const data = await apiFetch<{ results: SolotodoCategory[] }>(
    '/categories/?countries=1',
  )
  return data?.results ?? []
}

export async function searchProducts(
  query: string,
  solotodoCategoryId?: number,
): Promise<SolotodoProduct[]> {
  const params = new URLSearchParams({ search: query, page_size: '20' })
  if (solotodoCategoryId) params.set('categories', String(solotodoCategoryId))
  const data = await apiFetch<{ results: SolotodoProduct[] }>(
    `/products/?${params}`,
  )
  const products = data?.results ?? []
  if (products.length === 0) return products

  // Fetch imágenes en una sola llamada y mapear a cada producto
  const ids = products.map((p) => p.id).join(',')
  const picturesData = await apiFetch<{ results: SolotodoPicture[] }>(
    `/product_pictures/?products=${ids}`,
  )
  const pictures = picturesData?.results ?? []

  // Agrupar la primera imagen por product ID
  const pictureByProductId = new Map<number, string>()
  for (const pic of pictures) {
    const m = pic.product.match(/\/(\d+)\/?$/)
    if (!m) continue
    const productId = parseInt(m[1], 10)
    if (!pictureByProductId.has(productId)) {
      pictureByProductId.set(productId, pic.url)
    }
  }

  return products.map((p) => {
    const imageUrl = pictureByProductId.get(p.id)
    return {
      ...p,
      product_pictures: imageUrl
        ? [{ id: 0, url: imageUrl }]
        : p.product_pictures ?? null,
    }
  })
}

export async function getProduct(
  solotodoProductId: number,
): Promise<SolotodoProduct | null> {
  return apiFetch<SolotodoProduct>(`/products/${solotodoProductId}/`)
}

export async function getProductEntities(
  solotodoProductId: number,
): Promise<SolotodoEntity[]> {
  const data = await apiFetch<{ results: SolotodoEntity[] }>(
    `/entities/?products=${solotodoProductId}`,
  )
  return (data?.results ?? []).filter((e) => e.active_registry !== null)
}

export async function getStore(
  storeUrl: string,
): Promise<SolotodoStore | null> {
  return apiFetch<SolotodoStore>(storeUrl)
}

/** Extrae el ID numérico del final de una URL tipo .../stores/5/ */
export function extractIdFromUrl(url: string): number | null {
  const m = url.match(/\/(\d+)\/?$/)
  return m ? parseInt(m[1], 10) : null
}
