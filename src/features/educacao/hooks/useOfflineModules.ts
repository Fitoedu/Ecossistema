'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  idbSaveModule,
  idbGetModule,
  idbGetAllModuleSlugs,
  idbRemoveModule,
} from '@/lib/offline/indexedDb'
import type { Lesson, Topic } from '../data/educacao'

export interface OfflineModulePackage {
  slug: string
  topic: Topic
  lessons: Lesson[]
  savedAt: string
}

export function useOfflineModules() {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const loadSavedSlugs = useCallback(async () => {
    if (typeof window === 'undefined') return
    try {
      // Tenta carregar do IndexedDB
      const idbSlugs = await idbGetAllModuleSlugs()

      // Fallback/Migração do localStorage se houver dados antigos
      const lsKeys = Object.keys(localStorage)
      const lsOfflineKeys = lsKeys.filter((k) => k.startsWith('educafito_offline_module_'))
      const lsSlugs = lsOfflineKeys.map((k) => k.replace('educafito_offline_module_', ''))

      const merged = Array.from(new Set([...idbSlugs, ...lsSlugs]))
      setSavedSlugs(merged)
    } catch {
      // Em caso de falha no IndexedDB, usa localStorage
      try {
        const keys = Object.keys(localStorage)
        const offlineKeys = keys.filter((k) => k.startsWith('educafito_offline_module_'))
        setSavedSlugs(offlineKeys.map((k) => k.replace('educafito_offline_module_', '')))
      } catch {
        setSavedSlugs([])
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadSavedSlugs()
  }, [loadSavedSlugs])

  const isModuleSaved = useCallback(
    (slug: string) => savedSlugs.includes(slug),
    [savedSlugs],
  )

  const saveModuleOffline = useCallback(
    async (slug: string, topic: Topic, lessons: Lesson[]) => {
      if (typeof window === 'undefined') return false
      try {
        const pkg: OfflineModulePackage = {
          slug,
          topic,
          lessons,
          savedAt: new Date().toISOString(),
        }

        // Salva no IndexedDB (sem limite de 5MB)
        const savedInIdb = await idbSaveModule(pkg)

        // Também mantém cópia de segurança
        if (!savedInIdb) {
          localStorage.setItem(`educafito_offline_module_${slug}`, JSON.stringify(pkg))
        }

        setSavedSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]))
        return true
      } catch (e) {
        console.error('[Offline] Erro ao salvar módulo:', e)
        return false
      }
    },
    [],
  )

  const removeModuleOffline = useCallback(async (slug: string) => {
    if (typeof window === 'undefined') return
    try {
      await idbRemoveModule(slug)
      localStorage.removeItem(`educafito_offline_module_${slug}`)
      setSavedSlugs((prev) => prev.filter((s) => s !== slug))
    } catch (e) {
      console.warn('[Offline] Erro ao remover módulo:', e)
    }
  }, [])

  const getSavedModule = useCallback(async (slug: string): Promise<OfflineModulePackage | null> => {
    if (typeof window === 'undefined') return null
    try {
      const fromIdb = await idbGetModule<OfflineModulePackage>(slug)
      if (fromIdb) return fromIdb

      const stored = localStorage.getItem(`educafito_offline_module_${slug}`)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }, [])

  return {
    savedSlugs,
    isModuleSaved,
    saveModuleOffline,
    removeModuleOffline,
    getSavedModule,
    loading,
    refetch: loadSavedSlugs,
  }
}
