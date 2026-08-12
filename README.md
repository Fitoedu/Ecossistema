# 🌿 EducaFito

Projeto front-end em Next.js para uma plataforma educativa voltada ao ensino de fitossanidade, plantas medicinais e práticas agrícolas.

## Stack atual

- Next.js 16
- React 19
- TypeScript
- Chakra UI v3
- next-themes
- lucide-react
- PWA metadata configurada no layout principal

## Estrutura atual do projeto

```text
app/
├── layout.tsx                 # layout global com provider do Chakra e metadados
├── page.tsx                   # splash screen inicial
├── theme.ts                   # tokens e tema visual do projeto
├── home/
│   ├── page.tsx               # página inicial/dashboard
│   ├── _data/features.ts      # cards de navegação da home
│   └── components/
├── cartilha/
│   ├── page.tsx               # cartilha interativa
│   ├── components/            # páginas e controles da cartilha
│   └── data/                  # conteúdo da cartilha
├── perfil/
│   └── page.tsx               # página de perfil/progresso
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   └── Sidebar.tsx
│   └── ui/
│       └── provider.tsx
└── public/
    └── assets/                # imagens e ativos visuais do projeto
```

## Funcionalidades já presentes

- Splash screen com transição inicial
- Home com destaque visual e navegação por cards
- Shell de aplicação com sidebar e estrutura de layout reutilizável
- Cartilha interativa com páginas, transições e controle de navegação
- Tema visual customizado com Chakra UI
- Estrutura preparada para expansão em conteúdo, mídia e gamificação

## Principais rotas

- `/` → splash screen
- `/home` → dashboard principal
- `/cartilha` → cartilha interativa
- `/perfil` → perfil/progresso

## Status de desenvolvimento

### Implementado
- [x] Inicialização do projeto Next.js
- [x] Configuração do tema visual
- [x] Splash screen
- [x] Home page
- [x] Cartilha interativa
- [x] Perfil inicial

### Em andamento / próximos passos
- [ ] Módulo de conteúdo educativo completo
- [ ] Mídia / notícias / vídeos
- [ ] Sistema de gamificação e ranking
- [ ] Persistência de progresso
- [ ] Melhorias de PWA offline

## Como executar localmente

```bash
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

# .env.local

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
```