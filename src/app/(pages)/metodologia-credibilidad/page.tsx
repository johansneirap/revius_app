import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Metodología de Credibilidad | Revius',
  description:
    'Descubre cómo Revius calcula el Credibility Score de cada review usando IA, compras verificadas y votos de la comunidad.',
}

const COMPONENTS = [
  {
    icon: 'psychology',
    colorClass: 'bg-purple-500',
    label: 'Análisis de IA',
    weight: '60%',
    widthClass: 'w-[60%]',
    desc: 'El componente más importante. Nuestro modelo analiza el texto de cada review buscando patrones asociados a contenido generado por IA o comprado. Evalúa coherencia, especificidad y naturalidad del lenguaje. Un score alto de probabilidad de IA reduce significativamente la credibilidad final.',
  },
  {
    icon: 'receipt_long',
    colorClass: 'bg-green-500',
    label: 'Compra Verificada',
    weight: '25%',
    widthClass: 'w-[25%]',
    desc: 'Las reviews de compradores que han verificado su transacción reciben un bonus de confianza de 25 puntos. Sin verificación, el bonus base es de 15 puntos. Una compra real es el fundamento de una opinión genuina.',
  },
  {
    icon: 'thumb_up',
    colorClass: 'bg-amber-500',
    label: 'Votos de la Comunidad',
    weight: '15%',
    widthClass: 'w-[15%]',
    desc: 'La comunidad vota si una review resultó útil o no. Las reviews que la comunidad valora positivamente reciben un boost proporcional en su score final. Este factor incentiva la calidad y el detalle en las opiniones.',
  },
]

const BADGES = [
  {
    label: 'Alta Confiabilidad',
    range: '≥ 0.65',
    colorClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    desc: 'Review con alta probabilidad de ser genuina, detallada y útil para tomar decisiones.',
  },
  {
    label: 'Confiabilidad Media',
    range: '0.40 – 0.64',
    colorClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    desc: 'Review que puede ser valiosa pero presenta algunas señales de alerta a considerar.',
  },
  {
    label: 'Baja Confiabilidad',
    range: '< 0.40',
    colorClass: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    desc: 'Review con indicadores fuertes de contenido falso, inducido o generado artificialmente.',
  },
  {
    label: 'Analizando...',
    range: 'pendiente',
    colorClass: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
    desc: 'El análisis de IA está en proceso. Se actualiza automáticamente en segundos tras publicar.',
  },
]

export default function MetodologiaCredibilidad() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50 to-white px-4 py-16 text-center sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-3xl">
          <span className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold">
            <span className="material-icons text-[16px]">science</span>
            Metodología abierta
          </span>
          <h1 className="mb-4 text-4xl font-black text-slate-900 sm:text-5xl dark:text-white">
            Credibility Score
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Calculamos la confiabilidad de cada review usando inteligencia artificial, verificación
            de compras y la sabiduría colectiva de nuestra comunidad.
          </p>
        </div>
      </section>

      {/* Formula */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-2xl font-bold">La fórmula</h2>
          <div className="mx-auto inline-block overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 dark:border-slate-700 dark:bg-slate-900">
            <code className="block whitespace-nowrap text-sm">
              <span className="text-primary font-bold">credibility_score</span>
              <span className="text-slate-600 dark:text-slate-400"> = </span>
              <span className="text-purple-600 dark:text-purple-400">(1 − ai_prob)</span>
              <span className="text-slate-600 dark:text-slate-400"> × 0.60 + </span>
              <span className="text-green-600 dark:text-green-400">verified_bonus</span>
              <span className="text-slate-600 dark:text-slate-400"> + </span>
              <span className="text-amber-600 dark:text-amber-400">helpful_ratio</span>
              <span className="text-slate-600 dark:text-slate-400"> × 0.15</span>
            </code>
          </div>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            donde{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">
              verified_bonus
            </code>{' '}
            = 0.25 si compra verificada, 0.15 si no.
          </p>
        </div>

        <div className="space-y-6">
          {COMPONENTS.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${c.colorClass}`}
                  >
                    <span className="material-icons text-[20px]">{c.icon}</span>
                  </div>
                  <h3 className="font-bold">{c.label}</h3>
                </div>
                <span className="text-xl font-black text-slate-900 dark:text-white">{c.weight}</span>
              </div>
              <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className={`h-full rounded-full ${c.colorClass} ${c.widthClass}`} />
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section className="border-y border-slate-100 bg-slate-50 px-4 py-16 sm:px-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-2xl font-bold">Umbrales del badge</h2>
          <p className="mb-10 text-center text-slate-500 dark:text-slate-400">
            Cada review muestra uno de estos badges según su score calculado.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
              >
                <span
                  className={`mt-0.5 flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold ${b.colorClass}`}
                >
                  {b.label}
                </span>
                <div>
                  <p className="mb-1 text-xs font-bold text-slate-400">Score: {b.range}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI note */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-purple-100 bg-purple-50 p-8 dark:border-purple-900/30 dark:bg-purple-900/10">
          <div className="flex items-start gap-4">
            <span className="material-icons mt-0.5 text-purple-600 dark:text-purple-400">
              auto_awesome
            </span>
            <div>
              <h3 className="mb-2 font-bold text-purple-900 dark:text-purple-300">
                Modelo de IA utilizado
              </h3>
              <p className="text-sm leading-relaxed text-purple-800 dark:text-purple-400">
                Usamos <strong>Claude Haiku</strong> de Anthropic para analizar cada review. El
                modelo evalúa la probabilidad de contenido generado por IA, sesgo editorial, temas
                mencionados y sentimiento general. El análisis se ejecuta en segundo plano y tarda
                menos de 8 segundos por review. Nunca interferimos con el contenido original.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            ¿Tienes preguntas sobre nuestra metodología?
          </p>
          <Link
            href="/preguntas-frecuentes"
            className="text-primary font-semibold hover:underline"
          >
            Ver preguntas frecuentes →
          </Link>
        </div>
      </section>
    </div>
  )
}
