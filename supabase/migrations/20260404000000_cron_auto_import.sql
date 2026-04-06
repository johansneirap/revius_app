-- ── pg_cron: llamada diaria a la Edge Function auto-import ───────────────────
--
-- ANTES DE EJECUTAR: reemplaza <SERVICE_ROLE_KEY> con el valor real.
-- Lo encuentras en: Dashboard → Settings → API → service_role
--
-- Las extensiones pg_cron y pg_net vienen habilitadas por defecto en Supabase.

-- Eliminar job anterior si existe (idempotente)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'auto-import-products') THEN
    PERFORM cron.unschedule('auto-import-products');
  END IF;
END $$;

-- Programar ejecución diaria a las 03:00 UTC (≈ medianoche hora Chile)
SELECT cron.schedule(
  'auto-import-products',
  '0 3 * * *',
  $$
  SELECT net.http_post(
    url     := 'https://qjmvotdnokypaexoqkai.supabase.co/functions/v1/auto-import',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer <SERVICE_ROLE_KEY>"}'::jsonb,
    body    := '{}'::jsonb
  );
  $$
);

-- Verificar que el job quedó registrado:
-- SELECT * FROM cron.job WHERE jobname = 'auto-import-products';
