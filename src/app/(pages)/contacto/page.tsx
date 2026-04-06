'use client'

import { useState } from 'react'
import Link from 'next/link'

const TOPICS = [
  'Pregunta sobre el servicio',
  'Reportar una review falsa',
  'Solicitar agregar un producto',
  'Problema con mi cuenta',
  'Propuesta comercial / partnership',
  'Prensa y medios',
  'Otro',
]

export default function Contacto() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50 to-white px-4 py-16 text-center sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-3xl">
          <span className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold">
            <span className="material-icons text-[16px]">mail</span>
            Contacto
          </span>
          <h1 className="mb-4 text-4xl font-black text-slate-900 sm:text-5xl dark:text-white">
            ¿En qué te podemos ayudar?
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Nuestro equipo responde en un plazo de 1 a 3 días hábiles. Para preguntas frecuentes,
            revisa primero nuestra sección de{' '}
            <Link href="/preguntas-frecuentes" className="text-primary hover:underline">
              FAQ
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-lg font-bold">Información de contacto</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-icons text-primary mt-0.5 text-[20px]">email</span>
                  <div>
                    <p className="text-sm font-semibold">Email general</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      hola@revius.cl
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-icons text-primary mt-0.5 text-[20px]">
                    business
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Propuestas comerciales</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      partners@revius.cl
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-icons text-primary mt-0.5 text-[20px]">schedule</span>
                  <div>
                    <p className="text-sm font-semibold">Tiempo de respuesta</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      1–3 días hábiles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 font-bold">¿Necesitas respuesta rápida?</h3>
              <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                Revisa si tu pregunta ya está respondida en nuestras preguntas frecuentes.
              </p>
              <Link
                href="/preguntas-frecuentes"
                className="text-primary text-sm font-bold hover:underline"
              >
                Ver preguntas frecuentes →
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-green-100 bg-green-50 px-8 py-16 text-center dark:border-green-900/30 dark:bg-green-900/10">
                <span className="material-icons text-5xl text-green-500">check_circle</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  ¡Mensaje enviado!
                </h2>
                <p className="max-w-sm text-sm text-slate-600 dark:text-slate-400">
                  Recibimos tu consulta y te responderemos en 1–3 días hábiles al email que
                  indicaste.
                </p>
                <button
                  onClick={() => {
                    setSent(false)
                    setForm({ name: '', email: '', topic: '', message: '' })
                  }}
                  className="mt-2 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h2 className="mb-6 text-lg font-bold">Envíanos un mensaje</h2>

                <div className="mb-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="topic"
                    className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Motivo de contacto
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    required
                    value={form.topic}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="" disabled>
                      Selecciona un motivo
                    </option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos en qué te podemos ayudar..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary w-full rounded-xl py-3 font-bold text-white transition-colors hover:bg-blue-700"
                >
                  Enviar mensaje
                </button>

                <p className="mt-4 text-center text-xs text-slate-400">
                  Al enviar este formulario, aceptas nuestra{' '}
                  <Link href="/politica-privacidad" className="hover:text-primary underline">
                    Política de Privacidad
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
