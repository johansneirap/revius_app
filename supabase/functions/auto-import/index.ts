/**
 * auto-import — Supabase Edge Function
 *
 * Importa los productos más populares de SoloTodo que tienen precio activo
 * en tiendas chilenas. Estrategia: entities primero (is_available=true),
 * agrupa por producto, importa solo los que tienen precio real hoy.
 *
 * Invocar manualmente:
 *   curl -X POST https://<project-ref>.supabase.co/functions/v1/auto-import \
 *     -H "Content-Type: application/json" -d '{}'
 *
 * IDs verificados en: https://publicapi.solotodo.com/categories/
 *   1=Notebooks, 6=Celulares, 11=Televisores, 14=Tablets, 50=Audífonos y Headsets
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ─── Configuración ────────────────────────────────────────────────────────────

const SOLOTODO_BASE = 'https://publicapi.solotodo.com'
const MEDIA_BASE = 'https://media.solotodo.com/media/'
const MAX_NEW_PRODUCTS = 100
const PRODUCTS_PER_CATEGORY = 20
const MIN_INTERVAL_MS = 500

const CATEGORY_MAP = [
  { solotodoId: 6,  dbName: 'Celulares' },
  { solotodoId: 1,  dbName: 'Notebooks' },
  { solotodoId: 50, dbName: 'Audífonos y Headsets' },
  { solotodoId: 11, dbName: 'Televisores' },
  { solotodoId: 14, dbName: 'Tablets' },
] as const

// ─── Types ────────────────────────────────────────────────────────────────────

type ActiveRegistry = {
  url: string
  is_available: boolean
  normal_price: string
  offer_price: string | null
}

type EntityProduct = {
  url: string
  id: number
  name: string
}

type SolotodoEntity = {
  id: number
  name: string
  store: string           // URL, ej: https://publicapi.solotodo.com/stores/9/
  external_url: string
  picture_urls: string[]
  product: EntityProduct | null
  active_registry: ActiveRegistry | null
}

type SolotodoProductDetail = {
  id: number
  name: string
  specs: Record<string, unknown> | null
}

type CategorySummary = { imported: number; skipped: number; errors: number }

// ─── Rate limiting ────────────────────────────────────────────────────────────

let _lastRequestAt = 0

async function soloFetch<T>(path: string): Promise<T | null> {
  const url = path.startsWith('http') ? path : `${SOLOTODO_BASE}${path}`
  const now = Date.now()
  const wait = MIN_INTERVAL_MS - (now - _lastRequestAt)
  if (wait > 0) await new Promise((r) => setTimeout(r, wait))
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    _lastRequestAt = Date.now()
    if (!res.ok) {
      console.error(`[auto-import] ${res.status} ${url}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    _lastRequestAt = Date.now()
    console.error(`[auto-import] fetch error ${url}:`, err)
    return null
  }
}

function bestPrice(r: ActiveRegistry): number {
  return parseFloat(r.offer_price ?? r.normal_price)
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

// ─── Handler ──────────────────────────────────────────────────────────────────

Deno.serve(async (_req) => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(
      JSON.stringify({ error: 'SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configuradas' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey)

  const [{ data: ourCategories, error: catErr }, { data: ourStores, error: storeErr }] =
    await Promise.all([
      supabase.from('categories').select('id, name'),
      supabase.from('stores').select('id, name'),
    ])

  if (catErr) console.error('[auto-import] Error cargando categorías:', catErr.message)
  if (storeErr) console.error('[auto-import] Error cargando tiendas:', storeErr.message)

  const storeMap = new Map<string, string>(
    (ourStores ?? []).map((s) => [normalizeName(s.name), s.id as string]),
  )
  const storeNameCache = new Map<string, string>() // store URL → store name

  let imported = 0
  let skipped = 0
  let errors = 0
  const categorySummary: Record<string, CategorySummary> = {}

  for (const cat of CATEGORY_MAP) {
    if (imported >= MAX_NEW_PRODUCTS) break

    const catKey = `solotodo_${cat.solotodoId}`
    const summary: CategorySummary = { imported: 0, skipped: 0, errors: 0 }
    categorySummary[catKey] = summary

    // Buscar categoría en nuestra DB
    const ourCategory = (ourCategories ?? []).find(
      (c) => normalizeName(c.name) === normalizeName(cat.dbName),
    )
    if (!ourCategory) {
      console.error(`[auto-import] Sin categoría local para "${cat.dbName}"`)
      summary.errors++
      errors++
      continue
    }

    // ── Obtener entidades disponibles en Chile, ordenadas por popularidad ──────
    // Pedimos más (60) para tener margen de filtrar las de product=null
    const entitiesData = await soloFetch<{ results: SolotodoEntity[] }>(
      `/entities/?categories=${cat.solotodoId}&countries=1&is_available=true&page_size=60&ordering=-leads_0_7_days`,
    )
    if (!entitiesData) {
      console.error(`[auto-import] Fallo al traer entities para categoría ${cat.solotodoId}`)
      summary.errors++
      errors++
      continue
    }

    // ── Agrupar entities por producto (descartar las sin producto mapeado) ──────
    const productEntityMap = new Map<number, {
      product: EntityProduct
      entities: SolotodoEntity[]
    }>()

    for (const entity of entitiesData.results) {
      if (!entity.product || !entity.active_registry) continue
      const prodId = entity.product.id
      if (!productEntityMap.has(prodId)) {
        productEntityMap.set(prodId, { product: entity.product, entities: [] })
      }
      productEntityMap.get(prodId)!.entities.push(entity)
    }

    console.log(
      `[auto-import] Categoría ${cat.dbName}: ${productEntityMap.size} productos únicos con precio`,
    )

    let categoryCount = 0

    for (const [prodId, { product, entities }] of productEntityMap) {
      if (imported >= MAX_NEW_PRODUCTS) break
      if (categoryCount >= PRODUCTS_PER_CATEGORY) break

      try {
        // ── 1. Verificar duplicado ──────────────────────────────────────────
        const { data: existing } = await supabase
          .from('products')
          .select('id')
          .eq('solotodo_id', prodId)
          .maybeSingle()

        if (existing) {
          summary.skipped++
          skipped++
          continue
        }

        // ── 2. Obtener specs del producto (para image_url) ──────────────────
        const productDetail = await soloFetch<SolotodoProductDetail>(
          `/products/${prodId}/`,
        )
        const specs = productDetail?.specs ?? {}
        const picturePath = typeof specs.picture === 'string' ? specs.picture : null
        // Fallback: primera imagen disponible de las entities
        const entityImageUrl = entities[0]?.picture_urls?.[0] ?? null
        const imageUrl = picturePath ? `${MEDIA_BASE}${picturePath}` : entityImageUrl

        // ── 3. Insertar producto ────────────────────────────────────────────
        const { data: inserted, error: insertError } = await supabase
          .from('products')
          .insert({
            name: product.name,
            category_id: ourCategory.id,
            specs: Object.keys(specs).length > 0 ? specs : null,
            image_url: imageUrl,
            solotodo_id: prodId,
          })
          .select('id')
          .single()

        if (insertError || !inserted) {
          console.error(
            `[auto-import] Error insertando SoloTodo #${prodId}:`,
            insertError?.message,
          )
          summary.errors++
          errors++
          continue
        }

        // ── 4. Guardar precios desde entities ya disponibles ────────────────
        const fetchedAt = new Date().toISOString()
        let pricesInserted = 0

        for (const entity of entities) {
          const reg = entity.active_registry!
          const price = bestPrice(reg)
          if (isNaN(price) || price <= 0) continue

          // Nombre de tienda con cache
          let storeName = storeNameCache.get(entity.store)
          if (!storeName) {
            const storeData = await soloFetch<{ name: string }>(entity.store)
            storeName = storeData?.name ?? `Tienda SoloTodo #${entity.id}`
            storeNameCache.set(entity.store, storeName)
          }

          const storeId = storeMap.get(normalizeName(storeName)) ?? null
          const productUrl = entity.external_url || reg.url

          // price_history
          const { error: phErr } = await supabase.from('price_history').insert({
            product_id: inserted.id,
            store_id: storeId,
            store_name: storeName,
            price,
            url: productUrl,
            source: 'solotodo',
            fetched_at: fetchedAt,
          })
          if (phErr) {
            console.error(`[auto-import] price_history (${storeName}):`, phErr.message)
          }

          // product_sources (check + upsert manual)
          const { data: existingSource } = await supabase
            .from('product_sources')
            .select('id')
            .eq('product_id', inserted.id)
            .eq('store_name', storeName)
            .maybeSingle()

          if (existingSource) {
            await supabase
              .from('product_sources')
              .update({ price, url: productUrl, in_stock: reg.is_available, store_id: storeId })
              .eq('id', existingSource.id)
          } else {
            await supabase.from('product_sources').insert({
              product_id: inserted.id,
              store_id: storeId,
              store_name: storeName,
              price,
              currency: 'CLP',
              url: productUrl,
              in_stock: reg.is_available,
            })
          }
          pricesInserted++
        }

        console.log(
          `[auto-import] ✓ SoloTodo #${prodId} "${product.name}" → ${pricesInserted} tiendas`,
        )

        await new Promise((r) => setTimeout(r, MIN_INTERVAL_MS))

        summary.imported++
        imported++
        categoryCount++
      } catch (err) {
        console.error(`[auto-import] Error inesperado SoloTodo #${prodId}:`, err)
        summary.errors++
        errors++
      }
    }
  }

  const result = { imported, skipped, errors, categories: categorySummary }
  console.log('[auto-import] Finalizado:', JSON.stringify(result))

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  })
})
