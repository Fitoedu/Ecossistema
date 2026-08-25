import { createClient } from '@/lib/supabase/client'
import type { LogLevel, LogModule } from '@/lib/types'

export interface LogPayload {
  level: LogLevel
  module: LogModule
  action: string
  message: string
  metadata?: Record<string, unknown> | null
  userId?: string | null
}

const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: '#9E9E9E',
  info: '#2E7D32',
  warn: '#ED6C02',
  error: '#D32F2F',
}

const LEVEL_ICONS: Record<LogLevel, string> = {
  debug: '⚙️',
  info: 'ℹ️',
  warn: '⚠️',
  error: '🚨',
}

/**
 * Utilitário central de logging estruturado do EducaFito.
 * Suporta execução no cliente e no servidor.
 */
class Logger {
  private formatConsole(payload: LogPayload) {
    const timestamp = new Date().toLocaleTimeString('pt-BR')
    const icon = LEVEL_ICONS[payload.level]
    const prefix = `[${timestamp}] ${icon} [${payload.module.toUpperCase()}][${payload.action}]`

    if (typeof window !== 'undefined') {
      const style = `color: ${LEVEL_COLORS[payload.level]}; font-weight: bold;`
      switch (payload.level) {
        case 'debug':
          console.debug(`%c${prefix}`, style, payload.message, payload.metadata ?? '')
          break
        case 'info':
          console.info(`%c${prefix}`, style, payload.message, payload.metadata ?? '')
          break
        case 'warn':
          console.warn(`%c${prefix}`, style, payload.message, payload.metadata ?? '')
          break
        case 'error':
          console.error(`%c${prefix}`, style, payload.message, payload.metadata ?? '')
          break
      }
    } else {
      console.log(`${prefix} ${payload.message}`, payload.metadata ?? '')
    }
  }

  private async persistLog(payload: LogPayload) {
    // Apenas info, warn e error são persistidos no banco
    if (payload.level === 'debug') return

    try {
      const supabase = createClient()
      await supabase.from('app_logs').insert({
        level: payload.level,
        module: payload.module,
        action: payload.action,
        message: payload.message,
        metadata: payload.metadata as unknown as Record<string, unknown> ?? {},
        user_id: payload.userId ?? null,
      })
    } catch {
      // Falhas no envio remoto de logs são silenciadas para não quebrar fluxos do usuário
    }
  }

  public log(payload: LogPayload) {
    this.formatConsole(payload)
    this.persistLog(payload)
  }

  public debug(module: LogModule, action: string, message: string, metadata?: Record<string, unknown>) {
    this.log({ level: 'debug', module, action, message, metadata })
  }

  public info(module: LogModule, action: string, message: string, metadata?: Record<string, unknown>, userId?: string | null) {
    this.log({ level: 'info', module, action, message, metadata, userId })
  }

  public warn(module: LogModule, action: string, message: string, metadata?: Record<string, unknown>, userId?: string | null) {
    this.log({ level: 'warn', module, action, message, metadata, userId })
  }

  public error(module: LogModule, action: string, error: unknown, metadata?: Record<string, unknown>, userId?: string | null) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined

    this.log({
      level: 'error',
      module,
      action,
      message: errorMsg,
      metadata: {
        ...metadata,
        stack: errorStack,
      },
      userId,
    })
  }
}

export const logger = new Logger()
