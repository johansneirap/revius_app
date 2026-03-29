'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/Logo'

const sidebarLinks = [
  { name: 'Dashboard', icon: 'dashboard', active: true },
  { name: 'Reseñas', icon: 'reviews', active: false },
  { name: 'Productos', icon: 'inventory_2', active: false },
  { name: 'Analítica', icon: 'bar_chart', active: false },
  { name: 'Configuración', icon: 'settings', active: false },
]

const kpis = [
  {
    label: 'Clics Totales',
    value: '12,482',
    trend: '+14.5%',
    positive: true,
    icon: 'ads_click',
    color: 'blue',
  },
  {
    label: 'Valoración Promedio',
    value: '4.8',
    sub: 'Basado en 320 reseñas',
    icon: 'star',
    color: 'yellow',
  },
  {
    label: 'Ventas Estimadas',
    value: '$4,520,000',
    trend: 'Basado en clics',
    icon: 'payments',
    color: 'green',
  },
]

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
  green: { bg: 'bg-green-500/10', text: 'text-green-500' },
}

const reviews = [
  {
    id: 1,
    user: 'Ricardo Lagos',
    rating: 5,
    time: 'Hace 2 horas',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAs3NXXJxz5ZzmDyqp8H4DbmsdwTcr6gGLj5onZ41kz_7VpRUX5wMQ-dzQIpjY-yiU2kkgili_9FpLJhGRjLbLRR0nkNmWkDr0BAHrSBgcNgJJKTPm_yyRwhlbxHMJ2Ah3alBKq2KCVVSqlcyg9d7nj3yR0I-oHjFkjTbIocfSwF37NYz-Hng1eI2JkKOk_miiCqnQOGy_wy8INGMAOMgaTpspT5re00DeuybKPG39odc8n4UZDKnWaeP4-kCIa6SqWiQq7R6QzoMZM',
    comment:
      '"Excelente producto, llegó antes de lo esperado. La calidad del material es superior a lo que se ve en las fotos. Muy recomendado para quienes buscan durabilidad."',
    replied: false,
  },
  {
    id: 2,
    user: 'Sofía Fernández',
    rating: 4,
    time: 'Hace 1 día',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTWjCbbWwykY2XhIWJ1QGiCPvEszQ35iMODJPV5h8KjALwSsewSP_Twrksb2lk6Nl7ZgQdFsQ3adMpA1GP7rvou8hpxIWPv0_RyUpsrJeVE8SacI0H2Xh17bM_4BJwsTIcspEv8IsKGUWtQfRnK4Ww29tEZiA0AAhpaH0d9ESfsQ0DA0IblUMvVgCiV-spMpc3LfRcxgAQmbPRyy1izpdrIT0MEOV_S4MGk2DUG-z-l_1tOYGmcu5XELcvURxuSk42bgDrwUtZBLfW',
    comment:
      '"El producto es bueno, pero el empaque llegó un poco dañado. Sin embargo, el contenido estaba intacto."',
    replied: true,
    reply: {
      content:
        '"Hola Sofía, lamentamos lo del empaque. Reforzaremos nuestro embalaje para futuros envíos. ¡Gracias por tu compra!"',
      time: 'Hace 12 horas',
    },
  },
]

export default function StoreDashboard() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    setMounted(true)
    setCurrentTime(
      new Date().toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
      })
    )
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-background-light dark:bg-background-dark font-display flex min-h-screen text-slate-800 transition-colors duration-500 dark:text-slate-200">
      {/* Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-30">
        <div className="bg-primary/10 absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]"></div>
      </div>

      {/* Sidebar */}
      <aside className="border-primary/5 fixed z-20 flex h-full w-72 flex-col border-r bg-white/80 shadow-2xl backdrop-blur-xl transition-all duration-500 dark:bg-slate-900/80">
        <div className="p-8">
          <Logo />
        </div>

        <nav className="mt-4 flex-1 space-y-2 px-6">
          {sidebarLinks.map((link) => (
            <a
              key={link.name}
              href="#"
              className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${link.active ? 'bg-primary shadow-primary/25 translate-x-1 text-white shadow-lg' : 'hover:bg-primary/5 hover:text-primary text-slate-500'}`}
            >
              <span
                className={`material-symbols-outlined text-2xl ${link.active ? 'fill-1' : 'group-hover:scale-110'}`}
              >
                {link.icon}
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase">
                {link.name}
              </span>
            </a>
          ))}
        </nav>

        <div className="border-primary/5 border-t p-6">
          <div className="border-primary/5 group flex cursor-pointer items-center gap-4 rounded-3xl border bg-slate-50 p-4 transition-all hover:shadow-lg dark:bg-slate-800/50">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl font-black shadow-inner transition-transform group-hover:rotate-12">
              TC
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-black tracking-widest uppercase">
                Tienda Central
              </p>
              <p className="truncate text-[10px] font-bold text-slate-400">
                ID: #92842
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1">
        {/* Top Header */}
        <header className="border-primary/5 sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white/60 px-10 backdrop-blur-xl dark:bg-slate-900/60">
          <div className="flex items-center gap-6">
            <h1 className="flex items-center gap-3 text-xl font-black tracking-widest uppercase">
              Panel de Administración
              <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full"></span>
            </h1>
            <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-[10px] font-black tracking-widest text-green-500 uppercase shadow-inner">
              Suscripción Pro
            </div>
          </div>

          <div className="flex items-center gap-8">
            {/* Theme Toggle */}
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="group rounded-2xl bg-slate-100 p-3 shadow-inner transition-all hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <span className="material-symbols-outlined text-xl text-slate-600 transition-transform group-hover:rotate-12 dark:text-yellow-400">
                dark_mode
              </span>
            </button>

            <div className="group relative cursor-pointer">
              <span className="material-symbols-outlined hover:text-primary text-2xl text-slate-400 transition-colors">
                notifications
              </span>
              <span className="bg-primary absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900"></span>
            </div>

            <div className="border-primary/5 group flex cursor-pointer items-center gap-3 border-l pl-8">
              <div className="text-right">
                <p className="mb-0.5 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Filtro Activo
                </p>
                <p className="text-primary text-xs font-black tracking-tighter uppercase group-hover:underline">
                  Últimos 30 días
                </p>
              </div>
              <span className="material-symbols-outlined text-primary transition-transform group-hover:translate-y-1">
                expand_more
              </span>
            </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-[1600px] space-y-10 p-10 duration-700">
          {/* Welcome Header */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-primary mb-2 text-xs font-black tracking-[0.3em] uppercase italic">
                Actualizado hace un momento
              </p>
              <h2 className="text-4xl font-black tracking-tighter italic">
                Hola de nuevo, <span className="text-primary">Admin</span>
              </h2>
            </div>
            <div className="flex gap-4">
              <button className="rounded-2xl bg-slate-900 px-8 py-3 text-[10px] font-black tracking-widest text-white uppercase shadow-xl transition-all hover:scale-105 active:scale-95 dark:bg-white dark:text-slate-900">
                Descargar Reporte
              </button>
              <button className="bg-primary shadow-primary/30 rounded-2xl px-8 py-3 text-[10px] font-black tracking-widest text-white uppercase shadow-xl transition-all hover:scale-105 active:scale-95">
                Agregar Producto
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="group border-primary/5 relative overflow-hidden rounded-[2.5rem] border bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900"
              >
                <div className="bg-primary/5 group-hover:bg-primary/10 absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full blur-2xl transition-colors"></div>
                <div className="relative z-10 flex h-full items-center justify-between">
                  <div>
                    <p className="mb-4 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                      {kpi.label}
                    </p>
                    <h3 className="text-4xl font-black tracking-tighter">
                      {kpi.value}
                    </h3>
                    <div
                      className={`mt-4 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase ${kpi.positive ? 'text-green-500' : 'text-primary'}`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {kpi.positive ? 'trending_up' : 'info'}
                      </span>
                      <span>{kpi.trend || kpi.sub}</span>
                    </div>
                  </div>
                  <div
                    className={`h-16 w-16 rounded-[1.5rem] ${colorMap[kpi.color].bg} flex items-center justify-center ${colorMap[kpi.color].text} shadow-inner transition-transform group-hover:scale-110`}
                  >
                    <span className="material-symbols-outlined fill-1 text-3xl font-black">
                      {kpi.icon}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Data Row */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Chart Section */}
            <div className="border-primary/5 rounded-[3rem] border bg-white p-10 shadow-xl lg:col-span-2 dark:bg-slate-900">
              <div className="mb-12 flex items-center justify-between">
                <div>
                  <h4 className="mb-2 text-2xl font-black tracking-tighter italic">
                    Tendencia de Precios
                  </h4>
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Comparativa: Tu tienda vs. Mercado
                  </p>
                </div>
                <div className="flex gap-8">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary shadow-primary/50 h-3 w-3 rounded-full shadow-lg"></span>
                    <span className="text-[10px] font-black tracking-widest uppercase">
                      Tu Precio
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                      Mercado
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-primary/5 group relative flex h-72 w-full items-end overflow-hidden rounded-[2rem] border bg-slate-50 p-8 shadow-inner dark:bg-slate-800/50">
                {/* Grid Lines */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-10 opacity-50">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-0 w-full border-t border-slate-200 dark:border-slate-700"
                    ></div>
                  ))}
                </div>

                {/* SVG Chart */}
                <svg
                  className="relative z-10 h-full w-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 100"
                >
                  <path
                    d="M0,60 L50,55 L100,58 L150,52 L200,55 L250,50 L300,53 L350,48 L400,50"
                    fill="none"
                    stroke="#64748b"
                    strokeDasharray="4"
                    strokeWidth="1"
                    className="opacity-30"
                  ></path>
                  <path
                    d="M0,70 L50,68 L100,65 L150,60 L200,45 L250,48 L300,42 L350,40 L400,38"
                    fill="none"
                    stroke="#135bec"
                    strokeWidth="4"
                    className="drop-shadow-lg"
                  ></path>
                  <path
                    d="M0,70 L50,68 L100,65 L150,60 L200,45 L250,48 L300,42 L350,40 L400,38 L400,100 L0,100 Z"
                    fill="url(#panelChartFill)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="panelChartFill"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#135bec"
                        stopOpacity="0.15"
                      ></stop>
                      <stop
                        offset="100%"
                        stopColor="#135bec"
                        stopOpacity="0"
                      ></stop>
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute bottom-4 left-0 flex w-full justify-between px-10 text-[9px] font-black tracking-widest text-slate-400 uppercase opacity-60">
                  <span>Semana 01</span>
                  <span>Semana 02</span>
                  <span>Semana 03</span>
                  <span>Semana 04</span>
                </div>
              </div>
            </div>

            {/* Summary Side Card */}
            <div className="bg-primary shadow-primary/30 group relative flex flex-col justify-between overflow-hidden rounded-[3rem] p-10 text-white shadow-2xl">
              <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-white/10 blur-[60px] transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative z-10">
                <span className="mb-8 inline-block rounded-full bg-white/20 px-4 py-1.5 text-[9px] font-black tracking-[0.2em] uppercase backdrop-blur-md">
                  Flash Insight
                </span>
                <h4 className="mb-4 text-3xl leading-tight font-black tracking-tighter italic">
                  ¡Vas en excelente camino!
                </h4>
                <p className="text-sm leading-relaxed font-medium text-white/80 italic">
                  Has superado tu objetivo mensual en un{' '}
                  <span className="truncate font-black text-white underline decoration-white/30">
                    12.5%
                  </span>
                  . La comunidad está respondiendo bien a tus últimos ajustes de
                  stock.
                </p>
              </div>
              <div className="relative z-10 mt-12 rounded-[2rem] border border-white/5 bg-white/10 p-6 backdrop-blur-sm">
                <p className="mb-1 text-[10px] font-black tracking-widest text-white/60 uppercase">
                  Impacto Estimado
                </p>
                <p className="text-xl font-black">
                  +$1.2M{' '}
                  <span className="text-[10px] font-normal opacity-60">
                    potencial
                  </span>
                </p>
              </div>
              <button className="text-primary relative z-10 mt-8 rounded-2xl bg-white py-5 text-[10px] font-black tracking-widest uppercase shadow-2xl transition-all hover:bg-slate-50 active:scale-95">
                Ver Informe de Impacto
              </button>
              <span className="material-icons-outlined pointer-events-none absolute -right-16 -bottom-16 rotate-12 text-[220px] font-black opacity-10 transition-transform duration-1000 group-hover:rotate-0">
                trending_up
              </span>
            </div>
          </div>

          {/* Reviews Management */}
          <div className="border-primary/5 overflow-hidden rounded-[3.5rem] border bg-white shadow-xl dark:bg-slate-900">
            <div className="border-primary/5 flex items-center justify-between border-b p-10">
              <h4 className="text-2xl font-black tracking-tighter italic">
                Últimas Interacciones
              </h4>
              <div className="flex items-center gap-6">
                <button className="text-primary group flex items-center gap-2 text-[10px] font-black tracking-widest uppercase hover:underline">
                  Gestionar todas
                  <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            <div className="divide-primary/5 divide-y">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="group flex flex-col gap-10 p-10 transition-colors hover:bg-slate-50/50 md:flex-row dark:hover:bg-slate-800/30"
                >
                  <div className="flex flex-shrink-0 flex-col items-center">
                    <div className="relative">
                      <Image
                        alt={review.user}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-[1.5rem] border-4 border-white object-cover shadow-xl transition-transform group-hover:scale-105 dark:border-slate-900"
                        src={review.avatar}
                      />
                      <div className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-4 border-white bg-green-500 dark:border-slate-900"></div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div>
                        <h5 className="mb-1 text-lg font-black tracking-tight">
                          {review.user}
                        </h5>
                        <div className="flex items-center gap-3">
                          <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`material-symbols-outlined text-sm ${i < review.rating ? 'fill-1' : ''}`}
                              >
                                {i < review.rating ? 'star' : 'star_outline'}
                              </span>
                            ))}
                          </div>
                          <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                            {review.time}
                          </span>
                        </div>
                      </div>
                      {!review.replied && (
                        <div className="flex gap-4">
                          <button className="bg-primary shadow-primary/20 flex items-center gap-2 rounded-xl px-6 py-2.5 text-[10px] font-black tracking-widest text-white uppercase shadow-lg transition-all hover:scale-105">
                            <span className="material-icons-outlined text-xs">
                              reply
                            </span>
                            Responder
                          </button>
                          <button className="border-primary/5 rounded-xl border-2 bg-white px-6 py-2.5 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-all hover:border-red-500/20 hover:text-red-500 dark:bg-slate-800">
                            Ignorar
                          </button>
                        </div>
                      )}
                    </div>

                    <p className="mb-6 text-sm leading-relaxed font-medium text-slate-600 italic opacity-80 dark:text-slate-400">
                      {review.comment}
                    </p>

                    {review.replied && (
                      <div className="border-primary relative rounded-[2rem] border-l-8 bg-slate-100/50 p-6 dark:bg-slate-800/50">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-primary text-[9px] font-black tracking-[0.2em] uppercase">
                              Respuesta Oficial
                            </span>
                            <span className="bg-primary/30 h-1 w-1 rounded-full"></span>
                            <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                              {review.reply?.time}
                            </span>
                          </div>
                          <button className="hover:text-primary text-[9px] font-black tracking-widest text-slate-400 uppercase transition-colors">
                            Editar
                          </button>
                        </div>
                        <p className="text-xs leading-relaxed font-bold text-slate-700 opacity-90 dark:text-slate-300">
                          {review.reply?.content}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <footer className="space-y-4 pt-20 pb-10 text-center">
            <div className="flex justify-center gap-8 text-[10px] font-black tracking-widest text-slate-400 uppercase">
              <a href="#" className="hover:text-primary transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Soporte Estratégico
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Privacidad de Datos
              </a>
            </div>
            <p className="text-[9px] font-black tracking-[0.4em] text-slate-300 uppercase dark:text-slate-600">
              © 2026 Revius.cl - Ecosistema de Reputación Digital de Chile.
            </p>
          </footer>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .fill-1 {
          font-variation-settings: 'FILL' 1;
        }
      `}</style>
    </div>
  )
}
