'use client'

import { useEffect, useState } from 'react'

type OfflineState = {
  isOnline: boolean
  isOffline: boolean
  isReady: boolean
}

export function useOffline(): OfflineState {
  const [isOnline, setIsOnline] = useState(true)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const updateStatus = () => {
      setIsOnline(navigator.onLine)
      setIsReady(true)
    }

    updateStatus()

    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)

    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [])

  return {
    isOnline,
    isOffline: !isOnline,
    isReady,
  }
}