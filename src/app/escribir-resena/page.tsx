import Link from 'next/link'
import Logo from '@/components/Logo'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import NavUser from '@/components/ui/NavUser'
import NavSearch, { SearchMobileTrigger } from '@/components/ui/NavSearch'
import { createClient } from '@/lib/supabase/server'
import SearchRedirect from './SearchRedirect'

type Product = {
  id: string
  name: string
  slug: string
  image_url: string | null
  avg_score: number | null
  category_name: string | null
}

const CATEGORY_CHIPS = [
  { label: 'Celulares', slug: 'celulares', icon: 'smartphone' },
  { label: 'Notebooks', slug: 'notebooks', icon: 'laptop' },
  { label: 'Tablets', slug: 'tablets', icon: 'tablet' },
  { label: 'Televisores', slug: 'televisores', icon: 'tv' },
  { label: 'Audífonos', slug: 'audifonos-y-headsets', icon: 'headphones' },
]

export default async function WriteReviewPage() {
  const supabase = await createClient()

  const { data: productsRaw } = await supabase
    .from('products_with_category')
    .select('id, name, slug, image_url, avg_score, category_name')
    .not('solotodo_id', 'is', null)
    .order('avg_score', { ascending: false, nullsFirst: false })
    .limit(12)

  const products: Product[] = (productsRaw ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    image_url: p.image_url ?? null,
    avg_score: p.avg_score ?? null,
    category_name: (p as Record<string, unknown>).category_name as string | null ?? null,
  }))

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

      <main className="mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="bg-primary/10 text-primary mb-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
            Tu opinión importa
          </span>
          <h1 className="mb-4 text-4xl font-black leading-tight md:text-5xl">
            ¿Qué producto quieres{' '}
            <span className="text-primary italic">reseñar</span> hoy?
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            Busca el producto o elige uno de los más populares del momento.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <SearchRedirect />
        </div>

        {/* Category chips */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {CATEGORY_CHIPS.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="hover:bg-primary hover:border-primary flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-white dark:border-slate-700 dark:text-slate-400"
            >
              <span className="material-icons text-[16px]">{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Products grid */}
        <div>
          <h2 className="mb-6 text-xs font-bold tracking-widest text-slate-400 uppercase">
            Productos mejor valorados
          </h2>

          {products.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center dark:border-slate-800 dark:bg-slate-800/30">
              <span className="material-icons mb-4 text-5xl text-slate-300">inventory_2</span>
              <p className="font-semibold text-slate-500">No hay productos disponibles aún.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/producto/${product.slug}/review`}
                  className="group border-primary/5 hover:border-primary/20 flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-slate-900"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="material-icons text-2xl text-slate-300">
                          image_not_supported
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    {product.category_name && (
                      <p className="mb-0.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                        {product.category_name}
                      </p>
                    )}
                    <h3 className="group-hover:text-primary line-clamp-2 text-sm font-bold leading-snug text-slate-900 transition-colors dark:text-white">
                      {product.name}
                    </h3>
                    {product.avg_score !== null && (
                      <div className="mt-1.5 flex items-center gap-1">
                        <span className="material-icons text-[14px] text-amber-400">star</span>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          {product.avg_score.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="bg-primary/5 group-hover:bg-primary flex-shrink-0 rounded-xl p-2 transition-all group-hover:text-white">
                    <span className="material-icons text-[20px]">chevron_right</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA — no encuentras tu producto */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <span className="material-icons mb-3 text-4xl text-slate-300">search_off</span>
          <h3 className="mb-2 font-bold">¿No encuentras tu producto?</h3>
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            Usa el buscador para encontrarlo, o solicita que lo agreguemos al catálogo.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/buscar"
              className="bg-primary rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              Ir al buscador
            </Link>
            <Link
              href="/contacto"
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              Solicitar producto
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
