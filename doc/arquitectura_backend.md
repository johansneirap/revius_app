# Arquitectura Técnica del Backend (Revius.cl)

## Enfoque: Next.js App Router + Server Actions + Service Layer

Para el MVP de Revius.cl, hemos adoptado una arquitectura **monolítica moderna** utilizando las capacidades de rendering del servidor de Next.js.

### ¿Por qué esta estructura?

En lugar de separar el backend (API REST/GraphQL) del frontend, integramos la lógica de negocio directamente junto a la UI pero de forma desacoplada.

**Ventajas Clave:**
1.  **Type Safety (Seguridad de Tipos)**: Al usar TypeScript en todo el stack, los componentes de UI saben exactamente qué datos devuelve la base de datos sin necesidad de definir DTOs manuales o interfaces duplicadas.
2.  **Rendimiento**: Los *Server Components* pueden llamar a la base de datos directamente (sin hacer un `fetch` HTTP a una API interna), lo que reduce la latencia.
3.  **Simplicidad**: Menos archivos de configuración, despliegue único y gestión de estado simplificada.

### Patrón de Diseño: Service Layer

Para mantener el código ordenado y escalable, implementamos una **Capa de Servicios** (`src/services/`).

*   **`src/app/` (UI Layer)**: Solo se encarga de mostrar datos y capturar interacciones. Llama a los servicios, nunca a la base de datos directamente.
*   **`src/services/` (Business Logic)**: Contiene la lógica pura.
    *   Ejecuta validaciones de negocio.
    *   Interactúa con Prisma (`db`).
    *   Prepara los datos para la vista.
*   **`src/lib/prisma.ts` (Data Access)**: Singleton para la conexión a la base de datos.
*   **Base de Datos**: PostgreSQL.

#### Ejemplo de Flujo de Datos

1.  **Usuario** entra a `/producto/audifonos-xyz`.
2.  **Page (Server Component)** recibe el request.
3.  **Page** llama a `productService.getProductBySlug('audifonos-xyz')`.
4.  **Service** consulta a Prisma, incluye relaciones (precios, reseñas) y ordena.
5.  **Prisma** devuelve los datos tipeados.
6.  **Page** renderiza el HTML con los datos listos.

### Evolución Futura

Si la aplicación crece y requiere una API pública (para una App Móvil futura), esta estructura facilita la transición. Solo necesitaríamos crear *Route Handlers* (`/api/v1/...`) que consuman **los mismos servicios** que ya creamos, exponiendo los datos como JSON.
