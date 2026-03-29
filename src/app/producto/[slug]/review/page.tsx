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
    name: 'SonicPro Ultra X1 - Audífonos Noise Cancelling',
    image: '/images/headphones.png',
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, send data to API
    alert('Reseña publicada con éxito (Simulación)')
    router.push(`/producto/${params.slug}`)
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen text-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <button
            onClick={() => router.back()}
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12">
        {/* Product Info Header */}
        <div className="animate-in fade-in slide-in-from-top-4 mb-8 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm duration-500 dark:border-slate-800 dark:bg-slate-900">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
            <Image
              alt={product.name}
              src={product.image}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              Publicando reseña para
            </p>
            <h1 className="text-lg leading-tight font-bold">{product.name}</h1>
          </div>
        </div>

        {/* Progress Indicator (Static for this view but stylized) */}
        <nav className="mb-12 px-2">
          <div className="relative flex items-center justify-between">
            <div className="absolute top-5 left-0 -z-10 h-0.5 w-full bg-slate-200 dark:bg-slate-800"></div>
            <ProgressStep number={1} label="Calificación" active />
            <ProgressStep number={2} label="Detalles" />
            <ProgressStep number={3} label="Tienda y Fotos" />
          </div>
        </nav>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* General Rating Section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
              <span className="material-symbols-outlined text-primary">
                star
              </span>
              ¿Qué te pareció el producto?
            </h2>
            <div className="space-y-6">
              <div className="flex flex-col items-center py-4">
                <div className="flex gap-1 text-slate-200 dark:text-slate-700">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`material-icons text-5xl transition-all hover:scale-110 active:scale-95 ${
                        (hoverRating || rating) >= star ? 'text-amber-400' : ''
                      }`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      {(hoverRating || rating) >= star ? 'star' : 'star'}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
                  {rating
                    ? `${rating} de 5 estrellas`
                    : 'Haz clic para calificar'}
                </p>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                  Título de tu reseña
                </label>
                <input
                  className="focus:border-primary focus:ring-primary w-full rounded-xl border-slate-200 px-4 py-3 transition-all outline-none dark:border-slate-800 dark:bg-slate-800/50"
                  placeholder="Ej: Excelente calidad de sonido"
                  type="text"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                  Cuéntanos tu experiencia
                </label>
                <textarea
                  className="focus:border-primary focus:ring-primary w-full resize-none rounded-xl border-slate-200 px-4 py-3 transition-all outline-none dark:border-slate-800 dark:bg-slate-800/50"
                  placeholder="¿Qué es lo que más te gustó? ¿Lo recomendarías?"
                  rows={4}
                  minLength={20}
                  required
                ></textarea>
                <p className="text-right text-[10px] font-bold tracking-tighter text-slate-400 uppercase">
                  Mínimo 20 caracteres
                </p>
              </div>
            </div>
          </section>

          {/* Detailed Ratings Section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
              <span className="material-symbols-outlined text-primary">
                tune
              </span>
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
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
              <span className="material-symbols-outlined text-primary">
                add_a_photo
              </span>
              Fotos y Tienda
            </h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                  ¿Dónde lo compraste?
                </label>
                <select className="focus:border-primary focus:ring-primary w-full cursor-pointer appearance-none rounded-xl border-slate-200 px-4 py-3 transition-all outline-none dark:border-slate-800 dark:bg-slate-800">
                  <option>Selecciona una tienda</option>
                  <option>Amazon Store</option>
                  <option>ElectroDirect</option>
                  <option>BestAudio</option>
                  <option>Otra tienda</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                  Sube fotos del producto
                </label>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="group relative aspect-square overflow-hidden rounded-xl border-2 border-slate-100 dark:border-slate-800">
                    <Image
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      src={product.image}
                      fill
                      alt="Preview"
                    />
                    <button className="absolute top-2 right-2 rounded-full bg-rose-500 p-1 text-white shadow-lg transition-colors hover:bg-rose-600">
                      <span className="material-icons text-xs">close</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="hover:border-primary hover:bg-primary/5 group flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 transition-all dark:border-slate-800"
                  >
                    <span className="material-symbols-outlined group-hover:text-primary text-3xl text-slate-400 transition-colors">
                      add_photo_alternate
                    </span>
                    <span className="group-hover:text-primary text-[10px] font-bold tracking-widest text-slate-500 uppercase transition-colors">
                      Subir Foto
                    </span>
                  </button>
                </div>
                <p className="px-1 text-[10px] font-medium text-slate-400">
                  Puedes subir hasta 4 fotos en formato JPG o PNG.
                </p>
              </div>
            </div>
          </section>

          {/* Form Controls */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <button
              type="button"
              className="w-full rounded-2xl border-2 border-slate-100 py-4 font-bold text-slate-500 transition-all hover:bg-slate-50 active:scale-95 sm:w-1/3 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              Guardar Borrador
            </button>
            <button
              type="submit"
              className="bg-primary shadow-primary/20 hover:bg-primary/90 w-full transform rounded-2xl py-4 font-bold text-white shadow-xl transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95 sm:w-2/3"
            >
              Publicar Reseña
            </button>
          </div>
        </form>
      </main>

      <footer className="dark:bg-background-dark mt-12 border-t border-slate-200 bg-white py-12 transition-colors dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-2">
              verified
            </span>
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Tus reseñas ayudan a miles de compradores a tomar mejores
              decisiones.
            </span>
          </div>
          <p className="text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} Revius.cl - Plataforma de Reseñas
            Certificadas.
          </p>
        </div>
      </footer>
    </div>
  )
}

function ProgressStep({
  number,
  label,
  active = false,
}: {
  number: number
  label: string
  active?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`ring-background-light dark:ring-background-dark z-10 flex h-10 w-10 items-center justify-center rounded-full font-bold ring-8 transition-all duration-500 ${
          active
            ? 'bg-primary shadow-primary/20 scale-110 text-white shadow-lg'
            : 'border-2 border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-800'
        }`}
      >
        {number}
      </div>
      <span
        className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-500 ${active ? 'text-primary' : 'text-slate-400'}`}
      >
        {label}
      </span>
    </div>
  )
}

function SliderInput({
  label,
  minLabel,
  maxLabel,
  value,
  onChange,
}: {
  label: string
  minLabel: string
  maxLabel: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-black tabular-nums transition-all">
          {value.toFixed(1)}
        </span>
      </div>
      <input
        className="accent-primary h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 transition-all dark:bg-slate-800"
        max="5"
        min="1"
        step="0.5"
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <div className="flex justify-between text-[10px] font-bold tracking-tighter text-slate-400 uppercase">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}
