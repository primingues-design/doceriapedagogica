-- =============================================
-- MIGRAÇÃO: tabela atividades_salvas
-- Execute no SQL Editor do Supabase
-- =============================================

CREATE TABLE IF NOT EXISTS public.atividades_salvas (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tipo          TEXT NOT NULL DEFAULT '',       -- ex: 'apostila', 'plano', 'slides', 'mapa', 'alfabetizacao'
  tema          TEXT NOT NULL DEFAULT '',
  nivel         TEXT NOT NULL DEFAULT '',
  titulo        TEXT NOT NULL DEFAULT '',
  conteudo_html TEXT NOT NULL DEFAULT '',       -- HTML auto-suficiente para reimprimir
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para listar por usuário ordenado por data
CREATE INDEX IF NOT EXISTS atividades_salvas_user_created
  ON public.atividades_salvas (user_id, created_at DESC);

-- Row Level Security
ALTER TABLE public.atividades_salvas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuária vê próprias atividades"
  ON public.atividades_salvas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuária insere próprias atividades"
  ON public.atividades_salvas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuária exclui próprias atividades"
  ON public.atividades_salvas FOR DELETE
  USING (auth.uid() = user_id);
