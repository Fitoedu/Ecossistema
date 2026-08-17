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
}

/**
 * Gera a lista de lições de um tópico a partir do total (`lessons`) e do
 * progresso (`progress`) já existentes nos dados mockados. Quando o backend
 * de conteúdo estiver disponível, substitua esta função por uma chamada real
 * que retorne as lições com título e duração próprios de cada aula.
 */
export function buildLessons(topic: Topic): Lesson[] {
  const completedCount = Math.round((topic.progress / 100) * topic.lessons)
  return Array.from({ length: topic.lessons }, (_, i) => ({
    id: `${topic.slug}-aula-${i + 1}`,
    title: `Aula ${i + 1}`,
    duration: '8 min',
    completed: i < completedCount,
  }))
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