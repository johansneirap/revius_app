'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { useState, useEffect } from 'react'

export default function StoreProfilePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data for the store
  const store = {
    name: 'TechNova Direct',
    verified: true,
    category: 'Hardware Global & Electrónica High-End',
    rating: 4.2,
    reviewsCount: 12840,
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkUo7wxrzysLmn49Ex6_9voJsEQR52wGcA-HbTdjRIOaYmVYXzNPcrEwvp2qG0FNp2stNBfMu9XR8YsvLe0l3fSmXpcSK8qJql3LPafnL1Q1_bo9s11_fGAtpCc2dSabvIPr0Nk6NvetNC3uK-o8uFDvOVIuxPbw29-rG742y34R6pi2rXJv-1O4Xw4u5JUkicY5w9NVshgoeyWGnBMxgnPXfYUh_FTykCfabRaG1PQfPTmA-QihG7TbV49K5fXMIPqaJK9ywHUj6k',
    reputation: [
      {
        label: 'Velocidad de Envío',
        score: 4.8,
        percentage: 96,
        color: 'bg-emerald-500',
      },
      {
        label: 'Soporte al Cliente',
        score: 3.9,
        percentage: 78,
        color: 'bg-primary',
      },
      {
        label: 'Calidad de Empaque',
        score: 4.5,
        percentage: 90,
        color: 'bg-primary',
      },
    ],
    stats: {
      responseTime: '~2 Horas',
      returnRate: '1.2%',
    },
    deals: [
      {
        name: 'NovaVision 34" Curved Gaming Monitor',
        price: 349990,
        oldPrice: 429990,
        discount: true,
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAsEOz4ePXFOFRun-L-D8HwkSEjQ0RoVPbSvzn416ip1bKSBDmAHcDLFbJtW7slfRzjw1nc9CpSSNV9OdgwsbROPpZAdg6IKzhEM0bUDWhObCAvo6RmtGMCmjL4pm8rPs4Fi3Z3EWsmduuJwT-uPd01_igV20JzpMgiUOClIWUeEKQmQyVrgQpTN9nvHIn1GyLJfCJl2i_2QZWU2spzah3SnUDKvzrL8x5u9nGG5EYkghkf9-ycz-BP7Mq6fTaknJI2zN8boU-tA0nv',
      },
      {
        name: 'ProClick Mechanical Keyboard RGB',
        price: 129000,
        badge: 'Best Price',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAIn1mIMmQ2LlvWUbCYKIwEqpbBY75WHztyr2ajFZ5wXY0bwDgO3hb6qEhzVYInNOUQxmcjnEkGOhpXXXkcRg69gFQQ2KMCVjxcYyev6i5fiz9G3kSD0fycf9vsd_KgK06b4EWfCk96j0fqaj-JKfdKTgyH4iLOiB3_ValuePgOqV7geyVOLFBMQXS1pUElOkLHnDJh03PXyD1wRuo-NauE7gRb4C4Wb-_CkwPRKMzpa2lvNGoKsOYgvfOmUse7EQ7fDVOQkCKqKL1p',
      },
    ],
  }

  if (!mounted) return null

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
                href="/login"
                className="bg-primary shadow-primary/20 hover:bg-primary/90 flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all"
              >
                <span className="material-icons text-sm">person</span>
                Ingresar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Store Hero Section */}
        <section className="animate-in fade-in slide-in-from-top-4 mb-12 duration-700">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-8">
              <div className="border-primary/10 group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border bg-white p-3 shadow-xl dark:bg-slate-800">
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={128}
                  height={128}
                  className="max-h-full max-w-full rounded-lg transition-transform group-hover:scale-110"
                />
              </div>
              <div className="pt-2">
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-4xl font-black tracking-tight">
                    {store.name}
                  </h1>
                  <span
                    className="material-icons text-primary text-2xl"
                    title="Verified Retailer"
                  >
                    verified
                  </span>
                </div>
                <p className="flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400">
                  <span className="material-icons text-primary text-base">
                    location_on
                  </span>{' '}
                  {store.category}
                </p>
                <div className="mt-4 flex items-center gap-6">
                  <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 font-black text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    <span className="material-symbols-outlined fill-1 text-lg">
                      star
                    </span>
                    {store.rating}
                  </div>
                  <span className="text-sm font-bold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                    {store.reviewsCount.toLocaleString()} Reseñas Verificadas
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="border-primary/10 hover:bg-primary/5 dark:hover:bg-primary/10 flex flex-1 items-center justify-center gap-3 rounded-2xl border bg-white px-8 py-4 font-bold text-slate-700 shadow-lg transition-all active:scale-95 md:flex-none dark:bg-slate-800 dark:text-slate-200">
                <span className="material-icons text-lg">share</span> Compartir
              </button>
              <button className="bg-primary hover:bg-primary/90 shadow-primary/30 flex flex-1 items-center justify-center gap-3 rounded-2xl px-8 py-4 font-black text-white shadow-xl transition-all active:scale-95 md:flex-none">
                Ver Sitio Web{' '}
                <span className="material-icons text-lg">open_in_new</span>
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Reputation & Sidebar */}
          <aside className="space-y-8 lg:col-span-4">
            {/* Reputation Scorecard */}
            <div className="border-primary/5 rounded-3xl border bg-white p-8 shadow-xl dark:bg-slate-900">
              <h2 className="mb-8 flex items-center gap-3 text-xl font-black">
                <span className="material-symbols-outlined text-primary">
                  analytics
                </span>
                Reputación Revius
              </h2>
              <div className="space-y-8">
                {store.reputation.map((item, i) => (
                  <div key={i}>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                        {item.label}
                      </span>
                      <span className="text-sm font-black text-slate-900 tabular-nums dark:text-white">
                        {item.score}/5
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className={`${item.color} h-full rounded-full transition-all duration-1000`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
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
                      {store.stats.responseTime}
                    </p>
                  </div>
                  <div className="bg-primary/10 h-10 w-px"></div>
                  <div className="flex-1 text-center">
                    <p className="mb-1 text-[10px] font-black tracking-widest text-slate-500 uppercase">
                      Tasa Devolución
                    </p>
                    <p className="text-lg font-black text-emerald-500">
                      {store.stats.returnRate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expert Highlights */}
            <div className="border-primary/5 rounded-3xl border bg-white p-8 shadow-xl dark:bg-slate-900">
              <h2 className="mb-6 flex items-center gap-3 text-xl font-black">
                <span className="material-symbols-outlined text-primary">
                  verified
                </span>
                Opinión de Expertos
              </h2>
              <div className="space-y-6">
                <div className="bg-primary/5 dark:bg-primary/10 border-primary/10 relative rounded-2xl border p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-200 dark:border-slate-800">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGKFcMkje2kfUV6EwmcjmK9Kr1iabYdrGQPDr-6b4eitXucRtJhflGNCHj_yIdY6XNQ9pMBrgQDlTdq_hWungFar3zT18M5r1z6gnVTsAhvbO0iYIqhXan0_RJocdZvnxvCN06iDhkYiB35aJYQWbQ-2g4uWXGJfxKnzIVBxJDn_ZDBoOdXsuZFgqumq1AYFwrGxRZh5NP5SO-oYQIZHoIMV4TUhnrAydmYh2W4UmIR6lAe3Q21Vph6fLxx2y7ga-z0n5I92IJ6LLv"
                        fill
                        alt="Expert"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-black tracking-tight">
                      @TechChileGuru
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 italic dark:text-slate-300">
                    "Envío ultra rápido para GPUs. El soporte postventa en Chile
                    es de lo mejor."
                  </p>
                  <span className="material-icons text-primary/20 absolute top-6 right-6 text-4xl">
                    format_quote
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Shipping Info */}
            <div className="group relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
              <div className="bg-primary/20 group-hover:bg-primary/40 absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full blur-3xl transition-all"></div>
              <h3 className="relative z-10 mb-6 text-xl font-black">
                Envío & Devolución
              </h3>
              <ul className="relative z-10 space-y-5 text-sm font-medium">
                <li className="flex items-center gap-4">
                  <span className="material-icons text-primary bg-primary/10 rounded-xl p-2">
                    local_shipping
                  </span>
                  Gratis sobre $50.000
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-icons text-primary bg-primary/10 rounded-xl p-2">
                    history
                  </span>
                  30 días de satisfacción
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-icons text-primary bg-primary/10 rounded-xl p-2">
                    shield
                  </span>
                  Embalaje de seguridad Pro
                </li>
              </ul>
            </div>
          </aside>

          {/* Right Column: Products & Reviews */}
          <div className="space-y-12 lg:col-span-8">
            {/* Navigation Tabs */}
            <div className="border-primary/10 flex border-b">
              <button className="text-primary border-primary border-b-4 px-8 py-5 text-sm font-black tracking-widest uppercase">
                Ofertas (14)
              </button>
              <button className="px-8 py-5 text-sm font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-slate-900 dark:hover:text-white">
                Reseñas (12k+)
              </button>
              <button className="px-8 py-5 text-sm font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-slate-900 dark:hover:text-white">
                Información
              </button>
            </div>

            {/* Deals Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black">
                  Mejores Ofertas en TechNova
                </h2>
                <select className="border-primary/10 focus:border-primary rounded-xl border-2 bg-white px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all outline-none dark:bg-slate-900">
                  <option>Menor Precio</option>
                  <option>Más Popular</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {store.deals.map((deal, i) => (
                  <div
                    key={i}
                    className="group border-primary/5 relative flex gap-6 overflow-hidden rounded-3xl border bg-white p-5 transition-all hover:shadow-2xl dark:bg-slate-900"
                  >
                    <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                      <Image
                        src={deal.image}
                        alt={deal.name}
                        fill
                        className="object-contain transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <h3 className="group-hover:text-primary leading-tight font-bold text-slate-900 transition-colors dark:text-white">
                          {deal.name}
                        </h3>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-primary text-xl font-black">
                            ${deal.price.toLocaleString('es-CL')}
                          </span>
                          {deal.oldPrice && (
                            <span className="text-sm font-medium text-slate-400 line-through">
                              ${deal.oldPrice.toLocaleString('es-CL')}
                            </span>
                          )}
                          {deal.badge && (
                            <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black tracking-tighter text-emerald-600 uppercase dark:text-emerald-400">
                              {deal.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="hover:bg-primary mt-4 w-full transform rounded-xl bg-slate-50 py-3 text-xs font-black text-slate-900 shadow-sm transition-all hover:text-white active:scale-95 dark:bg-slate-800 dark:text-white">
                        Ver Oferta
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reviews Summary */}
            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black">
                  Experiencias de Clientes
                </h2>
                <Link
                  href="/escribir-resena"
                  className="text-primary flex items-center gap-2 text-sm font-black hover:underline"
                >
                  <span className="material-icons text-sm">edit</span> Escribir
                  Reseña
                </Link>
              </div>

              <div className="space-y-6">
                {/* Review Item */}
                <div className="border-primary/5 rounded-3xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black">
                        JD
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                          James D.{' '}
                          <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-black tracking-tighter text-white uppercase">
                            Compra Verificada
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-500">
                          Compró: NovaVision Monitor • Hace 2 días
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined fill-1 text-sm"
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mb-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                    "Increíble velocidad de entrega. Pedí el martes por la
                    mañana y llegó el miércoles por la tarde. El embalaje fue
                    super robusto, con triple caja para el monitor. El soporte
                    al cliente también me ayudó a cambiar mi dirección."
                  </p>
                  <div className="border-primary/5 flex flex-wrap gap-2 border-t pt-4">
                    {['Envío Rápido', 'Gran Embalaje', 'Soporte Pro'].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-xl bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <button className="border-primary/10 hover:border-primary/30 hover:bg-primary/5 hover:text-primary w-full rounded-3xl border-2 border-dashed py-5 text-sm font-black tracking-widest text-slate-400 uppercase transition-all dark:text-slate-500">
                  Cargar Más Reseñas
                </button>
              </div>
            </div>
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
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Guía de Reseñas
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Comprador Verificado
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
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
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
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
              © 2026 Revius.cl - Reputación que Importa.
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
