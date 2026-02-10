import Link from 'next/link'
import Logo from '@/components/Logo'
import Image from 'next/image'

export default function VendePage() {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Logo />
                        <div className="hidden md:flex items-center space-x-8">
                            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Cómo funciona</Link>
                            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Beneficios</Link>
                            <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Precios</Link>
                            <button className="text-sm font-semibold text-primary px-4 py-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-all">
                                Iniciar Sesión
                            </button>
                            <button className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                                Registrar Tienda
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main>
                <div className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px]"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left Side: Content */}
                            <div className="space-y-8">
                                <div>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
                                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                        Impulsa tus ventas B2B
                                    </span>
                                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
                                        Haz crecer tu tienda con la <span className="text-primary">confianza</span> de tus clientes
                                    </h1>
                                    <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                                        Únete a la plataforma de reseñas líder en Chile y convierte la satisfacción de tus compradores en tu mejor herramienta de ventas. Construye una marca sólida con datos reales.
                                    </p>
                                </div>
                                {/* Success Metrics */}
                                <div className="grid grid-cols-2 gap-8 py-4 border-t border-primary/10">
                                    <div>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white">+500</p>
                                        <p className="text-sm text-slate-500">Tiendas registradas</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white">+10k</p>
                                        <p className="text-sm text-slate-500">Reseñas verificadas</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Form Card */}
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-xl"></div>
                                <div className="relative bg-white dark:bg-slate-900 p-8 rounded-xl shadow-2xl border border-primary/10">
                                    <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Comienza gratis ahora</h3>
                                    <form action="#" className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre de la Tienda</label>
                                            <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white" placeholder="Ej: Mi Tienda Online" type="text" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">RUT Empresa</label>
                                            <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white" placeholder="Ej: 12.345.678-9" type="text" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Categoría</label>
                                            <div className="relative">
                                                <select className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none text-slate-900 dark:text-white">
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
                                            <input className="mt-1 w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary" id="terms" type="checkbox" />
                                            <label className="text-xs text-slate-500" htmlFor="terms">Acepto los términos de servicio y la política de privacidad de Revius.cl</label>
                                        </div>
                                        <button className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group" type="submit">
                                            Crear mi cuenta
                                            <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </button>
                                        <p className="text-center text-xs text-slate-400 mt-4 italic">
                                            Sin tarjetas de crédito. Cancela en cualquier momento.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefit Pillars */}
                <section className="py-24 bg-white dark:bg-slate-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">¿Por qué vender con Revius?</h2>
                            <p className="text-slate-500 max-w-2xl mx-auto">Te entregamos las herramientas necesarias para destacar en un mercado competitivo a través de la transparencia.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-12">
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
                <section className="py-20 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-primary rounded-3xl p-12 lg:p-20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-20 mix-blend-overlay">
                                <Image
                                    alt="Dashboard Analytics"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPh0QGTQsZR2dEopwYL_5Z41dNSLJGpDOI9pTJye7jwLo8qSBICKe0tVl8_TVNRwVHoh98z5Zxcbqg2gvBCcaQ7w0jLh8-a6DaGnQngML8b-78iE-j3jZdJe_oOGS9XTCVT1a8gqktpjAO5PmowaXLZUY7DrOZqlATWgbdiOixQ7m_VIwG2yiB2y5LXD9R9B4Xhrvd7kDGW5N4TB-W1rDltFmpYvdLCiaNK8C6wY6Iy8EvADeLEoMXXUtiZPYrIQPJ4O1DVRtmwCd2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative z-10 lg:max-w-xl">
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Únete a la comunidad de tiendas más confiable</h2>
                                <p className="text-primary-50 text-white/80 text-lg mb-8 leading-relaxed">
                                    "Desde que integramos Revius, nuestra tasa de conversión aumentó un 24%. La confianza es el motor de nuestro crecimiento."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 relative">
                                        <Image
                                            alt="Testimonial"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA23nlWxZZCnQK1w1t2ef07GpdDAdm7bTcoe93dK0MOeMY2h_Efj0AjLzNDnRsycNlJU_moIQjOb77gZF6w7I7m6C8tquURi1IywGnTiwmntxP8O51TrhM2DTPfnwD9MQRio4cBtQ82ZmVkn7NfxbNT2KOiwky7pl9ldGnYcpplveK2o-P2V6LoF_unGsx-Ig0QgA57Pv2BwVdlDNht6gIEQELE7yOqQ-NgBxL5tipcxAK_nMSeoI7DwM-hDkU4ZrygYhtTZWZQm9lZ"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">Carolina Méndez</p>
                                        <p className="text-white/60 text-sm">Fundadora de EcoModa Chile</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 border-t border-primary/10 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                        <div className="col-span-2">
                            <Logo size="sm" className="mb-6" />
                            <p className="text-slate-500 text-sm max-w-xs mb-6">
                                La plataforma chilena líder en gestión de reputación y reseñas para el comercio electrónico moderno.
                            </p>
                            <div className="flex gap-4">
                                <Link className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#">
                                    <span className="material-icons text-xl">facebook</span>
                                </Link>
                                <Link className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#">
                                    <span className="material-icons text-xl">camera_alt</span>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-slate-900 dark:text-white">Tiendas</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="#">Registrar mi tienda</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Panel de control</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Guías para vendedores</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">API para partners</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-slate-900 dark:text-white">Legal</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="#">Términos y condiciones</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Privacidad</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Cookies</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Políticas de reseñas</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-slate-900 dark:text-white">Soporte</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="#">Centro de ayuda</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Contacto</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Estado del servicio</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-16 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-400">©{new Date().getFullYear()} Revius.cl - Hecho con ❤️ en Chile.</p>
                        <div className="flex items-center gap-6 text-sm text-slate-400">
                            <span className="flex items-center gap-2">
                                <span className="material-icons text-sm text-green-500">circle</span>
                                Todos los sistemas operativos
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function BenefitCard({ icon, title, description }: { icon: string; title: string; description: string }) {
    return (
        <div className="group p-8 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl border border-transparent hover:border-primary/10 transition-all">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-icons text-primary text-3xl">{icon}</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
