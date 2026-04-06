import { notFound } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import NavUser from '@/components/ui/NavUser'
import NavSearch, { SearchMobileTrigger } from '@/components/ui/NavSearch'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

type Product = {
  id: string
  name: string
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
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: cat } = await supabase
    .from('categories')
    .select('name')
    .eq('slug', slug)
    .maybeSingle()

  const name = cat?.name ?? 'Categoría'
  return {
    title: `${name} | Revius`,
    description: `Explora los mejores productos de ${name} con reviews verificadas en Revius.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  // Buscar categoría por slug
  const { data: category } = await supabase
    .from('categories')
    .select('id, name, slug, parent_id')
    .eq('slug', slug)
    .maybeSingle()

  if (!category) notFound()

  // Obtener subcategorías (si es categoría padre)
  const { data: subcategories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('parent_id', category.id)
    .order('name')

  const hasChildren = (subcategories ?? []).length > 0

  // IDs de categorías a incluir: la propia + todas sus hijas
  const categoryIds = [
    category.id,
    ...(subcategories ?? []).map((s) => s.id),
  ]

  // Buscar productos de esas categorías
  const { data: productsRaw } = await supabase
    .from('products_with_category')
    .select('id, name, slug, image_url, avg_score, category_name')
    .in('category_id', categoryIds)
    .order('avg_score', { ascending: false, nullsFirst: false })
    .limit(80)

  const products = productsRaw ?? []

  // Precios mínimos en una sola query
  const minPriceMap: Record<string, number> = {}
  if (products.length > 0) {
    const ids = products.map((p) => p.id)
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

  const enriched: Product[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    image_url: p.image_url ?? null,
    avg_score: p.avg_score ?? null,
    category_name: (p as Record<string, unknown>).category_name as string | null ?? null,
    min_price: minPriceMap[p.id] ?? null,
  }))

  // Categoría padre para breadcrumb
  const { data: parentCategory } = category.parent_id
    ? await supabase
        .from('categories')
        .select('name, slug')
        .eq('id', category.parent_id)
        .maybeSingle()
    : { data: null }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100">
      {/* Navbar */}
      <nav className="dark:bg-background-dark/80 border-primary/10 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            <Logo />
            <div className="lg:min-w-0 lg:flex-1 lg:max-w-lg">
              <NavSearch />
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
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <span className="material-icons text-[10px]">chevron_right</span>
          {parentCategory ? (
            <>
              <Link
                href={`/categoria/${parentCategory.slug}`}
                className="hover:text-primary transition-colors"
              >
                {parentCategory.name}
              </Link>
              <span className="material-icons text-[10px]">chevron_right</span>
              <span className="text-slate-900 dark:text-slate-300">{category.name}</span>
            </>
          ) : (
            <span className="text-slate-900 dark:text-slate-300">{category.name}</span>
          )}
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black">{category.name}</h1>
          {products.length > 0 && (
            <p className="mt-1 text-sm text-slate-500">
              {products.length} producto{products.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Subcategorías (si es padre) */}
        {hasChildren && (
          <div className="mb-8 flex flex-wrap gap-2">
            {(subcategories ?? []).map((sub) => (
              <Link
                key={sub.id}
                href={`/categoria/${sub.slug}`}
                className="hover:bg-primary hover:border-primary rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-white dark:border-slate-700 dark:text-slate-300"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {enriched.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="material-icons text-5xl text-slate-300">inventory_2</span>
            <p className="text-lg font-semibold text-slate-500">
              Aún no hay productos en esta categoría
            </p>
            <p className="text-sm text-slate-400">
              Estamos trabajando para traer los mejores productos
            </p>
            <Link
              href="/"
              className="bg-primary mt-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              Ver productos destacados
            </Link>
          </div>
        )}

        {/* Grid de productos */}
        {enriched.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {enriched.map((product) => (
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
                  <h2 className="group-hover:text-primary mb-2 flex-1 text-sm font-semibold leading-snug text-slate-900 line-clamp-2 transition-colors dark:text-slate-100">
                    {product.name}
                  </h2>
                  <div className="mt-auto flex items-center justify-between">
                    {product.avg_score !== null ? (
                      <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                        <span className="material-icons text-[12px]">star</span>
                        {product.avg_score.toFixed(1)}
                      </div>
                    ) : (
                      <span />
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
