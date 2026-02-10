
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100 font-display">
            {/* Header / Navigation */}
            <header className="border-b border-slate-200 bg-white py-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Logo />
                    <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex dark:text-slate-400">
                        <Link href="#" className="transition-colors hover:text-primary">
                            Categorías
                        </Link>
                        <Link href="#" className="transition-colors hover:text-primary">
                            Ofertas
                        </Link>
                        <Link href="#" className="transition-colors hover:text-primary">
                            Marcas
                        </Link>
                        <Link href="#" className="transition-colors hover:text-primary">
                            Ayuda
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <span className="material-icons cursor-pointer text-slate-500">
                            shopping_cart
                        </span>
                        <span className="material-icons cursor-pointer text-slate-500">
                            person
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-grow flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-3xl text-center">
                    {/* 404 Illustration */}
                    <div className="relative mb-8 inline-block">
                        <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                            <span className="material-icons text-8xl text-primary">
                                production_quantity_limits
                            </span>
                        </div>
                        <div className="absolute -right-2 -top-2 rounded-full border border-slate-100 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                            <span className="text-4xl font-bold text-primary">404</span>
                        </div>
                    </div>

                    {/* Error Message */}
                    <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
                        ¡Ups! Parece que este producto o página se agotó o no existe
                    </h1>
                    <p className="mx-auto mb-8 max-w-lg text-lg text-slate-600 dark:text-slate-400">
                        No te preocupes, aún puedes encontrar lo que buscas usando el buscador
                        o revisando nuestras recomendaciones destacadas.
                    </p>

                    {/* Search Bar */}
                    <div className="relative mx-auto mb-8 max-w-xl">
                        <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-md dark:border-slate-800 dark:bg-slate-900">
                            <span className="material-icons px-3 text-slate-400">search</span>
                            <input
                                className="w-full border-none bg-transparent px-1 py-3 text-slate-900 focus:ring-0 dark:text-white"
                                placeholder="¿Qué estás buscando hoy?"
                                type="text"
                            />
                            <button className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white transition-all hover:bg-primary/90">
                                Buscar
                            </button>
                        </div>
                    </div>

                    {/* Back Button */}
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                    >
                        <span className="material-icons transition-transform group-hover:-translate-x-1">
                            arrow_back
                        </span>
                        Volver al Inicio
                    </Link>
                </div>

                {/* Featured Products Section */}
                <div className="mx-auto mt-20 w-full max-w-7xl border-t border-slate-200 px-4 pt-12 dark:border-slate-800">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Productos Destacados
                        </h2>
                        <Link
                            href="#"
                            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                        >
                            Ver todos{' '}
                            <span className="material-icons text-sm">chevron_right</span>
                        </Link>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <ProductCard
                            category="Tecnología"
                            title="Auriculares Inalámbricos Premium X-200"
                            price="$89.990"
                            rating={5}
                            reviews={124}
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBSgeWO9-1_iSuHEzPH03VyUoTTogOTzMEyRQm2SYVMKCh02pX8rEluLiIKe0BubSwmY3_brTret0aJg26lbiR2hvXyg73jDemV2ZWjiZglvL1xKOqmU5SZni0tJHsA42P9eLs9U1_gawCpU6oGHBP79Mh48XcSAu55RbyWr4TNh0TNrQ_8zhq2ldKdLukOlx6xdfhlgJajtO6mHzLP2nQ7JHpwQYgMDDfg1bKG-_oj7C7Blu6ZN3U0qffj1o50m-pTMJhV1zhcXD7V"
                            badge="MÁS VENDIDO"
                            badgeColor="bg-primary"
                        />
                        <ProductCard
                            category="Wearables"
                            title="Smartwatch Revius Sport Pro v2"
                            price="$149.990"
                            rating={5}
                            reviews={45}
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCEgOkuf600CiBfcLcddaDU9KwyP2rAJAxqkol9LhykX4GI0f3-8ARpFUL98ZH5Cu-RZNrcRjZ0tXRgsJU4xu91Nr9TvNo38klMNvNHQyZ1LwMzdw5dpj_oV-LHsOH7WRqZrs_7CznmEeRCZZik0RX2xZy6CVbKbpzQvKMv8gy_PEUtNh03U4xkoFca246xZUyGGJpPEXVSCduME3fpN9GvWKSMRmEojHSbCtDKNEGugfRiRHwymT3ABzqF9CRNOi4xYXGBFVofxrRR"
                        />
                        <ProductCard
                            category="Fotografía"
                            title="Cámara Retro Instax Neo 12"
                            price="$75.500"
                            rating={4.8}
                            reviews={82}
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDKxKG7R7ip5an5eXJk3Mn6V_mLz9Wd6T_NtylJsXo7NU8fTv04YkpmLhI64ftQIw-SRZqZlpb5epKDGqTohxdQxoGqE9BHd-T6jZhIJRckbSgYCkRCqxw6YKhPTAmzRSfvJFTcXqayc8nzOl7CfbahvT5ACOmyVT5KI1f-WBrcrLK-VorIc27o2EphDDf004H8lvgxq2MAE05g8ZaNerzapi_OCmXW4A0L6kuPtuvr_STGX2hmZEVbVn8BTEwsJtHIVpwvvBxqgdIv"
                            badge="NUEVO"
                            badgeColor="bg-emerald-500"
                        />
                        <ProductCard
                            category="Calzado"
                            title="Zapatillas Runner Blaze Red"
                            price="$62.990"
                            rating={4.5}
                            reviews={210}
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCXPX_izYUaeccTcSpCo2V9qyDHhMI_zQHg487SiHRwNOmJgl0HUrIBv7k8fou7eYt8wcJPFarHw6WuJ9qlrT5d9k9omRSL1isadmfy_nHwtlydkEjZWk9RStAvF7Srxo1p2FVLEjGE3wLoCyMpiRjIqKOKgrGiJXX7ERF_0dlxuwRwyn6MG1tKfcSYSiJ1makSWracgCCsAkO4KzwYxlnkMwC6HqSZlJu4JCZHYVbb3E8jVTNhbEB-41f3VhUl1_K5lw4mEoUnxwzJ"
                        />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Logo showText={true} />
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Las mejores reseñas y ofertas de productos en un solo lugar.
                            Transparencia y calidad para tus compras.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="text-slate-400 transition-colors hover:text-primary"
                            >
                                <span className="material-icons">facebook</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-slate-400 transition-colors hover:text-primary"
                            >
                                <span className="material-icons">camera_alt</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-slate-400 transition-colors hover:text-primary"
                            >
                                <span className="material-icons">alternate_email</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                            Comprar
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Novedades
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Lo más vendido
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Ofertas Flash
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Gift Cards
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                            Empresa
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Quiénes Somos
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Términos y Condiciones
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Privacidad
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                            Suscripción
                        </h4>
                        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                            Recibe las mejores ofertas en tu correo.
                        </p>
                        <div className="flex gap-2">
                            <input
                                className="flex-grow rounded-lg border-none bg-slate-100 text-sm dark:bg-slate-800"
                                placeholder="Tu email"
                                type="email"
                            />
                            <button className="rounded-lg bg-primary p-2 text-white">
                                <span className="material-icons">send</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-100 px-4 pt-8 md:flex-row dark:border-slate-800">
                    <p className="text-xs text-slate-500">
                        © 2024 Revius.cl - Todos los derechos reservados.
                    </p>
                    <div className="flex gap-4 opacity-50 transition-all grayscale hover:grayscale-0">
                        <span className="material-icons text-2xl">credit_card</span>
                        <span className="material-icons text-2xl">
                            account_balance_wallet
                        </span>
                        <span className="material-icons text-2xl">payments</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function ProductCard({
    category,
    title,
    price,
    rating,
    reviews,
    image,
    badge,
    badgeColor,
}: {
    category: string
    title: string
    price: string
    rating: number
    reviews: number
    image: string
    badge?: string
    badgeColor?: string
}) {
    return (
        <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {badge && (
                    <div
                        className={`absolute left-2 top-2 rounded px-2 py-1 text-[10px] font-bold text-white ${badgeColor}`}
                    >
                        {badge}
                    </div>
                )}
            </div>
            <div className="p-4">
                <p className="mb-1 text-xs font-semibold uppercase text-slate-500">
                    {category}
                </p>
                <h3 className="mb-2 line-clamp-1 font-bold text-slate-900 dark:text-white">
                    {title}
                </h3>
                <div className="mb-3 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={`material-icons text-sm ${i < Math.floor(rating)
                                    ? 'text-amber-400'
                                    : i < rating
                                        ? 'text-amber-400'
                                        : 'text-slate-300'
                                }`}
                        >
                            {i < Math.floor(rating)
                                ? 'star'
                                : i < rating
                                    ? 'star_half'
                                    : 'star'}
                        </span>
                    ))}
                    <span className="ml-1 text-xs text-slate-500">({reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                        {price}
                    </span>
                    <button className="rounded-lg bg-slate-100 p-2 text-primary transition-colors hover:bg-primary hover:text-white dark:bg-slate-800">
                        <span className="material-icons">add_shopping_cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
