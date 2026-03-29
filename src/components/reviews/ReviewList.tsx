'use client'

import ReviewCard, { type ProductReviewFull } from '@/components/reviews/ReviewCard'
import CredibilityBadge from '@/components/reviews/CredibilityBadge'

type Props = {
  reviews: ProductReviewFull[]
}

function ReliabilitySummary({ reviews }: { reviews: ProductReviewFull[] }) {
  if (reviews.length < 3) return null

  const scoredReviews = reviews.filter((r) => r.credibility_score !== null)
  if (scoredReviews.length === 0) return null

  const highCount = scoredReviews.filter((r) => r.credibility_score! >= 0.7).length
  const pct = Math.round((highCount / scoredReviews.length) * 100)

  // Score sintético para el badge: proporción de reviews confiables
  const syntheticScore = highCount / scoredReviews.length

  return (
    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <CredibilityBadge score={syntheticScore} size="lg" />
      <span className="text-sm text-gray-600">
        <span className="font-semibold text-gray-900">{pct}%</span> de reseñas confiables
      </span>
    </div>
  )
}

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Aún no hay reseñas para este producto.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <ReliabilitySummary reviews={reviews} />
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}
