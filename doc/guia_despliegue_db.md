# Guía de Infraestructura de Base de Datos

Para ejecutar Revius.cl como una aplicación Fullstack, necesitamos una base de datos PostgreSQL. Aquí te explico la estrategia para los dos entornos.

## 1. Entorno Local (Tu Computador)

**Sí, necesitas una instancia local.** La forma más limpia y estándar en la industria es usar **Docker**, ya que no "ensucia" tu sistema operativo instalando servidores manualmente.

### Opción A: Docker (Recomendada)
He creado un archivo `docker-compose.yml` en la raíz del proyecto.

1.  Asegúrate de tener Docker Desktop instalado y corriendo.
2.  En la terminal, ejecuta:
    ```bash
    docker-compose up -d
    ```
3.  Esto levantará una base de datos PostgreSQL en el puerto `5432`.
4.  Tu `.env` local debe verse así (ajusté el nombre de la DB a `revius_db`):
    ```env
    DATABASE_URL="postgresql://postgres:password@localhost:5432/revius_db?schema=public"
    ```

### Opción B: Instalación Nativa
Si prefieres no usar Docker, puedes instalar [Postgres.app](https://postgresapp.com/) (es lo más fácil en Mac).
1.  Instala y abre la app.
2.  Crea una base de datos llamada `revius_db`.
3.  Tu URL será algo como: `postgresql://tu_usuario_mac@localhost:5432/revius_db`

---

## 2. Entorno de Producción (Despliegue)

**Sí, necesitas un servicio de base de datos en la nube.** Cuando despliegues tu frontend (probablemente en Vercel), este necesitará conectarse a una base de datos accesible desde internet.

### Opciones Gratuitas / Baratas para MVP:

1.  **Vercel Postgres (Neon)**:
    *   **Pros**: Se integra con 1 clic si usas Vercel. Muy rápido.
    *   **Contras**: Tiene límites en el plan gratuito, pero suficientes para un MVP.
    *   *Recomendado para empezar.*

2.  **Supabase**:
    *   **Pros**: Muy generoso plan gratuito (500MB). Incluye autenticación y dashboard increíble.
    *   **Contras**: Tienes que configurar un par de cosas extra si usas Prisma (connection pooling), pero es fácil.

3.  **Railway**:
    *   **Pros**: Te da una base de datos Postgres completa por muy bajo costo (o créditos iniciales).
    *   **Contras**: No tiene capa gratuita permanente como los otros.

### ¿Cómo conectar Producción?
Simplemente en tu proveedor de hosting (ej: Vercel), configuras la Variable de Entorno `DATABASE_URL` con la dirección que te dé tu proveedor de base de datos (Supabase/Neon). No tienes que cambiar nada de código.
