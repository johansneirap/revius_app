'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { useState, useEffect } from 'react'

export default function LoginPage() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        // Sync with system or initial state
        if (document.documentElement.classList.contains('dark')) {
            setIsDarkMode(true)
        }
    }, [])

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark')
        setIsDarkMode(!isDarkMode)
    }

    return (
        <div className="bg-white dark:bg-background-dark min-h-screen font-display transition-colors duration-500 overflow-hidden selection:bg-primary/20">
            {/* Dark Mode Toggle */}
            <button
                onClick={toggleDarkMode}
                className="fixed top-6 right-6 p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-yellow-400 hover:scale-110 active:scale-95 transition-all z-50 group"
            >
                <span className="material-icons dark:hidden group-hover:rotate-12 transition-transform">dark_mode</span>
                <span className="material-icons hidden dark:block group-hover:rotate-12 transition-transform">light_mode</span>
            </button>

            <div className="flex min-h-screen w-full">
                {/* Left Side: Immersive Experience */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden animate-in fade-in duration-1000">
                    <Image
                        alt="Comparando precios con smartphone"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw_sVT70yYKCbT0NUVSDNlCYk6bMZO9TUa-hfsEmwTCqNlOmb3gcGr6FV7e0-1qR2tBHTEC83SmoKArxpjDd9_pHNtJdTBn4Zex2oVr4josoXLQuwDAeGaiRc1BZc4Fyy6EuHzvjobYuUFka9whXzi7YjIqHX6VQPM-Fqhjij80UcZA3StifrlkIj4_bkvhWESMVEaDM2LpIHP5S8oCgPs42MIBl8nKtFGFg7zjgZPRi63_gBD78GlaPkDOBhkxKZCWALlmcqmFcDA"
                        fill
                        priority
                        className="object-cover scale-105 animate-pulse-slow"
                    />
                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-[#135bec]/85 mix-blend-multiply transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#135bec]/90 via-[#135bec]/80 to-[#0a2f7a]/95 flex flex-col justify-center px-20 text-white z-10">
                        <div className="mb-16 transform transition-all hover:translate-x-2 duration-500">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-white/30">
                                <span className="material-icons text-white text-5xl">rate_review</span>
                            </div>
                            <h1 className="text-6xl font-black mb-6 leading-tight tracking-tight">
                                Decisiones <span className="text-blue-200">inteligentes</span>,<br />
                                compras seguras.
                            </h1>
                            <p className="text-2xl text-blue-100 max-w-xl font-light leading-relaxed">
                                Únete a la comunidad de Revius.cl y descubre lo que otros usuarios opinan antes de tu próxima compra.
                            </p>
                        </div>

                        <div className="relative h-80 w-full perspective-1000">
                            <TestimonialCard
                                name="Carlos M."
                                rating={5}
                                text='"Gracias a Revius evité comprar en una tienda con mal servicio. ¡Totalmente recomendado!"'
                                className="top-0 left-0 hover:-rotate-0 transition-all duration-500 cursor-default"
                                style={{ transform: 'rotate(-2deg)' }}
                                avatarBg="bg-blue-100"
                                avatarIconColor="text-blue-600"
                            />
                            <TestimonialCard
                                name="Sofía R."
                                rating={4.5}
                                text='"Me encanta ver las fotos reales de los productos antes de pedirlos online."'
                                className="bottom-0 right-4 hover:rotate-0 transition-all duration-500 cursor-default"
                                style={{ transform: 'rotate(4deg)' }}
                                avatarBg="bg-emerald-100"
                                avatarIconColor="text-emerald-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Elegant Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white dark:bg-background-dark relative overflow-y-auto animate-in slide-in-from-right duration-700">
                    <div className="w-full max-w-md space-y-10">
                        {/* Branding */}
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                            <Logo size="lg" className="mb-8 scale-110 lg:scale-125 origin-left" />
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                                Bienvenido de nuevo
                            </h2>
                            <p className="text-lg text-slate-500 dark:text-slate-400">
                                Ingresa tus credenciales para acceder a tu panel.
                            </p>
                        </div>

                        {/* Social Connect */}
                        <div className="grid grid-cols-2 gap-4">
                            <SocialButton
                                provider="Google"
                                icon={<Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2nxWmDjoJiJZJ2clOFFYv4CwGv9ewiuu4eQHVbO7fD9uKui3_iZ0xlPvuQ1ssOSdliLCT-HirmpPWPsM1ePz2NyvGh6Spri4amx6qIRLr4afqYQbGXtwrT96HXnYhBQxCFBoPK9XFP1dNw1qE16F-HuOAca3gAKknheuRPe8HAQDD3ma9y3T6kWrGZL9VTfwb3qjXjzSt8LtZSteSVjSge1xqi4x-Qg_oyZtLuYpNEng3sebDA_JO2veVS8CsLh9LOSPrXTdPuYx8" width={20} height={20} alt="Google" />}
                            />
                            <SocialButton
                                provider="Facebook"
                                icon={<svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>}
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
                                <span className="px-6 bg-white dark:bg-background-dark text-slate-400">o continuar con email</span>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1" htmlFor="email text-slate-900 dark:text-white">Correo electrónico</label>
                                <div className="relative group">
                                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">mail</span>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="nombre@ejemplo.com"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent rounded-2xl focus:border-primary/50 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="password">Contraseña</label>
                                    <Link href="#" className="text-xs font-bold text-primary hover:text-blue-700 transition-colors">¿Olvidaste tu contraseña?</Link>
                                </div>
                                <div className="relative group">
                                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">key</span>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent rounded-2xl focus:border-primary/50 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-5 h-5 rounded-md border-slate-300 text-primary focus:ring-primary/20 transition-all cursor-pointer"
                                />
                                <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                                    Mantener mi sesión iniciada
                                </label>
                            </div>

                            <button className="w-full py-4.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2">
                                Iniciar Sesión ahora
                                <span className="material-icons">login</span>
                            </button>
                        </form>

                        <p className="text-center text-slate-600 dark:text-slate-400">
                            ¿Aún no tienes cuenta?
                            <Link href="/registros" className="font-bold text-primary hover:text-blue-700 transition-colors ml-2 underline underline-offset-4 decoration-primary/30">
                                Regístrate gratis
                            </Link>
                        </p>

                        <div className="flex justify-center gap-8 pt-8 border-t border-slate-50 dark:border-slate-900">
                            <FooterSubLink href="#">Términos</FooterSubLink>
                            <FooterSubLink href="#">Privacidad</FooterSubLink>
                            <FooterSubLink href="#">Soporte</FooterSubLink>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1.05); }
                    50% { transform: scale(1.1); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 20s ease-in-out infinite;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </div>
    )
}

function SocialButton({ provider, icon }: { provider: string; icon: React.ReactNode }) {
    return (
        <button className="flex items-center justify-center gap-3 px-6 py-3.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary/20 transition-all text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm">
            {icon}
            {provider}
        </button>
    )
}

function TestimonialCard({ name, rating, text, className, style, avatarBg, avatarIconColor }: { name: string, rating: number, text: string, className: string, style?: any, avatarBg: string, avatarIconColor: string }) {
    return (
        <div
            className={`absolute bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl p-6 rounded-[2rem] shadow-2xl border border-white/20 dark:border-slate-700/30 max-w-[18rem] ${className}`}
            style={style}
        >
            <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl ${avatarBg} flex items-center justify-center shadow-inner`}>
                    <span className={`material-icons ${avatarIconColor}`}>person</span>
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{name}</p>
                    <div className="flex text-amber-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="material-icons text-xs">
                                {i < Math.floor(rating) ? 'star' : (i < rating ? 'star_half' : 'star_outline')}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed font-medium">"{text.replace(/"/g, '')}"</p>
        </div>
    )
}

function FooterSubLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="text-xs font-bold text-slate-400 hover:text-primary transition-colors tracking-widest uppercase">
            {children}
        </Link>
    )
}
