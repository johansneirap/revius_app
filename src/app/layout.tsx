import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use next/font for optimization
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inicio: Productos Hot & Reseñas Destacadas | Revius.cl",
  description: "Empoderando a los consumidores chilenos con datos objetivos y opiniones expertas para mejores decisiones de compra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} antialiased bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-200`}
      >
        {children}
      </body>
    </html>
  );
}
