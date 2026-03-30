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
| Auth | Supabase Auth (email + Google OAuth) |
| Storage | Supabase Storage (imágenes de productos) |
| IA / Análisis de reviews | Anthropic API — **claude-haiku-4-5-20251001** |
| Deploy | Vercel |

---

## Estado actual del proyecto

### ✅ Implementado y funcionando
- Schema v2 completo en Supabase con RLS, triggers y vistas
- Slugs auto-generados en products (función slugify + unaccent)
- Clientes Supabase (client.ts, server.ts con createServiceClient)
- Middleware de auth — protege /perfil, /escribir-resena, /dashboard-tienda
- analyze-review.ts con Anthropic Haiku (background, Promise.race 8s)
- POST /api/product-reviews con análisis integrado
- CredibilityBadge (4 estados: Alta/Media/Baja/Analizando)
- ReviewCard + ReviewList con ReliabilitySummary
- Página /producto/[slug] con datos reales de Supabase
- Home conectado a Supabase (productos hot, tiendas verificadas)
- Auth funcional (login/register con email, Google OAuth)
- NavUser Server Component — muestra sesión correcta
- Formulario de review /producto/[slug]/review conectado al API
- Perfil de usuario /perfil con datos reales
- Tabla product_requests para solicitudes de productos

### 🔄 Pendiente v1
- [ ] Fix ReviewCard — mostrar author_name real (actualmente muestra "Usuario")
- [ ] Script de importación desde API Mercado Libre
- [ ] Página perfil de tienda /tienda/[slug]
- [ ] Deploy a Vercel con variables de entorno

---

## Estructura de carpetas

```
/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx             # ✅ Email + Google OAuth
│   │   └── register/page.tsx          # ✅ Registro con email
│   ├── auth/callback/route.ts         # ✅ OAuth callback
│   ├── (main)/
│   │   ├── page.tsx                   # ✅ Home con datos reales
│   │   ├── producto/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx           # ✅ Detalle producto
│   │   │       └── review/page.tsx    # ✅ Formulario review
│   │   ├── tienda/
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Perfil tienda (pendiente)
│   │   ├── perfil/page.tsx            # ✅ Perfil usuario
│   │   └── escribir-resena/page.tsx   # ✅ Buscador de productos
│   └── api/
│       ├── product-reviews/route.ts   # ✅ GET + POST con Anthropic
│       └── product-reviews/[id]/route.ts
├── components/
│   ├── ui/
│   │   ├── DarkModeToggle.tsx         # ✅
│   │   ├── NavUser.tsx                # ✅ Server Component
│   │   └── SignOutButton.tsx          # ✅ Client Component
│   ├── reviews/
│   │   ├── CredibilityBadge.tsx       # ✅
│   │   ├── ReviewCard.tsx             # ✅ (fix author_name pendiente)
│   │   └── ReviewList.tsx             # ✅
│   └── products/
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # ✅
│   │   ├── server.ts                  # ✅ (createClient + createServiceClient)
│   │   └── middleware.ts              # ✅
│   └── anthropic/
│       └── analyze-review.ts          # ✅
├── middleware.ts                       # ✅
└── CLAUDE.md
```

---

## Modelo de datos (schema v2 — aplicado en Supabase)

### Tablas principales

| Tabla | Descripción |
|---|---|
| `categories` | Jerárquicas — parent_id null = raíz (Tecnología, Estilo de Vida, Hogar) |
| `stores` | Tiendas verificadas con métricas de reputación |
| `users` | Perfil público. level auto-calculado por trigger |
| `user_badges` | Insignias por actividad |
| `followers` | Seguidor/seguido entre usuarios |
| `products` | Catálogo curado. slug auto-generado. badge editorial |
| `product_sources` | Precios por tienda. Pendiente: affiliate_url, affiliate_program |
| `product_reviews` | Reviews con credibility_score calculado por Anthropic |
| `review_analysis` | Análisis Anthropic (ai_generated_prob, bias, topics, sentiment) |
| `store_reviews` | Reviews de tiendas con ratings por dimensión |
| `votes` | helpful/not-helpful — una tabla para ambos tipos de review |
| `favorites` | Productos y tiendas favoritos — una tabla, dos FK opcionales |
| `product_requests` | Solicitudes de usuarios para agregar productos al catálogo |

### Vistas disponibles

| Vista | Uso |
|---|---|
| `product_reviews_full` | Reviews con autor (author_name, author_avatar, author_level) y análisis |
| `store_reviews_full` | Reviews de tienda con autor |
| `products_with_category` | Productos con breadcrumb (category + parent) |

### Slugs de productos
- Campo `slug` en `products` — auto-generado por trigger `auto_slug_products`
- Función `slugify()` usa extensión `unaccent` + regexp
- Colapsa múltiples guiones: `sonicpro-ultra-x1-audifonos-noise-cancelling`
- URL: `/producto/[slug]`

### Niveles de usuario (trigger automático)

| Level | Reviews |
|---|---|
| `bronce` | 0–9 |
| `plata` | 10–19 |
| `oro` | 20–49 |
| `experto` | 50+ |
| `premium` | Manual vía service role |

---

## Variables de entorno

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=       # sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=           # sb_secret_...
ANTHROPIC_API_KEY=                   # sk-ant-...
```

**Regla:** `ANTHROPIC_API_KEY` y `SUPABASE_SERVICE_ROLE_KEY` nunca en Client Components.

---

## Flujo: creación de una product review

```
POST /api/product-reviews
  ├─ 1. Verificar sesión (401 si no hay)
  ├─ 2. Validar input (rating 1-5, body ≥50 chars)
  ├─ 3. Insertar en product_reviews (credibility_score = null)
  ├─ 4. Promise.race([runAnalysis(), setTimeout(8000)])
  │      └─ runAnalysis() con createServiceClient():
  │           ├─ Llamar Anthropic Haiku → analyze-review.ts
  │           ├─ Strip markdown fences del JSON response
  │           ├─ Insert en review_analysis
  │           └─ Calcular y update credibility_score
  └─ 5. Responder 201 → cliente redirige a /producto/[slug]?review=success
```

## Lógica del credibility_score

```
credibility_score =
  (1 - ai_generated_prob) * 0.6
  + (is_verified_purchase ? 0.25 : 0.15)  // piso de 0.15 para reviews nuevas
  + helpful_ratio * 0.15
```

## Umbrales del CredibilityBadge

| Badge | Score | Color |
|---|---|---|
| Alta confiabilidad | ≥ 0.65 | Verde |
| Confiabilidad media | ≥ 0.40 | Ámbar |
| Baja confiabilidad | < 0.40 | Rojo |
| Analizando... | null | Gris |

---

## analyze-review.ts — prompt de Anthropic

Modelo: `claude-haiku-4-5-20251001` | Max tokens: `300`

**Importante:** Haiku a veces devuelve JSON envuelto en ```json ... ```.
Siempre hacer strip antes de JSON.parse:
```typescript
const rawText = content.text
  .replace(/^```json\s*/i, '')
  .replace(/^```\s*/i, '')
  .replace(/```\s*$/i, '')
  .trim()
```

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
Sé generoso en tu evaluación. Reserva ai_generated_prob > 0.7 solo para
casos muy evidentes: texto copiado, frases típicas de IA, ausencia total
de experiencia personal. Una review corta pero genuina no es necesariamente
poco confiable.
```

---

## Gestión del catálogo de productos

**Decisión:** Catálogo curado — no se permite a usuarios agregar productos libremente para evitar duplicados y desorden.

**Flujo de solicitudes:**
1. Usuario busca producto → no existe → "Solicitar este producto"
2. Rellena nombre, marca, URL de referencia → se crea registro en `product_requests`
3. Admin aprueba/rechaza desde `/admin/productos/solicitudes`
4. Al aprobar: producto se crea en el catálogo usando datos de ML API o los ingresados

**Contenido inicial:** Script de importación desde API Mercado Libre (pendiente implementar).
- API pública, gratuita, legal
- `GET https://api.mercadolibre.com/sites/MLC/search?category=MLC1051&limit=50`
- Categorías iniciales: Audio (MLC1051), Celulares (MLC1648), Computación (MLC1652)

---

## Monetización

### v1 — Quick wins
1. **Afiliados Mercado Libre** — campo `affiliate_url` en `product_sources` (pendiente agregar al schema)
2. **Tiendas verificadas** — `is_verified` ya existe en `stores`, falta flujo de pago

### Roadmap
3. Afiliados Falabella/Ripley (requiere aprobación, post-tracción)
4. Plan premium usuarios (Stripe o Flow)
5. Inteligencia de mercado B2B
6. Publicidad nativa contextual

---

## Convenciones de código

- TypeScript estricto (`strict: true`)
- Server Components por defecto — `"use client"` solo cuando necesario
- Route handlers: `createClient()` para lecturas, `createServiceClient()` para escrituras privilegiadas
- Análisis Anthropic siempre en background con Promise.race
- Vistas de Supabase para queries complejas
- Kebab-case archivos, PascalCase componentes
- Imports con alias `@/`
- Errores siempre manejados — no catch vacíos
- Imágenes externas: `<img referrerPolicy="no-referrer">` en lugar de `<Image>` de Next.js

---

## Decisiones de arquitectura

| Decisión | Elección | Razón |
|---|---|---|
| Backend | Monolito Next.js | Suficiente para esta etapa |
| DB | Supabase | PostgreSQL + auth + storage en uno |
| Modelo IA | claude-haiku-4-5-20251001 | ~$0,0006 USD/review. $5 USD = 8.000+ análisis |
| Deploy | Vercel | Integración nativa con Next.js |
| Auth | Supabase Auth | Email + Google OAuth sin implementar auth propio |
| Reviews | Tablas separadas (product_reviews / store_reviews) | Modelos distintos |
| Votes / Favorites | Una tabla con dos FK opcionales | Más simple |
| Análisis | Background async con Promise.race 8s | No bloquear UX |
| Slugs | Auto-generados por trigger desde name | URLs legibles y SEO-friendly |
| Catálogo | Curado por admin + solicitudes de usuarios | Evitar duplicados y desorden |
| Scraping | No en v1 | Riesgo legal + mantenimiento. Usar API ML primero |
| Replies en reviews | No implementar por ahora | Post-tracción. Schema futuro: `review_replies` con `review_id` + `parent_reply_id` |

---

## Backlog

### v1 — Para lanzamiento
- [x] Schema v2 + slugs + product_requests
- [x] Auth completo (email + Google)
- [x] Home, producto, formulario, perfil conectados a Supabase
- [x] Flujo end-to-end: review → Anthropic → credibility score → badge
- [x] Fix ReviewCard author_name
- [ ] Script importación ML (200-300 productos iniciales)
- [ ] Página /tienda/[slug]
- [ ] Agregar affiliate_url a product_sources
- [ ] Deploy a Vercel

### v2 — Post-lanzamiento
- [ ] Sistema de votos
- [ ] Favoritos funcionales
- [ ] Búsqueda full-text
- [ ] Panel admin /admin/productos/solicitudes
- [ ] Afiliados Falabella/Ripley
- [ ] Plan premium (Stripe o Flow)

### Backlog futuro
- [ ] Inteligencia de mercado B2B
- [ ] Publicidad nativa contextual
- [ ] Historial de precios
- [ ] Alertas de baja de precio
- [ ] Replies en reviews
- [ ] Notificaciones

---

*Última actualización: flujo end-to-end funcionando, catálogo curado definido, product_requests creado.*