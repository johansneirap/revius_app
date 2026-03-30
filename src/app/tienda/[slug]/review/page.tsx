import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function TiendaReviewPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: store } = await supabase
    .from('stores')
    .select('id, name')
    .eq('slug', slug)
    .single()

  if (!store) notFound()

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-4xl font-bold text-gray-300">✍️</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Escribe una reseña de {store.name}
        </h1>
        <p className="mt-2 text-gray-500">
          Esta sección está en construcción. Pronto podrás dejar tu experiencia de compra.
        </p>
        <Link
          href={`/tienda/${slug}`}
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Volver a {store.name}
        </Link>
      </div>
    </main>
  )
}
