import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim() ?? ''

  if (q.length < 2) {
    return NextResponse.json({ error: 'q debe tener al menos 2 caracteres' }, { status: 400 })
  }

  // Escapar caracteres especiales de ILIKE para evitar inyección PostgREST
  const safe = q.replace(/[%_,]/g, (c) => `\\${c}`)

  const supabase = await createClient()

  const { data: productsRaw } = await supabase
    .from('products_with_category')
    .select('id, name, brand, slug, image_url, avg_score, category_name')
    .or(`name.ilike.%${safe}%,brand.ilike.%${safe}%`)
    .order('avg_score', { ascending: false, nullsFirst: false })
    .limit(8)

  const products = productsRaw ?? []

  // Precio mínimo en una sola query
  const ids = products.map((p) => p.id)
  const minPriceMap: Record<string, number> = {}

  if (ids.length > 0) {
    const { data: pricesRaw } = await supabase
      .from('product_sources')
      .select('product_id, price')
      .in('product_id', ids)
      .gt('price', 0)
      .order('price', { ascending: true })

    for (const row of (pricesRaw ?? []) as { product_id: string; price: number }[]) {
      if (!(row.product_id in minPriceMap)) {
        minPriceMap[row.product_id] = row.price
      }
    }
  }

  const results = products.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand ?? null,
    slug: p.slug,
    image_url: p.image_url ?? null,
    avg_score: p.avg_score ?? null,
    category_name: (p as Record<string, unknown>).category_name as string | null ?? null,
    min_price: minPriceMap[p.id] ?? null,
  }))

  return NextResponse.json(results)
}
