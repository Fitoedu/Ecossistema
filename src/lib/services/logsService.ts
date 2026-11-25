import { createClient } from '@/lib/supabase/client'
import type { AppLog, LogLevel, LogModule } from '@/lib/types'

export interface GetLogsOptions {
  level?: LogLevel | 'all'
  module?: LogModule | 'all'
  search?: string
  startDate?: string
  endDate?: string
  page?: number
  pageSize?: number
}

export interface LogsStats {
  total: number
  errors24h: number
  warns24h: number
  infos24h: number
  topModule: string
}

/**
 * Busca logs com filtros e paginação (exclusivo para admins).
 */
export async function getLogs(options: GetLogsOptions = {}): Promise<{ logs: AppLog[]; total: number }> {
  const {
    level = 'all',
    module = 'all',
    search = '',
    startDate,
    endDate,
    page = 1,
    pageSize = 25,
  } = options

  const supabase = createClient()
  let query = supabase
    .from('app_logs')
    .select('*', { count: 'exact' })

  if (level !== 'all') {
    query = query.eq('level', level)
  }

  if (module !== 'all') {
    query = query.eq('module', module)
  }

  if (search.trim()) {
    query = query.or(`message.ilike.%${search.trim()}%,action.ilike.%${search.trim()}%`)
  }

  if (startDate) {
    query = query.gte('created_at', startDate)
  }

  if (endDate) {
    query = query.lte('created_at', endDate)
  }

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) throw error

  return {
    logs: (data ?? []) as AppLog[],
    total: count ?? 0,
  }
}

/**
 * Calcula métricas resumidas dos logs (últimas 24h e total).
 */
export async function getLogsStats(): Promise<LogsStats> {
  const supabase = createClient()
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const { count: total, error: errTotal } = await supabase
    .from('app_logs')
    .select('*', { count: 'exact', head: true })
  if (errTotal) throw errTotal

  const { count: errors24h } = await supabase
    .from('app_logs')
    .select('*', { count: 'exact', head: true })
    .eq('level', 'error')
    .gte('created_at', since24h)

  const { count: warns24h } = await supabase
    .from('app_logs')
    .select('*', { count: 'exact', head: true })
    .eq('level', 'warn')
    .gte('created_at', since24h)

  const { count: infos24h } = await supabase
    .from('app_logs')
    .select('*', { count: 'exact', head: true })
    .eq('level', 'info')
    .gte('created_at', since24h)

  // Busca módulo mais ativo recentemente
  const { data: recentLogs } = await supabase
    .from('app_logs')
    .select('module')
    .order('created_at', { ascending: false })
    .limit(100)

  const moduleCounts: Record<string, number> = {}
  recentLogs?.forEach((l) => {
    moduleCounts[l.module] = (moduleCounts[l.module] || 0) + 1
  })

  const topModule = Object.entries(moduleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Nenhum'

  return {
    total: total ?? 0,
    errors24h: errors24h ?? 0,
    warns24h: warns24h ?? 0,
    infos24h: infos24h ?? 0,
    topModule,
  }
}

/**
 * Exclui logs mais antigos que uma data específica (exclusivo para admins).
 */
export async function clearOldLogs(days: number = 30): Promise<void> {
  const supabase = createClient()
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
  const { error } = await supabase
    .from('app_logs')
    .delete()
    .lte('created_at', cutoff)

  if (error) throw error
}
