import type { LucideIcon } from 'lucide-react'
import {
    Bug,
    Leaf,
    Microscope,
    Sprout,
} from 'lucide-react'

export type QuizCategory = {
    id: string
    icon: LucideIcon
    emoji: string
    label: string
    description: string
    accentColor: string
    gradient: string
    available: boolean
}

export type Achievement = {
    id: string
    emoji: string
    label: string
    description: string
}

export type FeaturedQuiz = {
    title: string
    description: string
    questionCount: number
    estimatedTime: string
    difficulty: string
    difficultyColor: string
    emoji: string
    accentColor: string
    gradient: string
    href: string
}

export const categories: QuizCategory[] = [
    {
        id: 'pragas',
        icon: Bug,
        emoji: '🦟',
        label: 'Pragas e Doenças',
        description: 'Identifique pragas comuns e seus métodos de controle.',
        accentColor: '#c2410c',
        gradient: 'linear-gradient(135deg, #fff3e6 0%, #fde0c0 100%)',
        available: true,
    },
    {
        id: 'plantas',
        icon: Leaf,
        emoji: '🌿',
        label: 'Plantas Medicinais',
        description: 'Espécies, propriedades terapêuticas e usos populares.',
        accentColor: '#0f6b3d',
        gradient: 'linear-gradient(135deg, #e6f9ee 0%, #cff0df 100%)',
        available: true,
    },
    {
        id: 'fitossanidade',
        icon: Sprout,
        emoji: '🌱',
        label: 'Fitossanidade Geral',
        description: 'Conceitos gerais sobre saúde das plantas e agricultura.',
        accentColor: '#0369a1',
        gradient: 'linear-gradient(135deg, #e6f4ff 0%, #c8e8fd 100%)',
        available: true,
    },
    {
        id: 'identificacao',
        icon: Microscope,
        emoji: '🔬',
        label: 'Identificação Visual',
        description: 'Reconheça sintomas e agentes causadores pelo visual.',
        accentColor: '#7c3aed',
        gradient: 'linear-gradient(135deg, #f0ebff 0%, #e0d4fd 100%)',
        available: false,
    },
]

export const achievements: Achievement[] = [
    {id: 'primeiro', emoji: '🎯', label: 'Primeiro Passo', description: 'Complete seu primeiro quiz'},
    {id: 'sequencia', emoji: '🔥', label: 'Em Chamas', description: '5 acertos seguidos'},
    {id: 'perfeito', emoji: '⭐', label: 'Nota Máxima', description: '100% de acertos em um quiz'},
    {id: 'dedicado', emoji: '📅', label: 'Dedicação', description: 'Jogue por 7 dias seguidos'},
    {id: 'explorador', emoji: '🗺️', label: 'Explorador', description: 'Complete todas as categorias'},
    {id: 'mestre', emoji: '🏆', label: 'Mestre Botânico', description: 'Acumule 1.000 pontos'},
]

export const featuredQuiz: FeaturedQuiz = {
    title: 'Pragas do Solo',
    description: 'Aprenda a identificar as principais pragas que atacam as raízes e o solo em plantações.',
    questionCount: 10,
    estimatedTime: '5 min',
    difficulty: 'Médio',
    difficultyColor: '#d97706',
    emoji: '🪱',
    accentColor: '#c2410c',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #7c1a00 60%, #c2410c 100%)',
    href: '/jogos/quiz/pragas-do-solo',
}
