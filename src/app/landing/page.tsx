import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background-light font-display text-slate-800 dark:bg-background-dark dark:text-slate-100">
            <NavBar />
            <Hero />
            <Features />
            <CTA />
            <Footer />
        </div>
    )
}

function NavBar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Logo />
                        <div className="hidden items-center space-x-6 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
                            <Link href="#" className="transition-colors hover:text-primary">
                                Cómo funciona
                            </Link>
                            <Link href="#" className="transition-colors hover:text-primary">
                                Comunidad
                            </Link>
                            <Link href="#" className="transition-colors hover:text-primary">
                                Reviews
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="#"
                            className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary dark:text-slate-300"
                        >
                            Iniciar Sesión
                        </Link>
                        <Link
                            href="#"
                            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-700"
                        >
                            Registrarme
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function Hero() {
    return (
        <header className="relative overflow-hidden bg-white pb-24 pt-16 md:pb-32 md:pt-24 dark:bg-slate-900">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <span className="mb-6 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                            Comunidad #1 de Chile
                        </span>
                        <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] text-slate-900 md:text-6xl dark:text-white">
                            La forma más <span className="text-primary">inteligente</span> de
                            comprar en Chile
                        </h1>
                        <p className="mb-10 max-w-lg leading-relaxed text-slate-600 dark:text-slate-400 text-lg">
                            Únete a miles de compradores que comparten reseñas reales, comparan
                            precios históricos y ganan beneficios exclusivos por sus
                            contribuciones.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <button className="rounded-xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:bg-blue-700">
                                Únete a la Comunidad
                            </button>
                            <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-8 py-4 text-lg font-bold text-slate-900 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                                <span className="material-icons">play_circle</span>
                                Ver cómo funciona
                            </button>
                        </div>
                        <div className="mt-10 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBqCD8lr3RT-mxOUP4OAiLE8TxJKRpQ-wRvnE6g6wclBC7FR0yc43jeKULOQSG5nsz_ADlzlhCYZqV7-SYLcfR6uDE68sAdZLhjJtPD3UMtNAPoLzyLgzerKRQpJb0Dbi6wuCyb_FceSuS-3yxbSLieQvJgS3F0mpF8Qx8A2vp0GLx6XLpMnmpshlcTWZ8eNuzNpjuNQ9XvNPiZDM2XcCU45_UXvFz6D4m1zdcyDxdQoVBcD5rhmyGaul4gR_VbZPPKBnavrKjEirZ"
                                    alt="Usuario 1"
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-slate-900"
                                />
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg7r5IdgLSvVG49kEH5RbldSU5cMfRjtwAvM2BQCFCbCpPjn-l9CCGQbZfBLvtJusaepNcOlP-C0fgAr4pYgtQA9_yHCK54QFOk0m5Ovnd74wWKjD19LOKq-9HtWkhsiLdNHw9mCJnsIF6bFFtTxhzmGfAykUJUFsMUaORl5gHHHId0TG_AuwhO5Bgs7SnitQ1nA3Njp3tpCONK_of183ad-Cam4Qh1hw-2zUBXINVKYHPXMISEkNXH1OVBL6LbJFOUwJ-vQIesd7t"
                                    alt="Usuario 2"
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-slate-900"
                                />
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuACmmE2PBmEXqJWHTrtindSC37T_M8guvAsHkICbYWwrcatzUxhEZOCbUNkGSbt6FDHfdhggQpJGARK8gqvBthJvZ_pN5atWv9gVq_fHECgsbIUDLLjWdGv5LmmRUG6e770MeYAtEkH_H823WMklyQb-wgdIlArcBJL0tFirMLe0uLvi4wsRSix6YEEwndps1khmMthfO60UUP2itpPL2O7Es99s7JQ1_ZCtAJ3QDmblaWezfHWZKDhR0wqE0sNNiaigm_9kuZ9Zygg"
                                    alt="Usuario 3"
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-slate-900"
                                />
                            </div>
                            <p className="text-sm font-medium text-slate-500">
                                +50,000 miembros activos
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl"></div>
                        <div className="relative overflow-hidden rounded-3xl bg-slate-100 p-4 shadow-2xl dark:bg-slate-800">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmZNeJtXckBA2zPU6CVDOUEM3V66czAcBwg0ImcEYaYvHJ-bpGnxm2OiCRvcDMG6wr8OEi0P2eG3yFNo5zr0Qttxk1vIJpOOulj_iOi7ETOwbvDgKcDon9R7rXLzruFnqHstfqLofg57qlGUdCFPA6-xt_oXIiOLHNkPD5vFDW2BuP1r-3Zv6OyQPl0nU3MmGEOouczhD7lN1RhBiWwEorQOFBYAgQSUq6faQT861JUtRUYYAJdp-YXJn1pViG4E-1xlDM9hNBrZLs"
                                alt="Gente comprando de forma inteligente"
                                width={600}
                                height={500}
                                className="h-[500px] w-full rounded-2xl object-cover"
                            />
                            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-white/90 p-6 shadow-lg backdrop-blur-md dark:bg-slate-900/90">
                                <div className="mb-3 flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                                        <span className="material-icons">trending_down</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-slate-400">
                                            Ahorro detectado
                                        </p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                                            Precio más bajo en 6 meses
                                        </p>
                                    </div>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div className="h-full w-[75%] bg-primary"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

function Features() {
    return (
        <section className="bg-background-light py-24 dark:bg-background-dark">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl dark:text-white">
                        Todo lo que necesitas en un solo lugar
                    </h2>
                    <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
                        Nuestra plataforma te entrega las herramientas necesarias para que
                        nunca más pagues de más ni te lleves sorpresas con tus compras.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    <FeatureCard
                        icon="show_chart"
                        iconColor="text-primary"
                        bgColor="bg-blue-50 dark:bg-blue-900/30 group-hover:bg-primary"
                        title="Compara Precios"
                        description="Visualiza el historial de precios real de cualquier producto. Detecta ofertas falsas y compra cuando el precio esté en su mínimo histórico."
                    >
                        <div className="bg-slate-50 p-4 rounded-xl dark:bg-slate-800/50">
                            <div className="flex items-end gap-1 h-20">
                                <div className="flex-1 bg-slate-200 h-16 rounded-t-sm dark:bg-slate-700"></div>
                                <div className="flex-1 bg-slate-200 h-12 rounded-t-sm dark:bg-slate-700"></div>
                                <div className="flex-1 bg-primary h-8 rounded-t-sm"></div>
                                <div className="flex-1 bg-slate-200 h-14 rounded-t-sm dark:bg-slate-700"></div>
                                <div className="flex-1 bg-slate-200 h-10 rounded-t-sm dark:bg-slate-700"></div>
                            </div>
                            <p className="text-[10px] text-center font-bold text-primary mt-2 uppercase tracking-widest">Historial de 30 días</p>
                        </div>
                    </FeatureCard>

                    <FeatureCard
                        icon="verified_user"
                        iconColor="text-green-600"
                        bgColor="bg-green-50 dark:bg-green-900/30 group-hover:bg-green-600"
                        title="Lee Reseñas Reales"
                        description="Accede a opiniones de usuarios verificados que ya probaron el producto en Chile. Sin filtros de marcas, solo la verdad."
                    >
                        <div className="space-y-3">
                            <ReviewMockup stars={4} width="w-20" />
                            <ReviewMockup stars={3} width="w-24" />
                        </div>
                    </FeatureCard>

                    <FeatureCard
                        icon="workspace_premium"
                        iconColor="text-purple-600"
                        bgColor="bg-purple-50 dark:bg-purple-900/30 group-hover:bg-purple-600"
                        title="Gana Beneficios"
                        description="Tu opinión vale. Gana insignias, puntos y activa alertas personalizadas para ser el primero en enterarte de las mejores ofertas."
                    >
                        <div className="flex justify-center gap-4">
                            <Badge icon="emoji_events" color="text-primary" borderColor="border-primary" label="Expert" />
                            <Badge icon="notifications_active" color="text-amber-400" borderColor="border-amber-400" label="Alerts" />
                            <Badge icon="loyalty" color="text-green-500" borderColor="border-green-500" label="Points" />
                        </div>
                    </FeatureCard>
                </div>
            </div>
        </section>
    )
}

function FeatureCard({
    icon,
    iconColor,
    bgColor,
    title,
    description,
    children,
}: {
    icon: string
    iconColor: string
    bgColor: string
    title: string
    description: string
    children: React.ReactNode
}) {
    return (
        <div className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${bgColor} ${iconColor} transition-colors group-hover:text-white`}
            >
                <span className="material-symbols-outlined text-4xl">{icon}</span>
            </div>
            <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                {title}
            </h3>
            <p className="mb-6 text-slate-600 dark:text-slate-400">{description}</p>
            {children}
        </div>
    )
}

function ReviewMockup({ stars, width }: { stars: number, width: string }) {
    return (
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl dark:bg-slate-800/50">
            <div className="w-8 h-8 rounded-full bg-slate-300"></div>
            <div className="flex-1">
                <div className="flex gap-1 mb-1">
                    {[...Array(stars)].map((_, i) => (
                        <span key={i} className="material-icons text-[10px] text-amber-400">star</span>
                    ))}
                </div>
                <div className={`h-1.5 ${width} bg-slate-200 rounded-full dark:bg-slate-700`}></div>
            </div>
        </div>
    )
}

function Badge({ icon, color, borderColor, label }: { icon: string, color: string, borderColor: string, label: string }) {
    return (
        <div className="text-center">
            <div className={`w-12 h-12 rounded-full border-2 ${borderColor} flex items-center justify-center ${color} mb-1`}>
                <span className="material-icons text-xl">{icon}</span>
            </div>
            <span className="text-[9px] font-bold text-slate-500 uppercase">{label}</span>
        </div>
    )
}

function CTA() {
    return (
        <section className="relative overflow-hidden bg-primary py-20">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-10">
                <svg
                    className="h-full w-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                >
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"></path>
                </svg>
            </div>
            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <h2 className="mb-8 text-3xl font-extrabold text-white md:text-5xl">
                    ¿Listo para comprar mejor?
                </h2>
                <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/80">
                    Únete hoy a la comunidad de Revius.cl y comienza a ahorrar dinero con
                    la ayuda de miles de chilenos.
                </p>
                <button className="mx-auto flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-xl font-bold text-primary shadow-2xl transition-all hover:scale-105">
                    Únete a la Comunidad
                    <span className="material-icons">arrow_forward</span>
                </button>
                <p className="mt-8 text-sm text-white/60">
                    Es gratis y siempre lo será.
                </p>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-2">
                        <div className="mb-6">
                            <Logo />
                        </div>
                        <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            La primera comunidad colaborativa de compras en Chile. Ayudamos a
                            los consumidores a tomar decisiones informadas a través de datos y
                            experiencias reales.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon path="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            <SocialIcon path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                            Plataforma
                        </h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <FooterLink href="#">Cómo Funciona</FooterLink>
                            <FooterLink href="#">Insignias y Niveles</FooterLink>
                            <FooterLink href="#">Categorías</FooterLink>
                            <FooterLink href="#">Blog de Compras</FooterLink>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                            Soporte
                        </h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            <FooterLink href="#">Centro de Ayuda</FooterLink>
                            <FooterLink href="#">Términos de Uso</FooterLink>
                            <FooterLink href="#">Privacidad</FooterLink>
                            <FooterLink href="#">Contacto</FooterLink>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-200 pt-8 text-center text-xs text-slate-400 dark:border-slate-800">
                    <p>
                        © 2024 Revius Chile. Todos los derechos reservados. Diseñado para el
                        comprador inteligente.
                    </p>
                </div>
            </div>
        </footer>
    )
}

function SocialIcon({ path }: { path: string }) {
    return (
        <Link
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-primary hover:text-white dark:bg-slate-800"
        >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={path}></path>
            </svg>
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
