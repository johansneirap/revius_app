-- ── Subcategorías y remapeo de productos ──────────────────────────────────────

-- 1. Agregar columnas si no existen
ALTER TABLE categories
  ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS slug      text;

-- 2. Poblar slug en categorías padre existentes (si están vacíos)
UPDATE categories SET slug = 'tecnologia'   WHERE name = 'Tecnología'   AND slug IS NULL;
UPDATE categories SET slug = 'audio'        WHERE name = 'Audio'        AND slug IS NULL;
UPDATE categories SET slug = 'hogar'        WHERE name = 'Hogar'        AND slug IS NULL;
UPDATE categories SET slug = 'estilo-vida'  WHERE name = 'Estilo de Vida' AND slug IS NULL;

-- 3. Insertar subcategorías (idempotente: solo si no existen)
INSERT INTO categories (name, slug, parent_id)
SELECT 'Celulares', 'celulares', id FROM categories WHERE name = 'Tecnología'
AND NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Celulares');

INSERT INTO categories (name, slug, parent_id)
SELECT 'Notebooks', 'notebooks', id FROM categories WHERE name = 'Tecnología'
AND NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Notebooks');

INSERT INTO categories (name, slug, parent_id)
SELECT 'Tablets', 'tablets', id FROM categories WHERE name = 'Tecnología'
AND NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Tablets');

INSERT INTO categories (name, slug, parent_id)
SELECT 'Televisores', 'televisores', id FROM categories WHERE name = 'Tecnología'
AND NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Televisores');

INSERT INTO categories (name, slug, parent_id)
SELECT 'Audífonos y Headsets', 'audifonos-y-headsets', id FROM categories WHERE name = 'Audio'
AND NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Audífonos y Headsets');

-- 4. Remapear productos importados de SoloTodo usando specs->>'picture'
--    El path de imagen contiene el nombre de categoría SoloTodo, ej:
--    "products/Celulares/Samsung/Galaxy S24/..."
--    "products/Notebooks/Apple/MacBook Pro/..."

UPDATE products
SET category_id = (SELECT id FROM categories WHERE name = 'Celulares')
WHERE solotodo_id IS NOT NULL
  AND (
    specs->>'picture' ILIKE '%/Celulares/%'
    OR specs->>'picture' ILIKE '%/Smartphones/%'
  );

UPDATE products
SET category_id = (SELECT id FROM categories WHERE name = 'Notebooks')
WHERE solotodo_id IS NOT NULL
  AND specs->>'picture' ILIKE '%/Notebooks/%';

UPDATE products
SET category_id = (SELECT id FROM categories WHERE name = 'Tablets')
WHERE solotodo_id IS NOT NULL
  AND specs->>'picture' ILIKE '%/Tablets/%';

UPDATE products
SET category_id = (SELECT id FROM categories WHERE name = 'Televisores')
WHERE solotodo_id IS NOT NULL
  AND (
    specs->>'picture' ILIKE '%/Televisores/%'
    OR specs->>'picture' ILIKE '%/Televisions/%'
  );

UPDATE products
SET category_id = (SELECT id FROM categories WHERE name = 'Audífonos y Headsets')
WHERE solotodo_id IS NOT NULL
  AND (
    specs->>'picture' ILIKE '%/Audifonos%'
    OR specs->>'picture' ILIKE '%/Headsets/%'
    OR specs->>'picture' ILIKE '%/Audifonos_y_Headsets/%'
  );

-- 5. Verificación: distribución de productos por categoría
SELECT c.name AS categoria, COUNT(p.id) AS productos
FROM products p
JOIN categories c ON c.id = p.category_id
GROUP BY c.name
ORDER BY productos DESC;
