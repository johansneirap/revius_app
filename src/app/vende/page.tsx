import Link from 'next/link'
import Logo from '@/components/Logo'
import Image from 'next/image'

export default function VendePage() {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen text-slate-900 antialiased dark:text-slate-100">
      {/* Navigation Bar */}
      <nav className="dark:bg-background-dark/80 border-primary/10 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <div className="hidden items-center space-x-8 md:flex">
              <Link
                className="hover:text-primary text-sm font-medium transition-colors"
                href="#"
              >
                Cómo funciona
              </Link>
              <Link
                className="hover:text-primary text-sm font-medium transition-colors"
                href="#"
              >
                Beneficios
              </Link>
              <Link
                className="hover:text-primary text-sm font-medium transition-colors"
                href="#"
              >
                Precios
              </Link>
              <button className="text-primary border-primary/20 hover:bg-primary/5 rounded-lg border px-4 py-2 text-sm font-semibold transition-all">
                Iniciar Sesión
              </button>
              <button className="bg-primary shadow-primary/20 hover:bg-primary/90 rounded-lg px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all">
                Registrar Tienda
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
          <div className="absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2 opacity-10">
            <div className="bg-primary absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[120px]"></div>
            <div className="bg-primary absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full blur-[120px]"></div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              {/* Left Side: Content */}
              <div className="space-y-8">
                <div>
                  <span className="bg-primary/10 text-primary mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold">
                    <span className="bg-primary mr-2 h-2 w-2 rounded-full"></span>
                    Impulsa tus ventas B2B
                  </span>
                  <h1 className="text-4xl leading-tight font-bold text-slate-900 lg:text-6xl dark:text-white">
                    Haz crecer tu tienda con la{' '}
                    <span className="text-primary">confianza</span> de tus
                    clientes
                  </h1>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                    Únete a la plataforma de reseñas líder en Chile y convierte
                    la satisfacción de tus compradores en tu mejor herramienta
                    de ventas. Construye una marca sólida con datos reales.
                  </p>
                </div>
                {/* Success Metrics */}
                <div className="border-primary/10 grid grid-cols-2 gap-8 border-t py-4">
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      +500
                    </p>
                    <p className="text-sm text-slate-500">
                      Tiendas registradas
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      +10k
                    </p>
                    <p className="text-sm text-slate-500">
                      Reseñas verificadas
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Form Card */}
              <div className="relative">
                <div className="from-primary/20 to-primary/5 absolute -inset-1 rounded-2xl bg-gradient-to-r blur-xl"></div>
                <div className="border-primary/10 relative rounded-xl border bg-white p-8 shadow-2xl dark:bg-slate-900">
                  <h3 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
                    Comienza gratis ahora
                  </h3>
                  <form action="#" className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Nombre de la Tienda
                      </label>
                      <input
                        className="focus:ring-primary/20 focus:border-primary w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 transition-all outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        placeholder="Ej: Mi Tienda Online"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        RUT Empresa
                      </label>
                      <input
                        className="focus:ring-primary/20 focus:border-primary w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 transition-all outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        placeholder="Ej: 12.345.678-9"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Categoría
                      </label>
                      <div className="relative">
                        <select className="focus:ring-primary/20 focus:border-primary w-full appearance-none rounded-lg border border-slate-200 px-4 py-3 text-slate-900 transition-all outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                          <option value="">Selecciona una categoría</option>
                          <option>Tecnología</option>
                          <option>Moda y Accesorios</option>
                          <option>Hogar y Decoración</option>
                          <option>Salud y Belleza</option>
                          <option>Otros</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                          <span className="material-icons">expand_more</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 py-2">
                      <input
                        className="text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-slate-300"
                        id="terms"
                        type="checkbox"
                      />
                      <label className="text-xs text-slate-500" htmlFor="terms">
                        Acepto los términos de servicio y la política de
                        privacidad de Revius.cl
                      </label>
                    </div>
                    <button
                      className="bg-primary shadow-primary/30 hover:bg-primary/90 group flex w-full items-center justify-center gap-2 rounded-lg py-4 font-bold text-white shadow-lg transition-all"
                      type="submit"
                    >
                      Crear mi cuenta
                      <span className="material-icons text-sm transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </button>
                    <p className="mt-4 text-center text-xs text-slate-400 italic">
                      Sin tarjetas de crédito. Cancela en cualquier momento.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefit Pillars */}
        <section className="bg-white py-24 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
                ¿Por qué vender con Revius?
              </h2>
              <p className="mx-auto max-w-2xl text-slate-500">
                Te entregamos las herramientas necesarias para destacar en un
                mercado competitivo a través de la transparencia.
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-3">
              {/* Visibilidad */}
              <BenefitCard
                icon="visibility"
                title="Visibilidad"
                description="Llega a miles de compradores que buscan calidad. Posiciona tu tienda en los primeros resultados de búsqueda orgánica."
              />
              {/* Reputación */}
              <BenefitCard
                icon="verified"
                title="Reputación"
                description="Muestra tu compromiso con la transparencia. Las reseñas verificadas son el factor #1 de decisión de compra en Chile."
              />
              {/* Analíticas */}
              <BenefitCard
                icon="analytics"
                title="Analíticas"
                description="Entiende el comportamiento de tu mercado. Recibe insights semanales sobre lo que tus clientes realmente valoran de tu servicio."
              />
            </div>
          </div>
        </section>

        {/* Social Proof Image Section */}
        <section className="overflow-hidden py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-primary relative overflow-hidden rounded-3xl p-12 lg:p-20">
              <div className="absolute top-0 right-0 hidden h-full w-1/2 opacity-20 mix-blend-overlay lg:block">
                <Image
                  alt="Dashboard Analytics"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPh0QGTQsZR2dEopwYL_5Z41dNSLJGpDOI9pTJye7jwLo8qSBICKe0tVl8_TVNRwVHoh98z5Zxcbqg2gvBCcaQ7w0jLh8-a6DaGnQngML8b-78iE-j3jZdJe_oOGS9XTCVT1a8gqktpjAO5PmowaXLZUY7DrOZqlATWgbdiOixQ7m_VIwG2yiB2y5LXD9R9B4Xhrvd7kDGW5N4TB-W1rDltFmpYvdLCiaNK8C6wY6Iy8EvADeLEoMXXUtiZPYrIQPJ4O1DVRtmwCd2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative z-10 lg:max-w-xl">
                <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
                  Únete a la comunidad de tiendas más confiable
                </h2>
                <p className="text-primary-50 mb-8 text-lg leading-relaxed text-white/80">
                  "Desde que integramos Revius, nuestra tasa de conversión
                  aumentó un 24%. La confianza es el motor de nuestro
                  crecimiento."
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/20">
                    <Image
                      alt="Testimonial"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA23nlWxZZCnQK1w1t2ef07GpdDAdm7bTcoe93dK0MOeMY2h_Efj0AjLzNDnRsycNlJU_moIQjOb77gZF6w7I7m6C8tquURi1IywGnTiwmntxP8O51TrhM2DTPfnwD9MQRio4cBtQ82ZmVkn7NfxbNT2KOiwky7pl9ldGnYcpplveK2o-P2V6LoF_unGsx-Ig0QgA57Pv2BwVdlDNht6gIEQELE7yOqQ-NgBxL5tipcxAK_nMSeoI7DwM-hDkU4ZrygYhtTZWZQm9lZ"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white">Carolina Méndez</p>
                    <p className="text-sm text-white/60">
                      Fundadora de EcoModa Chile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-primary/10 border-t bg-white py-16 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2">
              <Logo size="sm" className="mb-6" />
              <p className="mb-6 max-w-xs text-sm text-slate-500">
                La plataforma chilena líder en gestión de reputación y reseñas
                para el comercio electrónico moderno.
              </p>
              <div className="flex gap-4">
                <Link
                  className="hover:text-primary flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors dark:bg-slate-800"
                  href="#"
                >
                  <span className="material-icons text-xl">facebook</span>
                </Link>
                <Link
                  className="hover:text-primary flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors dark:bg-slate-800"
                  href="#"
                >
                  <span className="material-icons text-xl">camera_alt</span>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="mb-6 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
                Tiendas
              </h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Registrar mi tienda
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Panel de control
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Guías para vendedores
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    API para partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
                Legal
              </h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Políticas de reseñas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
                Soporte
              </h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Centro de ayuda
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    Estado del servicio
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-primary/5 mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <p className="text-sm text-slate-400">
              ©{new Date().getFullYear()} Revius.cl - Hecho con ❤️ en Chile.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <span className="material-icons text-sm text-green-500">
                  circle
                </span>
                Todos los sistemas operativos
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="group hover:border-primary/10 rounded-2xl border border-transparent p-8 transition-all hover:bg-white hover:shadow-xl dark:hover:bg-slate-800">
      <div className="bg-primary/10 mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
        <span className="material-icons text-primary text-3xl">{icon}</span>
      </div>
      <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  )
}
