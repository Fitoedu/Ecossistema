'use client'

import { useState, useEffect, useCallback } from 'react'
import type { TopicWithLock, Lesson, Topic } from '../data/educacao'

export interface OfflineModulePackage {
  slug: string
  topic: Topic
  lessons: Lesson[]
  savedAt: string
}

export function useOfflineModules() {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const loadSavedSlugs = useCallback(() => {
    if (typeof window === 'undefined') return
    try {
      const keys = Object.keys(localStorage)
      const offlineKeys = keys.filter((k) => k.startsWith('educafito_offline_module_'))
      const slugs = offlineKeys.map((k) => k.replace('educafito_offline_module_', ''))
      setSavedSlugs(slugs)
    } catch {
      // ignore
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
    (slug: string, topic: Topic, lessons: Lesson[]) => {
      if (typeof window === 'undefined') return false
      try {
        const pkg: OfflineModulePackage = {
          slug,
          topic,
          lessons,
          savedAt: new Date().toISOString(),
        }
        localStorage.setItem(`educafito_offline_module_${slug}`, JSON.stringify(pkg))
        setSavedSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]))
        return true
      } catch (e) {
        console.error('Erro ao salvar módulo offline:', e)
        return false
      }
    },
    [],
  )

  const removeModuleOffline = useCallback((slug: string) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(`educafito_offline_module_${slug}`)
      setSavedSlugs((prev) => prev.filter((s) => s !== slug))
    } catch {
      // ignore
    }
  }, [])

  const getSavedModule = useCallback((slug: string): OfflineModulePackage | null => {
    if (typeof window === 'undefined') return null
    try {
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

