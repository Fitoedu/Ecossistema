// lib/topics-data.ts
// Fonte única dos dados de conteúdo educacional + regras de negócio
// (contagens, trilha de bloqueio). Separado de page.tsx para permitir
// reuso (ex: sidebar, busca global) e futura troca por uma API/CMS
// sem tocar em componentes de apresentação.

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

export const temas: Topic[] = [
  {
    title: 'Fitopatologia Básica',
    description:
      'Entenda as principais doenças de plantas, seus agentes causadores, sintomas e como identificar corretamente cada tipo de infecção.',
    level: 'Básico',
    category: 'Fitopatologia',
    icon: Microscope,
    color: '#2E7D32',
    duration: '45 min',
    lessons: 8,
    progress: 100,
  },
  {
    title: 'Doenças Fúngicas em Culturas',
    description:
      'Aprofunde-se nos fungos fitopatogênicos mais comuns, seu ciclo de vida e as estratégias de manejo integrado mais eficazes.',
    level: 'Intermediário',
    category: 'Fitopatologia',
    icon: FlaskConical,
    color: '#1565C0',
    duration: '1h 10min',
    lessons: 12,
    progress: 60,
  },
  {
    title: 'Viroses e Bacterioses',
    description:
      'Conheça as principais viroses e bacterioses que afetam culturas regionais, vetores envolvidos e controle preventivo.',
    level: 'Avançado',
    category: 'Fitopatologia',
    icon: Bug,
    color: '#C62828',
    duration: '1h 30min',
    lessons: 15,
    progress: 20,
  },
  {
    title: 'Entomologia Agrícola',
    description:
      'Conheça os principais insetos-praga das culturas, seu comportamento, formas de identificação e estratégias de prevenção.',
    level: 'Básico',
    category: 'Entomologia',
    icon: Bug,
    color: '#E65100',
    duration: '50 min',
    lessons: 10,
    progress: 80,
  },
  {
    title: 'Controle Biológico de Pragas',
    description:
      'Explore as técnicas de controle biológico, organismos benéficos e como integrá-los ao manejo sustentável da lavoura.',
    level: 'Intermediário',
    category: 'Entomologia',
    icon: Leaf,
    color: '#558B2F',
    duration: '55 min',
    lessons: 9,
    progress: 0,
  },
  {
    title: 'Plantas Medicinais',
    description:
      'Explore usos terapêuticos, propriedades farmacológicas e cultivo de plantas medicinais de forma segura e contextualizada.',
    level: 'Básico',
    category: 'Plantas',
    icon: Sprout,
    color: '#00695C',
    duration: '40 min',
    lessons: 7,
    progress: 45,
  },
  {
    title: 'Agroecologia e Sustentabilidade',
    description:
      'Compreenda os princípios da agroecologia, boas práticas agrícolas e como promover a biodiversidade nos sistemas produtivos.',
    level: 'Intermediário',
    category: 'Plantas',
    icon: TreeDeciduous,
    color: '#2E7D32',
    duration: '1h 05min',
    lessons: 11,
    progress: 0,
  },
  {
    title: 'Fitossanidade e Legislação',
    description:
      'Conheça a legislação fitossanitária brasileira, normas de quarentena e o papel dos órgãos reguladores no controle de pragas.',
    level: 'Avançado',
    category: 'Fitopatologia',
    icon: BookOpen,
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
 * Aplica o mesmo modelo de trilha sequencial usado nas telas de nível
 * (ver print "Educação Fitossanitária"): dentro de cada categoria, um
 * módulo só é liberado depois que o módulo anterior da mesma categoria
 * foi iniciado (progress > 0). O primeiro módulo de cada categoria
 * nunca é bloqueado.
 */
export function withLockState(topics: Topic[]): TopicWithLock[] {
  const previousStarted = new Map<string, boolean>()
  return topics.map((topic) => {
    const unlockedByDefault = previousStarted.get(topic.category) ?? true
    const locked = !unlockedByDefault
    previousStarted.set(topic.category, topic.progress > 0)
    return { ...topic, locked }
  })
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
