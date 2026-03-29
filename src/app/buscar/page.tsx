'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { useState, useEffect } from 'react'

export default function SearchPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('productos')

  useEffect(() => {
    setMounted(true)
  }, [])

  const products = [
    {
      id: 1,
      name: 'Audífonos Premium Gen 3',
      description: 'Next-gen audio con ANC adaptativo',
      price: 249900,
      rating: 4.8,
      reviewsCount: 1200,
      stores: 12,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC7lTyYtjV7lfup5per8LwvkXf1SeTKDEZDF1_VIT8DkzxmHVWRwofomAiDNp0PbZEMbgEC81--UFeLs5qTsitu45ucMs1vN_sfNmaK9zUksLod68kWQINHSv3O_AzekFnEa_ESel8nK0p_1fYEZFuyi3dPWz3bVsfVhX_N31uuc-sd8a_t_FZ_HxFYlGwXjEfAxHAxEc1n_rMMhnwNIXxsOWKMXysC677BstF_G2wq_TsuGU5feIODIz8M1sBLZEcOcaKB3YfLr73f',
    },
    {
      id: 2,
      name: 'Studio Master Wireless',
      description: 'Diseño ergonómico para estudio',
      price: 189900,
      rating: 4.5,
      reviewsCount: 856,
      stores: 8,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDHaOcQOKQ9ZB5P1LAwUgrVPd2kwA66qbmIjKmforRorg2SbBxzoNslWw0owfoSSuAXtXGliDm8s44NdSAFMKHG4qD3-2eye3uRrdDIrKgezcNgNcbHsHfOAyNpAi0tjiqI_FcLmmjJoWHISTGvQQ96seWO6vTQwiXXEUGf9-PcInz22nXt4NNopnOU9uQs3IzkwiHRbi07LIEuPGIkgsoPfpPHKTSrdXp9f_-mFgGeTOMIx8_RHKLHd70pxExtTiq0rR3yJwdzLs6k',
    },
    {
      id: 3,
      name: 'Compact Bass Pods',
      description: 'Bajos profundos en formato mini',
      price: 89900,
      rating: 4.2,
      reviewsCount: 432,
      stores: 5,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDyVelRa6DnGpDkK2j9pjMLrbbtu1EZgCbxIS3uQzwZ93nr8S7R13To5kpHaKKwBSPQAUnQlLXQ0KWY9dODJw4lUyRCROq9xISIkmIU777niLWj0NA-24V1STT6oi3BZq96WU5gglWrzqasevjQap4qOAjBMVST1GQXBvut3gJK8O7mPve6ODygURJn4Czh9y9p_deeEzP-qL1xT5aYVT9_YZ_id4fIIZ6FCCuS0pHM7AGjneTlPuNHoYHkCnYUvMCkW0zFaEHmvO74',
    },
  ]

  const stores = [
    {
      id: 1,
      name: 'Amzn Store',
      initials: 'AM',
      verified: true,
      rating: 4.9,
      sales: '12k+',
      status: 'Reputación excelente',
    },
    {
      id: 2,
      name: 'ElectroDirect',
      initials: 'ED',
      verified: false,
      rating: 4.5,
      sales: '5k+',
      status: 'Buena atención',
    },
  ]

  if (!mounted) return null

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen text-slate-900 transition-colors dark:text-slate-100">
      {/* Header */}
      <header className="border-primary/10 sticky top-0 z-50 border-b bg-white/95 py-3 shadow-md backdrop-blur-md dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="group relative max-w-2xl flex-grow">
            <span className="material-symbols-outlined group-focus-within:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors">
              search
            </span>
            <input
              className="focus:border-primary/20 w-full rounded-2xl border-2 border-transparent bg-slate-100 py-3 pr-4 pl-12 text-sm shadow-inner transition-all outline-none focus:bg-white dark:bg-slate-800 dark:focus:bg-slate-900"
              placeholder="Buscar productos, tiendas o personas..."
              type="text"
              defaultValue="Audífonos noise cancelling"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-yellow-400 dark:hover:bg-slate-800"
            >
              <span className="material-icons dark:hidden">dark_mode</span>
              <span className="material-icons hidden dark:block">
                light_mode
              </span>
            </button>
            <button className="hover:text-primary relative p-2 text-slate-500 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-white bg-red-500 dark:border-slate-900"></span>
            </button>
            <Link
              href="/perfil"
              className="border-primary/20 hover:border-primary/50 h-10 w-10 overflow-hidden rounded-full border-2 shadow-lg transition-all"
            >
              <Image
                alt="Profile"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZYBVG4OLBumXdE6zKS18f-Yrx5mWOmeJ2rUJ9OuUJHSVKtQV4E2eXe2FBaS8brE1X2GwcRjghRH28ugSLfStAYX__u8nNk7XLYZQOWZMUX1TFFJTFzySvYv51QTZBc0MXOtyLUZs92eUvPO1LLG3WysGx0ALGoMSIjdZaj2w478FTLjkBsgBaWxwelMCAQQFc8oTC2Lb7RqeftJAr-VKeIruzdqHYjADIL26tbpbFax6WwiNbpXmz4e-i7HgwljgGCsZcpmeywWUz"
              />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Breadcrumbs & Results Info */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <nav className="flex items-center gap-3 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            <Link className="hover:text-primary transition-colors" href="/">
              Inicio
            </Link>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-slate-900 dark:text-slate-300">
              Búsqueda Universal
            </span>
          </nav>
          <p className="text-sm font-bold text-slate-500">
            Se encontraron{' '}
            <span className="text-primary font-black">1,240</span> resultados
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="border-primary/5 mb-10 border-b">
          <div className="flex gap-10 overflow-x-auto pb-px">
            {[
              {
                id: 'productos',
                label: 'Productos',
                count: 856,
                icon: 'shopping_bag',
              },
              { id: 'tiendas', label: 'Tiendas', count: 24, icon: 'store' },
              { id: 'personas', label: 'Personas', count: 12, icon: 'group' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 border-b-4 pb-4 text-xs font-black tracking-widest whitespace-nowrap uppercase transition-all ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                <span
                  className={`material-symbols-outlined text-xl ${activeTab === tab.id ? 'fill-1' : ''}`}
                >
                  {tab.icon}
                </span>
                {tab.label}{' '}
                <span className="text-[10px] opacity-50">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Filters Aside */}
          <aside className="animate-in slide-in-from-left-4 space-y-10 duration-500 lg:col-span-3">
            <div>
              <h3 className="mb-6 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                Categoría
              </h3>
              <div className="space-y-3">
                {['Electrónica', 'Audio & Música', 'Computación'].map(
                  (cat, i) => (
                    <label
                      key={cat}
                      className="group flex cursor-pointer items-center gap-4"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked={i === 0}
                          className="peer border-primary/20 checked:bg-primary checked:border-primary h-5 w-5 cursor-pointer appearance-none rounded-md border-2 transition-all"
                        />
                        <span className="material-icons pointer-events-none absolute left-1 text-xs text-white opacity-0 peer-checked:opacity-100">
                          check
                        </span>
                      </div>
                      <span className="group-hover:text-primary text-sm font-bold transition-colors">
                        {cat}
                      </span>
                      <span className="ml-auto text-[10px] font-black text-slate-300 tabular-nums">
                        432
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                Rango de Precio
              </h3>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="group relative">
                    <span className="group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-xs font-black text-slate-400 transition-colors">
                      $
                    </span>
                    <input
                      className="border-primary/5 focus:border-primary/20 w-full rounded-xl border-2 py-2.5 pr-3 pl-7 text-xs font-bold transition-all outline-none dark:bg-slate-900/50"
                      placeholder="Min"
                      type="number"
                    />
                  </div>
                  <div className="group relative">
                    <span className="group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-xs font-black text-slate-400 transition-colors">
                      $
                    </span>
                    <input
                      className="border-primary/5 focus:border-primary/20 w-full rounded-xl border-2 py-2.5 pr-3 pl-7 text-xs font-bold transition-all outline-none dark:bg-slate-900/50"
                      placeholder="Max"
                      type="number"
                    />
                  </div>
                </div>
                <button className="w-full rounded-xl bg-slate-900 py-3 text-[10px] font-black tracking-widest text-white uppercase shadow-lg transition-all hover:opacity-90 active:scale-95 dark:bg-white dark:text-slate-900">
                  Aplicar Filtro
                </button>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                Región (Chile)
              </h3>
              <div className="relative">
                <select className="border-primary/5 focus:border-primary/20 w-full cursor-pointer appearance-none rounded-xl border-2 px-4 py-3 text-xs font-bold outline-none dark:bg-slate-900/50">
                  <option>Todas las regiones</option>
                  <option>Metropolitana</option>
                  <option>Valparaíso</option>
                  <option>Biobío</option>
                </select>
                <span className="material-icons pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-slate-400">
                  expand_more
                </span>
              </div>
            </div>

            <div className="from-primary/5 to-primary/10 border-primary/10 rounded-3xl border bg-gradient-to-br p-6 shadow-inner">
              <p className="text-primary mb-3 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                <span className="material-icons text-sm">lightbulb</span>
                Sugerencia
              </p>
              <p className="text-xs leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                ¿No encuentras lo que buscas? Intenta usar términos más
                generales o limpia los filtros activos.
              </p>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 duration-700 lg:col-span-9">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black tracking-tight">
                {activeTab === 'productos'
                  ? 'Productos Populares'
                  : activeTab === 'tiendas'
                    ? 'Tiendas Destacadas'
                    : 'Comunidad Encontrada'}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Ordenar por:
                </span>
                <select className="text-primary cursor-pointer border-none bg-transparent text-xs font-black tracking-widest uppercase outline-none focus:ring-0">
                  <option>Más relevantes</option>
                  <option>Precio: Menor a Mayor</option>
                  <option>Mejor calificados</option>
                </select>
              </div>
            </div>

            {activeTab === 'productos' && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group border-primary/5 overflow-hidden rounded-[2.5rem] border bg-white shadow-xl transition-all duration-500 hover:shadow-2xl dark:bg-slate-900"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 p-8 dark:bg-slate-800">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-5 right-5">
                        <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-slate-400 shadow-xl backdrop-blur transition-all hover:text-red-500 active:scale-90 dark:bg-slate-800/90">
                          <span className="material-symbols-outlined text-xl">
                            favorite
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 dark:bg-amber-900/20">
                          <span className="material-symbols-outlined fill-1 text-[14px] text-amber-500">
                            star
                          </span>
                          <span className="text-xs font-black text-amber-700 dark:text-amber-400">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          ({product.reviewsCount} reviews)
                        </span>
                      </div>
                      <h3 className="group-hover:text-primary mb-2 line-clamp-1 text-xl font-black tracking-tight text-slate-900 transition-colors dark:text-white">
                        {product.name}
                      </h3>
                      <p className="mb-6 text-xs leading-relaxed font-medium text-slate-500 italic opacity-70">
                        {product.description}
                      </p>
                      <div className="border-primary/5 flex items-end justify-between border-t pt-6">
                        <div>
                          <p className="mb-1 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                            Desde
                          </p>
                          <p className="text-primary text-2xl font-black">
                            ${product.price.toLocaleString('es-CL')}
                          </p>
                        </div>
                        <span className="border-primary/5 rounded-xl border bg-slate-50 px-3 py-1.5 text-[10px] font-black tracking-widest text-slate-500 uppercase shadow-sm dark:bg-slate-800">
                          {product.stores} Tiendas
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tiendas' && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    className="border-primary/5 group flex cursor-pointer items-center gap-8 rounded-[2rem] border bg-white p-8 shadow-xl transition-all hover:shadow-2xl dark:bg-slate-900"
                  >
                    <div className="group-hover:bg-primary flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-2xl font-black text-slate-400 shadow-inner transition-all group-hover:text-white dark:bg-slate-800">
                      {store.initials}
                    </div>
                    <div className="flex-grow">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-xl font-black tracking-tight">
                          {store.name}
                        </h3>
                        {store.verified && (
                          <span className="material-symbols-outlined text-primary fill-1 text-xl">
                            verified
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 dark:bg-amber-900/20">
                          <span className="material-symbols-outlined fill-1 text-sm text-amber-500">
                            stars
                          </span>
                          <span className="text-xs font-black text-amber-700 dark:text-amber-400">
                            {store.rating}
                          </span>
                        </div>
                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                          {store.sales} Ventas
                        </span>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black tracking-widest text-emerald-500 uppercase dark:bg-emerald-900/20">
                          {store.status}
                        </span>
                      </div>
                    </div>
                    <span className="material-icons group-hover:text-primary text-slate-300 transition-all group-hover:translate-x-1">
                      chevron_right
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Community Promo Banner */}
            <div className="group relative mt-20 overflow-hidden rounded-[3rem] bg-slate-900 p-10 text-white shadow-2xl md:p-16 dark:bg-slate-800">
              <div className="bg-primary/20 group-hover:bg-primary/30 absolute top-0 right-0 h-96 w-96 rounded-full blur-[100px] transition-all"></div>
              <div className="relative z-10 md:max-w-lg">
                <span className="mb-8 inline-block rounded-full border border-white/10 bg-white/10 px-5 py-2 text-[10px] font-black tracking-[0.2em] text-white uppercase backdrop-blur-md">
                  Comunidad Revius
                </span>
                <h2 className="mb-6 text-4xl leading-tight font-black tracking-tighter italic md:text-5xl">
                  Conecta con los expertos
                </h2>
                <p className="mb-10 text-lg leading-relaxed font-medium text-slate-400">
                  Sigue a personas que ya probaron estos productos y toma la
                  mejor decisión basada en{' '}
                  <span className="text-white">experiencias reales</span>.
                </p>
                <div className="mb-10 flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="relative h-14 w-14 overflow-hidden rounded-full border-4 border-slate-900 bg-slate-700 shadow-2xl"
                      >
                        <Image
                          fill
                          src={`https://lh3.googleusercontent.com/aida-public/AB6AXuBZYBVG4OLBumXdE6zKS18f-Yrx5mWOmeJ2rUJ9OuUJHSVKtQV4E2eXe2FBaS8brE1X2GwcRjghRH28ugSLfStAYX__u8nNk7XLYZQOWZMUX1TFFJTFzySvYv51QTZBc0MXOtyLUZs92eUvPO1LLG3WysGx0ALGoMSIjdZaj2w478FTLjkBsgBaWxwelMCAQQFc8oTC2Lb7RqeftJAr-VKeIruzdqHYjADIL26tbpbFax6WwiNbpXmz4e-i7HgwljgGCsZcpmeywWUz`}
                          alt="User"
                        />
                      </div>
                    ))}
                    <div className="bg-primary relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-900 text-xs font-black shadow-2xl">
                      +12k
                    </div>
                  </div>
                  <p className="text-primary text-xs font-black tracking-widest uppercase">
                    Usuarios Activos
                  </p>
                </div>
                <button className="rounded-2xl bg-white px-10 py-5 text-xs font-black tracking-widest text-slate-900 uppercase shadow-2xl transition-all hover:scale-105 active:scale-95">
                  Explorar Personas
                </button>
              </div>
              <div className="pointer-events-none absolute top-0 right-0 h-full w-2/3 opacity-30 transition-opacity group-hover:opacity-40">
                <Image
                  fill
                  className="object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO8I5rhUdqFMyU-OYEZvxAygQV4UhRvjFbNE2eNZyDNtdyVqYmeZhwXNrr15iDf4yaOPNyjU2aV5cRSChwRosbWca_pHwEs-Ty-JsUdvIDB04fmGRPcp3HFpP1wu4L-wcY-3LlBGoJazT3rnjybM2FIbO2bsLt4kwU2lb3scvRZ1sY6kHOpdQFqDOBHZloTsecfWlpReJyb5jeI1ir2Hr0ungw9cPCqFFsc9S2qe_1Sb68weF1leIyBt_O7JDhvBTqgPh8l0QSzknt"
                  alt="Community"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-primary/10 mt-24 border-t bg-white py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <Logo />
              <p className="mt-8 text-sm leading-relaxed font-medium text-slate-500">
                La plataforma número uno en Chile para comparar precios y leer
                reseñas reales de la comunidad.
              </p>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-black tracking-widest text-slate-400 uppercase">
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
                    Tiendas asociadas
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Categorías
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Comunidad
              </h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Guías de compra
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Top Influencers
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="/escribir-resena"
                  >
                    Escribir una reseña
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Newsletter
              </h4>
              <p className="mb-6 text-xs font-medium text-slate-500">
                Recibe las mejores ofertas y reseñas en tu correo.
              </p>
              <div className="border-primary/5 group flex gap-2 rounded-2xl border bg-slate-50 p-1.5 shadow-inner dark:bg-slate-900">
                <input
                  className="flex-1 rounded-xl border-none bg-transparent px-4 py-3 text-xs font-bold outline-none"
                  placeholder="Tu email"
                  type="email"
                />
                <button className="bg-primary relative overflow-hidden rounded-xl p-3 text-white shadow-lg transition-all active:scale-90">
                  <span className="material-symbols-outlined relative z-10 text-sm">
                    send
                  </span>
                  <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform group-focus-within:translate-y-0"></div>
                </button>
              </div>
            </div>
          </div>
          <div className="border-primary/5 flex flex-col items-center justify-between gap-6 border-t pt-10 text-[10px] font-black tracking-widest text-slate-400 uppercase md:flex-row">
            <p>© 2026 Revius.cl - Transparencia en tus compras.</p>
            <div className="flex gap-10">
              <Link className="hover:text-primary transition-colors" href="#">
                Términos
              </Link>
              <Link className="hover:text-primary transition-colors" href="#">
                Privacidad
              </Link>
              <Link className="hover:text-primary transition-colors" href="#">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
