'use client'

import { useState, useEffect, useCallback } from 'react'
import { getLessonsByTopic } from '@/lib/services/lessonsService'
import { getTopicBySlug, buildLessons, Lesson } from '@/app/educacao/_data/educacao'
import { upsertProgress, getTopicProgress } from '@/lib/services/progressService'

export function useLessons(topicSlug: string, topicDbId?: string | null, userId?: string | null) {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLessons = useCallback(async () => {
    setLoading(true)
    setError(null)

    const localTopic = getTopicBySlug(topicSlug)
    const localLessons = localTopic ? buildLessons(localTopic) : []

    try {
      if (topicDbId) {
        const dbLessons = await getLessonsByTopic(topicDbId)
        if (dbLessons && dbLessons.length > 0) {
          let completedCount = 0
          if (userId) {
            const prog = await getTopicProgress(userId, topicDbId)
            if (prog) {
              completedCount = prog.completed_lessons
            }
          }
          const mapped: Lesson[] = dbLessons.map((l, idx) => ({
            id: l.id,
            title: l.title,
            duration: l.duration ?? '8 min',
            completed: idx < completedCount,
            orderIndex: l.order_index,
            content: l.content ?? undefined,
          }))
          setLessons(mapped)
          setLoading(false)
          return
        }
      }

      // Check localStorage for offline/anonymous progress
      let completedIds: string[] = []
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem(`educafito_completed_${topicSlug}`)
          if (stored) completedIds = JSON.parse(stored)
        } catch {
          // ignore
        }
      }

      const merged = localLessons.map((l) => ({
        ...l,
        completed: completedIds.length > 0 ? completedIds.includes(l.id) : l.completed,
      }))

      setLessons(merged)
    } catch (e) {
      setError((e as Error).message)
      setLessons(localLessons)
    } finally {
      setLoading(false)
    }
  }, [topicSlug, topicDbId, userId])

  useEffect(() => {
    fetchLessons()
  }, [fetchLessons])

  /**
   * Alterna o estado de conclusão de uma lição e atualiza o progresso
   */
  const toggleLessonCompleted = useCallback(
    async (lessonId: string) => {
      setLessons((prev) => {
        const next = prev.map((l) => (l.id === lessonId ? { ...l, completed: !l.completed } : l))
        const completedCount = next.filter((l) => l.completed).length
        const total = next.length
        const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0

        // Persist local storage
        if (typeof window !== 'undefined') {
          const completedIds = next.filter((l) => l.completed).map((l) => l.id)
          localStorage.setItem(`educafito_completed_${topicSlug}`, JSON.stringify(completedIds))
        }

        // Persist Supabase if logged in and DB topic exists
        if (userId && topicDbId) {
          upsertProgress(userId, topicDbId, completedCount, pct).catch(() => {
            // silent catch in background
          })
        }

        return next
      })
    },
    [topicSlug, topicDbId, userId],
  )

  const markLessonCompleted = useCallback(
    async (lessonId: string) => {
      setLessons((prev) => {
        const next = prev.map((l) => (l.id === lessonId ? { ...l, completed: true } : l))
        const completedCount = next.filter((l) => l.completed).length
        const total = next.length
        const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0

        if (typeof window !== 'undefined') {
          const completedIds = next.filter((l) => l.completed).map((l) => l.id)
          localStorage.setItem(`educafito_completed_${topicSlug}`, JSON.stringify(completedIds))
        }

        if (userId && topicDbId) {
          upsertProgress(userId, topicDbId, completedCount, pct).catch(() => {})
        }

        return next
      })
    },
    [topicSlug, topicDbId, userId],
  )

  return {
    lessons,
    loading,
    error,
    toggleLessonCompleted,
    markLessonCompleted,
    refetch: fetchLessons,
  }
}

