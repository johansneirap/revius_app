import Link from 'next/link'
import Logo from '@/components/Logo'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import NavUser from '@/components/ui/NavUser'

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Cómo Funciona', href: '/como-funciona' },
  { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { label: 'Contacto', href: '/contacto' },
]

const FOOTER_LINKS = [
  { label: 'Cómo Funciona', href: '/como-funciona' },
  { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { label: 'Metodología', href: '/metodologia-credibilidad' },
  { label: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Términos de Servicio', href: '/terminos-servicio' },
  { label: 'Política de Privacidad', href: '/politica-privacidad' },
  { label: 'Contacto', href: '/contacto' },
]

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 text-sm md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-primary rounded-lg px-3 py-2 text-slate-600 transition-colors dark:text-slate-400"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <NavUser />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-slate-50 py-10 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            {FOOTER_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400">
            © 2026 Revius.cl — Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
