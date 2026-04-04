import { verifyAdmin } from '@/lib/admin-auth'
import { createServiceClient } from '@/lib/supabase/server'
import { getProduct, getProductEntities, getStore } from '@/lib/solotodo'
import { NextRequest, NextResponse } from 'next/server'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

/** Retorna el mejor precio disponible (offer_price si existe, si no normal_price) */
function bestPrice(registry: { normal_price: string; offer_price: string | null }): number {
  const raw = registry.offer_price ?? registry.normal_price
  return parseFloat(raw)
}

export async function POST(request: NextRequest) {
  const { error: authError } = await verifyAdmin()
  if (authError) return authError

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const input = body as Record<string, unknown>
  const solotodoProductId = Number(input.solotodoProductId)
  const categoryId = input.categoryId as string | undefined
  const nameOverride =
    typeof input.name === 'string' && input.name.trim()
      ? input.name.trim()
      : null

  if (!solotodoProductId || !categoryId) {
    return NextResponse.json(
      { error: 'solotodoProductId y categoryId son requeridos' },
      { status: 400 },
    )
  }

  const serviceClient = await createServiceClient()

  // Verificar duplicado
  const { data: existing } = await serviceClient
    .from('products')
    .select('id, slug')
    .eq('solotodo_id', solotodoProductId)
    .maybeSingle()

  if (existing) {
    return NextResponse.json(
      { error: 'Este producto ya fue importado', productId: existing.id },
      { status: 409 },
    )
  }

  // Obtener producto de SoloTodo
  const solotodoProduct = await getProduct(solotodoProductId)
  if (!solotodoProduct) {
    return NextResponse.json(
      { error: 'No se encontró el producto en SoloTodo' },
      { status: 404 },
    )
  }

  const name = nameOverride ?? solotodoProduct.name
  const slug = `${slugify(name)}-${solotodoProductId}`
  const specsObj = solotodoProduct.specs ?? {}
  const picturePath =
    typeof specsObj.picture === 'string' ? specsObj.picture : null
  const imageUrl = picturePath
    ? `https://media.solotodo.com/media/${picturePath}`
    : (solotodoProduct.product_pictures?.[0]?.url ?? null)

  // Insertar producto
  const { data: product, error: insertError } = await serviceClient
    .from('products')
    .insert({
      name,
      slug,
      category_id: categoryId,
      specs: solotodoProduct.specs ?? null,
      image_url: imageUrl,
      solotodo_id: solotodoProductId,
    })
    .select()
    .single()

  if (insertError) {
    console.error('[import-product] insert producto:', insertError)
    return NextResponse.json(
      { error: 'Error al insertar el producto' },
      { status: 500 },
    )
  }

  // Obtener entidades (precios) de SoloTodo
  const entities = await getProductEntities(solotodoProductId)

  if (entities.length === 0) {
    return NextResponse.json(product, { status: 201 })
  }

  // Cargar tiendas de nuestra DB para matching por nombre
  const { data: ourStores } = await serviceClient.from('stores').select('id, name')
  const ourStoreMap = new Map(
    (ourStores ?? []).map((s) => [normalizeName(s.name), s.id as string]),
  )

  const fetchedAt = new Date().toISOString()

  for (const entity of entities) {
    if (!entity.active_registry) continue

    const storeData = await getStore(entity.store)
    const storeName = storeData?.name ?? `Tienda SoloTodo #${entity.id}`
    const storeId = ourStoreMap.get(normalizeName(storeName)) ?? null
    const price = bestPrice(entity.active_registry)
    const url = entity.active_registry.url

    if (isNaN(price)) continue

    // price_history — siempre insertar aunque no haya match de tienda
    const { error: phError } = await serviceClient.from('price_history').insert({
      product_id: product.id,
      store_id: storeId,
      store_name: storeName,
      price,
      url,
      source: 'solotodo',
      fetched_at: fetchedAt,
    })
    if (phError) {
      console.error(`[import-product] price_history error (${storeName}):`, phError)
    }

    // product_sources
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

  return NextResponse.json(product, { status: 201 })
}
