/* ══════════════════════════════════════════════════════════════════════════
   cartilha-data.ts — EducaFito
   Refatoração completa: 21 páginas | Persona Dona Fito | imageSrc | Flaps
   Versão: 2.0.0
══════════════════════════════════════════════════════════════════════════ */

import { Avatar } from "@chakra-ui/react"
import { ElementType } from "react"
import { Droplet, Leaf, Sprout } from "lucide-react"

/* ─────────────────────────────────────────────────────────────────────────
   PRIMITIVOS COMPARTILHADOS
───────────────────────────────────────────────────────────────────────── */

/** Variantes de callout/alerta disponíveis no design system */
export type CalloutVariant = 'green' | 'yellow' | 'red'

/** Variante de acento do LiftTheFlap */
export type FlapAccent = 'green' | 'yellow' | 'red' | 'teal'

/** Categoria de microorganismo para o hotspot */
export type MicroorgCategory = 'fungo' | 'bacteria' | 'virus' | 'fitoplasma'

/** Tipo de interação da página — usado para selecionar o layout correto */
export type InteractionType =
  | 'standard'       // Página de conteúdo textual clássico
  | 'lift-the-flap'  // Abas interativas (LiftTheFlap)
  | 'hotspot'        // Lente de Investigação (Hotspot Interativo)
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
  imageSize?: number
  imageCircular?: boolean
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
  /** Define o estilo do card. 'icon' (default) ou 'full' para preencher. */
  display?: 'icon' | 'full'
}

/** Ficha interativa de uma planta invasora */
export interface InvasivePlantCardData extends ImageCardData {
  whatItSteals: string
  impact: string
}

/** Ficha interativa de um aliado natural da lavoura */
export interface AllyCardData extends ImageCardData {
  role: string
  benefit: string
}

/** Uma tag de categoria (cover-tags, etc.) */
export interface TagData {
  label: string
}

/** Card de estatística para páginas de impacto */
export interface StatCardData {
  gradient: string
  icon?: ElementType
  imageSrc?: string
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
  studentImpact?: string
}

/** Pilar da página de encerramento */
export interface PillarData {
  imageSrc: string
  label: string
  sub: string
}

/**
 * Item de microorganismo para a página de Hotspot Interativo.
 * Cada item representa uma doença/patógeno com imagem de fundo e card informativo.
 */
export interface HotspotItemData {
  /** Identificador único */
  id: string
  /** Nome da doença/patógeno */
  name: string
  /** Categoria para coloração do badge */
  category: MicroorgCategory
  /** URL da imagem de fundo do card (foto da doença na folha/fruto) */
  backgroundImageSrc: string
  /** Texto principal de explicação */
  concept: string
  /** Como o agente causador se dissemina no campo */
  spreadText: string
  /** Texto de alerta/impacto (aparece em destaque vermelho) */
  impactText?: string
  /** Texto de prevenção (aparece em destaque amarelo) */
  preventionText?: string
}

/** Card de alerta de praga quarentenária */
export interface PragaAlertCardData {
  bg: string
  imageSrc: string
  title: string
  desc: string
  status: string
  economicRisk: string
  howToAct: string
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
  invasiveCards?: InvasivePlantCardData[]
  allyCards?: AllyCardData[]
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

/**
 * HOTSPOT — Página de Lente de Investigação com imagens interativas
 */
export interface PageHotspotData extends PersonaBlock {
  type: 'hotspot'
  interactionType: 'hotspot'
  id: string
  label: string
  badgeLabel: string
  title: string
  titleHighlight?: string
  titleSuffix?: string
  leadText: string
  items: HotspotItemData[]
  callouts?: CalloutData[]
}

/**
 * Item da galeria de pragas — exibido em card e expandido em modal.
 */
export interface PestGalleryItemData {
  /** Identificador único do item */
  id: number
  /** Nome popular da praga */
  name: string
  /** Caminho da imagem representativa */
  imageSrc: string
  /** Descrição didática exibida no modal */
  description: string
  /** Tipo de dano causado na planta */
  damageType?: string
  /** Dica para identificação em campo */
  fieldTip?: string
}

/**
 * GALERIA DE PRAGAS — Página 05 (substitui Lapbook)
 * Grid de cards clicáveis que abrem modais informativos via Chakra UI.
 */
export interface PagePestGalleryData extends PersonaBlock {
  type: 'pest-gallery'
  interactionType: 'standard'
  id: string
  label: string
  badgeLabel: string
  title: string
  titleHighlight?: string
  titleSuffix?: string
  leadText: string
  pestGalleryItems: PestGalleryItemData[]
  callouts?: CalloutData[]
}

/**
 * AMAPA CASES — Pagina dos Casos Reais do Amapa com design Dossie Investigativo 3D.
 * Renderiza o AmapaCasesSection (Antigravity + Glassmorphism).
 */
export interface PageAmapaCasesData extends PersonaBlock {
  type: 'amapa-cases'
  interactionType: 'standard'
  id: string
  label: string
  badgeLabel: string
}

/** Union type de todos os tipos de página */
export type CartilhaPageData =
  | PageCoverData
  | PageContentData
  | PageLapbookData
  | PagePestGalleryData
  | PageHotspotData
  | PageImpactData
  | PageAlertData
  | PageOrgaosData
  | PageCaseData
  | PageChainData
  | PageQuizData
  | PageFindTheHeroData
  | PageClosingData
  | PageAmapaCasesData

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
      { imageSrc: '/images/doencas/fitoplasma.webp', label: 'O que são pragas e doenças', alt: 'Ilustração de doença de planta causada por Fitoplasma', display: 'full' },
      { imageSrc: '/images/agricultura/irrigation.webp', label: 'Como afetam a agricultura', alt: 'Imagem de sistema de irrigação em uma lavoura', display: 'full' },
      { imageSrc: '/images/metodo de controle/pulverizacao correta.webp', label: 'Como nos protegemos delas', alt: 'Imagem de um agricultor aplicando defensivos corretamente', display: 'full' },
      { imageSrc: '/images/pragas/mosca da carambola/1.webp', label: 'Casos reais do Amapá', alt: 'Imagem da Mosca da Carambola, uma praga relevante para o Amapá', display: 'full' },
    ],
    topCallout: {
      variant: 'green',
      imageSrc: '/dona_fito_meio_corpo.webp',
      title: 'Olá, futuro cientista!',
      text: 'Assim como nós, humanos, podemos ficar gripados ou com febre, as plantas também podem ser atacadas por "vilões" que as deixam fracas, feias e improdutivas. Esses vilões se chamam pragas e doenças.',
    },
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/assets/joaninha_corpo_todo.png',
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
        imageSrc: '/dona_fito_meio_corpo.webp',
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
    midSectionHeading: 'E o que acontece quando a fábrica é atacada?',
    midSectionText:
      'Quando pragas invadem a lavoura, é como se alguém danificasse as máquinas da fábrica. A produção cai, os alimentos ficam escassos e mais caros. E é por isso que a Fitossanidade é tão importante para nós, consumidores!',
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/joaninha_corpo_todo.webp',
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
      'Uma praga agrícola é qualquer organismo vivo — inseto, fungo, bactéria, vírus, planta invasora — que cause dano econômico a uma lavoura. Nem todo bichinho é uma praga! Só é praga quando causa prejuízo real ao agricultor.',
    statCards: [
      { gradient: 'linear-gradient(135deg, #2E7D32, #388E3C)', stat: '40%', label: 'das colheitas mundiais são perdidas por pragas, segundo a FAO.', textColor: 'white' },
      { gradient: 'linear-gradient(135deg, #F57F17, #FBC02D)', stat: 'R$ Bilhões', label: 'de prejuízo anual para o agronegócio brasileiro.', textColor: '#212121' },
      { gradient: 'linear-gradient(135deg, #37474F, #546E7A)', stat: 'Ecossistema', label: 'em risco por introdução de espécies invasoras exóticas.', textColor: 'white' },
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
     PÁGINA 05 — INSETOS E ÁCAROS (GALERIA DE CARDS COM MODAIS)
  ───────────────────────────────────────────────────── */
  {
    type: 'pest-gallery',
    interactionType: 'standard',
    id: 'p05',
    label: 'Insetos e Ácaros',
    badgeLabel: 'Galeria Interativa',
    title: 'Insetos e Ácaros: ',
    titleHighlight: 'Os Pequenos Vilões da Lavoura',
    leadText:
      'Clique em qualquer card para conhecer de perto esses organismos que causam grandes prejuízos nas lavouras. Identificar o invasor é o primeiro passo para combatê-lo.',
    pestGalleryItems: [
      {
        id: 1,
        name: 'Gafanhoto',
        imageSrc: 'https://images.unsplash.com/photo-1533318087102-b3ad366ed041',
        damageType: 'Desfolha folhas, caules e frutos ao se alimentar em grandes quantidades.',
        fieldTip: 'Procure folhas mastigadas e a presença de adultos ou ninfas saltadoras.',
        description:
          'O gafanhoto é um inseto que voa em enxames gigantes e pode destruir campos inteiros de cultivo em poucas horas. Quando milhoes deles voam juntos, chamamos de praga de gafanhotos — um dos maiores pesadelos dos agricultores. Seu aparato bucal mastigador devasta folhas, caules e frutos de forma extremamente rapida.',
      },
      {
        id: 2,
        name: 'Pulgão',
        imageSrc: '/images/ameacas/pulgoes/pulgao.webp',
        damageType: 'Suga a seiva e pode transmitir vírus entre plantas.',
        fieldTip: 'Observe colônias pequenas na face inferior das folhas e brotos novos.',
        description:
          'O pulgão é um inseto minúsculo que suga a seiva das plantas, enfraquecendo-as progressivamente. Ele se reproduz com velocidade impressionante e pode cobrir toda uma planta em poucos dias. Além do dano direto, atua como vetor de vírus fitopatogênicos, transmitindo doenças de planta para planta durante a alimentação.',
      },
      {
        id: 3,
        name: 'Mosca-branca',
        imageSrc: '/images/ameacas/mosca branca/1.webp',
        damageType: 'Suga a seiva, causa clorose e favorece a fumagina nas folhas.',
        fieldTip: 'Toque a planta e observe pequenos insetos brancos levantando voo.',
        description:
          'A mosca-branca é um inseto de pequeno porte que coloniza a face abaxial das folhas. Ela suga a seiva, provoca clorose foliar e excreta honeydew, favorecendo o desenvolvimento de fumagina. Sua alta capacidade de transmissão de geminiviruses representa uma das maiores ameaças fitossanitárias para culturas como tomate, feijão e mandioca.',
      },
      {
        id: 4,
        name: 'Broca',
        imageSrc: '/images/pragas/mosca negra dos citros/1.webp',
        damageType: 'Perfura caules, frutos ou raízes, comprometendo os tecidos por dentro.',
        fieldTip: 'Procure orifícios, serragem e galerias em caules, frutos ou raízes.',
        description:
          'A broca é a larva de diversas espécies de insetos das ordens Coleoptera e Lepidoptera. Ela perfura e escava o interior do caule, fruto ou raiz da planta, tornando os danos internos invisíveis até que o estrago já seja irreversível. O controle é especialmente difícil porque o inseto fica protegido dentro do tecido vegetal.',
      },
      {
        id: 5,
        name: 'Ácaro',
        imageSrc: '/images/ameacas/acaro/1.webp',
        damageType: 'Suga o conteúdo das células e provoca bronzeamento e queda das folhas.',
        fieldTip: 'Verifique pontilhado amarelado, teias finas e folhas bronzeadas em tempo seco.',
        description:
          'Os ácaros são artropodes aracnídeos de dimensões microscópicas, difíceis de visualizar a olho nu. Eles vivem na epiderme foliar e sugam o conteudo celular, causando bronzeamento, manchas amareladas e queda precoce de folhas. Em periodos de seca e calor intenso, sua velocidade de reproducao aumenta drasticamente, agravando as infestacoes.',
      },
      {
        id: 6,
        name: 'Trips',
        imageSrc: '/images/ameacas/mosca branca/2.webp',
        damageType: 'Raspa e suga células, causando estrias prateadas e transmitindo vírus.',
        fieldTip: 'Observe estrias prateadas em folhas e frutos e insetos muito pequenos e estreitos.',
        description:
          'O trips é um inseto da ordem Thysanoptera de tamanho diminuto, quase imperceptível a olho nu. Ele raspa e suga as células epidérmicas das plantas, provocando estrias prateadas ou douradas características em folhas e frutos. Adicionalmente, é vetor de tospovirus altamente agressivos, como o Tomato spotted wilt virus (TSWV), que não tem cura nas plantas infectadas.',
      },
    ],
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/joaninha_corpo_todo.webp',
        title: 'Atenção!',
        text: 'Nem todo inseto é praga! Abelhas, joaninhas e vespinhas parasitoides são aliadas da lavoura. Conhecer os benefícios e os prejudiciais é essencial para um manejo agrícola responsável.',
      },
    ],
    personaText:
      'Que turma! Insetos e ácaros são os mais diversos vilões da lavoura. Clique em cada card para conhecê-los de perto e aprender como nos defendemos deles.',
    personaEmotion: 'pointing',
    personaImageSrc: '/assets/dona-fito/dona-fito-pointing.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 06 — FUNGOS, BACTÉRIAS E VÍRUS (HOTSPOT INTERATIVO)
  ───────────────────────────────────────────────────── */
  {
    type: 'hotspot',
    interactionType: 'hotspot',
    id: 'p06',
    label: 'Fungos, Bactérias e Vírus',
    badgeLabel: 'Lente de Investigação',
    title: 'Os Invasores ',
    titleHighlight: 'Invisíveis',
    titleSuffix: ' das Plantas',
    leadText:
      'Fungos, bactérias e vírus são micro-organismos que adoecem as plantas. Clique em cada imagem para investigar o que está acontecendo com essa folha ou fruto!',
    items: [
      {
        id: 'fungo-ferrugem',
        name: 'Ferrugem',
        category: 'fungo',
        backgroundImageSrc: '/images/sintomas/clorose.webp',
        concept:
          'A ferrugem é uma doença causada por fungos que deixam manchas alaranjadas ou marrons nas folhas, semelhantes à ferrugem de metal. Ela se espalha pelo vento e pode destruir lavouras de soja ou trigo em poucos dias!',
        spreadText:
          'Os esporos são carregados pelo vento e também podem viajar em respingos de chuva e ferramentas contaminadas.',
        impactText:
          'Pode causar perdas de até 70% da colheita de soja. Uma das doenças fúngicas mais destrutivas do agronegócio brasileiro.',
        preventionText:
          'Use variedades resistentes e fungicidas preventivos. O monitoramento precoce é fundamental!',
      },
      {
        id: 'fungo-antracnose',
        name: 'Antracnose',
        category: 'fungo',
        backgroundImageSrc: '/images/sintomas/podridao.webp',
        concept:
          'A antracnose é causada por fungos do gênero Colletotrichum. Provoca manchas escuras e afundadas nos frutos de manga, mamão e tomate. Os frutos apodrecem antes de amadurecer, ficando impróprios para venda.',
        spreadText:
          'A chuva e a irrigação espalham os esporos entre folhas e frutos; restos de plantas e ferramentas contaminadas também transportam o fungo.',
        impactText:
          'Muito comum no clima úmido da Amazônia. Frutos infectados perdem completamente o valor comercial.',
        preventionText:
          'Evite excesso de umidade, faça colheita no tempo certo e aplique fungicidas cúpricos como medida preventiva.',
      },
      {
        id: 'fungo-requeima',
        name: 'Requeima',
        category: 'fungo',
        backgroundImageSrc: '/images/sintomas/necrose.webp',
        concept:
          'A requeima, causada pelo oomiceto Phytophthora infestans, foi responsável pela Grande Fome da Irlanda no século XIX! Ela ataca batata, tomate e pimenta, provocando o apodrecimento rápido e total das plantas.',
        spreadText:
          'Esporos são levados pelo vento e por respingos de chuva, especialmente em períodos frios e muito úmidos.',
        impactText:
          'Em condições ideais de umidade e frio, pode destruir uma lavoura de batata em apenas 10 dias. É considerada emergência fitossanitária.',
        preventionText:
          'Plante variedades resistentes, faça rotação de culturas e aplique fungicidas sistêmicos de forma preventiva.',
      },
      {
        id: 'bacteria-cancro',
        name: 'Cancro Cítrico',
        category: 'bacteria',
        backgroundImageSrc: '/images/sintomas/frutos com lesoes.webp',
        concept:
          'O cancro cítrico é uma doença bacteriana causada por Xanthomonas citri. Ataca laranjas, limões e outras frutas cítricas, causando lesões elevadas nas folhas, frutos e caules. Frutos infectados não podem ser exportados.',
        spreadText:
          'Respingos de chuva, vento, insetos e ferramentas contaminadas levam a bactéria de uma planta para outra.',
        impactText:
          'Prejuízo enorme para produtores: frutos com sintomas são descartados e a planta infectada deve ser erradicada por lei.',
        preventionText:
          'Utilize mudas certificadas, higienize ferramentas e evite trabalhar na lavoura com folhas molhadas. É de notificação obrigatória ao MAPA.',
      },
      {
        id: 'virus-mosaico',
        name: 'Vírus do Mosaico',
        category: 'virus',
        backgroundImageSrc: '/images/sintomas/murcha.webp',
        concept:
          'O vírus do mosaico (TMV, CMV e outros) deixa as folhas com padrão de manchas claras e escuras, parecendo um mosaico colorido. É transmitido por insetos vetores como pulgões. Afeta tomate, feijão, mandioca e muitas outras culturas.',
        spreadText:
          'Insetos vetores, como pulgões e moscas-brancas, transmitem o vírus; mãos e ferramentas contaminadas também podem espalhá-lo.',
        impactText:
          'Não existe cura para vírus em plantas. Uma vez infectada, a planta deve ser removida para evitar a disseminação para as vizinhas.',
        preventionText:
          'Controle os insetos vetores (pulgões, moscas-brancas), use mudas sadias e elimine imediatamente plantas sintomáticas.',
      },
      {
        id: 'fitoplasma',
        name: 'Fitoplasma',
        category: 'fitoplasma',
        backgroundImageSrc: '/images/doencas/fitoplasma.webp',
        concept:
          'O fitoplasma é um micro-organismo que vive dentro dos vasos condutores da planta (floema). Causa o amarelecimento letal de palmeiras como açaí, coco e dendê — sem cura conhecida! É transmitido por cigarrinhas e outros insetos vetores.',
        spreadText:
          'Cigarrinhas e outros insetos vetores adquirem o fitoplasma de plantas doentes e o transmitem ao se alimentarem de plantas saudáveis.',
        impactText:
          'O amarelecimento fatal do coqueiro já destruiu milhões de palmeiras no Brasil. A doença é irreversível e a planta morre em poucos meses após a infecção.',
        preventionText:
          'Controle rigoroso dos insetos vetores e erradicação imediata de palmeiras sintomáticas. Não existe tratamento curativo.',
      },
    ],
    callouts: [
      {
        variant: 'green',
        imageSrc: '/dona_fito_meio_corpo.webp',
        title: 'A prevenção é sempre melhor!',
        text: 'Fungos e bactérias se espalham pela água, pelo vento e por ferramentas contaminadas. Higienizar os instrumentos agrícolas, usar sementes certificadas e evitar o excesso de água são formas simples de prevenir essas doenças!',
      },
    ],
    personaText:
      'Esses inimigos são invisíveis a olho nu, mas causam estragos enormes! Fungos, bactérias e vírus são os "germes das plantas". Clique em cada imagem para investigar o que está acontecendo!',
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
    titleHighlight: 'roubam espaço',
    titleSuffix: ' das outras!',
    heroImageSrc: '/assets/pragas/plantas-invasoras/erva-daninha-lavoura.png',
    leadText:
      'Plantas invasoras (ou ervas daninhas) são plantas que crescem onde não são desejadas e competem com as plantas cultivadas por água, luz e nutrientes do solo. E uma disputa por recursos — e a planta da lavoura quem perde!',
    invasiveCards: [
      {
        imageSrc: '/images/ameacas/plantas invasoras/1.webp',
        label: 'Tiririca',
        alt: 'Tiririca invasora',
        whatItSteals: 'Água, luz e nutrientes, graças às raízes e estruturas subterrâneas que ocupam o solo.',
        impact: 'Forma manchas densas e compete diretamente com a cultura, reduzindo o crescimento e a produtividade.',
      },
      {
        imageSrc: '/images/ameacas/plantas invasoras/2.webp',
        label: 'Capim-colônia',
        alt: 'Capim-colônia invasor',
        whatItSteals: 'Água, luz e nutrientes da lavoura e das pastagens ao formar touceiras muito fechadas.',
        impact: 'Sufoca plantas jovens, dificulta o manejo e reduz o espaço disponível para a cultura se desenvolver.',
      },
      {
        imageSrc: '/images/ameacas/plantas invasoras/1.webp',
        label: 'Picão-preto',
        alt: 'Picão-preto invasor',
        whatItSteals: 'Água, luz e nutrientes, além de espaço para suas raízes e folhas se espalharem.',
        impact: 'Pode liberar substâncias que atrapalham outras plantas e competir com diversas culturas anuais.',
      },
      {
        imageSrc: '/images/ameacas/plantas invasoras/2.webp',
        label: 'Buva',
        alt: 'Buva invasora resistente',
        whatItSteals: 'Água, luz e nutrientes durante todo o ciclo da lavoura, especialmente quando cresce cedo.',
        impact: 'É difícil de controlar em algumas áreas e pode produzir muitas sementes, comprometendo a colheita.',
      },
    ],
    midSectionHeading: 'Por que são um problema sério?',
    midSectionText:
      'Uma única planta invasora pode produzir milhares de sementes que ficam no solo por anos! Além de roubar nutrientes, algumas liberam substâncias químicas que inibem o crescimento das plantas ao redor. O controle precoce é fundamental!',
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/joaninha_corpo_todo.webp',
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
    allyCards: [
      {
        imageSrc: '/images/encontre_herois/joaninha.webp',
        label: 'Joaninha',
        alt: 'Joaninha predadora de pulgões',
        role: 'Alimenta-se de pulgões e outros pequenos insetos que sugam a seiva das plantas.',
        benefit: 'Ajuda a controlar pragas naturalmente, reduzindo a necessidade de inseticidas.',
      },
      {
        imageSrc: '/images/aliados/abelha.webp',
        label: 'Abelha',
        alt: 'Abelha polinizando uma flor',
        role: 'Transporta pólen entre as flores e favorece a formação de frutos e sementes.',
        benefit: 'Melhora a polinização e a produtividade de culturas, sem depender de produtos químicos.',
      },
      {
        imageSrc: '/images/aliados/vespa.webp',
        label: 'Vespinha',
        alt: 'Vespinha parasitoide',
        role: 'Parasita ovos e larvas de pragas, impedindo que elas cheguem à fase adulta.',
        benefit: 'Faz o controle biológico de forma específica e ajuda a preservar a lavoura.',
      },
      {
        imageSrc: '/images/aliados/larva.webp',
        label: 'Aranha',
        alt: 'Aranha predadora de insetos',
        role: 'Captura e come diversos insetos que circulam entre as folhas e o solo.',
        benefit: 'Reduz a população de pragas sem custo para o agricultor e sem contaminar o ambiente.',
      },
      {
        imageSrc: '/images/agricultura/ghabiru-plantation.webp',
        label: 'Gavião',
        alt: 'Gavião predador de roedores',
        role: 'Preda roedores e outros animais que podem danificar sementes, raízes e frutos.',
        benefit: 'Ajuda a manter o equilíbrio da área e diminui perdas sem o uso de venenos.',
      },
      {
        imageSrc: '/images/fungos/vassoura-da-bruxa-mandioca.webp',
        label: 'Fungos Bons',
        alt: 'Fungo benéfico usado no controle biológico',
        role: 'Infectam algumas pragas e interrompem seu desenvolvimento, sem atacar a cultura.',
        benefit: 'Podem substituir parte dos agrotóxicos e tornar o manejo mais seguro e sustentável.',
      },
    ],
    midSectionHeading: 'O que é Controle Biológico?',
    midSectionText:
      'Controle biológico é usar esses seres naturais para combater as pragas! Em vez de usar agrotoxicos, os agricultores podem criar e soltar joaninhas, vespinhas ou fungos bons na lavoura. É sustentável, barato e não polui o ambiente!',
    callouts: [
      {
        variant: 'green',
        imageSrc: '/dona_fito_meio_corpo.webp',
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
  { 
    gradient: 'linear-gradient(135deg, #2E7D32, #388E3C)', 
    icon: Leaf, 
    stat: 'Folhas', 
    label: 'Insetos desfolhadores destroem a capacidade da planta de fazer fotossíntese.', 
    textColor: 'white' 
  },
  { 
    gradient: 'linear-gradient(135deg, #E65100, #EF6C00)', 
    icon: Sprout, 
    stat: 'Raiz', 
    label: 'Nematoides e larvas subterrâneas atacam as raízes, impedindo a absorção de água.', 
    textColor: 'white' 
  },
  { 
    gradient: 'linear-gradient(135deg, #37474F, #546E7A)', 
    icon: Droplet, 
    stat: 'Seiva', 
    label: 'Pulgões, ácaros e moscas sugam a seiva, enfraquecendo gradativamente a planta.', 
    textColor: 'white' 
  },
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
        imageSrc: '/assets/joaninha_corpo_todo.png',
        title: 'Por que o nome "Quarentenária"?',
        text: 'O termo vem de "quarentena" — o periodo de isolamento usado para evitar a propagação de doenças. Assim como fazemos quarentena para proteger as pessoas, fazemos quarentena fitossanitária para proteger as plantas!',
      },
    ],
    pragaCards: [
      {
        bg: 'linear-gradient(135deg,#B71C1C,#C62828)',
        imageSrc: '/images/pragas/mosca da carambola/1.webp',
        title: 'Mosca-da-carambola',
        desc: 'Detectada no Amapá, ameaça frutas em todo o território nacional.',
        status: 'Presente no Amapá — Quarentena A1.',
        economicRisk: 'Ataca diversas frutas e pode provocar perdas de produção e bloqueios de exportação.',
        howToAct: 'Não transporte frutas sem origem comprovada. Denuncie suspeitas e aguarde a fiscalização sanitária.',
      },
      {
        bg: 'linear-gradient(135deg,#8B1E1E,#C62828)',
        imageSrc: '/images/doencas/fitoplasma.webp',
        title: 'Huanglongbing (HLB)',
        desc: 'Doença bacteriana devastadora para citros, sem cura conhecida.',
        status: 'Monitorado no Brasil — risco quarentenário para novas áreas.',
        economicRisk: 'Reduz a produção de citros, compromete pomares e pode impedir a comercialização e exportação.',
        howToAct: 'Use mudas certificadas, comunique sintomas e siga as orientações dos órgãos de defesa agropecuária.',
      },
      {
        bg: 'linear-gradient(135deg,#B71C1C,#E65100)',
        imageSrc: '/images/pragas/vespa velutina/1.webp',
        title: 'Vespa Velutina',
        desc: 'Predadora de abelhas nativas, com risco à polinização e à apicultura.',
        status: 'Alerta de vigilância — ocorrência deve ser comunicada às autoridades.',
        economicRisk: 'Reduz colônias de abelhas, ameaça a polinização e pode afetar a produção de mel e frutas.',
        howToAct: 'Não manipule ninhos. Registre o local, mantenha distância e denuncie para a fiscalização sanitária.',
      },
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
      'Por trás de cada solução fitossanitária existe um pesquisador dedicado! Essas pessoas estudam pragas, desenvolvem novas variedades de plantas resistentes e criam métodos de controle sustentáveis.',
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
    badgeLabel: 'Boas Práticas',
    lapbookBadge: 'PREVENÇÃO E MANEJO',
    lapbookTitle: 'Como Evitar e Controlar as Pragas Agrícolas?',
    lapbookSubtitle: 'Arraste ou clique nos cartões para classificar as atitudes de proteção da lavoura!',
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
     PÁGINA 13.5 — CASOS REAIS DO AMAPÁ (DOSSIE 3D)
  ───────────────────────────────────────────────────── */
  {
    type: 'amapa-cases',
    interactionType: 'standard',
    id: 'p13b',
    label: 'Casos Reais do Amapá',
    badgeLabel: 'Dossie Fitossanitário',
    personaText: 'Investigue os detalhes de cada ameaça acima e veja como podemos defender o nosso Amapá!',
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
    heroTitle: 'Sem Fitossanidade = Menos Comida na Mesa',
    heroHighlight: '',
    heroSubtitle:
      'Entender a fitossanidade não é só para cientistas. É para qualquer pessoa que come, que compra e que se preocupa com o futuro do planeta.',
    sectionHeading: 'Como isso chega até você?',
    leadText: 'Veja a cadeia de impactos quando pragas não são controladas:',
    chainItems: [
      { imageSrc: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec', text: 'Uma praga entra no país sem controle fitossanitário', studentImpact: 'A fiscalização protege as plantas que chegam à nossa região e evita que novas pragas alcancem as lavouras.' },
      { imageSrc: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5', text: 'Ela se espalha pelas lavouras de mandioca, açaí e frutas', studentImpact: 'Quando a lavoura é atingida, os alimentos que fazem parte da sua rotina podem ficar mais difíceis de produzir.' },
      { imageSrc: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d', text: 'A produção cai drasticamente e os agricultores perdem renda', studentImpact: 'Menos colheita significa mais preocupação para as famílias produtoras e menos produtos disponíveis.' },
      { imageSrc: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e', text: 'Os alimentos ficam escassos e mais caros nos mercados', studentImpact: 'A queda na oferta pode aumentar os preços dos alimentos que sua família compra.' },
      { imageSrc: 'https://images.unsplash.com/photo-1547592180-85f173990554', text: 'Famílias têm menos acesso a alimentos nutritivos e acessíveis', studentImpact: 'Cuidar da saúde das plantas ajuda a manter refeições variadas e nutritivas na mesa.' },
      { imageSrc: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc', text: 'O meio ambiente sofre com o desequilíbrio ecológico', studentImpact: 'Proteger a fitossanidade também preserva os seres vivos e os ambientes que você conhece.' },
    ],
    callouts: [
      {
        variant: 'yellow',
        imageSrc: '/joaninha_corpo_todo.webp',
        title: 'Você quer fazer a diferença?',
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
    badgeLabel: 'ATIVIDADE INTERATIVA',
    title: 'Descubra os Heróis e Vilões!',
    subtitle: 'Todo ser vivo tem um papel. Clique nos cards e descubra as características dos nossos heróis e vilões na natureza.',
    characters: [
      {
        id: 'joaninha',
        imageSrc: '/images/encontre_herois/joaninha.webp',
        name: 'Joaninha',
        isHero: true,
        revealText: 'A joaninha come pulgões e outros insetos praga. Ela é uma das melhores aliadas da lavoura!',
      },
      {
        id: 'pulgao',
        imageSrc: '/images/ameacas/pulgoes/4.webp',
        name: 'Pulgão',
        isHero: false,
        revealText: 'O pulgão suga a seiva das plantas e transmite vírus. Um dos mais comuns inimigos da lavoura!',
      },
      {
        id: 'abelha',
        imageSrc: '/images/encontre_herois/abelha.webp',
        name: 'Abelha',
        isHero: true,
        revealText: 'A abelha poliniza as flores das plantas, garantindo que elas produzam frutos. Sem abelhas, sem frutas!',
      },
      {
        id: 'gafanhoto',
        imageSrc: '/images/ameacas/gafanhoto/gafanhoto.webp',
        name: 'Gafanhoto',
        isHero: false,
        revealText: 'Em enxames, os gafanhotos podem destruir campos inteiros de plantação em poucas horas!',
      },
      {
        id: 'minhoca',
        imageSrc: '/images/encontre_herois/minhoca.webp',
        name: 'Minhoca',
        isHero: true,
        revealText: 'A minhoca aerifica o solo e produz húmus, melhorando a saúde do solo e ajudando as raízes das plantas!',
      },
      {
        id: 'fungo-ferrugem',
        imageSrc: '/images/encontre_herois/fungo-ferrugem.webp',
        name: 'Fungo da Ferrugem',
        isHero: false,
        revealText: 'A ferrugem é um fungo que deixa manchas alaranjadas nas folhas e pode destruir lavouras inteiras de soja e trigo!',
      },
    ],
    callouts: [
      {
        variant: 'green',
        imageSrc: '/assets//trofeu-icone.png',
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
