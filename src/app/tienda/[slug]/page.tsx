import { notFound } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import NavUser from '@/components/ui/NavUser'
import { createClient } from '@/lib/supabase/server'

// ─── Types ────────────────────────────────────────────────────────────────────

type Store = {
  id: string
  name: string
  slug: string
  logo_url: string | null
  is_verified: boolean
  avg_score: number | null
  review_count: number | null
  website_url: string | null
  description: string | null
  avg_shipping_speed: number | null
  avg_support: number | null
  avg_packaging: number | null
  avg_response_hours: number | null
  return_rate: number | null
}

type ProductSource = {
  id: string
  price: number | null
  original_price: number | null
  currency: string | null
  in_stock: boolean
  shipping_info: string | null
  url: string | null
  products: {
    id: string
    name: string
    slug: string
    image_url: string | null
    avg_score: number | null
  } | null
}

type StoreReview = {
  id: string
  store_id: string
  rating_overall: number
  body: string | null
  is_verified_purchase: boolean
  created_at: string
  author_name: string | null
  author_avatar: string | null
  author_level: string | null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatReviewCount(n: number | null): string {
  if (!n) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k+`
  return String(n)
}

function formatResponseTime(hours: number | null): string {
  if (hours === null) return 'N/A'
  if (hours < 1) return '< 1 Hora'
  if (hours < 2) return '~1 Hora'
  return `~${Math.round(hours)} Horas`
}

function formatReturnRate(rate: number | null): string {
  if (rate === null) return 'N/A'
  return `${rate.toFixed(1)}%`
}

function formatRelativeDate(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Hoy'
  if (days === 1) return 'Hace 1 día'
  if (days < 7) return `Hace ${days} días`
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`
  return `Hace ${Math.floor(days / 30)} meses`
}

function scoreToPercent(score: number | null): number {
  if (!score) return 0
  return Math.round((score / 5) * 100)
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> }

export default async function TiendaPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  // Step 1: fetch store by slug
  const { data: storeData } = await supabase
    .from('stores')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!storeData) notFound()

  const store = storeData as unknown as Store

  // Step 2: parallel queries using real store.id
  const [{ data: sourcesData }, { data: reviewsData }] = await Promise.all([
    supabase
      .from('product_sources')
      .select(
        'id, price, original_price, currency, in_stock, shipping_info, url, products(id, name, slug, image_url, avg_score)',
      )
      .eq('store_id', store.id)
      .eq('in_stock', true)
      .order('price', { ascending: true })
      .limit(10),
    supabase
      .from('store_reviews_full')
      .select('*')
      .eq('store_id', store.id)
      .order('created_at', { ascending: false })
      .limit(10),
  ])

  const productSources = (sourcesData ?? []) as unknown as ProductSource[]
  const storeReviews = (reviewsData ?? []) as unknown as StoreReview[]

  const reputation = [
    {
      label: 'Velocidad de Envío',
      score: store.avg_shipping_speed,
      percentage: scoreToPercent(store.avg_shipping_speed),
      color: 'bg-emerald-500',
    },
    {
      label: 'Soporte al Cliente',
      score: store.avg_support,
      percentage: scoreToPercent(store.avg_support),
      color: 'bg-primary',
    },
    {
      label: 'Calidad de Empaque',
      score: store.avg_packaging,
      percentage: scoreToPercent(store.avg_packaging),
      color: 'bg-primary',
    },
  ]

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen text-slate-900 transition-colors dark:text-slate-100">
      {/* Nav Bar */}
      <nav className="dark:bg-background-dark/80 border-primary/10 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <div className="mx-8 hidden max-w-md flex-1 md:block">
              <div className="group relative">
                <span className="material-icons group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 transition-colors">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Buscar productos en esta tienda..."
                  className="focus:border-primary/30 w-full rounded-full border-2 border-transparent bg-slate-100 py-2 pr-4 pl-10 text-sm transition-all outline-none focus:bg-white dark:bg-slate-800 dark:focus:bg-slate-900"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <DarkModeToggle />
              <NavUser />
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Store Hero */}
        <section className="animate-in fade-in slide-in-from-top-4 mb-12 duration-700">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-8">
              <div className="border-primary/10 group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border bg-white p-3 shadow-xl dark:bg-slate-800">
                {store.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={store.logo_url}
                    alt={store.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full rounded-lg transition-transform group-hover:scale-110"
                  />
                ) : (
                  <span className="material-icons text-5xl text-slate-300">
                    storefront
                  </span>
                )}
              </div>
              <div className="pt-2">
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-4xl font-black tracking-tight">
                    {store.name}
                  </h1>
                  {store.is_verified && (
                    <span
                      className="material-icons text-primary text-2xl"
                      title="Tienda Verificada Revius"
                    >
                      verified
                    </span>
                  )}
                </div>
                {store.description && (
                  <p className="flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400">
                    <span className="material-icons text-primary text-base">
                      location_on
                    </span>
                    {store.description}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-6">
                  <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 font-black text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    <span className="material-symbols-outlined fill-1 text-lg">
                      star
                    </span>
                    {store.avg_score?.toFixed(1) ?? '—'}
                  </div>
                  <span className="text-sm font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                    {formatReviewCount(store.review_count)} Reseñas Verificadas
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="border-primary/10 hover:bg-primary/5 dark:hover:bg-primary/10 flex flex-1 items-center justify-center gap-3 rounded-2xl border bg-white px-8 py-4 font-bold text-slate-700 shadow-lg transition-all active:scale-95 md:flex-none dark:bg-slate-800 dark:text-slate-200">
                <span className="material-icons text-lg">share</span> Compartir
              </button>
              {store.website_url ? (
                <a
                  href={store.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary/90 shadow-primary/30 flex flex-1 items-center justify-center gap-3 rounded-2xl px-8 py-4 font-black text-white shadow-xl transition-all active:scale-95 md:flex-none"
                >
                  Ver Sitio Web{' '}
                  <span className="material-icons text-lg">open_in_new</span>
                </a>
              ) : (
                <button
                  disabled
                  className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-slate-200 px-8 py-4 font-black text-slate-400 md:flex-none dark:bg-slate-800 dark:text-slate-600"
                >
                  Ver Sitio Web{' '}
                  <span className="material-icons text-lg">open_in_new</span>
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Reputation */}
          <aside className="space-y-8 lg:col-span-4">
            <div className="border-primary/5 rounded-3xl border bg-white p-8 shadow-xl dark:bg-slate-900">
              <h2 className="mb-8 flex items-center gap-3 text-xl font-black">
                <span className="material-symbols-outlined text-primary">
                  analytics
                </span>
                Reputación Revius
              </h2>
              <div className="space-y-8">
                {reputation.map((item) => (
                  <div key={item.label}>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                        {item.label}
                      </span>
                      <span className="text-sm font-black text-slate-900 tabular-nums dark:text-white">
                        {item.score !== null
                          ? `${item.score.toFixed(1)}/5`
                          : 'Sin datos'}
                      </span>
                    </div>
                    {item.score !== null ? (
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className={`${item.color} h-full rounded-full transition-all duration-1000`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    ) : (
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" />
                    )}
                  </div>
                ))}
              </div>
              <div className="border-primary/10 mt-10 border-t pt-8">
                <div className="flex items-center gap-4">
                  <div className="flex-1 text-center">
                    <p className="mb-1 text-[10px] font-black tracking-widest text-slate-500 uppercase">
                      Tiempo Resp.
                    </p>
                    <p className="text-primary text-lg font-black">
                      {formatResponseTime(store.avg_response_hours)}
                    </p>
                  </div>
                  <div className="bg-primary/10 h-10 w-px" />
                  <div className="flex-1 text-center">
                    <p className="mb-1 text-[10px] font-black tracking-widest text-slate-500 uppercase">
                      Tasa Devolución
                    </p>
                    <p className="text-lg font-black text-emerald-500">
                      {formatReturnRate(store.return_rate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Products & Reviews */}
          <div className="space-y-12 lg:col-span-8">
            {/* Tabs */}
            <div className="border-primary/10 flex border-b">
              <button className="text-primary border-primary border-b-4 px-8 py-5 text-sm font-black tracking-widest uppercase">
                Ofertas ({productSources.length})
              </button>
              <button className="px-8 py-5 text-sm font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-slate-900 dark:hover:text-white">
                Reseñas ({formatReviewCount(store.review_count)})
              </button>
              <button className="px-8 py-5 text-sm font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-slate-900 dark:hover:text-white">
                Información
              </button>
            </div>

            {/* Deals */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black">
                  Mejores Ofertas en {store.name}
                </h2>
                <select className="border-primary/10 focus:border-primary rounded-xl border-2 bg-white px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all outline-none dark:bg-slate-900">
                  <option>Menor Precio</option>
                  <option>Más Popular</option>
                </select>
              </div>

              {productSources.length === 0 ? (
                <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center dark:border-slate-800 dark:bg-slate-900/40">
                  <span className="material-symbols-outlined mb-4 block text-4xl text-slate-300">
                    inventory_2
                  </span>
                  <p className="text-sm font-bold text-slate-500">
                    No hay productos disponibles en esta tienda
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {productSources.map((source) => {
                    const product = source.products
                    if (!product) return null
                    const href = source.url ?? `/producto/${product.slug}`
                    return (
                      <a
                        key={source.id}
                        href={href}
                        target={source.url ? '_blank' : undefined}
                        rel={source.url ? 'noopener noreferrer' : undefined}
                        className="group border-primary/5 relative flex gap-6 overflow-hidden rounded-3xl border bg-white p-5 transition-all hover:shadow-2xl dark:bg-slate-900"
                      >
                        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800">
                          {product.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={product.image_url}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-contain p-3 transition-transform group-hover:scale-110"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center">
                              <span className="material-icons text-4xl text-slate-300">
                                image
                              </span>
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col justify-between py-1">
                          <div>
                            <h3 className="group-hover:text-primary leading-tight font-bold text-slate-900 transition-colors dark:text-white">
                              {product.name}
                            </h3>
                            <div className="mt-3 flex items-center gap-3">
                              {source.price !== null && (
                                <span className="text-primary text-xl font-black">
                                  ${source.price.toLocaleString('es-CL')}
                                </span>
                              )}
                              {source.original_price !== null &&
                                source.original_price > (source.price ?? 0) && (
                                  <span className="text-sm font-medium text-slate-400 line-through">
                                    $
                                    {source.original_price.toLocaleString(
                                      'es-CL',
                                    )}
                                  </span>
                                )}
                            </div>
                          </div>
                          <Link
                            href={`/producto/${product.slug}`}
                            className="hover:bg-primary mt-4 w-full transform rounded-xl bg-slate-50 py-3 text-center text-xs font-black text-slate-900 shadow-sm transition-all hover:text-white active:scale-95 dark:bg-slate-800 dark:text-white"
                          >
                            Ver Oferta
                          </Link>
                        </div>
                      </a>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black">
                  Experiencias de Clientes
                </h2>
                <Link
                  href={`/tienda/${slug}/review`}
                  className="text-primary flex items-center gap-2 text-sm font-black hover:underline"
                >
                  <span className="material-icons text-sm">edit</span> Escribir
                  Reseña
                </Link>
              </div>

              {storeReviews.length === 0 ? (
                <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center dark:border-slate-800 dark:bg-slate-900/40">
                  <span className="material-symbols-outlined mb-4 block text-4xl text-slate-300">
                    rate_review
                  </span>
                  <p className="text-sm font-bold text-slate-500">
                    Aún no hay reseñas para esta tienda
                  </p>
                  <Link
                    href={`/tienda/${slug}/review`}
                    className="text-primary mt-2 inline-block text-xs font-black tracking-widest uppercase hover:underline"
                  >
                    Sé el primero en opinar
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {storeReviews.map((review) => {
                    const authorName = review.author_name || 'Usuario'
                    const initials = authorName
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()

                    return (
                      <div
                        key={review.id}
                        className="border-primary/5 rounded-3xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900"
                      >
                        <div className="mb-6 flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            {review.author_avatar ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={review.author_avatar}
                                alt={authorName}
                                referrerPolicy="no-referrer"
                                className="h-12 w-12 rounded-2xl object-cover"
                              />
                            ) : (
                              <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black">
                                {initials}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                                {authorName}
                                {review.is_verified_purchase && (
                                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-black tracking-tighter text-white uppercase">
                                    Compra Verificada
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-medium text-slate-500">
                                {formatRelativeDate(review.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-0.5 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`material-symbols-outlined text-sm ${i < review.rating_overall ? 'fill-1' : ''}`}
                              >
                                star
                              </span>
                            ))}
                          </div>
                        </div>
                        {review.body && (
                          <p className="mb-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                            &ldquo;{review.body}&rdquo;
                          </p>
                        )}
                      </div>
                    )
                  })}

                  <button className="border-primary/10 hover:border-primary/30 hover:bg-primary/5 hover:text-primary w-full rounded-3xl border-2 border-dashed py-5 text-sm font-black tracking-widest text-slate-400 uppercase transition-all dark:text-slate-500">
                    Cargar Más Reseñas
                  </button>
                </div>
              )}
            </div>

            {/* Información */}
            {store.description && (
              <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-xl font-black">Sobre {store.name}</h2>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {store.description}
                </p>
                {store.website_url && (
                  <a
                    href={store.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary flex items-center gap-1 text-sm font-bold hover:underline"
                  >
                    <span className="material-icons text-sm">open_in_new</span>
                    {store.website_url}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-primary/10 mt-24 border-t bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <Logo />
              <p className="mt-6 text-sm leading-relaxed text-slate-500">
                Empoderando a la comunidad con transparencia y datos reales
                sobre el retail nacional e internacional.
              </p>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-black tracking-widest text-slate-900 uppercase dark:text-white">
                Recursos
              </h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li>
                  <Link className="hover:text-primary transition-colors" href="#">
                    Guía de Reseñas
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary transition-colors" href="#">
                    Comprador Verificado
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary transition-colors" href="#">
                    Para Tiendas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-black tracking-widest text-slate-900 uppercase dark:text-white">
                Soporte
              </h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li>
                  <Link className="hover:text-primary transition-colors" href="#">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary transition-colors" href="#">
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary transition-colors" href="#">
                    Reportar Tienda
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-black tracking-widest text-slate-900 uppercase dark:text-white">
                Newsletter
              </h4>
              <div className="border-primary/10 flex gap-2 rounded-2xl border bg-slate-50 p-1.5 dark:bg-slate-900">
                <input
                  className="flex-1 bg-transparent px-4 text-sm font-medium outline-none"
                  placeholder="Tu email"
                  type="email"
                />
                <button className="bg-primary hover:bg-primary/90 shadow-primary/20 rounded-xl px-6 py-2.5 font-bold text-white shadow-lg transition-all">
                  Unirse
                </button>
              </div>
            </div>
          </div>
          <div className="border-primary/5 flex flex-col items-center justify-between gap-6 border-t pt-8 md:flex-row">
            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              © {new Date().getFullYear()} Revius.cl - Reputación que Importa.
            </p>
            <div className="flex gap-8 text-xs font-black tracking-widest text-slate-400 uppercase">
              <Link className="hover:text-primary transition-colors" href="#">
                Privacidad
              </Link>
              <Link className="hover:text-primary transition-colors" href="#">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
