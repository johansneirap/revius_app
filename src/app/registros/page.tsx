import Link from 'next/link'
import Logo from '@/components/Logo'

export default function RegistrosPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display flex min-h-screen flex-col text-slate-800 dark:text-slate-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-slate-200 bg-white px-6 py-4 md:px-12 dark:border-slate-800 dark:bg-slate-900">
        <Logo />
        <div className="flex items-center gap-6">
          <Link
            className="hover:text-primary text-sm font-medium text-slate-600 transition-colors dark:text-slate-400"
            href="/"
          >
            Volver al inicio
          </Link>
          <Link
            className="bg-primary/10 text-primary hover:bg-primary/20 rounded-lg px-4 py-2 text-sm font-semibold transition-all"
            href="#"
          >
            Iniciar Sesión
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-grow flex-col items-center justify-center px-4 py-12">
        {/* Header Section */}
        <div className="mb-12 max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl dark:text-white">
            Gestión de Registros
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Únete a la comunidad de reseñas más grande de Chile. Selecciona el
            tipo de cuenta que mejor se adapte a tus necesidades.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* User Registration Card */}
          <RegistrationCard
            icon="person"
            title="Soy Comprador"
            description="Comparte tus experiencias de compra y ayuda a otros usuarios a tomar mejores decisiones."
            benefits={[
              'Escribe reseñas honestas y detalladas',
              'Gana puntos y reputación por participar',
              'Sigue tus tiendas y marcas favoritas',
            ]}
            buttonText="Registrarme como Usuario"
            href="#"
          />

          {/* Store Registration Card */}
          <RegistrationCard
            icon="storefront"
            title="Soy una Tienda"
            description="Toma el control de tu presencia digital y conecta directamente con tus clientes insatisfechos y leales."
            benefits={[
              'Gestiona tu reputación online centralizada',
              'Responde a tus clientes en tiempo real',
              'Obtén analíticas de satisfacción del cliente',
            ]}
            buttonText="Registrar mi Tienda"
            href="/vende"
            isStore
          />
        </div>

        {/* Trust Indicator */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale transition-all duration-500 hover:grayscale-0">
          <TrustItem icon="shield" text="Sitio Seguro" />
          <TrustItem icon="verified_user" text="Reseñas Verificadas" />
          <TrustItem icon="group" text="+10k Usuarios" />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto w-full border-t border-slate-200 bg-white px-6 py-8 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Revius.cl - Todos los derechos
            reservados.
          </div>
          <div className="flex gap-8">
            <Link
              className="hover:text-primary text-sm text-slate-500 transition-colors dark:text-slate-400"
              href="#"
            >
              Términos y Condiciones
            </Link>
            <Link
              className="hover:text-primary text-sm text-slate-500 transition-colors dark:text-slate-400"
              href="#"
            >
              Política de Privacidad
            </Link>
            <Link
              className="hover:text-primary text-sm text-slate-500 transition-colors dark:text-slate-400"
              href="#"
            >
              Ayuda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function RegistrationCard({
  icon,
  title,
  description,
  benefits,
  buttonText,
  href,
  isStore = false,
}: {
  icon: string
  title: string
  description: string
  benefits: string[]
  buttonText: string
  href: string
  isStore?: boolean
}) {
  const iconName = isStore ? 'verified' : 'check_circle'

  return (
    <div className="hover:border-primary/50 group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 transition-all dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      <div className="flex-grow p-8 md:p-10">
        <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110">
          <span className="material-icons text-primary text-3xl">{icon}</span>
        </div>
        <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="mb-8 text-slate-600 dark:text-slate-400">{description}</p>
        <ul className="mb-10 space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="material-icons text-primary mt-0.5 text-lg">
                {iconName}
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-8 pt-0">
        <Link
          href={href}
          className="bg-primary shadow-primary/20 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white shadow-lg transition-all hover:bg-blue-700"
        >
          {buttonText}
          <span className="material-icons text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  )
}

function TrustItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="material-icons text-2xl">{icon}</span>
      <span className="font-semibold">{text}</span>
    </div>
  )
}
