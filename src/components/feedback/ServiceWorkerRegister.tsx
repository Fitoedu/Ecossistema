'use client'

import { useEffect } from 'react'

const LOCALHOST_HOSTNAMES = new Set(['localhost', '127.0.0.1', '::1'])

async function unregisterAllServiceWorkers() {
  const registrations = await navigator.serviceWorker.getRegistrations()
  await Promise.all(registrations.map((registration) => registration.unregister()))
}

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    const hostname = window.location.hostname
    const isLocalhost = LOCALHOST_HOSTNAMES.has(hostname)
    const shouldRegister = process.env.NODE_ENV === 'production' && !isLocalhost

    if (!shouldRegister) {
      unregisterAllServiceWorkers()
        .then(() => {
          console.info('[SW] Registro desativado para este ambiente.')
        })
        .catch((error) => {
          console.warn('[SW] Falha ao desregistrar service workers:', error)
        })
      return
    }

    const handleControllerChange = () => {
      console.info('[SW] Novo service worker assumiu o controle da pagina.')
    }

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.info('[SW] Registrado com sucesso.', registration.scope)

        registration.addEventListener('updatefound', () => {
          console.info('[SW] Nova versao detectada, aguardando ativacao.')
        })
      })
      .catch((error) => {
        console.warn('[SW] Falha ao registrar service worker:', error)
      })

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange)
    }
  }, [])

  return null
}