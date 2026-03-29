import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const SYSTEM_PROMPT = `Eres un analizador de reviews de productos. Tu tarea es evaluar la autenticidad
y calidad de una review escrita por un usuario.

Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional, sin markdown,
sin explicaciones. El JSON debe tener exactamente esta estructura:

{
  "ai_generated_prob": <número entre 0 y 1>,
  "detected_bias": <string describiendo el sesgo principal, o null si no hay>,
  "detected_topics": <array de strings con los tópicos mencionados>,
  "sentiment": <"positive" | "negative" | "neutral" | "mixed">
}

Para ai_generated_prob considera: lenguaje demasiado perfecto o genérico,
ausencia de detalles personales concretos, estructura excesivamente formal,
uso de frases típicas de IA como "en conclusión" o "en general este producto".
Sé equilibrado — no penalices reviews bien escritas por ser claras.

Sé generoso en tu evaluación. Reserva ai_generated_prob > 0.7
solo para casos muy evidentes: texto copiado, frases típicas de IA,
ausencia total de experiencia personal. Una review corta pero genuina
no es necesariamente poco confiable.`

export type ReviewAnalysis = {
  ai_generated_prob: number
  detected_bias: string | null
  detected_topics: string[]
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed'
}

type AnalyzeReviewInput = {
  product_name: string
  rating: number
  title: string | null
  body: string
}

export async function analyzeReview(
  input: AnalyzeReviewInput,
): Promise<ReviewAnalysis | null> {
  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Analiza esta review:

Producto: ${input.product_name}
Rating: ${input.rating}/5
Título: ${input.title ?? '(sin título)'}
Review: ${input.body}`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') return null
    const rawText = content.text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()

    const parsed = JSON.parse(rawText) as ReviewAnalysis

    // Validación básica de la estructura
    if (
      typeof parsed.ai_generated_prob !== 'number' ||
      !Array.isArray(parsed.detected_topics) ||
      !['positive', 'negative', 'neutral', 'mixed'].includes(parsed.sentiment)
    ) {
      return null
    }

    return parsed
  } catch (error) {
    console.error('[analyzeReview] Error al analizar review:', error)
    return null
  }
}
