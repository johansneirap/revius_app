'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Logo from '@/components/Logo'

export default function RedirectPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const storeName = searchParams.get('tienda') || 'la tienda'
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simple progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30) // 100 * 30ms = 3 seconds

    // Redirect after 3.5 seconds to give user time to see the message
    const timeout = setTimeout(() => {
      window.location.href = 'https://google.com' // Mock redirect to external site
    }, 3500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="bg-background-light dark:bg-background-dark font-display flex min-h-screen flex-col items-center justify-center p-6 text-slate-800 transition-colors duration-500 dark:text-slate-100">
      {/* Ambient Background Elements */}
      <div className="pointer-events-none fixed top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-30 dark:opacity-20">
        <div className="bg-primary/20 absolute -top-32 -right-32 h-96 w-96 animate-pulse rounded-full blur-[120px]"></div>
        <div
          className="bg-primary/10 absolute -bottom-32 -left-32 h-96 w-96 animate-pulse rounded-full blur-[120px]"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="animate-in fade-in zoom-in w-full max-w-md text-center duration-700">
        <div className="mb-12 flex scale-110 justify-center">
          <Logo />
        </div>

        <div className="border-primary/5 group relative overflow-hidden rounded-[2.5rem] border bg-white p-10 shadow-[0_20px_50px_rgba(19,91,236,0.1)] backdrop-blur-sm dark:border-white/5 dark:bg-slate-900 dark:shadow-none">
          {/* Decorative border glow */}
          <div className="border-primary/20 pointer-events-none absolute inset-0 rounded-[2.5rem] border-2 opacity-0 transition-opacity group-hover:opacity-100"></div>

          <div className="relative mb-10">
            <div className="bg-primary/5 dark:bg-primary/20 text-primary mx-auto mb-8 flex h-20 w-20 -rotate-6 transform items-center justify-center rounded-3xl shadow-inner transition-transform duration-500 hover:rotate-0">
              <span className="material-symbols-outlined fill-1 text-5xl">
                shopping_cart_checkout
              </span>
            </div>
            <h1 className="mb-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Redirigiendo...
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Conectándote con{' '}
              <span className="text-primary font-bold">{storeName}</span>
            </p>
          </div>

          <div className="relative mb-10 h-3 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner dark:bg-slate-800">
            <div
              className="from-primary absolute top-0 left-0 h-full bg-gradient-to-r to-blue-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 animate-pulse bg-white/20"></div>
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-sm leading-relaxed font-bold text-slate-600 italic opacity-80 dark:text-slate-400">
              Estás saliendo de{' '}
              <span className="text-primary not-italic">Revius.cl</span> para
              completar tu compra. ¡Gracias por confiar en nuestra comunidad!
            </p>

            <div className="border-primary/5 border-t pt-8">
              <a
                className="text-primary group flex items-center justify-center gap-2 text-xs font-black tracking-widest uppercase transition-all hover:text-blue-700"
                href="#"
              >
                ¿Problemas? Haz clic aquí
                <span className="material-icons text-sm transition-transform group-hover:translate-x-1">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-2 opacity-60">
          <p className="mx-auto max-w-xs text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
            Serás redirigido automáticamente en segundos.
          </p>
          <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
            Revisa las condiciones de envío en el sitio de destino.
          </p>
        </div>
      </div>

      {/* Additional CSS for better animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
