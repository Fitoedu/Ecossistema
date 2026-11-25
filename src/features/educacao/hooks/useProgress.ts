'use client'

import { useCallback } from 'react'
import { getUserProgress, upsertProgress } from '@/lib/services/progressService'
import { useDataCache } from '@/hooks/useDataCache'
import type { UserProgress } from '@/lib/types'

export function useProgress(userId: string | null) {
  const fetcher = useCallback(async () => {
    if (!userId) return []
    return await getUserProgress(userId)
  }, [userId])

  const cacheKey = userId ? `user-progress:${userId}` : null

  const {
    data: progress,
    loading,
    isRevalidating,
    error,
    refetch,
    mutate,
  } = useDataCache<UserProgress[]>(cacheKey, fetcher, [], {
    enabled: !!userId,
    ttl: 3 * 60 * 1000, // 3 minutos de cache
  })

  /** Retorna o percentual de progresso de um topico especifico. */
  const getProgressPct = useCallback(
    (topicId: string) => progress.find((p) => p.topic_id === topicId)?.progress_pct ?? 0,
    [progress],
  )

  /** Atualiza o progresso com atualizacao otimista no cache e sincronizacao no Supabase. */
  const updateProgress = useCallback(
    async (topicId: string, completedLessons: number, pct: number) => {
      if (!userId) return

      // Atualizacao otimista imediata no cache
      mutate((prev) => {
        const existingIndex = prev.findIndex((p) => p.topic_id === topicId)
        const updatedItem: UserProgress = {
          id: existingIndex >= 0 ? prev[existingIndex].id : 'temp-id',
          user_id: userId,
          topic_id: topicId,
          completed_lessons: completedLessons,
          progress_pct: pct,
          updated_at: new Date().toISOString(),
        }

        if (existingIndex >= 0) {
          const next = [...prev]
          next[existingIndex] = updatedItem
          return next
        }
        return [...prev, updatedItem]
      })

      // Persiste no Supabase e revalida
      await upsertProgress(userId, topicId, completedLessons, pct)
      refetch(true)
    },
    [userId, mutate, refetch],
  )

  return {
    progress,
    loading: userId ? loading : false,
    isRevalidating,
    error: error ? error.message : null,
    getProgressPct,
    updateProgress,
    refetch,
  }
}
