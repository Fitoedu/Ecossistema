'use client'

import { useState, useEffect, useCallback } from 'react'
import { getPublicacoes } from '@/lib/services/publicacoesService'
import { getVideos } from '@/lib/services/videosService'
import type { Publicacao, Video } from '@/lib/types'

export function usePublicacoes() {
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [pubs, vids] = await Promise.all([getPublicacoes(), getVideos()])
      setPublicacoes(pubs)
      setVideos(vids)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  return { publicacoes, videos, loading, error, refetch: fetch }
}
