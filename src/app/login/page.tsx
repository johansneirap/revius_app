'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true)
    }
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setIsDarkMode(!isDarkMode)
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  const handleGoogleLogin = async () => {
    setError(null)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (authError) {
      setError('Error al conectar con Google. Intenta nuevamente.')
    }
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
            <div className="grid grid-cols-1 gap-4">
              <SocialButton
                provider="Continuar con Google"
                onClick={handleGoogleLogin}
                icon={
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2nxWmDjoJiJZJ2clOFFYv4CwGv9ewiuu4eQHVbO7fD9uKui3_iZ0xlPvuQ1ssOSdliLCT-HirmpPWPsM1ePz2NyvGh6Spri4amx6qIRLr4afqYQbGXtwrT96HXnYhBQxCFBoPK9XFP1dNw1qE16F-HuOAca3gAKknheuRPe8HAQDD3ma9y3T6kWrGZL9VTfwb3qjXjzSt8LtZSteSVjSge1xqi4x-Qg_oyZtLuYpNEng3sebDA_JO2veVS8CsLh9LOSPrXTdPuYx8"
                    width={20}
                    height={20}
                    alt="Google"
                  />
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
            <form className="space-y-6" onSubmit={handleEmailLogin}>
              <div className="space-y-2">
                <label
                  className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300"
                  htmlFor="email"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus:border-primary/50 w-full rounded-2xl border-2 border-transparent bg-slate-50 py-4 pr-4 pl-12 text-slate-900 transition-all outline-none focus:bg-white dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-primary shadow-primary/25 hover:shadow-primary/40 flex w-full transform items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-blue-700 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                {!loading && <span className="material-icons">login</span>}
              </button>
            </form>

            <p className="text-center text-slate-600 dark:text-slate-400">
              ¿Aún no tienes cuenta?
              <Link
                href="/register"
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

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

function SocialButton({
  provider,
  icon,
  onClick,
}: {
  provider: string
  icon: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:border-primary/20 flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    >
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
  style?: React.CSSProperties
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
        &ldquo;{text.replace(/"/g, '')}&rdquo;
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
