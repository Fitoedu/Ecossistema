import {
  BookOpen,
  Bug,
  FlaskConical,
  GraduationCap,
  LayoutGrid,
  Leaf,
  Lock,
  Microscope,
  Sprout,
  TreeDeciduous,
  Trophy,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Topic } from '../components/TopicCard'
export type { Topic }

export const iconMap: Record<string, LucideIcon> = {
  Microscope,
  FlaskConical,
  Bug,
  Leaf,
  Sprout,
  TreeDeciduous,
  BookOpen,
  LayoutGrid,
}

export const temas: Topic[] = [
  {
    slug: 'fitopatologia-basica',
    title: 'Fitopatologia Básica',
    description:
      'Entenda as principais doenças de plantas, seus agentes causadores, sintomas e como identificar corretamente cada tipo de infecção.',
    level: 'Básico',
    category: 'Fitopatologia',
    icon: 'Microscope',
    color: '#2E7D32',
    duration: '45 min',
    lessons: 8,
    progress: 100,
  },
  {
    slug: 'doencas-fungicas-em-culturas',
    title: 'Doenças Fúngicas em Culturas',
    description:
      'Aprofunde-se nos fungos fitopatogênicos mais comuns, seu ciclo de vida e as estratégias de manejo integrado mais eficazes.',
    level: 'Intermediário',
    category: 'Fitopatologia',
    icon: 'FlaskConical',
    color: '#1565C0',
    duration: '1h 10min',
    lessons: 12,
    progress: 60,
  },
  {
    slug: 'viroses-e-bacterioses',
    title: 'Viroses e Bacterioses',
    description:
      'Conheça as principais viroses e bacterioses que afetam culturas regionais, vetores envolvidos e controle preventivo.',
    level: 'Avançado',
    category: 'Fitopatologia',
    icon: 'Bug',
    color: '#C62828',
    duration: '1h 30min',
    lessons: 15,
    progress: 20,
  },
  {
    slug: 'entomologia-agricola',
    title: 'Entomologia Agrícola',
    description:
      'Conheça os principais insetos-praga das culturas, seu comportamento, formas de identificação e estratégias de prevenção.',
    level: 'Básico',
    category: 'Entomologia',
    icon: 'Bug',
    color: '#E65100',
    duration: '50 min',
    lessons: 10,
    progress: 80,
  },
  {
    slug: 'controle-biologico-de-pragas',
    title: 'Controle Biológico de Pragas',
    description:
      'Explore as técnicas de controle biológico, organismos benéficos e como integrá-los ao manejo sustentável da lavoura.',
    level: 'Intermediário',
    category: 'Entomologia',
    icon: 'Leaf',
    color: '#558B2F',
    duration: '55 min',
    lessons: 9,
    progress: 0,
  },
  {
    slug: 'plantas-medicinais',
    title: 'Plantas Medicinais',
    description:
      'Explore usos terapêuticos, propriedades farmacológicas e cultivo de plantas medicinais de forma segura e contextualizada.',
    level: 'Básico',
    category: 'Plantas',
    icon: 'Sprout',
    color: '#00695C',
    duration: '40 min',
    lessons: 7,
    progress: 45,
  },
  {
    slug: 'agroecologia-e-sustentabilidade',
    title: 'Agroecologia e Sustentabilidade',
    description:
      'Compreenda os princípios da agroecologia, boas práticas agrícolas e como promover a biodiversidade nos sistemas produtivos.',
    level: 'Intermediário',
    category: 'Plantas',
    icon: 'TreeDeciduous',
    color: '#2E7D32',
    duration: '1h 05min',
    lessons: 11,
    progress: 0,
  },
  {
    slug: 'fitossanidade-e-legislacao',
    title: 'Fitossanidade e Legislação',
    description:
      'Conheça a legislação fitossanitária brasileira, normas de quarentena e o papel dos órgãos reguladores no controle de pragas.',
    level: 'Avançado',
    category: 'Fitopatologia',
    icon: 'BookOpen',
    color: '#4527A0',
    duration: '1h 20min',
    lessons: 14,
    progress: 0,
  },
]

export const tabs: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'todos', label: 'Todos', icon: LayoutGrid },
  { value: 'Fitopatologia', label: 'Fitopatologia', icon: Microscope },
  { value: 'Entomologia', label: 'Entomologia', icon: Bug },
  { value: 'Plantas', label: 'Plantas', icon: Leaf },
]

export interface TopicWithLock extends Topic {
  locked: boolean
}

/**
 * Ordem de progressão dos níveis. Usada para determinar, dentro de cada
 * categoria, quais módulos de nível inferior precisam estar concluídos
 * antes de liberar um módulo de nível superior.
 */
const LEVEL_ORDER: Record<Topic['level'], number> = {
  Básico: 0,
  Intermediário: 1,
  Avançado: 2,
}

/**
 * Aplica a trilha de bloqueio por NÍVEL dentro de cada categoria:
 * um módulo de nível Intermediário só é liberado quando TODOS os módulos
 * de nível Básico da mesma categoria estiverem 100% concluídos; um módulo
 * Avançado só é liberado quando Básico E Intermediário estiverem 100%
 * concluídos. Módulos Básico nunca são bloqueados (não há nível anterior).
 *
 * Diferente da versão anterior, "iniciar" um módulo (progress > 0) não é
 * suficiente para destravar o próximo nível — é necessário concluí-lo
 * (progress === 100).
 */
export function withLockState(topics: Topic[]): TopicWithLock[] {
  return topics.map((topic) => {
    const lowerLevelTopics = topics.filter(
      (t) =>
        t.category === topic.category &&
        LEVEL_ORDER[t.level] < LEVEL_ORDER[topic.level],
    )
    const locked = lowerLevelTopics.some((t) => t.progress < 100)
    return { ...topic, locked }
  })
}

/**
 * Busca um tópico pelo slug já com o estado de bloqueio calculado sobre a
 * lista completa, para que o link direto para a URL respeite a mesma trilha
 * de progressão usada na listagem.
 */
export function getTopicBySlug(slug: string): TopicWithLock | undefined {
  return withLockState(temas).find((t) => t.slug === slug)
}

/** Usado por generateStaticParams em app/educacao/[slug]/page.tsx. */
export function getAllSlugs(): string[] {
  return temas.map((t) => t.slug)
}

export interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
  orderIndex?: number
  summary?: string
  content?: string
  tips?: string[]
  keyTakeaways?: string[]
  videoUrl?: string
}

/**
 * Aulas detalhadas padrão com conteúdo didático fitossanitário real.
 */
export const defaultLessonsByTopic: Record<string, Lesson[]> = {
  'fitopatologia-basica': [
    {
      id: 'fitopatologia-basica-aula-1',
      title: '1. O que é Fitopatologia e o Triângulo da Doença',
      duration: '6 min',
      completed: true,
      orderIndex: 1,
      summary:
        'Fundamentos da fitopatologia e compreensão dos 3 fatores cruciais para que uma doença se estabeleça.',
      content: `A **Fitopatologia** (do grego *phyton* = planta, *pathos* = doença, *logos* = estudo) é a ciência que estuda as doenças em plantas, suas causas (etiologia), mecanismos de desenvolvimento e métodos de manejo.

### O Triângulo das Doenças
Para que ocorra uma doença em qualquer lavoura ou jardim, é estritamente necessária a interação de três elementos fundamentais:

1. **Hospedeiro Suscetível:** A planta precisa ser vulnerável ao patógeno naquele estágio fenológico.
2. **Patógeno Virulento:** Presença de fungo, bactéria, vírus ou nematoide capaz de causar infecção.
3. **Ambiente Favorável:** Condições de temperatura, umidade foliar, luminosidade e vento adequadas para a germinação e disseminação do patógeno.

Se qualquer um desses três vértices for quebrado através do manejo agrícola adequado, a doença **não se desenvolve**.`,
      tips: [
        'Monitore a umidade relativa do ar e o tempo de molhamento foliar nas primeiras horas da manhã.',
        'Escolha sempre cultivares certificadas e com resistência genética comprovada.',
      ],
      keyTakeaways: [
        'Doença é o resultado da interação entre Planta + Patógeno + Ambiente.',
        'O manejo preventivo atua quebrando pelo menos um dos lados do triângulo.',
      ],
    },
    {
      id: 'fitopatologia-basica-aula-2',
      title: '2. Sintomas vs. Sinais: Como Diagnosticar',
      duration: '8 min',
      completed: true,
      orderIndex: 2,
      summary:
        'Aprenda a diferenciar as reações da planta (sintomas) das estruturas visíveis do próprio patógeno (sinais).',
      content: `No diagnóstico de campo, é essencial saber distinguir dois conceitos fundamentais:

### 1. Sintomas (Reação do Hospedeiro)
São as manifestações externas ou internas decorrentes da agressão do patógeno:
* **Necrose:** Morte localizada de tecidos (manchas foliares, cancros, podridões).
* **Clorose:** Amarelecimento provocado pela degradação da clorofila.
* **Murcha:** Perda de turgidez dos tecidos por entupimento dos vasos condutores (xilema).
* **Hipertrofia:** Crescimento celular anormal (galhas, verrugas, superbrotamento).

### 2. Sinais (Estruturas do Patógeno)
São as partes do próprio organismo causador visíveis a olho nu ou com lupa de mão:
* Micélio e hifas esbranquiçadas (ex: Oídio).
* Pústulas com esporos alaranjados ou ferruginosos (ex: Ferrugem).
* Exsudato bacteriano viscoso (gotículas brilhantes em cortes de caule).`,
      tips: [
        'Utilize uma lupa de campo (10x ou 20x) para inspecionar a face abaxial (inferior) das folhas.',
        'Em caso de suspeita de bacteriose vascular, faça o teste do copo d\'água para observar o fluxo bacteriano.',
      ],
      keyTakeaways: [
        'Sintoma é o que a planta sente/mostra.',
        'Sinal é o corpo do patógeno visível na lesão.',
      ],
    },
    {
      id: 'fitopatologia-basica-aula-3',
      title: '3. Doenças Fúngicas: Principais Grupos e Sintomas',
      duration: '10 min',
      completed: true,
      orderIndex: 3,
      summary:
        'Conheça os fungos fitopatogênicos mais frequentes: míldios, oídios, ferrugens e manchas foliares.',
      content: `Os **fungos** representam cerca de 80% das doenças infecciosas em plantas cultivadas.

### Principais grupos de fungos:
1. **Oídios (*Erysiphales*):** Formam um pó branco aveludado na superfície foliar. Prosperam em clima seco com alta umidade relativa.
2. **Míldios (*Oomycetes*):** Manchas oleosas na face superior e esporulação esbranquiçada/acinzentada na face inferior. Exigem água livre na folha.
3. **Ferrugens (*Pucciniales*):** Pústulas pulverulentas amarelas, castanhas ou avermelhadas.
4. **Antracnoses (*Colletotrichum spp.*):** Lesões necróticas deprimidas com pontuações escuras concentradas.`,
      tips: [
        'Evite irrigação por aspersão no final da tarde para diminuir o tempo de molhamento noturno.',
        'Elimine restos culturais infectados para reduzir a fonte de inóculo inicial.',
      ],
      keyTakeaways: [
        'Fungos necessitam de água ou alta umidade para emissão do tubo germinativo.',
        'Aeração adequada da copa e espaçamento correto reduzem drasticamente a severidade.',
      ],
    },
    {
      id: 'fitopatologia-basica-aula-4',
      title: '4. Bacterioses e Fitoplasmas',
      duration: '7 min',
      completed: true,
      orderIndex: 4,
      summary:
        'Compreenda a penetração por ferimentos/aberturas naturais e a disseminação de bactérias patogênicas.',
      content: `As bactérias fitopatogênicas não conseguem penetrar diretamente na cutícula intacta da planta. Elas dependem de:
* **Aberturas naturais:** Estômatos, hidatódios, lenticelas.
* **Ferimentos mecânicos:** Poda, desbrota, granizo, mastigação de insetos.

### Sintomas típicos de bacteriose:
* **Encharcamento (*anasarca/hidrose*):** Manchas com aspecto translúcido ou encharcado inicial.
* **Halo clorótico:** Auréola amarelada intensa ao redor da mancha necrótica devido à liberação de toxinas.
* **Podridão mole e fétida:** Ação de enzimas pectinolíticas degradando a parede celular.`,
      tips: [
        'Desinfete tesouras e ferramentas de poda com álcool 70% ou solução de hipoclorito de sódio 2%.',
        'Evite trabalhos de campo e colheita quando as plantas estiverem molhadas pelo orvalho.',
      ],
      keyTakeaways: [
        'Bactérias requerem ferimentos ou aberturas naturais para penetração.',
        'A higiene rigorosa de ferramentas é a principal barreira sanitária.',
      ],
    },
    {
      id: 'fitopatologia-basica-aula-5',
      title: '5. Viroses e Insetos Vetores',
      duration: '8 min',
      completed: true,
      orderIndex: 5,
      summary:
        'Ciclo das viroses, mosaicos, encrespamentos e a importância do controle de pulgões e moscas-brancas.',
      content: `Os vírus são parasitas intracelulares obrigatórios. Uma vez infectada, a planta não pode ser "curada" quimicamente; o controle baseia-se exclusivamente na prevenção e eliminação dos vetores.

### Sintomas comuns de viroses:
* **Mosaico:** Alternância de áreas verde-claras e verde-escuras no limbo foliar.
* **Mosaico amarelo e clareamento de nervuras.**
* **Nanismo e deformação foliar:** Encrespamento, folhas filiformes ou em "bolha".

### Principais vetores:
* Pulgões (*Aphididae*)
* Mosca-branca (*Bemisia tabaci*)
* Tripes (*Thysanoptera* — vetores de tospovírus)
* Cigarrinhas (*Cicadellidae*)`,
      tips: [
        'Instale armadilhas adesivas amarelas e azuis nas bordaduras da área para monitorar vetores.',
        'Erradique imediatamente plantas com sintomas confirmados (*roguing*) para evitar propagação.',
      ],
      keyTakeaways: [
        'Não há viricidas agrícolas curativos; o foco é o controle do inseto vetor.',
        'Mudas sadias e certificadas são o ponto de partida indispensável.',
      ],
    },
    {
      id: 'fitopatologia-basica-aula-6',
      title: '6. Nematoides: Os Inimigos Invisíveis do Solo',
      duration: '7 min',
      completed: true,
      orderIndex: 6,
      summary:
        'Identificação de nematoides-das-galhas e das lesões radiculares e métodos de rotação de culturas.',
      content: `Nematoides fitoparasitas são vermes microscópicos desprovidos de segmentação que atacam predominantemente o sistema radicular das plantas.

### Gêneros mais expressivos:
* ***Meloidogyne spp.* (Nematoides-das-galhas):** Causam engrossamento e nódulos radiculares que impedem a absorção de água e nutrientes.
* ***Pratylenchus spp.* (Nematoides-das-lesões):** Penetram e migram dentro do córtex radicular causando necrose e porta de entrada para fungos de solo.
* ***Heterodera / Globodera* (Nematoides-de-cisto).**

### Manejo sustentável:
* Adubação verde com plantas antagonistas (*Crotalaria spectabilis*, *Tagetes erecta*).
* Incorporação de matéria orgânica para estimular fungos e bactérias nematófagos nativos.
* Descontaminação de implementos e tratores antes de transitar entre talhões.`,
      tips: [
        'Realize amostragem de solo e raízes em reboleiras com histórico de definhamento.',
        'Utilize *Bacillus subtilis* e *Purpureocillium lilacinum* como bionematicidas registrados.',
      ],
      keyTakeaways: [
        'O ataque ocorre em reboleiras no solo.',
        'Rotação de culturas com espécies não hospedeiras e adubação verde são ferramentas essenciais.',
      ],
    },
    {
      id: 'fitopatologia-basica-aula-7',
      title: '7. Coleta e Envio de Amostras para Laboratório',
      duration: '5 min',
      completed: true,
      orderIndex: 7,
      summary:
        'Passo a passo correto para coletar folhas, ramos e raízes sem degradar o material biológico.',
      content: `O sucesso do diagnóstico fitossanitário depende diretamente da qualidade da amostra encaminhada à clínica vegetal.

### Regras de ouro para coleta:
1. **Coletar a transição sadio-doente:** Nunca colete tecido 100% morto (colonizado por saprófitas secundários). A zona de avanço da lesão é onde o patógeno está ativo.
2. **Quantidade representativa:** Colete de 5 a 10 folhas ou ramos inteiros em diferentes plantas do talhão.
3. **Acondicionamento:** Embale em sacos de papel Kraft ou jornais limpos, mantendo em caixas térmicas com gelo reciclável (sem contato direto).
4. **Ficha de campo:** Acompanhe a amostra com data, histórico de pulverizações recentes, tipo de solo e estágio da cultura.`,
      tips: [
        'Evite sacos plásticos fechados sob calor, pois geram condensação e aceleram podridões secundárias.',
        'Envie a amostra preferencialmente no início da semana para não ficar retida nos correios durante o fim de semana.',
      ],
      keyTakeaways: [
        'Amostras com tecido na zona de transição garantem isolamento correto.',
        'Manter refrigeração e rapidez no transporte evita falsos diagnósticos.',
      ],
    },
    {
      id: 'fitopatologia-basica-aula-8',
      title: '8. Princípios do Manejo Integrado de Doenças (MID)',
      duration: '9 min',
      completed: true,
      orderIndex: 8,
      summary:
        'Integração de métodos genéticos, culturais, biológicos e químicos para sustentabilidade agronômica.',
      content: `O **Manejo Integrado de Doenças (MID)** não busca a erradicação cega, mas sim a manutenção da população patogênica abaixo do Nível de Dano Econômico (NDE).

### Pilares do MID:
* **Resistência Genética:** Escolha da cultivar ideal para o microclima local.
* **Práticas Culturais:** Rotação de culturas, plantio direto na palha, poda de aeração, manejo equilibrado de adubação (evitar excesso de nitrogênio).
* **Controle Biológico:** Uso de biofungicidas (*Trichoderma harzianum*, *Bacillus amyloliquefaciens*).
* **Controle Físico e Químico Racional:** Rotação de modos de ação (código FRAC) para prevenir resistência de fungicidas.`,
      tips: [
        'Consulte sempre o receituário agronômico e respeite o Período de Carência (Intervalo de Segurança).',
        'Priorize medidas preventivas em vez de intervenções químicas curativas tardias.',
      ],
      keyTakeaways: [
        'O MID combina todos os métodos disponíveis de forma harmônica e econômica.',
        'A rotação de princípios ativos preserva a vida útil das tecnologias agrícolas.',
      ],
    },
  ],
  'entomologia-agricola': [
    {
      id: 'entomologia-agricola-aula-1',
      title: '1. Introdução aos Insetos: Morfologia e Ordens',
      duration: '7 min',
      completed: true,
      orderIndex: 1,
      summary:
        'Anatomia dos insetos, distinção entre aparelho bucal mastigador e sugador e principais ordens de importância.',
      content: `Os insetos pertencem à classe *Insecta* e possuem o corpo dividido em três tagmas: **Cabeça**, **Tórax** (com 3 pares de pernas e 1 ou 2 pares de asas) e **Abdome**.

### Aparelhos Bucais e Tipos de Dano:
* **Mastigador (ex: gafanhotos, besouros, lagartas):** Provocam desfolha, broqueamento de caules e frutos.
* **Sugador labial (ex: percevejos, pulgões, cochonilhas):** Inserem o estilete e sugam seiva elaborada, injetando toxinas e transmitindo vírus.
* **Sugador maxilar (ex: borboletas e mariposas adultas):** Alimentam-se de néctar sem causar dano direto.`,
      tips: [
        'Identificar o tipo de mastigação ou orifício na folha ajuda a descobrir a praga mesmo sem avistá-la.',
      ],
      keyTakeaways: [
        'Aparelho bucal define o padrão do dano na cultura.',
        'Metamorfose completa (holometábolos) inclui fase de lagarta, a mais voraz.',
      ],
    },
    {
      id: 'entomologia-agricola-aula-2',
      title: '2. Pragas Mastigadoras: Lagartas e Besouros',
      duration: '9 min',
      completed: true,
      orderIndex: 2,
      summary:
        'Identificação de lagartas desfolhadoras, lagarta-do-cartucho, brocas e besouros desfolhadores.',
      content: `As lagartas (ordem *Lepidoptera*) representam uma das maiores pressões de desfolha em culturas agrícolas.

### Principais espécies:
* ***Spodoptera frugiperda* (Lagarta-do-cartucho):** Ataca o verticilo de gramíneas e folhas tenras, deixando serragem característica.
* ***Helicoverpa armigera*:** Danifica folhas e perfura estruturas reprodutivas (flores, vagens, frutos).
* ***Diabrotica speciosa* (Vaquinha-verde-amarela):** O adulto desfolha e a larva ("larva-alfinete") destrói as raízes.`,
      tips: [
        'Monitore a postura de ovos no início do ciclo vegetativo.',
        'Utilize *Bacillus thuringiensis* (Bt) quando as lagartas estiverem nos primeiros ínstares (< 1 cm).',
      ],
      keyTakeaways: [
        'Lagartas pequenas são muito mais fáceis de controlar biologicamente.',
        'Monitorar raspagens iniciais previne desfolhas massivas.',
      ],
    },
  ],
  'plantas-medicinais': [
    {
      id: 'plantas-medicinais-aula-1',
      title: '1. Introdução às Plantas Medicinais e Fitoterapia',
      duration: '6 min',
      completed: true,
      orderIndex: 1,
      summary:
        'História, valorização do conhecimento tradicional e comprovação científica dos princípios ativos.',
      content: `O uso de plantas medicinais acompanha a humanidade desde seus primórdios. Na fitoterapia moderna, a eficácia terapêutica está diretamente ligada à presença e concentração dos **metabólitos secundários** (óleos essenciais, flavonoides, alcaloides, taninos e saponinas).

### Cuidados indispensáveis:
* **Identificação botânica correta:** Evitar confusões com plantas tóxicas ou espécies correlatas de nomes populares idênticos.
* **Boas práticas de cultivo:** Solo livre de contaminantes químicos e metais pesados.`,
      tips: [
        'Sempre verifique o nome científico (*ex: Mentha spicata vs. Mentha piperita*).',
      ],
      keyTakeaways: [
        'A qualidade da planta medicinal depende das condições de solo, clima e colheita.',
      ],
    },
  ],
}

export function buildLessons(topic: Topic): Lesson[] {
  const specificLessons = defaultLessonsByTopic[topic.slug]
  if (specificLessons && specificLessons.length > 0) {
    const completedCount = Math.round((topic.progress / 100) * specificLessons.length)
    return specificLessons.map((lesson, idx) => ({
      ...lesson,
      completed: idx < completedCount,
    }))
  }

  const completedCount = Math.round((topic.progress / 100) * topic.lessons)
  return Array.from({ length: topic.lessons }, (_, i) => ({
    id: `${topic.slug}-aula-${i + 1}`,
    title: `Aula ${i + 1}: Conteúdo Prático e Teórico`,
    duration: '8 min',
    completed: i < completedCount,
    orderIndex: i + 1,
    summary: `Conceitos essenciais e diretrizes aplicadas para a aula ${i + 1} de ${topic.title}.`,
    content: `Bem-vindo à **Aula ${i + 1}** do módulo **${topic.title}**.

Nesta lição, analisamos os aspectos fundamentais, protocolos recomendados e os impactos diretos na sanidade vegetal e na sustentabilidade do cultivo.

### Principais Orientações Técnicas:
1. **Identificação e Diagnóstico:** Avalie as condições gerais da lavoura e os fatores abióticos associados.
2. **Intervenção Preventiva:** Priorize métodos biológicos, controle cultural e redução do estresse vegetal.
3. **Monitoramento Contínuo:** Estabeleça rotinas semanais de inspeção para rápida tomada de decisão.`,
    tips: [
      'Documente as observações de campo em seu caderno ou aplicativo de manejo.',
      'Sempre utilize equipamentos de proteção individual adequados nas atividades de campo.',
    ],
    keyTakeaways: [
      'O monitoramento constante previne perdas de produtividade.',
      'Ações integradas promovem equilíbrio biológico duradouro.',
    ],
  }))
}

export function getLessonByTopicAndId(
  topicSlug: string,
  lessonId: string,
): { topic: TopicWithLock; lesson: Lesson; index: number; total: number } | null {
  const topic = getTopicBySlug(topicSlug)
  if (!topic) return null

  const lessons = buildLessons(topic)
  const index = lessons.findIndex((l) => l.id === lessonId)
  if (index === -1) return null

  return {
    topic,
    lesson: lessons[index],
    index,
    total: lessons.length,
  }
}

export function buildStats(topics: TopicWithLock[]) {
  return [
    {
      label: 'Módulos',
      value: topics.length,
      icon: BookOpen,
      color: '#2E7D32',
    },
    {
      label: 'Concluídos',
      value: topics.filter((t) => t.progress === 100).length,
      icon: Trophy,
      color: '#FBC02D',
    },
    {
      label: 'Em progresso',
      value: topics.filter((t) => t.progress > 0 && t.progress < 100).length,
      icon: GraduationCap,
      color: '#1565C0',
    },
    {
      label: 'Bloqueados',
      value: topics.filter((t) => t.locked).length,
      icon: Lock,
      color: '#78716C',
    },
    {
      label: 'Categorias',
      value: [...new Set(topics.map((t) => t.category))].length,
      icon: LayoutGrid,
      color: '#E65100',
    },
  ]
}

export interface ModuleQuizQuestion {
  id: string
  question: string
  options: { id: string; text: string; isCorrect: boolean }[]
  explanation: string
}

export const moduleQuizzes: Record<string, ModuleQuizQuestion[]> = {
  'fitopatologia-basica': [
    {
      id: 'fb-q1',
      question: 'Quais são os três componentes essenciais do Triângulo da Doença?',
      options: [
        { id: 'fb-q1-a', text: 'Hospedeiro suscetível, Patógeno virulento e Ambiente favorável.', isCorrect: true },
        { id: 'fb-q1-b', text: 'Solo ácido, Água da chuva e Luz solar excessiva.', isCorrect: false },
        { id: 'fb-q1-c', text: 'Fungos, Bactérias e Insetos vetores.', isCorrect: false },
        { id: 'fb-q1-d', text: 'Adubação química, Agrotóxico e Planta daninha.', isCorrect: false },
      ],
      explanation: 'Para que uma doença vegetal ocorra, é indispensável a interação simultânea entre uma planta suscetível, um patógeno com capacidade de infecção e um ambiente físico-climático favorável.',
    },
    {
      id: 'fb-q2',
      question: 'Qual a diferença correta entre Sintoma e Sinal no diagnóstico fitopatológico?',
      options: [
        { id: 'fb-q2-a', text: 'Sintomas são fungos visíveis; Sinais são bactérias microscópicas.', isCorrect: false },
        { id: 'fb-q2-b', text: 'Sintoma é a reação fisiológica da planta; Sinal são as estruturas visíveis do próprio patógeno.', isCorrect: true },
        { id: 'fb-q2-c', text: 'Sintomas ocorrem apenas na raiz e Sinais apenas nas folhas.', isCorrect: false },
        { id: 'fb-q2-d', text: 'Não há diferença científica entre os dois termos.', isCorrect: false },
      ],
      explanation: 'Sintomas são as manifestações da planta (como necrose, murcha e clorose), enquanto sinais são as estruturas do parasita presentes na lesão (como micélio, esporos ou exsudato).',
    },
    {
      id: 'fb-q3',
      question: 'Por que os vírus em plantas não podem ser eliminados com fungicidas ou bactericidas?',
      options: [
        { id: 'fb-q3-a', text: 'Porque os vírus são parasitas intracelulares obrigatórios sem metabolismo próprio independente.', isCorrect: true },
        { id: 'fb-q3-b', text: 'Porque os vírus vivem apenas no solo abaixo das raízes.', isCorrect: false },
        { id: 'fb-q3-c', text: 'Porque os vírus só atacam plantas silvestres resistentes.', isCorrect: false },
        { id: 'fb-q3-d', text: 'Porque fungicidas aumentam a reprodução viral.', isCorrect: false },
      ],
      explanation: 'Os vírus replicam-se utilizando a maquinaria da célula hospedeira. Por não possuírem células próprias, o manejo apoia-se no controle dos insetos vetores (pulgões, mosca-branca) e na erradicação de plantas infectadas.',
    },
    {
      id: 'fb-q4',
      question: 'Qual é a forma de penetração mais comum das bactérias fitopatogênicas na planta?',
      options: [
        { id: 'fb-q4-a', text: 'Perfuração mecânica direta da cutícula com estilete.', isCorrect: false },
        { id: 'fb-q4-b', text: 'Penetração através de aberturas naturais (estômatos/hidatódios) e ferimentos.', isCorrect: true },
        { id: 'fb-q4-c', text: 'Absorção pelas sementes impermeáveis.', isCorrect: false },
        { id: 'fb-q4-d', text: 'Disseminação apenas pelo pólen durante a floração.', isCorrect: false },
      ],
      explanation: 'Bactérias não possuem estruturas de perfuração ativa da cutícula; elas ingressam passivamente em aberturas naturais ou lesões mecânicas de podas, granizo ou desbrotas.',
    },
    {
      id: 'fb-q5',
      question: 'No Manejo Integrado de Doenças (MID), qual é o objetivo prioritário?',
      options: [
        { id: 'fb-q5-a', text: 'Erradicar 100% dos micro-organismos do agroecossistema.', isCorrect: false },
        { id: 'fb-q5-b', text: 'Manter a população do patógeno abaixo do nível de dano econômico, integrando métodos genéticos, biológicos e culturais.', isCorrect: true },
        { id: 'fb-q5-c', text: 'Substituir todas as práticas agronômicas por pulverizações preventivas diárias.', isCorrect: false },
        { id: 'fb-q5-d', text: 'Utilizar exclusivamente cultivares antigas sem adubação.', isCorrect: false },
      ],
      explanation: 'O MID busca a convivência econômica e ecológica equilibrada, combinando resistência genética, controle biológico e boas práticas de cultivo com uso racional de defensivos.',
    },
  ],
  'entomologia-agricola': [
    {
      id: 'ea-q1',
      question: 'Qual das seguintes características anatômicas define os insetos adultos da classe Insecta?',
      options: [
        { id: 'ea-q1-a', text: 'Corpo em 3 tagmas (cabeça, tórax, abdome) e 3 pares de pernas.', isCorrect: true },
        { id: 'ea-q1-b', text: 'Corpo dividido em cefalotórax e abdome com 4 pares de pernas.', isCorrect: false },
        { id: 'ea-q1-c', text: 'Corpo sem segmentação e presença de tentáculos.', isCorrect: false },
        { id: 'ea-q1-d', text: 'Presença de 5 pares de patas e quelíceras.', isCorrect: false },
      ],
      explanation: 'Os insetos são hexápodes, caracterizados pela divisão do corpo em cabeça, tórax (onde se inserem as 6 pernas) e abdome.',
    },
    {
      id: 'ea-q2',
      question: 'Qual dano típico é causado por insetos com aparelho bucal sugador (como pulgões e percevejos)?',
      options: [
        { id: 'ea-q2-a', text: 'Desfolha completa em formato de meia-lua.', isCorrect: false },
        { id: 'ea-q2-b', text: 'Sucção de seiva elaborada, injeção de toxinas e potencial transmissão de vírus.', isCorrect: true },
        { id: 'ea-q2-c', text: 'Broqueamento profundo de troncos com serragem seca.', isCorrect: false },
        { id: 'ea-q2-d', text: 'Corte rente do colo de plântulas no solo.', isCorrect: false },
      ],
      explanation: 'Insetos sugadores utilizam seus estiletes para extrair nutrientes diretamente do floema/xilema, causando murcha, manchas cloróticas e disseminando vírus vegetais.',
    },
  ],
  'plantas-medicinais': [
    {
      id: 'pm-q1',
      question: 'Qual fator é determinante para a concentração de princípios ativos e segurança no uso de plantas medicinais?',
      options: [
        { id: 'pm-q1-a', text: 'Identificação botânica rigorosa pelo nome científico e cultivo em solo livre de contaminantes.', isCorrect: true },
        { id: 'pm-q1-b', text: 'Utilização exclusiva de nomes populares regionais.', isCorrect: false },
        { id: 'pm-q1-c', text: 'Colheita da planta em qualquer estágio, independentemente do horário.', isCorrect: false },
        { id: 'pm-q1-d', text: 'Secagem ao sol forte por mais de 15 dias consecutivos.', isCorrect: false },
      ],
      explanation: 'A identificação taxonômica correta previne intoxicações por espécies similares, e o cultivo em ambiente adequado assegura a pureza e a quantidade adequada de metabólitos secundários terapêuticos.',
    },
  ],
}

/**
 * Retorna as perguntas de avaliação do módulo (ou gera perguntas padrão se não houver específicas).
 */
export function getModuleQuiz(topicSlug: string): ModuleQuizQuestion[] {
  const specific = moduleQuizzes[topicSlug]
  if (specific && specific.length > 0) {
    return specific
  }

  const topic = getTopicBySlug(topicSlug)
  const title = topic?.title ?? 'Fitossanidade e Manejo'

  return [
    {
      id: `${topicSlug}-q1`,
      question: `Qual é o foco central estudado no módulo "${title}"?`,
      options: [
        { id: `${topicSlug}-q1-a`, text: 'Compreender os princípios preventivos, identificação técnica e manejo sustentável.', isCorrect: true },
        { id: `${topicSlug}-q1-b`, text: 'Aplicação indiscriminada de defensivos sem amostragem prévia.', isCorrect: false },
        { id: `${topicSlug}-q1-c`, text: 'Ignorar as condições climáticas e o histórico do talhão.', isCorrect: false },
        { id: `${topicSlug}-q1-d`, text: 'Substituição total de espécies nativas por monoculturas suscetíveis.', isCorrect: false },
      ],
      explanation: 'O estudo fitossanitário fundamenta-se na prevenção, no diagnóstico acurado e na sustentabilidade do ecossistema.',
    },
    {
      id: `${topicSlug}-q2`,
      question: 'Por que o monitoramento constante da lavoura é considerado uma boa prática agronômica?',
      options: [
        { id: `${topicSlug}-q2-a`, text: 'Porque permite detectar infestações iniciais e agir antes do dano econômico.', isCorrect: true },
        { id: `${topicSlug}-q2-b`, text: 'Porque elimina a necessidade de qualquer intervenção futura.', isCorrect: false },
        { id: `${topicSlug}-q2-c`, text: 'Porque substitui as análises de solo e água.', isCorrect: false },
        { id: `${topicSlug}-q2-d`, text: 'Não há impacto na produtividade final.', isCorrect: false },
      ],
      explanation: 'O monitoramento periódico detecta os primeiros focos da praga ou doença, viabilizando controle pontual e biológico com menor custo.',
    },
    {
      id: `${topicSlug}-q3`,
      question: 'Qual das alternativas representa uma medida preventiva eficiente no campo?',
      options: [
        { id: `${topicSlug}-q3-a`, text: 'Desinfecção de ferramentas, rotação de culturas e uso de mudas sadias certificadas.', isCorrect: true },
        { id: `${topicSlug}-q3-b`, text: 'Irrigação excessiva nas folhas durante a noite.', isCorrect: false },
        { id: `${topicSlug}-q3-c`, text: 'Reutilização contínua de implementos com terra infectada.', isCorrect: false },
        { id: `${topicSlug}-q3-d`, text: 'Plantio contínuo da mesma cultivar suscetível ano após ano.', isCorrect: false },
      ],
      explanation: 'A barreira sanitária através de higiene de equipamentos e diversificação cultural interrompe o ciclo reprodutivo dos patógenos.',
    },
  ]
}