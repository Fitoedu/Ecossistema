import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { invalidateCache } from '@/lib/cache/memoryCache'
import type { Topic, TopicInsert, TopicUpdate } from '@/lib/types'

async function triggerRevalidate(path: string) {
  try {
    if (typeof window !== 'undefined') {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      })
    }
  } catch (err) {
    console.warn('[ISR] Falha ao revalidar rota:', path, err)
  }
}

/** Lista todos os topicos publicados, ordenados por order_index. */
export async function getTopics(): Promise<Topic[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('published', true)
    .order('order_index')
  if (error) {
    logger.error('educacao', 'get_topics_error', error)
    throw error
  }
  return data
}

/** Busca um topico pelo slug (apenas publicados). */
export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error) return null
  return data
}

/** Admin: lista todos os topicos, incluindo nao publicados. */
export async function getAllTopicsAdmin(): Promise<Topic[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .order('order_index')
  if (error) {
    logger.error('educacao', 'get_all_topics_admin_error', error)
    throw error
  }
  return data
}

/** Admin: cria um novo topico. */
export async function createTopic(payload: TopicInsert): Promise<Topic> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('topics')
    .insert(payload)
    .select()
    .single()
  if (error) {
    logger.error('educacao', 'create_topic_error', error, { payload })
    throw error
  }
  logger.info('educacao', 'create_topic_success', `Módulo criado: "${data.title}"`, { topicId: data.id, slug: data.slug })

  // Invalida cache de clientes e revalida a página estática no Next.js
  invalidateCache('topics:published')
  triggerRevalidate('/educacao')

  return data
}

/** Admin: atualiza um topico existente. */
export async function updateTopic(id: string, payload: TopicUpdate): Promise<Topic> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('topics')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) {
    logger.error('educacao', 'update_topic_error', error, { id, payload })
    throw error
  }
  logger.info('educacao', 'update_topic_success', `Módulo atualizado: "${data.title}"`, { topicId: id })

  // Invalida cache e revalida páginas estáticas
  invalidateCache('topics:published')
  triggerRevalidate('/educacao')
  if (data.slug) {
    triggerRevalidate(`/educacao/${data.slug}`)
  }

  return data
}

/** Admin: exclui um topico (aulas excluidas em cascata). */
export async function deleteTopic(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('topics').delete().eq('id', id)
  if (error) {
    logger.error('educacao', 'delete_topic_error', error, { id })
    throw error
  }
  logger.info('educacao', 'delete_topic_success', `Módulo excluído`, { topicId: id })

  // Invalida cache e revalida
  invalidateCache('topics:published')
  triggerRevalidate('/educacao')
}
