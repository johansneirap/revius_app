import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeProvider from '@/components/ui/ThemeProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Inicio: Productos Hot & Reseñas Destacadas | Revius.cl',
  description:
    'Empoderando a los consumidores chilenos con datos objetivos y opiniones expertas para mejores decisiones de compra.',
}

// Script que corre de forma síncrona en <head>, antes del primer render,
// para evitar FOUC (flash of unstyled content) al inicializar el tema.
const themeInitScript = `(function(){try{
  var stored=localStorage.getItem('theme');
  var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark=stored!==null?stored==='dark':prefersDark;
  document.documentElement.classList.toggle('dark',isDark);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(e){
    if(!localStorage.getItem('theme')){
      document.documentElement.classList.toggle('dark',e.matches);
    }
  });
}catch(_){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Tema inicializado antes del primer render — sin FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} bg-background-light dark:bg-background-dark font-display text-slate-900 antialiased transition-colors duration-200 dark:text-slate-100`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
