/**
 * amapa-cases-data.ts — EducaFito
 * Dados tipados dos Casos Reais do Amapá para o componente AmapaCasesSection.
 * As URLs de imagem estão prontas para substituição pelas fotos oficiais da professora.
 */

/* ─── Tipos ──────────────────────────────────────────────────────────────── */

export type ThreatLevel = 'quarentenaria' | 'alerta-critico' | 'monitorada'

export interface SymptomItem {
  /** Ícone lucide-react a usar (nome em string, importado no componente) */
  iconName: 'AlertTriangle' | 'Leaf' | 'Bug' | 'Microscope' | 'Image' | 'MapPin' | 'ShieldAlert'
  title: string
  description: string
  /**
   * URL de imagem de detalhe do sintoma.
   * Substitua pelo caminho da imagem oficial quando disponível.
   */
  imageSrc?: string
  imageAlt?: string
}

export interface CombatAction {
  actor: string
  role: 'orgao' | 'agricultor' | 'cidadao'
  actions: string[]
}

export interface AmapaCaseData {
  id: string
  /** Nome popular da praga */
  name: string
  /** Nome científico — exibido em itálico */
  scientificName: string
  threatLevel: ThreatLevel
  /**
   * Imagem principal do card (placeholder Unsplash até a foto oficial chegar).
   * Para trocar: substitua apenas o valor de `cardImageSrc`.
   */
  cardImageSrc: string
  cardImageAlt: string

  /* ── Aba 1: O Invasor ── */
  invasorHeadline: string
  invasorDescription: string
  /**
   * Imagem ampliada para a Aba 1 do modal.
   * Substitua por caminho local quando a foto oficial estiver disponível.
   */
  invasorImageSrc: string
  invasorImageAlt: string
  invasorRegionText: string

  /* ── Aba 2: Diagnóstico & Sintomas ── */
  symptoms: SymptomItem[]

  /* ── Aba 3: Ações de Combate ── */
  combatActions: CombatAction[]
  citizenTip: string
}

/* ─── Dados ──────────────────────────────────────────────────────────────── */

export const AMAPA_CASES: AmapaCaseData[] = [
  /* ──────────────────────────────────────────────────────────────────────────
     CASO 1 — Mosca-da-Carambola
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'mosca-carambola',
    name: 'Mosca-da-Carambola',
    scientificName: 'Bactrocera carambolae',
    threatLevel: 'quarentenaria',

    /* Placeholder Unsplash — substitua por imagem oficial da professora */
    cardImageSrc: '/images/pragas/mosca da carambola/1.webp',
    cardImageAlt:
      'Fotografia da Mosca-da-Carambola (Bactrocera carambolae), praga quarentenária presente no Amapá',

    /* Aba 1 */
    invasorHeadline: 'A Maior Ameaça Fitossanitária do Amapá',
    invasorDescription:
      'A Mosca-da-Carambola é um díptero originário do Sudeste Asiático detectado no Amapá em 1996, tornando-se a praga quarentenária mais importante da região. A fêmea perfura a casca dos frutos para depositar seus ovos; as larvas eclodem e devoram a polpa por dentro, inviabilizando a comercialização e a exportação.',
    /* Placeholder Unsplash — substitua por foto oficial */
    invasorImageSrc: '/images/pragas/mosca da carambola/2.webp',
    invasorImageAlt:
      'Fotografia em alta resolução da Mosca-da-Carambola sobre fruto de carambola',
    invasorRegionText:
      'Presente no Amapá desde 1996, a espécie é classificada como Praga Quarentenária A1 pelo MAPA. Toda a produção de frutas do estado está sujeita a barreiras sanitárias rigorosas. O transporte de frutas frescas do Amapá para outros estados sem autorização oficial é proibido por lei.',

    /* Aba 2 */
    symptoms: [
      {
        iconName: 'Bug',
        title: 'Picada de Oviposição',
        description:
          'Pequenos orifícios na casca do fruto onde a fêmea insere o ovipositor para depositar os ovos. A região ao redor amolece e escurece rapidamente.',
        imageSrc: '/images/pragas/mosca da carambola/3.webp',
        imageAlt: 'Detalhe de fruto com picada de oviposição da Mosca-da-Carambola',
      },
      {
        iconName: 'AlertTriangle',
        title: 'Queda Prematura dos Frutos',
        description:
          'Frutos infestados caem do pé antes de amadurecer. Esse é frequentemente o primeiro sinal visível em campo e indica infestação ativa.',
      },
      {
        iconName: 'Microscope',
        title: 'Larvas na Polpa',
        description:
          'Ao cortar o fruto, observam-se larvas brancas (1–8 mm) se alimentando da polpa, criando galerias e promovendo apodrecimento interno acelerado.',
        imageSrc: '/images/pragas/mosca da carambola/4.webp',
        imageAlt: 'Larvas da Mosca-da-Carambola visíveis no interior de um fruto seccionado',
      },
      {
        iconName: 'Leaf',
        title: 'Podridão Interna',
        description:
          'A polpa apresenta manchas escuras, textura pastosa e odor fermentado — mesmo quando a casca ainda parece íntegra externamente.',
      },
    ],

    /* Aba 3 */
    combatActions: [
      {
        actor: 'DIAGRO / MAPA',
        role: 'orgao',
        actions: [
          'Monitoramento contínuo com armadilhas de feromônio em toda a área endêmica.',
          'Barreiras fitossanitárias em rodovias e aeroportos para impedir a dispersão.',
          'Programa de Técnica do Inseto Estéril (TIE) em parceria com a Embrapa.',
          'Fiscalização do trânsito de frutas frescas entre o Amapá e demais estados.',
        ],
      },
      {
        actor: 'Embrapa Amapá',
        role: 'orgao',
        actions: [
          'Pesquisa e multiplicação de inimigos naturais (controle biológico).',
          'Desenvolvimento de atrativos alimentares para armadilhas de monitoramento.',
          'Estudo de variedades de frutas com resistência à mosca.',
        ],
      },
      {
        actor: 'Agricultor',
        role: 'agricultor',
        actions: [
          'Recolher e enterrar (ou destruir) frutos caídos no solo para eliminar larvas.',
          'Instalar armadilhas de monitoramento com feromônio no pomar.',
          'Embalar os frutos ainda no pé (bagging) para proteção física.',
          'Avisar imediatamente o DIAGRO ao detectar sinais da mosca.',
        ],
      },
      {
        actor: 'Você, Cidadão',
        role: 'cidadao',
        actions: [
          'Nunca transportar frutas frescas do Amapá para outro estado sem autorização.',
          'Não comprar frutas de origem desconhecida ou sem nota fiscal.',
          'Denunciar transporte irregular de frutas ao MAPA (0800 704 1995).',
        ],
      },
    ],
    citizenTip:
      'Uma única fruta transportada irregularmente pode carregar centenas de larvas. Sua atitude protege toda a fruticultura brasileira!',
  },

  /* ──────────────────────────────────────────────────────────────────────────
     CASO 2 — Vassoura-de-Bruxa
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'vassoura-bruxa',
    name: 'Vassoura-de-Bruxa',
    scientificName: 'Moniliophthora perniciosa',
    threatLevel: 'alerta-critico',

    /* Placeholder — substitua por imagem oficial da professora */
    cardImageSrc: '/images/fungos/vassoura-da-bruxa-mandioca.webp',
    cardImageAlt:
      'Fotografia de ramos deformados em formato de vassoura causados pelo fungo Moniliophthora perniciosa no cacaueiro/cupuaçuzeiro',

    /* Aba 1 */
    invasorHeadline: 'O Fungo que Destrói o Cacau e o Cupuaçu do Amapá',
    invasorDescription:
      'A Vassoura-de-Bruxa é uma doença fúngica causada por Moniliophthora perniciosa. O fungo infecta os ponteiros (crescimentos novos) do cacaueiro, cupuaçuzeiro e outras espécies, produzindo um crescimento anormal de ramos que formam a característica "vassoura". Os frutos infectados apodrecem antes de amadurecer, destruindo a produção do pequeno agricultor.',
    /* Placeholder — substitua por foto oficial */
    invasorImageSrc: '/images/fungos/vassoura-da-bruxa-mandioca2.webp',
    invasorImageAlt:
      'Fotografia em alta resolução de ramos em vassoura causados por Moniliophthora perniciosa',
    invasorRegionText:
      'No Amapá, a vassoura-de-bruxa afeta principalmente o cupuaçuzeiro — fruta nativa da Amazônia de enorme importância cultural e econômica para a agricultura familiar. Comunidades ribeirinhas e assentamentos rurais sofrem perdas de até 90% da produção em áreas severamente infestadas, comprometendo diretamente a renda das famílias.',

    /* Aba 2 */
    symptoms: [
      {
        iconName: 'Bug',
        title: 'Ramos em "Vassoura"',
        description:
          'O sintoma mais característico: brotamentos compactos e eretos crescem em excesso, formando um feixe de ramos que lembra uma vassoura de bruxa. Esses ramos são inicialmente verdes, depois secam e ficam escuros.',
        imageSrc: '/images/fungos/vassoura-da-bruxa-mandioca3.webp',
        imageAlt: 'Detalhe de ramos deformados em formato de vassoura no cupuaçuzeiro',
      },
      {
        iconName: 'AlertTriangle',
        title: 'Frutos Apodrecidos (Cherelle Wilt)',
        description:
          'Frutos jovens (cherelles) param de crescer, ficam pretos e murcham na planta sem cair. Em frutos maiores, surgem manchas marrons que evoluem para podridão total da polpa.',
        imageSrc: '/images/fungos/vassoura-da-bruxa-mandioca4.webp',
        imageAlt: 'Frutos de cupuaçu infectados com vassoura-de-bruxa apresentando podridão',
      },
      {
        iconName: 'Microscope',
        title: 'Estruturas Fúngicas Visíveis',
        description:
          'Em condições de alta umidade, é possível observar o basidiocarpo (cogumelo) do fungo — pequena estrutura avermelhada/rosada — nos ramos secos infectados. É ele que libera esporos para novas infecções.',
      },
      {
        iconName: 'Leaf',
        title: 'Engrossamento e Deformação de Ramos',
        description:
          'Ramos jovens infectados incham e apresentam internós (espaços entre folhas) muito curtos, resultando em deformações permanentes que reduzem a capacidade produtiva da planta.',
      },
    ],

    /* Aba 3 */
    combatActions: [
      {
        actor: 'Embrapa Amazônia Oriental / CEPLAC',
        role: 'orgao',
        actions: [
          'Desenvolvimento e distribuição de variedades de cupuaçu e cacau resistentes à vassoura.',
          'Pesquisa de fungicidas biológicos (Trichoderma spp.) como agentes de biocontrole.',
          'Assistência técnica a produtores rurais sobre manejo integrado da doença.',
        ],
      },
      {
        actor: 'DIAGRO / Secretaria de Agricultura do Amapá',
        role: 'orgao',
        actions: [
          'Monitoramento epidemiológico da doença nas principais regiões produtoras.',
          'Apoio a programas de renovação de pomares com mudas sadias e resistentes.',
        ],
      },
      {
        actor: 'Agricultor',
        role: 'agricultor',
        actions: [
          'Realizar a "poda fitossanitária": remover e destruir (queimar ou enterrar) todos os ramos e frutos infectados.',
          'Aplicar pasta bordalesa ou produtos cúpricos nos cortes de poda para proteger os ferimentos.',
          'Plantar variedades resistentes recomendadas pela Embrapa.',
          'Evitar o sombreamento excessivo — reduzir a umidade inibe a disseminação do fungo.',
          'Realizar roços regulares para melhorar a ventilação do pomar.',
        ],
      },
      {
        actor: 'Você, Cidadão',
        role: 'cidadao',
        actions: [
          'Valorize e compre cupuaçu e cacau do Amapá com origem identificada.',
          'Apoie a agricultura familiar local — pequenos produtores são os mais afetados.',
          'Não transporte mudas ou partes de plantas entre propriedades sem verificar sanidade.',
        ],
      },
    ],
    citizenTip:
      'O cupuaçu é um tesouro amazônico! Consumir produtos locais com origem rastreável ajuda a fortalecer a renda do agricultor familiar e estimula boas práticas fitossanitárias.',
  },

  /* ──────────────────────────────────────────────────────────────────────────
     CASO 3 — Amarelecimento Letal do Açaí
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'amarelecimento-letal-acai',
    name: 'Amarelecimento Letal do Açaí',
    scientificName: 'Candidatus Phytoplasma sp.',
    threatLevel: 'alerta-critico',

    /* Placeholder — substitua por imagem oficial da professora */
    cardImageSrc: '/images/doencas/fitoplasma.webp',
    cardImageAlt:
      'Fotografia de palmeira de açaí com sintomas de amarelecimento letal causado por fitoplasma no Amapá',

    /* Aba 1 */
    invasorHeadline: 'A Doença Invisível que Ameaça o Tesouro do Amapá',
    invasorDescription:
      'O Amarelecimento Letal é causado por um fitoplasma — um micro-organismo que habita os vasos condutores (floema) das palmeiras. Diferente de fungos ou bactérias comuns, o fitoplasma não tem parede celular própria e vive obrigatoriamente dentro das células do vegetal ou do inseto vetor. O resultado é devastador: a palmeira amarela progressivamente, aborta seus frutos e morre em poucos meses, sem possibilidade de cura.',
    /* Placeholder — substitua por foto oficial */
    invasorImageSrc: '/images/doencas/fitoplasma.webp',
    invasorImageAlt:
      'Fotografia em alta resolução de palmeira de açaí com amarelecimento letal avançado',
    invasorRegionText:
      'Detectado no Amapá, Pará e Maranhão, o amarelecimento letal das palmeiras representa uma ameaça silenciosa para o açaí (Euterpe oleracea), símbolo cultural e econômico da região Norte. O açaí é um dos principais produtos de exportação do Amapá e fonte de renda para milhares de famílias ribeirinhas. A doença também afeta coco, dendê e babaçu.',

    /* Aba 2 */
    symptoms: [
      {
        iconName: 'AlertTriangle',
        title: 'Amarelamento Progressivo das Folhas',
        description:
          'As folhas mais antigas da palmeira começam a apresentar coloração amarelada que progride rapidamente para as folhas mais jovens, até a morte completa da copa. O processo é irreversível.',
        imageSrc: '/images/doencas/fitoplasma.webp',
        imageAlt: 'Palmeira de açaí com folhas amareladas sintomáticas de amarelecimento letal',
      },
      {
        iconName: 'Bug',
        title: 'Aborto de Frutos (Coração Apodrecido)',
        description:
          'Os cachos de frutos param de se desenvolver e caem prematuramente. Em estágio avançado, o "coração" (meristema apical) da palmeira apodrece — ponto sem retorno que indica morte iminente da planta.',
      },
      {
        iconName: 'Microscope',
        title: 'Transmissão por Cigarrinhas',
        description:
          'O fitoplasma é transmitido por cigarrinhas e outros insetos vetores. Esses insetos se alimentam do floema de palmeiras doentes e carregam o patógeno para plantas saudáveis ao se alimentarem novamente.',
      },
      {
        iconName: 'Leaf',
        title: 'Morte em Poucos Meses',
        description:
          'Após os primeiros sintomas, a palmeira pode morrer em 3 a 6 meses. Não existe tratamento curativo — toda a energia de controle deve ser direcionada à prevenção e erradicação das plantas doentes.',
      },
    ],

    /* Aba 3 */
    combatActions: [
      {
        actor: 'Embrapa Amapá / INPA',
        role: 'orgao',
        actions: [
          'Pesquisa de variedades de açaí e coco com resistência ao fitoplasma.',
          'Monitoramento epidemiológico em açaizais nativos e cultivados.',
          'Estudo da biologia das cigarrinhas vetoras para desenvolver estratégias de controle.',
          'Diagnóstico molecular (PCR) para confirmação da presença do fitoplasma.',
        ],
      },
      {
        actor: 'DIAGRO / MAPA',
        role: 'orgao',
        actions: [
          'Fiscalização do trânsito de mudas de palmeiras entre estados.',
          'Regulamentação e apoio à erradicação de palmeiras sintomáticas.',
          'Alertas fitossanitários para produtores de açaí e coco da região.',
        ],
      },
      {
        actor: 'Agricultor',
        role: 'agricultor',
        actions: [
          'Erradicar imediatamente palmeiras com sintomas para evitar a disseminação.',
          'Controlar as cigarrinhas vetoras com inseticidas registrados ou controle biológico.',
          'Não utilizar mudas de procedência desconhecida no plantio.',
          'Monitorar regularmente o açaizal e comunicar ao DIAGRO qualquer sinal suspeito.',
        ],
      },
      {
        actor: 'Você, Cidadão',
        role: 'cidadao',
        actions: [
          'Valorize e consuma açaí do Amapá com procedência garantida.',
          'Apoie iniciativas de pesquisa e conservação do açaizal nativo.',
          'Não transporte mudas de palmeiras entre regiões sem inspeção sanitária.',
        ],
      },
    ],
    citizenTip:
      'O açaí é nosso tesouro! Proteger as palmeiras é proteger a renda de milhares de famílias ribeirinhas e a cultura do Amapá. Fique atento e reporte sintomas ao DIAGRO!',
  },

  /* ──────────────────────────────────────────────────────────────────────────
     CASO 4 — Mosca-da-Fruta (Anastrepha spp.)
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'mosca-fruta-anastrepha',
    name: 'Mosca-da-Fruta',
    scientificName: 'Anastrepha spp.',
    threatLevel: 'quarentenaria',

    /* Placeholder Unsplash — substitua por imagem oficial da professora */
    cardImageSrc: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&q=80',
    cardImageAlt:
      'Fotografia de laranjas e frutas cítricas em pomar, hospedeiras da mosca-da-fruta Anastrepha na Região Norte do Brasil',

    /* Aba 1 */
    invasorHeadline: 'A Invasora dos Pomares: Pequena, Invisível e Destruidora',
    invasorDescription:
      'O gênero Anastrepha reúne dezenas de espécies de moscas-da-fruta nativas das Américas que representam uma das principais ameaças aos pomares tropicais. A fêmea perfura a casca dos frutos com seu ovipositor pontiagudo e deposita os ovos diretamente na polpa. As larvas eclodem e destroem o interior do fruto — que parece perfeito por fora, mas está completamente estragado por dentro. Isso gera enormes prejuízos econômicos e barreiras às exportações brasileiras.',
    /* Placeholder Unsplash — substitua por foto oficial */
    invasorImageSrc: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&q=80',
    invasorImageAlt:
      'Fotografia em alta resolução de pomar de frutas tropicais (acerola/laranja) afetado pela mosca-da-fruta Anastrepha',
    invasorRegionText:
      'No Amapá, as espécies de Anastrepha afetam principalmente manga, goiaba, laranja, maracujá, acerola e diversas outras frutas tropicais de pomar familiar. A presença da mosca-da-fruta impede a exportação de frutas frescas da região sem certificação fitossanitária, bloqueando mercados externos e reduzindo a renda dos fruticultures locais.',

    /* Aba 2 */
    symptoms: [
      {
        iconName: 'Bug',
        title: 'Picada de Oviposição na Casca',
        description:
          'Pequenos furos circulares na casca do fruto onde a fêmea inseriu o ovipositor. Ao redor do furo, a casca amolece, escurece e frequentemente aparece uma mancha úmida — sinal de infestação ativa.',
        imageSrc: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80',
        imageAlt: 'Detalhe de fruto tropical com picadas de oviposição da mosca-da-fruta Anastrepha',
      },
      {
        iconName: 'AlertTriangle',
        title: 'Queda Precoce dos Frutos',
        description:
          'Frutos infestados caem do pé antes de amadurecer completamente. No chão, apodrecem rapidamente, liberando as larvas que se enterram no solo para completar o ciclo de vida.',
      },
      {
        iconName: 'Microscope',
        title: 'Larvas Brancas na Polpa',
        description:
          'Ao cortar o fruto, observam-se larvas brancas e translúcidas (3–12 mm) se alimentando da polpa, criando galerias e promovendo fermentação interna. Um único fruto pode conter dezenas de larvas.',
        imageSrc: 'https://images.unsplash.com/photo-1600231915037-f5811a44e60a?w=600&q=80',
        imageAlt: 'Larvas de Anastrepha visíveis no interior de um fruto tropical seccionado',
      },
      {
        iconName: 'Leaf',
        title: 'Podridão e Odor Fermentado',
        description:
          'A polpa apresenta manchas escuras, textura pastosa e odor ácido de fermentação. O fruto perde totalmente o valor comercial — mesmo quando a casca ainda parece intacta externamente.',
      },
    ],

    /* Aba 3 */
    combatActions: [
      {
        actor: 'DIAGRO / MAPA',
        role: 'orgao',
        actions: [
          'Rede de monitoramento com armadilhas de feromônio e atrativo alimentar em toda a região.',
          'Emissão de certificados fitossanitários para exportação de frutas da região.',
          'Barreiras fitossanitárias em rodovias e aeroportos para impedir dispersão.',
          'Programas de controle em áreas de produção com foco em frutos caídos.',
        ],
      },
      {
        actor: 'Embrapa Amapá',
        role: 'orgao',
        actions: [
          'Pesquisa sobre espécies de Anastrepha presentes no Amapá e seus hospedeiros preferenciais.',
          'Técnica do Inseto Estéril (TIE): machos esterilizados por irradiação reduzem a população sem agrotóxicos.',
          'Desenvolvimento de atrativos alimentares e armadilhas mais eficientes.',
        ],
      },
      {
        actor: 'Agricultor',
        role: 'agricultor',
        actions: [
          'Recolher e destruir (enterrar a ≥30 cm ou embalar hermeticamente) todos os frutos caídos.',
          'Instalar armadilhas de monitoramento com atrativo alimentar no pomar.',
          'Usar o método de ensacamento (bagging) dos frutos ainda verdes para proteção física.',
          'Realizar colheita regular e não deixar frutos maduros demais na planta.',
          'Comunicar ao DIAGRO quando detectar altas infestações.',
        ],
      },
      {
        actor: 'Você, Cidadão',
        role: 'cidadao',
        actions: [
          'Nunca transporte frutas frescas sem nota fiscal e certificado de origem.',
          'Prefira comprar frutas de produtores locais certificados.',
          'Denuncie suspeitas de transporte irregular ao MAPA: 0800 704 1995.',
        ],
      },
    ],
    citizenTip:
      'A mosca-da-fruta é traiçoeira: a fruta parece ótima por fora, mas está estragada por dentro! Inspecione sempre as frutas antes de consumir ou transportar. Sua atitude protege o pomar de toda a região!',
  },
]

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

export function getThreatLabel(level: ThreatLevel): string {
  const labels: Record<ThreatLevel, string> = {
    'quarentenaria': 'Quarentenária A1',
    'alerta-critico': 'Alerta Crítico',
    'monitorada': 'Sob Monitoramento',
  }
  return labels[level]
}

export function getThreatColors(level: ThreatLevel): {
  bg: string
  border: string
  text: string
  glow: string
  badge: string
} {
  if (level === 'quarentenaria') {
    return {
      bg: 'rgba(183, 28, 28, 0.08)',
      border: 'rgba(198, 40, 40, 0.5)',
      text: '#B71C1C',
      glow: 'rgba(198, 40, 40, 0.35)',
      badge: 'linear-gradient(135deg, #B71C1C, #C62828)',
    }
  }
  if (level === 'alerta-critico') {
    return {
      bg: 'rgba(245, 127, 23, 0.08)',
      border: 'rgba(245, 127, 23, 0.5)',
      text: '#E65100',
      glow: 'rgba(245, 127, 23, 0.35)',
      badge: 'linear-gradient(135deg, #E65100, #F57F17)',
    }
  }
  return {
    bg: 'rgba(27, 94, 32, 0.08)',
    border: 'rgba(46, 125, 50, 0.4)',
    text: '#1B5E20',
    glow: 'rgba(46, 125, 50, 0.3)',
    badge: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
  }
}

