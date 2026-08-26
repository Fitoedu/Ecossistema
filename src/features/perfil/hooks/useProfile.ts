'use client'

import { useState, useEffect, useCallback } from 'react'
import { getProfile, upsertProfile } from '@/lib/services/profileService'
import { useAuth } from '@/providers/AuthProvider'
import type { Profile, ProfileUpdate } from '@/lib/types'

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    if (!user) { setLoading(false); return }
    setLoading(true)
    setError(null)
    try {
      const data = await getProfile(user.id)
      setProfile(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => { fetch() }, [fetch])

  const updateProfile = useCallback(
    async (payload: Omit<ProfileUpdate, 'updated_at'>) => {
      if (!user) return
      const updated = await upsertProfile(user.id, payload)
      setProfile(updated)
    },
    [user],
  )

  return { profile, loading, error, updateProfile, refetch: fetch }
}
