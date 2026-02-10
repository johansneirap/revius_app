import Link from 'next/link'
import Logo from '@/components/Logo'

export default function RegistrosPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 min-h-screen flex flex-col">
            {/* Navigation */}
            <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
                <Logo />
                <div className="flex items-center gap-6">
                    <Link className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/">
                        Volver al inicio
                    </Link>
                    <Link className="text-sm font-semibold bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-all" href="#">
                        Iniciar Sesión
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
                {/* Header Section */}
                <div className="text-center max-w-2xl mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Gestión de Registros
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Únete a la comunidad de reseñas más grande de Chile. Selecciona el tipo de cuenta que mejor se adapte a tus necesidades.
                    </p>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                    {/* User Registration Card */}
                    <RegistrationCard
                        icon="person"
                        title="Soy Comprador"
                        description="Comparte tus experiencias de compra y ayuda a otros usuarios a tomar mejores decisiones."
                        benefits={[
                            "Escribe reseñas honestas y detalladas",
                            "Gana puntos y reputación por participar",
                            "Sigue tus tiendas y marcas favoritas"
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
                            "Gestiona tu reputación online centralizada",
                            "Responde a tus clientes en tiempo real",
                            "Obtén analíticas de satisfacción del cliente"
                        ]}
                        buttonText="Registrar mi Tienda"
                        href="/vende"
                        isStore
                    />
                </div>

                {/* Trust Indicator */}
                <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <TrustItem icon="shield" text="Sitio Seguro" />
                    <TrustItem icon="verified_user" text="Reseñas Verificadas" />
                    <TrustItem icon="group" text="+10k Usuarios" />
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8 px-6 mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-500 dark:text-slate-400 text-sm">
                        © {new Date().getFullYear()} Revius.cl - Todos los derechos reservados.
                    </div>
                    <div className="flex gap-8">
                        <Link className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">
                            Términos y Condiciones
                        </Link>
                        <Link className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">
                            Política de Privacidad
                        </Link>
                        <Link className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">
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
    isStore = false
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
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col hover:border-primary/50 transition-all group">
            <div className="p-8 md:p-10 flex-grow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-icons text-primary text-3xl">{icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">{description}</p>
                <ul className="space-y-4 mb-10">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="material-icons text-primary text-lg mt-0.5">{iconName}</span>
                            <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-8 pt-0">
                <Link
                    href={href}
                    className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
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
