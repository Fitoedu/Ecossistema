'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  getCachedValue,
  setCachedValue,
  fetchWithCache,
  subscribeToCache,
  invalidateCache,
  type FetchWithCacheOptions,
} from '@/lib/cache/memoryCache'

export interface UseDataCacheOptions extends FetchWithCacheOptions {
  /** Se false, desativa a execução automática da busca (ex: quando userId é nulo) */
  enabled?: boolean
}

export interface UseDataCacheResult<T> {
  data: T
  loading: boolean
  isRevalidating: boolean
  error: Error | null
  refetch: (force?: boolean) => Promise<T | null>
  mutate: (newData: T | ((prev: T) => T), shouldRevalidate?: boolean) => void
}

/**
 * Hook universal de cache com estratégia Stale-While-Revalidate (SWR) e deduplicação de requisições.
 */
export function useDataCache<T>(
  key: string | null,
  fetcher: () => Promise<T>,
  initialFallback: T,
  options: UseDataCacheOptions = {}
): UseDataCacheResult<T> {
  const { enabled = true, ttl, forceRevalidate = false } = options
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  // Inicializa o estado com o cache síncrono existente se houver
  const [data, setData] = useState<T>(() => {
    if (!key) return initialFallback
    const cached = getCachedValue<T>(key)
    return cached ? cached.data : initialFallback
  })

  const [loading, setLoading] = useState<boolean>(() => {
    if (!key || !enabled) return false
    const cached = getCachedValue<T>(key)
    return cached ? false : true
  })

  const [isRevalidating, setIsRevalidating] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Escuta atualizações de outras instâncias que atualizam a mesma chave
  useEffect(() => {
    if (!key) return
    const unsubscribe = subscribeToCache<T>(key, (updatedData) => {
      setData(updatedData)
      setLoading(false)
    })
    return unsubscribe
  }, [key])

  const executeFetch = useCallback(
    async (force: boolean = false): Promise<T | null> => {
      if (!key || !enabled) return null

      const cached = getCachedValue<T>(key)
      if (!cached) {
        setLoading(true)
      } else {
        setIsRevalidating(true)
      }
      setError(null)

      try {
        const freshData = await fetchWithCache(key, () => fetcherRef.current(), {
          ttl,
          forceRevalidate: force || forceRevalidate,
        })
        setData(freshData)
        return freshData
      } catch (err) {
        setError(err as Error)
        return null
      } finally {
        setLoading(false)
        setIsRevalidating(false)
      }
    },
    [key, enabled, ttl, forceRevalidate]
  )

  useEffect(() => {
    if (!key || !enabled) return

    const cached = getCachedValue<T>(key)
    if (!cached || cached.isStale) {
      executeFetch(false)
    } else {
      setData(cached.data)
      setLoading(false)
    }
  }, [key, enabled, executeFetch])

  const mutate = useCallback(
    (newDataOrUpdater: T | ((prev: T) => T), shouldRevalidate: boolean = false) => {
      if (!key) return

      setData((prev) => {
        const updated =
          typeof newDataOrUpdater === 'function'
            ? (newDataOrUpdater as (prev: T) => T)(prev)
            : newDataOrUpdater

        setCachedValue(key, updated, ttl)
        return updated
      })

      if (shouldRevalidate) {
        executeFetch(true)
      }
    },
    [key, ttl, executeFetch]
  )

  const refetch = useCallback(
    async (force: boolean = true) => {
      if (key && force) {
        invalidateCache(key)
      }
      return executeFetch(force)
    },
    [key, executeFetch]
  )

  return {
    data,
    loading,
    isRevalidating,
    error,
    refetch,
    mutate,
  }
}

