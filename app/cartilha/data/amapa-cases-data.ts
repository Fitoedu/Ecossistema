/**
 * amapa-cases-data.ts — EducaFito
 * Dados tipados dos Casos Reais do Amapá para o componente AmapaCasesSection.
 * As URLs de imagem estão prontas para substituição pelas fotos oficiais da professora.
 */

/* ─── Tipos ──────────────────────────────────────────────────────────────── */

export type ThreatLevel =
  | "quarentenaria"
  | "quarentenaria-ausente"
  | "alerta-critico"
  | "monitorada"
  | "praga-regional";

export interface SymptomItem {
  /** Ícone lucide-react a usar (nome em string, importado no componente) */
  iconName:
    | "AlertTriangle"
    | "Leaf"
    | "Bug"
    | "Microscope"
    | "Image"
    | "MapPin"
    | "ShieldAlert";
  title: string;
  description: string;
  /**
   * URL de imagem de detalhe do sintoma.
   * Substitua pelo caminho da imagem oficial quando disponível.
   */
  imageSrc?: string;
  credit?: string;
  imageAlt?: string;
}

export interface CombatAction {
  actor: string;
  role: "orgao" | "agricultor" | "cidadao";
  actions: string[];
}

export interface AmapaCaseData {
  id: string;
  /** Nome popular da praga */
  name: string;
  /** Nome científico — exibido em itálico */
  scientificName: string;
  threatLevel: ThreatLevel;
  /** Caminho local da imagem principal do card e do modal. */
  imageSrc: string;
  /** Crédito acadêmico resumido da imagem principal. */
  credit: string;
  cardImageAlt: string;

  /* ── Aba 1: O Invasor ── */
  invasorHeadline: string;
  invasorDescription: string;
  /**
   * Imagem ampliada para a Aba 1 do modal.
   * Substitua por caminho local quando a foto oficial estiver disponível.
   */
  invasorImageSrc: string;
  invasorCredit?: string;
  invasorImageAlt: string;
  invasorRegionText: string;

  /* ── Aba 2: Diagnóstico & Sintomas ── */
  symptoms: SymptomItem[];

  /* ── Aba 3: Ações de Combate ── */
  combatActions: CombatAction[];
  citizenTip: string;
}

/* ─── Dados ──────────────────────────────────────────────────────────────── */

export const AMAPA_CASES: AmapaCaseData[] = [
  /* ──────────────────────────────────────────────────────────────────────────
     CASO 1 — Mosca-da-Carambola
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: "mosca-carambola",
    name: "Mosca-da-Carambola",
    scientificName: "Bactrocera carambolae",
    threatLevel: "quarentenaria",

    imageSrc: "/images/cartilha/casos-reais/mosca-carambola.jpg",
    credit: "Foto: Ken Walker / Museum Victoria",
    cardImageAlt:
      "Fotografia da Mosca-da-Carambola (Bactrocera carambolae), praga agrícola quarentenária presente no Amapá",

    /* Aba 1 */
    invasorHeadline: "A Maior Ameaça Fitossanitária do Amapá",
    invasorDescription:
      "A Mosca-da-Carambola é um díptero originário do Sudeste Asiático detectado no Amapá em 1996, tornando-se a praga quarentenária mais importante da região. A fêmea perfura a casca dos frutos para depositar seus ovos; as larvas eclodem e devoram a polpa por dentro, inviabilizando a comercialização e a exportação.",
    invasorImageSrc: "/images/cartilha/casos-reais/mosca-carambola-campo.jpg",
    invasorCredit: "Foto: Lenny Worthington / Wikimedia Commons",
    invasorImageAlt:
      "Fotografia em alta resolução da Mosca-da-Carambola sobre fruto de carambola",
    invasorRegionText:
      "Presente no Amapá desde 1996, a espécie é uma Praga Quarentenária Presente (PQP): ocorre em área restrita e está sujeita a barreiras sanitárias rigorosas. O transporte de frutas frescas do Amapá para outros estados sem autorização oficial é proibido por lei.",

    /* Aba 2 */
    symptoms: [
      {
        iconName: "Bug",
        title: "Picada de Oviposição",
        description:
          "Pequenos orifícios na casca do fruto onde a fêmea insere o ovipositor para depositar os ovos. A região ao redor amolece e escurece rapidamente.",
        imageSrc: "/images/cartilha/casos-reais/sintoma-picada.jpg",
        credit: "Foto: Cristiane Ramos de Jesus / Embrapa Amapá",
        imageAlt:
          "Detalhe de fruto com picada de oviposição da Mosca-da-Carambola",
      },
      {
        iconName: "AlertTriangle",
        title: "Queda Prematura dos Frutos",
        description:
          "Frutos infestados caem do pé antes de amadurecer. Esse é frequentemente o primeiro sinal visível em campo e indica infestação ativa.",
      },
      {
        iconName: "Microscope",
        title: "Larvas na Polpa",
        description:
          "Ao cortar o fruto, observam-se larvas brancas (1–8 mm) que se alimentam da polpa, criando galerias e promovendo apodrecimento interno acelerado.",
        imageSrc: "/images/cartilha/casos-reais/sintoma-larvas.jpg",
        credit: "Foto: Cristiane Ramos de Jesus / Embrapa Amapá",
        imageAlt:
          "Larvas da Mosca-da-Carambola visíveis no interior de um fruto seccionado",
      },
      {
        iconName: "Leaf",
        title: "Podridão Interna",
        description:
          "A polpa apresenta manchas escuras, textura pastosa e odor fermentado — mesmo quando a casca ainda parece íntegra externamente.",
      },
    ],

    /* Aba 3 */
    combatActions: [
      {
        actor: "DIAGRO / MAPA",
        role: "orgao",
        actions: [
          "Monitoramento contínuo com armadilhas que usam atrativos específicos, como o metil eugenol, em toda a área endêmica.",
          "Barreiras fitossanitárias em rodovias e aeroportos para impedir a dispersão.",
          "Programa de controle por meio da Técnica do Inseto Estéril (TIE), em parceria com a Embrapa.",
          "Fiscalização do trânsito de frutas frescas entre o Amapá e demais estados.",
        ],
      },
      {
        actor: "Embrapa Amapá",
        role: "orgao",
        actions: [
          "Pesquisa e multiplicação de inimigos naturais (controle biológico).",
          "Desenvolvimento de atrativos alimentares para armadilhas de monitoramento.",
          "Estudo de variedades de frutas com resistência à mosca.",
        ],
      },
      {
        actor: "Agricultor",
        role: "agricultor",
        actions: [
          "Recolher e enterrar (ou destruir) frutos caídos no solo para eliminar larvas.",
          "Instalar armadilhas de monitoramento com atrativo recomendado no pomar.",
          "Embalar os frutos ainda no pé (bagging) para proteção física.",
          "Avisar imediatamente o DIAGRO ao detectar sinais da mosca.",
        ],
      },
      {
        actor: "Você, Cidadão",
        role: "cidadao",
        actions: [
          "Nunca transportar frutas frescas do Amapá para outro estado sem autorização.",
          "Não comprar frutas de origem desconhecida ou sem nota fiscal.",
          "Denunciar transporte irregular de frutas ao MAPA (0800 704 1995).",
        ],
      },
    ],
    citizenTip:
      "Uma única fruta transportada irregularmente pode carregar centenas de larvas. Sua atitude protege toda a fruticultura brasileira!",
  },

  /* ──────────────────────────────────────────────────────────────────────────
     CASO 2 — Vassoura-de-bruxa do Cupuaçuzeiro
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: "vassoura-bruxa-cupuacuzeiro",
    name: "Vassoura-de-bruxa do Cupuaçuzeiro",
    scientificName: "Moniliophthora perniciosa",
    threatLevel: "alerta-critico",

    imageSrc: "/images/cartilha/casos-reais/vassoura-cupuacu.jpg",
    credit: "Foto: Scott Bauer / ARS-USDA",
    cardImageAlt:
      "Ramos de cupuaçuzeiro deformados em formato de vassoura pelo fungo Moniliophthora perniciosa",

    /* Aba 1 */
    invasorHeadline: "A doença fúngica do cupuaçuzeiro",
    invasorDescription:
      'A Vassoura-de-bruxa do Cupuaçuzeiro (Theobroma grandiflorum) é causada pelo fungo Moniliophthora perniciosa. O patógeno infecta os tecidos jovens, provoca brotações anormais em formato de "vassoura" e pode levar os frutos à podridão, reduzindo a produção.',
    invasorImageSrc: "/images/cartilha/casos-reais/cupuacu-invasor.jpg",
    invasorCredit: "Foto: Ronaldo Rosa / Embrapa Amapá Oriental",
    invasorImageAlt:
      "Ramos de cupuaçuzeiro com sintomas de vassoura-de-bruxa",
    invasorRegionText:
      "No Amapá, a doença compromete o cupuaçuzeiro, espécie nativa de importância para a agricultura familiar. A identificação precoce e a remoção de tecidos infectados reduzem a fonte de inóculo (material que espalha o fungo) no plantio.",

    /* Aba 2 */
    symptoms: [
      {
        iconName: "Bug",
        title: 'Ramos em "Vassoura"',
        description:
          "Brotamentos compactos e eretos crescem em excesso, formando um feixe de ramos que lembra uma vassoura. Os ramos são inicialmente verdes e depois secam e escurecem.",
        imageSrc: "/images/cartilha/casos-reais/sintoma-cupuacu-ramos.jpg",
        credit: "Foto: Ronaldo Rosa / Embrapa Amapá Oriental",
        imageAlt:
          "Detalhe de ramos deformados em formato de vassoura no cupuaçuzeiro",
      },
      {
        iconName: "AlertTriangle",
        title: "Frutos de Cupuaçu Apodrecidos",
        description:
          "Frutos jovens podem parar de crescer, escurecer e murchar. Em frutos maiores, manchas marrons evoluem para a podridão da polpa.",
        imageSrc: "/images/cartilha/casos-reais/sintoma-cupuacu-frutos.jpg",
        credit: "Foto: Brantlee Spakes Richter, University of Florida / Bugwood.org",
        imageAlt:
          "Frutos de cupuaçu infectados com vassoura-de-bruxa apresentando podridão",
      },
      {
        iconName: "Microscope",
        title: "Estruturas Fúngicas Visíveis",
        description:
          "Em condições de alta umidade, o basidiocarpo do fungo pode surgir nos ramos secos infectados e liberar basidiósporos, que iniciam novas infecções.",
      },
      {
        iconName: "Leaf",
        title: "Engrossamento e Deformação de Ramos",
        description:
          "Ramos jovens infectados incham e apresentam internós curtos, resultando em deformações que reduzem a capacidade produtiva do cupuaçuzeiro.",
      },
    ],

    /* Aba 3 */
    combatActions: [
      {
        actor: "Embrapa",
        role: "orgao",
        actions: [
          "Desenvolvimento e recomendação de materiais de cupuaçu com maior tolerância.",
          "Pesquisa de controle biológico com Trichoderma spp.",
          "Orientação sobre o manejo integrado da doença no cupuaçuzeiro.",
        ],
      },
      {
        actor: "DIAGRO / Secretaria de Agricultura do Amapá",
        role: "orgao",
        actions: [
          "Monitoramento epidemiológico da doença nas principais regiões produtoras.",
          "Apoio à renovação de plantios com mudas sadias.",
        ],
      },
      {
        actor: "Agricultor",
        role: "agricultor",
        actions: [
          'Realizar a "poda fitossanitária": remover e destruir (queimar ou enterrar) todos os ramos e frutos infectados.',
          "Aplicar pasta bordalesa ou produtos cúpricos nos cortes de poda para proteger os ferimentos.",
          "Plantar materiais de cupuaçu recomendados pela assistência técnica.",
          "Evitar o sombreamento excessivo — reduzir a umidade inibe a disseminação do fungo.",
          "Realizar roços regulares para melhorar a ventilação do cupuaçuzal.",
        ],
      },
      {
        actor: "Você, Cidadão",
        role: "cidadao",
        actions: [
          "Valorize e compre cupuaçu do Amapá com origem identificada.",
          "Apoie a agricultura familiar produtora de cupuaçu.",
          "Não transporte mudas ou partes de plantas entre propriedades sem verificar sanidade.",
        ],
      },
    ],
    citizenTip:
      "O cupuaçu é um tesouro amazônico! Consumir produtos com origem rastreável ajuda a fortalecer a renda do agricultor familiar e as boas práticas fitossanitárias.",
  },

  /* ──────────────────────────────────────────────────────────────────────────
     CASO 3 — Amarelamento Letal das Palmeiras
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: "amarelamento-letal-palmeiras",
    name: "Amarelamento Letal das Palmeiras",
    scientificName: "Candidatus Phytoplasma palmae (16SrIV)",
    threatLevel: "quarentenaria-ausente",

    imageSrc: "/images/cartilha/casos-reais/amarelamento-palmeiras.jpg",
    credit: "Foto: USDA Forest Service",
    cardImageAlt:
      "Palmeira com sintomas de amarelamento letal causado por fitoplasma no Amapá",

    /* Aba 1 */
    invasorHeadline: "Uma doença letal das palmeiras",
    invasorDescription:
      "O Amarelamento Letal das Palmeiras está associado a fitoplasmas do grupo 16SrIV, incluindo Candidatus Phytoplasma palmae. Esses microrganismos vivem no floema, interferem no transporte de nutrientes e podem levar a palmeira à morte.",
    invasorImageSrc: "/images/cartilha/casos-reais/palmeiras-invasor.jpg",
    invasorCredit: "Foto: USDA Forest Service / Bugwood.org",
    invasorImageAlt:
      "Palmeira com amarelamento letal avançado",
    invasorRegionText:
      "No Brasil, o Amarelamento Letal é tratado como praga quarentenária ausente. A prevenção e o monitoramento são essenciais; uma suspeita deve ser confirmada por laboratório antes de qualquer medida oficial de eliminação.",

    /* Aba 2 */
    symptoms: [
      {
        iconName: "AlertTriangle",
        title: "Amarelamento Progressivo das Folhas",
        description:
          "Em geral, ocorre primeiro a queda dos frutos; depois, as folhas mais velhas começam a amarelar e o sintoma avança para a copa. A doença é progressiva e letal.",
        imageSrc: "/images/cartilha/casos-reais/sintoma-palmeiras-folhas.jpg",
        credit: "Foto: USDA Forest Service / Bugwood.org",
        imageAlt:
          "Palmeira com folhas amareladas",
      },
      {
        iconName: "Bug",
        title: "Aborto de Frutos e Comprometimento do Meristema",
        description:
          "Os frutos deixam de se desenvolver e caem prematuramente. Em estágio avançado, o meristema apical é comprometido, indicando a morte iminente da palmeira.",
      },
      {
        iconName: "Microscope",
        title: "Transmissão por Cigarrinhas",
        description:
          "O fitoplasma pode ser transmitido por cigarrinhas vetoras que se alimentam do floema de palmeiras doentes e depois de plantas saudáveis.",
      },
      {
        iconName: "Leaf",
        title: "Morte em Poucos Meses",
        description:
          "Após os primeiros sintomas, a palmeira pode morrer em poucos meses. Não existe tratamento curativo; o controle depende da prevenção, da confirmação laboratorial e das medidas oficiais.",
      },
    ],

    /* Aba 3 */
    combatActions: [
      {
        actor: "Embrapa Amapá / INPA",
        role: "orgao",
        actions: [
          "Pesquisa de palmeiras com resistência ao fitoplasma.",
          "Monitoramento epidemiológico de palmeiras nativas e cultivadas.",
          "Estudo da biologia das cigarrinhas vetoras para desenvolver estratégias de controle.",
          "Diagnóstico molecular (PCR) para confirmação da presença do fitoplasma.",
        ],
      },
      {
        actor: "DIAGRO / MAPA",
        role: "orgao",
        actions: [
          "Fiscalização do trânsito de mudas de palmeiras entre estados.",
          "Regulamentação e apoio à eliminação de palmeiras sintomáticas.",
          "Alertas fitossanitários para produtores de palmeiras.",
        ],
      },
      {
        actor: "Agricultor",
        role: "agricultor",
        actions: [
          "Comunicar imediatamente a suspeita ao órgão de defesa agropecuária e seguir a orientação técnica.",
          "Controlar as cigarrinhas vetoras com inseticidas registrados ou controle biológico.",
          "Não utilizar mudas de procedência desconhecida no plantio.",
          "Monitorar regularmente as palmeiras e comunicar ao DIAGRO qualquer sinal suspeito.",
        ],
      },
      {
        actor: "Você, Cidadão",
        role: "cidadao",
        actions: [
          "Não transporte mudas de palmeiras entre regiões sem inspeção sanitária.",
          "Comunique aos órgãos de defesa agropecuária suspeitas em palmeiras.",
        ],
      },
    ],
    citizenTip:
      "Proteger as palmeiras depende de monitoramento, mudas sadias e comunicação rápida de sintomas ao órgão de defesa agropecuária.",
  },

  /* ──────────────────────────────────────────────────────────────────────────
     CASO 4 — Vassoura-de-bruxa da Mandioca
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: "vassoura-bruxa-mandioca",
    name: "Vassoura-de-bruxa da Mandioca",
    scientificName: "Rhizoctonia theobromae (Ceratobasidium theobromae)",
    threatLevel: "quarentenaria",

    imageSrc: "/images/cartilha/casos-reais/vassoura-mandioca.jpg",
    credit: "Foto: Antônio Carlos Pereira de Góes / Embrapa Amapá",
    cardImageAlt:
      "Planta de mandioca com sintomas de vassoura-de-bruxa causados por Rhizoctonia theobromae",

    /* Aba 1 */
    invasorHeadline: "A doença fúngica da mandioca",
    invasorDescription:
      'A Vassoura-de-bruxa da Mandioca, também chamada de morte descendente, é causada pelo fungo Rhizoctonia theobromae (Ceratobasidium theobromae). O agente causal provoca brotações anormais, deformação dos ramos e perda de vigor, comprometendo o desenvolvimento da mandioca.',
    invasorImageSrc: "/images/cartilha/casos-reais/mandioca-invasor.jpg",
    invasorCredit: "Foto: Antônio Carlos Pereira / Embrapa Amapá",
    invasorImageAlt:
      "Ramos de mandioca com sintomas de vassoura-de-bruxa",
    invasorRegionText:
      "No Amapá, a doença foi detectada em plantios de mandioca e pode reduzir o crescimento, causar morte descendente e comprometer as raízes comerciais. O uso de manivas sadias e a retirada de plantas sintomáticas ajudam a conter a disseminação.",

    /* Aba 2 */
    symptoms: [
      {
        iconName: "Bug",
        title: "Brotações em Forma de Vassoura",
        description:
          "Brotações laterais fracas e finas crescem de forma compacta e desordenada, formando o aspecto de uma vassoura velha nos ramos da mandioca.",
        imageSrc: "/images/cartilha/casos-reais/sintoma-mandioca-necrose.jpg",
        credit: "Foto: Adilson Lima / Embrapa Amapá",
        imageAlt:
          "Brotações deformadas em forma de vassoura na mandioca",
      },
      {
        iconName: "AlertTriangle",
        title: "Deformação e Encurtamento dos Ramos",
        description:
          "Os ramos ficam secos e deformados, com entrenós curtos e crescimento irregular. Ao cortar a haste, podem ser vistos tecidos internos escurecidos.",
      },
      {
        iconName: "Microscope",
        title: "Agente Causal: Rhizoctonia theobromae",
        description:
          "O fungo pode ser disseminado por manivas infectadas, ferramentas, solo e água. Por isso, o material de plantio e a higiene das ferramentas são importantes.",
      },
      {
        iconName: "Leaf",
        title: "Perda de Vigor da Mandioca",
        description:
          "A planta pode apresentar nanismo, folhas amareladas, murcha, secamento progressivo de cima para baixo e morte.",
      },
    ],

    /* Aba 3 */
    combatActions: [
      {
        actor: "Embrapa / DIAGRO",
        role: "orgao",
        actions: [
          "Monitoramento da ocorrência da doença nas áreas produtoras de mandioca.",
          "Orientação sobre diagnóstico, manejo e uso de material propagativo sadio.",
          "Pesquisa de materiais de mandioca mais tolerantes e de medidas de controle.",
        ],
      },
      {
        actor: "Agricultor",
        role: "agricultor",
        actions: [
          "Usar manivas sadias e de procedência conhecida no plantio.",
          "Seguir a orientação oficial para eliminar e destruir plantas e ramos com sintomas, evitando deixá-los na área.",
          "Desinfetar ferramentas de corte antes de utilizá-las em outra planta.",
          "Comunicar ao serviço de defesa agropecuária quando identificar sintomas suspeitos.",
        ],
      },
      {
        actor: "Você, Cidadão",
        role: "cidadao",
        actions: [
          "Não transportar manivas sem verificar a origem e a sanidade do material.",
          "Valorizar a produção de mandioca com procedência conhecida.",
          "Informar suspeitas de disseminação ao órgão de defesa agropecuária.",
        ],
      },
    ],
    citizenTip:
      "A escolha de manivas sadias e a comunicação rápida de sintomas ajudam a proteger os plantios de mandioca.",
  },
];

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

export function getThreatLabel(level: ThreatLevel): string {
  const labels: Record<ThreatLevel, string> = {
    quarentenaria: "Praga Quarentenária Presente (PQP)",
    "quarentenaria-ausente": "Praga Quarentenária Ausente (PQA)",
    "alerta-critico": "Alerta Crítico",
    monitorada: "Sob Monitoramento",
    "praga-regional": "Alerta Fitossanitário",
  };
  return labels[level];
}
