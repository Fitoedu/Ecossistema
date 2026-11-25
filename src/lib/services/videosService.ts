import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import { invalidateCache } from '@/lib/cache/memoryCache'
import type { Video, VideoInsert, VideoUpdate } from '@/lib/types'

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

/** Lista videos publicados, ordenados por order_index. */
export async function getVideos(): Promise<Video[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('published', true)
    .order('order_index')
  if (error) {
    logger.error('midia', 'get_videos_error', error)
    throw error
  }
  return data
}

/** Admin: lista todos os videos (incluindo nao publicados). */
export async function getAllVideosAdmin(): Promise<Video[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('order_index')
  if (error) {
    logger.error('midia', 'get_all_videos_admin_error', error)
    throw error
  }
  return data
}

/** Admin: cria um novo video. */
export async function createVideo(payload: VideoInsert): Promise<Video> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('videos')
    .insert(payload)
    .select()
    .single()
  if (error) {
    logger.error('midia', 'create_video_error', error, { payload })
    throw error
  }
  logger.info('midia', 'create_video_success', `Vídeo cadastrado`, { videoId: data.id, href: data.href })

  invalidateCache('midia:all')
  triggerRevalidate('/midia')

  return data
}

/** Admin: atualiza um video. */
export async function updateVideo(id: string, payload: VideoUpdate): Promise<Video> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('videos')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) {
    logger.error('midia', 'update_video_error', error, { id, payload })
    throw error
  }
  logger.info('midia', 'update_video_success', `Vídeo atualizado`, { videoId: id })

  invalidateCache('midia:all')
  triggerRevalidate('/midia')

  return data
}

/** Admin: exclui um video. */
export async function deleteVideo(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) {
    logger.error('midia', 'delete_video_error', error, { id })
    throw error
  }
  logger.info('midia', 'delete_video_success', `Vídeo excluído`, { videoId: id })

  invalidateCache('midia:all')
  triggerRevalidate('/midia')
}
