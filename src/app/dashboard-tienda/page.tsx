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
    { label: 'Clics Totales', value: '12,482', trend: '+14.5%', positive: true, icon: 'ads_click', color: 'blue' },
    { label: 'Valoración Promedio', value: '4.8', sub: 'Basado en 320 reseñas', icon: 'star', color: 'yellow' },
    { label: 'Ventas Estimadas', value: '$4,520,000', trend: 'Basado en clics', icon: 'payments', color: 'green' },
]

const colorMap: Record<string, { bg: string, text: string }> = {
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
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs3NXXJxz5ZzmDyqp8H4DbmsdwTcr6gGLj5onZ41kz_7VpRUX5wMQ-dzQIpjY-yiU2kkgili_9FpLJhGRjLbLRR0nkNmWkDr0BAHrSBgcNgJJKTPm_yyRwhlbxHMJ2Ah3alBKq2KCVVSqlcyg9d7nj3yR0I-oHjFkjTbIocfSwF37NYz-Hng1eI2JkKOk_miiCqnQOGy_wy8INGMAOMgaTpspT5re00DeuybKPG39odc8n4UZDKnWaeP4-kCIa6SqWiQq7R6QzoMZM',
        comment: '"Excelente producto, llegó antes de lo esperado. La calidad del material es superior a lo que se ve en las fotos. Muy recomendado para quienes buscan durabilidad."',
        replied: false
    },
    {
        id: 2,
        user: 'Sofía Fernández',
        rating: 4,
        time: 'Hace 1 día',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTWjCbbWwykY2XhIWJ1QGiCPvEszQ35iMODJPV5h8KjALwSsewSP_Twrksb2lk6Nl7ZgQdFsQ3adMpA1GP7rvou8hpxIWPv0_RyUpsrJeVE8SacI0H2Xh17bM_4BJwsTIcspEv8IsKGUWtQfRnK4Ww29tEZiA0AAhpaH0d9ESfsQ0DA0IblUMvVgCiV-spMpc3LfRcxgAQmbPRyy1izpdrIT0MEOV_S4MGk2DUG-z-l_1tOYGmcu5XELcvURxuSk42bgDrwUtZBLfW',
        comment: '"El producto es bueno, pero el empaque llegó un poco dañado. Sin embargo, el contenido estaba intacto."',
        replied: true,
        reply: {
            content: '"Hola Sofía, lamentamos lo del empaque. Reforzaremos nuestro embalaje para futuros envíos. ¡Gracias por tu compra!"',
            time: 'Hace 12 horas'
        }
    }
]

export default function StoreDashboard() {
    const [mounted, setMounted] = useState(false)
    const [currentTime, setCurrentTime] = useState('')

    useEffect(() => {
        setMounted(true)
        setCurrentTime(new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }))
    }, [])

    if (!mounted) return null

    return (
        <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 transition-colors duration-500">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-30">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Sidebar */}
            <aside className="w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-primary/5 fixed h-full z-20 flex flex-col shadow-2xl transition-all duration-500">
                <div className="p-8">
                    <Logo />
                </div>

                <nav className="flex-1 px-6 space-y-2 mt-4">
                    {sidebarLinks.map((link) => (
                        <a
                            key={link.name}
                            href="#"
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${link.active ? 'bg-primary text-white shadow-lg shadow-primary/25 translate-x-1' : 'text-slate-500 hover:bg-primary/5 hover:text-primary'}`}
                        >
                            <span className={`material-symbols-outlined text-2xl ${link.active ? 'fill-1' : 'group-hover:scale-110'}`}>{link.icon}</span>
                            <span className="font-bold uppercase tracking-widest text-[10px]">{link.name}</span>
                        </a>
                    ))}
                </nav>

                <div className="p-6 border-t border-primary/5">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-primary/5 group cursor-pointer transition-all hover:shadow-lg">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black shadow-inner group-hover:rotate-12 transition-transform">
                            TC
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-black uppercase tracking-widest truncate">Tienda Central</p>
                            <p className="text-[10px] text-slate-400 font-bold truncate">ID: #92842</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72">
                {/* Top Header */}
                <header className="h-20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-primary/5 flex items-center justify-between px-10 sticky top-0 z-10">
                    <div className="flex items-center gap-6">
                        <h1 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                            Panel de Administración
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        </h1>
                        <div className="px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full shadow-inner">
                            Suscripción Pro
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => document.documentElement.classList.toggle('dark')}
                            className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all group shadow-inner"
                        >
                            <span className="material-symbols-outlined text-xl text-slate-600 dark:text-yellow-400 group-hover:rotate-12 transition-transform">dark_mode</span>
                        </button>

                        <div className="relative group cursor-pointer">
                            <span className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors text-2xl">notifications</span>
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white dark:border-slate-900"></span>
                        </div>

                        <div className="flex items-center gap-3 border-l border-primary/5 pl-8 cursor-pointer group">
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Filtro Activo</p>
                                <p className="text-xs font-black uppercase tracking-tighter text-primary group-hover:underline">Últimos 30 días</p>
                            </div>
                            <span className="material-symbols-outlined text-primary group-hover:translate-y-1 transition-transform">expand_more</span>
                        </div>
                    </div>
                </header>

                <div className="p-10 space-y-10 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Welcome Header */}
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2 italic">Actualizado hace un momento</p>
                            <h2 className="text-4xl font-black tracking-tighter italic">Hola de nuevo, <span className="text-primary">Admin</span></h2>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all">
                                Descargar Reporte
                            </button>
                            <button className="px-8 py-3 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                                Agregar Producto
                            </button>
                        </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {kpis.map((kpi) => (
                            <div key={kpi.label} className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-primary/5 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                                <div className="relative z-10 flex items-center justify-between h-full">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{kpi.label}</p>
                                        <h3 className="text-4xl font-black tracking-tighter">{kpi.value}</h3>
                                        <div className={`flex items-center gap-2 mt-4 text-[10px] font-black uppercase tracking-widest ${kpi.positive ? 'text-green-500' : 'text-primary'}`}>
                                            <span className="material-symbols-outlined text-sm">{kpi.positive ? 'trending_up' : 'info'}</span>
                                            <span>{kpi.trend || kpi.sub}</span>
                                        </div>
                                    </div>
                                    <div className={`w-16 h-16 rounded-[1.5rem] ${colorMap[kpi.color].bg} flex items-center justify-center ${colorMap[kpi.color].text} group-hover:scale-110 transition-transform shadow-inner`}>
                                        <span className="material-symbols-outlined text-3xl font-black fill-1">{kpi.icon}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Data Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Chart Section */}
                        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-primary/5 shadow-xl">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h4 className="text-2xl font-black tracking-tighter mb-2 italic">Tendencia de Precios</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Comparativa: Tu tienda vs. Mercado</p>
                                </div>
                                <div className="flex gap-8">
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50"></span>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Tu Precio</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mercado</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-72 w-full bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] overflow-hidden flex items-end p-8 border border-primary/5 shadow-inner group">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between p-10 pointer-events-none opacity-50">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="border-t border-slate-200 dark:border-slate-700 w-full h-0"></div>)}
                                </div>

                                {/* SVG Chart */}
                                <svg className="w-full h-full relative z-10 overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 100">
                                    <path d="M0,60 L50,55 L100,58 L150,52 L200,55 L250,50 L300,53 L350,48 L400,50" fill="none" stroke="#64748b" strokeDasharray="4" strokeWidth="1" className="opacity-30"></path>
                                    <path d="M0,70 L50,68 L100,65 L150,60 L200,45 L250,48 L300,42 L350,40 L400,38" fill="none" stroke="#135bec" strokeWidth="4" className="drop-shadow-lg"></path>
                                    <path d="M0,70 L50,68 L100,65 L150,60 L200,45 L250,48 L300,42 L350,40 L400,38 L400,100 L0,100 Z" fill="url(#panelChartFill)"></path>
                                    <defs>
                                        <linearGradient id="panelChartFill" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#135bec" stopOpacity="0.15"></stop>
                                            <stop offset="100%" stopColor="#135bec" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <div className="absolute bottom-4 left-0 w-full flex justify-between px-10 text-[9px] font-black uppercase tracking-widest text-slate-400 opacity-60">
                                    <span>Semana 01</span>
                                    <span>Semana 02</span>
                                    <span>Semana 03</span>
                                    <span>Semana 04</span>
                                </div>
                            </div>
                        </div>

                        {/* Summary Side Card */}
                        <div className="bg-primary p-10 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-primary/30 group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-[60px] group-hover:scale-110 transition-transform duration-700"></div>
                            <div className="relative z-10">
                                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-8 inline-block">Flash Insight</span>
                                <h4 className="text-3xl font-black tracking-tighter italic leading-tight mb-4">¡Vas en excelente camino!</h4>
                                <p className="text-white/80 text-sm font-medium leading-relaxed italic">
                                    Has superado tu objetivo mensual en un <span className="text-white font-black underline decoration-white/30 truncate">12.5%</span>.
                                    La comunidad está respondiendo bien a tus últimos ajustes de stock.
                                </p>
                            </div>
                            <div className="relative z-10 mt-12 bg-white/10 p-6 rounded-[2rem] backdrop-blur-sm border border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Impacto Estimado</p>
                                <p className="text-xl font-black">+$1.2M <span className="text-[10px] font-normal opacity-60">potencial</span></p>
                            </div>
                            <button className="relative z-10 mt-8 bg-white text-primary py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all shadow-2xl active:scale-95">
                                Ver Informe de Impacto
                            </button>
                            <span className="material-icons-outlined absolute -bottom-16 -right-16 text-[220px] opacity-10 rotate-12 font-black pointer-events-none group-hover:rotate-0 transition-transform duration-1000">trending_up</span>
                        </div>
                    </div>

                    {/* Reviews Management */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-primary/5 shadow-xl overflow-hidden">
                        <div className="p-10 border-b border-primary/5 flex items-center justify-between">
                            <h4 className="text-2xl font-black tracking-tighter italic">Últimas Interacciones</h4>
                            <div className="flex items-center gap-6">
                                <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-2 group">
                                    Gestionar todas
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                                </button>
                            </div>
                        </div>

                        <div className="divide-y divide-primary/5">
                            {reviews.map((review) => (
                                <div key={review.id} className="p-10 flex flex-col md:flex-row gap-10 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <div className="flex-shrink-0 flex flex-col items-center">
                                        <div className="relative">
                                            <Image
                                                alt={review.user}
                                                width={64}
                                                height={64}
                                                className="w-16 h-16 rounded-[1.5rem] object-cover border-4 border-white dark:border-slate-900 shadow-xl group-hover:scale-105 transition-transform"
                                                src={review.avatar}
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900"></div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                                            <div>
                                                <h5 className="text-lg font-black tracking-tight mb-1">{review.user}</h5>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex text-amber-500">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={`material-symbols-outlined text-sm ${i < review.rating ? 'fill-1' : ''}`}>
                                                                {i < review.rating ? 'star' : 'star_outline'}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{review.time}</span>
                                                </div>
                                            </div>
                                            {!review.replied && (
                                                <div className="flex gap-4">
                                                    <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                                                        <span className="material-icons-outlined text-xs">reply</span>
                                                        Responder
                                                    </button>
                                                    <button className="bg-white dark:bg-slate-800 border-2 border-primary/5 text-slate-400 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-red-500 hover:border-red-500/20 transition-all">
                                                        Ignorar
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-slate-600 dark:text-slate-400 text-sm italic font-medium leading-relaxed mb-6 opacity-80">
                                            {review.comment}
                                        </p>

                                        {review.replied && (
                                            <div className="bg-slate-100/50 dark:bg-slate-800/50 p-6 rounded-[2rem] border-l-8 border-primary relative">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Respuesta Oficial</span>
                                                        <span className="w-1 h-1 rounded-full bg-primary/30"></span>
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{review.reply?.time}</span>
                                                    </div>
                                                    <button className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Editar</button>
                                                </div>
                                                <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed opacity-90">
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
                    <footer className="pt-20 pb-10 text-center space-y-4">
                        <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a>
                            <a href="#" className="hover:text-primary transition-colors">Soporte Estratégico</a>
                            <a href="#" className="hover:text-primary transition-colors">Privacidad de Datos</a>
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-600">
                            © 2026 Revius.cl - Ecosistema de Reputación Digital de Chile.
                        </p>
                    </footer>
                </div>
            </main>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
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
