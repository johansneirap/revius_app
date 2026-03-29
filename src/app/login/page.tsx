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
    <div className="dark:bg-background-dark font-display selection:bg-primary/20 min-h-screen overflow-hidden bg-white transition-colors duration-500">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="group fixed top-6 right-6 z-50 rounded-full border border-slate-100 bg-white p-3 text-slate-600 shadow-xl transition-all hover:scale-110 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-400"
      >
        <span className="material-icons transition-transform group-hover:rotate-12 dark:hidden">
          dark_mode
        </span>
        <span className="material-icons hidden transition-transform group-hover:rotate-12 dark:block">
          light_mode
        </span>
      </button>

      <div className="flex min-h-screen w-full">
        {/* Left Side: Immersive Experience */}
        <div className="animate-in fade-in relative hidden overflow-hidden duration-1000 lg:flex lg:w-1/2">
          <Image
            alt="Comparando precios con smartphone"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw_sVT70yYKCbT0NUVSDNlCYk6bMZO9TUa-hfsEmwTCqNlOmb3gcGr6FV7e0-1qR2tBHTEC83SmoKArxpjDd9_pHNtJdTBn4Zex2oVr4josoXLQuwDAeGaiRc1BZc4Fyy6EuHzvjobYuUFka9whXzi7YjIqHX6VQPM-Fqhjij80UcZA3StifrlkIj4_bkvhWESMVEaDM2LpIHP5S8oCgPs42MIBl8nKtFGFg7zjgZPRi63_gBD78GlaPkDOBhkxKZCWALlmcqmFcDA"
            fill
            priority
            className="animate-pulse-slow scale-105 object-cover"
          />
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-[#135bec]/85 mix-blend-multiply transition-opacity duration-700"></div>
          <div className="absolute inset-0 z-10 flex flex-col justify-center bg-gradient-to-br from-[#135bec]/90 via-[#135bec]/80 to-[#0a2f7a]/95 px-20 text-white">
            <div className="mb-16 transform transition-all duration-500 hover:translate-x-2">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-xl">
                <span className="material-icons text-5xl text-white">
                  rate_review
                </span>
              </div>
              <h1 className="mb-6 text-6xl leading-tight font-black tracking-tight">
                Decisiones <span className="text-blue-200">inteligentes</span>,
                <br />
                compras seguras.
              </h1>
              <p className="max-w-xl text-2xl leading-relaxed font-light text-blue-100">
                Únete a la comunidad de Revius.cl y descubre lo que otros
                usuarios opinan antes de tu próxima compra.
              </p>
            </div>

            <div className="perspective-1000 relative h-80 w-full">
              <TestimonialCard
                name="Carlos M."
                rating={5}
                text='"Gracias a Revius evité comprar en una tienda con mal servicio. ¡Totalmente recomendado!"'
                className="top-0 left-0 cursor-default transition-all duration-500 hover:-rotate-0"
                style={{ transform: 'rotate(-2deg)' }}
                avatarBg="bg-blue-100"
                avatarIconColor="text-blue-600"
              />
              <TestimonialCard
                name="Sofía R."
                rating={4.5}
                text='"Me encanta ver las fotos reales de los productos antes de pedirlos online."'
                className="right-4 bottom-0 cursor-default transition-all duration-500 hover:rotate-0"
                style={{ transform: 'rotate(4deg)' }}
                avatarBg="bg-emerald-100"
                avatarIconColor="text-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Elegant Form */}
        <div className="dark:bg-background-dark animate-in slide-in-from-right relative flex w-full flex-col items-center justify-center overflow-y-auto bg-white p-8 duration-700 lg:w-1/2">
          <div className="w-full max-w-md space-y-10">
            {/* Branding */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Logo
                size="lg"
                className="mb-8 origin-left scale-110 lg:scale-125"
              />
              <h2 className="font-display mb-2 text-4xl font-bold text-slate-900 dark:text-white">
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
                icon={
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2nxWmDjoJiJZJ2clOFFYv4CwGv9ewiuu4eQHVbO7fD9uKui3_iZ0xlPvuQ1ssOSdliLCT-HirmpPWPsM1ePz2NyvGh6Spri4amx6qIRLr4afqYQbGXtwrT96HXnYhBQxCFBoPK9XFP1dNw1qE16F-HuOAca3gAKknheuRPe8HAQDD3ma9y3T6kWrGZL9VTfwb3qjXjzSt8LtZSteSVjSge1xqi4x-Qg_oyZtLuYpNEng3sebDA_JO2veVS8CsLh9LOSPrXTdPuYx8"
                    width={20}
                    height={20}
                    alt="Google"
                  />
                }
              />
              <SocialButton
                provider="Facebook"
                icon={
                  <svg
                    className="h-5 w-5 text-[#1877F2]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                  </svg>
                }
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs font-bold tracking-widest uppercase">
                <span className="dark:bg-background-dark bg-white px-6 text-slate-400">
                  o continuar con email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label
                  className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300"
                  htmlFor="email text-slate-900 dark:text-white"
                >
                  Correo electrónico
                </label>
                <div className="group relative">
                  <span className="material-icons group-focus-within:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors">
                    mail
                  </span>
                  <input
                    type="email"
                    id="email"
                    placeholder="nombre@ejemplo.com"
                    className="focus:border-primary/50 w-full rounded-2xl border-2 border-transparent bg-slate-50 py-4 pr-4 pl-12 text-slate-900 transition-all outline-none focus:bg-white dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="ml-1 flex items-center justify-between">
                  <label
                    className="text-sm font-bold text-slate-700 dark:text-slate-300"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <Link
                    href="#"
                    className="text-primary text-xs font-bold transition-colors hover:text-blue-700"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="group relative">
                  <span className="material-icons group-focus-within:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors">
                    key
                  </span>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="focus:border-primary/50 w-full rounded-2xl border-2 border-transparent bg-slate-50 py-4 pr-4 pl-12 text-slate-900 transition-all outline-none focus:bg-white dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="remember"
                  className="text-primary focus:ring-primary/20 h-5 w-5 cursor-pointer rounded-md border-slate-300 transition-all"
                />
                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm text-slate-600 select-none dark:text-slate-400"
                >
                  Mantener mi sesión iniciada
                </label>
              </div>

              <button className="bg-primary shadow-primary/25 hover:shadow-primary/40 flex w-full transform items-center justify-center gap-2 rounded-2xl py-4.5 font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-blue-700 active:translate-y-0 active:scale-[0.98]">
                Iniciar Sesión ahora
                <span className="material-icons">login</span>
              </button>
            </form>

            <p className="text-center text-slate-600 dark:text-slate-400">
              ¿Aún no tienes cuenta?
              <Link
                href="/registros"
                className="text-primary decoration-primary/30 ml-2 font-bold underline underline-offset-4 transition-colors hover:text-blue-700"
              >
                Regístrate gratis
              </Link>
            </p>

            <div className="flex justify-center gap-8 border-t border-slate-50 pt-8 dark:border-slate-900">
              <FooterSubLink href="#">Términos</FooterSubLink>
              <FooterSubLink href="#">Privacidad</FooterSubLink>
              <FooterSubLink href="#">Soporte</FooterSubLink>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.1);
          }
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

function SocialButton({
  provider,
  icon,
}: {
  provider: string
  icon: React.ReactNode
}) {
  return (
    <button className="hover:border-primary/20 flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
      {icon}
      {provider}
    </button>
  )
}

function TestimonialCard({
  name,
  rating,
  text,
  className,
  style,
  avatarBg,
  avatarIconColor,
}: {
  name: string
  rating: number
  text: string
  className: string
  style?: any
  avatarBg: string
  avatarIconColor: string
}) {
  return (
    <div
      className={`absolute max-w-[18rem] rounded-[2rem] border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-2xl dark:border-slate-700/30 dark:bg-slate-800/90 ${className}`}
      style={style}
    >
      <div className="mb-4 flex items-center gap-4">
        <div
          className={`h-12 w-12 rounded-2xl ${avatarBg} flex items-center justify-center shadow-inner`}
        >
          <span className={`material-icons ${avatarIconColor}`}>person</span>
        </div>
        <div>
          <p className="text-sm leading-none font-bold text-slate-900 dark:text-white">
            {name}
          </p>
          <div className="mt-1 flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-icons text-xs">
                {i < Math.floor(rating)
                  ? 'star'
                  : i < rating
                    ? 'star_half'
                    : 'star_outline'}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed font-medium text-slate-600 italic dark:text-slate-400">
        "{text.replace(/"/g, '')}"
      </p>
    </div>
  )
}

function FooterSubLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="hover:text-primary text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors"
    >
      {children}
    </Link>
  )
}
