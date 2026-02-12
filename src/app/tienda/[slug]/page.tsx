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
        name: "TechNova Direct",
        verified: true,
        category: "Hardware Global & Electrónica High-End",
        rating: 4.2,
        reviewsCount: 12840,
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkUo7wxrzysLmn49Ex6_9voJsEQR52wGcA-HbTdjRIOaYmVYXzNPcrEwvp2qG0FNp2stNBfMu9XR8YsvLe0l3fSmXpcSK8qJql3LPafnL1Q1_bo9s11_fGAtpCc2dSabvIPr0Nk6NvetNC3uK-o8uFDvOVIuxPbw29-rG742y34R6pi2rXJv-1O4Xw4u5JUkicY5w9NVshgoeyWGnBMxgnPXfYUh_FTykCfabRaG1PQfPTmA-QihG7TbV49K5fXMIPqaJK9ywHUj6k",
        reputation: [
            { label: "Velocidad de Envío", score: 4.8, percentage: 96, color: "bg-emerald-500" },
            { label: "Soporte al Cliente", score: 3.9, percentage: 78, color: "bg-primary" },
            { label: "Calidad de Empaque", score: 4.5, percentage: 90, color: "bg-primary" }
        ],
        stats: {
            responseTime: "~2 Horas",
            returnRate: "1.2%"
        },
        deals: [
            {
                name: "NovaVision 34\" Curved Gaming Monitor",
                price: 349990,
                oldPrice: 429990,
                discount: true,
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsEOz4ePXFOFRun-L-D8HwkSEjQ0RoVPbSvzn416ip1bKSBDmAHcDLFbJtW7slfRzjw1nc9CpSSNV9OdgwsbROPpZAdg6IKzhEM0bUDWhObCAvo6RmtGMCmjL4pm8rPs4Fi3Z3EWsmduuJwT-uPd01_igV20JzpMgiUOClIWUeEKQmQyVrgQpTN9nvHIn1GyLJfCJl2i_2QZWU2spzah3SnUDKvzrL8x5u9nGG5EYkghkf9-ycz-BP7Mq6fTaknJI2zN8boU-tA0nv"
            },
            {
                name: "ProClick Mechanical Keyboard RGB",
                price: 129000,
                badge: "Best Price",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIn1mIMmQ2LlvWUbCYKIwEqpbBY75WHztyr2ajFZ5wXY0bwDgO3hb6qEhzVYInNOUQxmcjnEkGOhpXXXkcRg69gFQQ2KMCVjxcYyev6i5fiz9G3kSD0fycf9vsd_KgK06b4EWfCk96j0fqaj-JKfdKTgyH4iLOiB3_ValuePgOqV7geyVOLFBMQXS1pUElOkLHnDJh03PXyD1wRuo-NauE7gRb4C4Wb-_CkwPRKMzpa2lvNGoKsOYgvfOmUse7EQ7fDVOQkCKqKL1p"
            }
        ]
    }

    if (!mounted) return null

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen transition-colors">
            {/* Nav Bar */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Logo />
                        <div className="flex-1 max-w-md mx-8 hidden md:block">
                            <div className="relative group">
                                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                                <input
                                    type="text"
                                    placeholder="Buscar productos en esta tienda..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 border-2 focus:border-primary/30 rounded-full outline-none transition-all text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => document.documentElement.classList.toggle('dark')}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-yellow-400"
                            >
                                <span className="material-icons dark:hidden">dark_mode</span>
                                <span className="material-icons hidden dark:block">light_mode</span>
                            </button>
                            <Link href="/login" className="flex items-center gap-2 font-semibold text-sm bg-primary text-white px-5 py-2 rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                                <span className="material-icons text-sm">person</span>
                                Ingresar
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Store Hero Section */}
                <section className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div className="flex items-start gap-8">
                            <div className="relative w-32 h-32 bg-white dark:bg-slate-800 rounded-2xl border border-primary/10 shadow-xl p-3 flex items-center justify-center group overflow-hidden">
                                <Image
                                    src={store.logo}
                                    alt={store.name}
                                    width={128}
                                    height={128}
                                    className="max-w-full max-h-full rounded-lg transition-transform group-hover:scale-110"
                                />
                            </div>
                            <div className="pt-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-4xl font-black tracking-tight">{store.name}</h1>
                                    <span className="material-icons text-primary text-2xl" title="Verified Retailer">verified</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                                    <span className="material-icons text-base text-primary">location_on</span> {store.category}
                                </p>
                                <div className="flex items-center gap-6 mt-4">
                                    <div className="flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-1.5 rounded-full font-black">
                                        <span className="material-symbols-outlined text-lg fill-1">star</span>
                                        {store.rating}
                                    </div>
                                    <span className="text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-widest">{store.reviewsCount.toLocaleString()} Reseñas Verificadas</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex-1 md:flex-none px-8 py-4 bg-white dark:bg-slate-800 border border-primary/10 text-slate-700 dark:text-slate-200 font-bold rounded-2xl hover:bg-primary/5 dark:hover:bg-primary/10 flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg">
                                <span className="material-icons text-lg">share</span> Compartir
                            </button>
                            <button className="flex-1 md:flex-none px-8 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/30 active:scale-95">
                                Ver Sitio Web <span className="material-icons text-lg">open_in_new</span>
                            </button>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Reputation & Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Reputation Scorecard */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-primary/5 p-8 shadow-xl">
                            <h2 className="text-xl font-black mb-8 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">analytics</span>
                                Reputación Revius
                            </h2>
                            <div className="space-y-8">
                                {store.reputation.map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{item.label}</span>
                                            <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">{item.score}/5</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                            <div
                                                className={`${item.color} h-full rounded-full transition-all duration-1000`}
                                                style={{ width: `${item.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 pt-8 border-t border-primary/10">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 text-center">
                                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Tiempo Resp.</p>
                                        <p className="text-lg font-black text-primary">{store.stats.responseTime}</p>
                                    </div>
                                    <div className="w-px h-10 bg-primary/10"></div>
                                    <div className="flex-1 text-center">
                                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Tasa Devolución</p>
                                        <p className="text-lg font-black text-emerald-500">{store.stats.returnRate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Expert Highlights */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-primary/5 p-8 shadow-xl">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                Opinión de Expertos
                            </h2>
                            <div className="space-y-6">
                                <div className="p-5 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 relative">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white dark:border-slate-800 overflow-hidden relative">
                                            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGKFcMkje2kfUV6EwmcjmK9Kr1iabYdrGQPDr-6b4eitXucRtJhflGNCHj_yIdY6XNQ9pMBrgQDlTdq_hWungFar3zT18M5r1z6gnVTsAhvbO0iYIqhXan0_RJocdZvnxvCN06iDhkYiB35aJYQWbQ-2g4uWXGJfxKnzIVBxJDn_ZDBoOdXsuZFgqumq1AYFwrGxRZh5NP5SO-oYQIZHoIMV4TUhnrAydmYh2W4UmIR6lAe3Q21Vph6fLxx2y7ga-z0n5I92IJ6LLv" fill alt="Expert" className="object-cover" />
                                        </div>
                                        <span className="text-sm font-black tracking-tight">@TechChileGuru</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">"Envío ultra rápido para GPUs. El soporte postventa en Chile es de lo mejor."</p>
                                    <span className="material-icons absolute top-6 right-6 text-primary/20 text-4xl">format_quote</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Shipping Info */}
                        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/40 transition-all"></div>
                            <h3 className="text-xl font-black mb-6 relative z-10">Envío & Devolución</h3>
                            <ul className="space-y-5 text-sm font-medium relative z-10">
                                <li className="flex items-center gap-4">
                                    <span className="material-icons text-primary bg-primary/10 p-2 rounded-xl">local_shipping</span>
                                    Gratis sobre $50.000
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="material-icons text-primary bg-primary/10 p-2 rounded-xl">history</span>
                                    30 días de satisfacción
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="material-icons text-primary bg-primary/10 p-2 rounded-xl">shield</span>
                                    Embalaje de seguridad Pro
                                </li>
                            </ul>
                        </div>
                    </aside>

                    {/* Right Column: Products & Reviews */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Navigation Tabs */}
                        <div className="flex border-b border-primary/10">
                            <button className="px-8 py-5 text-primary border-b-4 border-primary font-black text-sm uppercase tracking-widest">Ofertas (14)</button>
                            <button className="px-8 py-5 text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-sm uppercase tracking-widest transition-colors">Reseñas (12k+)</button>
                            <button className="px-8 py-5 text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-sm uppercase tracking-widest transition-colors">Información</button>
                        </div>

                        {/* Deals Section */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center px-2">
                                <h2 className="text-2xl font-black">Mejores Ofertas en TechNova</h2>
                                <select className="text-xs font-bold uppercase tracking-widest bg-white dark:bg-slate-900 border-2 border-primary/10 rounded-xl px-4 py-2 outline-none focus:border-primary transition-all">
                                    <option>Menor Precio</option>
                                    <option>Más Popular</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {store.deals.map((deal, i) => (
                                    <div key={i} className="group bg-white dark:bg-slate-900 rounded-3xl border border-primary/5 p-5 hover:shadow-2xl transition-all flex gap-6 relative overflow-hidden">
                                        <div className="w-28 h-28 flex-shrink-0 bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden p-3 relative">
                                            <Image
                                                src={deal.image}
                                                alt={deal.name}
                                                fill
                                                className="object-contain transition-transform group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between flex-1 py-1">
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors">{deal.name}</h3>
                                                <div className="flex items-center gap-3 mt-3">
                                                    <span className="text-xl font-black text-primary">${deal.price.toLocaleString('es-CL')}</span>
                                                    {deal.oldPrice && (
                                                        <span className="text-sm text-slate-400 font-medium line-through">${deal.oldPrice.toLocaleString('es-CL')}</span>
                                                    )}
                                                    {deal.badge && (
                                                        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">{deal.badge}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <button className="mt-4 w-full py-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black rounded-xl hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-sm">Ver Oferta</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Reviews Summary */}
                        <div className="space-y-8">
                            <div className="flex justify-between items-center px-2">
                                <h2 className="text-2xl font-black">Experiencias de Clientes</h2>
                                <Link href="/escribir-resena" className="text-sm font-black text-primary hover:underline flex items-center gap-2">
                                    <span className="material-icons text-sm">edit</span> Escribir Reseña
                                </Link>
                            </div>

                            <div className="space-y-6">
                                {/* Review Item */}
                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-primary/5 p-8 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-xl">JD</div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-lg">
                                                    James D. <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Compra Verificada</span>
                                                </div>
                                                <p className="text-xs text-slate-500 font-medium">Compró: NovaVision Monitor • Hace 2 días</p>
                                            </div>
                                        </div>
                                        <div className="flex text-amber-400 gap-0.5">
                                            {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-sm fill-1">star</span>)}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                                        "Increíble velocidad de entrega. Pedí el martes por la mañana y llegó el miércoles por la tarde. El embalaje fue super robusto, con triple caja para el monitor. El soporte al cliente también me ayudó a cambiar mi dirección."
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/5">
                                        {["Envío Rápido", "Gran Embalaje", "Soporte Pro"].map(tag => (
                                            <span key={tag} className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-bold">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <button className="w-full py-5 border-2 border-dashed border-primary/10 rounded-3xl text-slate-400 dark:text-slate-500 font-black text-sm uppercase tracking-widest hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all">
                                    Cargar Más Reseñas
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-950 border-t border-primary/10 py-16 mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <Logo />
                            <p className="mt-6 text-slate-500 text-sm leading-relaxed">Empoderando a la comunidad con transparencia y datos reales sobre el retail nacional e internacional.</p>
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Recursos</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="#">Guía de Reseñas</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Comprador Verificado</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Para Tiendas</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Soporte</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="#">Contacto</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Preguntas Frecuentes</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Reportar Tienda</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
                            <div className="flex gap-2 p-1.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-primary/10">
                                <input className="flex-1 px-4 bg-transparent outline-none text-sm font-medium" placeholder="Tu email" type="email" />
                                <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">Unirse</button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">© 2026 Revius.cl - Reputación que Importa.</p>
                        <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
                            <Link className="hover:text-primary transition-colors" href="#">Privacidad</Link>
                            <Link className="hover:text-primary transition-colors" href="#">Términos</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
