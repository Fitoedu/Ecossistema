'use client'

import { useCallback } from 'react'
import { getPublicacoes } from '@/lib/services/publicacoesService'
import { getVideos } from '@/lib/services/videosService'
import { useDataCache } from '@/hooks/useDataCache'
import type { Publicacao, Video } from '@/lib/types'

interface MidiaData {
  publicacoes: Publicacao[]
  videos: Video[]
}

export function usePublicacoes() {
  const fetcher = useCallback(async (): Promise<MidiaData> => {
    const [publicacoes, videos] = await Promise.all([getPublicacoes(), getVideos()])
    return { publicacoes, videos }
  }, [])

  const {
    data,
    loading,
    isRevalidating,
    error,
    refetch,
  } = useDataCache<MidiaData>(
    'midia:all',
    fetcher,
    { publicacoes: [], videos: [] },
    {
      ttl: 15 * 60 * 1000, // 15 minutos de cache
    }
  )

  return {
    publicacoes: data.publicacoes,
    videos: data.videos,
    loading,
    isRevalidating,
    error: error ? error.message : null,
    refetch,
  }
}
