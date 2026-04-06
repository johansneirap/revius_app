import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos de Servicio | Revius',
  description: 'Lee los términos y condiciones de uso de la plataforma Revius.cl.',
}

const SECTIONS = [
  {
    title: '1. Aceptación de los términos',
    body: 'Al acceder o usar Revius.cl (en adelante "Revius", "la plataforma" o "el servicio"), aceptas quedar vinculado por estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio. El uso continuado de la plataforma tras cualquier modificación constituye tu aceptación de los nuevos términos.',
  },
  {
    title: '2. Descripción del servicio',
    body: 'Revius es una plataforma de reviews y comparación de precios para productos de retail en Chile. Permite a los usuarios leer y escribir reseñas de productos, comparar precios entre tiendas, y acceder a un Credibility Score calculado algorítmicamente para cada review. El servicio se ofrece de forma gratuita para usuarios consumidores.',
  },
  {
    title: '3. Registro y cuenta de usuario',
    body: 'Para escribir reviews o acceder a funcionalidades avanzadas, debes crear una cuenta. Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de todas las actividades realizadas desde tu cuenta. Debes notificarnos inmediatamente si detectas uso no autorizado. Revius se reserva el derecho de cancelar cuentas que violen estos términos.',
  },
  {
    title: '4. Contenido del usuario',
    body: 'Al publicar una review u otro contenido en Revius, otorgas a la plataforma una licencia no exclusiva, libre de regalías y mundial para usar, reproducir, adaptar y distribuir dicho contenido en el contexto del servicio. Eres el único responsable del contenido que publicas. No está permitido publicar contenido falso, ofensivo, difamatorio, que infrinja derechos de terceros o que sea generado íntegramente por IA sin revelarlo.',
  },
  {
    title: '5. Conductas prohibidas',
    body: 'Queda prohibido: (a) publicar reviews falsas o incentivadas económicamente sin declararlo; (b) usar el servicio para fines ilegales o fraudulentos; (c) intentar acceder de forma no autorizada a sistemas de Revius; (d) realizar scraping masivo sin autorización escrita; (e) suplantar a otras personas o entidades; (f) interferir con el funcionamiento normal de la plataforma.',
  },
  {
    title: '6. Links de afiliados y publicidad',
    body: 'Revius puede incluir enlaces de afiliado a tiendas como Falabella, Ripley, Mercado Libre u otras. Al hacer clic en dichos enlaces y realizar una compra, Revius puede recibir una comisión. Esto no afecta el precio que pagas ni influye en los Credibility Scores ni en el contenido editorial de la plataforma.',
  },
  {
    title: '7. Exactitud de la información',
    body: 'Los precios, especificaciones y disponibilidad de productos mostrados en Revius provienen de fuentes externas y pueden no estar siempre actualizados. Revius no garantiza la exactitud, integridad o vigencia de dicha información. Siempre te recomendamos verificar los datos directamente en la tienda antes de realizar una compra.',
  },
  {
    title: '8. Limitación de responsabilidad',
    body: 'Revius no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de usar el servicio, incluyendo pérdidas económicas derivadas de decisiones de compra basadas en información de la plataforma. El servicio se provee "tal cual" y "según disponibilidad".',
  },
  {
    title: '9. Modificaciones al servicio',
    body: 'Revius se reserva el derecho de modificar, suspender o discontinuar cualquier parte del servicio en cualquier momento y sin previo aviso. También podemos actualizar estos Términos de Servicio. La versión vigente siempre estará disponible en esta página con la fecha de última actualización.',
  },
  {
    title: '10. Ley aplicable y resolución de disputas',
    body: 'Estos términos se rigen por las leyes de la República de Chile. Cualquier disputa derivada de o relacionada con estos términos se someterá a la jurisdicción de los tribunales ordinarios de justicia de la ciudad de Santiago de Chile. Si alguna disposición de estos términos resulta inválida, las demás disposiciones seguirán plenamente vigentes.',
  },
]

export default function TerminosServicio() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <span className="material-icons text-[16px]">gavel</span>
            Legal
          </span>
          <h1 className="mb-4 text-4xl font-black text-slate-900 dark:text-white">
            Términos de Servicio
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Última actualización: 5 de abril de 2026. Al usar Revius, aceptas estos términos.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">{s.title}</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-1 font-bold">¿Tienes preguntas sobre estos términos?</p>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Nuestro equipo está disponible para aclarar cualquier duda.
          </p>
          <Link href="/contacto" className="text-primary text-sm font-bold hover:underline">
            Contactar al equipo →
          </Link>
        </div>
      </section>
    </div>
  )
}
