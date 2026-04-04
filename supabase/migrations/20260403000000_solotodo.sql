-- ── Migración SoloTodo ────────────────────────────────────────────────────────
-- Ejecutar en Supabase SQL Editor o via CLI

-- 1. Columnas nuevas en products
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS solotodo_id integer,
  ADD COLUMN IF NOT EXISTS specs       jsonb,
  ADD COLUMN IF NOT EXISTS image_url   text;

-- Índice único para evitar duplicados al importar
CREATE UNIQUE INDEX IF NOT EXISTS products_solotodo_id_idx
  ON products (solotodo_id)
  WHERE solotodo_id IS NOT NULL;

-- 2. Tabla price_history
CREATE TABLE IF NOT EXISTS price_history (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  uuid        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  store_id    uuid        REFERENCES stores(id) ON DELETE SET NULL,
  store_name  text,
  price       numeric     NOT NULL,
  url         text,
  source      text        NOT NULL DEFAULT 'solotodo',
  fetched_at  timestamptz NOT NULL DEFAULT now(),
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Si la tabla ya existía sin store_name, agregarlo
ALTER TABLE price_history ADD COLUMN IF NOT EXISTS store_name text;

CREATE INDEX IF NOT EXISTS price_history_product_store_fetched
  ON price_history (product_id, store_id, fetched_at DESC);

-- RLS: solo service role puede escribir; lectura pública deshabilitada por defecto
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
