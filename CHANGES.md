# CHANGELOG — EducaFito

## [1.2.0] — 2026-08-23

### Adicionado — Sistema de Logs e Auditoria

#### 🗄️ Banco de Dados
- `supabase/migrations/002_logs_schema.sql` — Schema da tabela `app_logs` com índices otimizados por timestamp, nível, módulo e usuário, além de políticas RLS seguras (inserção irrestrita para captura de eventos/erros; consulta e exclusão restritas a administradores).

#### 🛠️ Utilitário de Logging Isomórfico
- `lib/logger.ts` — Utilitário `logger` (`debug`, `info`, `warn`, `error`) com formatação colorida no console em desenvolvimento e envio assíncrono/não-bloqueante para a tabela `app_logs` no Supabase.

#### 🔧 Serviços e Hooks
- `lib/services/logsService.ts` — Funções de busca com filtros combinados (`level`, `module`, `search`, `startDate`, `endDate`), paginação, métricas estatísticas de 24h e limpeza de registros antigos.
- `hooks/useLogs.ts` — Hook React para consulta reativa, refetch manual e métricas no painel admin.

#### 🔐 Painel Admin de Auditoria
- `app/admin/logs/page.tsx` — Interface visual completa para administradores:
  - Cards de métricas (Total de eventos, Erros em 24h, Avisos em 24h, Módulo mais ativo).
  - Filtros rápidos por nível de severidade e módulo do sistema.
  - Campo de busca em tempo real por mensagem ou ação.
  - Tabela com badges coloridos e timestamps formatados.
  - Modal para inspeção do JSON de `metadata` e stack traces de exceções.
  - Exportação de relatórios em JSON e limpeza programada de logs antigos.
- `app/admin/page.tsx` — Card "Logs & Auditoria" integrado ao grid principal do painel administrativo.

#### 🔗 Integração nos Módulos
- Registro de auditoria em operações de criação, edição e exclusão de tópicos (`topicsService`), perguntas de quiz e partidas (`quizService`), publicações e vídeos (`publicacoesService`, `videosService`), perfil e conta (`profileService`), bem como tentativas de login e novos cadastros (`login/page.tsx`, `registro/page.tsx`).

---

## [1.1.0] — 2026-08-23

### Adicionado

#### 🗄️ Banco de Dados
- `supabase/migrations/001_initial_schema.sql` — Schema completo do Supabase com 9 tabelas, políticas RLS e triggers

**Tabelas criadas:**

| Tabela | Descrição |
|---|---|
| `profiles` | Estende `auth.users` com nome, avatar, role (`user`/`admin`) e preferências |
| `topics` | Módulos educativos (slug, título, nível, categoria, ícone, cor, duração) |
| `lessons` | Aulas vinculadas a cada tópico |
| `user_progress` | Progresso do aluno por tópico (upsert por `user_id + topic_id`) |
| `quiz_questions` | Perguntas do quiz com categoria e dificuldade |
| `quiz_options` | Alternativas de cada pergunta (com flag `is_correct`) |
| `quiz_sessions` | Histórico de partidas de quiz do usuário |
| `publicacoes` | Notícias e artigos da seção de mídia |
| `videos` | Vídeos embed da seção de mídia |

**Funcionalidades do schema:**
- RLS habilitado em todas as tabelas
- Leitura pública para conteúdo publicado; escrita restrita ao dono do dado ou admin
- Trigger `handle_new_user` — cria `profile` automaticamente no signup
- Trigger `update_updated_at_column` — atualiza `updated_at` em cada UPDATE
- Função helper `is_admin()` usada nas policies RLS

---

#### 📐 Tipos TypeScript
- `lib/types/database.types.ts` — Tipos completos derivados do schema (Row, Insert, Update para cada tabela)
- `lib/types/index.ts` — Re-export centralizado

**Tipos de conveniência exportados:**
`Profile`, `Topic`, `Lesson`, `UserProgress`, `QuizQuestion`, `QuizOption`, `QuizSession`, `Publicacao`, `Video` — e seus variantes `Insert` / `Update`.

**Tipos estendidos:**
- `QuizQuestionWithOptions` — pergunta com `quiz_options[]` eager-loaded
- `TopicWithProgress` — tópico com `user_progress` do usuário

---

#### ⚙️ Clientes Supabase
- `lib/supabase/client.ts` — Atualizado (cliente browser, `createBrowserClient`)
- `lib/supabase/server.ts` — **Novo** — cliente server-side para Server Components e Route Handlers (`createServerClient` com cookie forwarding)

---

#### 🔧 Camada de Serviços (`lib/services/`)
Funções assíncronas puras que encapsulam todas as queries do Supabase. Lançam erro em caso de falha (sem swallow silencioso).

| Arquivo | Funções exportadas |
|---|---|
| `topicsService.ts` | `getTopics`, `getTopicBySlug`, `getAllTopicsAdmin`, `createTopic`, `updateTopic`, `deleteTopic` |
| `lessonsService.ts` | `getLessonsByTopic`, `getAllLessonsAdmin`, `createLesson`, `updateLesson`, `deleteLesson` |
| `progressService.ts` | `getUserProgress`, `getTopicProgress`, `upsertProgress` |
| `quizService.ts` | `getQuizQuestions`, `getAllQuestionsAdmin`, `createQuestion`, `updateQuestion`, `replaceOptions`, `deleteQuestion`, `saveQuizSession`, `getUserQuizHistory` |
| `publicacoesService.ts` | `getPublicacoes`, `getAllPublicacoesAdmin`, `createPublicacao`, `updatePublicacao`, `deletePublicacao` |
| `videosService.ts` | `getVideos`, `getAllVideosAdmin`, `createVideo`, `updateVideo`, `deleteVideo` |
| `profileService.ts` | `getProfile`, `upsertProfile`, `deleteAccount` |

---

#### 🪝 Hooks React (`hooks/`)
Hooks client-side que encapsulam estado, loading e error para cada serviço.

| Hook | Uso |
|---|---|
| `useTopics` | Lista tópicos publicados; `refetch` manual |
| `useProgress(userId)` | Progresso do usuário; `getProgressPct(topicId)`, `updateProgress(...)` |
| `useQuizQuestions(category)` | Perguntas de uma categoria do quiz |
| `useQuizHistory(userId)` | Histórico de sessões; `submitSession(...)` |
| `usePublicacoes` | Carrega publicações e vídeos em paralelo |
| `useProfile` | Perfil do usuário autenticado; `updateProfile(...)` |

---

#### 🔐 Painel Admin (`app/admin/`)
Rota protegida — redireciona para `/login` se não autenticado, e para `/home` se o `role` não for `admin`.

| Rota | Arquivo | Descrição |
|---|---|---|
| `/admin` | `app/admin/page.tsx` | Dashboard com cards de acesso rápido |
| `/admin/educacao` | `app/admin/educacao/page.tsx` | CRUD de tópicos educativos |
| `/admin/quiz` | `app/admin/quiz/page.tsx` | CRUD de perguntas e alternativas do quiz |
| `/admin/midia` | `app/admin/midia/page.tsx` | CRUD de publicações e vídeos (abas) |

**Funcionalidades do painel:**
- Listagem em tabela com paginação visual
- Modal de criação/edição com formulário completo
- Modal de confirmação de exclusão
- Toggle publicado/rascunho (Switch)
- Geração automática de slug a partir do título
- Gerenciamento dinâmico de alternativas no quiz (adicionar/remover)

---

#### 🔗 Rotas Conectadas ao Supabase
Todas as rotas da aplicação agora operam conectadas ao Supabase com fallback seguro:

1. **`app/layout.tsx`** — Envolve toda a árvore com `<AuthProvider>`, mantendo a sessão do usuário reativa e global.
2. **`app/login/page.tsx`** — Conectado a `supabase.auth.signInWithPassword`.
3. **`app/registro/page.tsx`** — Conectado a `supabase.auth.signUp`, criando automaticamente o perfil correspondente via trigger SQL.
4. **`app/educacao/page.tsx`** — Conectado a `useTopics` e `useProgress(userId)`, exibindo módulos dinâmicos e progresso individual em tempo real.
5. **`app/midia/page.tsx`** — Conectado a `usePublicacoes`, carregando publicações e vídeos diretamente do banco de dados com fallback local.
6. **`app/perfil/page.tsx`** e **`DeleteAccountModal.tsx`** — Conectado a `useProfile` e `supabase.auth.signOut` para gerenciamento e exclusão de conta.
7. **`app/jogos/quiz/page.tsx`** — Conectado a `useQuizHistory`, calculando estatísticas reais (pontuação total, acertos, partidas jogadas) e listando histórico recente.

---

### Como aplicar

#### 1. Executar a migration no Supabase

Acesse **Supabase Dashboard → SQL Editor** e execute o conteúdo de:

```
supabase/migrations/001_initial_schema.sql
```

#### 2. Promover um usuário a admin

```sql
UPDATE profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'seu@email.com'
);
```

#### 3. Acessar a aplicação e painel admin

```bash
npm run dev
```

- App Principal: `http://localhost:3000`
- Painel Admin: `http://localhost:3000/admin`

---

### Arquitetura de camadas

```
pages / components
       ↓
   hooks (useState + useEffect + AuthContext)
       ↓
  services (queries Supabase tipadas)
       ↓
   lib/supabase/client.ts
       ↓
     Supabase (PostgreSQL + RLS + Auth)
```
