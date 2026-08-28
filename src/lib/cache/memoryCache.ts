/**
 * Gerenciador de Cache em Memória e Deduplicação de Requisições
 * Estratégia: Stale-While-Revalidate (SWR) + In-flight Request Deduplication.
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

// Armazenamento em memória (persiste durante a sessão da SPA)
const cacheStore = new Map<string, CacheEntry<any>>()

// Mapa de requisições em andamento para evitar chamadas duplicadas simultâneas
const inFlightRequests = new Map<string, Promise<any>>()

// Listeners para reatividade entre múltiplos hooks na mesma chave
type CacheListener<T> = (data: T) => void
const cacheListeners = new Map<string, Set<CacheListener<any>>>()

export interface FetchWithCacheOptions {
  /** Tempo de vida do cache em milissegundos. Padrão: 5 minutos (300.000 ms) */
  ttl?: number
  /** Se true, ignora o cache existente e força nova busca na rede */
  forceRevalidate?: boolean
}

const DEFAULT_TTL = 5 * 60 * 1000 // 5 minutos

/**
 * Obtém um valor do cache síncrono, se existir.
 */
export function getCachedValue<T>(key: string): { data: T; isStale: boolean } | null {
  const entry = cacheStore.get(key)
  if (!entry) return null

  const isStale = Date.now() - entry.timestamp > entry.ttl
  return {
    data: entry.data as T,
    isStale,
  }
}

/**
 * Define ou atualiza manualmente um valor no cache.
 */
export function setCachedValue<T>(key: string, data: T, ttl: number = DEFAULT_TTL): void {
  cacheStore.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  })

  // Notifica todos os componentes que escutam esta chave
  const listeners = cacheListeners.get(key)
  if (listeners) {
    listeners.forEach((listener) => listener(data))
  }
}

/**
 * Invalida uma chave específica ou todas as chaves que começam com um prefixo.
 */
export function invalidateCache(keyOrPrefix?: string): void {
  if (!keyOrPrefix) {
    cacheStore.clear()
    inFlightRequests.clear()
    return
  }

  for (const key of cacheStore.keys()) {
    if (key === keyOrPrefix || key.startsWith(`${keyOrPrefix}:`) || key.startsWith(`${keyOrPrefix}/`)) {
      cacheStore.delete(key)
    }
  }
}

/**
 * Inscreve um listener para atualizações de uma chave de cache.
 */
export function subscribeToCache<T>(key: string, listener: CacheListener<T>): () => void {
  if (!cacheListeners.has(key)) {
    cacheListeners.set(key, new Set())
  }
  cacheListeners.get(key)!.add(listener)

  return () => {
    const listeners = cacheListeners.get(key)
    if (listeners) {
      listeners.delete(listener)
      if (listeners.size === 0) {
        cacheListeners.delete(key)
      }
    }
  }
}

/**
 * Executa uma busca com cache inteligente e deduplicação de chamadas simultâneas.
 */
export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: FetchWithCacheOptions = {}
): Promise<T> {
  const { ttl = DEFAULT_TTL, forceRevalidate = false } = options
  const cached = getCachedValue<T>(key)

  // Se o cache é recente e não foi forçada revalidação, retorna imediatamente
  if (cached && !cached.isStale && !forceRevalidate) {
    return cached.data
  }

  // Se já existe uma requisição em andamento para a mesma chave, reusa a mesma Promise
  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key)! as Promise<T>
  }

  // Cria a promise de busca
  const requestPromise = (async () => {
    try {
      const freshData = await fetcher()
      setCachedValue(key, freshData, ttl)
      return freshData
    } finally {
      inFlightRequests.delete(key)
    }
  })()

  inFlightRequests.set(key, requestPromise)
  return requestPromise
}

