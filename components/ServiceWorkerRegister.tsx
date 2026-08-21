'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch((error) => {
        console.warn('[SW] Falha ao registrar service worker:', error)
      })
  }, [])

  return null
}