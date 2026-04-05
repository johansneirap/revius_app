import { notFound } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import ReviewList from '@/components/reviews/ReviewList'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import NavUser from '@/components/ui/NavUser'
import NavSearch, { SearchMobileTrigger } from '@/components/ui/NavSearch'
import { createClient } from '@/lib/supabase/server'
import type { ProductReviewFull } from '@/components/reviews/ReviewCard'

const STORE_COLORS = [
  'bg-blue-600',
  'bg-green-600',
  'bg-yellow-400',
  'bg-orange-500',
  'bg-purple-600',
  'bg-red-500',
]

const STOCK_LABELS: Record<string, string> = {
  in_stock: 'En stock',
  low_stock: 'Pocos disponibles',
  out_of_stock: 'Sin stock',
  pre_order: 'Preventa',
}

type Spec = { label: string; value: string }

type ProductSource = {
  id: string
  store_name: string
  price: number
  original_price: number | null
  currency: string
  in_stock: boolean
  shipping_info: string | null
  url: string | null
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products_with_category')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product) notFound()

const [{ data: reviewsRaw }, { data: sourcesRaw }] = await Promise.all([
    supabase
      .from('product_reviews_full')
      .select('*')
      .eq('product_id', product.id)
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('product_sources')
      .select('id, store_name, price, original_price, currency, in_stock, shipping_info, url')
      .eq('product_id', product.id)
      .gt('price', 0)
      .order('price', { ascending: true }),
  ])

  const reviews = (reviewsRaw ?? []) as ProductReviewFull[]
  const sources = (sourcesRaw ?? []) as unknown as ProductSource[]
  const specs: Spec[] = Array.isArray(product.specs) ? (product.specs as Spec[]) : []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = product as any
  const avgScore: number = p.avg_score ?? p.rating ?? 0
  const reviewCount: number = p.review_count ?? p.reviewCount ?? 0

  function formatCLP(price: number) {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Distribución de ratings calculada desde las reviews obtenidas
  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }))

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen text-slate-900 transition-colors dark:text-slate-100">
      {/* Nav Bar */}
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
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 text-xs font-medium whitespace-nowrap text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <span className="material-icons text-[10px]">chevron_right</span>
          {p.parent_name && p.parent_slug && (
            <>
              <Link
                href={`/categoria/${p.parent_slug}`}
                className="hover:text-primary transition-colors"
              >
                {p.parent_name}
              </Link>
              <span className="material-icons text-[10px]">chevron_right</span>
            </>
          )}
          {p.category_name && p.category_slug && (
            <>
              <Link
                href={`/categoria/${p.category_slug}`}
                className="hover:text-primary transition-colors"
              >
                {p.category_name}
              </Link>
              <span className="material-icons text-[10px]">chevron_right</span>
            </>
          )}
          <span className="truncate text-slate-900 dark:text-slate-300">
            {product.name}
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Visuals */}
          <div className="space-y-6 lg:col-span-7">
            <div className="group relative aspect-square overflow-hidden rounded-3xl bg-gray-50 shadow-2xl dark:bg-gray-900">
              {p.image_url ? (
                <img
                  src={p.image_url as string}
                  alt={product.name as string}
                  className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-icons text-6xl text-slate-300 dark:text-slate-600">
                    image_not_supported
                  </span>
                </div>
              )}
              {p.badge_editorial && (
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  <span className="bg-primary rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg">
                    {p.badge_editorial}
                  </span>
                </div>
              )}
              <button className="absolute right-6 bottom-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 dark:bg-slate-900/90">
                <span className="material-icons text-rose-500">
                  favorite_border
                </span>
              </button>
            </div>

            {/* Description & Specs */}
            <div className="border-primary/5 rounded-3xl border bg-white p-8 dark:bg-slate-900/50">
              <h3 className="mb-6 text-xl font-bold">Descripción del Producto</h3>
              <p className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
                {(product.description as string) ?? 'Sin descripción disponible.'}
              </p>
              {specs.length > 0 && (
                <>
                  <h3 className="mb-6 text-xl font-bold">
                    Especificaciones Técnicas
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {specs.map((spec, i) => (
                      <div
                        key={i}
                        className="border-primary/5 flex flex-col rounded-2xl border bg-slate-50 p-4 dark:bg-slate-800/50"
                      >
                        <span className="mb-1 text-xs text-slate-500">
                          {spec.label}
                        </span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Comparison & Buy */}
          <div className="space-y-8 lg:col-span-5">
            <div className="border-primary/5 sticky top-24 rounded-3xl border bg-white p-8 shadow-xl dark:bg-slate-900">
              <h1 className="mb-4 text-3xl leading-tight font-black">
                {product.name as string}
              </h1>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  <span className="material-icons text-sm">star</span>
                  {avgScore > 0 ? avgScore.toFixed(1) : '—'}
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {reviewCount} reseñas verificadas
                </span>
              </div>

              <div className="mb-8 space-y-4">
                <div className="px-1 text-xs font-bold tracking-widest text-slate-400 uppercase">
                  Comparación de Precios
                </div>
                {sources.length === 0 ? (
                  <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-400 dark:bg-slate-800/50">
                    Sin fuentes de precio disponibles.
                  </p>
                ) : (
                  sources.map((source, i) => {
                    const storeName = source.store_name
                    const storeLetter = storeName.charAt(0).toUpperCase()
                    const storeColor = STORE_COLORS[i % STORE_COLORS.length]
                    const stockLabel = source.in_stock
                      ? (source.shipping_info ?? 'En stock')
                      : 'Sin stock'

                    return (
                      <div
                        key={source.id}
                        className="group hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/20 flex items-center justify-between rounded-2xl border border-transparent bg-slate-50 p-4 transition-all dark:bg-slate-800/50"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`h-10 w-10 ${storeColor} flex items-center justify-center rounded-xl text-xs font-black text-white shadow-lg`}
                          >
                            {storeLetter}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">
                              {storeName}
                            </div>
                            <div className="text-[10px] font-medium text-slate-500">
                              {stockLabel}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-primary text-lg font-black">
                              ${source.price.toLocaleString('es-CL')}
                            </div>
                          </div>
                          {source.url ? (
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-primary shadow-primary/20 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                            >
                              <span className="material-icons text-sm">
                                shopping_cart
                              </span>
                            </a>
                          ) : (
                            <span className="bg-primary flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl text-white opacity-50">
                              <span className="material-icons text-sm">
                                shopping_cart
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              <button className="bg-primary shadow-primary/30 hover:bg-primary/90 group flex w-full transform items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-xl transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95">
                <span className="material-icons">local_offer</span>
                Obtener mejor oferta
                <span className="material-icons text-sm transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
              <p className="mt-4 text-center text-[10px] leading-relaxed text-slate-400">
                Al comprar a través de nuestros enlaces de afiliados, Revius
                podría recibir una pequeña comisión para seguir mejorando.{' '}
                <span className="cursor-help underline">Saber más</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Compara precios */}
        {sources.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <span className="material-icons text-primary text-2xl">
                price_check
              </span>
              <h2 className="text-2xl font-black">Compara precios</h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {sources.length} tienda{sources.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
              {sources.map((source, i) => {
                const isBest = i === 0
                const storeLetter = (source.store_name ?? '?').charAt(0).toUpperCase()
                const storeColor = STORE_COLORS[i % STORE_COLORS.length]

                return (
                  <div
                    key={source.id}
                    className={`flex items-center justify-between gap-4 px-6 py-4 ${
                      i < sources.length - 1
                        ? 'border-b border-slate-100 dark:border-slate-800'
                        : ''
                    } ${isBest ? 'bg-emerald-50/60 dark:bg-emerald-900/10' : ''}`}
                  >
                    {/* Tienda */}
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <div
                        className={`${storeColor} flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-black text-white`}
                      >
                        {storeLetter}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {source.store_name}
                          </span>
                          {isBest && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                              <span className="material-icons text-[10px]">
                                workspace_premium
                              </span>
                              Mejor precio
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2">
                          {source.in_stock ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                              <span className="material-icons text-[11px]">
                                check_circle
                              </span>
                              En stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                              <span className="material-icons text-[11px]">
                                cancel
                              </span>
                              Sin stock
                            </span>
                          )}
                          {source.shipping_info && (
                            <>
                              <span className="text-slate-300 dark:text-slate-700">·</span>
                              <span className="text-[11px] text-slate-500">
                                {source.shipping_info}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Precio + CTA */}
                    <div className="flex flex-shrink-0 items-center gap-4">
                      <div className="text-right">
                        <div
                          className={`text-lg font-black ${
                            isBest
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {formatCLP(source.price)}
                        </div>
                        {source.original_price &&
                          source.original_price > source.price && (
                            <div className="text-[11px] text-slate-400 line-through">
                              {formatCLP(source.original_price)}
                            </div>
                          )}
                      </div>
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 ${
                            isBest
                              ? 'bg-emerald-600 shadow-emerald-200 shadow-lg hover:bg-emerald-700 dark:shadow-none'
                              : 'bg-primary shadow-primary/20 shadow-lg hover:bg-primary/90'
                          }`}
                        >
                          Ver oferta
                          <span className="material-icons text-[14px]">
                            open_in_new
                          </span>
                        </a>
                      ) : (
                        <span className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-400 dark:bg-slate-800">
                          Ver oferta
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <section className="mt-24">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 text-3xl font-black">
                Reseñas de la Comunidad
              </h2>
              <p className="text-slate-500">
                Lo que dicen los usuarios reales sobre este producto en Chile.
              </p>
            </div>
            <Link
              href={`/producto/${slug}/review`}
              className="border-primary/20 hover:bg-primary/5 flex items-center gap-2 rounded-2xl border bg-white px-6 py-3 font-bold transition-all dark:bg-slate-900"
            >
              <span className="material-icons text-primary">rate_review</span>
              Escribir una Reseña
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Rating Breakdown */}
            <div className="space-y-6">
              <div className="border-primary/10 sticky top-24 rounded-3xl border bg-white p-8 dark:bg-slate-900">
                <div className="mb-8 text-center">
                  <div className="mb-2 text-6xl font-black text-slate-900 dark:text-white">
                    {avgScore > 0 ? avgScore.toFixed(1) : '—'}
                  </div>
                  <div className="mb-2 flex justify-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-icons">
                        star
                      </span>
                    ))}
                  </div>
                  <div className="text-sm font-medium text-slate-500">
                    Basado en {reviewCount} reseñas
                  </div>
                </div>
                <div className="space-y-3">
                  {ratingCounts.map(({ stars, count }) => {
                    const pct =
                      reviews.length > 0
                        ? (count / reviews.length) * 100
                        : 0
                    return (
                      <div
                        key={stars}
                        className="group flex cursor-pointer items-center gap-4"
                      >
                        <div className="flex w-8 items-center gap-1">
                          <span className="text-xs font-bold text-slate-500">
                            {stars}
                          </span>
                          <span className="material-icons text-[10px] text-amber-400">
                            star
                          </span>
                        </div>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className="bg-primary group-hover:bg-primary/80 h-full rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                        <span className="w-8 text-[10px] font-bold text-slate-400">
                          {count}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Review List */}
            <div className="lg:col-span-2">
              <ReviewList reviews={reviews} />
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-primary/10 mt-24 border-t bg-white pt-16 pb-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            <div className="flex gap-6">
              <span className="material-icons hover:text-primary cursor-pointer text-slate-400">
                facebook
              </span>
              <span className="material-icons hover:text-primary cursor-pointer text-slate-400">
                alternate_email
              </span>
              <span className="material-icons hover:text-primary cursor-pointer text-slate-400">
                camera_alt
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs font-medium text-slate-500 md:flex-row dark:border-slate-900">
            <div>© 2026 Revius.cl - Todos los derechos reservados.</div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                Términos
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
