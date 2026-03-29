'use client'

import CredibilityBadge from '@/components/reviews/CredibilityBadge'

// Tipo que refleja la vista product_reviews_full de Supabase
export type ProductReviewFull = {
  // Campos de product_reviews
  id: string
  product_id: string
  user_id: string
  rating: number
  title: string | null
  body: string
  is_verified_purchase: boolean
  credibility_score: number | null
  helpful_count: number
  not_helpful_count: number
  created_at: string
  updated_at: string
  // Campos del autor (desde users)
  author_username: string | null
  author_avatar: string | null
  author_level: 'bronce' | 'plata' | 'oro' | 'experto' | 'premium' | null
  // Campos del análisis (desde review_analysis)
  ai_generated_prob: number | null
  detected_bias: string | null
  detected_topics: string[] | null
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed' | null
}

const STARS = [1, 2, 3, 4, 5]

const LEVEL_LABEL: Record<NonNullable<ProductReviewFull['author_level']>, string> = {
  bronce: 'Bronce',
  plata: 'Plata',
  oro: 'Oro',
  experto: 'Experto',
  premium: 'Premium',
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {STARS.map((s) => (
        <svg
          key={s}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={s <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.2"
          className={s <= rating ? 'text-amber-400' : 'text-gray-300'}
          aria-hidden="true"
        >
          <path d="M6 1l1.35 2.73L10.5 4.22l-2.25 2.19.53 3.09L6 8l-2.78 1.5.53-3.09L1.5 4.22l3.15-.49L6 1z" />
        </svg>
      ))}
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

type Props = {
  review: ProductReviewFull
}

export default function ReviewCard({ review }: Props) {
  const authorName = review.author_username ?? 'Usuario'
  const initials = authorName.slice(0, 2).toUpperCase()

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar */}
          {review.author_avatar ? (
            <img
              src={review.author_avatar}
              alt={authorName}
              className="h-8 w-8 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
              {initials}
            </span>
          )}

          {/* Autor + nivel */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="truncate text-sm font-medium text-gray-900">
                {authorName}
              </span>
              {review.author_level && (
                <span className="text-xs text-gray-400">
                  · {LEVEL_LABEL[review.author_level]}
                </span>
              )}
              {review.is_verified_purchase && (
                <span className="text-xs font-medium text-emerald-600">
                  · Compra verificada
                </span>
              )}
            </div>
            <span className="text-xs text-gray-400">{formatDate(review.created_at)}</span>
          </div>
        </div>

        {/* CredibilityBadge */}
        <CredibilityBadge score={review.credibility_score} size="sm" />
      </div>

      {/* Rating + título */}
      <div className="mt-3 flex items-center gap-2">
        <StarRating rating={review.rating} />
        {review.title && (
          <span className="text-sm font-semibold text-gray-800">{review.title}</span>
        )}
      </div>

      {/* Cuerpo */}
      <p className="mt-2 text-sm leading-relaxed text-gray-700">{review.body}</p>

      {/* Topics del análisis */}
      {review.detected_topics && review.detected_topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {review.detected_topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Votos helpful */}
      {(review.helpful_count > 0 || review.not_helpful_count > 0) && (
        <p className="mt-3 text-xs text-gray-400">
          {review.helpful_count} persona
          {review.helpful_count !== 1 ? 's' : ''} encontraron esta reseña útil
        </p>
      )}
    </article>
  )
}
