import { verifyAdmin } from '@/lib/admin-auth'
import { createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { error } = await verifyAdmin()
  if (error) return error

  const serviceClient = await createServiceClient()

  const { data: products, error: dbError } = await serviceClient
    .from('products')
    .select('id, name, slug, solotodo_id, product_sources(price, currency, store_name)')
    .not('solotodo_id', 'is', null)
    .order('name')

  if (dbError) {
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 })
  }

  // Última actualización de precios por producto
  const productIds = (products ?? []).map((p) => p.id)
  const lastFetchedMap: Record<string, string> = {}

  if (productIds.length > 0) {
    const { data: history } = await serviceClient
      .from('price_history')
      .select('product_id, fetched_at')
      .in('product_id', productIds)
      .order('fetched_at', { ascending: false })

    for (const row of history ?? []) {
      if (!lastFetchedMap[row.product_id]) {
        lastFetchedMap[row.product_id] = row.fetched_at
      }
    }
  }

  const enriched = (products ?? []).map((p) => {
    const sources = (p.product_sources ?? []) as Array<{ price: number | null }>
    const prices = sources.map((s) => s.price).filter((v): v is number => v !== null)
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      solotodo_id: p.solotodo_id,
      min_price: prices.length ? Math.min(...prices) : null,
      last_fetched: lastFetchedMap[p.id] ?? null,
    }
  })

  return NextResponse.json(enriched)
}
