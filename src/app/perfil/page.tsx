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
        name: "Diego Martínez",
        handle: "@diegomtz",
        badge: "Reviewer Bronce",
        bio: "Amante de la tecnología y las buenas ofertas. Busco calidad y buen servicio post-venta.",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZYBVG4OLBumXdE6zKS18f-Yrx5mWOmeJ2rUJ9OuUJHSVKtQV4E2eXe2FBaS8brE1X2GwcRjghRH28ugSLfStAYX__u8nNk7XLYZQOWZMUX1TFFJTFzySvYv51QTZBc0MXOtyLUZs92eUvPO1LLG3WysGx0ALGoMSIjdZaj2w478FTLjkBsgBaWxwelMCAQQFc8oTC2Lb7RqeftJAr-VKeIruzdqHYjADIL26tbpbFax6WwiNbpXmz4e-i7HgwljgGCsZcpmeywWUz",
        stats: {
            followers: "1.2k",
            following: "248",
            reviews: "15"
        },
        progress: {
            current: 2,
            target: 5,
            percentage: 66
        },
        favorites: [
            {
                id: 1,
                name: "Headphones Gen 3 Pro Edition",
                price: 249000,
                rating: 4.8,
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7lTyYtjV7lfup5per8LwvkXf1SeTKDEZDF1_VIT8DkzxmHVWRwofomAiDNp0PbZEMbgEC81--UFeLs5qTsitu45ucMs1vN_sfNmaK9zUksLod68kWQINHSv3O_AzekFnEa_ESel8nK0p_1fYEZFuyi3dPWz3bVsfVhX_N31uuc-sd8a_t_FZ_HxFYlGwXjEfAxHAxEc1n_rMMhnwNIXxsOWKMXysC677BstF_G2wq_TsuGU5feIODIz8M1sBLZEcOcaKB3YfLr73f"
            },
            {
                id: 2,
                name: "Wireless Compact Earbuds",
                price: 89990,
                rating: 4.5,
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyVelRa6DnGpDkK2j9pjMLrbbtu1EZgCbxIS3uQzwZ93nr8S7R13To5kpHaKKwBSPQAUnQlLXQ0KWY9dODJw4lUyRCROq9xISIkmIU777niLWj0NA-24V1STT6oi3BZq96WU5gglWrzqasevjQap4qOAjBMVST1GQXBvut3gJK8O7mPve6ODygURJn4Czh9y9p_deeEzP-qL1xT5aYVT9_YZ_id4fIIZ6FCCuS0pHM7AGjneTlPuNHoYHkCnYUvMCkW0zFaEHmvO74"
            }
        ],
        recentReviews: [
            {
                id: 1,
                product: "Headphones Gen 3 Pro Edition",
                category: "Electrónica",
                rating: 5,
                content: "La cancelación de ruido es simplemente otro nivel. Los usé en mi último viaje y la diferencia es abismal. La batería me duró todo el vuelo de ida y vuelta sin problemas.",
                detailedRatings: [
                    { label: "Relación Precio-Calidad", score: 5.0, percentage: 100 },
                    { label: "Seguridad de Envío", score: 4.5, percentage: 90 },
                    { label: "Post-Venta", score: 4.0, percentage: 80 }
                ],
                likes: 42,
                comments: 5,
                store: "ElectroDirect",
                date: "Hace 2 días",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7lTyYtjV7lfup5per8LwvkXf1SeTKDEZDF1_VIT8DkzxmHVWRwofomAiDNp0PbZEMbgEC81--UFeLs5qTsitu45ucMs1vN_sfNmaK9zUksLod68kWQINHSv3O_AzekFnEa_ESel8nK0p_1fYEZFuyi3dPWz3bVsfVhX_N31uuc-sd8a_t_FZ_HxFYlGwXjEfAxHAxEc1n_rMMhnwNIXxsOWKMXysC677BstF_G2wq_TsuGU5feIODIz8M1sBLZEcOcaKB3YfLr73f"
            }
        ]
    }

    if (!mounted) return null

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen transition-colors">
            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Logo />
                        <div className="hidden md:flex relative w-80 group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                            <input
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 rounded-full text-sm outline-none transition-all"
                                placeholder="Buscar productos o tiendas..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => document.documentElement.classList.toggle('dark')}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-yellow-400"
                        >
                            <span className="material-icons dark:hidden">dark_mode</span>
                            <span className="material-icons hidden dark:block">light_mode</span>
                        </button>
                        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>
                        <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4 ml-2">
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-xs font-black tracking-tight">{user.name}</span>
                                <span className="text-[10px] text-primary font-bold uppercase tracking-tighter">Premium</span>
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden relative shadow-lg">
                                <Image src={user.avatar} alt="Avatar" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-3 space-y-6 animate-in slide-in-from-left-4 duration-500">
                        <nav className="bg-white dark:bg-slate-900 rounded-3xl border border-primary/5 p-3 shadow-xl overflow-hidden">
                            <div className="flex flex-col gap-1">
                                <Link href="#" className="flex items-center gap-4 px-5 py-4 text-primary bg-primary/5 rounded-2xl font-black transition-all">
                                    <span className="material-symbols-outlined fill-1">reviews</span>
                                    <span className="text-sm">Mis Reseñas</span>
                                </Link>
                                <Link href="#" className="flex items-center gap-4 px-5 py-4 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl font-bold text-sm transition-all group">
                                    <span className="material-symbols-outlined group-hover:text-primary transition-colors">thumbs_up_down</span>
                                    <span>Me gusta / No me gusta</span>
                                </Link>
                                <div className="my-3 border-t border-primary/5 mx-4"></div>
                                <p className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Favoritos</p>
                                <Link href="#" className="flex items-center gap-4 px-5 py-4 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl font-bold text-sm transition-all group">
                                    <span className="material-symbols-outlined text-red-400 group-hover:scale-110 transition-transform">inventory_2</span>
                                    <span>Productos</span>
                                </Link>
                                <Link href="#" className="flex items-center gap-4 px-5 py-4 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl font-bold text-sm transition-all group">
                                    <span className="material-symbols-outlined text-blue-400 group-hover:scale-110 transition-transform">storefront</span>
                                    <span>Tiendas</span>
                                </Link>
                                <div className="my-3 border-t border-primary/5 mx-4"></div>
                                <Link href="#" className="flex items-center gap-4 px-5 py-4 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl font-bold text-sm transition-all">
                                    <span className="material-symbols-outlined">group</span>
                                    <span>Siguiendo</span>
                                </Link>
                                <Link href="#" className="flex items-center gap-4 px-5 py-4 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl font-bold text-sm transition-all">
                                    <span className="material-symbols-outlined">settings</span>
                                    <span>Configuración</span>
                                </Link>
                            </div>
                        </nav>

                        {/* Progress Card */}
                        <div className="bg-gradient-to-br from-primary to-blue-700 p-8 rounded-3xl text-white shadow-2xl shadow-primary/30 relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                            <p className="text-sm font-black mb-3 flex items-center gap-2">
                                <span className="material-icons text-lg">workspace_premium</span>
                                ¡Conviértete en Experto!
                            </p>
                            <p className="text-xs text-blue-100 mb-6 font-medium leading-relaxed">Escribe 3 reseñas más para obtener tu insignia de verificado y beneficios exclusivos.</p>
                            <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden mb-3">
                                <div className="bg-white h-full transition-all duration-1000" style={{ width: `${user.progress.percentage}%` }}></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">{user.progress.current}/{user.progress.target} RESEÑAS</span>
                                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">FALTAN 3</span>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Profile Identity Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-primary/5 p-8 md:p-10 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                            <div className="relative flex flex-col md:flex-row items-center gap-8">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary to-blue-400 shadow-2xl">
                                        <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden relative">
                                            <Image src={user.avatar} alt="Perfil" fill className="object-cover transition-transform group-hover:scale-110 duration-500" />
                                        </div>
                                    </div>
                                    <span className="absolute bottom-2 right-2 bg-emerald-500 w-7 h-7 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"></span>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                                        <h2 className="text-3xl font-black tracking-tight">{user.name}</h2>
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                                            {user.badge}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 font-medium italic opacity-80 leading-relaxed max-w-xl">
                                        "{user.bio}"
                                    </p>
                                    <div className="flex items-center justify-center md:justify-start gap-10">
                                        <div className="text-center md:text-left">
                                            <span className="block font-black text-2xl tabular-nums">{user.stats.followers}</span>
                                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Seguidores</span>
                                        </div>
                                        <div className="text-center md:text-left border-x border-primary/5 px-10">
                                            <span className="block font-black text-2xl tabular-nums">{user.stats.following}</span>
                                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Siguiendo</span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="block font-black text-2xl tabular-nums">{user.stats.reviews}</span>
                                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Reseñas</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 self-start">
                                    <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all hover:opacity-90">
                                        Editar Perfil
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Favorite Products */}
                        <section>
                            <div className="flex justify-between items-end mb-8 px-2">
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight">Productos Favoritos</h3>
                                    <p className="text-sm text-slate-500 font-medium">Los artículos que tienes en la mira</p>
                                </div>
                                <button className="text-primary text-sm font-black hover:underline uppercase tracking-widest">Ver todos</button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {user.favorites.map((product) => (
                                    <div key={product.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-primary/5 overflow-hidden hover:shadow-2xl transition-all group shadow-sm">
                                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain transition-transform duration-700 group-hover:scale-110 p-6"
                                            />
                                            <button className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 p-2.5 rounded-2xl text-red-500 shadow-xl backdrop-blur-md active:scale-90 transition-all">
                                                <span className="material-icons text-base">favorite</span>
                                            </button>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="font-black text-sm mb-3 line-clamp-1 group-hover:text-primary transition-colors tracking-tight">{product.name}</h4>
                                            <div className="flex items-center justify-between pt-1">
                                                <span className="text-primary font-black text-lg">${product.price.toLocaleString('es-CL')}</span>
                                                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
                                                    <span className="material-icons text-amber-400 text-xs">star</span>
                                                    <span className="text-[10px] font-black text-amber-700 dark:text-amber-400">{product.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="bg-slate-50 dark:bg-slate-900/40 rounded-3xl border-2 border-dashed border-primary/10 flex flex-col items-center justify-center p-8 hover:bg-primary/5 hover:border-primary/30 transition-all group cursor-pointer">
                                    <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-primary transition-colors mb-4">add_circle</span>
                                    <p className="text-xs text-slate-400 font-black uppercase tracking-widest group-hover:text-primary transition-colors">Agregar nuevo</p>
                                </div>
                            </div>
                        </section>

                        {/* Recent Reviews */}
                        <section>
                            <div className="flex justify-between items-end mb-8 px-2">
                                <h3 className="text-2xl font-black tracking-tight">Reseñas Recientes</h3>
                                <div className="flex items-center gap-3 text-sm text-slate-500 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-primary/5">
                                    <span className="font-bold text-xs uppercase tracking-widest">Ordenar por:</span>
                                    <select className="bg-transparent border-none py-0 pl-1 font-black text-primary text-xs uppercase tracking-widest focus:ring-0 cursor-pointer outline-none">
                                        <option>Más recientes</option>
                                        <option>Mejor puntuadas</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {user.recentReviews.map((review) => (
                                    <div key={review.id} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-primary/5 shadow-xl transition-all hover:shadow-2xl">
                                        <div className="flex flex-col md:flex-row gap-8 mb-8">
                                            <div className="w-24 h-24 rounded-2xl bg-slate-50 dark:bg-slate-800 p-3 flex-shrink-0 relative overflow-hidden group">
                                                <Image src={review.image} alt="Product" fill className="object-contain transition-transform group-hover:scale-110" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
                                                    <div>
                                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{review.category}</p>
                                                        <h4 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">{review.product}</h4>
                                                    </div>
                                                    <div className="flex text-amber-400 gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={`material-symbols-outlined text-sm ${i < review.rating ? 'fill-1' : ''}`}>star</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="relative">
                                                <span className="material-icons absolute -top-4 -left-2 text-primary/10 text-5xl select-none">format_quote</span>
                                                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed relative z-10 pl-6">
                                                    "{review.content}"
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-primary/5">
                                                {review.detailedRatings.map((rating, i) => (
                                                    <div key={i} className="flex flex-col gap-3">
                                                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{rating.label}</span>
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                                                <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${rating.percentage}%` }}></div>
                                                            </div>
                                                            <span className="text-xs font-black text-primary tabular-nums">{rating.score.toFixed(1)}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <div className="flex items-center gap-6">
                                                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors group">
                                                        <span className="material-symbols-outlined text-xl group-hover:fill-1 transition-all">thumb_up</span>
                                                        <span>{review.likes} Me gusta</span>
                                                    </button>
                                                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors group">
                                                        <span className="material-symbols-outlined text-xl group-hover:fill-1 transition-all">comment</span>
                                                        <span>{review.comments} Comentarios</span>
                                                    </button>
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">Tienda: {review.store} • {review.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="text-center pt-4">
                                    <button className="px-12 py-4 rounded-2xl border-2 border-dashed border-primary/10 text-xs font-black uppercase tracking-widest hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all active:scale-95 shadow-sm">
                                        Cargar más reseñas
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-24 border-t border-primary/10 bg-white dark:bg-slate-950 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <Logo />
                            <p className="mt-6 text-slate-500 text-sm leading-relaxed font-medium">La comunidad #1 de reseñas honestas y comparativa de precios en Chile.</p>
                        </div>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-widest mb-6">Plataforma</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="#">Cómo funciona</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Tiendas verificadas</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Blog de expertos</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-widest mb-6">Soporte</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="#">Centro de ayuda</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Normas de la comunidad</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Reportar abuso</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-widest mb-6">Síguenos</h4>
                            <div className="flex gap-4">
                                {[{ i: 'facebook', l: 'Facebook' }, { i: 'camera_alt', l: 'Instagram' }, { i: 'alternate_email', l: 'Email' }].map((item, i) => (
                                    <button key={i} className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-primary/5 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all shadow-sm">
                                        <span className="material-icons text-sm">{item.i}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-primary/5 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            © 2026 Revius.cl - Todos los derechos reservados. Made with <span className="text-red-500">❤️</span> for reviewers.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
