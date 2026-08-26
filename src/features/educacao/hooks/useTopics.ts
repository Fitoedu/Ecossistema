'use client'

import { useState, useEffect, useCallback } from 'react'
import { getTopics } from '@/lib/services/topicsService'
import type { Topic } from '@/lib/types'

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTopics()
      setTopics(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  return { topics, loading, error, refetch: fetch }
}
