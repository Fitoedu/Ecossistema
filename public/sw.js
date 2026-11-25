// EducaFito Service Worker
const CACHE_NAME = 'educafito-cache-v1'
const STATIC_ASSETS = [
  '/',
  '/home',
  '/educacao',
  '/cartilha',
  '/jogos',
  '/midia',
  '/manifest.json',
  '/favicon.ico',
]

// Instalação: Pré-cache do shell da aplicação
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Aviso no precache inicial:', err)
      })
    })
  )
  self.skipWaiting()
})

// Ativação: Limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Interceptação de requisições: Stale-While-Revalidate para páginas e Cache-First para imagens
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Ignora requisições de outras origens ou métodos que não sejam GET
  if (event.request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
    return
  }

  // Não cacheia chamadas de API ou autenticação do Supabase
  if (url.pathname.startsWith('/auth') || url.pathname.includes('supabase.co')) {
    return
  }

  // Imagens e assets estáticos: Cache-First
  if (url.pathname.startsWith('/images/') || url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request)
        if (cachedResponse) return cachedResponse

        try {
          const networkResponse = await fetch(event.request)
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone())
          }
          return networkResponse
        } catch (err) {
          return cachedResponse || new Response('Offline asset unavailable', { status: 503 })
        }
      })
    )
    return
  }

  // Páginas de navegação: Network-First com fallback para cache
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse.status === 200) {
          const responseToCache = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
        }
        return networkResponse
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request)
        if (cachedResponse) return cachedResponse
        return caches.match('/home') || new Response('Você está offline', {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        })
      })
  )
})