'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { useState, useEffect } from 'react'

export default function UserProfilePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data for the user
  const user = {
    name: 'Diego Martínez',
    handle: '@diegomtz',
    badge: 'Reviewer Bronce',
    bio: 'Amante de la tecnología y las buenas ofertas. Busco calidad y buen servicio post-venta.',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZYBVG4OLBumXdE6zKS18f-Yrx5mWOmeJ2rUJ9OuUJHSVKtQV4E2eXe2FBaS8brE1X2GwcRjghRH28ugSLfStAYX__u8nNk7XLYZQOWZMUX1TFFJTFzySvYv51QTZBc0MXOtyLUZs92eUvPO1LLG3WysGx0ALGoMSIjdZaj2w478FTLjkBsgBaWxwelMCAQQFc8oTC2Lb7RqeftJAr-VKeIruzdqHYjADIL26tbpbFax6WwiNbpXmz4e-i7HgwljgGCsZcpmeywWUz',
    stats: {
      followers: '1.2k',
      following: '248',
      reviews: '15',
    },
    progress: {
      current: 2,
      target: 5,
      percentage: 66,
    },
    favorites: [
      {
        id: 1,
        name: 'Headphones Gen 3 Pro Edition',
        price: 249000,
        rating: 4.8,
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC7lTyYtjV7lfup5per8LwvkXf1SeTKDEZDF1_VIT8DkzxmHVWRwofomAiDNp0PbZEMbgEC81--UFeLs5qTsitu45ucMs1vN_sfNmaK9zUksLod68kWQINHSv3O_AzekFnEa_ESel8nK0p_1fYEZFuyi3dPWz3bVsfVhX_N31uuc-sd8a_t_FZ_HxFYlGwXjEfAxHAxEc1n_rMMhnwNIXxsOWKMXysC677BstF_G2wq_TsuGU5feIODIz8M1sBLZEcOcaKB3YfLr73f',
      },
      {
        id: 2,
        name: 'Wireless Compact Earbuds',
        price: 89990,
        rating: 4.5,
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDyVelRa6DnGpDkK2j9pjMLrbbtu1EZgCbxIS3uQzwZ93nr8S7R13To5kpHaKKwBSPQAUnQlLXQ0KWY9dODJw4lUyRCROq9xISIkmIU777niLWj0NA-24V1STT6oi3BZq96WU5gglWrzqasevjQap4qOAjBMVST1GQXBvut3gJK8O7mPve6ODygURJn4Czh9y9p_deeEzP-qL1xT5aYVT9_YZ_id4fIIZ6FCCuS0pHM7AGjneTlPuNHoYHkCnYUvMCkW0zFaEHmvO74',
      },
    ],
    recentReviews: [
      {
        id: 1,
        product: 'Headphones Gen 3 Pro Edition',
        category: 'Electrónica',
        rating: 5,
        content:
          'La cancelación de ruido es simplemente otro nivel. Los usé en mi último viaje y la diferencia es abismal. La batería me duró todo el vuelo de ida y vuelta sin problemas.',
        detailedRatings: [
          { label: 'Relación Precio-Calidad', score: 5.0, percentage: 100 },
          { label: 'Seguridad de Envío', score: 4.5, percentage: 90 },
          { label: 'Post-Venta', score: 4.0, percentage: 80 },
        ],
        likes: 42,
        comments: 5,
        store: 'ElectroDirect',
        date: 'Hace 2 días',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC7lTyYtjV7lfup5per8LwvkXf1SeTKDEZDF1_VIT8DkzxmHVWRwofomAiDNp0PbZEMbgEC81--UFeLs5qTsitu45ucMs1vN_sfNmaK9zUksLod68kWQINHSv3O_AzekFnEa_ESel8nK0p_1fYEZFuyi3dPWz3bVsfVhX_N31uuc-sd8a_t_FZ_HxFYlGwXjEfAxHAxEc1n_rMMhnwNIXxsOWKMXysC677BstF_G2wq_TsuGU5feIODIz8M1sBLZEcOcaKB3YfLr73f',
      },
    ],
  }

  if (!mounted) return null

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
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-yellow-400 dark:hover:bg-slate-800"
            >
              <span className="material-icons dark:hidden">dark_mode</span>
              <span className="material-icons hidden dark:block">
                light_mode
              </span>
            </button>
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-900"></span>
            </button>
            <div className="ml-2 flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-800">
              <div className="flex hidden flex-col items-end sm:flex">
                <span className="text-xs font-black tracking-tight">
                  {user.name}
                </span>
                <span className="text-primary text-[10px] font-bold tracking-tighter uppercase">
                  Premium
                </span>
              </div>
              <div className="border-primary/20 relative h-10 w-10 overflow-hidden rounded-full border-2 shadow-lg">
                <Image
                  src={user.avatar}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
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
                  <span className="material-symbols-outlined fill-1">
                    reviews
                  </span>
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
            <div className="from-primary shadow-primary/30 group relative overflow-hidden rounded-3xl bg-gradient-to-br to-blue-700 p-8 text-white shadow-2xl">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-all group-hover:bg-white/20"></div>
              <p className="mb-3 flex items-center gap-2 text-sm font-black">
                <span className="material-icons text-lg">
                  workspace_premium
                </span>
                ¡Conviértete en Experto!
              </p>
              <p className="mb-6 text-xs leading-relaxed font-medium text-blue-100">
                Escribe 3 reseñas más para obtener tu insignia de verificado y
                beneficios exclusivos.
              </p>
              <div className="mb-3 h-2.5 w-full overflow-hidden rounded-full bg-black/20">
                <div
                  className="h-full bg-white transition-all duration-1000"
                  style={{ width: `${user.progress.percentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-blue-100 uppercase">
                  {user.progress.current}/{user.progress.target} RESEÑAS
                </span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-black">
                  FALTAN 3
                </span>
              </div>
            </div>
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
                      <Image
                        src={user.avatar}
                        alt="Perfil"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <span className="absolute right-2 bottom-2 h-7 w-7 rounded-full border-4 border-white bg-emerald-500 shadow-lg dark:border-slate-900"></span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-3 flex flex-col gap-4 md:flex-row md:items-center">
                    <h2 className="text-3xl font-black tracking-tight">
                      {user.name}
                    </h2>
                    <span className="bg-primary/10 text-primary border-primary/10 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                      {user.badge}
                    </span>
                  </div>
                  <p className="mb-6 max-w-xl text-sm leading-relaxed font-medium text-slate-500 italic opacity-80 dark:text-slate-400">
                    "{user.bio}"
                  </p>
                  <div className="flex items-center justify-center gap-10 md:justify-start">
                    <div className="text-center md:text-left">
                      <span className="block text-2xl font-black tabular-nums">
                        {user.stats.followers}
                      </span>
                      <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        Seguidores
                      </span>
                    </div>
                    <div className="border-primary/5 border-x px-10 text-center md:text-left">
                      <span className="block text-2xl font-black tabular-nums">
                        {user.stats.following}
                      </span>
                      <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        Siguiendo
                      </span>
                    </div>
                    <div className="text-center md:text-left">
                      <span className="block text-2xl font-black tabular-nums">
                        {user.stats.reviews}
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {user.favorites.map((product) => (
                  <div
                    key={product.id}
                    className="border-primary/5 group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all hover:shadow-2xl dark:bg-slate-900"
                  >
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-50 p-6 dark:bg-slate-800">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                      />
                      <button className="absolute top-4 right-4 rounded-2xl bg-white/90 p-2.5 text-red-500 shadow-xl backdrop-blur-md transition-all active:scale-90 dark:bg-slate-800/90">
                        <span className="material-icons text-base">
                          favorite
                        </span>
                      </button>
                    </div>
                    <div className="p-6">
                      <h4 className="group-hover:text-primary mb-3 line-clamp-1 text-sm font-black tracking-tight transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-primary text-lg font-black">
                          ${product.price.toLocaleString('es-CL')}
                        </span>
                        <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-2 py-1 dark:bg-amber-900/20">
                          <span className="material-icons text-xs text-amber-400">
                            star
                          </span>
                          <span className="text-[10px] font-black text-amber-700 dark:text-amber-400">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-primary/10 hover:bg-primary/5 hover:border-primary/30 group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-slate-50 p-8 transition-all dark:bg-slate-900/40">
                  <span className="material-symbols-outlined group-hover:text-primary mb-4 text-4xl text-slate-300 transition-colors">
                    add_circle
                  </span>
                  <p className="group-hover:text-primary text-xs font-black tracking-widest text-slate-400 uppercase transition-colors">
                    Agregar nuevo
                  </p>
                </div>
              </div>
            </section>

            {/* Recent Reviews */}
            <section>
              <div className="mb-8 flex items-end justify-between px-2">
                <h3 className="text-2xl font-black tracking-tight">
                  Reseñas Recientes
                </h3>
                <div className="border-primary/5 flex items-center gap-3 rounded-xl border bg-white px-4 py-2 text-sm text-slate-500 dark:bg-slate-900">
                  <span className="text-xs font-bold tracking-widest uppercase">
                    Ordenar por:
                  </span>
                  <select className="text-primary cursor-pointer border-none bg-transparent py-0 pl-1 text-xs font-black tracking-widest uppercase outline-none focus:ring-0">
                    <option>Más recientes</option>
                    <option>Mejor puntuadas</option>
                  </select>
                </div>
              </div>

              <div className="space-y-8">
                {user.recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-primary/5 rounded-3xl border bg-white p-8 shadow-xl transition-all hover:shadow-2xl dark:bg-slate-900"
                  >
                    <div className="mb-8 flex flex-col gap-8 md:flex-row">
                      <div className="group relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                        <Image
                          src={review.image}
                          alt="Product"
                          fill
                          className="object-contain transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
                          <div>
                            <p className="text-primary mb-1 text-[10px] font-black tracking-widest uppercase">
                              {review.category}
                            </p>
                            <h4 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                              {review.product}
                            </h4>
                          </div>
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
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="relative">
                        <span className="material-icons text-primary/10 absolute -top-4 -left-2 text-5xl select-none">
                          format_quote
                        </span>
                        <p className="relative z-10 pl-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                          "{review.content}"
                        </p>
                      </div>

                      <div className="border-primary/5 grid grid-cols-1 gap-8 border-y py-8 md:grid-cols-3">
                        {review.detailedRatings.map((rating, i) => (
                          <div key={i} className="flex flex-col gap-3">
                            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                              {rating.label}
                            </span>
                            <div className="flex items-center gap-4">
                              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                <div
                                  className="bg-primary h-full transition-all duration-1000"
                                  style={{ width: `${rating.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-primary text-xs font-black tabular-nums">
                                {rating.score.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-6">
                          <button className="hover:text-primary group flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors">
                            <span className="material-symbols-outlined group-hover:fill-1 text-xl transition-all">
                              thumb_up
                            </span>
                            <span>{review.likes} Me gusta</span>
                          </button>
                          <button className="hover:text-primary group flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors">
                            <span className="material-symbols-outlined group-hover:fill-1 text-xl transition-all">
                              comment
                            </span>
                            <span>{review.comments} Comentarios</span>
                          </button>
                        </div>
                        <span className="text-[10px] font-bold tracking-tighter text-slate-400 uppercase italic">
                          Tienda: {review.store} • {review.date}
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
                La comunidad #1 de reseñas honestas y comparativa de precios en
                Chile.
              </p>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-black tracking-widest uppercase">
                Plataforma
              </h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Cómo funciona
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Tiendas verificadas
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Blog de expertos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-black tracking-widest uppercase">
                Soporte
              </h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Centro de ayuda
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Normas de la comunidad
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Reportar abuso
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-black tracking-widest uppercase">
                Síguenos
              </h4>
              <div className="flex gap-4">
                {[
                  { i: 'facebook', l: 'Facebook' },
                  { i: 'camera_alt', l: 'Instagram' },
                  { i: 'alternate_email', l: 'Email' },
                ].map((item, i) => (
                  <button
                    key={i}
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
              © 2026 Revius.cl - Todos los derechos reservados. Made with{' '}
              <span className="text-red-500">❤️</span> for reviewers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
