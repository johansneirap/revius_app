import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Revius',
  description:
    'Respuestas a las preguntas más comunes sobre Revius, nuestro sistema de reviews y el Credibility Score.',
}

const FAQS = [
  {
    q: '¿Por qué debería confiar en las reviews de Revius?',
    a: 'Cada review publicada en Revius es analizada por nuestro sistema de Credibility Score, que usa inteligencia artificial para detectar contenido falso o generado automáticamente. Priorizamos las reviews de compradores verificados y mostramos el score de forma transparente para que puedas evaluar cada opinión por ti mismo.',
  },
  {
    q: '¿Cómo se valida que una review es real?',
    a: 'Verificamos la autenticidad a través de tres factores: análisis de IA del texto para detectar patrones artificiales, verificación de compra real cuando el usuario conecta su cuenta de tienda, y votos de la comunidad sobre si la review fue útil. Los tres factores se combinan en el Credibility Score final.',
  },
  {
    q: '¿Puedo escribir una reseña en Revius?',
    a: 'Sí. Cualquier usuario registrado puede escribir reviews de productos. Solo necesitas crear una cuenta gratuita. Te recomendamos ser específico y honesto — las reviews detalladas y con argumentos concretos reciben mejores scores de credibilidad y ayudan mucho más a otros compradores.',
  },
  {
    q: '¿Revius importa reviews de otras plataformas?',
    a: 'Actualmente consolidamos información de precios de múltiples tiendas chilenas (Falabella, Ripley, Mercado Libre, entre otras) para mostrarte comparativas en tiempo real. Las reviews son escritas directamente por nuestra comunidad, lo que nos permite controlar la calidad y analizar su credibilidad de forma efectiva.',
  },
  {
    q: '¿Con qué frecuencia se actualizan los precios?',
    a: 'Los precios se actualizan diariamente desde las principales tiendas chilenas. El precio que ves refleja la información más reciente disponible. Siempre recomendamos confirmar el precio final en la tienda antes de comprar, ya que pueden existir variaciones por stock o promociones flash.',
  },
  {
    q: '¿Qué pasa si encuentro una review que parece falsa?',
    a: 'Puedes votar una review como "no útil" usando el sistema de votos de la comunidad. Esto afecta negativamente su Credibility Score con el tiempo. También puedes reportarla directamente al equipo de Revius a través de la página de Contacto y la revisaremos manualmente.',
  },
  {
    q: '¿Revius tiene alguna relación comercial con las tiendas que menciona?',
    a: 'Revius es una plataforma independiente. Podemos ganar una comisión de afiliado cuando un usuario hace clic en un enlace de compra hacia una tienda, pero esto no afecta las reviews ni los scores de credibilidad de ningún producto. Nuestra prioridad es siempre darte la información más honesta posible.',
  },
  {
    q: '¿Puedo solicitar que se agregue un producto al catálogo?',
    a: 'Sí. Si no encuentras el producto que buscas, puedes enviar una solicitud desde la página de búsqueda. Nuestro equipo revisa las solicitudes regularmente y prioriza los productos con más demanda de la comunidad.',
  },
  {
    q: '¿Es gratuito usar Revius?',
    a: 'Completamente gratuito para consumidores. Puedes buscar productos, leer reviews, comparar precios y escribir reseñas sin pagar nada. En el futuro ofreceremos funcionalidades premium opcionales como alertas de precio y acceso a informes de mercado.',
  },
  {
    q: '¿Cómo se financia Revius si es gratis?',
    a: 'Revius se financia a través de comisiones de afiliado cuando los usuarios realizan compras desde nuestra plataforma, y a través de publicidad nativa para marcas y retailers verificados. Esto nos permite mantener la plataforma gratuita para los consumidores sin comprometer la objetividad de nuestras reviews.',
  },
]

export default function PreguntasFrecuentes() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50 to-white px-4 py-16 text-center sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-3xl">
          <span className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold">
            <span className="material-icons text-[16px]">help</span>
            Soporte
          </span>
          <h1 className="mb-4 text-4xl font-black text-slate-900 sm:text-5xl dark:text-white">
            Preguntas Frecuentes
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Todo lo que necesitas saber sobre Revius, nuestro sistema de reviews y cómo te ayudamos
            a tomar mejores decisiones de compra.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="bg-primary/10 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold">
                  {i + 1}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white">{faq.q}</h3>
              </div>
              <p className="ml-9 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-2 font-bold">¿No encontraste lo que buscabas?</p>
          <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
            Escríbenos directamente y te responderemos a la brevedad.
          </p>
          <Link
            href="/contacto"
            className="bg-primary rounded-xl px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700"
          >
            Contactar al equipo
          </Link>
        </div>
      </section>
    </div>
  )
}
