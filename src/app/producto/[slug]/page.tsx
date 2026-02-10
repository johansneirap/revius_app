'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { useState, useEffect } from 'react'

export default function ProductPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Mock data for the product
    const product = {
        name: "SonicPro Ultra X1 - Audífonos Noise Cancelling",
        rating: 4.8,
        reviewsCount: 1240,
        currentPrice: 249990,
        description: "Experimenta la cúspide del sonido con los SonicPro Ultra X1. Tecnología de cancelación de ruido activa de última generación, batería de 40 horas y una fidelidad sonora que te transportará a otra dimensión.",
        image: "/images/headphones.png",
        stores: [
            { name: "Paris", price: 249990, stock: "En stock", logo: "P", color: "bg-blue-600", affiliateLink: "#" },
            { name: "Falabella", price: 254990, stock: "En stock", logo: "F", color: "bg-green-600", affiliateLink: "#" },
            { name: "Mercado Libre", price: 239900, stock: "Pocos disponibles", logo: "M", color: "bg-yellow-400", affiliateLink: "#" },
            { name: "Amazon Cloud", price: 265000, stock: "En stock", logo: "A", color: "bg-orange-500", affiliateLink: "#" }
        ],
        specs: [
            { label: "Cancelación de Ruido", value: "Activa (ANC) Adaptativa" },
            { label: "Batería", value: "Hasta 40 horas" },
            { label: "Carga", value: "Carga rápida USB-C (10 min = 5 hrs)" },
            { label: "Conectividad", value: "Bluetooth 5.3 + Jack 3.5mm" },
            { label: "Peso", value: "250g" }
        ]
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 font-display transition-colors">
            {/* Nav Bar */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Logo />
                        <div className="flex-1 max-w-lg mx-8 hidden md:block">
                            <div className="relative group">
                                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                                <input
                                    type="text"
                                    placeholder="Buscar productos, marcas o categorías..."
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
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
                                <span className="material-icons">notifications</span>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-slate-900"></span>
                            </button>
                            <Link href="/login" className="flex items-center gap-2 font-semibold text-sm bg-primary text-white px-5 py-2 rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                                <span className="material-icons text-sm">person</span>
                                Mi Cuenta
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                    <span className="material-icons text-[10px]">chevron_right</span>
                    <Link href="#" className="hover:text-primary transition-colors">Tecnología</Link>
                    <span className="material-icons text-[10px]">chevron_right</span>
                    <Link href="#" className="hover:text-primary transition-colors">Audio</Link>
                    <span className="material-icons text-[10px]">chevron_right</span>
                    <span className="text-slate-900 dark:text-slate-300 truncate">Sony XM5 Series</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left Column: Visuals */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-2xl group">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6 flex flex-col gap-3">
                                <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">Más Vendido</span>
                                <span className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">Envío Gratis</span>
                            </div>
                            <button className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                                <span className="material-icons text-rose-500">favorite_border</span>
                            </button>
                        </div>

                        {/* Detail Tabs/Sections */}
                        <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-primary/5">
                            <h3 className="text-xl font-bold mb-6">Descripción del Producto</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                {product.description}
                            </p>
                            <h3 className="text-xl font-bold mb-6">Especificaciones Técnicas</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {product.specs.map((spec, i) => (
                                    <div key={i} className="flex flex-col p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-primary/5">
                                        <span className="text-xs text-slate-500 mb-1">{spec.label}</span>
                                        <span className="font-bold text-sm text-slate-900 dark:text-white">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Comparison & Buy */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-primary/5 sticky top-24">
                            <h1 className="text-3xl font-black mb-4 leading-tight">{product.name}</h1>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-sm font-bold">
                                    <span className="material-icons text-sm">star</span>
                                    {product.rating}
                                </div>
                                <span className="text-xs font-medium text-slate-500">{product.reviewsCount} reseñas verificadas</span>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Comparación de Precios</div>
                                {product.stores.map((store, i) => (
                                    <div key={i} className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-primary/5 dark:hover:bg-primary/10 rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 ${store.color} rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg`}>
                                                {store.logo}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white text-sm">{store.name}</div>
                                                <div className="text-[10px] text-slate-500 font-medium">{store.stock}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-lg font-black text-primary">${store.price.toLocaleString('es-CL')}</div>
                                            </div>
                                            <Link href={store.affiliateLink} className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                                                <span className="material-icons text-sm">shopping_cart</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 group">
                                <span className="material-icons">local_offer</span>
                                Obtener mejor oferta
                                <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                            <p className="text-center text-[10px] text-slate-400 mt-4 leading-relaxed">
                                Al comprar a través de nuestros enlaces de afiliados, Revius podría recibir una pequeña comisión para seguir mejorando. <span className="underline cursor-help">Saber más</span>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mt-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl font-black mb-4">Reseñas de la Comunidad</h2>
                            <p className="text-slate-500">Lo que dicen los usuarios reales sobre este producto en Chile.</p>
                        </div>
                        <button className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-primary/20 px-6 py-3 rounded-2xl font-bold hover:bg-primary/5 transition-all">
                            <span className="material-icons text-primary">rate_review</span>
                            Escribir una Reseña
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Rating Breakdown */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 border border-primary/10 rounded-3xl p-8 sticky top-24">
                                <div className="text-center mb-8">
                                    <div className="text-6xl font-black text-slate-900 dark:text-white mb-2">{product.rating}</div>
                                    <div className="flex justify-center text-amber-400 gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => <span key={i} className="material-icons">star</span>)}
                                    </div>
                                    <div className="text-sm font-medium text-slate-500">Basado en {product.reviewsCount} reseñas</div>
                                </div>
                                <div className="space-y-3">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className="flex items-center gap-4 group cursor-pointer">
                                            <div className="flex items-center gap-1 w-8">
                                                <span className="text-xs font-bold text-slate-500">{stars}</span>
                                                <span className="material-icons text-[10px] text-amber-400">star</span>
                                            </div>
                                            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full group-hover:bg-primary/80 transition-all"
                                                    style={{ width: `${Math.random() * 80 + 10}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 w-8">{Math.floor(Math.random() * 500)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Review List */}
                        <div className="lg:col-span-2 space-y-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white dark:bg-slate-900 border border-primary/5 rounded-3xl p-8 hover:border-primary/20 transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-primary/10 overflow-hidden">
                                                <span className="material-icons text-slate-400">person</span>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">Usuario Revius #{Math.floor(Math.random() * 999)}</div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compra Verificada</span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    <span className="text-[10px] font-medium text-slate-400">Hace 2 días</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex text-amber-400 gap-0.5 transform group-hover:scale-110 transition-transform origin-right">
                                            {[...Array(5)].map((_, i) => <span key={i} className="material-icons text-sm">star</span>)}
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">Increíble calidad de sonido</h4>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                        Los compré hace una semana y me han sorprendido gratamente. La cancelación de ruido es superior a modelos mucho más caros. El envío por Falabella fue super rápido, llegaron en menos de 24 horas a Santiago.
                                    </p>
                                    <div className="flex items-center gap-6 border-t border-slate-50 dark:border-slate-800 pt-6">
                                        <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-icons text-sm">thumb_up</span>
                                            Útil (24)
                                        </button>
                                        <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-icons text-sm">reply</span>
                                            Responder
                                        </button>
                                        <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors ml-auto">
                                            <span className="material-icons text-sm">flag</span>
                                            Reportar
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-4 border-2 border-dashed border-primary/20 rounded-3xl text-sm font-bold text-primary hover:bg-primary/5 transition-all">
                                Cargar más reseñas
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Simple Footer */}
            <footer className="bg-white dark:bg-slate-950 border-t border-primary/10 pt-16 pb-8 mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <Logo />
                        <div className="flex gap-6">
                            <span className="material-icons text-slate-400 hover:text-primary cursor-pointer">facebook</span>
                            <span className="material-icons text-slate-400 hover:text-primary cursor-pointer">alternate_email</span>
                            <span className="material-icons text-slate-400 hover:text-primary cursor-pointer">camera_alt</span>
                        </div>
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
                        <div>© 2026 Revius.cl - Todos los derechos reservados.</div>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-primary transition-colors">Términos</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Privacidad</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
