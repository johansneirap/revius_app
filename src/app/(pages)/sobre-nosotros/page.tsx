import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Revius',
  description:
    'Conoce la misión de Revius: empoderar a los consumidores chilenos con reviews verificadas y confiables.',
}

const VALUES = [
  {
    icon: 'verified',
    title: 'Confiabilidad',
    desc: 'Cada review es analizada por IA para detectar patrones sospechosos. Priorizamos la verdad sobre la cantidad.',
  },
  {
    icon: 'diversity_3',
    title: 'Comunidad',
    desc: 'Somos una plataforma construida por y para consumidores chilenos. Tu voz importa y ayuda a otros a decidir mejor.',
  },
  {
    icon: 'balance',
    title: 'Transparencia',
    desc: 'Publicamos nuestra metodología de credibilidad y explicamos cómo calculamos cada score. Sin letra chica.',
  },
  {
    icon: 'trending_up',
    title: 'Impacto real',
    desc: 'Cada review que verificamos es una mala decisión de compra evitada. Eso es lo que nos motiva a seguir.',
  },
]

export default function SobreNosotros() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50 to-white px-4 py-16 text-center sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-3xl">
          <span className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold">
            <span className="material-icons text-[16px]">favorite</span>
            Nuestra historia
          </span>
          <h1 className="mb-4 text-4xl font-black text-slate-900 sm:text-5xl dark:text-white">
            Compradores chilenos merecen reviews confiables
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Revius nació de una frustración simple: ¿por qué es tan difícil saber si un producto
            realmente vale la pena antes de comprarlo?
          </p>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-primary mb-2 text-sm font-bold tracking-widest uppercase">
              El problema
            </p>
            <h2 className="mb-4 text-2xl font-bold">El ecosistema de reviews está roto</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                Las tiendas como Falabella, Ripley y Mercado Libre tienen miles de reviews, pero
                muchas son falsas, están incentivadas o generadas por IA. Distinguirlas es casi
                imposible para el consumidor promedio.
              </p>
              <p>
                Además, cuando quieres investigar un producto, terminas abriendo diez pestañas
                distintas, comparando precios, leyendo foros y viendo videos — perdiendo horas
                antes de cada compra importante.
              </p>
              <p>
                El resultado: malas decisiones de compra, devoluciones costosas y desconfianza
                generalizada en las opiniones online.
              </p>
            </div>
          </div>
          <div>
            <p className="text-primary mb-2 text-sm font-bold tracking-widest uppercase">
              La solución
            </p>
            <h2 className="mb-4 text-2xl font-bold">
              Una sola plataforma con reviews que puedes creer
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                Revius consolida la información que necesitas y la verifica. Nuestro{' '}
                <strong className="text-slate-900 dark:text-slate-200">Credibility Score</strong>{' '}
                analiza cada review usando inteligencia artificial para detectar señales de
                contenido falso o inducido.
              </p>
              <p>
                Comparamos precios en tiempo real entre las principales tiendas chilenas y te
                mostramos dónde comprar más barato sin sacrificar confianza.
              </p>
              <p>Todo en un solo lugar, sin publicidad engañosa y sin letra chica.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16 sm:px-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-bold">Lo que nos define</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl">
                  <span className="material-icons text-primary">{v.icon}</span>
                </div>
                <h3 className="mb-2 font-bold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-2xl font-bold">Únete a la comunidad</h2>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            Crea tu cuenta, escribe reviews verificadas y ayuda a miles de compradores chilenos a
            tomar mejores decisiones.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="bg-primary rounded-xl px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700"
            >
              Crear cuenta gratis
            </Link>
            <Link
              href="/como-funciona"
              className="rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cómo funciona
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
