'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Center, Spinner } from '@chakra-ui/react'
import { useAuth } from '@/app/context/AuthContext'
import { useProfile } from '@/hooks/useProfile'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useProfile()
  const router = useRouter()

  useEffect(() => {
    if (authLoading || profileLoading) return
    if (!user) { router.replace('/login'); return }
    if (profile && profile.role !== 'admin') router.replace('/home')
  }, [user, profile, authLoading, profileLoading, router])

  if (authLoading || profileLoading || !profile) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="primary.500" />
      </Center>
    )
  }

  if (profile.role !== 'admin') return null

  return <>{children}</>
}
