import Link from 'next/link'
import Logo from '@/components/Logo'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import NavUser from '@/components/ui/NavUser'
import NavSearch, { SearchMobileTrigger } from '@/components/ui/NavSearch'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `"${q}" — Búsqueda | Revius` : 'Buscar productos | Revius',
  }
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q: rawQ } = await searchParams
  const q = rawQ?.trim() ?? ''
  const hasQuery = q.length >= 2

  let results: SearchResult[] = []

  if (hasQuery) {
    const safe = q.replace(/[%_,]/g, (c) => `\\${c}`)
    const supabase = await createClient()

    const { data: productsRaw } = await supabase
      .from('products_with_category')
      .select('id, name, brand, slug, image_url, avg_score, category_name')
      .or(`name.ilike.%${safe}%,brand.ilike.%${safe}%`)
      .order('avg_score', { ascending: false, nullsFirst: false })
      .limit(40)

    const products = productsRaw ?? []

    if (products.length > 0) {
      const ids = products.map((p) => p.id)
      const { data: pricesRaw } = await supabase
        .from('product_sources')
        .select('product_id, price')
        .in('product_id', ids)
        .gt('price', 0)
        .order('price', { ascending: true })

      const minPriceMap: Record<string, number> = {}
      for (const row of (pricesRaw ?? []) as { product_id: string; price: number }[]) {
        if (!(row.product_id in minPriceMap)) {
          minPriceMap[row.product_id] = row.price
        }
      }

      results = products.map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand ?? null,
        slug: p.slug,
        image_url: p.image_url ?? null,
        avg_score: p.avg_score ?? null,
        category_name: (p as Record<string, unknown>).category_name as string | null ?? null,
        min_price: minPriceMap[p.id] ?? null,
      }))
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100">
      {/* Navbar */}
      <nav className="dark:bg-background-dark/80 border-primary/10 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            <Logo />
            <div className="lg:min-w-0 lg:flex-1">
              <NavSearch initialQuery={q || undefined} />
            </div>
            <div className="flex items-center gap-2">
              <SearchMobileTrigger />
              <DarkModeToggle />
              <NavUser />
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb + header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span className="material-icons text-[10px]">chevron_right</span>
            <span>Búsqueda</span>
            {q && (
              <>
                <span className="material-icons text-[10px]">chevron_right</span>
                <span className="truncate text-slate-900 dark:text-slate-300">
                  &ldquo;{q}&rdquo;
                </span>
              </>
            )}
          </div>

          {hasQuery ? (
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-black">
                {results.length > 0 ? (
                  <>
                    {results.length} resultado{results.length !== 1 ? 's' : ''} para{' '}
                    <span className="text-primary">&ldquo;{q}&rdquo;</span>
                  </>
                ) : (
                  <>Sin resultados para <span className="text-primary">&ldquo;{q}&rdquo;</span></>
                )}
              </h1>
            </div>
          ) : (
            <h1 className="text-2xl font-black">Buscar productos</h1>
          )}
        </div>

        {/* Estado vacío — sin query */}
        {!hasQuery && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="material-icons text-5xl text-slate-300">search</span>
            <p className="text-lg font-semibold text-slate-500">
              Escribe en la barra de búsqueda para encontrar productos
            </p>
            <p className="text-sm text-slate-400">
              Puedes buscar por nombre de producto o marca
            </p>
          </div>
        )}

        {/* Estado vacío — sin resultados */}
        {hasQuery && results.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="material-icons text-5xl text-slate-300">search_off</span>
            <p className="text-lg font-semibold text-slate-500">
              No encontramos nada para &ldquo;{q}&rdquo;
            </p>
            <p className="text-sm text-slate-400">
              Intenta con términos más generales o revisa la ortografía
            </p>
            <Link
              href="/"
              className="bg-primary mt-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              Ver productos destacados
            </Link>
          </div>
        )}

        {/* Grid de resultados */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                className="group border-primary/5 flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md dark:bg-slate-900"
              >
                {/* Imagen */}
                <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="material-icons text-4xl text-slate-300">
                        image_not_supported
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-4">
                  {product.category_name && (
                    <p className="mb-1 text-[11px] font-medium text-slate-400">
                      {product.category_name}
                    </p>
                  )}
                  <h2 className="group-hover:text-primary mb-2 flex-1 text-sm font-semibold leading-snug text-slate-900 transition-colors dark:text-slate-100 line-clamp-2">
                    {product.name}
                  </h2>

                  <div className="mt-auto flex items-center justify-between">
                    {product.avg_score !== null && (
                      <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                        <span className="material-icons text-[12px]">star</span>
                        {product.avg_score.toFixed(1)}
                      </div>
                    )}
                    {product.min_price !== null ? (
                      <p className="text-primary font-bold">
                        {formatCLP(product.min_price)}
                      </p>
                    ) : (
                      <span className="text-xs text-slate-400">Sin precio</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
