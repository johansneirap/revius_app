'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'

export default function WriteReviewPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock products for selection
  const popularProducts = [
    {
      name: 'SonicPro Ultra X1',
      brand: 'SonicPro',
      category: 'Audio',
      slug: 'sonicpro-ultra-x1',
      image: '/images/headphones.png',
      rating: 4.8,
    },
    {
      name: 'Aura Pro Wireless Gen 4',
      brand: 'Aura',
      category: 'Audio',
      slug: 'aura-pro-wireless',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDFbRlYmHsUxnbrQZ4T395vSHOiK9dy1gQKWPrq8EQ9vSb6qeZPRjh5dmsjg_6nR3SwXjGeiT8HbjKlV89eN7Zu9A8JPKh9Sra3-revrx5oyvwjgrIw3w9GFTI0fvrjN83qicv5MHZCqF_ilzUCiq0qrO3ZEfQ8OyITbpZR7EZ_Os3Uuvt-onHqPqlBTM4mUxJrjVCTEcWPNNauTa8QwEwOQXD7LdJ_iWVaynt_kUjce3AYHgDCcTlHlpFuchwjTgpb1PYChxECfBcP',
      rating: 4.9,
    },
    {
      name: 'Stellar Chronos White',
      brand: 'Stellar',
      category: 'Relojes',
      slug: 'stellar-chronos',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB4slPBzaJWCmlEe4SWrkGQyljxppAJuowJLpbzUHJpEorYCuw2ZZTOl3_9MmZESvraU_TOoJhzldGgR1JTqW_TzVbDGSuCoRB2BNSqhRt_yG9gSyIe4jBBpTJoOGa823atkiqbzSoS-tbgK1FNXe9nCYSz8R8CuK7hpL-k3l9IAqUcLytaKLEg5BQQsqLDP9cV5ZlR-hgA9r8R14Ja1umu0LgIDk0NqpXjUPg_FESu_5B47nnt5n9j4LcSU1Mbimd2wjYADTM56csY',
      rating: 4.7,
    },
  ]

  const filteredProducts = popularProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen text-slate-900 transition-colors dark:text-slate-100">
      {/* Nav Bar */}
      <nav className="dark:bg-background-dark/80 border-primary/10 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  document.documentElement.classList.toggle('dark')
                }
                className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-yellow-400 dark:hover:bg-slate-800"
              >
                <span className="material-icons dark:hidden">dark_mode</span>
                <span className="material-icons hidden dark:block">
                  light_mode
                </span>
              </button>
              <Link
                href="/"
                className="hover:text-primary text-sm font-bold text-slate-500 transition-colors"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-12 text-center duration-700">
          <span className="bg-primary/10 text-primary mb-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
            Tu opinión importa
          </span>
          <h1 className="mb-6 text-4xl leading-tight font-black md:text-5xl">
            ¿Qué producto quieres{' '}
            <span className="text-primary italic">reseñar</span> hoy?
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            Busca el dispositivo que estás usando y ayuda a otros chilenos a
            tomar una decisión inteligente.
          </p>
        </div>

        {/* Search Bar */}
        <div className="group relative mx-auto mb-16 max-w-2xl">
          <div className="from-primary/20 to-primary/10 absolute -inset-1 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity group-focus-within:opacity-100"></div>
          <div className="border-primary/5 relative flex items-center rounded-2xl border bg-white p-2 pr-6 shadow-xl dark:bg-slate-900">
            <div className="flex flex-1 items-center px-4">
              <span className="material-icons mr-3 text-slate-400">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Escribe el nombre del producto, marca o modelo..."
                className="w-full bg-transparent py-4 text-lg font-medium outline-none"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-400 transition-colors hover:text-slate-600"
              >
                <span className="material-icons text-xl">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Grid Results */}
        <div>
          <div className="mb-8 flex items-center justify-between px-2">
            <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              {searchQuery
                ? `Resultados para "${searchQuery}"`
                : 'Productos populares para reseñar'}
            </h2>
            <span className="text-[10px] font-medium text-slate-400">
              Mostrando {filteredProducts.length} productos
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/producto/${product.slug}/review`}
                className="group border-primary/5 hover:border-primary/20 flex items-center gap-6 rounded-3xl border bg-white p-4 shadow-sm transition-all hover:shadow-xl dark:bg-slate-900"
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-primary text-[10px] font-bold tracking-tighter uppercase">
                      {product.brand}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                    <span className="text-[10px] font-medium text-slate-500">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="group-hover:text-primary truncate text-lg font-bold text-slate-900 transition-colors dark:text-white">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="material-icons text-sm text-amber-400">
                      star
                    </span>
                    <span className="text-xs font-bold">{product.rating}</span>
                  </div>
                </div>
                <div className="bg-primary/5 group-hover:bg-primary rounded-xl p-2 transition-all group-hover:text-white">
                  <span className="material-icons">chevron_right</span>
                </div>
              </Link>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-12 text-center dark:border-slate-800 dark:bg-slate-800/50">
                <span className="material-icons mb-4 text-4xl text-slate-300">
                  sentiment_dissatisfied
                </span>
                <p className="font-bold text-slate-500">
                  No encontramos ese producto...
                </p>
                <button className="text-primary mt-4 font-bold hover:underline">
                  ¡Sugiérenos agregarlo!
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action for Expert Panel */}
        <div className="bg-primary shadow-primary/30 mt-24 flex flex-col items-center justify-between gap-8 rounded-3xl p-8 text-white shadow-2xl md:flex-row">
          <div className="max-w-md text-center md:text-left">
            <h3 className="mb-2 flex items-center justify-center gap-2 text-2xl font-black md:justify-start">
              <span className="material-icons">verified</span>
              ¿Eres un experto en nicho?
            </h3>
            <p className="font-medium text-blue-100">
              Únete a nuestro panel certificado y recibe beneficios exclusivos
              por tus reseñas profesionales.
            </p>
          </div>
          <button className="text-primary rounded-2xl bg-white px-8 py-4 font-black shadow-lg transition-all hover:bg-blue-50 active:scale-95">
            Postular al Panel
          </button>
        </div>
      </main>
    </div>
  )
}
