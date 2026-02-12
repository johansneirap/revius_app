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
            name: "Audífonos Premium Gen 3",
            description: "Next-gen audio con ANC adaptativo",
            price: 249900,
            rating: 4.8,
            reviewsCount: 1200,
            stores: 12,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7lTyYtjV7lfup5per8LwvkXf1SeTKDEZDF1_VIT8DkzxmHVWRwofomAiDNp0PbZEMbgEC81--UFeLs5qTsitu45ucMs1vN_sfNmaK9zUksLod68kWQINHSv3O_AzekFnEa_ESel8nK0p_1fYEZFuyi3dPWz3bVsfVhX_N31uuc-sd8a_t_FZ_HxFYlGwXjEfAxHAxEc1n_rMMhnwNIXxsOWKMXysC677BstF_G2wq_TsuGU5feIODIz8M1sBLZEcOcaKB3YfLr73f"
        },
        {
            id: 2,
            name: "Studio Master Wireless",
            description: "Diseño ergonómico para estudio",
            price: 189900,
            rating: 4.5,
            reviewsCount: 856,
            stores: 8,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHaOcQOKQ9ZB5P1LAwUgrVPd2kwA66qbmIjKmforRorg2SbBxzoNslWw0owfoSSuAXtXGliDm8s44NdSAFMKHG4qD3-2eye3uRrdDIrKgezcNgNcbHsHfOAyNpAi0tjiqI_FcLmmjJoWHISTGvQQ96seWO6vTQwiXXEUGf9-PcInz22nXt4NNopnOU9uQs3IzkwiHRbi07LIEuPGIkgsoPfpPHKTSrdXp9f_-mFgGeTOMIx8_RHKLHd70pxExtTiq0rR3yJwdzLs6k"
        },
        {
            id: 3,
            name: "Compact Bass Pods",
            description: "Bajos profundos en formato mini",
            price: 89900,
            rating: 4.2,
            reviewsCount: 432,
            stores: 5,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyVelRa6DnGpDkK2j9pjMLrbbtu1EZgCbxIS3uQzwZ93nr8S7R13To5kpHaKKwBSPQAUnQlLXQ0KWY9dODJw4lUyRCROq9xISIkmIU777niLWj0NA-24V1STT6oi3BZq96WU5gglWrzqasevjQap4qOAjBMVST1GQXBvut3gJK8O7mPve6ODygURJn4Czh9y9p_deeEzP-qL1xT5aYVT9_YZ_id4fIIZ6FCCuS0pHM7AGjneTlPuNHoYHkCnYUvMCkW0zFaEHmvO74"
        }
    ]

    const stores = [
        { id: 1, name: "Amzn Store", initials: "AM", verified: true, rating: 4.9, sales: "12k+", status: "Reputación excelente" },
        { id: 2, name: "ElectroDirect", initials: "ED", verified: false, rating: 4.5, sales: "5k+", status: "Buena atención" }
    ]

    if (!mounted) return null

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen transition-colors">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-primary/10 py-3 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8">
                    <Logo />
                    <div className="flex-grow max-w-2xl relative group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        <input
                            className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-primary/20 rounded-2xl text-sm outline-none transition-all shadow-inner focus:bg-white dark:focus:bg-slate-900"
                            placeholder="Buscar productos, tiendas o personas..."
                            type="text"
                            defaultValue="Audífonos noise cancelling"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => document.documentElement.classList.toggle('dark')}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-yellow-400"
                        >
                            <span className="material-icons dark:hidden">dark_mode</span>
                            <span className="material-icons hidden dark:block">light_mode</span>
                        </button>
                        <button className="p-2 text-slate-500 hover:text-primary transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>
                        <Link href="/perfil" className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg hover:border-primary/50 transition-all">
                            <Image alt="Profile" width={40} height={40} className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZYBVG4OLBumXdE6zKS18f-Yrx5mWOmeJ2rUJ9OuUJHSVKtQV4E2eXe2FBaS8brE1X2GwcRjghRH28ugSLfStAYX__u8nNk7XLYZQOWZMUX1TFFJTFzySvYv51QTZBc0MXOtyLUZs92eUvPO1LLG3WysGx0ALGoMSIjdZaj2w478FTLjkBsgBaWxwelMCAQQFc8oTC2Lb7RqeftJAr-VKeIruzdqHYjADIL26tbpbFax6WwiNbpXmz4e-i7HgwljgGCsZcpmeywWUz" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Breadcrumbs & Results Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <nav className="flex text-[10px] font-black uppercase tracking-widest text-slate-400 gap-3 items-center">
                        <Link className="hover:text-primary transition-colors" href="/">Inicio</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-slate-900 dark:text-slate-300">Búsqueda Universal</span>
                    </nav>
                    <p className="text-sm font-bold text-slate-500">Se encontraron <span className="font-black text-primary">1,240</span> resultados</p>
                </div>

                {/* Tabs Navigation */}
                <div className="border-b border-primary/5 mb-10">
                    <div className="flex gap-10 overflow-x-auto pb-px">
                        {[
                            { id: 'productos', label: 'Productos', count: 856, icon: 'shopping_bag' },
                            { id: 'tiendas', label: 'Tiendas', count: 24, icon: 'store' },
                            { id: 'personas', label: 'Personas', count: 12, icon: 'group' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 text-xs font-black uppercase tracking-widest whitespace-nowrap flex items-center gap-3 transition-all border-b-4 ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                <span className={`material-symbols-outlined text-xl ${activeTab === tab.id ? 'fill-1' : ''}`}>{tab.icon}</span>
                                {tab.label} <span className="text-[10px] opacity-50">({tab.count})</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Filters Aside */}
                    <aside className="lg:col-span-3 space-y-10 animate-in slide-in-from-left-4 duration-500">
                        <div>
                            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] mb-6 text-slate-400">Categoría</h3>
                            <div className="space-y-3">
                                {['Electrónica', 'Audio & Música', 'Computación'].map((cat, i) => (
                                    <label key={cat} className="flex items-center gap-4 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" defaultChecked={i === 0} className="peer appearance-none w-5 h-5 rounded-md border-2 border-primary/20 checked:bg-primary checked:border-primary transition-all cursor-pointer" />
                                            <span className="material-icons absolute opacity-0 peer-checked:opacity-100 text-white text-xs left-1 pointer-events-none">check</span>
                                        </div>
                                        <span className="text-sm font-bold group-hover:text-primary transition-colors">{cat}</span>
                                        <span className="ml-auto text-[10px] font-black text-slate-300 tabular-nums">432</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] mb-6 text-slate-400">Rango de Precio</h3>
                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative group">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 group-focus-within:text-primary transition-colors">$</span>
                                        <input className="w-full pl-7 pr-3 py-2.5 text-xs font-bold rounded-xl border-2 border-primary/5 dark:bg-slate-900/50 outline-none focus:border-primary/20 transition-all" placeholder="Min" type="number" />
                                    </div>
                                    <div className="relative group">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 group-focus-within:text-primary transition-colors">$</span>
                                        <input className="w-full pl-7 pr-3 py-2.5 text-xs font-bold rounded-xl border-2 border-primary/5 dark:bg-slate-900/50 outline-none focus:border-primary/20 transition-all" placeholder="Max" type="number" />
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95">Aplicar Filtro</button>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] mb-6 text-slate-400">Región (Chile)</h3>
                            <div className="relative">
                                <select className="w-full appearance-none py-3 px-4 text-xs font-bold rounded-xl border-2 border-primary/5 dark:bg-slate-900/50 outline-none focus:border-primary/20 cursor-pointer">
                                    <option>Todas las regiones</option>
                                    <option>Metropolitana</option>
                                    <option>Valparaíso</option>
                                    <option>Biobío</option>
                                </select>
                                <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">expand_more</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-3xl border border-primary/10 shadow-inner">
                            <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="material-icons text-sm">lightbulb</span>
                                Sugerencia
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">¿No encuentras lo que buscas? Intenta usar términos más generales o limpia los filtros activos.</p>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="lg:col-span-9 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex justify-between items-center px-2">
                            <h2 className="text-2xl font-black tracking-tight">{activeTab === 'productos' ? 'Productos Populares' : activeTab === 'tiendas' ? 'Tiendas Destacadas' : 'Comunidad Encontrada'}</h2>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ordenar por:</span>
                                <select className="text-xs font-black uppercase tracking-widest border-none bg-transparent text-primary focus:ring-0 cursor-pointer outline-none">
                                    <option>Más relevantes</option>
                                    <option>Precio: Menor a Mayor</option>
                                    <option>Mejor calificados</option>
                                </select>
                            </div>
                        </div>

                        {activeTab === 'productos' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-primary/5 overflow-hidden hover:shadow-2xl transition-all duration-500 shadow-xl">
                                        <div className="aspect-[4/3] relative overflow-hidden bg-slate-50 dark:bg-slate-800 p-8">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain transition-transform duration-700 group-hover:scale-110 p-8"
                                            />
                                            <div className="absolute top-5 right-5">
                                                <button className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur shadow-xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-all active:scale-90">
                                                    <span className="material-symbols-outlined text-xl">favorite</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                                                    <span className="material-symbols-outlined text-[14px] fill-1 text-amber-500">star</span>
                                                    <span className="text-xs font-black text-amber-700 dark:text-amber-400">{product.rating}</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">({product.reviewsCount} reviews)</span>
                                            </div>
                                            <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                                            <p className="text-xs text-slate-500 font-medium mb-6 italic opacity-70 leading-relaxed">{product.description}</p>
                                            <div className="flex items-end justify-between pt-6 border-t border-primary/5">
                                                <div>
                                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Desde</p>
                                                    <p className="text-2xl font-black text-primary">${product.price.toLocaleString('es-CL')}</p>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-slate-500 shadow-sm border border-primary/5">{product.stores} Tiendas</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'tiendas' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {stores.map((store) => (
                                    <div key={store.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-primary/5 flex items-center gap-8 group cursor-pointer hover:shadow-2xl transition-all shadow-xl">
                                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-2xl font-black text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                            {store.initials}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-black tracking-tight">{store.name}</h3>
                                                {store.verified && <span className="material-symbols-outlined text-primary text-xl fill-1">verified</span>}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-6">
                                                <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                                                    <span className="material-symbols-outlined text-sm text-amber-500 fill-1">stars</span>
                                                    <span className="text-xs font-black text-amber-700 dark:text-amber-400">{store.rating}</span>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{store.sales} Ventas</span>
                                                <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">{store.status}</span>
                                            </div>
                                        </div>
                                        <span className="material-icons text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all">chevron_right</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Community Promo Banner */}
                        <div className="mt-20 bg-slate-900 dark:bg-slate-800 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl group">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-all"></div>
                            <div className="relative z-10 md:max-w-lg">
                                <span className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 inline-block">Comunidad Revius</span>
                                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tighter italic">Conecta con los expertos</h2>
                                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">Sigue a personas que ya probaron estos productos y toma la mejor decisión basada en <span className="text-white">experiencias reales</span>.</p>
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-14 h-14 rounded-full border-4 border-slate-900 bg-slate-700 overflow-hidden relative shadow-2xl">
                                                <Image fill src={`https://lh3.googleusercontent.com/aida-public/AB6AXuBZYBVG4OLBumXdE6zKS18f-Yrx5mWOmeJ2rUJ9OuUJHSVKtQV4E2eXe2FBaS8brE1X2GwcRjghRH28ugSLfStAYX__u8nNk7XLYZQOWZMUX1TFFJTFzySvYv51QTZBc0MXOtyLUZs92eUvPO1LLG3WysGx0ALGoMSIjdZaj2w478FTLjkBsgBaWxwelMCAQQFc8oTC2Lb7RqeftJAr-VKeIruzdqHYjADIL26tbpbFax6WwiNbpXmz4e-i7HgwljgGCsZcpmeywWUz`} alt="User" />
                                            </div>
                                        ))}
                                        <div className="w-14 h-14 rounded-full border-4 border-slate-900 bg-primary flex items-center justify-center text-xs font-black shadow-2xl relative z-10">+12k</div>
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-widest text-primary">Usuarios Activos</p>
                                </div>
                                <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">Explorar Personas</button>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-2/3 opacity-30 pointer-events-none group-hover:opacity-40 transition-opacity">
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
            <footer className="bg-white dark:bg-slate-950 border-t border-primary/10 py-20 mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                        <div className="col-span-1 md:col-span-1">
                            <Logo />
                            <p className="mt-8 text-slate-500 text-sm font-medium leading-relaxed">La plataforma número uno en Chile para comparar precios y leer reseñas reales de la comunidad.</p>
                        </div>
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-widest mb-8 text-slate-400">Plataforma</h4>
                            <ul className="text-sm font-bold text-slate-500 space-y-4">
                                <li><Link className="hover:text-primary transition-colors" href="#">Cómo funciona</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Tiendas asociadas</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Categorías</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-widest mb-8 text-slate-400">Comunidad</h4>
                            <ul className="text-sm font-bold text-slate-500 space-y-4">
                                <li><Link className="hover:text-primary transition-colors" href="#">Guías de compra</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Top Influencers</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="/escribir-resena">Escribir una reseña</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-widest mb-8 text-slate-400">Newsletter</h4>
                            <p className="text-xs font-medium text-slate-500 mb-6">Recibe las mejores ofertas y reseñas en tu correo.</p>
                            <div className="flex gap-2 p-1.5 bg-slate-50 dark:bg-slate-900 border border-primary/5 rounded-2xl group shadow-inner">
                                <input className="flex-1 bg-transparent border-none rounded-xl text-xs px-4 py-3 font-bold outline-none" placeholder="Tu email" type="email" />
                                <button className="bg-primary text-white p-3 rounded-xl shadow-lg active:scale-90 transition-all overflow-hidden relative">
                                    <span className="material-symbols-outlined text-sm relative z-10">send</span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-focus-within:translate-y-0 transition-transform"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <p>© 2026 Revius.cl - Transparencia en tus compras.</p>
                        <div className="flex gap-10">
                            <Link className="hover:text-primary transition-colors" href="#">Términos</Link>
                            <Link className="hover:text-primary transition-colors" href="#">Privacidad</Link>
                            <Link className="hover:text-primary transition-colors" href="#">Cookies</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
