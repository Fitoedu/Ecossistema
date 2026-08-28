/**
 * Utilitário de Armazenamento Assíncrono IndexedDB para Modo Offline
 * Permite armazenar módulos educativos, textos e imagens sem o limite de 5MB do localStorage.
 */

const DB_NAME = 'educafito_offline_db'
const DB_VERSION = 1
const STORE_NAME = 'offline_modules'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB não suportado neste ambiente'))
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'slug' })
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

/**
 * Salva um pacote de módulo completo no IndexedDB.
 */
export async function idbSaveModule<T extends { slug: string }>(item: T): Promise<boolean> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.put(item)

      request.onsuccess = () => resolve(true)
      request.onerror = () => reject(request.error)
    })
  } catch (err) {
    console.warn('[IndexedDB] Erro ao salvar módulo:', err)
    return false
  }
}

/**
 * Recupera um módulo pelo slug do IndexedDB.
 */
export async function idbGetModule<T>(slug: string): Promise<T | null> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get(slug)

      request.onsuccess = () => resolve(request.result ? (request.result as T) : null)
      request.onerror = () => reject(request.error)
    })
  } catch (err) {
    console.warn('[IndexedDB] Erro ao recuperar módulo:', err)
    return null
  }
}

/**
 * Retorna todos os slugs dos módulos salvos offline.
 */
export async function idbGetAllModuleSlugs(): Promise<string[]> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAllKeys()

      request.onsuccess = () => resolve((request.result as string[]) || [])
      request.onerror = () => reject(request.error)
    })
  } catch (err) {
    console.warn('[IndexedDB] Erro ao listar slugs:', err)
    return []
  }
}

/**
 * Remove um módulo do IndexedDB.
 */
export async function idbRemoveModule(slug: string): Promise<boolean> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.delete(slug)

      request.onsuccess = () => resolve(true)
      request.onerror = () => reject(request.error)
    })
  } catch (err) {
    console.warn('[IndexedDB] Erro ao remover módulo:', err)
    return false
  }
}

