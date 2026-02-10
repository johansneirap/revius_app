'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { useParams, useRouter } from 'next/navigation'

export default function ReviewPage() {
    const params = useParams()
    const router = useRouter()
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [qualityPrice, setQualityPrice] = useState(4.5)
    const [shippingSafety, setShippingSafety] = useState(5.0)
    const [afterSales, setAfterSales] = useState(3.0)

    // Mock product data (in a real app, this would be fetched based on params.slug)
    const product = {
        name: "SonicPro Ultra X1 - Audífonos Noise Cancelling",
        image: "/images/headphones.png",
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, send data to API
        alert('Reseña publicada con éxito (Simulación)')
        router.push(`/producto/${params.slug}`)
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 shadow-sm sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    <Logo />
                    <button
                        onClick={() => router.back()}
                        className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                    >
                        <span className="material-icons">close</span>
                    </button>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
                {/* Product Info Header */}
                <div className="flex items-center gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                        <Image
                            alt={product.name}
                            src={product.image}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Publicando reseña para</p>
                        <h1 className="text-lg font-bold leading-tight">{product.name}</h1>
                    </div>
                </div>

                {/* Progress Indicator (Static for this view but stylized) */}
                <nav className="mb-12 px-2">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-10"></div>
                        <ProgressStep number={1} label="Calificación" active />
                        <ProgressStep number={2} label="Detalles" />
                        <ProgressStep number={3} label="Tienda y Fotos" />
                    </div>
                </nav>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* General Rating Section */}
                    <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">star</span>
                            ¿Qué te pareció el producto?
                        </h2>
                        <div className="space-y-6">
                            <div className="flex flex-col items-center py-4">
                                <div className="flex gap-1 text-slate-200 dark:text-slate-700">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className={`material-icons text-5xl transition-all hover:scale-110 active:scale-95 ${(hoverRating || rating) >= star ? 'text-amber-400' : ''
                                                }`}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setRating(star)}
                                        >
                                            {(hoverRating || rating) >= star ? 'star' : 'star'}
                                        </button>
                                    ))}
                                </div>
                                <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    {rating ? `${rating} de 5 estrellas` : 'Haz clic para calificar'}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Título de tu reseña</label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-800/50 focus:border-primary focus:ring-primary outline-none transition-all"
                                    placeholder="Ej: Excelente calidad de sonido"
                                    type="text"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Cuéntanos tu experiencia</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-800/50 focus:border-primary focus:ring-primary outline-none transition-all resize-none"
                                    placeholder="¿Qué es lo que más te gustó? ¿Lo recomendarías?"
                                    rows={4}
                                    minLength={20}
                                    required
                                ></textarea>
                                <p className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Mínimo 20 caracteres</p>
                            </div>
                        </div>
                    </section>

                    {/* Detailed Ratings Section */}
                    <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">tune</span>
                            Calificación detallada
                        </h2>
                        <div className="space-y-8">
                            <SliderInput
                                label="Calidad-Precio"
                                minLabel="Pobre"
                                maxLabel="Excelente"
                                value={qualityPrice}
                                onChange={setQualityPrice}
                            />
                            <SliderInput
                                label="Seguridad de Envío"
                                minLabel="Frágil"
                                maxLabel="Muy Seguro"
                                value={shippingSafety}
                                onChange={setShippingSafety}
                            />
                            <SliderInput
                                label="Postventa"
                                minLabel="Deficiente"
                                maxLabel="Excepcional"
                                value={afterSales}
                                onChange={setAfterSales}
                            />
                        </div>
                    </section>

                    {/* Media & Store Section */}
                    <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">add_a_photo</span>
                            Fotos y Tienda
                        </h2>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">¿Dónde lo compraste?</label>
                                <select className="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-800 focus:border-primary focus:ring-primary outline-none transition-all appearance-none cursor-pointer">
                                    <option>Selecciona una tienda</option>
                                    <option>Amazon Store</option>
                                    <option>ElectroDirect</option>
                                    <option>BestAudio</option>
                                    <option>Otra tienda</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Sube fotos del producto</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 group">
                                        <Image
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                            src={product.image}
                                            fill
                                            alt="Preview"
                                        />
                                        <button className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-full shadow-lg hover:bg-rose-600 transition-colors">
                                            <span className="material-icons text-xs">close</span>
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        className="aspect-square border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all group"
                                    >
                                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-3xl">add_photo_alternate</span>
                                        <span className="text-[10px] font-bold text-slate-500 group-hover:text-primary transition-colors uppercase tracking-widest">Subir Foto</span>
                                    </button>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium px-1">Puedes subir hasta 4 fotos en formato JPG o PNG.</p>
                            </div>
                        </div>
                    </section>

                    {/* Form Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            type="button"
                            className="w-full sm:w-1/3 py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
                        >
                            Guardar Borrador
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-2/3 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
                        >
                            Publicar Reseña
                        </button>
                    </div>
                </form>
            </main>

            <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-12 mt-12 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-full">verified</span>
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Tus reseñas ayudan a miles de compradores a tomar mejores decisiones.</span>
                    </div>
                    <p className="text-slate-400 text-xs font-medium">© {new Date().getFullYear()} Revius.cl - Plataforma de Reseñas Certificadas.</p>
                </div>
            </footer>
        </div>
    )
}

function ProgressStep({ number, label, active = false }: { number: number; label: string; active?: boolean }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ring-8 ring-background-light dark:ring-background-dark transition-all duration-500 z-10 ${active ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400'
                }`}>
                {number}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 ${active ? 'text-primary' : 'text-slate-400'}`}>
                {label}
            </span>
        </div>
    )
}

function SliderInput({ label, minLabel, maxLabel, value, onChange }: { label: string; minLabel: string; maxLabel: string; value: number; onChange: (v: number) => void }) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
                <label className="font-bold text-slate-700 dark:text-slate-300 text-sm">{label}</label>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-black text-sm tabular-nums transition-all">
                    {value.toFixed(1)}
                </span>
            </div>
            <input
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary transition-all"
                max="5"
                min="1"
                step="0.5"
                type="range"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>
        </div>
    )
}
