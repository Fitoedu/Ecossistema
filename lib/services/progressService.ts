import { createClient } from '@/lib/supabase/client'
import type { UserProgress, UserProgressInsert } from '@/lib/types'

/** Busca todo o progresso do usuario em todos os topicos. */
export async function getUserProgress(userId: string): Promise<UserProgress[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
  if (error) throw error
  return data
}

/** Busca o progresso do usuario em um topico especifico. */
export async function getTopicProgress(
  userId: string,
  topicId: string,
): Promise<UserProgress | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('topic_id', topicId)
    .single()
  if (error) return null
  return data
}

/**
 * Cria ou atualiza o progresso do usuario em um topico.
 * Usa UPSERT com a constraint unica (user_id, topic_id).
 */
export async function upsertProgress(
  userId: string,
  topicId: string,
  completedLessons: number,
  progressPct: number,
): Promise<UserProgress> {
  const supabase = createClient()
  const payload: UserProgressInsert = {
    user_id: userId,
    topic_id: topicId,
    completed_lessons: completedLessons,
    progress_pct: Math.min(100, Math.max(0, progressPct)),
    updated_at: new Date().toISOString(),
  }
  const { data, error } = await supabase
    .from('user_progress')
    .upsert(payload, { onConflict: 'user_id,topic_id' })
    .select()
    .single()
  if (error) throw error
  return data
}
