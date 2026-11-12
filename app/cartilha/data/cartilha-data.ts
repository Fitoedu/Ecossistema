/* ══════════════════════════════════════════════════════════════════════════
   cartilha-data.ts — EducaFito
   Refatoração completa: 20 páginas | Persona Dona Fito | imageSrc
   Versão: 2.0.0
══════════════════════════════════════════════════════════════════════════ */

import { ElementType } from "react"
import { Droplet, Leaf, Sprout } from "lucide-react"

/* ─────────────────────────────────────────────────────────────────────────
   PRIMITIVOS COMPARTILHADOS
───────────────────────────────────────────────────────────────────────── */

/** Variantes de callout/alerta disponíveis no design system */
export type CalloutVariant = 'green' | 'yellow' | 'red'

/** Categoria de microorganismo para o hotspot */
export type MicroorgCategory =
  | 'fungo'
  | 'bacteria'
  | 'virus'
  | 'fitoplasma'
  | 'nematoide'
  | 'protozoario'

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
  title: string
  text: string
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
  /** Exemplo de doença associada ao grupo */
  diseaseName: string
  /** Categoria para coloração do badge */
  category: MicroorgCategory
  /** Imagem real do sintoma ou doença exibida no card e no modal */
  image: string
  /** Texto principal de explicação */
  concept: string
  /** Sintomas descritos em linguagem acessível */
  symptomsText: string
  /** Texto alternativo da imagem do sintoma ou doença */
  imageAlt: string
  /** Como o agente causador se dissemina no campo */
  spreadText: string
  /** Texto de alerta/impacto (aparece em destaque vermelho) */
  impactText?: string
  /** Texto de prevenção (aparece em destaque amarelo) */
  preventionText?: string
}

/* ══════════════════════════════════════════════════════════════════════════
   TIPOS DE PÁGINA — cada type + interactionType mapeia para um layout
══════════════════════════════════════════════════════════════════════════ */

/**
 * CAPA — Página 1
 */
export interface PageCoverData extends PersonaBlock {
  type: 'cover'
  interactionType: 'cover'
  id: string
  label: string
  title: string
  highlight: string
  subtitle: string
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
}

/**
 * LAPBOOK — Página com abas interativas
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
  callouts?: CalloutData[]
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
  pestGroups?: string[]
  statCards: StatCardData[]
  impacts: ImpactItemData[]
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
 * GALERIA DE PRAGAS — Página 06 (substitui Lapbook)
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

/** PÁGINA DE APARELHOS BUCAIS — comparação interativa dos tipos de ataque */
export interface MouthpartCardData {
  id: 'chewing' | 'piercing-sucking'
  name: string
  howItWorks: string
  plantDamage: string
  examples: string[]
  imageSrc: string
  imageAlt: string
}

export interface PageMouthpartsData extends PersonaBlock {
  type: 'mouthparts'
  interactionType: 'mouthparts'
  id: string
  label: string
  badgeLabel: string
  title: string
  leadText: string
  mouthparts: MouthpartCardData[]
  tip: string
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
  | PageMouthpartsData
  | PageHotspotData
  | PageImpactData
  | PageAlertData
  | PageOrgaosData
  | PageChainData
  | PageQuizData
  | PageFindTheHeroData
  | PageClosingData
  | PageAmapaCasesData

/* ══════════════════════════════════════════════════════════════════════════
   DADOS — 20 ENTRADAS (Capa + 19 páginas)
══════════════════════════════════════════════════════════════════════════ */

export const CARTILHA_PAGES: CartilhaPageData[] = [

  /* ─────────────────────────────────────────────────────
     CAPA — Página 1
  ───────────────────────────────────────────────────── */
  {
    type: 'cover',
    interactionType: 'cover',
    id: 'p1',
    label: 'Capa',
    title: 'Educação Fitossanitária\npara o Ensino Básico',
    highlight: 'Fitossanitária',
    subtitle:
      'Aprenda de forma fácil sobre fitossanidade, pragas agrícolas, aliados naturais e práticas sustentáveis para proteger nossos cultivos agrícolas.',
    personaText:
      'Olá! Eu sou a Dona Fito, sua guia nessa aventura! Seja bem-vindo à nossa cartilha! Vamos aprender juntos sobre pragas agrícolas, aliados naturais e manejo sustentável para cuidar das plantas e proteger nossa comida!',
    personaEmotion: 'happy',
    personaImageSrc: '/assets/dona-fito/dona-fito-happy.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 2 — APRESENTAÇÃO
  ───────────────────────────────────────────────────── */
  {
    type: 'content',
    interactionType: 'standard',
    id: 'p2',
    label: 'Apresentação',
    badgeLabel: 'Apresentação',
    title: 'Você sabia que ',
    titleHighlight: 'plantas também ficam doentes?',
    leadText:
      'Nesta cartilha, você vai descobrir o mundo fascinante da Fitossanidade — a ciência que cuida da saúde das plantas. Vamos explorar juntos:',
    imageCards: [
      { imageSrc: '/images/doencas/fitoplasma.webp', label: 'O que são pragas agrícolas e doenças', alt: 'Ilustração de doença de planta causada por Fitoplasma', display: 'full' },
      { imageSrc: '/images/agricultura/irrigation.webp', label: 'Como afetam a agricultura', alt: 'Imagem de sistema de irrigação em cultivos agrícolas', display: 'full' },
      { imageSrc: '/images/metodo de controle/pulverizacao correta.webp', label: 'Como nos protegemos delas', alt: 'Imagem de um agricultor aplicando defensivos agrícolas corretamente', display: 'full' },
      { imageSrc: '/images/pragas/mosca da carambola/1.webp', label: 'Casos reais do Amapá', alt: 'Imagem da Mosca da Carambola, uma praga agrícola relevante para o Amapá', display: 'full' },
    ],
    topCallout: {
      variant: 'green',
      title: 'Olá, futuro cientista!',
      text: 'Assim como nós, humanos, podemos ficar gripados ou com febre, as plantas também podem ser atacadas por "vilões" que as deixam fracas, feias e improdutivas. Esses vilões se chamam pragas agrícolas e doenças.',
    },
    callouts: [
      {
        variant: 'yellow',
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
     PÁGINA 3 — O QUE É FITOSSANIDADE?
  ───────────────────────────────────────────────────── */
  {
    type: 'content',
    interactionType: 'standard',
    id: 'p3',
    label: 'Fitossanidade',
    badgeLabel: 'Conceito Base',
    title: 'O que é ',
    titleHighlight: 'Fitossanidade?',
    leadText:
      'A palavra Fitossânidade vem do grego phyton (planta) e do latim sanitas (saúde). É a área da ciência que cuida da saúde das plantas e garante que elas cresçam fortes e produtivas.',
    imageCards: [
      { imageSrc: '/assets/icones/lupa-icone.png', label: 'Estuda pragas agrícolas e doenças', alt: 'Lupa de pesquisa' },
      { imageSrc: '/assets/icones/escudo-icone.png', label: 'Previne e controla infestações', alt: 'Escudo de proteção' },
      { imageSrc: '/assets/icones/fronteira-icone.png', label: 'Protege fronteiras do comércio', alt: 'Símbolo de fronteira' },
      { imageSrc: '/assets/icones/ciencia-icone.png', label: 'Une ciência e agricultura', alt: 'Frasco de laboratorio' },
      { imageSrc: '/assets/icones/prato-icone.png', label: 'Garante alimentos saudáveis', alt: 'Prato com comida' },
      { imageSrc: '/assets/icones/biodiversidade-icone.png', label: 'Preserva a biodiversidade', alt: 'Folha verde' },
    ],
    midSectionHeading: 'Por que é importante?',
    midSectionText:
      'Sem Fitossanidade, pragas agrícolas e doenças se espalhariam livremente pelos cultivos agrícolas, destruindo colheitas inteiras. Isso significaria menos comida, aumento de preços e danos ao meio ambiente.',
    callouts: [
      {
        variant: 'green',
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
     PÁGINA 4 — O QUE É UMA PRAGA AGRÍCOLA?
  ───────────────────────────────────────────────────── */
  {
    type: 'impact',
    interactionType: 'standard',
    id: 'p4',
    label: 'Praga Agrícola',
    badgeLabel: 'Conceito de Praga Agrícola',
    title: 'O que é uma ',
    titleHighlight: 'Praga Agrícola?',
    leadText:
      'Pragas agrícolas incluem insetos, ácaros, microrganismos fitopatogênicos e plantas invasoras. Esses organismos podem causar danos às plantas e prejuízos econômicos à produção agrícola.',
    pestGroups: [
      'Insetos',
      'Ácaros',
      'Microrganismos fitopatogênicos',
      'Plantas invasoras',
    ],
    statCards: [
      { gradient: 'linear-gradient(135deg, #2E7D32, #388E3C)', stat: '40%', label: 'das colheitas mundiais são perdidas por pragas agrícolas, segundo a FAO.', textColor: 'white' },
      { gradient: 'linear-gradient(135deg, #F57F17, #FBC02D)', stat: 'R$ Bilhões', label: 'de prejuízo anual para o agronegócio brasileiro.', textColor: '#212121' },
      { gradient: 'linear-gradient(135deg, #37474F, #546E7A)', stat: 'Ecossistema', label: 'em risco por introdução de espécies invasoras exóticas.', textColor: 'white' },
    ],
    impacts: [
      { imageSrc: '/assets/icones/caixa-icone.png', title: 'Redução da produção', desc: 'Pragas destroem partes ou toda a plantação, reduzindo drasticamente o volume colhido.' },
      { imageSrc: '/assets/icones/custo-icone.png', title: 'Aumento de custos', desc: 'Agricultores gastam mais com defensivos agrícolas, replantio e trabalho para combater as pragas agrícolas.' },
      { imageSrc: '/assets/icones/bloqueio-icone.png', title: 'Bloqueio de exportações', desc: 'Produtos com pragas agrícolas podem ser barrados na alfândega, gerando prejuízos aos produtores.' },
      { imageSrc: '/assets/icones/clima-icone.png', title: 'Mudanças climáticas agravam', desc: 'O aquecimento global favorece a proliferação e expansão geográfica de novas pragas agrícolas.' },
    ],
    personaText:
      'Praga é qualquer ser vivo que cause prejuízo à nossa roça! Mas atenção: nem todo inseto é vilão! A joaninha, por exemplo, é uma heroína — ela come outros insetos que atacam as plantas!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona-fito/dona-fito-alert.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 5 — A FÁBRICA DE COMIDA
  ───────────────────────────────────────────────────── */
  {
    type: 'content',
    interactionType: 'standard',
    id: 'p5',
    label: 'A Fábrica de Comida',
    badgeLabel: 'Agricultura',
    title: 'As plantas são a nossa ',
    titleHighlight: 'fábrica de comida!',
    leadText:
      'Tudo o que comemos — arroz, feijão, fruta, farinha — começou como uma semente ou muda numa roça. As plantas transformam água, luz do sol e nutrientes do solo em alimento para nós. Por isso, cuidar delas é cuidar de nós mesmos!',
    imageCards: [
      { imageSrc: '/assets/icones/sol-icone.png', label: 'Luz do sol gera energia', alt: 'Sol brilhante' },
      { imageSrc: '/assets/icones/agua-icone.png', label: 'Água nutre as raízes', alt: 'Gota de água' },
      { imageSrc: '/assets/icones/solo-icone.png', label: 'Solo rico em minerais', alt: 'Solo fértil' },
      { imageSrc: '/assets/icones/fruta-icone.png', label: 'Resultado: alimento gostoso!', alt: 'Frutas frescas' },
    ],
    midSectionHeading: 'E o que acontece quando a fábrica é atacada?',
    midSectionText:
      'Quando pragas agrícolas invadem a roça, é como se alguém danificasse as máquinas da fábrica. A produção cai, os alimentos ficam escassos e mais caros. E é por isso que a Fitossanidade é tão importante para nós, consumidores!',
    callouts: [
      {
        variant: 'yellow',
        title: 'Sabia que...',
        text: 'A mandioca e o açaí são duas das principais "fábricas de comida" do Amapá! Milhares de famílias dependem dessas plantas para viver e para vender seus produtos.',
      },
    ],
    personaText:
      'Imagina a roça como uma grande fábrica. Cada planta é uma máquina que produz comida para a gente. Se uma praga agrícola atacar, a fábrica para! E aí, o que acontece com a nossa comida?',
    personaEmotion: 'pointing',
    personaImageSrc: '/assets/dona-fito/dona-fito-pointing.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 6 — INSETOS E ÁCAROS (GALERIA DE CARDS COM MODAIS)
  ───────────────────────────────────────────────────── */
  {
    type: 'pest-gallery',
    interactionType: 'standard',
    id: 'p6',
    label: 'Insetos e Ácaros',
    badgeLabel: 'Galeria Interativa',
    title: 'Insetos e Ácaros: ',
    titleHighlight: 'Os Pequenos Vilões dos Cultivos Agrícolas',
    leadText:
      'Clique em qualquer card para conhecer de perto esses organismos que causam grandes prejuízos nos cultivos agrícolas. Identificar o invasor é o primeiro passo para combatê-lo.',
    pestGalleryItems: [
      {
        id: 1,
        name: 'Gafanhoto',
        imageSrc: 'https://images.unsplash.com/photo-1533318087102-b3ad366ed041',
        damageType: 'Desfolha folhas, caules e frutos ao se alimentar em grandes quantidades.',
        fieldTip: 'Procure folhas mastigadas e a presença de adultos ou ninfas saltadoras.',
        description:
          'O gafanhoto é um inseto que voa em enxames gigantes e pode destruir campos inteiros de cultivo em poucas horas. Quando milhoes deles voam juntos, chamamos de praga agrícola de gafanhotos — um dos maiores pesadelos dos agricultores. Seu aparato bucal mastigador devasta folhas, caules e frutos de forma extremamente rapida.',
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
        title: 'Atenção!',
        text: 'Nem todo inseto é praga agrícola! Abelhas, joaninhas e vespinhas parasitoides são aliadas da roça. Conhecer os benefícios e os prejudiciais é essencial para um manejo agrícola responsável.',
      },
    ],
    personaText:
      'Que turma! Insetos e ácaros são os mais diversos vilões da roça. Clique em cada card para conhecê-los de perto e aprender como nos defendemos deles.',
    personaEmotion: 'pointing',
    personaImageSrc: '/assets/dona-fito/dona-fito-pointing.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 7 — APARELHOS BUCAIS
  ───────────────────────────────────────────────────── */
  {
    type: 'mouthparts',
    interactionType: 'mouthparts',
    id: 'p7',
    label: 'Aparelhos Bucais',
    badgeLabel: 'APARELHOS BUCAIS',
    title: 'Como os insetos se alimentam das plantas?',
    leadText:
      'O formato da "boca" de cada inseto, chamado aparelho bucal, define como ele ataca a planta e qual tipo de dano deixa nas roças e cultivos agrícolas. Conhecer esses sinais ajuda a identificar a praga mais rápido!',
    mouthparts: [
      {
        id: 'chewing',
        name: 'Aparelho Mastigador',
        howItWorks:
          'Possui mandíbulas fortes que cortam, raspam e trituram folhas, caules, flores ou frutos.',
        plantDamage:
          'Deixa buracos, bordas roídas ou folhas totalmente cortadas (desfolha).',
        examples: ['Formigas', 'Lagartas'],
        imageSrc: '/images/ameacas/gafanhoto/gafanhoto.webp',
        imageAlt:
          'Gafanhoto com aparelho mastigador sobre uma folha com partes roídas',
      },
      {
        id: 'piercing-sucking',
        name: 'Aparelho Picador-Sugador',
        howItWorks:
          'Funciona como um “canudinho” ou agulha fina (estilete) que perfura a planta para sugar a seiva nutritiva.',
        plantDamage:
          'Deixa as folhas amareladas, enroladas ou murchas, além de poder transmitir doenças, como vírus.',
        examples: ['Mosca-branca', 'Pulgões'],
        imageSrc: '/images/ameacas/pulgoes/pulgao.webp',
        imageAlt:
          'Pulgão sugando a seiva na parte inferior de uma folha com sintoma amarelado',
      },
    ],
    tip:
      'Viu folha cortada? Provavelmente foi um mastigador. Viu folha enrolada e amarelada? Pode ser um picador-sugador!',
    personaText:
      'Se a folha parece ter passado por uma tesourinha, procure um mastigador. Se ficou enrolada ou amarelada, pode haver um inseto sugando a seiva. O formato da boca dá uma pista importante!',
    personaEmotion: 'thinking',
    personaImageSrc: '/assets/dona-fito/dona-fito-thinking.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 8 — INVASORES INVISÍVEIS (HOTSPOT INTERATIVO)
  ───────────────────────────────────────────────────── */
  {
    type: 'hotspot',
    interactionType: 'hotspot',
    id: 'p8',
    label: 'Invasores Invisíveis',
    badgeLabel: 'Lente de Investigação',
    title: 'Os Invasores ',
    titleHighlight: 'Invisíveis',
    titleSuffix: ' das Plantas',
    leadText:
      'Vários microrganismos e organismos — como bactérias, fungos, vírus, fitoplasmas, nematoides e protozoários — podem causar doenças nas plantas. Clique na lupa de cada grupo para investigar!',
    items: [
      {
        id: 'bacterias',
        name: 'Bactérias',
        diseaseName: 'Cancro Cítrico',
        category: 'bacteria',
        image: '/images/sintomas/frutos com lesoes.webp',
        imageAlt: 'Fruto cítrico com lesões do cancro cítrico',
        concept:
          'As bactérias são seres muito pequenos que podem entrar por ferimentos e aberturas da planta. O cancro cítrico é um exemplo conhecido em laranjeiras e limoeiros.',
        symptomsText:
          'Aparecem lesões elevadas, ásperas e amarronzadas nas folhas, nos frutos e nos galhos. As folhas podem cair e os frutos ficam com aparência ruim.',
        spreadText:
          'Respingos de chuva, vento, insetos e ferramentas contaminadas levam a bactéria de uma planta para outra.',
        impactText:
          'Frutos com sintomas perdem valor e podem ser descartados.',
        preventionText:
          'Use mudas certificadas, higienize ferramentas e evite trabalhar com folhas molhadas.',
      },
      {
        id: 'fungos',
        name: 'Fungos',
        diseaseName: 'Ferrugem',
        category: 'fungo',
        image: '/images/encontre_herois/fungo-ferrugem.webp',
        imageAlt: 'Folha com manchas alaranjadas causadas por ferrugem',
        concept:
          'Os fungos podem crescer sobre ou dentro da planta. A ferrugem deixa manchas que lembram a cor da ferrugem de metal.',
        symptomsText:
          'A folha fica com pontos ou manchas alaranjadas e marrons. Com o tempo, ela pode amarelar, secar e cair.',
        spreadText:
          'Esporos são carregados pelo vento e por respingos de chuva.',
        impactText:
          'A doença reduz a fotossíntese e pode diminuir a colheita.',
        preventionText:
          'Evite excesso de umidade e plante variedades resistentes quando possível.',
      },
      {
        id: 'virus',
        name: 'Vírus',
        diseaseName: 'Vírus do Mosaico',
        category: 'virus',
        image: '/images/encontre_herois/mosaico de virus.webp',
        imageAlt: 'Folha com sintomas do vírus do mosaico',
        concept:
          'Os vírus são agentes minúsculos que usam as células da planta para se multiplicar. O vírus do mosaico é um exemplo comum em várias culturas.',
        symptomsText:
          'As folhas ficam com desenhos de manchas claras e escuras, como um mosaico. A planta pode crescer menos e produzir frutos menores.',
        spreadText:
          'Pulgões, moscas-brancas, mãos e ferramentas contaminadas podem transmitir o vírus.',
        impactText:
          'Não há cura para a planta infectada.',
        preventionText:
          'Use mudas sadias, controle os insetos vetores e retire plantas muito doentes.',
      },
      {
        id: 'fitoplasmas',
        name: 'Fitoplasmas',
        diseaseName: 'Enfezamento / Superbrotamento',
        category: 'fitoplasma',
        image: '/images/doencas/fitoplasma.webp',
        imageAlt: 'Planta com sintomas de enfezamento e superbrotamento',
        concept:
          'Fitoplasmas são microrganismos que vivem nos vasos que transportam alimento dentro da planta. Eles podem causar enfezamento e superbrotamento.',
        symptomsText:
          'A planta fica menor e fraca, com folhas amareladas, galhos muito finos ou muitos brotos pequenos juntos.',
        spreadText:
          'Cigarrinhas e outros insetos vetores levam o fitoplasma de uma planta doente para outra.',
        impactText:
          'A planta pode perder a produção e não se recuperar.',
        preventionText:
          'Use mudas sadias e controle os insetos vetores.',
      },
      {
        id: 'nematoides',
        name: 'Nematoides',
        diseaseName: 'Nematoides das Galhas',
        category: 'nematoide',
        image: '/images/sintomas/galhas.webp',
        imageAlt: 'Raízes de planta com caroços e galhas causadas por nematoides',
        concept:
          'Nematoides são vermes microscópicos que vivem no solo e atacam as raízes. Alguns formam galhas, que são como caroços nas raízes.',
        symptomsText:
          'A planta fica fraca, murcha e cresce pouco mesmo quando é regada. Ao retirar a planta, podem aparecer galhas nas raízes.',
        spreadText:
          'Solo, água, ferramentas e mudas contaminadas podem transportar nematoides.',
        impactText:
          'Raízes machucadas absorvem menos água e nutrientes.',
        preventionText:
          'Faça rotação de culturas, use mudas sadias e evite levar solo contaminado.',
      },
      {
        id: 'protozoarios',
        name: 'Protozoários',
        diseaseName: 'Murcha-de-Phytomonas',
        category: 'protozoario',
        image: '/images/doencas/planta2.webp',
        imageAlt: 'Planta com folhas murchas, representação de doença associada a protozoários',
        concept:
          'Protozoários são organismos microscópicos. Alguns vivem nos vasos da planta e podem causar doenças como a murcha-de-Phytomonas em coqueiros e cafeeiros.',
        symptomsText:
          'As folhas perdem a força, ficam amareladas e murcham. A planta pode secar aos poucos porque a água não circula bem.',
        spreadText:
          'Insetos vetores podem carregar o organismo de uma planta doente para outra.',
        impactText:
          'A doença pode comprometer a produção e levar a planta à morte.',
        preventionText:
          'Observe as plantas, controle os vetores e retire partes ou plantas muito doentes conforme a orientação técnica.',
      },
    ],
    callouts: [
      {
        variant: 'green',
        title: 'A prevenção é sempre melhor!',
        text: 'Esses invasores se espalham pela água, vento, insetos, solo ou ferramentas contaminadas. Higienizar instrumentos, usar mudas sadias e observar as plantas são formas simples de prevenção!',
      },
    ],
    personaText:
      'Esses inimigos são invisíveis a olho nu, mas causam estragos enormes! Bactérias, fungos, vírus, fitoplasmas, nematoides e protozoários podem adoecer as plantas. Clique em cada grupo para investigar!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona-fito/dona-fito-alert.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 8 — PLANTAS INVASORAS
  ───────────────────────────────────────────────────── */
  {
    type: 'content',
    interactionType: 'standard',
    id: 'p9',
    label: 'Plantas Invasoras',
    badgeLabel: 'Ervas Daninhas',
    title: 'As plantas que ',
    titleHighlight: 'roubam espaço',
    titleSuffix: ' das outras!',
    leadText:
      'Plantas invasoras (ou ervas daninhas) são plantas que crescem onde não são desejadas e competem com as plantas cultivadas por água, luz e nutrientes do solo. E uma disputa por recursos — e a planta da roça quem perde!',
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
        whatItSteals: 'Água, luz e nutrientes dos cultivos agrícolas e das pastagens ao formar touceiras muito fechadas.',
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
        whatItSteals: 'Água, luz e nutrientes durante todo o ciclo dos cultivos agrícolas, especialmente quando cresce cedo.',
        impact: 'É difícil de controlar em algumas áreas e pode produzir muitas sementes, comprometendo a colheita.',
      },
    ],
    midSectionHeading: 'Por que são um problema sério?',
    midSectionText:
      'Uma única planta invasora pode produzir milhares de sementes que ficam no solo por anos! Além de roubar nutrientes, algumas liberam substâncias químicas que inibem o crescimento das plantas ao redor. O controle precoce é fundamental!',
    callouts: [
      {
        variant: 'yellow',
        title: 'Curiosidade!',
        text: 'O aguapé (jacinto-d’água) é uma planta invasora aquática que bloqueia rios e lagos no Amapá, prejudicando a pesca e a navegação. Até plantas podem ser pragas agrícolas em locais errados!',
      },
    ],
    personaText:
      'As plantas invasoras não são malvadas — elas só estão crescendo no lugar errado! Mas quando competem com nossa mandioca ou nosso feijão, viram um grande problema. Por isso precisamos conhecê-las e controlá-las!',
    personaEmotion: 'thinking',
    personaImageSrc: '/assets/dona-fito/dona-fito-thinking.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 9 — TODO MUNDO TEM UM PAPEL!
  ───────────────────────────────────────────────────── */
  {
    type: 'content',
    interactionType: 'standard',
    id: 'p10',
    label: 'Aliados da Planta',
    badgeLabel: 'Aliados da Roça',
    title: 'Na natureza, todo mundo tem ',
    titleHighlight: 'um papel!',
    leadText:
      'Nem tudo é vilão na natureza! Existem seres vivos incríveis que ajudam a roça ao se alimentar das pragas agrícolas ou ao polinizar as flores das plantas. São os nossos heróis naturais!',
    allyCards: [
      {
        imageSrc: '/images/encontre_herois/joaninha.webp',
        label: 'Joaninha',
        alt: 'Joaninha predadora de pulgões',
        role: 'Preda pulgões e pequenos insetos que sugam a seiva das plantas.',
        benefit: 'Faz controle biológico natural e reduz a necessidade de inseticidas.',
      },
      {
        imageSrc: '/images/aliados/abelha.webp',
        label: 'Abelha',
        alt: 'Abelha polinizando uma flor',
        role: 'Faz a polinização das flores, transportando o pólen entre elas.',
        benefit: 'Ajuda as plantas a formar frutos e sementes e melhora a produção da lavoura.',
      },
      {
        imageSrc: '/images/aliados/vespa.webp',
        label: 'Vespa',
        alt: 'Vespinha parasitoide',
        role: 'Parasita ovos e lagartas de pragas agrícolas, impedindo seu desenvolvimento.',
        benefit: 'Faz controle biológico específico e ajuda a proteger os cultivos agrícolas.',
      },
      {
        imageSrc: '/images/aliados/larva.webp',
        label: 'Crisopídeo',
        alt: 'Larva de crisopídeo, conhecida como bicho-lixeiro',
        role: 'A larva, conhecida como bicho-lixeiro, alimenta-se de pulgões, ácaros e cochonilhas.',
        benefit: 'Ajuda no controle biológico de várias pragas agrícolas sem contaminar o ambiente.',
      },
      {
        imageSrc: '/images/agricultura/ghabiru-plantation.webp',
        label: 'Fungo Metarhizium',
        alt: 'Fungo benéfico Metarhizium usado no controle biológico',
        role: 'É um fungo benéfico que infecta e controla pragas como cigarrinhas e percevejos.',
        benefit: 'Combate pragas naturalmente e pode reduzir o uso de agrotóxicos na lavoura.',
      },
      {
        imageSrc: '/images/fungos/vassoura-da-bruxa-mandioca.webp',
        label: 'Bactéria Bacillus',
        alt: 'Bactéria benéfica Bacillus usada no controle biológico',
        role: 'É uma bactéria benéfica, como o Bacillus thuringiensis, que combate lagartas na lavoura.',
        benefit: 'Ajuda a controlar lagartas sem atacar a cultura e torna o manejo mais sustentável.',
      },
    ],
    midSectionHeading: 'EQUILÍBRIO NOS AGROECOSSISTEMAS',
    midSectionText:
      'Esses aliados mantêm o equilíbrio dos agroecossistemas de duas formas essenciais: pelo controle biológico, quando joaninhas, vespas, crisopídeos, fungos e bactérias benéficas combatem as pragas naturalmente, e pela polinização, feita pelas abelhas para que as plantas produzam frutos e sementes. Com esse equilíbrio, a lavoura fica saudável e reduz a necessidade de agrotóxicos!',
    callouts: [
      {
        variant: 'green',
        title: 'A natureza é sábia!',
        text: 'Quando preservamos a biodiversidade ao redor das roças — matas, rios, bosques — estamos protegendo o lar dos nossos aliados naturais. Fazenda sustentável e Fazenda saudável!',
      },
    ],
    personaText:
      'Você sabia que a joaninha é uma super-heroína da roça? Ela pode comer até 50 pulgões por dia! Cada ser vivo tem um papel importante na natureza. Vamos respeitar e valorizar nossos aliados!',
    personaEmotion: 'happy',
    personaImageSrc: '/assets/dona-fito/dona-fito-happy.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 10 — O ATAQUE NOS CULTIVOS AGRÍCOLAS
  ───────────────────────────────────────────────────── */
  {
    type: 'impact',
    interactionType: 'standard',
    id: 'p11',
    label: 'Ataque aos Cultivos',
    badgeLabel: 'Como as Pragas Atacam',
    title: 'Como as pragas agrícolas ',
    titleHighlight: 'atacam os cultivos agrícolas?',
    leadText:
      'Cada tipo de praga agrícola tem uma forma diferente de atacar as plantas. Conhecer essas estratégias nos ajuda a identificar o problema cedo e agir rapidamente, salvando a colheita!',
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
      { imageSrc: '/assets/icones/manchas-icone.png', title: 'Manchas e lesões', desc: 'Fungos e bactérias causam manchas que reduzem a fotossíntese e desvalorizam o produto no mercado.' },
      { imageSrc: '/assets/icones/galha-icone.png', title: 'Deformações e galhas', desc: 'Alguns insetos injetam substâncias que deformam folhas, caules e frutos, inviabilizando a sua comercialização.' },
      { imageSrc: '/assets/icones/murcha-icone.png', title: 'Murcha e morte subita', desc: 'Doenças vasculares bloqueiam o transporte de água dentro da planta, causando murcha repentina.' },
      { imageSrc: '/assets/icones/virus-transmissao.png', title: 'Transmissão de vírus', desc: 'Insetos como pulgões e moscas-brancas são vetores de vírus que enfraquecem ou matam as plantas.' },
    ],
    personaText:
      'Cada praga agrícola tem sua própria "arma" para atacar as plantas. Por isso é tão importante monitorar a roça constantemente! Quanto mais cedo identificarmos o problema, mais fácil será controlá-lo!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona-fito/dona-fito-alert.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 11 — PRAGAS QUARENTENÁRIAS
  ───────────────────────────────────────────────────── */
  {
    type: 'alert',
    interactionType: 'standard',
    id: 'p12',
    label: 'Quarentenárias',
    badgeLabel: 'Alerta Especial',
    title: 'O que são ',
    titleHighlight: 'Pragas Quarentenárias?',
    leadText:
      'Imagine uma praga agrícola tão perigosa que poderia destruir toda a agricultura de um país se entrasse em suas fronteiras. É exatamente isso que define uma Praga Quarentenária — um inimigo externo que não podemos deixar entrar!',
    alertImageSrc: '/assets/icones/alerta-quarentena-icone.png',
    alertTitle: 'Definição Oficial (MAPA)',
    alertText:
      'Praga quarentenária é aquela de importância econômica potencial para o país ameaçado, ainda não presente no território ou presente em área limitada, e sujeita ao controle oficial.',
    callouts: [
      {
        variant: 'yellow',
        title: 'Por que o nome "Quarentenária"?',
        text: 'O termo vem de "quarentena" — o periodo de isolamento usado para evitar a propagação de doenças. Assim como fazemos quarentena para proteger as pessoas, fazemos quarentena fitossanitária para proteger as plantas!',
      },
    ],
    personaText:
      'Algumas pragas agrícolas são tão perigosas que o Brasil tem regras rígidas para impedir sua entrada no país! Aeroportos, portos e fronteiras são fiscalizados para isso. Nunca traga frutas ou plantas de outros países sem verificar!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona-fito/dona-fito-alert.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 12 — QUEM CUIDA? PESQUISADORES
  ───────────────────────────────────────────────────── */
  {
    type: 'orgaos',
    interactionType: 'standard',
    id: 'p13',
    label: 'Pesquisadores',
    badgeLabel: 'Heróis da Ciencia',
    title: 'Os Cientistas que ',
    titleHighlight: 'protegem',
    titleSuffix: ' nossas plantas!',
    leadText:
      'Por trás de cada solução fitossanitária existe um pesquisador dedicado! Essas pessoas estudam pragas agrícolas, desenvolvem novas variedades de plantas resistentes e criam métodos de controle sustentáveis.',
    items: [
      { imageSrc: '/assets/icones/embrapa-icone.png', name: 'Embrapa — Empresa Brasileira de Pesquisa Agropecuária', desc: 'Desenvolveu variedades de mandioca resistentes a vassoura-de-bruxa e tecnicas de controle biologico para a Amazonia.' },
      { imageSrc: '/assets/icones/universidade-icone.png', name: 'Universidades e Institutos Federais', desc: 'Formam biologos, agronomos e engenheiros florestais que pesquisam pragas agrícolas locais e desenvolvem solucoes regionais.' },
      { imageSrc: '/assets/icones/ifap-icone.png', name: 'IFAP — Instituto Federal do Amapá', desc: 'Pesquisa e forma técnicos agrícolas com foco nas pragas agrícolas e desafios específicos da região amazônica.' },
      { imageSrc: '/assets/icones/iepa-icone.png', name: 'IEPA — Instituto de Pesquisas Científicas do Amapá', desc: 'Estuda a biodiversidade amazônica, identificando novas pragas agrícolas e aliados naturais dos cultivos agrícolas amapaenses.' },
      { imageSrc: '/assets/icones/laboratorio-icone.png', name: 'Laboratórios de Diagnóstico Fitossanitário', desc: 'Identificam com precisão qual praga agrícola ou doença está atacando um cultivo agrícola, permitindo o tratamento correto.' },
      { imageSrc: '/assets/icones/estudante-icone.png', name: 'Você pode ser o próximo!', desc: 'Cada estudante curioso é um futuro pesquisador em potencial. A ciência precisa de você para proteger nossas plantas!' },
    ],
    personaText:
      'Os pesquisadores são os verdadeiros super-heróis da fitossanidade! Eles passam anos estudando para nos ajudar. Quem sabe um dia você não vai trabalhar na Embrapa ou numa universidade pesquisando pragas agrícolas do Amapá?',
    personaEmotion: 'happy',
    personaImageSrc: '/dona_fito_meio_corpo.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 13 — QUEM CUIDA? FISCALIZAÇÃO
  ───────────────────────────────────────────────────── */
  {
    type: 'orgaos',
    interactionType: 'standard',
    id: 'p14',
    label: 'Fiscalização',
    badgeLabel: 'Guardioes das Fronteiras',
    title: 'Os guardiões que ',
    titleHighlight: 'fiscalizam',
    titleSuffix: ' e protegem!',
    leadText:
      'Além dos pesquisadores, existe uma rede de fiscalização que trabalha 24 horas por dia para impedir que pragas agrícolas perigosas entrem no Brasil ou se espalhem entre os estados.',
    items: [
      { imageSrc: '/assets/icones/mapa-ministerio-icone.png', name: 'MAPA — Ministerio da Agricultura', desc: 'Define as normas fitossanitarias nacionais e coordena toda a rede de proteção das plantas do Brasil.' },
      { imageSrc: '/assets/icones/vigiagro-icone.png', name: 'VIGIAGRO — Vigilancia Agropecuaria', desc: 'Fiscaliza portos, aeroportos e fronteiras terrestres, inspecionando malas, caixas e cargas em busca de pragas agrícolas.' },
      { imageSrc: '/assets/icones/adap-icone.png', name: 'ADAP — Agencia de Defesa Agropecuaria do Amapa', desc: 'Fiscaliza o comercio de plantas, sementes e frutas dentro do Amapa, evitando a entrada de pragas agrícolas de outros estados.' },
      { imageSrc: '/assets/icones/sementes-certificadas.png', name: 'Inspeção de Sementes e Mudas', desc: 'Antes de ser vendida, toda semente precisa passar por inspeção oficial para garantir que esta livre de doencas.' },
      { imageSrc: '/assets/icones/produtor-rural-icone.png', name: 'Produtor Rural', desc: 'São os primeiros a perceber algo errado na roça! Cada produtor é um fiscal em campo, reportando anomalias.' },
      { imageSrc: '/assets/icones/consumidor-icone.png', name: 'E você, consumidor!', desc: 'Não transporte frutas, plantas ou terra de regiões desconhecidas. Essa atitude simples ajuda a proteger nossa agricultura!' },
    ],
    personaText:
      'Imagina o trabalho desses fiscais! Eles inspecionam cada bagagem, cada caixa de fruta, cada muda de planta que chega ao Amapá. É um trabalho de heroi — silencioso mas muito importante para nossa segurança alimentar!',
    personaEmotion: 'pointing',
    personaImageSrc: '/dona_fito_meio_corpo.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 14 — O ESCUDO PROTETOR (BOAS PRÁTICAS)
  ───────────────────────────────────────────────────── */
  {
    type: 'lapbook',
    interactionType: 'lift-the-flap',
    id: 'p15',
    label: 'Escudo Protetor',
    badgeLabel: 'Boas Práticas',
    lapbookBadge: 'PREVENÇÃO E MANEJO',
    lapbookTitle: 'Como Evitar e Controlar as Pragas Agrícolas?',
    lapbookSubtitle: 'Arraste ou clique nos cartões para classificar as atitudes de proteção dos cultivos agrícolas!',
    callouts: [
      {
        variant: 'green',
        title: 'A prevenção sempre vence o combate!',
        text: 'Investir em boas práticas fitossanitárias custa muito menos do que tratar cultivos agrícolas infestados. Agricultor informado é agricultor protegido — e isso vale para toda a família rural!',
      },
    ],
    personaText:
      'Aqui estão as "armas" dos heróis da roça! Cada uma dessas práticas é um escudo que protege nossas plantas. Levante as abas e descubra qual você já conhecia!',
    personaEmotion: 'celebrating',
    personaImageSrc: '/assets/dona-fito/dona-fito-celebrating.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 15 — CASOS REAIS DO AMAPÁ (DOSSIE 3D)
  ───────────────────────────────────────────────────── */
  {
    type: 'amapa-cases',
    interactionType: 'standard',
    id: 'p16',
    label: 'Casos no Amapá',
    badgeLabel: 'Dossie Fitossanitário',
    personaText: 'Investigue os detalhes de cada ameaça acima e veja como podemos defender o nosso Amapá!',
    personaEmotion: 'alert',
    personaImageSrc: '/assets/dona_fito_meio_corpo.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 16 — O IMPACTO NA SUA VIDA
  ───────────────────────────────────────────────────── */
  {
    type: 'chain',
    interactionType: 'standard',
    id: 'p17',
    label: 'Na Sua Vida',
    badgeLabel: 'Conexão com a vida real',
    heroTitle: 'Sem Fitossanidade = Menos Comida na Mesa',
    heroHighlight: '',
    heroSubtitle:
      'Entender a fitossanidade não é só para cientistas. É para qualquer pessoa que come, que compra e que se preocupa com o futuro do planeta.',
    sectionHeading: 'Como isso chega até você?',
    leadText: 'Veja a cadeia de impactos quando pragas agrícolas não são controladas:',
    chainItems: [
      { imageSrc: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec', text: 'Uma praga agrícola entra no país sem controle fitossanitário', studentImpact: 'A fiscalização protege as plantas que chegam à nossa região e evita que novas pragas agrícolas alcancem os cultivos agrícolas.' },
      { imageSrc: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5', text: 'Ela se espalha pelas roças de mandioca, açaí e frutas', studentImpact: 'Quando a roça é atingida, os alimentos que fazem parte da sua rotina podem ficar mais difíceis de produzir.' },
      { imageSrc: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d', text: 'A produção cai drasticamente e os agricultores perdem renda', studentImpact: 'Menos colheita significa mais preocupação para as famílias produtoras e menos produtos disponíveis.' },
      { imageSrc: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e', text: 'Os alimentos ficam escassos e mais caros nos mercados', studentImpact: 'A queda na oferta pode aumentar os preços dos alimentos que sua família compra.' },
      { imageSrc: 'https://images.unsplash.com/photo-1547592180-85f173990554', text: 'Famílias têm menos acesso a alimentos nutritivos e acessíveis', studentImpact: 'Cuidar da saúde das plantas ajuda a manter refeições variadas e nutritivas na mesa.' },
      { imageSrc: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc', text: 'O meio ambiente sofre com o desequilíbrio ecológico', studentImpact: 'Proteger a fitossanidade também preserva os seres vivos e os ambientes que você conhece.' },
    ],
    callouts: [
      {
        variant: 'yellow',
        title: 'Você quer fazer a diferença?',
        text: 'Não transporte plantas ou frutas de regiões desconhecidas. Compre produtos com selos de qualidade. Apoie agricultores locais. Essas atitudes simples ajudam a manter a fitossanidade da nossa região!',
      },
    ],
    personaText:
      'Cada vez que você compra uma fruta saudável e barata no mercado, é porque alguém trabalhou duro para proteger a roça! A fitossanidade está na sua mesa todo dia — só que você não sabia disso. Agora sabe!',
    personaEmotion: 'pointing',
    personaImageSrc: '/assets/dona-fito/dona-fito-pointing.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 17 — JOGO RÁPIDO: ENCONTRE O HERÓI!
  ───────────────────────────────────────────────────── */
  {
    type: 'find-the-hero',
    interactionType: 'find-the-hero',
    id: 'p18',
    label: 'Encontre o Herói!',
    badgeLabel: 'ATIVIDADE INTERATIVA',
    title: 'Descubra os Heróis e Vilões!',
    subtitle: 'Todo ser vivo tem um papel. Clique nos cards e descubra as características dos nossos heróis e vilões na natureza.',
    characters: [
      {
        id: 'joaninha',
        imageSrc: '/images/encontre_herois/joaninha.webp',
        name: 'Joaninha',
        isHero: true,
        revealText: 'A joaninha come pulgões e outros insetos praga agrícola. Ela é uma das melhores aliadas da roça!',
      },
      {
        id: 'pulgao',
        imageSrc: '/images/ameacas/pulgoes/4.webp',
        name: 'Pulgão',
        isHero: false,
        revealText: 'O pulgão suga a seiva das plantas e transmite vírus. Um dos mais comuns inimigos da roça!',
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
        revealText: 'A ferrugem é um fungo que deixa manchas alaranjadas nas folhas e pode destruir roças inteiras de soja e trigo!',
      },
    ],
    callouts: [
      {
        variant: 'green',
        title: 'Parabéns por aprender!',
        text: 'Distinguir heróis de vilões na natureza é o primeiro passo para um manejo sustentável da roça. Agricultores que conhecem seus aliados naturais usam menos agrotoxicos e tem melhores colheitas!',
      },
    ],
    personaText:
      'Você consegue separar os heróis dos vilões? Cada ser vivo tem um papel na natureza — cabe a nós entender esse papel! Clique em cada personagem e descubra se ele é aliado ou inimigo da roça!',
    personaEmotion: 'happy',
    personaImageSrc: '/assets/dona-fito/dona-fito-happy.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 18 — QUIZ FINAL
  ───────────────────────────────────────────────────── */
  {
    type: 'quiz',
    interactionType: 'quiz',
    id: 'p19',
    label: 'Quiz Final',
    badgeLabel: 'Avaliação de Aprendizagem',
    personaText:
      'É hora de colocar tudo que você aprendeu a prova! Não se preocupe se errar — cada erro é uma nova chance de aprender. Você já chegou até aqui, isso por si só é uma grande conquista!',
    personaEmotion: 'celebrating',
    personaImageSrc: '/assets/dona-fito/dona-fito-celebrating.png',
  },

  /* ─────────────────────────────────────────────────────
     PÁGINA 19 — MENSAGEM FINAL
  ───────────────────────────────────────────────────── */
  {
    type: 'closing',
    interactionType: 'closing',
    id: 'p20',
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
      title: 'Continue sua jornada de aprendizagem!',
      text:       'Explore os outros modulos do EducaFito, converse com agricultores da sua região, visite a Embrapa Amapá e descubra como a ciência está trabalhando para proteger nossos cultivos agrícolas e nossa biodiversidade amazônica.',
    },
    footerText: 'EducaFito — Aprendendo com a natureza, crescendo com o conhecimento.',
    personaText:
      'Parabéns, jovem cientista! Você completou a cartilha EducaFito! Agora você é parte da rede de proteção das nossas plantas. Lembre-se: cada atitude nossa conta para proteger a natureza e garantir comida na mesa de todos!',
    personaEmotion: 'celebrating',
    personaImageSrc: '/assets/dona_fito_meio_corpo.png',
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
