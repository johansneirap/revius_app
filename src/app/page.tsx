import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/Logo'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import NavUser from '@/components/ui/NavUser'
import NavSearch, { SearchMobileTrigger } from '@/components/ui/NavSearch'
import NavDropdown from '@/components/ui/NavDropdown'
import { createClient } from '@/lib/supabase/server'

// ─── Tipos ────────────────────────────────────────────────────────────────────

type HotProduct = {
  id: string
  slug: string
  name: string
  image_url: string | null
  badge: string | null
  avg_score: number | null
  categoria: string | null
  min_price: number
  num_tiendas: number
}

type SubcategoryCard = {
  id: string
  name: string
  slug: string
  total: number
}

type HomeReview = {
  author_name: string | null
  author_avatar: string | null
  author_level: string | null
  rating: number
  body: string
  credibility_score: number
  product_id: string
}

type Store = {
  id: string
  name: string
  slug: string
  avg_shipping_speed: number | null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCLP(price: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(price)
}

const CATEGORY_ICONS: Record<string, string> = {
  'Celulares': 'smartphone',
  'Notebooks': 'laptop',
  'Televisores': 'tv',
  'Tablets': 'tablet',
  'Audífonos y Headsets': 'headphones',
  'Audio': 'speaker',
  'Hogar': 'home',
  'Estilo de Vida': 'spa',
}

const BADGE_COLORS: Record<string, string> = {
  alta_demanda: 'bg-red-500',
  eleccion_editor: 'bg-primary',
  mejor_valor: 'bg-orange-500',
  exclusivo: 'bg-purple-500',
  nuevo: 'bg-emerald-500',
}

const BADGE_LABELS: Record<string, string> = {
  alta_demanda: 'Alta Demanda',
  eleccion_editor: 'Elección Editor',
  mejor_valor: 'Mejor Valor',
  exclusivo: 'Exclusivo',
  nuevo: 'Nuevo',
}

function badgeColor(badge: string): string {
  return BADGE_COLORS[badge] ?? 'bg-primary'
}

function badgeLabel(badge: string): string {
  return BADGE_LABELS[badge] ?? badge
}

function shippingStatus(speed: number | null): { label: string; color: string } {
  if (speed === null) return { label: 'Verificada', color: 'text-primary' }
  if (speed >= 4.5) return { label: 'Despacho Rápido', color: 'text-green-600' }
  if (speed >= 3.5) return { label: 'Despacho Normal', color: 'text-slate-500' }
  return { label: 'Verificada', color: 'text-primary' }
}

function credibilityBadge(score: number): string {
  if (score >= 0.8) return 'Reseña de Alta Confiabilidad'
  if (score >= 0.6) return 'Reseña Verificada'
  return 'Reseña Destacada'
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const supabase = await createClient()

  // Fetch paralelo: productos, tiendas, subcategorías
  const [{ data: productsRaw }, { data: storesRaw }, { data: subcatsRaw }] =
    await Promise.all([
      supabase
        .from('products_with_category')
        .select('id, name, slug, image_url, avg_score, badge, category_name')
        .not('solotodo_id', 'is', null)
        .order('avg_score', { ascending: false, nullsFirst: false })
        .limit(24),
      supabase
        .from('stores')
        .select('id, name, slug, avg_shipping_speed')
        .eq('is_verified', true)
        .limit(3),
      supabase
        .from('categories')
        .select('id, name, slug')
        .not('parent_id', 'is', null),
    ])

  const productIds = (productsRaw ?? []).map((p) => p.id)

  // Fetch paralelo: precios, reseñas, conteo por categoría
  const [{ data: sourcesRaw }, { data: reviewsRaw }, { data: productsByCat }] =
    await Promise.all([
      productIds.length > 0
        ? supabase
            .from('product_sources')
            .select('product_id, price')
            .in('product_id', productIds)
            .gt('price', 0)
        : Promise.resolve({ data: [] }),
      supabase
        .from('product_reviews_full')
        .select('author_name, author_avatar, author_level, rating, body, credibility_score, product_id')
        .not('credibility_score', 'is', null)
        .order('credibility_score', { ascending: false })
        .limit(6),
      subcatsRaw && subcatsRaw.length > 0
        ? supabase
            .from('products')
            .select('category_id')
            .in('category_id', subcatsRaw.map((c) => c.id))
        : Promise.resolve({ data: [] }),
    ])

  // Agregar precios por producto
  const priceAgg = new Map<string, { min_price: number; num_tiendas: number }>()
  for (const src of (sourcesRaw ?? []) as { product_id: string; price: number }[]) {
    const existing = priceAgg.get(src.product_id)
    if (!existing) {
      priceAgg.set(src.product_id, { min_price: src.price, num_tiendas: 1 })
    } else {
      existing.num_tiendas++
      if (src.price < existing.min_price) existing.min_price = src.price
    }
  }

  // Productos hot: solo los que tienen precio, ordenados por num_tiendas desc
  const hotProducts: HotProduct[] = (productsRaw ?? [])
    .filter((p) => priceAgg.has(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      image_url: p.image_url ?? null,
      avg_score: p.avg_score ?? null,
      badge: p.badge ?? null,
      categoria: (p as Record<string, unknown>).category_name as string | null ?? null,
      min_price: priceAgg.get(p.id)!.min_price,
      num_tiendas: priceAgg.get(p.id)!.num_tiendas,
    }))
    .sort((a, b) => b.num_tiendas - a.num_tiendas || (b.avg_score ?? 0) - (a.avg_score ?? 0))
    .slice(0, 6)

  // Conteo de productos por subcategoría
  const catCounts = new Map<string, number>()
  for (const p of (productsByCat ?? []) as { category_id: string }[]) {
    catCounts.set(p.category_id, (catCounts.get(p.category_id) ?? 0) + 1)
  }
  const subcategories: SubcategoryCard[] = (subcatsRaw ?? [])
    .filter((c) => (catCounts.get(c.id) ?? 0) > 0)
    .map((c) => ({ id: c.id, name: c.name, slug: c.slug, total: catCounts.get(c.id) ?? 0 }))
    .sort((a, b) => b.total - a.total)

  const reviews = (reviewsRaw ?? []) as HomeReview[]
  const stores = (storesRaw ?? []) as Store[]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-grow">
            <HeroSection products={hotProducts} />
            <CategoriesSection subcategories={subcategories} />
            <PromoBanner />
            <ReviewsSection reviews={reviews} />
          </div>
          <Sidebar stores={stores} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

async function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
        <div className="flex flex-shrink-0 items-center">
          <Logo />
        </div>
        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          <Link href="/" className="border-primary text-primary border-b-2 px-2 py-5">
            Inicio
          </Link>
          <NavDropdown
            label="Tecnología"
            href="/categoria/tecnologia"
            items={[
              { label: 'Celulares', slug: 'celulares' },
              { label: 'Notebooks', slug: 'notebooks' },
              { label: 'Tablets', slug: 'tablets' },
              { label: 'Televisores', slug: 'televisores' },
            ]}
          />
          <NavDropdown
            label="Audio"
            href="/categoria/audio"
            items={[
              { label: 'Audífonos y Headsets', slug: 'audifonos-y-headsets' },
            ]}
          />
          <Link href="/categoria/hogar" className="hover:text-primary px-2 py-5 text-slate-600 transition-colors dark:text-slate-400">
            Hogar
          </Link>
          <Link href="/categoria/estilo-vida" className="hover:text-primary px-2 py-5 text-slate-600 transition-colors dark:text-slate-400">
            Estilo de Vida
          </Link>
        </nav>
        <div className="lg:min-w-0 lg:flex-1 lg:max-w-md">
          <NavSearch />
        </div>
        <div className="flex items-center gap-2">
          <SearchMobileTrigger />
          <DarkModeToggle />
          <NavUser />
          <Link
            href="/escribir-resena"
            className="bg-primary shadow-primary/20 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-600 active:translate-y-0 active:scale-95 md:px-5 md:py-2.5"
          >
            <span className="material-icons text-sm">edit</span>
            <span className="hidden md:inline">Escribir Reseña</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

// ─── HeroSection ──────────────────────────────────────────────────────────────

function HeroSection({ products }: { products: HotProduct[] }) {
  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-icons text-orange-500">whatshot</span>
          <h2 className="text-2xl font-bold">Productos Hot de la Semana</h2>
        </div>
        <Link
          href="/buscar"
          className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
        >
          Ver todos
          <span className="material-icons text-sm">arrow_forward</span>
        </Link>
      </div>
      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <span className="material-icons text-5xl text-slate-300">inventory_2</span>
          <p className="font-semibold text-slate-500">No hay productos disponibles aún</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

function ProductCard({ product }: { product: HotProduct }) {
  const badge = product.badge ?? ''
  const color = badgeColor(badge)
  const label = badgeLabel(badge)

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative h-48 bg-slate-50 dark:bg-slate-800">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain p-4"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-icons text-4xl text-slate-300 dark:text-slate-600">
              image_not_supported
            </span>
          </div>
        )}
        {badge && (
          <div className={`absolute top-3 left-3 rounded px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase ${color}`}>
            {label}
          </div>
        )}
        {product.num_tiendas > 1 && (
          <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-600 shadow dark:bg-slate-900/90 dark:text-slate-300">
            {product.num_tiendas} tiendas
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="mb-1">
          {product.categoria && (
            <p className="mb-1 text-[11px] font-medium text-slate-400">{product.categoria}</p>
          )}
          <h3 className="group-hover:text-primary line-clamp-2 text-sm font-bold leading-snug transition-colors">
            {product.name}
          </h3>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Mejor Precio</p>
            <p className="text-primary text-xl font-bold">{formatCLP(product.min_price)}</p>
          </div>
          {product.avg_score !== null ? (
            <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
              <span className="material-icons text-[12px]">star</span>
              {product.avg_score.toFixed(1)}
            </span>
          ) : (
            <span className="bg-primary rounded px-4 py-2 text-sm font-semibold text-white">
              Ver Oferta
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── CategoriesSection ────────────────────────────────────────────────────────

function CategoriesSection({ subcategories }: { subcategories: SubcategoryCard[] }) {
  if (subcategories.length === 0) return null

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center gap-2">
        <span className="material-icons text-primary">grid_view</span>
        <h2 className="text-2xl font-bold">Explora por Categoría</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {subcategories.map((cat) => {
          const icon = CATEGORY_ICONS[cat.name] ?? 'category'
          return (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 text-center transition-all hover:border-primary/30 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <span className="material-icons text-2xl">{icon}</span>
              </div>
              <div>
                <p className="text-sm font-bold leading-tight text-slate-900 dark:text-slate-100">
                  {cat.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {cat.total} producto{cat.total !== 1 ? 's' : ''}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

// ─── PromoBanner ──────────────────────────────────────────────────────────────

function PromoBanner() {
  return (
    <div className="border-primary/20 bg-primary/10 relative mb-12 flex items-center overflow-hidden rounded-xl border px-6 py-8 sm:px-12 sm:py-10">
      <div className="z-10 w-full max-w-md">
        <h2 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
          Evento de Actualización Tech
        </h2>
        <p className="mb-4 text-sm text-slate-600 sm:text-base dark:text-slate-300">
          Cupones exclusivos para nuestra comunidad en más de 500 gadgets top.
        </p>
        <button className="bg-primary rounded-lg px-6 py-2 text-sm font-bold text-white transition-all hover:shadow-lg sm:text-base">
          Obtener Cupones
        </button>
      </div>
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-1/2 opacity-20">
        <div className="from-primary h-full w-full bg-gradient-to-l to-transparent"></div>
      </div>
      <span className="material-icons text-primary absolute right-6 text-7xl opacity-10 sm:right-12 sm:text-9xl">
        local_offer
      </span>
    </div>
  )
}

// ─── ReviewsSection ───────────────────────────────────────────────────────────

function ReviewsSection({ reviews }: { reviews: HomeReview[] }) {
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Reseñas Destacadas</h2>
          <p className="text-sm text-slate-500">
            Opiniones de expertos y creadores chilenos en los que confías.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
            <span className="material-icons">chevron_left</span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
            <span className="material-icons">chevron_right</span>
          </button>
        </div>
      </div>
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 py-14 text-center dark:border-slate-800 dark:bg-slate-900/50">
          <span className="material-icons text-5xl text-slate-300">rate_review</span>
          <div>
            <p className="font-semibold text-slate-600 dark:text-slate-300">
              Sé el primero en reseñar estos productos
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Comparte tu experiencia y ayuda a otros consumidores chilenos.
            </p>
          </div>
          <Link
            href="/escribir-resena"
            className="bg-primary mt-2 rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            Escribir Reseña
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((review, i) => (
            <HomeReviewCard key={i} review={review} />
          ))}
        </div>
      )}
    </section>
  )
}

function HomeReviewCard({ review }: { review: HomeReview }) {
  const name = review.author_name ?? 'Usuario Revius'
  const badge = credibilityBadge(review.credibility_score)

  const levelLabel: Record<string, string> = {
    experto: 'Revisor Experto',
    premium: 'Revisor Premium',
    oro: 'Revisor Avanzado',
    plata: 'Revisor de Comunidad',
    bronce: 'Revisor de Comunidad',
  }
  const role = review.author_level ? (levelLabel[review.author_level] ?? 'Revisor Verificado') : 'Revisor Verificado'

  return (
    <div className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-start gap-4">
        <div className="relative">
          {review.author_avatar ? (
            <img
              src={review.author_avatar}
              alt={name}
              width={56}
              height={56}
              className="rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-500 dark:bg-slate-700">
              {name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span className="material-icons text-primary absolute -right-1 -bottom-1 rounded-full bg-white text-lg dark:bg-slate-900">
            verified
          </span>
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-xs font-medium text-slate-400 uppercase">{role}</p>
          <div className="mt-1 flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`material-icons text-xs ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-slate-300'}`}
              >
                star
              </span>
            ))}
            <span className="ml-2 text-xs font-bold">{review.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <blockquote className="mb-4 text-slate-700 italic dark:text-slate-300">
        &ldquo;{review.body}&rdquo;
      </blockquote>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          {badge}
        </span>
        <Link
          href={`/producto/${review.product_id}`}
          className="text-primary text-xs font-bold hover:underline"
        >
          Leer Reseña Completa
        </Link>
      </div>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ stores }: { stores: Store[] }) {
  return (
    <aside className="w-full flex-shrink-0 space-y-8 lg:w-80">
      {/* Partner banner (estático) */}
      <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-800/50">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Oferta Partner
          </span>
          <span className="material-symbols-outlined cursor-help text-xs text-slate-400">
            info
          </span>
        </div>
        <div className="relative mb-3 h-32 overflow-hidden rounded-lg">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw-hBNVI4d5Dv1UCVmBfj5IPiuXRC9se0QrECc9ORtgCv-ZKuU8amsjxCt0eRHwBaz-iDbzeXGaz73b6zIxEvYAsMi5aGo3_nyQ4ZRuoxqune-qZuBH3vSv2XN65So6xCXkKi8dzQSY__Kcmgzq_u7DwNaoDaJFuD1MJr8kQ8KhiImLwgPQo9pFvXm4eY3h9Jo9O1mUY1luXBwA7VjU8HAjrG_b1NZ22PQAQ2h5pzERzDuBdTI_J2k7pObIa8QVLLsKXGEvOmtmERg"
            alt="Fondo de escritorio"
            fill
            className="object-cover"
          />
        </div>
        <h5 className="mb-1 text-sm font-bold">
          Renueva y Ahorra con TechExchange
        </h5>
        <p className="mb-4 text-xs text-slate-500">
          Recibe hasta $400.000 por tus dispositivos antiguos al renovar con
          nuestro partner oficial.
        </p>
        <button className="w-full rounded bg-slate-900 py-2 text-xs font-bold tracking-tight text-white uppercase transition-opacity hover:opacity-90 dark:bg-white dark:text-slate-900">
          Saber Más
        </button>
      </div>

      {/* Tiendas verificadas */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 font-bold">Compara Precios en Retail</h3>
        <div className="space-y-4">
          {stores.length === 0 ? (
            <p className="text-xs text-slate-400">Sin tiendas verificadas aún.</p>
          ) : (
            stores.map((store) => {
              const code = store.name.slice(0, 3).toUpperCase()
              const { label, color } = shippingStatus(store.avg_shipping_speed)
              return (
                <RetailRow
                  key={store.id}
                  name={store.name}
                  code={code}
                  status={label}
                  statusColor={color}
                  href={`/tienda/${store.slug}`}
                />
              )
            })
          )}
        </div>
      </div>

      {/* Newsletter (estático) */}
      <div className="bg-primary shadow-primary/20 rounded-xl p-6 text-white shadow-xl">
        <h3 className="mb-2 text-lg font-bold">El Pulso Semanal</h3>
        <p className="mb-4 text-sm text-blue-100">
          Recibe las mejores ofertas y reseñas críticas en tu correo cada
          domingo.
        </p>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm placeholder:text-blue-200 focus:ring-2 focus:ring-white/30 focus:outline-none"
          />
          <button className="text-primary w-full rounded-lg bg-white py-2 text-sm font-bold transition-colors hover:bg-blue-50">
            Suscribirse Ahora
          </button>
        </div>
        <p className="mt-4 text-center text-[10px] text-blue-200">
          Respetamos tu privacidad. Cero spam.
        </p>
      </div>

      {/* Sponsored (estático) */}
      <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-800/50">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Patrocinado
          </span>
        </div>
        <div className="flex gap-3">
          <div className="relative h-20 w-20 flex-shrink-0 rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdCG7YS1Cp9ceNVJPJcCSqETqYLQmYzMnia9uGVeM4AQxVRQGP52Q-wZJ_pQCD_rwj_ui6osyLTtmaoF_zf6qv07HCWe4PNwSfZm7oMswWq3f8JirfJGAJpTGLu9id_pFvQjKh0F9ceyp0sKcnUOz8EVWzSMJzq-EX9dlbyfcy-5jmB21NpnXztHmPvieHllQZVZo0dHxD4IjlQXD810tXLNuUAiakmks_ylva3Gvlve2UyH36dM96ZxMs-i8meumvvclfi89iOsMC"
              alt="Reloj inteligente"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h6 className="mb-1 text-xs leading-tight font-bold">
              Heritage Smartwatch Pro Edición Cuero
            </h6>
            <p className="text-primary mb-1 text-xs font-bold">$299.990</p>
            <Link
              href="#"
              className="hover:text-primary text-[10px] font-bold text-slate-500 underline"
            >
              Comprar Ahora
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

function RetailRow({
  name,
  code,
  status,
  statusColor,
  href,
}: {
  name: string
  code: string
  status: string
  statusColor: string
  href: string
}) {
  return (
    <Link href={href} className="flex items-center justify-between hover:opacity-80 transition-opacity">
      <div className="flex items-center gap-3">
        <div className="text-primary flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-[10px] font-bold dark:bg-slate-800">
          {code}
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
      <span className={`text-xs font-bold ${statusColor}`}>{status}</span>
    </Link>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Logo size="sm" />
            </div>
            <p className="mb-6 max-w-xs text-sm text-slate-500">
              Empoderando a los consumidores chilenos con datos objetivos y
              opiniones expertas para mejores decisiones de compra.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon="facebook" />
              <SocialIcon icon="alternate_email" />
              <SocialIcon icon="play_circle" />
            </div>
          </div>
          <div>
            <h5 className="mb-4 text-sm font-bold">Plataforma</h5>
            <ul className="space-y-2 text-sm text-slate-500">
              <FooterLink href="/como-funciona">Cómo Funciona</FooterLink>
              <FooterLink href="/metodologia-credibilidad">Metodología</FooterLink>
              <FooterLink href="/preguntas-frecuentes">Preguntas Frecuentes</FooterLink>
              <FooterLink href="/escribir-resena">Escribir Reseña</FooterLink>
            </ul>
          </div>
          <div>
            <h5 className="mb-4 text-sm font-bold">Explorar</h5>
            <ul className="space-y-2 text-sm text-slate-500">
              <FooterLink href="/categoria/tecnologia">Tecnología</FooterLink>
              <FooterLink href="/categoria/audio">Audio</FooterLink>
              <FooterLink href="/categoria/hogar">Hogar</FooterLink>
              <FooterLink href="/buscar">Buscador</FooterLink>
            </ul>
          </div>
          <div>
            <h5 className="mb-4 text-sm font-bold">Acerca de</h5>
            <ul className="space-y-2 text-sm text-slate-500">
              <FooterLink href="/sobre-nosotros">Sobre Nosotros</FooterLink>
              <FooterLink href="/contacto">Contacto</FooterLink>
              <FooterLink href="/terminos-servicio">Términos de Servicio</FooterLink>
              <FooterLink href="/politica-privacidad">Privacidad</FooterLink>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 md:flex-row dark:border-slate-800">
          <p className="text-xs text-slate-400">
            © 2026 Revius.cl Media. Todos los derechos reservados.{' '}
            <span className="mx-2">|</span> Divulgación: Podemos ganar una
            comisión al hacer clic en enlaces de nuestro sitio.
          </p>
          <div className="flex gap-6 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            <Link href="/politica-privacidad" className="hover:text-primary">
              Política de Privacidad
            </Link>
            <Link href="/terminos-servicio" className="hover:text-primary">
              Términos de Servicio
            </Link>
            <Link href="/contacto" className="hover:text-primary">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon }: { icon: string }) {
  return (
    <Link
      href="#"
      className="hover:text-primary flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors dark:bg-slate-800 dark:text-slate-400"
    >
      <span className="material-icons text-sm">{icon}</span>
    </Link>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-primary transition-colors">
        {children}
      </Link>
    </li>
  )
}
