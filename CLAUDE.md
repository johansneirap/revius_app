# Revius — CLAUDE.md

Archivo de contexto del proyecto para Claude Code y Cowork.
Mantener actualizado con cada decisión de arquitectura importante.

---

## ¿Qué es Revius?

Plataforma de reviews de productos de retail y comercio general. Ataca dos problemas:
1. Los usuarios tienen que investigar en muchos sitios distintos para tomar una decisión de compra.
2. Las reviews existentes pueden ser poco confiables: sesgo evidente, reviews falsas, o generadas por IA.

Revius centraliza las reviews y asigna un **credibility score** a cada una, calculado con análisis de lenguaje via API de Anthropic.

**URL producción:** https://revius.cl
**URL staging:** pendiente configurar (dev.revius.cl)

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend + Backend | Next.js (App Router) — monolito en Vercel |
| Base de datos | Supabase (PostgreSQL managed) |
| Auth | Supabase Auth (email + Google OAuth) |
| Storage | Supabase Storage (imágenes de productos) |
| IA / Análisis de reviews | Anthropic API — **claude-haiku-4-5-20251001** |
| Deploy | Vercel (main → revius.cl, dev → dev.revius.cl pendiente) |

---

## Estado actual del proyecto (v1 desplegada en producción)

### ✅ Implementado y funcionando
- Schema v2 completo en Supabase con RLS, triggers y vistas
- Slugs auto-generados en products (función slugify + unaccent)
- Clientes Supabase (client.ts, server.ts con createServiceClient)
- Middleware de auth
- analyze-review.ts con Anthropic Haiku (background, Promise.race 8s)
- POST /api/product-reviews con análisis integrado
- CredibilityBadge (4 estados: Alta/Media/Baja/Analizando)
- ReviewCard + ReviewList con ReliabilitySummary
- Página /producto/[slug] con datos reales
- Página /tienda/[slug] con datos reales
- Home conectado a Supabase
- Auth funcional (email + Google OAuth)
- NavUser Server Component
- Formulario de review conectado al API
- Perfil de usuario /perfil con datos reales
- Tabla product_requests para solicitudes de productos
- Deploy en revius.cl con variables de entorno configuradas

---

## Estructura de carpetas

```
/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx             # ✅
│   │   └── register/page.tsx          # ✅
│   ├── auth/callback/route.ts         # ✅
│   ├── (main)/
│   │   ├── page.tsx                   # ✅ Home
│   │   ├── producto/[slug]/
│   │   │   ├── page.tsx               # ✅ Detalle producto
│   │   │   └── review/page.tsx        # ✅ Formulario review
│   │   ├── tienda/[slug]/
│   │   │   ├── page.tsx               # ✅ Perfil tienda
│   │   │   └── review/page.tsx        # ✅ Placeholder
│   │   ├── perfil/page.tsx            # ✅
│   │   ├── escribir-resena/page.tsx   # ✅ Buscador productos
│   │   ├── tendencias/page.tsx        # ⬜ Pendiente
│   │   ├── cupones/page.tsx           # ⬜ Pendiente
│   │   └── admin/
│   │       └── productos/
│   │           └── solicitudes/       # ⬜ Pendiente
│   └── api/
│       ├── product-reviews/route.ts   # ✅
│       └── product-reviews/[id]/route.ts
├── components/
│   ├── ui/
│   │   ├── DarkModeToggle.tsx         # ✅ (bug pendiente de corregir)
│   │   ├── NavUser.tsx                # ✅
│   │   └── SignOutButton.tsx          # ✅
│   ├── reviews/
│   │   ├── CredibilityBadge.tsx       # ✅
│   │   ├── ReviewCard.tsx             # ✅
│   │   └── ReviewList.tsx             # ✅
│   └── products/
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # ✅
│   │   ├── server.ts                  # ✅
│   │   └── middleware.ts              # ✅
│   └── anthropic/
│       └── analyze-review.ts          # ✅
├── scripts/
│   └── import-ml-products.ts          # ⬜ Pendiente (403 ML API)
├── middleware.ts                       # ✅
└── CLAUDE.md
```

---

## Modelo de datos (schema v2 — aplicado en Supabase)

### Tablas principales

| Tabla | Descripción |
|---|---|
| `categories` | Jerárquicas — Tecnología, Estilo de Vida, Hogar |
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
| `product_reviews_full` | Reviews con autor y análisis |
| `store_reviews_full` | Reviews de tienda con autor |
| `products_with_category` | Productos con breadcrumb |

### Niveles de usuario

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
NEXT_PUBLIC_APP_URL=                 # https://revius.cl en prod, http://localhost:3000 en local
```

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
  + (is_verified_purchase ? 0.25 : 0.15)
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

## analyze-review.ts — notas importantes

Modelo: `claude-haiku-4-5-20251001` | Max tokens: `300`

Haiku a veces devuelve JSON con markdown fences — siempre hacer strip:
```typescript
const rawText = content.text
  .replace(/^```json\s*/i, '')
  .replace(/^```\s*/i, '')
  .replace(/```\s*$/i, '')
  .trim()
```

---

## Gestión del catálogo

**Decisión:** Catálogo curado por admin. Usuarios pueden solicitar productos via `product_requests`, no agregarlos directamente. Evita duplicados y desorden.

**Contenido inicial:** Script ML pendiente de resolver (403 en API de búsqueda sin OAuth completo). Productos actuales insertados manualmente.

---

## Monetización

### v1 activa
- Afiliados ML — pendiente agregar `affiliate_url` a `product_sources`
- Tiendas verificadas — `is_verified` en schema, falta flujo de pago

### Roadmap
- Afiliados Falabella/Ripley (post-tracción)
- Plan premium usuarios (Stripe o Flow)
- Cupones para compra online (feature pendiente)
- Patrocinados / Oferta Partner (publicidad nativa)
- Inteligencia de mercado B2B

---

## Convenciones de código

- TypeScript estricto
- Server Components por defecto
- `createClient()` para lecturas, `createServiceClient()` para escrituras privilegiadas
- Análisis Anthropic siempre en background con Promise.race
- Imágenes externas: `<img referrerPolicy="no-referrer">` en lugar de `<Image>` de Next.js
- Kebab-case archivos, PascalCase componentes, alias `@/`

---

## Decisiones de arquitectura

| Decisión | Elección | Razón |
|---|---|---|
| Backend | Monolito Next.js | Suficiente para esta etapa |
| DB | Supabase | PostgreSQL + auth + storage en uno |
| Modelo IA | claude-haiku-4-5-20251001 | ~$0,0006 USD/review |
| Deploy | Vercel | Integración nativa con Next.js |
| Dominios | revius.cl = app, landing.revius.cl = landing | App es el destino principal |
| Catálogo | Curado por admin + solicitudes | Evitar duplicados |
| Scraping | No en v1 | Riesgo legal, usar API ML primero |
| Replies | No implementar por ahora | Post-tracción |

---

## Backlog completo

### Inmediato — antes de traer usuarios
- [x] Cargar 100+ productos reales (resolver script ML o insertar manualmente)
- [ ] Agregar `affiliate_url` y `affiliate_program` a `product_sources`
- [ ] Activar links de afiliados ML en botones de compra
- [ ] Configurar ambiente staging (dev branch → dev.revius.cl)

### UI/UX — funcionalidades pendientes
- [x] **Dark mode** — corregir bug, el toggle no persiste correctamente
- [x] **Navbar** — conectar todas las opciones:
  - [x] Categorías (Tecnología, Estilo de Vida, Hogar, Lo Mejor) → páginas de categoría
  - [x] Búsqueda — conectar buscador del navbar a resultados reales
  - [ ] Notificaciones — ícono de campana funcional
- [ ] **Búsqueda full-text** — página /buscar con resultados reales usando pg_trgm
- [ ] **Tendencias** — página /tendencias con productos más revieweados y trending
- [ ] **Cupones** — página /cupones con descuentos y códigos de tiendas asociadas
- [ ] **Patrocinados** — feature de productos patrocinados en resultados de búsqueda
- [ ] **Oferta Partner** — sidebar con ofertas de partners verificados (actualmente mock)
- [x] **Footer** — implementar páginas relevantes:
  - [x] /como-funciona
  - [x] /guia-de-resenas
  - [x] /terminos-de-servicio
  - [x] /privacidad
  - [x] /contacto
  - [x] /sobre-nosotros

### Features de producto (v2)
- [ ] **Resumen inteligente de reviews** — cuando un producto tiene 10+ reviews, Anthropic genera un resumen narrativo con pros, contras y % de confiabilidad. Es el diferenciador clave de Revius.
- [ ] **Sistema de votos** — helpful/not helpful en reviews (mejora credibility_score)
- [ ] **Favoritos funcionales** — guardar productos y tiendas
- [ ] **Solicitar producto** — formulario para que usuarios pidan agregar productos al catálogo
- [ ] **Panel admin** — /admin/productos/solicitudes para aprobar/rechazar solicitudes
- [ ] **Historial de precios** — gráfico de evolución de precio por producto
- [ ] **Alertas de precio** — notificar cuando baja el precio de un favorito

### Operacional
- [ ] **SEO** — metadata dinámica en páginas de producto (title, description, og:image)
- [ ] **Ambiente staging** — dev branch → dev.revius.cl + Supabase separado para dev
- [ ] **Tiendas verificadas** — flujo de pago para que tiendas se verifiquen
- [ ] **Afiliados Falabella/Ripley** — aplicar cuando haya tracción (>10k MAU)
- [ ] **Plan premium** — Stripe o Flow cuando haya demanda

### Backlog futuro
- [ ] Inteligencia de mercado B2B (insights para marcas y retailers)
- [ ] Extensión de browser
- [ ] Replies en reviews
- [ ] Notificaciones push
- [ ] App móvil

---

*Última actualización: v1 desplegada en revius.cl. Backlog completo con todas las features pendientes.*