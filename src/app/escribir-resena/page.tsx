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
            name: "SonicPro Ultra X1",
            brand: "SonicPro",
            category: "Audio",
            slug: "sonicpro-ultra-x1",
            image: "/images/headphones.png",
            rating: 4.8
        },
        {
            name: "Aura Pro Wireless Gen 4",
            brand: "Aura",
            category: "Audio",
            slug: "aura-pro-wireless",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFbRlYmHsUxnbrQZ4T395vSHOiK9dy1gQKWPrq8EQ9vSb6qeZPRjh5dmsjg_6nR3SwXjGeiT8HbjKlV89eN7Zu9A8JPKh9Sra3-revrx5oyvwjgrIw3w9GFTI0fvrjN83qicv5MHZCqF_ilzUCiq0qrO3ZEfQ8OyITbpZR7EZ_Os3Uuvt-onHqPqlBTM4mUxJrjVCTEcWPNNauTa8QwEwOQXD7LdJ_iWVaynt_kUjce3AYHgDCcTlHlpFuchwjTgpb1PYChxECfBcP",
            rating: 4.9
        },
        {
            name: "Stellar Chronos White",
            brand: "Stellar",
            category: "Relojes",
            slug: "stellar-chronos",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4slPBzaJWCmlEe4SWrkGQyljxppAJuowJLpbzUHJpEorYCuw2ZZTOl3_9MmZESvraU_TOoJhzldGgR1JTqW_TzVbDGSuCoRB2BNSqhRt_yG9gSyIe4jBBpTJoOGa823atkiqbzSoS-tbgK1FNXe9nCYSz8R8CuK7hpL-k3l9IAqUcLytaKLEg5BQQsqLDP9cV5ZlR-hgA9r8R14Ja1umu0LgIDk0NqpXjUPg_FESu_5B47nnt5n9j4LcSU1Mbimd2wjYADTM56csY",
            rating: 4.7
        }
    ]

    const filteredProducts = popularProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 font-display transition-colors">
            {/* Nav Bar */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Logo />
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => document.documentElement.classList.toggle('dark')}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-yellow-400"
                            >
                                <span className="material-icons dark:hidden">dark_mode</span>
                                <span className="material-icons hidden dark:block">light_mode</span>
                            </button>
                            <Link href="/" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">
                                Volver al Inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary mb-4 uppercase tracking-widest">
                        Tu opinión importa
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                        ¿Qué producto quieres <span className="text-primary italic">reseñar</span> hoy?
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Busca el dispositivo que estás usando y ayuda a otros chilenos a tomar una decisión inteligente.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto mb-16 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl group-focus-within:opacity-100 opacity-0 transition-opacity"></div>
                    <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-primary/5 p-2 pr-6">
                        <div className="flex-1 flex items-center px-4">
                            <span className="material-icons text-slate-400 mr-3">search</span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Escribe el nombre del producto, marca o modelo..."
                                className="w-full py-4 bg-transparent outline-none font-medium text-lg"
                            />
                        </div>
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <span className="material-icons text-xl">close</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Grid Results */}
                <div>
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            {searchQuery ? `Resultados para "${searchQuery}"` : 'Productos populares para reseñar'}
                        </h2>
                        <span className="text-[10px] font-medium text-slate-400">Mostrando {filteredProducts.length} productos</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.slug}
                                href={`/producto/${product.slug}/review`}
                                className="group bg-white dark:bg-slate-900 p-4 rounded-3xl border border-primary/5 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all flex items-center gap-6"
                            >
                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 flex-shrink-0">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">{product.brand}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span className="text-[10px] font-medium text-slate-500">{product.category}</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-1 mt-2">
                                        <span className="material-icons text-amber-400 text-sm">star</span>
                                        <span className="text-xs font-bold">{product.rating}</span>
                                    </div>
                                </div>
                                <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-icons">chevron_right</span>
                                </div>
                            </Link>
                        ))}

                        {filteredProducts.length === 0 && (
                            <div className="col-span-full py-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <span className="material-icons text-4xl text-slate-300 mb-4">sentiment_dissatisfied</span>
                                <p className="font-bold text-slate-500">No encontramos ese producto...</p>
                                <button className="mt-4 text-primary font-bold hover:underline">¡Sugiérenos agregarlo!</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Call to Action for Expert Panel */}
                <div className="mt-24 p-8 bg-primary rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/30">
                    <div className="max-w-md text-center md:text-left">
                        <h3 className="text-2xl font-black mb-2 flex items-center justify-center md:justify-start gap-2">
                            <span className="material-icons">verified</span>
                            ¿Eres un experto en nicho?
                        </h3>
                        <p className="text-blue-100 font-medium">Únete a nuestro panel certificado y recibe beneficios exclusivos por tus reseñas profesionales.</p>
                    </div>
                    <button className="bg-white text-primary font-black px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-lg active:scale-95">
                        Postular al Panel
                    </button>
                </div>
            </main>
        </div>
    )
}
