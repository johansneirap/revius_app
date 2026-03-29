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

## Monetización

### Quick wins v1 (implementar primero)

**1. Links de afiliados — Mercado Libre**
- Programa: Mercado Libre Affiliates (mercadolibre.cl/afiliados)
- Comisiones: 1%–12% según categoría
- Implementación: campo `affiliate_url` en `product_sources` con el link del producto + parámetro de afiliado embebido. El botón del carrito apunta a `affiliate_url` cuando existe, a `url` cuando no.
- Sin aprobación previa — se puede integrar de inmediato con la API pública de ML.

**2. Tiendas verificadas**
- Las tiendas pagan suscripción mensual (~$50.000–$150.000 CLP/mes) para aparecer con badge "Tienda Verificada Revius" y acceder a métricas de sus reviews.
- El campo `is_verified` en la tabla `stores` ya existe — solo falta el flujo de pago y el badge visual.
- No requiere infraestructura adicional, es un acuerdo comercial directo.

### Roadmap de monetización (mediano/largo plazo)

**3. Afiliados Falabella / Ripley / Paris**
- Vía CJ Affiliate o Awin. Requiere aplicación y aprobación.
- Priorizar cuando haya tracción de usuarios (>10.000 MAU).

**4. Plan premium para usuarios**
- Filtros avanzados, historial de precios, alertas de baja de precio.
- El campo `level = 'premium'` en `users` ya está en el schema.
- Implementar con Stripe o Flow (Chile) cuando haya demanda real.

**5. Inteligencia de mercado B2B**
- Vender insights a marcas y retailers: qué dicen los usuarios de sus productos, comparativas vs competencia, tópicos más mencionados.
- Se construye solo mientras crece la base de reviews — no requiere implementación adicional hoy.
- Es el negocio diferenciador a largo plazo: nadie en Chile lo hace bien.

**6. Publicidad nativa contextual**
- "Productos patrocinados" claramente marcados en resultados de búsqueda.
- Similar a Google Shopping. Las tiendas pagan por aparecer primero en su categoría.
- Ya existe `partner_ads` como concepto en el backlog — implementar cuando haya volumen.

### Cambios de schema pendientes para afiliados
```sql
-- Agregar a product_sources:
ALTER TABLE public.product_sources
  ADD COLUMN IF NOT EXISTS affiliate_url text,
  ADD COLUMN IF NOT EXISTS affiliate_program text; -- 'mercadolibre' | 'falabella' | 'amazon' etc

-- Lógica en UI: mostrar affiliate_url si existe, url como fallback
```

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
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # ✅ Implementado — datos reales de Supabase
│   │   ├── tienda/
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Perfil de tienda + store reviews
│   │   └── perfil/
│   │       └── page.tsx               # Perfil de usuario
│   └── api/
│       ├── product-reviews/
│       │   ├── route.ts               # ✅ Implementado — GET + POST con análisis Anthropic
│       │   └── [id]/
│       │       └── route.ts
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
│   ├── ui/
│   │   └── DarkModeToggle.tsx         # ✅ Implementado
│   ├── reviews/
│   │   ├── CredibilityBadge.tsx       # ✅ Implementado
│   │   ├── ReviewCard.tsx             # ✅ Implementado
│   │   └── ReviewList.tsx             # ✅ Implementado
│   ├── products/
│   └── stores/
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # ✅ Implementado
│   │   ├── server.ts                  # ✅ Implementado (incluye createServiceClient)
│   │   └── middleware.ts              # ✅ Implementado
│   ├── anthropic/
│   │   └── analyze-review.ts         # ✅ Implementado
│   └── utils.ts
├── types/
│   └── database.ts
├── middleware.ts                      # ✅ Implementado
└── CLAUDE.md
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
| `products` | Catálogo con slug auto-generado, badge editorial, category_id |
| `product_sources` | Precios por tienda. Pendiente: agregar affiliate_url, affiliate_program |
| `product_reviews` | Reviews de productos con credibility_score |
| `review_analysis` | Análisis Anthropic (ai_generated_prob, bias, topics, sentiment) |
| `store_reviews` | Reviews de experiencia de compra. Ratings por dimensión |
| `votes` | helpful/not-helpful para ambos tipos de review |
| `favorites` | Productos y tiendas favoritos |

### Vistas disponibles

| Vista | Uso |
|---|---|
| `product_reviews_full` | Reviews con autor y análisis incluidos |
| `store_reviews_full` | Reviews de tienda con autor |
| `products_with_category` | Productos con breadcrumb (category + parent) |

### Slugs de productos
- Campo `slug` en `products` — auto-generado por trigger desde `name`
- Función `slugify()` usa `unaccent` + regexp para limpiar acentos y caracteres especiales
- Colapsa múltiples guiones en uno
- URL de producto: `/producto/[slug]`

### Niveles de usuario

| Level | Reviews necesarias |
|---|---|
| `bronce` | 0–9 |
| `plata` | 10–19 |
| `oro` | 20–49 |
| `experto` | 50+ |
| `premium` | Manual vía service role (futuro: pago) |

---

## Variables de entorno

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=       # sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=           # sb_secret_...
ANTHROPIC_API_KEY=
```

**Regla:** `ANTHROPIC_API_KEY` y `SUPABASE_SERVICE_ROLE_KEY` nunca en Client Components.

---

## Flujo principal: creación de una product review

```
POST /api/product-reviews
  ├─ 1. Validar input (rating 1-5, body ≥50 chars)
  ├─ 2. Insertar review (credibility_score = null)
  ├─ 3. Responder 201 al usuario inmediatamente
  └─ 4. runAnalysis() en background sin await:
         ├─ Llamar Anthropic Haiku → analyze-review.ts
         ├─ Insertar en review_analysis (createServiceClient)
         └─ Calcular y actualizar credibility_score
```

## Lógica del credibility_score

```
credibility_score =
  (1 - ai_generated_prob) * 0.5   // 50%: no parece IA
  + helpful_ratio * 0.3            // 30%: votos útiles
  + (is_verified_purchase ? 0.2 : 0) // 20%: compra verificada
```

---

## analyze-review.ts — prompt de Anthropic

Modelo: `claude-haiku-4-5-20251001` | Max tokens: `300`

**System prompt:**
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

**User message:**
```
Analiza esta review:
Producto: {product_name}
Rating: {rating}/5
Título: {title}
Review: {body}
```

---

## Convenciones de código

- TypeScript estricto (`strict: true`)
- Server Components por defecto — `"use client"` solo cuando sea necesario
- Route handlers usan `createClient()` de server, operaciones privilegiadas usan `createServiceClient()`
- Análisis Anthropic siempre en background — nunca bloquear respuesta al usuario
- Usar vistas de Supabase para queries complejas
- Kebab-case para archivos, PascalCase para componentes
- Imports con alias `@/`
- Errores siempre manejados explícitamente

---

## Decisiones de arquitectura tomadas

| Decisión | Elección | Razón |
|---|---|---|
| Backend | Monolito Next.js | Suficiente para esta etapa |
| DB | Supabase | PostgreSQL + auth + storage en uno |
| Modelo IA | claude-haiku-4-5-20251001 | ~$0,0006 USD/review. A 10k reviews/mes = ~$5.700 CLP |
| Deploy | Vercel | Integración nativa con Next.js |
| Auth | Supabase Auth | Evita implementar auth propio |
| Reviews | Tablas separadas (product_reviews / store_reviews) | Modelos distintos |
| Votes / Favorites | Una tabla con dos FK opcionales | Más simple |
| Análisis | Background async | No bloquear UX |
| Slugs | Auto-generados por trigger desde name | URLs legibles y SEO-friendly |
| Scraping | No implementar en v1 | Riesgo legal + mantenimiento alto. Usar API ML + afiliados primero |
| Replies en reviews | No implementar por ahora | Feature de retención post-tracción. Schema futuro: `review_replies` con `review_id` + `parent_reply_id` opcional |

---

## Backlog

### v1 — Para salir a producción
- [x] Schema v2 en Supabase
- [x] Slugs auto-generados en products
- [x] Clientes Supabase + middleware auth
- [x] analyze-review.ts (Anthropic Haiku, background)
- [x] POST /api/product-reviews
- [x] CredibilityBadge + ReviewCard + ReviewList
- [x] Página /producto/[slug] con datos reales
- [ ] Agregar affiliate_url + affiliate_program a product_sources
- [ ] Integración API Mercado Libre (productos + precios + affiliate links)
- [ ] Formulario de review (/producto/[slug]/review)
- [ ] Página perfil de tienda (/tienda/[slug])
- [ ] Auth funcional (login/register con Supabase)
- [ ] Badge "Tienda Verificada" visible en UI

### v2 — Post-lanzamiento
- [ ] Sistema de votos (helpful/not helpful)
- [ ] Favoritos (productos y tiendas)
- [ ] Búsqueda full-text (pg_trgm ya habilitado)
- [ ] Perfil de usuario con niveles y badges
- [ ] Afiliados Falabella / Ripley (requiere aprobación)
- [ ] Plan premium usuarios (Stripe o Flow)

### Backlog futuro
- [ ] Inteligencia de mercado B2B (insights para marcas)
- [ ] Publicidad nativa contextual (productos patrocinados)
- [ ] Extensión de browser
- [ ] Historial de precios
- [ ] Alertas de baja de precio
- [ ] Replies en reviews
- [ ] Notificaciones

---

*Última actualización: estrategia de monetización definida, quick wins v1 identificados.*