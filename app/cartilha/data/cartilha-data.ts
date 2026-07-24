/* ══════════════════════════════════════════════════════════════════════════
   cartilha-data.ts — EducaFito
   Refatoração completa: 21 páginas | Persona Dona Fito | imageSrc | Flaps
   Versão: 2.0.0
══════════════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────────────────
   PRIMITIVOS COMPARTILHADOS
───────────────────────────────────────────────────────────────────────── */

/** Variantes de callout/alerta disponíveis no design system */
export type CalloutVariant = 'green' | 'yellow' | 'red'

/** Variante de acento do LiftTheFlap */
export type FlapAccent = 'green' | 'yellow' | 'red' | 'teal'

/** Tipo de interação da página — usado para selecionar o layout correto */
export type InteractionType =
  | 'standard'       // Página de conteúdo textual clássico
  | 'lift-the-flap'  // Abas interativas (LiftTheFlap)
  | 'quiz'           // Quiz auto-contido
  | 'find-the-hero'  // Mini-jogo: Encontre o Herói
  | 'cover'          // Capa da cartilha
  | 'closing'        // Página de encerramento

/** Emoções possíveis da persona Dona Fito */
export type PersonaEmotion =
  | 'happy'        // Feliz e animada
  | 'thinking'     // Pensativa / didática
  | 'pointing'     // Apontando / chamando atenção
  | 'alert'        // Alarmada / alertando perigo
  | 'celebrating'  // Comemorando / parabenizando

/** Bloco de presença da Dona Fito em cada página */
export interface PersonaBlock {
  /** Fala da Dona Fito com linguagem acessível (Ensino Básico) */
  personaText: string
  /** Emoção que define qual ilustração da Dona Fito é exibida */
  personaEmotion: PersonaEmotion
  /**
   * Caminho para a imagem da variante de emoção da Dona Fito.
   * Ex.: /assets/dona-fito/dona-fito-happy.png
   */
  personaImageSrc: string
}

/** Um item de callout (caixa de destaque informativo) */
export interface CalloutData {
  variant: CalloutVariant
  /**
   * Substituímos icon: string (emoji) por imageSrc: string.
   * Recebe o caminho para ícone SVG/PNG do design system.
   */
  imageSrc: string
  title: string
  text: string
}

/**
 * Uma aba do componente LiftTheFlap (Lapbook Interativo).
 * frontEmoji/frontText foram substituídos por coverTitle + coverImageSrc.
 */
export interface FlapData {
  id: string
  /** Título exibido na capa da aba (frente) */
  coverTitle: string
  /** Imagem exibida na frente da aba (substituiu frontEmoji) */
  coverImageSrc: string
  /** Texto de apoio na capa da aba (ex.: "Clique para descobrir!") */
  coverHint?: string
  /** Conteúdo textual revelado ao "levantar" a aba */
  content: string
  /** Imagem opcional revelada no verso da aba */
  contentImageSrc?: string
  backAccent?: FlapAccent
}

/** Card de imagem do grid visual — usa imageSrc em vez de emoji */
export interface ImageCardData {
  imageSrc: string
  label: string
  /** Texto alternativo para acessibilidade */
  alt: string
}

/** Uma tag de categoria (cover-tags, etc.) */
export interface TagData {
  label: string
}

/** Card de estatística para páginas de impacto */
export interface StatCardData {
  gradient: string
  imageSrc: string
  stat: string
  label: string
  textColor: string
}

/** Item de impacto com imagem */
export interface ImpactItemData {
  imageSrc: string
  title: string
  desc: string
}

/** Item de órgão/ator */
export interface OrgaoItemData {
  imageSrc: string
  name: string
  desc: string
}

/** Detalhe de uma ficha técnica de praga */
export interface CaseDetailData {
  imageSrc: string
  label: string
  value: string
}

/** Item da cadeia de impacto */
export interface ChainItemData {
  imageSrc: string
  text: string
}

/** Pilar da página de encerramento */
export interface PillarData {
  imageSrc: string
  label: string
  sub: string
}

/** Card de alerta de praga quarentenária */
export interface PragaAlertCardData {
  bg: string
  imageSrc: string
  title: string
  desc: string
}

/* ══════════════════════════════════════════════════════════════════════════
   TIPOS DE PÁGINA — cada type + interactionType mapeia para um layout
══════════════════════════════════════════════════════════════════════════ */

/**
 * CAPA — Página 0
 */
export interface PageCoverData extends PersonaBlock {
  type: 'cover'
  interactionType: 'cover'
  id: string
  label: string
  title: string
  highlight: string
  subtitle: string
  coverImageSrc: string
  tags: TagData[]
}

/**
 * CONTEÚDO PADRÃO — Páginas de texto com image-grid e callouts
 */
export interface PageContentData extends PersonaBlock {
  type: 'content'
  interactionType: 'standard'
  id: string
  label: string
  badgeLabel: string
  title: string
  titleHighlight?: string
  titleSuffix?: string
  topCallout?: CalloutData
  leadText: string
  imageCards?: ImageCardData[]
  callouts?: CalloutData[]
  midSectionHeading?: string
  midSectionText?: string
  heroImageSrc?: string
}

/**
 * LAPBOOK — Página com LiftTheFlap interativo
 */
export interface PageLapbookData extends PersonaBlock {
  type: 'lapbook'
  interactionType: 'lift-the-flap'
  id: string
  label: string
  badgeLabel: string
  lapbookBadge: string
  lapbookTitle: string
  lapbookSubtitle: string
  flaps: FlapData[]
  columns?: 2 | 3
  callouts?: CalloutData[]
  backgroundImageSrc?: string
}

/**
 * IMPACTO — Página com cards de estatísticas
 */
export interface PageImpactData extends PersonaBlock {
  type: 'impact'
  interactionType: 'standard'
  id: string
  label: string
  badgeLabel: string
  title: string
  titleHighlight?: string
  leadText: string
  statCards: StatCardData[]
  impacts: ImpactItemData[]
  heroImageSrc?: string
}

/**
 * ALERTA — Página com alert box (pragas quarentenárias)
 */
export interface PageAlertData extends PersonaBlock {
  type: 'alert'
  interactionType: 'standard'
  id: string
  label: string
  badgeLabel: string
  title: string
  titleHighlight?: string
  leadText: string
  alertImageSrc: string
  alertTitle: string
  alertText: string
  callouts?: CalloutData[]
  pragaCards?: PragaAlertCardData[]
}

/**
 * LISTA DE ÓRGÃOS / ATORES — Quem cuida?
 */
export interface PageOrgaosData extends PersonaBlock {
  type: 'orgaos'
  interactionType: 'standard'
  id: string
  label: string
  badgeLabel: string
  title: string
  titleHighlight?: string
  titleSuffix?: string
  leadText: string
  items: OrgaoItemData[]
  heroImageSrc?: string
}

/**
 * CASO REAL — Fichas técnicas de pragas regionais
 */
export interface PageCaseData extends PersonaBlock {
  type: 'case'
  interactionType: 'standard'
  id: string
  label: string
  heroVariant: 'green' | 'amber' | 'teal' | 'red' | 'purple'
  heroImageSrc: string
  heroTitle: string
  heroSubtitle: string
  details: CaseDetailData[]
  callouts: CalloutData[]
}

/**
 * IMPACTO CADEIA — "Sem Fitossanidade = menos comida na mesa"
 */
export interface PageChainData extends PersonaBlock {
  type: 'chain'
  interactionType: 'standard'
  id: string
  label: string
  badgeLabel: string
  heroTitle: string
  heroHighlight: string
  heroSubtitle: string
  sectionHeading: string
  leadText: string
  chainItems: ChainItemData[]
  callouts?: CalloutData[]
  heroImageSrc?: string
}

/**
 * QUIZ — Auto-contido
 * Os dados do Quiz estão em Quiz.tsx pois são parte da lógica do componente.
 */
export interface PageQuizData extends PersonaBlock {
  type: 'quiz'
  interactionType: 'quiz'
  id: string
  label: string
  badgeLabel: string
}

/**
 * FIND THE HERO — Mini-jogo interativo
 */
export interface PageFindTheHeroData extends PersonaBlock {
  type: 'find-the-hero'
  interactionType: 'find-the-hero'
  id: string
  label: string
  badgeLabel: string
  title: string
  subtitle: string
  characters: {
    id: string
    imageSrc: string
    name: string
    isHero: boolean
    revealText: string
  }[]
  callouts?: CalloutData[]
}

/**
 * ENCERRAMENTO
 */
export interface PageClosingData extends PersonaBlock {
  type: 'closing'
  interactionType: 'closing'
  id: string
  label: string
  heroImageSrc: string
  heroTitle: string
  heroSubtitle: string
  pillars: PillarData[]
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
  | PageFindTheHeroData
  | PageClosingData

/* ══════════════════════════════════════════════════════════════════════════
   DADOS — 22 ENTRADAS (Capa + 21 páginas)
══════════════════════════════════════════════════════════════════════════ */

export const CARTILHA_PAGES: CartilhaPageData[] = [

  /* ─────────────────────────────────────────────────────
     CAPA — Página 0
  ───────────────────────────────────────────────────── */
  {
    type: 'cover',
    interactionType: 'cover',
    id: 'cover',
    label: 'Capa',
    title: 'Educação Fitossanitária\npara o Ensino Básico',
    highlight: 'Fitossanitária',
    subtitle:
      'Aprenda de forma fácil e divertida como proteger as plantas, garantir nossa alimentação e preservar a natureza.',
    coverImageSrc: '/assets/cenarios/capa-planta-saudavel-vs-doente.png',
    tags: [
      { label: 'Fitossanidade' },
      { label: 'Ciência' },
      { label: 'Agricultura' },
      { label: 'Pragas' },
      { label: 'Amapá' },
    ],
    personaText:
      'Olá! Eu sou a Dona Fito, sua guia nessa aventura! Seja bem-vindo a nossa cartilha! Vamos aprender juntos como cuidar das plantas e proteger nossa comida!',
    personaEmotion: 'happy',
    personaImageSrc: '/assets/dona-fito/dona-fito-happy.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 01 — APRESENTAÇÃO
  ───────────────────────────────────────────────────── */
  {
    type: 'content',
    interactionType: 'standard',
    id: 'p01',
    label: 'Apresentação',
    badgeLabel: 'Apresentação',
    title: 'Você sabia que ',
    titleHighlight: 'plantas também ficam doentes?',
    heroImageSrc: '/assets/cenarios/planta-saudavel-e-doente.png',
    leadText:
      'Nesta cartilha, você vai descobrir o mundo fascinante da Fitossanidade — a ciência que cuida da saúde das plantas. Vamos explorar juntos:',
    imageCards: [
      { imageSrc: '/assets/icones/praga-icone.png', label: 'O que são pragas e doenças', alt: 'Icone de microrganismo representando pragas' },
      { imageSrc: '/assets/icones/agricultura-icone.png', label: 'Como afetam a agricultura', alt: 'Icone de planta na lavoura' },
      { imageSrc: '/assets/icones/escudo-icone.png', label: 'Como nos protegemos delas', alt: 'Icone de escudo protetor' },
      { imageSrc: '/assets/icones/amapa-icone.png', label: 'Casos reais do Amapá', alt: 'Icone de mapa do Amapá' },
    ],
    topCallout: {
      variant: 'green',
      imageSrc: '/assets/icones/planta-icone.png',
      title: 'Olá, futuro cientista!',
      text: 'Assim como nós, humanos, podemos ficar gripados ou com febre, as plantas tambem podem ser atacadas por "viloes" que as deixam fracas, feias e improdutivas. Esses viloes se chamam pragas e doencas.',
    },
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/assets/icones/lampada-icone.png',
        title: 'Linguagem fácil para todos!',
        text: 'Esta cartilha foi criada especialmente para estudantes como você. Não precisamos ser cientistas para entender e ajudar a proteger as plantas da nossa região!',
      },
    ],
    personaText:
      'Olá! As plantas são como nós — elas também precisam de cuidado para crescer saudáveis. Preparado para descobrir como protegê-las?',
    personaEmotion: 'happy',
    personaImageSrc: '/assets/dona-fito/dona-fito-happy.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 02 — O QUE É FITOSSANIDADE?
  ───────────────────────────────────────────────────── */
  {
    type: 'content',
    interactionType: 'standard',
    id: 'p02',
    label: 'O que é Fitossanidade?',
    badgeLabel: 'Conceito Base',
    title: 'O que é ',
    titleHighlight: 'Fitossanidade?',
    heroImageSrc: '/assets/cenarios/cientista-observando-planta.png',
    leadText:
      'A palavra Fitossânidade vem do grego phyton (planta) e do latim sanitas (saúde). É a área da ciência que cuida da saúde das plantas e garante que elas cresçam fortes e produtivas.',
    imageCards: [
      { imageSrc: '/assets/icones/lupa-icone.png', label: 'Estuda pragas e doenças', alt: 'Lupa de pesquisa' },
      { imageSrc: '/assets/icones/escudo-icone.png', label: 'Previne e controla infestações', alt: 'Escudo de proteção' },
      { imageSrc: '/assets/icones/fronteira-icone.png', label: 'Protege fronteiras do comércio', alt: 'Símbolo de fronteira' },
      { imageSrc: '/assets/icones/ciencia-icone.png', label: 'Une ciência e agricultura', alt: 'Frasco de laboratorio' },
      { imageSrc: '/assets/icones/prato-icone.png', label: 'Garante alimentos saudáveis', alt: 'Prato com comida' },
      { imageSrc: '/assets/icones/biodiversidade-icone.png', label: 'Preserva a biodiversidade', alt: 'Folha verde' },
    ],
    midSectionHeading: 'Por que é importante?',
    midSectionText:
      'Sem Fitossanidade, pragas e doenças se espalhariam livremente pelas lavouras, destruindo colheitas inteiras. Isso significaria menos comida, aumento de preços e danos ao meio ambiente.',
    callouts: [
      {
        variant: 'green',
        imageSrc: '/assets/icones/curiosidade-icone.png',
        title: 'Curiosidade!',
        text: 'O Brasil é um dos maiores exportadores agrícolas do mundo. Por isso, cuidar da saúde das plantas é também cuidar da economia de milhões de famílias brasileiras!',
      },
    ],
    personaText:
      'Fito vem de "planta" e sanidade vem de "saúde"! Então Fitossanidade é literalmente a saúde das plantas. Pense em mim como a médica das plantas — e esse é meu nome mesmo!',
    personaEmotion: 'thinking',
    personaImageSrc: '/assets/dona-fito/dona-fito-thinking.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 03 — A FÁBRICA DE COMIDA
  ───────────────────────────────────────────────────── */
  {
    type: 'content',
    interactionType: 'standard',
    id: 'p03',
    label: 'A Fábrica de Comida',
    badgeLabel: 'Agricultura',
    title: 'As plantas são a nossa ',
    titleHighlight: 'fábrica de comida!',
    heroImageSrc: '/assets/cenarios/lavoura-produtiva-amapa.png',
    leadText:
      'Tudo o que comemos — arroz, feijão, fruta, farinha — começou como uma semente ou muda numa lavoura. As plantas transformam água, luz do sol e nutrientes do solo em alimento para nós. Por isso, cuidar delas é cuidar de nós mesmos!',
    imageCards: [
      { imageSrc: '/assets/icones/sol-icone.png', label: 'Luz do sol gera energia', alt: 'Sol brilhante' },
      { imageSrc: '/assets/icones/agua-icone.png', label: 'Água nutre as raízes', alt: 'Gota de água' },
      { imageSrc: '/assets/icones/solo-icone.png', label: 'Solo rico em minerais', alt: 'Solo fértil' },
      { imageSrc: '/assets/icones/fruta-icone.png', label: 'Resultado: alimento gostoso!', alt: 'Frutas frescas' },
    ],
    midSectionHeading: 'E o que acontece quando a fábrica é atacada?',
    midSectionText:
      'Quando pragas invadem a lavoura, é como se alguem danificasse as máquinas da fábrica. A produção cai, os alimentos ficam escassos e mais caros. E por isso que a Fitossânidade é tão importante para nos, consumidores!',
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/assets/icones/lampada-icone.png',
        title: 'Sabia que...',
        text: 'A mandioca e o açaí são duas das principais "fábricas de comida" do Amapá! Milhares de famílias dependem dessas plantas para viver e para vender seus produtos.',
      },
    ],
    personaText:
      'Imagina a lavoura como uma grande fábrica. Cada planta é uma máquina que produz comida para a gente. Se uma praga atacar, a fábrica para! E aí, o que acontece com a nossa comida?',
    personaEmotion: 'pointing',
    personaImageSrc: '/assets/dona-fito/dona-fito-pointing.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 04 — O QUE É UMA PRAGA AGRÍCOLA?
  ───────────────────────────────────────────────────── */
  {
    type: 'impact',
    interactionType: 'standard',
    id: 'p04',
    label: 'O que é uma Praga Agrícola?',
    badgeLabel: 'Conceito de Praga',
    title: 'O que é uma ',
    titleHighlight: 'Praga Agrícola?',
    heroImageSrc: '/assets/pragas/praga-agricola-visao-geral.png',
    leadText:
      'Uma praga agricola e qualquer organismo vivo — inseto, fungo, bacteria, virus, planta invasora — que cause dano economico a uma lavoura. Nem todo bichinho e uma praga! So e praga quando causa prejuizo real ao agricultor.',
    statCards: [
      { gradient: 'linear-gradient(135deg, #2E7D32, #388E3C)', imageSrc: '/assets/icones/perda-colheita-icone.png', stat: '40%', label: 'das colheitas mundiais são perdidas por pragas, segundo a FAO.', textColor: 'white' },
      { gradient: 'linear-gradient(135deg, #F57F17, #FBC02D)', imageSrc: '/assets/icones/dinheiro-icone.png', stat: 'R$ Bilhões', label: 'de prejuízo anual para o agronegócio brasileiro.', textColor: '#212121' },
      { gradient: 'linear-gradient(135deg, #37474F, #546E7A)', imageSrc: '/assets/icones/ecossistema-icone.png', stat: 'Ecossistema', label: 'em risco por introdução de espécies invasoras exóticas.', textColor: 'white' },
    ],
    impacts: [
      { imageSrc: '/assets/icones/caixa-icone.png', title: 'Redução da produção', desc: 'Pragas destroem partes ou toda a plantação, reduzindo drasticamente o volume colhido.' },
      { imageSrc: '/assets/icones/custo-icone.png', title: 'Aumento de custos', desc: 'Agricultores gastam mais com defensivos, replantio e trabalho para combater as pragas.' },
      { imageSrc: '/assets/icones/bloqueio-icone.png', title: 'Bloqueio de exportações', desc: 'Produtos com pragas podem ser barrados na alfândega, gerando prejuízos aos produtores.' },
      { imageSrc: '/assets/icones/clima-icone.png', title: 'Mudanças climáticas agravam', desc: 'O aquecimento global favorece a proliferação e expansão geográfica de novas pragas.' },
    ],
    personaText:
      'Praga é qualquer ser vivo que cause prejuízo à nossa lavoura! Mas atenção: nem todo inseto é vilão! A joaninha, por exemplo, é uma heroína — ela come outros insetos que atacam as plantas!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona-fito/dona-fito-alert.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 05 — OS INSETOS E ÁCAROS (LIFT-THE-FLAP)
  ───────────────────────────────────────────────────── */
  {
    type: 'lapbook',
    interactionType: 'lift-the-flap',
    id: 'p05',
    label: 'Os Insetos e Acaros',
    badgeLabel: 'Lapbook Interativo',
    lapbookBadge: 'Descubra os Invasores Minusculos',
    lapbookTitle: 'Insetos e Acaros: Os Pequenos Viloes da Lavoura',
    lapbookSubtitle: 'Levante cada aba e descubra como esses seres minusculos causam grandes prejuizos!',
    backgroundImageSrc: '/assets/cenarios/fundo-lapbook-verde.png',
    flaps: [
      {
        id: 'gafanhoto',
        coverTitle: 'O que é o Gafanhoto?',
        coverImageSrc: '/assets/pragas/insetos/gafanhoto-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'O gafanhoto é um inseto que voa em enxames gigantes e pode destruir campos inteiros de cultivo em poucas horas. Quando milhoes deles voam juntos, chamamos de "praga de gafanhotos" — um dos maiores pesadelos dos agricultores!',
        contentImageSrc: '/assets/pragas/insetos/gafanhoto-dano.png',
        backAccent: 'red',
      },
      {
        id: 'pulgao',
        coverTitle: 'O que é o Pulgão?',
        coverImageSrc: '/assets/pragas/insetos/pulgao-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'O pulgão é um inseto minúsculo que suga a seiva das plantas, enfraquecendo-as. Ele se reproduz muito rápido e pode cobrir toda uma planta em poucos dias! Além disso, transmite vírus de planta para planta.',
        contentImageSrc: '/assets/pragas/insetos/pulgao-colonia.png',
        backAccent: 'yellow',
      },
      {
        id: 'mosca-branca',
        coverTitle: 'O que e a Mosca-branca?',
        coverImageSrc: '/assets/pragas/insetos/mosca-branca-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'A mosca-branca e um inseto pequenino que vive na parte de baixo das folhas. Ela suga a seiva, provoca o amarelamento das folhas e transmite virus. E dificil de combater porque se esconde embaixo das folhas!',
        contentImageSrc: '/assets/pragas/insetos/mosca-branca-folha.png',
        backAccent: 'teal',
      },
      {
        id: 'broca',
        coverTitle: 'O que é a Broca?',
        coverImageSrc: '/assets/pragas/insetos/broca-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'A broca é a larva (filhinho) de vários tipos de insetos. Ela "fura" o caule, o fruto ou a raiz da planta por dentro, causando danos que não são visíveis por fora. Quando percebemos o problema, já é tarde demais!',
        contentImageSrc: '/assets/pragas/insetos/broca-dano-caule.png',
        backAccent: 'red',
      },
      {
        id: 'acaro',
        coverTitle: 'O que é o Ácaro?',
        coverImageSrc: '/assets/pragas/acaros/acaro-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'Os ácaros são artropodes tão pequenos que mal conseguimos vê-los! Eles vivem nas folhas e sugam a seiva, causando manchas amareladas e queda de folhas. Em tempo seco e quente, eles se reproduzem muito rapidamente.',
        contentImageSrc: '/assets/pragas/acaros/acaro-folha-ampliado.png',
        backAccent: 'yellow',
      },
      {
        id: 'trips',
        coverTitle: 'O que é o Trips?',
        coverImageSrc: '/assets/pragas/insetos/trips-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'O trips é um inseto tão pequeno que parece um ponto! Ele raspa e suga as células das plantas, deixando marcas prateadas ou douradas nas folhas e frutos. Também transmite vírus perigosos de uma planta para outra.',
        contentImageSrc: '/assets/pragas/insetos/trips-dano-fruto.png',
        backAccent: 'green',
      },
    ],
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/assets/icones/atencao-icone.png',
        title: 'Atenção!',
        text: 'Nem todo inseto é praga! Abelhas, joaninhas e vespinhas parasitoides são aliadas da lavoura. Conhecer os "heróis" e os "vilões" do campo é essencial para um bom manejo agrícola!',
      },
    ],
    personaText:
      'Uau, que turma complicada! Insetos e ácaros são os mais diversos vilões da lavoura. Mas não se assuste — levante cada aba para conhecê-los de pertinho e aprender como nos defendemos deles!',
    personaEmotion: 'pointing',
    personaImageSrc: '/assets/dona-fito/dona-fito-pointing.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 06 — FUNGOS E BACTÉRIAS (LIFT-THE-FLAP)
  ───────────────────────────────────────────────────── */
  {
    type: 'lapbook',
    interactionType: 'lift-the-flap',
    id: 'p06',
    label: 'Fungos e Bactérias',
    badgeLabel: 'Lapbook Interativo',
    lapbookBadge: 'Os Invasores Invisíveis',
    lapbookTitle: 'Fungos, Bactérias e Vírus: O que não se vê pode machucar!',
    lapbookSubtitle: 'Levante cada aba e descubra os microorganismos que adoecem as nossas plantas!',
    backgroundImageSrc: '/assets/cenarios/fundo-lapbook-amarelo.png',
    flaps: [
      {
        id: 'fungo-ferrugem',
        coverTitle: 'O que é a Ferrugem?',
        coverImageSrc: '/assets/pragas/fungos/ferrugem-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'A ferrugem é uma doença causada por fungos que deixam manchas alaranjadas ou marrons nas folhas, parecendo ferrugem de metal. Ela se espalha pelo vento e pode destruir uma lavoura de soja ou trigo em poucos dias!',
        contentImageSrc: '/assets/pragas/fungos/ferrugem-folha-dano.png',
        backAccent: 'red',
      },
      {
        id: 'fungo-antracnose',
        coverTitle: 'O que é a Antracnose?',
        coverImageSrc: '/assets/pragas/fungos/antracnose-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'A antracnose é um fungo que causa manchas escuras e afundadas nos frutos, como manga, mamao e tomate. Os frutos apodrecem antes de amadurecer e ficam imprestaveis para venda. É muito comum no clima umido da Amazonia!',
        contentImageSrc: '/assets/pragas/fungos/antracnose-fruto.png',
        backAccent: 'yellow',
      },
      {
        id: 'fungo-requeima',
        coverTitle: 'O que é a Requeima?',
        coverImageSrc: '/assets/pragas/fungos/requeima-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'A requeima, causada pelo fungo Phytophthora infestans, é a mesma doença que causou a Grande Fome da Irlanda no século XIX! Ela ataca batatinha, tomate e pimenta, causando o apodrecimento rápido das plantas.',
        contentImageSrc: '/assets/pragas/fungos/requeima-batata.png',
        backAccent: 'red',
      },
      {
        id: 'bacteria-cancro',
        coverTitle: 'O que é o Cancro Citrico?',
        coverImageSrc: '/assets/pragas/bacterias/cancro-citrico-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'O cancro citrico é uma doença bacteriana que ataca laranjas, limões e outras frutas cítricas. Causa lesões nas folhas, frutos e caules. Frutos infectados não podem ser exportados — prejuízo enorme para os produtores!',
        contentImageSrc: '/assets/pragas/bacterias/cancro-citrico-fruto.png',
        backAccent: 'teal',
      },
      {
        id: 'virus-mosaico',
        coverTitle: 'O que é o Vírus do Mosaico?',
        coverImageSrc: '/assets/pragas/virus/mosaico-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'O vírus do mosaico deixa as folhas das plantas com um padrão de manchas claras e escuras, parecendo um mosaico! Ele é transmitido por insetos como pulgões. Afeta tomate, feijão, mandioca e muitas outras culturas.',
        contentImageSrc: '/assets/pragas/virus/mosaico-folha.png',
        backAccent: 'green',
      },
      {
        id: 'fitoplasma',
        coverTitle: 'O que e o Fitoplasma?',
        coverImageSrc: '/assets/pragas/bacterias/fitoplasma-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'O fitoplasma e um micro-organismo que vive dentro dos "canos" da planta (floema). Causa o amarelecimento letal de palmeiras como o acai, coco e dende — sem cura conhecida! E transmitido por insetos vetores.',
        contentImageSrc: '/assets/pragas/bacterias/fitoplasma-palmeira.png',
        backAccent: 'red',
      },
    ],
    callouts: [
      {
        variant: 'green',
        imageSrc: '/assets/icones/prevencao-icone.png',
        title: 'A prevenção é sempre melhor!',
        text: 'Fungos e bactérias se espalham pela água, pelo vento e por ferramentas contaminadas. Higienizar os instrumentos agrícolas, usar sementes certificadas e evitar o excesso de água são formas simples de prevenir essas doenças!',
      },
    ],
    personaText:
      'Esses inimigos são invisíveis a olho nu, mas causam estragos enormes! Fungos, bactérias e vírus são os "germes das plantas". Levante as abas para conhecê-los e saber como nos protegemos!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona-fito/dona-fito-alert.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 07 — PLANTAS INVASORAS
  ───────────────────────────────────────────────────── */
  {
    type: 'content',
    interactionType: 'standard',
    id: 'p07',
    label: 'Plantas Invasoras',
    badgeLabel: 'Ervas Daninhas',
    title: 'As plantas que ',
    titleHighlight: 'roubam espaco',
    titleSuffix: ' das outras!',
    heroImageSrc: '/assets/pragas/plantas-invasoras/erva-daninha-lavoura.png',
    leadText:
      'Plantas invasoras (ou ervas daninhas) são plantas que crescem onde não são desejadas e competem com as plantas cultivadas por água, luz e nutrientes do solo. E uma disputa por recursos — e a planta da lavoura quem perde!',
    imageCards: [
      { imageSrc: '/assets/pragas/plantas-invasoras/tiririca-icone.png', label: 'Tiririca — muito comum nas roças', alt: 'Tiririca invasora' },
      { imageSrc: '/assets/pragas/plantas-invasoras/capim-coloniao-icone.png', label: 'Capim-colônia — invade pastagens', alt: 'Capim colônia' },
      { imageSrc: '/assets/pragas/plantas-invasoras/picao-icone.png', label: 'Picão-preto — ataca diversas culturas', alt: 'Picão preto' },
      { imageSrc: '/assets/pragas/plantas-invasoras/buva-icone.png', label: 'Buva — resistente a herbicidas', alt: 'Buva resistente' },
    ],
    midSectionHeading: 'Por que são um problema sério?',
    midSectionText:
      'Uma única planta invasora pode produzir milhares de sementes que ficam no solo por anos! Além de roubar nutrientes, algumas liberam substâncias químicas que inibem o crescimento das plantas ao redor. O controle precoce é fundamental!',
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/assets/icones/lampada-icone.png',
        title: 'Curiosidade!',
        text: 'O aguapé (jacinto-d’água) é uma planta invasora aquática que bloqueia rios e lagos no Amapá, prejudicando a pesca e a navegação. Até plantas podem ser pragas em locais errados!',
      },
    ],
    personaText:
      'As plantas invasoras não são malvadas — elas só estão crescendo no lugar errado! Mas quando competem com nossa mandioca ou nosso feijão, viram um grande problema. Por isso precisamos conhecê-las e controlá-las!',
    personaEmotion: 'thinking',
    personaImageSrc: '/assets/dona-fito/dona-fito-thinking.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 08 — TODO MUNDO TEM UM PAPEL!
  ───────────────────────────────────────────────────── */
  {
    type: 'content',
    interactionType: 'standard',
    id: 'p08',
    label: 'O Lado Bom da Natureza',
    badgeLabel: 'Aliados da Lavoura',
    title: 'Na natureza, todo mundo tem ',
    titleHighlight: 'um papel!',
    heroImageSrc: '/assets/cenarios/ecossistema-agricola-equilibrado.png',
    leadText:
      'Nem tudo é vilão na natureza! Existem seres vivos incríveis que ajudam a lavoura ao se alimentar das pragas ou ao polinizar as flores das plantas. São os nossos heróis naturais!',
    imageCards: [
      { imageSrc: '/assets/herois/joaninha-icone.png', label: 'Joaninha — come pulgões', alt: 'Joaninha vermelha' },
      { imageSrc: '/assets/herois/abelha-icone.png', label: 'Abelha — poliniza as flores', alt: 'Abelha voando' },
      { imageSrc: '/assets/herois/vespinha-icone.png', label: 'Vespinha — parasita pragas', alt: 'Vespinha parasitoide' },
      { imageSrc: '/assets/herois/aranha-icone.png', label: 'Aranha — predadora de insetos', alt: 'Aranha pequena' },
      { imageSrc: '/assets/herois/gavião-icone.png', label: 'Gavião — controla roedores', alt: 'Gavião predador' },
      { imageSrc: '/assets/herois/fungo-bom-icone.png', label: 'Fungos bons — combatem pragas', alt: 'Fungo entomopatogênico' },
    ],
    midSectionHeading: 'O que é Controle Biológico?',
    midSectionText:
      'Controle biológico é usar esses seres naturais para combater as pragas! Em vez de usar agrotoxicos, os agricultores podem criar e soltar joaninhas, vespinhas ou fungos bons na lavoura. É sustentável, barato e não polui o ambiente!',
    callouts: [
      {
        variant: 'green',
        imageSrc: '/assets/icones/sustentabilidade-icone.png',
        title: 'A natureza é sábia!',
        text: 'Quando preservamos a biodiversidade ao redor das lavouras — matas, rios, bosques — estamos protegendo o lar dos nossos aliados naturais. Fazenda sustentavel e fazenda saudavel!',
      },
    ],
    personaText:
      'Você sabia que a joaninha é uma super-heroína da lavoura? Ela pode comer até 50 pulgões por dia! Cada ser vivo tem um papel importante na natureza. Vamos respeitar e valorizar nossos aliados!',
    personaEmotion: 'happy',
    personaImageSrc: '/assets/dona-fito/dona-fito-happy.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 09 — O ATAQUE NA LAVOURA
  ───────────────────────────────────────────────────── */
  {
    type: 'impact',
    interactionType: 'standard',
    id: 'p09',
    label: 'O Ataque na Lavoura',
    badgeLabel: 'Como as Pragas Atacam',
    title: 'Como as pragas ',
    titleHighlight: 'atacam a lavoura?',
    heroImageSrc: '/assets/cenarios/lavoura-atacada-por-praga.png',
    leadText:
      'Cada tipo de praga tem uma forma diferente de atacar as plantas. Conhecer essas estratégias nos ajuda a identificar o problema cedo e agir rapidamente, salvando a colheita!',
    statCards: [
      { gradient: 'linear-gradient(135deg, #C62828, #B71C1C)', imageSrc: '/assets/icones/folha-comida-icone.png', stat: 'Folhas', label: 'Insetos desfolhadores destroem a capacidade da planta de fazer fotossíntese.', textColor: 'white' },
      { gradient: 'linear-gradient(135deg, #F57F17, #E65100)', imageSrc: '/assets/icones/raiz-icone.png', stat: 'Raiz', label: 'Nematoides e larvas subterrâneas atacam as raízes, impedindo a absorção de água.', textColor: 'white' },
      { gradient: 'linear-gradient(135deg, #1565C0, #0D47A1)', imageSrc: '/assets/icones/seiva-icone.png', stat: 'Seiva', label: 'Pulgões, ácaros e moscas sugam a seiva, enfraquecendo gradativamente a planta.', textColor: 'white' },
    ],
    impacts: [
      { imageSrc: '/assets/icones/manchas-icone.png', title: 'Manchas e lesões', desc: 'Fungos e bactérias causam manchas que impedem a fotossíntese e deixam a planta feia para venda.' },
      { imageSrc: '/assets/icones/galha-icone.png', title: 'Deformações e galhas', desc: 'Alguns insetos injetam substâncias que deformam folhas, caules e frutos, tornando-os inúteis.' },
      { imageSrc: '/assets/icones/murcha-icone.png', title: 'Murcha e morte subita', desc: 'Doenças vasculares bloqueiam o transporte de água dentro da planta, causando murcha repentina.' },
      { imageSrc: '/assets/icones/virus-transmissao.png', title: 'Transmissão de vírus', desc: 'Insetos como pulgões e moscas-brancas são vetores de vírus que enfraquecem ou matam as plantas.' },
    ],
    personaText:
      'Cada praga tem sua própria "arma" para atacar as plantas. Por isso é tão importante monitorar a lavoura constantemente! Quanto mais cedo identificarmos o problema, mais fácil será controlá-lo!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona-fito/dona-fito-alert.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 10 — PRAGAS QUARENTENÁRIAS
  ───────────────────────────────────────────────────── */
  {
    type: 'alert',
    interactionType: 'standard',
    id: 'p10',
    label: 'Pragas Quarentenárias',
    badgeLabel: 'Alerta Especial',
    title: 'O que são ',
    titleHighlight: 'Pragas Quarentenárias?',
    leadText:
      'Imagine uma praga tão perigosa que poderia destruir toda a agricultura de um país se entrasse em suas fronteiras. É exatamente isso que define uma Praga Quarentenária — um inimigo externo que não podemos deixar entrar!',
    alertImageSrc: '/assets/icones/alerta-quarentena-icone.png',
    alertTitle: 'Definição Oficial (MAPA)',
    alertText:
      'Praga quarentenária é aquela de importância econômica potencial para o país ameaçado, ainda não presente no território ou presente em área limitada, e sujeita ao controle oficial.',
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/assets/icones/pergunta-icone.png',
        title: 'Por que o nome "Quarentenária"?',
        text: 'O termo vem de "quarentena" — o periodo de isolamento usado para evitar a propagação de doenças. Assim como fazemos quarentena para proteger as pessoas, fazemos quarentena fitossanitária para proteger as plantas!',
      },
    ],
    pragaCards: [
      { bg: 'linear-gradient(135deg,#B71C1C,#C62828)', imageSrc: '/assets/pragas/quarentenarias/mosca-carambola-card.png', title: 'Mosca-da-carambola', desc: 'Detectada no Amapa, ameaça frutas em todo o territorio nacional. É uma praga quarentenária A1.' },
      { bg: 'linear-gradient(135deg,#4A148C,#6A1B9A)', imageSrc: '/assets/pragas/quarentenarias/hlb-card.png', title: 'Huanglongbing (HLB)', desc: 'Doença bacteriana devastadora para citros. Sem cura conhecida para as árvores infectadas.' },
      { bg: 'linear-gradient(135deg,#E65100,#BF360C)', imageSrc: '/assets/pragas/quarentenarias/vespa-velutina-card.png', title: 'Vespa Velutina', desc: 'Predadora de abelhas nativas, risco gravíssimo a polinização e a apicultura.' },
    ],
    personaText:
      'Algumas pragas são tão perigosas que o Brasil tem regras rígidas para impedir sua entrada no país! Aeroportos, portos e fronteiras são fiscalizados para isso. Nunca traga frutas ou plantas de outros países sem verificar!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona-fito/dona-fito-alert.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 11 — QUEM CUIDA? PESQUISADORES
  ───────────────────────────────────────────────────── */
  {
    type: 'orgaos',
    interactionType: 'standard',
    id: 'p11',
    label: 'Quem Cuida? Pesquisadores',
    badgeLabel: 'Herois da Ciencia',
    title: 'Os Cientistas que ',
    titleHighlight: 'protegem',
    titleSuffix: ' nossas plantas!',
    heroImageSrc: '/assets/cenarios/pesquisador-laboratorio.png',
    leadText:
      'Por tras de cada solução fitossanitária existe um pesquisador dedicado! Essas pessoas estudam pragas, desenvolvem novas variedades de plantas resistentes e criam métodos de controle sustentáveis.',
    items: [
      { imageSrc: '/assets/icones/embrapa-icone.png', name: 'Embrapa — Empresa Brasileira de Pesquisa Agropecuária', desc: 'Desenvolveu variedades de mandioca resistentes a vassoura-de-bruxa e tecnicas de controle biologico para a Amazonia.' },
      { imageSrc: '/assets/icones/universidade-icone.png', name: 'Universidades e Institutos Federais', desc: 'Formam biologos, agronomos e engenheiros florestais que pesquisam pragas locais e desenvolvem solucoes regionais.' },
      { imageSrc: '/assets/icones/ifap-icone.png', name: 'IFAP — Instituto Federal do Amapá', desc: 'Pesquisa e forma técnicos agrícolas com foco nas pragas e desafios específicos da região amazônica.' },
      { imageSrc: '/assets/icones/iepa-icone.png', name: 'IEPA — Instituto de Pesquisas Científicas do Amapá', desc: 'Estuda a biodiversidade amazônica, identificando novas pragas e aliados naturais da lavoura amapaense.' },
      { imageSrc: '/assets/icones/laboratorio-icone.png', name: 'Laboratórios de Diagnóstico Fitossanitário', desc: 'Identificam com precisão qual praga ou doença está atacando uma lavoura, permitindo o tratamento correto.' },
      { imageSrc: '/assets/icones/estudante-icone.png', name: 'Você pode ser o próximo!', desc: 'Cada estudante curioso é um futuro pesquisador em potencial. A ciência precisa de você para proteger nossas plantas!' },
    ],
    personaText:
      'Os pesquisadores são os verdadeiros super-heróis da fitossanidade! Eles passam anos estudando para nos ajudar. Quem sabe um dia você não vai trabalhar na Embrapa ou numa universidade pesquisando pragas do Amapá?',
    personaEmotion: 'happy',
    personaImageSrc: '/assets/dona-fito/dona-fito-happy.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 12 — QUEM CUIDA? FISCALIZAÇÃO
  ───────────────────────────────────────────────────── */
  {
    type: 'orgaos',
    interactionType: 'standard',
    id: 'p12',
    label: 'Quem Cuida? Fiscalização',
    badgeLabel: 'Guardioes das Fronteiras',
    title: 'Os guardiões que ',
    titleHighlight: 'fiscalizam',
    titleSuffix: ' e protegem!',
    heroImageSrc: '/assets/cenarios/fiscal-aeroporto-fitossanitario.png',
    leadText:
      'Além dos pesquisadores, existe uma rede de fiscalização que trabalha 24 horas por dia para impedir que pragas perigosas entrem no Brasil ou se espalhem entre os estados.',
    items: [
      { imageSrc: '/assets/icones/mapa-ministerio-icone.png', name: 'MAPA — Ministerio da Agricultura', desc: 'Define as normas fitossanitarias nacionais e coordena toda a rede de proteção das plantas do Brasil.' },
      { imageSrc: '/assets/icones/vigiagro-icone.png', name: 'VIGIAGRO — Vigilancia Agropecuaria', desc: 'Fiscaliza portos, aeroportos e fronteiras terrestres, inspecionando malas, caixas e cargas em busca de pragas.' },
      { imageSrc: '/assets/icones/adap-icone.png', name: 'ADAP — Agencia de Defesa Agropecuaria do Amapa', desc: 'Fiscaliza o comercio de plantas, sementes e frutas dentro do Amapa, evitando a entrada de pragas de outros estados.' },
      { imageSrc: '/assets/icones/sementes-certificadas.png', name: 'Inspeção de Sementes e Mudas', desc: 'Antes de ser vendida, toda semente precisa passar por inspeção oficial para garantir que esta livre de doencas.' },
      { imageSrc: '/assets/icones/produtor-rural-icone.png', name: 'Produtor Rural', desc: 'São os primeiros a perceber algo errado na lavoura! Cada produtor é um fiscal em campo, reportando anomalias.' },
      { imageSrc: '/assets/icones/consumidor-icone.png', name: 'E você, consumidor!', desc: 'Não transporte frutas, plantas ou terra de regiões desconhecidas. Essa atitude simples ajuda a proteger nossa agricultura!' },
    ],
    personaText:
      'Imagina o trabalho desses fiscais! Eles inspecionam cada bagagem, cada caixa de fruta, cada muda de planta que chega ao Amapá. É um trabalho de heroi — silencioso mas muito importante para nossa segurança alimentar!',
    personaEmotion: 'pointing',
    personaImageSrc: '/assets/dona-fito/dona-fito-pointing.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 13 — O ESCUDO PROTETOR (BOAS PRÁTICAS — LIFT-THE-FLAP)
  ───────────────────────────────────────────────────── */
  {
    type: 'lapbook',
    interactionType: 'lift-the-flap',
    id: 'p13',
    label: 'O Escudo Protetor',
    badgeLabel: 'Boas Praticas',
    lapbookBadge: 'Como Proteger a Lavoura?',
    lapbookTitle: 'Como Evitar e Controlar as Pragas Agrícolas?',
    lapbookSubtitle: 'Levante cada aba e descubra as ferramentas que protegem nossas lavouras!',
    backgroundImageSrc: '/assets/cenarios/fundo-lapbook-teal.png',
    flaps: [
      {
        id: 'sementes-certificadas',
        coverTitle: 'Sementes Certificadas',
        coverImageSrc: '/assets/boas-praticas/semente-certificada-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'Sementes inspecionadas e aprovadas pelo MAPA garantem que estão livres de pragas, doenças e com alta capacidade de germinação. Começar com boas sementes é a base de uma lavoura saudável!',
        contentImageSrc: '/assets/boas-praticas/semente-certificada-detalhe.png',
        backAccent: 'green',
      },
      {
        id: 'rotacao-culturas',
        coverTitle: 'Rotação de Culturas',
        coverImageSrc: '/assets/boas-praticas/rotacao-culturas-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'Alternar diferentes especies de plantas numa mesma area entre as safras quebra o ciclo de reproducao das pragas e melhora a saude do solo. E simples, barato e muito eficaz!',
        contentImageSrc: '/assets/boas-praticas/rotacao-culturas-detalhe.png',
        backAccent: 'teal',
      },
      {
        id: 'controle-biologico',
        coverTitle: 'Controle Biológico',
        coverImageSrc: '/assets/boas-praticas/controle-biologico-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'Usar inimigos naturais das pragas — joaninhas, vespinhas parasitoides e fungos entomopatogênicos — para controlá-las de forma sustentável, sem agrotóxicos. A natureza trabalhando para nós!',
        contentImageSrc: '/assets/boas-praticas/controle-biologico-detalhe.png',
        backAccent: 'green',
      },
      {
        id: 'mip',
        coverTitle: 'MIP — Manejo Integrado de Pragas',
        coverImageSrc: '/assets/boas-praticas/mip-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'O MIP combina metodos biologicos, culturais e quimicos de forma equilibrada, usando o minimo de agrotoxico possivel. E a abordagem mais moderna e sustentavel da fitossanidade!',
        contentImageSrc: '/assets/boas-praticas/mip-diagrama.png',
        backAccent: 'yellow',
      },
      {
        id: 'monitoramento',
        coverTitle: 'Monitoramento Constante',
        coverImageSrc: '/assets/boas-praticas/monitoramento-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'Visitar a lavoura regularmente, usar armadilhas para insetos e registrar o que se observa permite identificar problemas cedo. Problema identificado cedo e problema resolvido com menor custo e dano!',
        contentImageSrc: '/assets/boas-praticas/monitoramento-armadilha.png',
        backAccent: 'teal',
      },
      {
        id: 'voce-pode-ajudar',
        coverTitle: 'Você também pode ajudar!',
        coverImageSrc: '/assets/boas-praticas/cidadao-ajuda-capa.png',
        coverHint: 'Levante para descobrir!',
        content: 'Não transporte plantas, frutas ou terra sem verificar a origem. Compre produtos com selos de qualidade. Denuncie pragas desconhecidas ao MAPA. Compartilhe o que aprendeu. Cada atitude conta!',
        contentImageSrc: '/assets/boas-praticas/cidadao-ajuda-detalhe.png',
        backAccent: 'yellow',
      },
    ],
    callouts: [
      {
        variant: 'green',
        imageSrc: '/assets/icones/prevencao-icone.png',
        title: 'A prevenção sempre vence o combate!',
        text: 'Investir em boas práticas fitossanitárias custa muito menos do que tratar uma lavoura infestada. Agricultor informado é agricultor protegido — e isso vale para toda a família rural!',
      },
    ],
    personaText:
      'Aqui estão as "armas" dos heróis da lavoura! Cada uma dessas práticas é um escudo que protege nossas plantas. Levante as abas e descubra qual você já conhecia!',
    personaEmotion: 'celebrating',
    personaImageSrc: '/assets/dona-fito/dona-fito-celebrating.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 14 — O MISTÉRIO DA MANDIOCA (VASSOURA-DE-BRUXA)
  ───────────────────────────────────────────────────── */
  {
    type: 'case',
    interactionType: 'standard',
    id: 'p14',
    label: 'O Mistério da Mandioca',
    heroVariant: 'green',
    heroImageSrc: '/assets/pragas/vassoura-de-bruxa/vassoura-bruxa-mandioca-hero.png',
    heroTitle: 'Vassoura-de-bruxa na Mandioca',
    heroSubtitle: 'O fungo que ameaça a raiz mais consumida da Região Norte',
    details: [
      { imageSrc: '/assets/icones/fungo-icone.png', label: 'Agente causador', value: 'Fungo Moniliophthora perniciosa (e outros patogenos similares)' },
      { imageSrc: '/assets/icones/mandioca-icone.png', label: 'Cultura afetada', value: 'Mandioca (Manihot esculenta) — base alimentar da Região Norte' },
      { imageSrc: '/assets/icones/sintoma-icone.png', label: 'Sintomas', value: 'Brotamentos anormais em forma de vassoura, engrossamento de ramos e aborto de frutos' },
      { imageSrc: '/assets/icones/localizacao-icone.png', label: 'Ocorrencia', value: 'Amazonia, Amapa, Para, Maranhao e estados do Nordeste brasileiro' },
      { imageSrc: '/assets/icones/prejuizo-icone.png', label: 'Impacto', value: 'Redução de até 90% na produtividade em areas infestadas' },
    ],
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/assets/icones/solucao-icone.png',
        title: 'Controle recomendado',
        text: 'Uso de variedades resistentes desenvolvidas pela Embrapa, poda e destruição de partes infectadas e monitoramento constante das roças. A farinha de mandioca é a base da alimentação no Amapá — protegê-la é proteger nossa cultura!',
      },
    ],
    personaText:
      'Por isso chamam de vassoura-de-bruxa! Os galhos infectados crescem tortos em formato de vassoura. É uma doença muito triste para os agricultores. Mas a ciência está trabalhando para criar variedades de mandioca resistentes!',
    personaEmotion: 'thinking',
    personaImageSrc: '/assets/dona-fito/dona-fito-thinking.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 15 — O NOSSO AÇAÍ EM RISCO
  ───────────────────────────────────────────────────── */
  {
    type: 'case',
    interactionType: 'standard',
    id: 'p15',
    label: 'O Nosso Açaí em Risco',
    heroVariant: 'purple',
    heroImageSrc: '/assets/pragas/amarelecimento-letal/acai-em-risco-hero.png',
    heroTitle: 'Açaí em Risco: Amarelecimento Letal das Palmeiras',
    heroSubtitle: 'A doença invisível que ameaça o símbolo do Amapá',
    details: [
      { imageSrc: '/assets/icones/fitoplasma-icone.png', label: 'Agente causador', value: 'Fitoplasma (Candidatus Phytoplasma sp.) transmitido por insetos vetores' },
      { imageSrc: '/assets/icones/palmeira-icone.png', label: 'Culturas afetadas', value: 'Palmeiras em geral: acai, coco, dende, babacu' },
      { imageSrc: '/assets/icones/sintoma-icone.png', label: 'Sintomas', value: 'Amarelamento progressivo das folhas, aborto de frutos e morte da palmeira' },
      { imageSrc: '/assets/icones/localizacao-icone.png', label: 'Ocorrencia', value: 'Detectado no Amapa, Para e Maranhao; presente nas Americas e Africa' },
      { imageSrc: '/assets/icones/prejuizo-icone.png', label: 'Impacto', value: 'Devastador — o acai e um dos principais produtos de exportacao do Amapa' },
    ],
    callouts: [
      {
        variant: 'red',
        imageSrc: '/assets/icones/sem-cura-icone.png',
        title: 'Sem cura conhecida!',
        text: 'Até o momento não existe cura para palmeiras infectadas. O controle é feito pelo manejo dos insetos vetores e pela remoção e destruição das palmeiras doentes para evitar a propagação.',
      },
      {
        variant: 'green',
        imageSrc: '/assets/icones/acai-icone.png',
        title: 'Importância econômica e cultural',
        text: 'O açaí é símbolo cultural e econômico do Amapá. Sua produção gera renda para milhares de famílias ribeirinhas. Protegê-lo é essencial para a economia local e para a segurança alimentar da região!',
      },
    ],
    personaText:
      'O açaí é o nosso tesouro! Não só é gostoso — ele é a fonte de renda de muitas famílias do Amapá. Por isso o amarelecimento letal das palmeiras nos preocupa tanto. Precisamos proteger o nosso açaí!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona-fito/dona-fito-alert.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 16 — A INVASORA DOS POMARES (MOSCA DA FRUTA)
  ───────────────────────────────────────────────────── */
  {
    type: 'case',
    interactionType: 'standard',
    id: 'p16',
    label: 'A Invasora dos Pomares',
    heroVariant: 'amber',
    heroImageSrc: '/assets/pragas/mosca-fruta/mosca-fruta-hero.png',
    heroTitle: 'Mosca da Fruta: Um Inimigo Pequeno com Grandes Consequencias',
    heroSubtitle: 'A viloa que arruina as frutas por dentro — sem que a gente perceba!',
    details: [
      { imageSrc: '/assets/icones/inseto-icone.png', label: 'Especies de destaque', value: 'Ceratitis capitata (mosca-do-mediterraneo) e Anastrepha spp. (especies nativas)' },
      { imageSrc: '/assets/icones/fruta-icone.png', label: 'Culturas afetadas', value: 'Manga, goiaba, laranja, maracuja, acerola e dezenas de outras frutas tropicais' },
      { imageSrc: '/assets/icones/sintoma-icone.png', label: 'Sintomas', value: 'Frutos caem prematuramente, apodrecem por dentro e larvas brancas aparecem no interior' },
      { imageSrc: '/assets/icones/localizacao-icone.png', label: 'Ocorrencia', value: 'Todo o Brasil; no Amapa afeta principalmente a fruticultura de subsistencia e exportacao' },
      { imageSrc: '/assets/icones/exportacao-icone.png', label: 'Impacto economico', value: 'Barreiras sanitarias em mercados internacionais impedem a exportacao de frutas frescas' },
    ],
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/assets/icones/aviao-icone.png',
        title: 'Barreira de Exportação',
        text: 'Países importadores exigem certificados fitossanitários comprovando que os frutos estão livres de moscas da fruta. Sem esses certificados, o Brasil perde milhões de dólares em exportações de frutas tropicais.',
      },
      {
        variant: 'green',
        imageSrc: '/assets/icones/ciencia-icone.png',
        title: 'Controle Biológico — a Técnica do Inseto Estéril!',
        text: 'A Embrapa utiliza a TIE (Tecnica do Inseto Estéril): machos de mosca são esterilizados por irradiação e liberados na natureza. Ao cruzar com fêmeas, não produzem descendentes — redução da população sem agrotoxicos!',
      },
    ],
    personaText:
      'A mosca da fruta é uma verdadeira traicoeira! Por fora, a fruta parece linda. Por dentro, a larva já comeu tudo. Por isso é tão importante inspecionar as frutas antes de vendê-las ou transportá-las!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona-fito/dona-fito-alert.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 17 — A MOSCA-DA-CARAMBOLA
  ───────────────────────────────────────────────────── */
  {
    type: 'case',
    interactionType: 'standard',
    id: 'p17',
    label: 'A Mosca-da-Carambola',
    heroVariant: 'red',
    heroImageSrc: '/assets/pragas/mosca-carambola/mosca-carambola-hero.png',
    heroTitle: 'Mosca-da-Carambola: A Praga Quarentenária do Amapá',
    heroSubtitle: 'O maior alerta fitossanitário da nossa região',
    details: [
      { imageSrc: '/assets/icones/inseto-icone.png', label: 'Nome cientifico', value: 'Bactrocera carambolae Drew e Hancock, 1994' },
      { imageSrc: '/assets/icones/fruta-icone.png', label: 'Culturas afetadas', value: 'Carambola, goiaba, manga, maracuja, acerola e mais de 100 especies de frutas' },
      { imageSrc: '/assets/icones/sintoma-icone.png', label: 'Sintomas', value: 'Frutos com picadas de oviposicao, queda precoce e larvas no interior dos frutos' },
      { imageSrc: '/assets/icones/localizacao-icone.png', label: 'Situacao no Brasil', value: 'Presente no Amapa desde 1996 — area sob quarentena e controle oficial rigoroso do MAPA' },
      { imageSrc: '/assets/icones/prejuizo-icone.png', label: 'Risco', value: 'Se se espalhar pelo Brasil, pode causar bilhoes em prejuizos e fechar mercados de exportacao' },
    ],
    callouts: [
      {
        variant: 'red',
        imageSrc: '/assets/icones/alerta-icone.png',
        title: 'Área sob controle oficial!',
        text: 'O Amapá tem barreiras fitossanitárias oficiais para impedir que a mosca-da-carambola se espalhe para outros estados. Não transportar frutas frescas do Amapá sem autorização é uma obrigação legal!',
      },
      {
        variant: 'green',
        imageSrc: '/assets/icones/pesquisa-icone.png',
        title: 'Pesquisa em andamento',
        text: 'A Embrapa e o MAPA trabalham juntos em programas de controle biológico e da Técnica do Inseto Estéril para reduzir a população da mosca-da-carambola no Amapá, protegendo a fruticultura regional.',
      },
    ],
    personaText:
      'A mosca-da-carambola é a mais famosa praga do Amapá! Ela chegou aqui de outros países e hoje é nosso maior desafio fitossanitário. Por isso o Amapá tem regras especiais: não podemos levar frutas frescas daqui para outros estados sem autorização!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona-fito/dona-fito-alert.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 18 — O IMPACTO NA SUA VIDA
  ───────────────────────────────────────────────────── */
  {
    type: 'chain',
    interactionType: 'standard',
    id: 'p18',
    label: 'O Impacto na Sua Vida',
    badgeLabel: 'Conexão com a vida real',
    heroImageSrc: '/assets/cenarios/familia-mesa-comida.png',
    heroTitle: 'Sem Fitossanidade =',
    heroHighlight: 'menos comida na mesa',
    heroSubtitle:
      'Entender a fitossanidade não é só para cientistas. É para qualquer pessoa que come, que compra e que se preocupa com o futuro do planeta.',
    sectionHeading: 'Como isso chega até você?',
    leadText: 'Veja a cadeia de impactos quando pragas não são controladas:',
    chainItems: [
      { imageSrc: '/assets/icones/praga-entra-icone.png', text: 'Uma praga entra no país sem controle fitossanitário' },
      { imageSrc: '/assets/icones/lavoura-atacada-icone.png', text: 'Ela se espalha pelas lavouras de mandioca, açai e frutas' },
      { imageSrc: '/assets/icones/producao-cai-icone.png', text: 'A produção cai drasticamente e os agricultores perdem renda' },
      { imageSrc: '/assets/icones/mercado-icone.png', text: 'Os alimentos ficam escassos e mais caros nos mercados' },
      { imageSrc: '/assets/icones/familia-icone.png', text: 'Familias tem menos acesso a alimentos nutritivos e acessiveis' },
      { imageSrc: '/assets/icones/ecossistema-icone.png', text: 'O meio ambiente sofre com o desequilibrio ecologico' },
    ],
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/assets/icones/coracao-icone.png',
        title: 'Você pode fazer a diferença!',
        text: 'Não transporte plantas ou frutas de regiões desconhecidas. Compre produtos com selos de qualidade. Apoie agricultores locais. Essas atitudes simples ajudam a manter a fitossanidade da nossa região!',
      },
    ],
    personaText:
      'Cada vez que você compra uma fruta saudável e barata no mercado, é porque alguém trabalhou duro para proteger a lavoura! A fitossanidade está na sua mesa todo dia — só que você não sabia disso. Agora sabe!',
    personaEmotion: 'pointing',
    personaImageSrc: '/assets/dona-fito/dona-fito-pointing.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 19 — JOGO RÁPIDO: ENCONTRE O HERÓI!
  ───────────────────────────────────────────────────── */
  {
    type: 'find-the-hero',
    interactionType: 'find-the-hero',
    id: 'p19',
    label: 'Jogo: Encontre o Herói!',
    badgeLabel: 'Mini-Jogo Interativo',
    title: 'Encontre o Herói!',
    subtitle: 'Clique em cada ser vivo e diga se ele é um herói (aliado da lavoura) ou um vilão (praga). Você consegue acertar todos?',
    characters: [
      {
        id: 'joaninha',
        imageSrc: '/assets/jogos/personagens/joaninha.png',
        name: 'Joaninha',
        isHero: true,
        revealText: 'HERÓI! A joaninha come pulgões e outros insetos praga. Ela é uma das melhores aliadas da lavoura!',
      },
      {
        id: 'pulgao',
        imageSrc: '/assets/jogos/personagens/pulgao.png',
        name: 'Pulgão',
        isHero: false,
        revealText: 'VILÃO! O pulgão suga a seiva das plantas e transmite vírus. Um dos mais comuns inimigos da lavoura!',
      },
      {
        id: 'abelha',
        imageSrc: '/assets/jogos/personagens/abelha.png',
        name: 'Abelha',
        isHero: true,
        revealText: 'HERÓI! A abelha poliniza as flores das plantas, garantindo que elas produzam frutos. Sem abelhas, sem frutas!',
      },
      {
        id: 'gafanhoto',
        imageSrc: '/assets/jogos/personagens/gafanhoto.png',
        name: 'Gafanhoto',
        isHero: false,
        revealText: 'VILÃO! Em enxames, os gafanhotos podem destruir campos inteiros de plantação em poucas horas!',
      },
      {
        id: 'minhoca',
        imageSrc: '/assets/jogos/personagens/minhoca.png',
        name: 'Minhoca',
        isHero: true,
        revealText: 'HERÓI! A minhoca aerifica o solo e produz húmus, melhorando a saúde do solo e ajudando as raízes das plantas!',
      },
      {
        id: 'fungo-ferrugem',
        imageSrc: '/assets/jogos/personagens/fungo-ferrugem.png',
        name: 'Fungo da Ferrugem',
        isHero: false,
        revealText: 'VILÃO! A ferrugem é um fungo que deixa manchas alaranjadas nas folhas e pode destruir lavouras inteiras de soja e trigo!',
      },
    ],
    callouts: [
      {
        variant: 'green',
        imageSrc: '/assets/icones/trofeu-icone.png',
        title: 'Parabéns por aprender!',
        text: 'Distinguir heróis de vilões na natureza é o primeiro passo para um manejo sustentável da lavoura. Agricultores que conhecem seus aliados naturais usam menos agrotoxicos e tem melhores colheitas!',
      },
    ],
    personaText:
      'Você consegue separar os heróis dos vilões? Cada ser vivo tem um papel na natureza — cabe a nós entender esse papel! Clique em cada personagem e descubra se ele é aliado ou inimigo da lavoura!',
    personaEmotion: 'happy',
    personaImageSrc: '/assets/dona-fito/dona-fito-happy.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 20 — QUIZ FINAL
  ───────────────────────────────────────────────────── */
  {
    type: 'quiz',
    interactionType: 'quiz',
    id: 'p20',
    label: 'Quiz Final',
    badgeLabel: 'Avaliação de Aprendizagem',
    personaText:
      'É hora de colocar tudo que você aprendeu a prova! Não se preocupe se errar — cada erro é uma nova chance de aprender. Você já chegou até aqui, isso por si só é uma grande conquista!',
    personaEmotion: 'celebrating',
    personaImageSrc: '/assets/dona-fito/dona-fito-celebrating.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 21 — MENSAGEM FINAL
  ───────────────────────────────────────────────────── */
  {
    type: 'closing',
    interactionType: 'closing',
    id: 'p21',
    label: 'Mensagem Final',
    heroImageSrc: '/assets/cenarios/paisagem-amapa-sustentavel.png',
    heroTitle: 'Ciencia, Sustentabilidade\ne Você!',
    heroSubtitle:
      'Você chegou ao final desta jornada pelo mundo da Fitossanidade! Cada conhecimento adquirido aqui é uma semente plantada para um futuro mais sustentável e seguro para todos nós.',
    pillars: [
      { imageSrc: '/assets/icones/ciencia-pilar-icone.png', label: 'Ciencia', sub: 'Pesquisa que protege a vida' },
      { imageSrc: '/assets/icones/sustentabilidade-pilar-icone.png', label: 'Sustentabilidade', sub: 'Usar sem destruir' },
      { imageSrc: '/assets/icones/comunidade-pilar-icone.png', label: 'Comunidade', sub: 'Unidos pela natureza' },
      { imageSrc: '/assets/icones/futuro-pilar-icone.png', label: 'Futuro', sub: 'Sementes de esperanca' },
    ],
    ctaText: 'Fitossanidade e responsabilidade de todos!',
    ctaSub: 'Compartilhe o que aprendeu. Cada pessoa informada é um guardião das nossas plantas.',
    callout: {
      variant: 'green',
      imageSrc: '/assets/icones/livro-icone.png',
      title: 'Continue sua jornada de aprendizagem!',
      text: 'Explore os outros modulos do EducaFito, converse com agricultores da sua região, visite a Embrapa Amapá e descubra como a ciência está trabalhando para proteger nossas lavouras e nossa biodiversidade amazônica.',
    },
    footerText: 'EducaFito — Aprendendo com a natureza, crescendo com o conhecimento.',
    personaText:
      'Parabéns, jovem cientista! Você completou a cartilha EducaFito! Agora você é parte da rede de proteção das nossas plantas. Lembre-se: cada atitude nossa conta para proteger a natureza e garantir comida na mesa de todos!',
    personaEmotion: 'celebrating',
    personaImageSrc: '/assets/dona-fito/dona-fito-celebrating.png',
  },
]

/* ══════════════════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════════════════ */

/** Total de paginas — use em CartilhaPage para o PageController */
export const TOTAL_PAGES = CARTILHA_PAGES.length

/** Retorna a pagina pelo indice, com tipo seguro */
export function getPage(index: number): CartilhaPageData {
  const page = CARTILHA_PAGES[index]
  if (!page) throw new RangeError(`Pagina ${index} não existe. Total: ${TOTAL_PAGES}`)
  return page
}

/** Retorna apenas paginas com LiftTheFlap para pre-renderizacao */
export function getLapbookPages(): PageLapbookData[] {
  return CARTILHA_PAGES.filter((p): p is PageLapbookData => p.type === 'lapbook')
}

/** Retorna o indice de uma pagina pelo seu id */
export function getPageIndexById(id: string): number {
  const index = CARTILHA_PAGES.findIndex((p) => p.id === id)
  if (index === -1) throw new Error(`Pagina com id "${id}" não encontrada.`)
  return index
}
