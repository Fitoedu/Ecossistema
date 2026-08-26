'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { temas, defaultLessonsByTopic, getTopicBySlug, TopicWithLock } from '../data/educacao'
import { useProgress } from './useProgress'
import type { QuizAttemptResult } from './useModuleQuiz'

export interface BadgeItem {
  id: string
  title: string
  description: string
  icon: string
  category: string
  unlocked: boolean
  unlockedAt?: string
}

export interface CertifiedTopicItem {
  topic: TopicWithLock
  score: number
  date: string
  authCode: string
}

export interface InProgressTopicItem {
  topic: TopicWithLock
  progressPct: number
  completedLessons: number
  totalLessons: number
}

export function useGamification(userId: string | null) {
  const { progress } = useProgress(userId)
  const [quizResults, setQuizResults] = useState<Record<string, QuizAttemptResult>>({})
  const [localCompletedLessons, setLocalCompletedLessons] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)

  const loadLocalData = useCallback(() => {
    if (typeof window === 'undefined') return

    const results: Record<string, QuizAttemptResult> = {}
    const completedByTopic: Record<string, string[]> = {}

    for (const t of temas) {
      // Load quiz results
      try {
        const storedQuiz = localStorage.getItem(`educafito_quiz_${t.slug}`)
        if (storedQuiz) {
          results[t.slug] = JSON.parse(storedQuiz)
        }
      } catch {
        // ignore
      }

      // Load completed lessons
      try {
        const storedLessons = localStorage.getItem(`educafito_completed_${t.slug}`)
        if (storedLessons) {
          completedByTopic[t.slug] = JSON.parse(storedLessons)
        }
      } catch {
        // ignore
      }
    }

    setQuizResults(results)
    setLocalCompletedLessons(completedByTopic)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadLocalData()
  }, [loadLocalData])

  // Process certified topics
  const certifiedTopics = useMemo<CertifiedTopicItem[]>(() => {
    const list: CertifiedTopicItem[] = []

    for (const t of temas) {
      const topicWithLock = getTopicBySlug(t.slug)
      if (!topicWithLock) continue

      const quiz = quizResults[t.slug]
      // Certified if quiz score >= 70%
      if (quiz && quiz.passed) {
        list.push({
          topic: topicWithLock,
          score: quiz.score,
          date: new Date(quiz.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          authCode: `EF-${t.slug.slice(0, 6).toUpperCase()}-${Math.abs(
            t.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1234),
          )}`,
        })
      }
    }

    return list
  }, [quizResults])

  // Process in-progress topics
  const inProgressTopics = useMemo<InProgressTopicItem[]>(() => {
    const list: InProgressTopicItem[] = []

    for (const t of temas) {
      const topicWithLock = getTopicBySlug(t.slug)
      if (!topicWithLock) continue

      const isCertified = certifiedTopics.some((c) => c.topic.slug === t.slug)
      if (isCertified) continue

      const dbProg = progress.find((p) => p.topic_id === t.slug)
      const localLessons = localCompletedLessons[t.slug] ?? []

      const totalLessons = t.lessons
      let completedLessons = localLessons.length
      let pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      if (dbProg) {
        pct = Math.max(pct, dbProg.progress_pct)
        completedLessons = Math.max(completedLessons, dbProg.completed_lessons)
      }

      if (pct > 0 && pct < 100) {
        list.push({
          topic: topicWithLock,
          progressPct: pct,
          completedLessons,
          totalLessons,
        })
      }
    }

    return list
  }, [certifiedTopics, progress, localCompletedLessons])

  // Total completed lessons across all modules
  const totalCompletedLessons = useMemo(() => {
    let count = 0
    for (const t of temas) {
      const dbProg = progress.find((p) => p.topic_id === t.slug)
      const localLessons = localCompletedLessons[t.slug] ?? []
      count += Math.max(localLessons.length, dbProg?.completed_lessons ?? 0)
    }
    return count
  }, [progress, localCompletedLessons])

  // Compute Total XP
  const xp = useMemo(() => {
    const lessonsXp = totalCompletedLessons * 50
    const quizXp = Object.values(quizResults).filter((q) => q.passed).length * 150
    const certXp = certifiedTopics.length * 300
    return lessonsXp + quizXp + certXp
  }, [totalCompletedLessons, quizResults, certifiedTopics])

  // Level Progression
  const levelInfo = useMemo(() => {
    if (xp < 200) {
      return {
        levelName: 'Nível 1: Semeador',
        currentLevel: 1,
        minXp: 0,
        nextLevelXp: 200,
        progressPct: Math.round((xp / 200) * 100),
      }
    } else if (xp < 500) {
      return {
        levelName: 'Nível 2: Cultivador',
        currentLevel: 2,
        minXp: 200,
        nextLevelXp: 500,
        progressPct: Math.round(((xp - 200) / 300) * 100),
      }
    } else if (xp < 1000) {
      return {
        levelName: 'Nível 3: Fitossanitarista Júnior',
        currentLevel: 3,
        minXp: 500,
        nextLevelXp: 1000,
        progressPct: Math.round(((xp - 500) / 500) * 100),
      }
    } else {
      return {
        levelName: 'Nível 4: Guardião da Lavoura',
        currentLevel: 4,
        minXp: 1000,
        nextLevelXp: 2000,
        progressPct: Math.min(100, Math.round(((xp - 1000) / 1000) * 100)),
      }
    }
  }, [xp])

  // Badges System
  const badges = useMemo<BadgeItem[]>(() => {
    return [
      {
        id: 'first-step',
        title: 'Primeira Folha',
        description: 'Concluiu a primeira aula na plataforma EducaFito.',
        icon: 'Sprout',
        category: 'Início',
        unlocked: totalCompletedLessons >= 1,
      },
      {
        id: 'fitopatologia-master',
        title: 'Detetive Fitopatológico',
        description: 'Aprovado com certificado no módulo de Fitopatologia Básica.',
        icon: 'Microscope',
        category: 'Fitopatologia',
        unlocked: !!quizResults['fitopatologia-basica']?.passed,
      },
      {
        id: 'entomologia-master',
        title: 'Inspetor de Pragas',
        description: 'Aprovado com certificado no módulo de Entomologia Agrícola.',
        icon: 'Bug',
        category: 'Entomologia',
        unlocked: !!quizResults['entomologia-agricola']?.passed,
      },
      {
        id: 'plantas-master',
        title: 'Herbalista Consciente',
        description: 'Aprovado com certificado no módulo de Plantas Medicinais.',
        icon: 'Leaf',
        category: 'Plantas',
        unlocked: !!quizResults['plantas-medicinais']?.passed,
      },
      {
        id: 'triad-expert',
        title: 'Mestre da Sanidade Vegetal',
        description: 'Conquistou 3 ou mais certificados oficiais de capacitação.',
        icon: 'Trophy',
        category: 'Excelência',
        unlocked: certifiedTopics.length >= 3,
      },
    ]
  }, [totalCompletedLessons, quizResults, certifiedTopics])

  return {
    xp,
    levelInfo,
    badges,
    certifiedTopics,
    inProgressTopics,
    totalCompletedLessons,
    loading,
    refetch: loadLocalData,
  }
}

