import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cómo Funciona | Revius',
  description:
    'Descubre cómo Revius consolida reviews verificadas y te ayuda a tomar mejores decisiones de compra en Chile.',
}

const STEPS = [
  {
    icon: 'search',
    number: '01',
    title: 'Busca tu producto',
    description:
      'Encuentra cualquier producto de tecnología, audio, hogar y más. Nuestro catálogo incluye los artículos más populares de las principales tiendas chilenas como Falabella, Ripley y Mercado Libre.',
  },
  {
    icon: 'rate_review',
    number: '02',
    title: 'Lee reviews consolidadas',
    description:
      'Accede a opiniones reales de compradores verificados. Cada review incluye calificación detallada y experiencia de uso, todo en un solo lugar para que no tengas que abrir diez pestañas distintas.',
  },
  {
    icon: 'verified',
    number: '03',
    title: 'Analiza la credibilidad',
    description:
      'Nuestro Credibility Score evalúa cada review para detectar opiniones falsas o generadas por IA. El badge de cada review te indica de inmediato en cuáles puedes confiar de verdad.',
  },
  {
    icon: 'shopping_cart',
    number: '04',
    title: 'Toma la mejor decisión',
    description:
      'Con información confiable y precios comparados entre tiendas, compra con seguridad sabiendo que elegiste la mejor opción disponible en Chile.',
  },
]

const FEATURES = [
  {
    icon: 'hub',
    title: 'Reviews en un solo lugar',
    desc: 'Centralizamos opiniones de compradores chilenos para darte la imagen completa de cada producto.',
  },
  {
    icon: 'psychology',
    title: 'Análisis con IA',
    desc: 'Detectamos reviews falsas o generadas por IA usando modelos de lenguaje de última generación.',
  },
  {
    icon: 'price_check',
    title: 'Comparación de precios',
    desc: 'Monitorea el precio en Falabella, Ripley, Mercado Libre y más tiendas en un solo lugar.',
  },
  {
    icon: 'workspace_premium',
    title: 'Compras verificadas',
    desc: 'Priorizamos las opiniones de compradores que han verificado su compra para mayor confianza.',
  },
]

export default function ComoFunciona() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50 to-white px-4 py-16 text-center sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-3xl">
          <span className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold">
            <span className="material-icons text-[16px]">info</span>
            Guía de uso
          </span>
          <h1 className="mb-4 text-4xl font-black text-slate-900 sm:text-5xl dark:text-white">
            ¿Cómo funciona Revius?
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Revius consolida reviews de productos de retail chileno y analiza su credibilidad
            para que tomes decisiones de compra más informadas y confiables.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="mb-12 text-center text-2xl font-bold">Cuatro pasos hacia una mejor compra</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex-shrink-0">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-xl text-white">
                  <span className="material-icons">{step.icon}</span>
                </div>
              </div>
              <div>
                <p className="text-primary mb-1 text-xs font-bold tracking-widest uppercase">
                  {step.number}
                </p>
                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16 sm:px-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-bold">¿Qué hace diferente a Revius?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="text-center">
                <div className="bg-primary/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
                  <span className="material-icons text-primary text-2xl">{f.icon}</span>
                </div>
                <h3 className="mb-2 font-bold">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-2xl font-bold">Empieza a explorar</h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            Encuentra el producto que buscas y lee reviews en las que realmente puedes confiar.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="bg-primary rounded-xl px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700"
            >
              Explorar productos
            </Link>
            <Link
              href="/escribir-resena"
              className="rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Escribir una reseña
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
