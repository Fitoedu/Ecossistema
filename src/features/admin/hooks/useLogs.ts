'use client'

import { useState, useEffect, useCallback } from 'react'
import { getLogs, getLogsStats, clearOldLogs, type GetLogsOptions, type LogsStats } from '@/lib/services/logsService'
import type { AppLog } from '@/lib/types'

export function useLogs(options: GetLogsOptions = {}) {
  const [logs, setLogs] = useState<AppLog[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [stats, setStats] = useState<LogsStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  const pageSize = options.pageSize ?? 25
  const totalPages = Math.ceil(total / pageSize) || 1

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getLogs(options)
      setLogs(result.logs)
      setTotal(result.total)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [
    options.level,
    options.module,
    options.search,
    options.startDate,
    options.endDate,
    options.page,
    options.pageSize,
  ])

  const fetchStats = useCallback(async () => {
    setStatsLoading(true)
    try {
      const data = await getLogsStats()
      setStats(data)
    } catch {
      // Falhas silenciosas em stats
    } finally {
      setStatsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const clearLogsAction = useCallback(async (days: number = 30) => {
    await clearOldLogs(days)
    await Promise.all([fetchLogs(), fetchStats()])
  }, [fetchLogs, fetchStats])

  return {
    logs,
    total,
    totalPages,
    loading,
    error,
    stats,
    statsLoading,
    refetch: fetchLogs,
    refetchStats: fetchStats,
    clearLogs: clearLogsAction,
  }
}
