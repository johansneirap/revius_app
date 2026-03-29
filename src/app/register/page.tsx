'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name.trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (authError) {
      if (authError.message.includes('already registered')) {
        setError('Este correo ya está registrado. Intenta iniciar sesión.')
      } else {
        setError('Error al crear la cuenta. Intenta nuevamente.')
      }
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="dark:bg-background-dark font-display flex min-h-screen items-center justify-center bg-white p-8 transition-colors duration-500">
        <div className="w-full max-w-md space-y-8 text-center">
          <Logo size="lg" className="mx-auto" />
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-10 dark:border-emerald-800 dark:bg-emerald-900/20">
            <span className="material-icons mb-4 block text-5xl text-emerald-500">
              mark_email_read
            </span>
            <h2 className="mb-3 text-2xl font-black text-slate-900 dark:text-white">
              ¡Revisa tu email!
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Te enviamos un enlace de confirmación a{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                {email}
              </span>
              . Haz clic en el enlace para activar tu cuenta.
            </p>
          </div>
          <Link
            href="/login"
            className="text-primary font-bold transition-colors hover:text-blue-700"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    )
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
        {/* Left Side */}
        <div className="animate-in fade-in relative hidden overflow-hidden duration-1000 lg:flex lg:w-1/2">
          <Image
            alt="Comunidad Revius"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw_sVT70yYKCbT0NUVSDNlCYk6bMZO9TUa-hfsEmwTCqNlOmb3gcGr6FV7e0-1qR2tBHTEC83SmoKArxpjDd9_pHNtJdTBn4Zex2oVr4josoXLQuwDAeGaiRc1BZc4Fyy6EuHzvjobYuUFka9whXzi7YjIqHX6VQPM-Fqhjij80UcZA3StifrlkIj4_bkvhWESMVEaDM2LpIHP5S8oCgPs42MIBl8nKtFGFg7zjgZPRi63_gBD78GlaPkDOBhkxKZCWALlmcqmFcDA"
            fill
            priority
            className="scale-105 object-cover"
          />
          <div className="absolute inset-0 bg-[#135bec]/85 mix-blend-multiply"></div>
          <div className="absolute inset-0 z-10 flex flex-col justify-center bg-gradient-to-br from-[#135bec]/90 via-[#135bec]/80 to-[#0a2f7a]/95 px-20 text-white">
            <div className="mb-12">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-xl">
                <span className="material-icons text-5xl text-white">
                  group_add
                </span>
              </div>
              <h1 className="mb-6 text-5xl leading-tight font-black tracking-tight">
                Únete a la{' '}
                <span className="text-blue-200">comunidad</span>
                <br />
                de compradores.
              </h1>
              <p className="max-w-xl text-xl leading-relaxed font-light text-blue-100">
                Comparte tus experiencias reales y ayuda a miles de personas a
                tomar mejores decisiones de compra.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: 'verified', text: 'Tus reseñas analizadas con IA para detectar autenticidad' },
                { icon: 'trending_up', text: 'Sube de nivel: Bronce → Plata → Oro → Experto' },
                { icon: 'insights', text: 'Accede a comparativas de precios en tiempo real' },
              ].map(({ icon, text }) => (
                <div key={icon} className="flex items-center gap-4">
                  <span className="material-icons text-blue-200">{icon}</span>
                  <p className="text-sm font-medium text-blue-100">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="dark:bg-background-dark animate-in slide-in-from-right relative flex w-full flex-col items-center justify-center overflow-y-auto bg-white p-8 duration-700 lg:w-1/2">
          <div className="w-full max-w-md space-y-8">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Logo
                size="lg"
                className="mb-8 origin-left scale-110 lg:scale-125"
              />
              <h2 className="font-display mb-2 text-4xl font-bold text-slate-900 dark:text-white">
                Crea tu cuenta
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400">
                Gratis, siempre.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="name">
                  Nombre
                </label>
                <div className="group relative">
                  <span className="material-icons group-focus-within:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors">
                    person
                  </span>
                  <input
                    type="text"
                    id="name"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="focus:border-primary/50 w-full rounded-2xl border-2 border-transparent bg-slate-50 py-4 pr-4 pl-12 text-slate-900 transition-all outline-none focus:bg-white dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="email">
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
                <label className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="password">
                  Contraseña
                </label>
                <div className="group relative">
                  <span className="material-icons group-focus-within:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors">
                    key
                  </span>
                  <input
                    type="password"
                    id="password"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus:border-primary/50 w-full rounded-2xl border-2 border-transparent bg-slate-50 py-4 pr-4 pl-12 text-slate-900 transition-all outline-none focus:bg-white dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="confirmPassword">
                  Confirmar contraseña
                </label>
                <div className="group relative">
                  <span className="material-icons group-focus-within:text-primary absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors">
                    lock
                  </span>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? 'Creando cuenta...' : 'Crear cuenta gratis'}
                {!loading && <span className="material-icons">person_add</span>}
              </button>
            </form>

            <p className="text-center text-slate-600 dark:text-slate-400">
              ¿Ya tienes cuenta?
              <Link
                href="/login"
                className="text-primary decoration-primary/30 ml-2 font-bold underline underline-offset-4 transition-colors hover:text-blue-700"
              >
                Inicia sesión
              </Link>
            </p>

            <div className="flex justify-center gap-8 border-t border-slate-50 pt-8 dark:border-slate-900">
              {(['Términos', 'Privacidad', 'Soporte'] as const).map((label) => (
                <Link
                  key={label}
                  href="#"
                  className="hover:text-primary text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
