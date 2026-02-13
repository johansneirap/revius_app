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
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-100 min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500">
            {/* Ambient Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="w-full max-w-md text-center animate-in fade-in zoom-in duration-700">
                <div className="mb-12 flex justify-center scale-110">
                    <Logo />
                </div>

                <div className="bg-white dark:bg-slate-900 border border-primary/5 dark:border-white/5 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(19,91,236,0.1)] dark:shadow-none backdrop-blur-sm relative overflow-hidden group">
                    {/* Decorative border glow */}
                    <div className="absolute inset-0 border-2 border-primary/20 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                    <div className="mb-10 relative">
                        <div className="w-20 h-20 bg-primary/5 dark:bg-primary/20 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner transform -rotate-6 transition-transform hover:rotate-0 duration-500">
                            <span className="material-symbols-outlined text-5xl fill-1">shopping_cart_checkout</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                            Redirigiendo...
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            Conectándote con <span className="text-primary font-bold">{storeName}</span>
                        </p>
                    </div>

                    <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-10 shadow-inner">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-bold opacity-80 italic">
                            Estás saliendo de <span className="text-primary not-italic">Revius.cl</span> para completar tu compra. ¡Gracias por confiar en nuestra comunidad!
                        </p>

                        <div className="pt-8 border-t border-primary/5">
                            <a
                                className="text-xs font-black text-primary hover:text-blue-700 transition-all flex items-center justify-center gap-2 uppercase tracking-widest group"
                                href="#"
                            >
                                ¿Problemas? Haz clic aquí
                                <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 space-y-2 opacity-60">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 max-w-xs mx-auto">
                        Serás redirigido automáticamente en segundos.
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        Revisa las condiciones de envío en el sitio de destino.
                    </p>
                </div>
            </div>

            {/* Additional CSS for better animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    )
}
