import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Revius',
  description:
    'Conoce cómo Revius recopila, usa y protege tu información personal.',
}

const SECTIONS = [
  {
    title: '1. ¿Quién es responsable de tus datos?',
    body: 'Revius.cl es el responsable del tratamiento de los datos personales recopilados a través de esta plataforma. Si tienes preguntas sobre el manejo de tu información, puedes contactarnos en cualquier momento a través de nuestra página de Contacto.',
  },
  {
    title: '2. ¿Qué datos recopilamos?',
    body: 'Recopilamos los siguientes tipos de datos: (a) Datos de cuenta: nombre, dirección de email y contraseña (almacenada en formato encriptado) al registrarte. (b) Datos de uso: páginas visitadas, productos consultados, búsquedas realizadas y tiempo de sesión. (c) Datos de reviews: el contenido de las reseñas que publicas, calificaciones y votos. (d) Datos técnicos: dirección IP, tipo de navegador, sistema operativo y cookies de sesión. No recopilamos datos de tarjetas de crédito ni información financiera.',
  },
  {
    title: '3. ¿Para qué usamos tus datos?',
    body: 'Usamos tus datos para: (a) Proveer y mejorar el servicio de Revius. (b) Analizar la credibilidad de las reviews publicadas. (c) Enviarte comunicaciones relacionadas con tu cuenta (confirmaciones, recuperación de contraseña). (d) Con tu consentimiento explícito, enviarte el newsletter semanal con ofertas y reseñas destacadas. (e) Detectar y prevenir fraude o abuso de la plataforma. (f) Cumplir con obligaciones legales aplicables.',
  },
  {
    title: '4. ¿Con quién compartimos tus datos?',
    body: 'No vendemos ni cedemos tus datos personales a terceros con fines comerciales. Compartimos datos únicamente con: (a) Supabase (proveedor de base de datos e infraestructura), bajo contrato de procesamiento de datos. (b) Anthropic (proveedor de IA para análisis de reviews), de forma anonimizada. (c) Vercel (proveedor de hosting), para el funcionamiento técnico de la plataforma. (d) Autoridades competentes, cuando lo exija la ley chilena.',
  },
  {
    title: '5. Cookies y tecnologías similares',
    body: 'Revius usa cookies estrictamente necesarias para el funcionamiento de la sesión y autenticación. No usamos cookies de rastreo de terceros con fines publicitarios. Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar el funcionamiento de algunas funcionalidades como el inicio de sesión.',
  },
  {
    title: '6. Retención de datos',
    body: 'Conservamos tu información de cuenta mientras ésta esté activa. Si eliminas tu cuenta, borraremos tus datos personales en un plazo máximo de 30 días, salvo que la ley nos obligue a retenerlos por más tiempo. Las reviews publicadas pueden mantenerse de forma anonimizada para preservar la integridad del catálogo.',
  },
  {
    title: '7. Tus derechos',
    body: 'De conformidad con la Ley N°19.628 de Protección de la Vida Privada de Chile y, en lo que corresponda, con el Reglamento General de Protección de Datos (RGPD), tienes derecho a: (a) Acceder a los datos personales que tenemos sobre ti. (b) Rectificar datos incorrectos o desactualizados. (c) Solicitar la eliminación de tus datos ("derecho al olvido"). (d) Oponerte al tratamiento de tus datos para fines de marketing. (e) Portabilidad de tus datos en formato estructurado. Para ejercer estos derechos, contáctanos a través de la página de Contacto.',
  },
  {
    title: '8. Seguridad',
    body: 'Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos contra acceso no autorizado, alteración, divulgación o destrucción. Usamos conexiones cifradas (HTTPS), autenticación segura gestionada por Supabase Auth y acceso restringido a la base de datos mediante Row Level Security (RLS). Sin embargo, ningún sistema es 100% seguro.',
  },
  {
    title: '9. Menores de edad',
    body: 'Revius no está dirigido a personas menores de 14 años. No recopilamos intencionalmente datos de menores. Si eres padre o tutor y crees que tu hijo ha proporcionado datos personales en nuestra plataforma, contáctanos para eliminarlos.',
  },
  {
    title: '10. Cambios a esta política',
    body: 'Podemos actualizar esta Política de Privacidad periódicamente. La versión vigente siempre estará disponible en esta página con la fecha de última modificación. Si realizamos cambios significativos, te notificaremos por email o mediante un aviso destacado en la plataforma.',
  },
]

export default function PoliticaPrivacidad() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <span className="material-icons text-[16px]">lock</span>
            Privacidad
          </span>
          <h1 className="mb-4 text-4xl font-black text-slate-900 dark:text-white">
            Política de Privacidad
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Última actualización: 5 de abril de 2026. Tu privacidad es importante para nosotros.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {/* Summary box */}
        <div className="mb-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/30 dark:bg-blue-900/10">
          <div className="flex items-start gap-3">
            <span className="material-icons mt-0.5 text-blue-600 dark:text-blue-400">info</span>
            <div>
              <h2 className="mb-2 font-bold text-blue-900 dark:text-blue-300">Resumen rápido</h2>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-400">
                <li>✓ No vendemos tus datos a terceros.</li>
                <li>✓ Solo recopilamos lo necesario para el servicio.</li>
                <li>✓ Puedes pedir que borremos tu cuenta y datos en cualquier momento.</li>
                <li>✓ Usamos proveedores de infraestructura con estándares de seguridad altos.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">{s.title}</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-1 font-bold">¿Quieres ejercer tus derechos o tienes preguntas?</p>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Responderemos tu solicitud en un plazo máximo de 15 días hábiles.
          </p>
          <Link href="/contacto" className="text-primary text-sm font-bold hover:underline">
            Contactar al equipo →
          </Link>
        </div>
      </section>
    </div>
  )
}
