# Revius — CLAUDE.md

Archivo de contexto del proyecto para Claude Code y Cowork.
Mantener actualizado con cada decisión de arquitectura importante.

---

## ¿Qué es Revius?

Plataforma de reviews de productos de retail y comercio general. Ataca dos problemas:
1. Los usuarios tienen que investigar en muchos sitios distintos para tomar una decisión de compra.
2. Las reviews existentes pueden ser poco confiables: sesgo evidente, reviews falsas, o generadas por IA.

Revius centraliza las reviews y asigna un **credibility score** a cada una, calculado con análisis de lenguaje via API de Anthropic.

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend + Backend | Next.js (App Router) — monolito en Vercel |
| Base de datos | Supabase (PostgreSQL managed) |
| Auth | Supabase Auth (OAuth + magic link) |
| Storage | Supabase Storage (imágenes de productos) |
| IA / Análisis de reviews | Anthropic API — **claude-haiku-4-5-20251001** |
| Deploy | Vercel |

---

## Estructura de carpetas esperada

```
/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (main)/
│   │   ├── page.tsx                   # Home / productos hot, tendencias
│   │   ├── productos/
│   │   │   └── [id]/
│   │   │       └── page.tsx           # Detalle de producto + comparación precios + reviews
│   │   ├── tienda/
│   │   │   └── [id]/
│   │   │       └── page.tsx           # Perfil de tienda + store reviews
│   │   └── perfil/
│   │       └── page.tsx               # Perfil de usuario
│   └── api/
│       ├── product-reviews/
│       │   ├── route.ts               # GET (listar) + POST (crear, dispara análisis Anthropic)
│       │   └── [id]/
│       │       └── route.ts           # GET, PATCH, DELETE
│       ├── store-reviews/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── products/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── stores/
│       │   └── route.ts
│       ├── votes/
│       │   └── route.ts
│       └── favorites/
│           └── route.ts
├── components/
│   ├── ui/                            # Componentes base (botones, inputs, cards)
│   ├── reviews/                       # ReviewCard, ReviewForm, CredibilityBadge
│   ├── products/                      # ProductCard, ProductSearch, PriceComparison
│   └── stores/                        # StoreCard, StoreReputation
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # ✅ Implementado
│   │   ├── server.ts                  # ✅ Implementado (incluye createServiceClient)
│   │   └── middleware.ts              # ✅ Implementado
│   ├── anthropic/
│   │   └── analyze-review.ts          # Lógica de análisis de reviews con Anthropic
│   └── utils.ts
├── types/
│   └── database.ts                    # Tipos generados desde Supabase
├── middleware.ts                       # ✅ Implementado
└── CLAUDE.md                          # Este archivo
```

---

## Modelo de datos (schema v2 — ya aplicado en Supabase)

### Tablas principales

| Tabla | Descripción |
|---|---|
| `categories` | Categorías jerárquicas (parent_id null = raíz). Ej: Tecnología > Audio |
| `stores` | Tiendas con perfil propio, métricas de reputación, verificación |
| `users` | Perfil público, extiende auth.users. Incluye level y reputation |
| `user_badges` | Insignias ganadas por actividad |
| `followers` | Relación seguidor/seguido entre usuarios |
| `products` | Catálogo de productos. Incluye badge editorial y category_id |
| `product_sources` | Precios y disponibilidad por tienda para cada producto |
| `product_reviews` | Reviews de productos. Incluye credibility_score calculado por Anthropic |
| `review_analysis` | Resultado del análisis Anthropic (ai_generated_prob, bias, topics, sentiment) |
| `store_reviews` | Reviews de experiencia de compra en tiendas. Ratings por dimensión |
| `votes` | Votos helpful/not-helpful. Una tabla para ambos tipos de review |
| `favorites` | Productos y tiendas favoritos. Una tabla, dos FK opcionales |

### Vistas disponibles

| Vista | Uso |
|---|---|
| `product_reviews_full` | Reviews de producto con autor y análisis incluidos |
| `store_reviews_full` | Reviews de tienda con autor incluido |
| `products_with_category` | Productos con nombre/slug de categoría y padre (para breadcrumbs) |

### Niveles de usuario (calculados automáticamente por trigger)

| Level | Reviews necesarias |
|---|---|
| `bronce` | 0–9 |
| `plata` | 10–19 |
| `oro` | 20–49 |
| `experto` | 50+ |
| `premium` | Asignación manual vía service role |

---

## Variables de entorno

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=       # formato nuevo: sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=           # formato nuevo: sb_secret_...
ANTHROPIC_API_KEY=
```

**Regla estricta:** `ANTHROPIC_API_KEY` y `SUPABASE_SERVICE_ROLE_KEY` jamás deben usarse en Client Components ni en código que corra en el browser.

---

## Flujo principal: creación de una product review

```
POST /api/product-reviews
  │
  ├─ 1. Validar input (rating 1-5, body mínimo 50 chars)
  ├─ 2. Insertar review en product_reviews (credibility_score = null)
  ├─ 3. Llamar a Anthropic API → analyze-review.ts  [NO bloquea la respuesta al usuario]
  │      └─ Modelo: claude-haiku-4-5-20251001
  │      └─ Retorna: { ai_generated_prob, detected_bias, detected_topics, sentiment }
  ├─ 4. Insertar resultado en review_analysis
  ├─ 5. Calcular credibility_score y actualizar la review
  └─ 6. Triggers automáticos actualizan avg_score y review_count en products
```

**Importante:** el análisis de Anthropic corre en background — el route handler responde al usuario
inmediatamente tras el paso 2, sin esperar el análisis. El credibility_score aparece unos segundos
después en la UI.

---

## Lógica del credibility_score

El score va de 0 a 1:

```
credibility_score =
  (1 - ai_generated_prob) * 0.5      // 50%: no parece generada por IA
  + helpful_ratio * 0.3               // 30%: votos útiles de otros usuarios
  + (is_verified_purchase ? 0.2 : 0)  // 20%: compra verificada
```

---

## analyze-review.ts — prompt de Anthropic

Modelo: `claude-haiku-4-5-20251001`
Max tokens output: `300` (respuesta JSON corta)

### System prompt
```
Eres un analizador de reviews de productos. Tu tarea es evaluar la autenticidad
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
```

### User message
```
Analiza esta review:

Producto: {product_name}
Rating: {rating}/5
Título: {title}
Review: {body}
```

---

## Convenciones de código

- **TypeScript estricto** en todo el proyecto (`strict: true` en tsconfig)
- **Server Components por defecto** — solo usar `"use client"` cuando sea necesario
- **Route handlers** usan siempre el cliente server de Supabase, nunca el client-side
- **Análisis Anthropic** corre en background — nunca bloquear la respuesta al usuario
- **Vistas de Supabase** para queries complejas — usar `product_reviews_full` y `store_reviews_full`
- **Nombres de archivos** en kebab-case, componentes en PascalCase
- **Imports** con alias `@/` desde la raíz del proyecto
- **Errores** siempre manejados explícitamente — no usar catch vacíos

---

## Paquetes instalados

```bash
@supabase/supabase-js
@supabase/ssr
@anthropic-ai/sdk
```

---

## Decisiones de arquitectura tomadas

| Decisión | Elección | Razón |
|---|---|---|
| Backend | Monolito Next.js | Suficiente para esta etapa, menos complejidad operacional |
| DB | Supabase | PostgreSQL managed + auth + storage en uno |
| **Modelo IA** | **claude-haiku-4-5-20251001** | Suficiente para análisis de texto corto. ~$0,0006 USD por review vs $0,0045 de Sonnet. A 10.000 reviews/mes = ~$5.700 CLP |
| Deploy | Vercel | Integración nativa con Next.js |
| Auth | Supabase Auth | Evita implementar auth propio |
| Reviews | Tablas separadas (product_reviews / store_reviews) | Modelos de datos distintos |
| Votes / Favorites | Una tabla con dos FK opcionales | Más simple que dos tablas separadas |
| Análisis en background | Respuesta inmediata al usuario, análisis async | No bloquear UX por latencia de API |
| **Replies en reviews** | **No implementar por ahora** | Feature de retención para cuando haya tracción. Schema futuro: tabla `review_replies` plana con `review_id` y opcional `parent_reply_id`. |

---

## Backlog

### Fase 1 — Base (prioridad alta)
- [x] Schema v2 en Supabase
- [x] Clientes Supabase (`lib/supabase/client.ts`, `server.ts`)
- [x] Middleware de auth
- [ ] `lib/anthropic/analyze-review.ts`
- [ ] `POST /api/product-reviews` con análisis en background

### Fase 2 — Core UI (prioridad alta)
- [ ] Componente `CredibilityBadge`
- [ ] Página detalle de producto (`/productos/[id]`)
- [ ] Página perfil de tienda (`/tienda/[id]`)
- [ ] Formulario de review con validaciones

### Fase 3 — Features secundarios (prioridad media)
- [ ] Sistema de votos
- [ ] Favoritos
- [ ] Búsqueda full-text
- [ ] Perfil de usuario completo con niveles

### Backlog futuro
- [ ] Replies en reviews
- [ ] Notificaciones
- [ ] Scraping automático de precios
- [ ] Partner ads

---

*Última actualización: modelo IA definido como Haiku 4.5, análisis corre en background.*