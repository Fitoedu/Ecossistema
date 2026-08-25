import { createClient } from '@/lib/supabase/client'
import type { Lesson, LessonInsert, LessonUpdate } from '@/lib/types'

/** Lista aulas publicadas de um topico, ordenadas por order_index. */
export async function getLessonsByTopic(topicId: string): Promise<Lesson[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('topic_id', topicId)
    .eq('published', true)
    .order('order_index')
  if (error) throw error
  return data
}

/** Admin: lista todas as aulas de um topico (incluindo nao publicadas). */
export async function getAllLessonsAdmin(topicId: string): Promise<Lesson[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('topic_id', topicId)
    .order('order_index')
  if (error) throw error
  return data
}

/** Admin: cria uma nova aula. */
export async function createLesson(payload: LessonInsert): Promise<Lesson> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lessons')
    .insert(payload)
    .select()
    .single()
  if (error) throw error
  return data
}

/** Admin: atualiza uma aula existente. */
export async function updateLesson(id: string, payload: LessonUpdate): Promise<Lesson> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lessons')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

/** Admin: exclui uma aula. */
export async function deleteLesson(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('lessons').delete().eq('id', id)
  if (error) throw error
}
