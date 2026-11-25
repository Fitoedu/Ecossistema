'use client'

import { useCallback } from 'react'
import { getTopics } from '@/lib/services/topicsService'
import { useDataCache } from '@/hooks/useDataCache'
import type { Topic } from '@/lib/types'

export function useTopics() {
  const fetcher = useCallback(async () => {
    return await getTopics()
  }, [])

  const {
    data: topics,
    loading,
    isRevalidating,
    error,
    refetch,
    mutate,
  } = useDataCache<Topic[]>('topics:published', fetcher, [], {
    ttl: 10 * 60 * 1000, // 10 minutos de cache
  })

  return {
    topics,
    loading,
    isRevalidating,
    error: error ? error.message : null,
    refetch,
    mutate,
  }
}
