/**
 * Opções para o registro do Service Worker.
 */
export interface ServiceWorkerRegistrationOptions {
  onSuccess?: (registration: ServiceWorkerRegistration) => void
  onUpdate?: (registration: ServiceWorkerRegistration) => void
  onError?: (error: Error) => void
}

/**
 * Registra o Service Worker principal da aplicação EducaFito.
 * Executa exclusivamente no client-side e em ambiente de produção (ou se explicitamente habilitado).
 */
export function registerServiceWorker(options?: ServiceWorkerRegistrationOptions): void {
  if (typeof window === 'undefined') return

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        })

        // Notifica registro bem-sucedido
        options?.onSuccess?.(registration)

        // Monitora novas versões do Service Worker
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing
          if (!installingWorker) return

          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Conteúdo atualizado disponível (nova versão em background)
                options?.onUpdate?.(registration)
              }
            }
          })
        })
      } catch (error) {
        options?.onError?.(error as Error)
      }
    })
  }
}

/**
 * Utilitário para desregistrar o Service Worker se necessário (ex: depuração ou reset)
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready
    return registration.unregister()
  }
  return false
}