import { createClient, createServiceClient } from '@/lib/supabase/server'
import { analyzeReview } from '@/lib/anthropic/analyze-review'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/product-reviews?product_id=<uuid>
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const productId = searchParams.get('product_id')

  if (!productId) {
    return NextResponse.json(
      { error: 'Se requiere product_id' },
      { status: 400 },
    )
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('product_reviews_full')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[GET /api/product-reviews]', error)
    return NextResponse.json(
      { error: 'Error al obtener reviews' },
      { status: 500 },
    )
  }

  return NextResponse.json(data)
}

// POST /api/product-reviews
export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const input = body as Record<string, unknown>

  // Validaciones
  const rating = Number(input.rating)
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: 'rating debe ser un entero entre 1 y 5' },
      { status: 400 },
    )
  }

  const reviewBody = input.body
  if (typeof reviewBody !== 'string' || reviewBody.trim().length < 50) {
    return NextResponse.json(
      { error: 'La review debe tener al menos 50 caracteres' },
      { status: 400 },
    )
  }

  const productId = input.product_id
  if (typeof productId !== 'string' || !productId) {
    return NextResponse.json(
      { error: 'Se requiere product_id' },
      { status: 400 },
    )
  }

  const title = typeof input.title === 'string' ? input.title : null
  const isVerifiedPurchase =
    typeof input.is_verified_purchase === 'boolean'
      ? input.is_verified_purchase
      : false

  // Paso 2: insertar review con credibility_score = null
  const { data: review, error: insertError } = await supabase
    .from('product_reviews')
    .insert({
      product_id: productId,
      user_id: user.id,
      rating,
      title,
      body: reviewBody.trim(),
      is_verified_purchase: isVerifiedPurchase,
      credibility_score: null,
    })
    .select()
    .single()

  if (insertError) {
    console.error('[POST /api/product-reviews] insert:', insertError)
    return NextResponse.json(
      { error: 'Error al guardar la review' },
      { status: 500 },
    )
  }

  // Paso 3: disparar análisis Anthropic en background (sin await)
  runAnalysis(review.id, productId, rating, title, reviewBody.trim(), isVerifiedPurchase)

  return NextResponse.json(review, { status: 201 })
}

async function runAnalysis(
  reviewId: string,
  productId: string,
  rating: number,
  title: string | null,
  body: string,
  isVerifiedPurchase: boolean,
) {
  // Obtener nombre del producto para el prompt
  const serviceClient = await createServiceClient()

  const { data: product } = await serviceClient
    .from('products')
    .select('name')
    .eq('id', productId)
    .single()

  const productName = product?.name ?? 'Producto desconocido'

  // Paso 3: análisis con Anthropic
  const analysis = await analyzeReview({
    product_name: productName,
    rating,
    title,
    body,
  })

  if (!analysis) return

  // Paso 4: guardar resultado en review_analysis
  const { error: analysisError } = await serviceClient
    .from('review_analysis')
    .insert({
      review_id: reviewId,
      ai_generated_prob: analysis.ai_generated_prob,
      detected_bias: analysis.detected_bias,
      detected_topics: analysis.detected_topics,
      sentiment: analysis.sentiment,
    })

  if (analysisError) {
    console.error('[runAnalysis] insert review_analysis:', analysisError)
    return
  }

  // Paso 5: calcular credibility_score
  // helpful_ratio = 0 para reviews nuevas (aún sin votos)
  const helpfulRatio = 0
  const credibilityScore =
    (1 - analysis.ai_generated_prob) * 0.5 +
    helpfulRatio * 0.3 +
    (isVerifiedPurchase ? 0.2 : 0)

  const { error: updateError } = await serviceClient
    .from('product_reviews')
    .update({ credibility_score: credibilityScore })
    .eq('id', reviewId)

  if (updateError) {
    console.error('[runAnalysis] update credibility_score:', updateError)
  }
}
