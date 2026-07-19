
/** Variantes de callout/alerta disponíveis no design system */
export type CalloutVariant = 'green' | 'yellow' | 'red'

/** Variante de acento do LiftTheFlap */
export type FlapAccent = 'green' | 'yellow' | 'red' | 'teal'

/** Um item de callout (caixa de destaque informativo) */
export interface CalloutData {
  variant: CalloutVariant
  icon: string
  title: string
  text: string
}

/** Uma aba do componente LiftTheFlap (Lapbook Interativo) */
export interface FlapData {
  id: string
  frontEmoji: string
  frontText: string
  backContent: string
  backAccent?: FlapAccent
}

/** Um card do grid de ícones (icon-card) */
export interface IconCardData {
  emoji: string
  label: string
}

/** Uma tag de categoria (cover-tags, etc.) */
export interface TagData {
  label: string
}

/* ══════════════════════════════════════════════════════
   TIPOS DE PÁGINA — cada "type" mapeia para um layout
══════════════════════════════════════════════════════ */

/**
 * CAPA — Página 0
 * Layout: ilustração split planta-saudável/doente + título + tags
 */
export interface PageCoverData {
  type: 'cover'
  id: string
  label: string
  title: string        // título principal (pode ter linha de destaque)
  highlight: string    // palavra(s) destacadas em gradiente amarelo
  subtitle: string     // parágrafo abaixo do título
  tags: TagData[]
}

/**
 * CONTEÚDO PADRÃO — Páginas de texto com ícone-grid e callouts
 * Usado em: Apresentação (p01), O que é Fitossanidade? (p02)
 */
export interface PageContentData {
  type: 'content'
  id: string
  label: string
  badgeLabel: string   // ex: "📖 Apresentação"
  title: string        // sem highlight — texto puro
  titleHighlight?: string  // parte da frase em laranja
  /** Callout exibido ANTES do leadText (ex: "Olá, futuro cientista!") */
  topCallout?: CalloutData
  /** Sufixo após o titleHighlight, ex: " da Fitossanidade?" */
  titleSuffix?: string
  leadText: string
  iconCards?: IconCardData[]
  callouts?: CalloutData[]
  /** Texto adicional entre callouts, útil para "Por que é importante?" */
  midSectionHeading?: string
  midSectionText?: string
}

/**
 * LAPBOOK — Página com LiftTheFlap interativo
 * Usado em: Tipos de Pragas (p03), Como Evitar? (p07)
 */
export interface PageLapbookData {
  type: 'lapbook'
  id: string
  label: string
  badgeLabel: string
  lapbookBadge: string  // badge dentro do header verde escuro
  lapbookTitle: string
  lapbookSubtitle: string
  flaps: FlapData[]
  columns?: 2 | 3
  callouts?: CalloutData[]
}

/**
 * IMPACTO — Página com cards de estatísticas
 * Usado em: Como Pragas Afetam a Agricultura? (p04)
 */
export interface PageImpactData {
  type: 'impact'
  id: string
  label: string
  badgeLabel: string
  title: string
  titleHighlight?: string
  leadText: string
  statCards: {
    gradient: string
    icon: string
    stat: string
    label: string
    textColor: string
  }[]
  impacts: {
    icon: string
    title: string
    desc: string
  }[]
}

/**
 * ALERTA — Página com alert box (pragas quarentenárias, etc.)
 * Usado em: Pragas Quarentenárias (p05)
 */
export interface PageAlertData {
  type: 'alert'
  id: string
  label: string
  badgeLabel: string
  title: string
  titleHighlight?: string
  leadText: string
  alertIcon: string
  alertTitle: string
  alertText: string
  callouts?: CalloutData[]
  pragaCards?: {
    bg: string
    emoji: string
    title: string
    desc: string
  }[]
}

/**
 * LISTA DE ÓRGÃOS / ATORES — Quem cuida?
 * Usado em: Quem Cuida da Fitossanidade? (p06)
 */
export interface PageOrgaosData {
  type: 'orgaos'
  id: string
  label: string
  badgeLabel: string
  title: string
  titleHighlight?: string
  /** Sufixo após o highlight, ex: " da Fitossanidade?" */
  titleSuffix?: string
  leadText: string
  items: {
    icon: string
    name: string
    desc: string
  }[]
}

/**
 * CASO REAL — Fichas técnicas de pragas do Amapá
 * Usado em: Vassoura-de-bruxa (p08), Açaí em Risco (p09), Mosca da Fruta (p10)
 */
export interface PageCaseData {
  type: 'case'
  id: string
  label: string
  heroVariant: 'green' | 'amber' | 'teal'
  heroEmoji: string
  heroTitle: string
  heroSubtitle: string
  details: {
    icon: string
    label: string
    value: string
  }[]
  callouts: CalloutData[]
}

/**
 * IMPACTO CADEIA — "Sem Fitossanidade = menos comida na mesa"
 * Usado em: Impacto na Sua Vida (p11)
 */
export interface PageChainData {
  type: 'chain'
  id: string
  label: string
  badgeLabel: string
  heroTitle: string
  heroHighlight: string  // palavra em amarelo
  heroSubtitle: string
  sectionHeading: string
  leadText: string
  chainItems: { icon: string; text: string }[]
  callouts?: CalloutData[]
}

/**
 * QUIZ — Auto-contido (p12)
 * Os dados do Quiz estão em Quiz.tsx pois são parte da lógica do componente.
 * Este tipo serve apenas para registro no array de páginas.
 */
export interface PageQuizData {
  type: 'quiz'
  id: string
  label: string
  badgeLabel: string
}

/**
 * ENCERRAMENTO (p13)
 */
export interface PageClosingData {
  type: 'closing'
  id: string
  label: string
  heroEmoji: string
  heroTitle: string
  heroSubtitle: string
  pillars: { icon: string; label: string; sub: string }[]
  ctaText: string
  ctaSub: string
  callout: CalloutData
  footerText: string
}

/** Union type de todos os tipos de página */
export type CartilhaPageData =
  | PageCoverData
  | PageContentData
  | PageLapbookData
  | PageImpactData
  | PageAlertData
  | PageOrgaosData
  | PageCaseData
  | PageChainData
  | PageQuizData
  | PageClosingData

/* ══════════════════════════════════════════════════════
   DADOS — 3 PRIMEIRAS PÁGINAS (MOCK COMPLETO)
   Páginas p04–p13 serão adicionadas na próxima iteração.
══════════════════════════════════════════════════════ */

export const CARTILHA_PAGES: CartilhaPageData[] = [

  /* ─────────────────────────────────────────────────
     PÁGINA 0 — CAPA
  ───────────────────────────────────────────────── */
  {
    type: 'cover',
    id: 'cover',
    label: 'Capa',
    title: 'Educação\nFitossanitária\npara o Ensino Básico',
    highlight: 'Fitossanitária',
    subtitle:
      'Aprenda de forma fácil e divertida como proteger as plantas, garantir nossa alimentação e preservar a natureza.',
    tags: [
      { label: '🌱 Fitossanidade' },
      { label: '🔬 Ciência' },
      { label: '🌾 Agricultura' },
      { label: '🐛 Pragas' },
      { label: '📍 Amapá' },
    ],
  },

  /* ─────────────────────────────────────────────────
     PÁGINA 1 — APRESENTAÇÃO
  ───────────────────────────────────────────────── */
  {
    type: 'content',
    id: 'p01',
    label: 'Apresentação',
    badgeLabel: '📖 Apresentação',
    title: 'Você sabia que ',
    titleHighlight: 'plantas também ficam doentes?',
    leadText:
      'Nesta cartilha, você vai descobrir o mundo fascinante da Fitossanidade — a ciência que cuida da saúde das plantas. Vamos explorar juntos:',
    iconCards: [
      { emoji: '🦠', label: 'O que são pragas e doenças' },
      { emoji: '🌾', label: 'Como afetam a agricultura' },
      { emoji: '🛡️', label: 'Como nos protegemos delas' },
      { emoji: '📍', label: 'Casos reais do Amapá' },
    ],
    topCallout: {
      variant: 'green' as const,
      icon: '🌿',
      title: 'Olá, futuro(a) cientista!',
      text: 'Assim como nós, humanos, podemos ficar gripados ou com febre, as plantas também podem ser atacadas por "vilões" que as deixam fracas, feias e improdutivas. Esses vilões se chamam pragas e doenças.',
    },
    callouts: [
      {
        variant: 'yellow' as const,
        icon: '💡',
        title: 'Linguagem fácil para todos!',
        text: 'Esta cartilha foi criada especialmente para estudantes como você. Não precisamos ser cientistas para entender e ajudar a proteger as plantas da nossa região!',
      },
    ],
  },

  /* ─────────────────────────────────────────────────
     PÁGINA 2 — O QUE É FITOSSANIDADE?
  ───────────────────────────────────────────────── */
  {
    type: 'content',
    id: 'p02',
    label: 'O que é Fitossanidade?',
    badgeLabel: '🔬 Conceito Base',
    title: 'O que é ',
    titleHighlight: 'Fitossanidade?',
    leadText:
      'A palavra Fitossanidade vem do grego phytón (planta) e do latim sanitas (saúde). É a área da ciência que cuida da saúde das plantas e garante que elas cresçam fortes e produtivas.',
    iconCards: [
      { emoji: '🔭', label: 'Estuda pragas e doenças das plantas' },
      { emoji: '🛡️', label: 'Previne e controla infestações' },
      { emoji: '🌐', label: 'Protege fronteiras e rotas de comércio' },
      { emoji: '🤝', label: 'Une ciência e agricultura' },
      { emoji: '🍽️', label: 'Garante alimentos saudáveis na mesa' },
      { emoji: '🌍', label: 'Preserva a biodiversidade' },
    ],
    midSectionHeading: 'Por que é importante?',
    midSectionText:
      'Sem Fitossanidade, pragas e doenças se espalhariam livremente pelas lavouras, destruindo colheitas inteiras. Isso significaria menos comida, aumento de preços e danos ao meio ambiente.',
    callouts: [
      {
        variant: 'green',
        icon: '🌱',
        title: 'Curiosidade!',
        text: 'O Brasil é um dos maiores exportadores agrícolas do mundo. Por isso, cuidar da saúde das plantas é também cuidar da economia de milhões de famílias brasileiras!',
      },
    ],
  },

  /* ─────────────────────────────────────────────────
     PÁGINAS p03–p13 — STUBS (a preencher)
     Mantemos o array completo para que o PageController
     já exiba o total correto de 14 páginas.
  ───────────────────────────────────────────────── */
  {
    type: 'lapbook',
    id: 'p03',
    label: 'Pragas Agrícolas',
    badgeLabel: '🎴 Lapbook Interativo',
    lapbookBadge: '🐛 Conheça as Pragas',
    lapbookTitle: 'Quais são os Tipos de Pragas Agrícolas?',
    lapbookSubtitle: 'Levante cada aba e descubra o que são as principais ameaças às nossas plantações!',
    flaps: [
      { id: 'insetos',  frontEmoji: '🦟', frontText: 'O que são Insetos Praga?',                   backContent: 'Gafanhotos, brocas, pulgões e mosca-branca atacam folhas, caules e frutos, reduzindo drasticamente a produção agrícola.', backAccent: 'green' },
      { id: 'acaros',   frontEmoji: '🕷️', frontText: 'O que são Ácaros?',                          backContent: 'Minúsculos artrópodes que sugam a seiva das plantas, causando amarelamento, queda de folhas e até a morte da planta. Difíceis de ver a olho nu!', backAccent: 'yellow' },
      { id: 'microorg', frontEmoji: '🦠', frontText: 'O que são Microrganismos Fitopatogênicos?',   backContent: 'Fungos, bactérias e vírus que causam podridões, manchas, murchas e morte das plantas. São invisíveis — mas causam estragos enormes nas lavouras.', backAccent: 'red' },
      { id: 'invasoras',frontEmoji: '🌿', frontText: 'O que são Plantas Invasoras?',               backContent: 'Ervas daninhas que competem com as culturas por água, luz e nutrientes do solo — "roubando" os recursos que a planta cultivada precisa para crescer.', backAccent: 'teal' },
      { id: 'quarent',  frontEmoji: '🚨', frontText: 'O que é uma Praga Quarentenária?',           backContent: 'Praga de altíssimo risco econômico, ausente ou com distribuição restrita no país. Sujeita a controle oficial rigoroso pelo MAPA para evitar sua entrada.', backAccent: 'red' },
      { id: 'vassoura', frontEmoji: '🌾', frontText: 'O que é a Vassoura-de-bruxa?',               backContent: 'Fungo (Moniliophthora perniciosa) que deforma os brotos da mandioca. Pode reduzir até 90% da produção em áreas infestadas no Amapá e Região Norte.', backAccent: 'yellow' },
    ],
    callouts: [
      { variant: 'yellow', icon: '⚠️', title: 'Atenção!', text: 'Nem todo inseto é uma praga! Abelhas, joaninhas e vespinhas parasitoides são aliadas da lavoura. Conhecer os "heróis" e os "vilões" do campo é essencial!' },
    ],
  },

  {
    type: 'impact',
    id: 'p04',
    label: 'Impacto na Agricultura',
    badgeLabel: '📉 Impacto',
    title: 'Como Pragas Afetam a ',
    titleHighlight: 'Agricultura?',
    leadText: 'O impacto das pragas vai muito além de plantas doentes — ele chega à nossa mesa, à nossa economia e ao meio ambiente:',
    statCards: [
      { gradient: 'linear-gradient(135deg, #2E7D32, #388E3C)', icon: '🌾', stat: '40%',        label: 'das colheitas mundiais são perdidas por pragas, segundo a FAO.',      textColor: 'white'   },
      { gradient: 'linear-gradient(135deg, #F57F17, #FBC02D)', icon: '💰', stat: 'R$ bi',      label: 'de prejuízo anual para o agronegócio brasileiro.',                    textColor: '#212121' },
      { gradient: 'linear-gradient(135deg, #37474F, #546E7A)', icon: '🌍', stat: 'Ecossistema',label: 'em risco por introdução de espécies invasoras.',                       textColor: 'white'   },
    ],
    impacts: [
      { icon: '📦', title: 'Redução da produção',       desc: 'Pragas destroem partes ou toda a plantação, reduzindo drasticamente o volume colhido.' },
      { icon: '💸', title: 'Aumento de custos',          desc: 'Agricultores gastam mais com agrotóxicos, replantio e trabalho para combater as pragas.' },
      { icon: '🚫', title: 'Bloqueio de exportações',   desc: 'Produtos com pragas podem ser barrados na alfândega, gerando prejuízos aos produtores.' },
      { icon: '🌡️', title: 'Mudanças climáticas agravam', desc: 'O aquecimento global favorece a proliferação e expansão geográfica de pragas.' },
    ],
  },

  {
    type: 'alert',
    id: 'p05',
    label: 'Pragas Quarentenárias',
    badgeLabel: '🚨 Alerta Especial',
    title: 'O que são ',
    titleHighlight: 'Pragas Quarentenárias?',
    leadText: 'Imagine uma praga tão perigosa que poderia destruir toda a agricultura de um país se entrasse em suas fronteiras. É isso que define uma Praga Quarentenária:',
    alertIcon: '🚨',
    alertTitle: 'Definição Oficial (MAPA)',
    alertText: 'Praga quarentenária é aquela de importância econômica potencial para o país ameaçado, ainda não presente no território ou presente em área limitada, e sujeita ao controle oficial.',
    callouts: [
      { variant: 'yellow', icon: '🔍', title: 'Por que o nome "Quarentenária"?', text: 'O termo vem de "quarentena" — o período de isolamento usado para evitar a propagação de doenças. Assim como fazemos quarentena para proteger as pessoas, fazemos quarentena fitossanitária para proteger as plantas!' },
    ],
    pragaCards: [
      { bg: 'linear-gradient(135deg,#B71C1C,#C62828)', emoji: '🦟', title: 'Mosca-da-carambola', desc: 'Detectada no Amapá, ameaça frutas em todo o território nacional.' },
      { bg: 'linear-gradient(135deg,#4A148C,#6A1B9A)', emoji: '🦠', title: 'Huanglongbing (HLB)', desc: 'Doença bacteriana devastadora para citros, presente em alguns estados.' },
      { bg: 'linear-gradient(135deg,#E65100,#BF360C)', emoji: '🐝', title: 'Vespa Velutina', desc: 'Predadora de abelhas nativas, risco à polinização e à apicultura.' },
    ],
  },

  {
    type: 'orgaos',
    id: 'p06',
    label: 'Quem Cuida?',
    badgeLabel: '🏛️ Guardiões',
    title: 'Quem ',
    titleHighlight: 'Cuida',
    titleSuffix: ' da Fitossanidade?',
    leadText: 'Proteger as plantas de pragas é um trabalho coletivo! Vários profissionais e órgãos trabalham juntos para garantir a saúde das nossas lavouras:',
    items: [
      { icon: '🏢', name: 'MAPA — Ministério da Agricultura', desc: 'Define as normas fitossanitárias e fiscaliza o comércio de plantas e sementes no Brasil.' },
      { icon: '🌍', name: 'VIGIAGRO', desc: 'Sistema de Vigilância Agropecuária que monitora portos, aeroportos e fronteiras terrestres.' },
      { icon: '🔬', name: 'Embrapa', desc: 'Pesquisa soluções tecnológicas para o controle de pragas e o desenvolvimento agrícola sustentável.' },
      { icon: '🏫', name: 'Universidades e Institutos', desc: 'Formam pesquisadores e engenheiros agrônomos, produzindo conhecimento científico aplicado.' },
      { icon: '👨‍🌾', name: 'Extensionistas Rurais', desc: 'Levam conhecimento técnico diretamente ao produtor rural, orientando boas práticas no campo.' },
      { icon: '🤝', name: 'Você também pode ajudar!', desc: 'Denunciar pragas desconhecidas, não transportar plantas sem verificar origem e aprender sobre o tema são formas de contribuir.' },
    ],
  },

  {
    type: 'lapbook',
    id: 'p07',
    label: 'Como Evitar?',
    badgeLabel: '🎴 Lapbook Interativo',
    lapbookBadge: '✅ Como Proteger?',
    lapbookTitle: 'Como Evitar e Controlar Pragas Agrícolas?',
    lapbookSubtitle: 'Levante cada aba e descubra as ferramentas que protegem nossas lavouras!',
    flaps: [
      { id: 'sementes',  frontEmoji: '🌱', frontText: 'O que são Sementes Certificadas?', backContent: 'Sementes inspecionadas e aprovadas pelo MAPA, garantindo que estão livres de pragas, doenças e com alta capacidade de germinação. São a base de uma lavoura saudável!', backAccent: 'green' },
      { id: 'rotacao',   frontEmoji: '🔄', frontText: 'O que é Rotação de Culturas?',     backContent: 'Alternar diferentes espécies de plantas numa mesma área entre as safras. Isso quebra o ciclo de reprodução das pragas e melhora a saúde do solo.', backAccent: 'teal' },
      { id: 'biologico', frontEmoji: '🐝', frontText: 'O que é Controle Biológico?',      backContent: 'Usar inimigos naturais das pragas — como joaninhas, vespinhas parasitoides e fungos entomopatogênicos — para controlá-las de forma sustentável, sem agrotóxicos.', backAccent: 'green' },
      { id: 'mip',       frontEmoji: '🔬', frontText: 'O que é o MIP?',                   backContent: 'Manejo Integrado de Pragas: combina métodos biológicos, culturais e químicos de forma equilibrada, usando o mínimo de agrotóxico possível. É a abordagem mais moderna e sustentável.', backAccent: 'yellow' },
      { id: 'vigiagro',  frontEmoji: '🛡️', frontText: 'O que é o VIGIAGRO?',              backContent: 'Sistema de Vigilância Agropecuária Internacional do MAPA que fiscaliza portos, aeroportos e fronteiras terrestres do Brasil para impedir a entrada de pragas exóticas.', backAccent: 'teal' },
      { id: 'voce',      frontEmoji: '🤝', frontText: 'Como VOCÊ pode ajudar?',           backContent: 'Não transporte plantas, frutas ou terra sem verificar a origem. Compre produtos com selos de qualidade. Denuncie pragas desconhecidas ao MAPA. Cada atitude conta!', backAccent: 'yellow' },
    ],
    callouts: [
      { variant: 'green', icon: '🌍', title: 'A prevenção sempre vence o combate!', text: 'Investir em boas práticas fitossanitárias custa muito menos do que tratar uma lavoura infestada. Agricultor informado é agricultor protegido.' },
    ],
  },

  {
    type: 'case',
    id: 'p08',
    label: 'Vassoura-de-bruxa',
    heroVariant: 'green',
    heroEmoji: '🌿',
    heroTitle: 'Vassoura-de-bruxa na Mandioca',
    heroSubtitle: 'Um fungo que ameaça a raiz mais consumida na Região Norte',
    details: [
      { icon: '🦠', label: 'Agente causador', value: 'Fungo Moniliophthora perniciosa (e outros patógenos)' },
      { icon: '🌾', label: 'Cultura afetada', value: 'Mandioca (Manihot esculenta) — base alimentar da Região Norte' },
      { icon: '🔍', label: 'Sintomas', value: 'Brotamentos anormais em forma de "vassoura", engrossamento de ramos, aborto de frutos e queda de folhas' },
      { icon: '📍', label: 'Ocorrência', value: 'Amazônia, Amapá, Pará, Maranhão e estados do Nordeste' },
      { icon: '💸', label: 'Impacto', value: 'Redução de até 90% na produtividade em áreas infestadas' },
    ],
    callouts: [
      { variant: 'yellow', icon: '💡', title: 'Controle recomendado', text: 'Uso de variedades resistentes desenvolvidas pela Embrapa, poda e destruição de partes infectadas, e monitoramento constante das roças. A farinha de mandioca é a base da alimentação no Amapá — protegê-la é proteger nossa cultura!' },
    ],
  },

  {
    type: 'case',
    id: 'p09',
    label: 'Açaí em Risco',
    heroVariant: 'amber',
    heroEmoji: '🫐',
    heroTitle: 'Açaí em Risco: Amarelecimento Letal',
    heroSubtitle: 'A doença que ameaça palmeiras em toda a Região Norte',
    details: [
      { icon: '🦠', label: 'Agente causador', value: 'Fitoplasma (Candidatus Phytoplasma sp.) transmitido por insetos vetores' },
      { icon: '🌴', label: 'Culturas afetadas', value: 'Palmeiras em geral — açaí, coco, dendê, babaçu' },
      { icon: '🔍', label: 'Sintomas', value: 'Amarelamento progressivo das folhas, aborto de frutos, apodrecimento do estipe e morte da palmeira' },
      { icon: '📍', label: 'Ocorrência', value: 'Detectado no Amapá, Pará e Maranhão; presente nas Américas e África' },
      { icon: '💸', label: 'Impacto', value: 'Devastador — o açaí é um dos principais produtos de exportação do Amapá' },
    ],
    callouts: [
      { variant: 'red',   icon: '🚨', title: 'Sem cura conhecida!', text: 'Até o momento não existe cura para palmeiras infectadas. O controle é feito pelo manejo dos insetos vetores e pela remoção e destruição das palmeiras doentes para evitar a propagação.' },
      { variant: 'green', icon: '🌴', title: 'Importância econômica', text: 'O açaí é símbolo cultural e econômico do Amapá. Sua produção gera renda para milhares de famílias ribeirinhas. Protegê-lo é essencial para a economia local e para a segurança alimentar da região.' },
    ],
  },

  {
    type: 'case',
    id: 'p10',
    label: 'Mosca da Fruta',
    heroVariant: 'teal',
    heroEmoji: '🦟',
    heroTitle: 'Mosca da Fruta e Seu Impacto Econômico',
    heroSubtitle: 'Um inimigo pequeno com grandes consequências',
    details: [
      { icon: '🦟', label: 'Espécie de destaque', value: 'Ceratitis capitata (mosca-do-mediterrâneo), Anastrepha spp. (espécies nativas)' },
      { icon: '🍎', label: 'Culturas afetadas', value: 'Manga, goiaba, laranja, maracujá, acerola e dezenas de outras frutas tropicais' },
      { icon: '🔍', label: 'Sintomas', value: 'Frutos caem prematuramente, apodrecem por dentro, presença de larvas brancas no interior' },
      { icon: '📍', label: 'Ocorrência', value: 'Todo o Brasil; no Amapá afeta principalmente fruticultura de subsistência e exportação' },
      { icon: '💸', label: 'Impacto econômico', value: 'Barreiras sanitárias em mercados internacionais impedem a exportação de frutas frescas' },
    ],
    callouts: [
      { variant: 'yellow', icon: '✈️', title: 'Barreira de Exportação', text: 'Países importadores exigem certificados fitossanitários comprovando que os frutos estão livres de moscas. Sem esses certificados, o Brasil perde milhões de dólares em exportações de frutas.' },
      { variant: 'green',  icon: '🧪', title: 'Controle Biológico — uma solução sustentável!', text: 'A Embrapa utiliza a Técnica do Inseto Estéril (TIE): machos de mosca são esterilizados por irradiação e liberados na natureza. Ao se cruzarem com fêmeas, não produzem descendentes, reduzindo a população sem agrotóxicos!' },
    ],
  },

  {
    type: 'chain',
    id: 'p11',
    label: 'Impacto na Sua Vida',
    badgeLabel: '💡 Conexão com a vida real',
    heroTitle: 'Sem Fitossanidade =\n',
    heroHighlight: 'menos comida',
    heroSubtitle: 'Entender a fitossanidade não é só para cientistas. É para qualquer pessoa que come, que compra e que se preocupa com o futuro do planeta.',
    sectionHeading: 'Como isso chega até você?',
    leadText: 'Veja a cadeia de impactos quando pragas não são controladas:',
    chainItems: [
      { icon: '🦟', text: 'Uma praga entra no país sem controle fitossanitário' },
      { icon: '🌾', text: 'Ela se espalha pelas lavouras de mandioca, açaí e frutas' },
      { icon: '📉', text: 'A produção cai drasticamente — os agricultores perdem renda' },
      { icon: '🛒', text: 'Os alimentos ficam escassos e mais caros nos mercados' },
      { icon: '🍽️', text: 'Famílias têm menos acesso a alimentos nutritivos e acessíveis' },
      { icon: '🌍', text: 'O meio ambiente sofre com desequilíbrio ecológico' },
    ],
    callouts: [
      { variant: 'yellow', icon: '🤔', title: 'Você pode fazer a diferença!', text: 'Não transporte plantas ou frutas de regiões desconhecidas. Compre produtos com selos de qualidade. Apoie agricultores locais. Essas atitudes simples ajudam a manter a fitossanidade da nossa região!' },
    ],
  },

  {
    type: 'quiz',
    id: 'p12',
    label: 'Quiz Final',
    badgeLabel: '🧠 Avaliação de Aprendizagem',
  },

  {
    type: 'closing',
    id: 'p13',
    label: 'Mensagem Final',
    heroEmoji: '🌿',
    heroTitle: 'Ciência, Sustentabilidade\ne Você!',
    heroSubtitle: 'Você chegou ao final desta jornada pelo mundo da Fitossanidade. Cada conhecimento adquirido aqui é uma semente plantada para um futuro mais sustentável e seguro para todos.',
    pillars: [
      { icon: '🔬', label: 'Ciência',          sub: 'Pesquisa que protege a vida' },
      { icon: '🌍', label: 'Sustentabilidade', sub: 'Usar sem destruir' },
      { icon: '🤝', label: 'Comunidade',       sub: 'Unidos pela natureza' },
      { icon: '🌱', label: 'Futuro',           sub: 'Sementes de esperança' },
    ],
    ctaText: '🌾 Fitossanidade é responsabilidade de todos!',
    ctaSub:  'Compartilhe o que aprendeu. Cada pessoa informada é um guardião das nossas plantas.',
    callout: {
      variant: 'green',
      icon: '📚',
      title: 'Continue sua jornada de aprendizagem!',
      text: 'Explore os outros módulos do EducaFito, converse com agricultores da sua região, visite a Embrapa Amapá e descubra como a ciência está trabalhando para proteger nossas lavouras e nossa biodiversidade amazônica.',
    },
    footerText: 'EducaFito — Aprendendo com a natureza, crescendo com o conhecimento.',
  },
]

/* ══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */

/** Total de páginas — use em CartilhaPage para o PageController */
export const TOTAL_PAGES = CARTILHA_PAGES.length

/** Retorna a página pelo índice, com tipo seguro */
export function getPage(index: number): CartilhaPageData {
  const page = CARTILHA_PAGES[index]
  if (!page) throw new RangeError(`Página ${index} não existe. Total: ${TOTAL_PAGES}`)
  return page
}
