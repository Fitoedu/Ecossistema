-- ============================================================
-- EducaFito — Schema de Logs e Auditoria
-- Execute no SQL Editor do Supabase
-- ============================================================

-- Tabela de logs da aplicação
create table if not exists app_logs (
  id          uuid primary key default gen_random_uuid(),
  level       text not null check (level in ('debug', 'info', 'warn', 'error')),
  module      text not null check (module in ('auth', 'educacao', 'quiz', 'midia', 'perfil', 'admin', 'system')),
  action      text not null,
  message     text not null,
  metadata    jsonb default '{}'::jsonb,
  user_id     uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- Índices para otimização de consultas e filtros
create index if not exists idx_app_logs_created_at on app_logs(created_at desc);
create index if not exists idx_app_logs_level on app_logs(level);
create index if not exists idx_app_logs_module on app_logs(module);
create index if not exists idx_app_logs_user_id on app_logs(user_id);
create index if not exists idx_app_logs_action on app_logs(action);

-- Habilitar Row Level Security (RLS)
alter table app_logs enable row level security;

-- Inserção: qualquer usuário autenticado ou anônimo pode registrar logs de eventos/erros
create policy "logs_insert_all" on app_logs
  for insert
  with check (true);

-- Leitura: somente administradores podem visualizar e auditar os logs
create policy "logs_admin_select" on app_logs
  for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Exclusão / Limpeza: somente administradores podem excluir logs
create policy "logs_admin_delete" on app_logs
  for delete
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
