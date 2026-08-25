-- ============================================================
-- EducaFito — Schema Inicial Corrigido
-- Execute no SQL Editor do Supabase
-- ============================================================

create extension if not exists "uuid-ossp";

-- Função trigger para atualizar updated_at automaticamente
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 1. Profiles (extensão de auth.users)
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  name          text,
  avatar_url    text,
  role          text not null default 'user' check (role in ('user', 'admin')),
  notif_push    boolean not null default true,
  notif_email   boolean not null default false,
  text_size     text not null default 'md',
  high_contrast boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Trigger de updated_at para profiles
drop trigger if exists set_updated_at_profiles on public.profiles;
create trigger set_updated_at_profiles
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

-- Função e trigger para criar profile automaticamente no signup do Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, avatar_url, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    new.raw_user_meta_data ->> 'avatar_url',
    'user'
  )
  on conflict (id) do update
  set
    name = coalesce(excluded.name, public.profiles.name),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url);
  return new;
exception
  when others then
    return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Tópicos de Educação
create table if not exists public.topics (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  description   text,
  level         text not null check (level in ('Básico', 'Intermediário', 'Avançado')),
  category      text not null,
  icon          text,
  color         text,
  duration      text,
  lessons_count integer not null default 0,
  order_index   integer not null default 0,
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists set_updated_at_topics on public.topics;
create trigger set_updated_at_topics
  before update on public.topics
  for each row execute procedure public.update_updated_at_column();

-- 3. Aulas dos Tópicos
create table if not exists public.lessons (
  id          uuid primary key default gen_random_uuid(),
  topic_id    uuid not null references public.topics(id) on delete cascade,
  title       text not null,
  duration    text,
  content     text,
  order_index integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists set_updated_at_lessons on public.lessons;
create trigger set_updated_at_lessons
  before update on public.lessons
  for each row execute procedure public.update_updated_at_column();

-- 4. Progresso do Usuário
create table if not exists public.user_progress (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  topic_id          uuid not null references public.topics(id) on delete cascade,
  completed_lessons integer not null default 0,
  progress_pct      integer not null default 0 check (progress_pct between 0 and 100),
  updated_at        timestamptz not null default now(),
  unique (user_id, topic_id)
);

-- 5. Perguntas do Quiz
create table if not exists public.quiz_questions (
  id          uuid primary key default gen_random_uuid(),
  category    text not null,
  question    text not null,
  explanation text,
  difficulty  text not null default 'medio' check (difficulty in ('facil', 'medio', 'dificil')),
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists set_updated_at_quiz_questions on public.quiz_questions;
create trigger set_updated_at_quiz_questions
  before update on public.quiz_questions
  for each row execute procedure public.update_updated_at_column();

-- 6. Alternativas do Quiz
create table if not exists public.quiz_options (
  id          uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  text        text not null,
  is_correct  boolean not null default false,
  order_index integer not null default 0
);

-- 7. Histórico de Sessões do Quiz
create table if not exists public.quiz_sessions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  category        text not null,
  score           integer not null default 0,
  total_questions integer not null default 0,
  correct_answers integer not null default 0,
  completed_at    timestamptz not null default now()
);

-- 8. Publicações de Mídia
create table if not exists public.publicacoes (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  source      text not null,
  date        text not null,
  title       text not null,
  description text,
  image       text,
  href        text,
  category    text,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists set_updated_at_publicacoes on public.publicacoes;
create trigger set_updated_at_publicacoes
  before update on public.publicacoes
  for each row execute procedure public.update_updated_at_column();

-- 9. Vídeos de Mídia
create table if not exists public.videos (
  id          uuid primary key default gen_random_uuid(),
  href        text not null,
  title       text,
  description text,
  order_index integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Habilitar Row Level Security (RLS)
alter table public.profiles        enable row level security;
alter table public.topics          enable row level security;
alter table public.lessons         enable row level security;
alter table public.user_progress   enable row level security;
alter table public.quiz_questions  enable row level security;
alter table public.quiz_options    enable row level security;
alter table public.quiz_sessions   enable row level security;
alter table public.publicacoes     enable row level security;
alter table public.videos          enable row level security;

-- Função auxiliar para verificar permissão de admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Políticas RLS: Profiles
drop policy if exists "profiles_own_select" on public.profiles;
drop policy if exists "profiles_own_insert" on public.profiles;
drop policy if exists "profiles_own_update" on public.profiles;
drop policy if exists "profiles_own_delete" on public.profiles;

create policy "profiles_own_select" on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "profiles_own_insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_own_update" on public.profiles for update using (auth.uid() = id);
create policy "profiles_own_delete" on public.profiles for delete using (auth.uid() = id);

-- Políticas RLS: Topics
drop policy if exists "topics_public_read" on public.topics;
drop policy if exists "topics_admin_insert" on public.topics;
drop policy if exists "topics_admin_update" on public.topics;
drop policy if exists "topics_admin_delete" on public.topics;

create policy "topics_public_read" on public.topics for select using (published = true or public.is_admin());
create policy "topics_admin_insert" on public.topics for insert with check (public.is_admin());
create policy "topics_admin_update" on public.topics for update using (public.is_admin());
create policy "topics_admin_delete" on public.topics for delete using (public.is_admin());

-- Políticas RLS: Lessons
drop policy if exists "lessons_public_read" on public.lessons;
drop policy if exists "lessons_admin_insert" on public.lessons;
drop policy if exists "lessons_admin_update" on public.lessons;
drop policy if exists "lessons_admin_delete" on public.lessons;

create policy "lessons_public_read" on public.lessons for select using (published = true or public.is_admin());
create policy "lessons_admin_insert" on public.lessons for insert with check (public.is_admin());
create policy "lessons_admin_update" on public.lessons for update using (public.is_admin());
create policy "lessons_admin_delete" on public.lessons for delete using (public.is_admin());

-- Políticas RLS: User Progress
drop policy if exists "progress_own_all" on public.user_progress;
drop policy if exists "progress_admin_read" on public.user_progress;

create policy "progress_own_all" on public.user_progress for all using (auth.uid() = user_id);
create policy "progress_admin_read" on public.user_progress for select using (public.is_admin());

-- Políticas RLS: Quiz Questions
drop policy if exists "quiz_q_public_read" on public.quiz_questions;
drop policy if exists "quiz_q_admin_insert" on public.quiz_questions;
drop policy if exists "quiz_q_admin_update" on public.quiz_questions;
drop policy if exists "quiz_q_admin_delete" on public.quiz_questions;

create policy "quiz_q_public_read" on public.quiz_questions for select using (published = true or public.is_admin());
create policy "quiz_q_admin_insert" on public.quiz_questions for insert with check (public.is_admin());
create policy "quiz_q_admin_update" on public.quiz_questions for update using (public.is_admin());
create policy "quiz_q_admin_delete" on public.quiz_questions for delete using (public.is_admin());

-- Políticas RLS: Quiz Options
drop policy if exists "quiz_o_public_read" on public.quiz_options;
drop policy if exists "quiz_o_admin_insert" on public.quiz_options;
drop policy if exists "quiz_o_admin_update" on public.quiz_options;
drop policy if exists "quiz_o_admin_delete" on public.quiz_options;

create policy "quiz_o_public_read" on public.quiz_options for select using (true);
create policy "quiz_o_admin_insert" on public.quiz_options for insert with check (public.is_admin());
create policy "quiz_o_admin_update" on public.quiz_options for update using (public.is_admin());
create policy "quiz_o_admin_delete" on public.quiz_options for delete using (public.is_admin());

-- Políticas RLS: Quiz Sessions
drop policy if exists "quiz_s_own_select" on public.quiz_sessions;
drop policy if exists "quiz_s_own_insert" on public.quiz_sessions;

create policy "quiz_s_own_select" on public.quiz_sessions for select using (auth.uid() = user_id or public.is_admin());
create policy "quiz_s_own_insert" on public.quiz_sessions for insert with check (auth.uid() = user_id);

-- Políticas RLS: Publicações
drop policy if exists "pub_public_read" on public.publicacoes;
drop policy if exists "pub_admin_insert" on public.publicacoes;
drop policy if exists "pub_admin_update" on public.publicacoes;
drop policy if exists "pub_admin_delete" on public.publicacoes;

create policy "pub_public_read" on public.publicacoes for select using (published = true or public.is_admin());
create policy "pub_admin_insert" on public.publicacoes for insert with check (public.is_admin());
create policy "pub_admin_update" on public.publicacoes for update using (public.is_admin());
create policy "pub_admin_delete" on public.publicacoes for delete using (public.is_admin());

-- Políticas RLS: Vídeos
drop policy if exists "vid_public_read" on public.videos;
drop policy if exists "vid_admin_insert" on public.videos;
drop policy if exists "vid_admin_update" on public.videos;
drop policy if exists "vid_admin_delete" on public.videos;

create policy "vid_public_read" on public.videos for select using (published = true or public.is_admin());
create policy "vid_admin_insert" on public.videos for insert with check (public.is_admin());
create policy "vid_admin_update" on public.videos for update using (public.is_admin());
create policy "vid_admin_delete" on public.videos for delete using (public.is_admin());
