const STATIC_CACHE = 'educafito-static-v2';
const DATA_CACHE = 'educafito-data-v2';

// Recursos mínimos para carregar o App Shell offline
const APP_SHELL_ASSETS = [
  '/',
  '/home',
  '/cartilha',
  '/perfil',
];

// Instalação: Realiza o pré-cache do App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await Promise.all(
        APP_SHELL_ASSETS.map(async (asset) => {
          try {
            await cache.add(asset);
          } catch (error) {
            // Nao interrompe a instalacao caso algum recurso opcional falhe.
            console.warn('[SW] Falha no pre-cache:', asset, error);
          }
        })
      );
      await self.skipWaiting();
    })()
  );
});

// Ativação: Limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== STATIC_CACHE && cache !== DATA_CACHE) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptação de requisições de rede
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  // 1. Network Only: Vídeos externos (YouTube), autenticação e rotas de ranking ao vivo
  if (
    url.hostname.includes('youtube.com') ||
    url.hostname.includes('googlevideo.com') ||
    url.pathname.startsWith('/api/ranking') ||
    url.pathname.startsWith('/api/auth')
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // 2. Stale-While-Revalidate: APIs de conteúdo educacional e progresso
  if (url.pathname.startsWith('/api/conteudo') || url.pathname.startsWith('/api/progresso')) {
    event.respondWith(
      caches.open(DATA_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Navigations: Network First com fallback offline para a home
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const responseToCache = networkResponse.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return networkResponse;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;
          return caches.match('/home');
        })
    );
    return;
  }

  // 4. Cache First: imagens, fontes, scripts e estilos
  if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });

            return networkResponse;
          });
      })
    );
    return;
  }

  // 5. Default: repassa para rede
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});