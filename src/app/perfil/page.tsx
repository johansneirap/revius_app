import { redirect } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import CredibilityBadge from '@/components/reviews/CredibilityBadge'
import { createClient } from '@/lib/supabase/server'

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Profile = {
  name: string | null
  avatar_url: string | null
  level: string | null
  reputation: number | null
  follower_count: number | null
  following_count: number | null
  review_count: number | null
}

type ProfileReview = {
  id: string
  rating: number
  title: string | null
  body: string
  created_at: string
  credibility_score: number | null
  products: { name: string; image_url: string | null; slug: string } | null
}

type FavoriteItem = {
  product_id: string
  products: {
    id: string
    name: string
    slug: string
    image_url: string | null
    avg_score: number | null
  } | null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LEVEL_LABELS: Record<string, string> = {
  bronce: 'Reviewer Bronce',
  plata: 'Reviewer Plata',
  oro: 'Reviewer Oro',
  experto: 'Reviewer Experto',
  premium: 'Premium',
}

function levelLabel(level: string | null): string {
  return LEVEL_LABELS[level ?? 'bronce'] ?? 'Reviewer Bronce'
}

function levelProgress(level: string | null, reviewCount: number) {
  const lvl = level ?? 'bronce'
  if (lvl === 'experto' || lvl === 'premium') {
    return { current: reviewCount, target: reviewCount, remaining: 0, nextLabel: 'Experto', pct: 100 }
  }
  const map: Record<string, { target: number; nextLabel: string }> = {
    bronce: { target: 10, nextLabel: 'Plata' },
    plata:  { target: 20, nextLabel: 'Oro' },
    oro:    { target: 50, nextLabel: 'Experto' },
  }
  const t = map[lvl] ?? map.bronce
  const pct = Math.min(100, Math.round((reviewCount / t.target) * 100))
  return {
    current: reviewCount,
    target: t.target,
    remaining: Math.max(0, t.target - reviewCount),
    nextLabel: t.nextLabel,
    pct,
  }
}

function formatRelativeDate(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Hoy'
  if (days === 1) return 'Hace 1 día'
  if (days < 7) return `Hace ${days} días`
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`
  if (days < 365) return `Hace ${Math.floor(days / 30)} meses`
  return `Hace ${Math.floor(days / 365)} años`
}

function formatCount(n: number | null): string {
  if (!n) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function UserProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/perfil')

  const [profileRes, reviewsRes, favoritesRes] = await Promise.all([
    supabase
      .from('users')
      .select('name, avatar_url, level, reputation, follower_count, following_count, review_count')
      .eq('id', user.id)
      .single(),
    supabase
      .from('product_reviews')
      .select('id, rating, title, body, created_at, credibility_score, products(name, image_url, slug)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('favorites')
      .select('product_id, products(id, name, slug, image_url, avg_score)')
      .eq('user_id', user.id)
      .not('product_id', 'is', null)
      .limit(3),
  ])

  const profile = profileRes.data as Profile | null
  const reviews = (reviewsRes.data ?? []) as ProfileReview[]
  const favorites = (favoritesRes.data ?? []) as FavoriteItem[]

  const displayName =
    profile?.name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Usuario'

  const avatarUrl: string | null =
    profile?.avatar_url || (user.user_metadata?.avatar_url as string | null) || null

  const level = profile?.level ?? 'bronce'
  const reviewCount = profile?.review_count ?? reviews.length
  const followerCount = profile?.follower_count ?? 0
  const followingCount = profile?.following_count ?? 0

  const initials = displayName
    .split(' ')
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const progress = levelProgress(level, reviewCount)

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen text-slate-900 transition-colors dark:text-slate-100">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />
            <div className="group relative hidden w-80 md:flex">
              <span className="material-symbols-outlined group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 transition-colors">
                search
              </span>
              <input
                className="focus:border-primary/20 w-full rounded-full border-2 border-transparent bg-slate-100 py-2 pr-4 pl-10 text-sm transition-all outline-none dark:bg-slate-800"
                placeholder="Buscar productos o tiendas..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="ml-2 flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-800">
              <div className="hidden flex-col items-end sm:flex">
                <span className="text-xs font-black tracking-tight">
                  {displayName}
                </span>
                <span className="text-primary text-[10px] font-bold tracking-tighter uppercase">
                  {levelLabel(level)}
                </span>
              </div>
              <div className="border-primary/20 relative h-10 w-10 overflow-hidden rounded-full border-2 shadow-lg">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="bg-primary flex h-full w-full items-center justify-center text-xs font-black text-white">
                    {initials}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Sidebar Navigation */}
          <aside className="animate-in slide-in-from-left-4 space-y-6 duration-500 lg:col-span-3">
            <nav className="border-primary/5 overflow-hidden rounded-3xl border bg-white p-3 shadow-xl dark:bg-slate-900">
              <div className="flex flex-col gap-1">
                <Link
                  href="#"
                  className="text-primary bg-primary/5 flex items-center gap-4 rounded-2xl px-5 py-4 font-black transition-all"
                >
                  <span className="material-symbols-outlined fill-1">reviews</span>
                  <span className="text-sm">Mis Reseñas</span>
                </Link>
                <Link
                  href="#"
                  className="group flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <span className="material-symbols-outlined group-hover:text-primary transition-colors">
                    thumbs_up_down
                  </span>
                  <span>Me gusta / No me gusta</span>
                </Link>
                <div className="border-primary/5 mx-4 my-3 border-t"></div>
                <p className="px-5 py-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Favoritos
                </p>
                <Link
                  href="#"
                  className="group flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <span className="material-symbols-outlined text-red-400 transition-transform group-hover:scale-110">
                    inventory_2
                  </span>
                  <span>Productos</span>
                </Link>
                <Link
                  href="#"
                  className="group flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <span className="material-symbols-outlined text-blue-400 transition-transform group-hover:scale-110">
                    storefront
                  </span>
                  <span>Tiendas</span>
                </Link>
                <div className="border-primary/5 mx-4 my-3 border-t"></div>
                <Link
                  href="#"
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <span className="material-symbols-outlined">group</span>
                  <span>Siguiendo</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <span className="material-symbols-outlined">settings</span>
                  <span>Configuración</span>
                </Link>
              </div>
            </nav>

            {/* Progress Card */}
            {progress.remaining > 0 && (
              <div className="from-primary shadow-primary/30 group relative overflow-hidden rounded-3xl bg-gradient-to-br to-blue-700 p-8 text-white shadow-2xl">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-all group-hover:bg-white/20"></div>
                <p className="mb-3 flex items-center gap-2 text-sm font-black">
                  <span className="material-icons text-lg">workspace_premium</span>
                  ¡Conviértete en {progress.nextLabel}!
                </p>
                <p className="mb-6 text-xs leading-relaxed font-medium text-blue-100">
                  Escribe {progress.remaining} reseña{progress.remaining !== 1 ? 's' : ''} más
                  para subir de nivel y obtener beneficios exclusivos.
                </p>
                <div className="mb-3 h-2.5 w-full overflow-hidden rounded-full bg-black/20">
                  <div
                    className="h-full bg-white transition-all duration-1000"
                    style={{ width: `${progress.pct}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-widest text-blue-100 uppercase">
                    {progress.current}/{progress.target} RESEÑAS
                  </span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-black">
                    FALTAN {progress.remaining}
                  </span>
                </div>
              </div>
            )}
          </aside>

          {/* Main Content Area */}
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 duration-700 lg:col-span-9">
            {/* Profile Identity Card */}
            <div className="border-primary/5 relative overflow-hidden rounded-3xl border bg-white p-8 shadow-xl md:p-10 dark:bg-slate-900">
              <div className="bg-primary/5 absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full blur-3xl"></div>
              <div className="relative flex flex-col items-center gap-8 md:flex-row">
                <div className="group relative">
                  <div className="from-primary h-32 w-32 rounded-full bg-gradient-to-tr to-blue-400 p-1 shadow-2xl">
                    <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white dark:border-slate-800">
                      {avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={avatarUrl}
                          alt={displayName}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <span className="bg-primary flex h-full w-full items-center justify-center text-3xl font-black text-white">
                          {initials}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="absolute right-2 bottom-2 h-7 w-7 rounded-full border-4 border-white bg-emerald-500 shadow-lg dark:border-slate-900"></span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-3 flex flex-col gap-4 md:flex-row md:items-center">
                    <h2 className="text-3xl font-black tracking-tight">{displayName}</h2>
                    <span className="bg-primary/10 text-primary border-primary/10 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                      {levelLabel(level)}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-10 md:justify-start">
                    <div className="text-center md:text-left">
                      <span className="block text-2xl font-black tabular-nums">
                        {formatCount(followerCount)}
                      </span>
                      <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        Seguidores
                      </span>
                    </div>
                    <div className="border-primary/5 border-x px-10 text-center md:text-left">
                      <span className="block text-2xl font-black tabular-nums">
                        {formatCount(followingCount)}
                      </span>
                      <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        Siguiendo
                      </span>
                    </div>
                    <div className="text-center md:text-left">
                      <span className="block text-2xl font-black tabular-nums">
                        {reviewCount}
                      </span>
                      <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        Reseñas
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 self-start">
                  <button className="rounded-2xl bg-slate-900 px-8 py-3.5 text-sm font-black text-white shadow-xl transition-all hover:opacity-90 active:scale-95 dark:bg-white dark:text-slate-900">
                    Editar Perfil
                  </button>
                </div>
              </div>
            </div>

            {/* Favorite Products */}
            <section>
              <div className="mb-8 flex items-end justify-between px-2">
                <div>
                  <h3 className="text-2xl font-black tracking-tight">
                    Productos Favoritos
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    Los artículos que tienes en la mira
                  </p>
                </div>
                <button className="text-primary text-sm font-black tracking-widest uppercase hover:underline">
                  Ver todos
                </button>
              </div>

              {favorites.length === 0 ? (
                <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center dark:border-slate-800 dark:bg-slate-900/40">
                  <span className="material-symbols-outlined mb-4 block text-4xl text-slate-300">
                    favorite_border
                  </span>
                  <p className="text-sm font-bold text-slate-500">
                    Aún no tienes productos favoritos
                  </p>
                  <Link
                    href="/"
                    className="text-primary mt-2 inline-block text-xs font-black tracking-widest uppercase hover:underline"
                  >
                    Explorar productos
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {favorites.map((fav) => {
                    const p = fav.products
                    if (!p) return null
                    return (
                      <Link
                        key={fav.product_id}
                        href={`/producto/${p.slug}`}
                        className="border-primary/5 group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all hover:shadow-2xl dark:bg-slate-900"
                      >
                        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-800">
                          {p.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.image_url}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <span className="material-icons text-5xl text-slate-300">
                              image
                            </span>
                          )}
                          <button
                            type="button"
                            className="absolute top-4 right-4 rounded-2xl bg-white/90 p-2.5 text-red-500 shadow-xl backdrop-blur-md transition-all active:scale-90 dark:bg-slate-800/90"
                          >
                            <span className="material-icons text-base">favorite</span>
                          </button>
                        </div>
                        <div className="p-6">
                          <h4 className="group-hover:text-primary mb-3 line-clamp-1 text-sm font-black tracking-tight transition-colors">
                            {p.name}
                          </h4>
                          {p.avg_score !== null && (
                            <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-2 py-1 w-fit dark:bg-amber-900/20">
                              <span className="material-icons text-xs text-amber-400">star</span>
                              <span className="text-[10px] font-black text-amber-700 dark:text-amber-400">
                                {p.avg_score.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    )
                  })}

                  <div className="border-primary/10 hover:bg-primary/5 hover:border-primary/30 group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-slate-50 p-8 transition-all dark:bg-slate-900/40">
                    <span className="material-symbols-outlined group-hover:text-primary mb-4 text-4xl text-slate-300 transition-colors">
                      add_circle
                    </span>
                    <p className="group-hover:text-primary text-xs font-black tracking-widest text-slate-400 uppercase transition-colors">
                      Agregar nuevo
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Recent Reviews */}
            <section>
              <div className="mb-8 flex items-end justify-between px-2">
                <h3 className="text-2xl font-black tracking-tight">Reseñas Recientes</h3>
                <div className="border-primary/5 flex items-center gap-3 rounded-xl border bg-white px-4 py-2 text-sm text-slate-500 dark:bg-slate-900">
                  <span className="text-xs font-bold tracking-widest uppercase">Ordenar por:</span>
                  <select className="text-primary cursor-pointer border-none bg-transparent py-0 pl-1 text-xs font-black tracking-widest uppercase outline-none focus:ring-0">
                    <option>Más recientes</option>
                    <option>Mejor puntuadas</option>
                  </select>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center dark:border-slate-800 dark:bg-slate-900/40">
                  <span className="material-symbols-outlined mb-4 block text-4xl text-slate-300">
                    rate_review
                  </span>
                  <p className="text-sm font-bold text-slate-500">
                    Aún no has escrito reseñas
                  </p>
                  <Link
                    href="/"
                    className="text-primary mt-2 inline-block text-xs font-black tracking-widest uppercase hover:underline"
                  >
                    Buscar productos
                  </Link>
                </div>
              ) : (
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-primary/5 rounded-3xl border bg-white p-8 shadow-xl transition-all hover:shadow-2xl dark:bg-slate-900"
                    >
                      <div className="mb-8 flex flex-col gap-8 md:flex-row">
                        <div className="group relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                          {review.products?.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={review.products.image_url}
                              alt={review.products.name}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-contain transition-transform group-hover:scale-110"
                            />
                          ) : (
                            <span className="material-icons flex h-full w-full items-center justify-center text-3xl text-slate-300">
                              image
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
                            <div>
                              {review.products?.slug ? (
                                <Link
                                  href={`/producto/${review.products.slug}`}
                                  className="hover:text-primary text-xl font-black tracking-tight text-slate-900 transition-colors dark:text-slate-100"
                                >
                                  {review.products.name}
                                </Link>
                              ) : (
                                <p className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                                  {review.products?.name ?? 'Producto eliminado'}
                                </p>
                              )}
                              {review.title && (
                                <p className="mt-1 text-sm font-medium text-slate-500">
                                  {review.title}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`material-symbols-outlined text-sm ${i < review.rating ? 'fill-1' : ''}`}
                                  >
                                    star
                                  </span>
                                ))}
                              </div>
                              <CredibilityBadge score={review.credibility_score} size="sm" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="relative">
                          <span className="material-icons text-primary/10 absolute -top-4 -left-2 text-5xl select-none">
                            format_quote
                          </span>
                          <p className="relative z-10 pl-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            &ldquo;{review.body}&rdquo;
                          </p>
                        </div>

                        <div className="flex items-center justify-end pt-2">
                          <span className="text-[10px] font-bold tracking-tighter text-slate-400 uppercase italic">
                            {formatRelativeDate(review.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 text-center">
                    <button className="border-primary/10 hover:border-primary/30 hover:bg-primary/5 hover:text-primary rounded-2xl border-2 border-dashed px-12 py-4 text-xs font-black tracking-widest uppercase shadow-sm transition-all active:scale-95">
                      Cargar más reseñas
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-primary/10 mt-24 border-t bg-white py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <Logo />
              <p className="mt-6 text-sm leading-relaxed font-medium text-slate-500">
                La comunidad #1 de reseñas honestas y comparativa de precios en Chile.
              </p>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-black tracking-widest uppercase">Plataforma</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><Link className="hover:text-primary transition-colors" href="#">Cómo funciona</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="#">Tiendas verificadas</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="#">Blog de expertos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-black tracking-widest uppercase">Soporte</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><Link className="hover:text-primary transition-colors" href="#">Centro de ayuda</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="#">Normas de la comunidad</Link></li>
                <li><Link className="hover:text-primary transition-colors" href="#">Reportar abuso</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-black tracking-widest uppercase">Síguenos</h4>
              <div className="flex gap-4">
                {[
                  { i: 'facebook', l: 'Facebook' },
                  { i: 'camera_alt', l: 'Instagram' },
                  { i: 'alternate_email', l: 'Email' },
                ].map((item) => (
                  <button
                    key={item.i}
                    className="border-primary/5 hover:bg-primary flex h-10 w-10 items-center justify-center rounded-2xl border bg-slate-50 text-slate-500 shadow-sm transition-all hover:text-white dark:bg-slate-900"
                  >
                    <span className="material-icons text-sm">{item.i}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-primary/5 border-t pt-8 text-center">
            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              © {new Date().getFullYear()} Revius.cl - Todos los derechos reservados. Made with{' '}
              <span className="text-red-500">❤️</span> for reviewers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
