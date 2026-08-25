'use client'

import { useState, useEffect, useCallback } from 'react'
import { getUserProgress, upsertProgress } from '@/lib/services/progressService'
import type { UserProgress } from '@/lib/types'

export function useProgress(userId: string | null) {
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    setLoading(true)
    setError(null)
    try {
      const data = await getUserProgress(userId)
      setProgress(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => { fetch() }, [fetch])

  /** Retorna o percentual de progresso de um topico especifico. */
  const getProgressPct = useCallback(
    (topicId: string) => progress.find((p) => p.topic_id === topicId)?.progress_pct ?? 0,
    [progress],
  )

  /** Atualiza o progresso e recarrega o estado local. */
  const updateProgress = useCallback(
    async (topicId: string, completedLessons: number, pct: number) => {
      if (!userId) return
      await upsertProgress(userId, topicId, completedLessons, pct)
      await fetch()
    },
    [userId, fetch],
  )

  return { progress, loading, error, getProgressPct, updateProgress, refetch: fetch }
}
