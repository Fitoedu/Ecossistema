'use client'

import { useCallback } from 'react'
import { getProfile, upsertProfile } from '@/lib/services/profileService'
import { useAuth } from '@/providers/AuthProvider'
import { useDataCache } from '@/hooks/useDataCache'
import type { Profile, ProfileUpdate } from '@/lib/types'

export function useProfile() {
  const { user } = useAuth()

  const fetcher = useCallback(async (): Promise<Profile | null> => {
    if (!user) return null
    return await getProfile(user.id)
  }, [user])

  const cacheKey = user ? `user-profile:${user.id}` : null

  const {
    data: profile,
    loading,
    isRevalidating,
    error,
    refetch,
    mutate,
  } = useDataCache<Profile | null>(cacheKey, fetcher, null, {
    enabled: !!user,
    ttl: 5 * 60 * 1000, // 5 minutos
  })

  const updateProfile = useCallback(
    async (payload: Omit<ProfileUpdate, 'updated_at'>) => {
      if (!user) return

      // Mutação otimista no cache
      mutate((prev) => (prev ? { ...prev, ...payload } : null))

      // Persiste no Supabase e atualiza com dado real
      const updated = await upsertProfile(user.id, payload)
      mutate(updated)
      return updated
    },
    [user, mutate],
  )

  return {
    profile,
    loading: user ? loading : false,
    isRevalidating,
    error: error ? error.message : null,
    updateProfile,
    refetch,
  }
}
