import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-grow">
            <HeroSection />
            <PromoBanner />
            <ReviewsSection />
          </div>
          <Sidebar />
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4">
        <div className="flex flex-shrink-0 items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="material-icons text-white">rate_review</span>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Revius<span className="text-primary">.cl</span>
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#" className="border-b-2 border-primary py-5 text-primary">
            Inicio
          </Link>
          <Link
            href="#"
            className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
          >
            Tecnología
          </Link>
          <Link
            href="#"
            className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
          >
            Estilo de Vida
          </Link>
          <Link
            href="#"
            className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
          >
            Hogar
          </Link>
          <Link
            href="#"
            className="text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
          >
            Lo Mejor
          </Link>
        </nav>
        <div className="relative hidden flex-grow max-w-md lg:block">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            type="text"
            placeholder="Busca productos, marcas o expertos..."
            className="w-full rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-primary dark:bg-slate-800"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-400">
            Ingresar
          </button>
          <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
            Panel de Expertos
          </button>
        </div>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-icons text-orange-500">whatshot</span>
          <h2 className="text-2xl font-bold">Productos Hot de la Semana</h2>
        </div>
        <Link
          href="#"
          className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Ver Tendencias{' '}
          <span className="material-icons text-sm">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ProductCard
          title="Aura Pro Wireless Gen 4"
          rating="4.9"
          description="Cancelación de ruido líder en la industria con firma de sonido ultra-premium y 40 horas de batería."
          price="$349.990"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuDFbRlYmHsUxnbrQZ4T395vSHOiK9dy1gQKWPrq8EQ9vSb6qeZPRjh5dmsjg_6nR3SwXjGeiT8HbjKlV89eN7Zu9A8JPKh9Sra3-revrx5oyvwjgrIw3w9GFTI0fvrjN83qicv5MHZCqF_ilzUCiq0qrO3ZEfQ8OyITbpZR7EZ_Os3Uuvt-onHqPqlBTM4mUxJrjVCTEcWPNNauTa8QwEwOQXD7LdJ_iWVaynt_kUjce3AYHgDCcTlHlpFuchwjTgpb1PYChxECfBcP"
          badge="Alta Demanda"
          badgeColor="bg-red-500"
        />
        <ProductCard
          title="Stellar Chronos White"
          rating="4.7"
          description="Diseño minimalista con ingeniería suiza de precisión. El compañero diario perfecto para profesionales."
          price="$189.990"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuB4slPBzaJWCmlEe4SWrkGQyljxppAJuowJLpbzUHJpEorYCuw2ZZTOl3_9MmZESvraU_TOoJhzldGgR1JTqW_TzVbDGSuCoRB2BNSqhRt_yG9gSyIe4jBBpTJoOGa823atkiqbzSoS-tbgK1FNXe9nCYSz8R8CuK7hpL-k3l9IAqUcLytaKLEg5BQQsqLDP9cV5ZlR-hgA9r8R14Ja1umu0LgIDk0NqpXjUPg_FESu_5B47nnt5n9j4LcSU1Mbimd2wjYADTM56csY"
          badge="Elección Editor"
          badgeColor="bg-primary"
        />
        <ProductCard
          title="ZenithBook Ultra 14"
          rating="4.8"
          description="El notebook más delgado en su clase con el último procesador de alto rendimiento y pantalla OLED de 120Hz."
          price="$1.299.990"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ6auq-aWNwOUXnA_Y4Opw0Lzt-b1Bl31RuDsoa8ykp48xCOoYfTZQkS_bViYA5vjZiB0aJR04EHjXeAyGW4ght1eVMFmxV2DR6bzQlc_AounrKGd-VuBo4TuSuU0eGfMISN0lMIBaXc3zrqNgwVgklxt8a7NXzN97WAaS9N5qQ1KqSrbBeRDY9WwcCZRgzyL7QM8j1BekpPJo_ariVC7uH2IkRd0m8xMV2jGJFvMb3b53td-FMN5ohwwfETXUPCm3uyZTzTn6guwV"
          badge="Mejor Valor"
          badgeColor="bg-orange-500"
        />
      </div>
    </section>
  )
}

function ProductCard({
  title,
  rating,
  description,
  price,
  image,
  badge,
  badgeColor,
}: {
  title: string
  rating: string
  description: string
  price: string
  image: string
  badge: string
  badgeColor: string
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-48 bg-slate-100 dark:bg-slate-800">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div
          className={`absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${badgeColor}`}
        >
          {badge}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-bold transition-colors group-hover:text-primary">
            {title}
          </h3>
          <span className="flex items-center rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {rating} ★
          </span>
        </div>
        <p className="mb-4 line-clamp-2 text-sm text-slate-500">
          {description}
        </p>
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Mejor Precio
            </p>
            <p className="text-xl font-bold text-primary">{price}</p>
          </div>
          <button className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            Ver Ofertas
          </button>
        </div>
      </div>
    </div>
  )
}

function PromoBanner() {
  return (
    <div className="relative mb-12 flex h-40 items-center overflow-hidden rounded-xl border border-primary/20 bg-primary/10 px-12">
      <div className="z-10 max-w-md">
        <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
          Evento de Actualización Tech
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-300">
          Cupones exclusivos para nuestra comunidad en más de 500 gadgets top.
        </p>
        <button className="rounded-lg bg-primary px-6 py-2 font-bold text-white transition-all hover:shadow-lg">
          Obtener Cupones
        </button>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-1/2 opacity-20">
        <div className="h-full w-full bg-gradient-to-l from-primary to-transparent"></div>
      </div>
      <span className="material-icons absolute right-12 text-9xl text-primary opacity-10">
        local_offer
      </span>
    </div>
  )
}

function ReviewsSection() {
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Reseñas Destacadas</h2>
          <p className="text-sm text-slate-500">
            Opiniones de expertos y creadores chilenos en los que confías.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
            <span className="material-icons">chevron_left</span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
            <span className="material-icons">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ReviewCard
          name="César García"
          role="Editor Senior • ReviewChile TV"
          rating={5.0}
          quote='"Los Aura Pro Wireless redefinieron mis expectativas de cancelación activa. El sonido es increíblemente amplio. Si viajas en el Metro, son indispensables."'
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuC4U1AiR-hbBDLdRvkn5wYQx8nMKOqtbMmt56bOBvAGJionzKNWUFVAFx7JS2kEH6UGptDzv7eqdIWg1FOHokF3s2jAYjkfqVDE43gOWGZ0KZ_eVncIJG8EheG5d-SP-1eGP7Gr_47m0SkibLltlb1zCt4J1-PUYC6EHCnKu4ttK3-Ip8Uqfz95UklWU--DUZSPhORhz-4hgwIpPnLKv0cuI98wj4RNxkOnkhqezItezPdt7vSTDzJRwpdAnCqFc9ujzwCJtrdBFYko"
          badge="Reseña de Experto Verificada"
        />
        <ReviewCard
          name="Valentina Lagos"
          role="Lifestyle Specialist • 1.2M Seguidores"
          rating={4.0}
          quote='"Llevo dos semanas con el Stellar Chronos. Es sorprendentemente liviano y combina con todos mis outfits. Se siente mucho más caro de lo que es en realidad."'
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuBUWvxnSMZfrquGNkXcJY0KWPL2-EduUn2siun2tNTlc7H75PtH21CeaD8cK84XT_OZfsPn3sz5D18hDCJe0hfKWilGP7XLvDHOHdFnU94pNOodIfT9x_G5FYOaqxFjy0lOAj5rRbzC8b3dBYssB7JUdIHGFdXigJ_RumORHhqp9zlj06tDRB9EZ9sVg66yXB76m2zzjBj3t_QtvBPMp-91rYTxhYRQzxS3VsNHno-6O69S_jifvzLBkUwPSFT8KU1RyypAbqgAhTQg"
          badge="Destacado de Comunidad"
        />
      </div>
    </section>
  )
}

function ReviewCard({
  name,
  role,
  rating,
  quote,
  image,
  badge
}: {
  name: string
  role: string
  rating: number
  quote: string
  image: string
  badge: string
}) {
  return (
    <div className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-start gap-4">
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
          <span className="material-icons absolute -bottom-1 -right-1 rounded-full bg-white text-lg text-primary dark:bg-slate-900">
            verified
          </span>
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-xs font-medium uppercase text-slate-400">
            {role}
          </p>
          <div className="mt-1 flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`material-icons text-xs ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-slate-300'}`}>star</span>
            ))}
            <span className="ml-2 text-xs font-bold">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <blockquote className="mb-4 italic text-slate-700 dark:text-slate-300">
        {quote}
      </blockquote>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {badge}
        </span>
        <Link
          href="#"
          className="text-xs font-bold text-primary hover:underline"
        >
          Leer Reseña Completa
        </Link>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="w-full flex-shrink-0 space-y-8 lg:w-80">
      <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-800/50">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Oferta Partner
          </span>
          <span className="material-symbols-outlined cursor-help text-xs text-slate-400">
            info
          </span>
        </div>
        <div className="mb-3 overflow-hidden rounded-lg relative h-32">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw-hBNVI4d5Dv1UCVmBfj5IPiuXRC9se0QrECc9ORtgCv-ZKuU8amsjxCt0eRHwBaz-iDbzeXGaz73b6zIxEvYAsMi5aGo3_nyQ4ZRuoxqune-qZuBH3vSv2XN65So6xCXkKi8dzQSY__Kcmgzq_u7DwNaoDaJFuD1MJr8kQ8KhiImLwgPQo9pFvXm4eY3h9Jo9O1mUY1luXBwA7VjU8HAjrG_b1NZ22PQAQ2h5pzERzDuBdTI_J2k7pObIa8QVLLsKXGEvOmtmERg"
            alt="Fondo de escritorio"
            fill
            className="object-cover"
          />
        </div>
        <h5 className="mb-1 text-sm font-bold">
          Renueva y Ahorra con TechExchange
        </h5>
        <p className="mb-4 text-xs text-slate-500">
          Recibe hasta $400.000 por tus dispositivos antiguos al renovar con
          nuestro partner oficial.
        </p>
        <button className="w-full rounded bg-slate-900 py-2 text-xs font-bold uppercase tracking-tight text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-slate-900">
          Saber Más
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 font-bold">Compara Precios en Retail</h3>
        <div className="space-y-4">
          <RetailRow name="Falabella" code="FAL" status="Despacho Rápido" statusColor="text-green-600" />
          <RetailRow name="Paris" code="PAR" status="Retiro en Tienda" statusColor="text-slate-500" />
          <RetailRow name="Ripley" code="RIP" status="Mejor Precio" statusColor="text-primary" />
        </div>
      </div>

      <div className="rounded-xl bg-primary p-6 text-white shadow-xl shadow-primary/20">
        <h3 className="mb-2 text-lg font-bold">El Pulso Semanal</h3>
        <p className="mb-4 text-sm text-blue-100">
          Recibe las mejores ofertas y reseñas críticas en tu correo cada
          domingo.
        </p>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button className="w-full rounded-lg bg-white py-2 text-sm font-bold text-primary transition-colors hover:bg-blue-50">
            Suscribirse Ahora
          </button>
        </div>
        <p className="mt-4 text-center text-[10px] text-blue-200">
          Respetamos tu privacidad. Cero spam.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-800/50">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Patrocinado
          </span>
        </div>
        <div className="flex gap-3">
          <div className="h-20 w-20 flex-shrink-0 rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900 relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdCG7YS1Cp9ceNVJPJcCSqETqYLQmYzMnia9uGVeM4AQxVRQGP52Q-wZJ_pQCD_rwj_ui6osyLTtmaoF_zf6qv07HCWe4PNwSfZm7oMswWq3f8JirfJGAJpTGLu9id_pFvQjKh0F9ceyp0sKcnUOz8EVWzSMJzq-EX9dlbyfcy-5jmB21NpnXztHmPvieHllQZVZo0dHxD4IjlQXD810tXLNuUAiakmks_ylva3Gvlve2UyH36dM96ZxMs-i8meumvvclfi89iOsMC"
              alt="Reloj inteligente"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h6 className="mb-1 text-xs font-bold leading-tight">
              Heritage Smartwatch Pro Edición Cuero
            </h6>
            <p className="mb-1 text-xs font-bold text-primary">$299.990</p>
            <Link
              href="#"
              className="text-[10px] font-bold text-slate-500 hover:text-primary underline"
            >
              Comprar Ahora
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

function RetailRow({ name, code, status, statusColor }: { name: string, code: string, status: string, statusColor: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-[10px] font-bold text-primary dark:bg-slate-800">
          {code}
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
      <span className={`text-xs font-bold ${statusColor}`}>
        {status}
      </span>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="material-icons text-lg text-white">
                  rate_review
                </span>
              </div>
              <span className="text-lg font-bold">
                Revius<span className="text-primary">.cl</span>
              </span>
            </div>
            <p className="mb-6 max-w-xs text-sm text-slate-500">
              Empoderando a los consumidores chilenos con datos objetivos y
              opiniones expertas para mejores decisiones de compra.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon="facebook" />
              <SocialIcon icon="alternate_email" />
              <SocialIcon icon="play_circle" />
            </div>
          </div>
          <div>
            <h5 className="mb-4 text-sm font-bold">Autoridad</h5>
            <ul className="space-y-2 text-sm text-slate-500">
              <FooterLink href="#">Cómo Probamos</FooterLink>
              <FooterLink href="#">Proceso de Laboratorio</FooterLink>
              <FooterLink href="#">Guía de Reseñas</FooterLink>
              <FooterLink href="#">Nuestros Expertos</FooterLink>
            </ul>
          </div>
          <div>
            <h5 className="mb-4 text-sm font-bold">Recursos</h5>
            <ul className="space-y-2 text-sm text-slate-500">
              <FooterLink href="#">Guías de Compra</FooterLink>
              <FooterLink href="#">Rastreador de Ofertas</FooterLink>
              <FooterLink href="#">Comparador de Precios</FooterLink>
              <FooterLink href="#">Foros</FooterLink>
            </ul>
          </div>
          <div>
            <h5 className="mb-4 text-sm font-bold">Acerca de</h5>
            <ul className="space-y-2 text-sm text-slate-500">
              <FooterLink href="#">Contacto</FooterLink>
              <FooterLink href="#">Prensa</FooterLink>
              <FooterLink href="#">Carreras</FooterLink>
              <FooterLink href="#">Asociaciones</FooterLink>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 dark:border-slate-800 md:flex-row">
          <p className="text-xs text-slate-400">
            © 2024 Revius.cl Media. Todos los derechos reservados.{' '}
            <span className="mx-2">|</span> Divulgación: Podemos ganar una
            comisión al hacer clic en enlaces de nuestro sitio.
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="#" className="hover:text-primary">
              Política de Privacidad
            </Link>
            <Link href="#" className="hover:text-primary">
              Términos de Servicio
            </Link>
            <Link href="#" className="hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon }: { icon: string }) {
  return (
    <Link
      href="#"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:text-primary dark:bg-slate-800 dark:text-slate-400"
    >
      <span className="material-icons text-sm">{icon}</span>
    </Link>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-primary">
        {children}
      </Link>
    </li>
  )
}
