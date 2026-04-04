import { verifyAdmin } from '@/lib/admin-auth'
import { createServiceClient } from '@/lib/supabase/server'
import { getProductEntities, getStore, delay } from '@/lib/solotodo'
import { NextRequest, NextResponse } from 'next/server'

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export async function POST(request: NextRequest) {
  const { error: authError } = await verifyAdmin()
  if (authError) return authError

  let body: { productId?: string } = {}
  try {
    body = await request.json()
  } catch {
    // body vacío: refrescar todos
  }

  const serviceClient = await createServiceClient()

  let productsQuery = serviceClient
    .from('products')
    .select('id, name, solotodo_id')
    .not('solotodo_id', 'is', null)

  if (body.productId) {
    productsQuery = productsQuery.eq('id', body.productId)
  }

  const { data: products, error: productsError } = await productsQuery

  if (productsError) {
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 },
    )
  }

  const { data: ourStores } = await serviceClient
    .from('stores')
    .select('id, name')

  const ourStoreMap = new Map(
    (ourStores ?? []).map((s) => [normalizeName(s.name), s.id as string]),
  )

  let updated = 0
  let errors = 0

  for (const product of products ?? []) {
    try {
      const entities = await getProductEntities(product.solotodo_id)
      const fetchedAt = new Date().toISOString()

      for (const entity of entities) {
        if (!entity.active_registry) continue

        const storeData = await getStore(entity.store)
        const storeName = storeData?.name ?? `Tienda SoloTodo #${entity.id}`
        const storeId = ourStoreMap.get(normalizeName(storeName)) ?? null
        const price = parseFloat(
          entity.active_registry.offer_price ?? entity.active_registry.normal_price,
        )
        const url = entity.active_registry.url

        if (isNaN(price)) continue

        // Registrar en price_history
        await serviceClient.from('price_history').insert({
          product_id: product.id,
          store_id: storeId,
          store_name: storeName,
          price,
          url,
          source: 'solotodo',
          fetched_at: fetchedAt,
        })

        // Actualizar product_sources
        const { data: existingSource } = await serviceClient
          .from('product_sources')
          .select('id')
          .eq('product_id', product.id)
          .eq('store_name', storeName)
          .maybeSingle()

        if (existingSource) {
          await serviceClient
            .from('product_sources')
            .update({ price, url, in_stock: entity.active_registry.is_available, store_id: storeId })
            .eq('id', existingSource.id)
        } else {
          await serviceClient.from('product_sources').insert({
            product_id: product.id,
            store_id: storeId,
            store_name: storeName,
            price,
            currency: 'CLP',
            url,
            in_stock: entity.active_registry.is_available,
          })
        }
      }

      updated++
    } catch (err) {
      console.error(`[refresh-prices] error en producto ${product.id}:`, err)
      errors++
    }

    // Pausa adicional entre productos
    await delay(500)
  }

  return NextResponse.json({ updated, errors, total: (products ?? []).length })
}
