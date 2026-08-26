import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import type { Publicacao, PublicacaoInsert, PublicacaoUpdate } from '@/lib/types'

/** Lista publicacoes publicadas, da mais recente para a mais antiga. */
export async function getPublicacoes(): Promise<Publicacao[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('publicacoes')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) {
    logger.error('midia', 'get_publicacoes_error', error)
    throw error
  }
  return data
}

/** Admin: lista todas as publicacoes (incluindo nao publicadas). */
export async function getAllPublicacoesAdmin(): Promise<Publicacao[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('publicacoes')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    logger.error('midia', 'get_all_publicacoes_admin_error', error)
    throw error
  }
  return data
}

/** Admin: cria uma nova publicacao. */
export async function createPublicacao(payload: PublicacaoInsert): Promise<Publicacao> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('publicacoes')
    .insert(payload)
    .select()
    .single()
  if (error) {
    logger.error('midia', 'create_publicacao_error', error, { payload })
    throw error
  }
  logger.info('midia', 'create_publicacao_success', `Publicação criada: "${data.title}"`, { publicacaoId: data.id })
  return data
}

/** Admin: atualiza uma publicacao. */
export async function updatePublicacao(
  id: string,
  payload: PublicacaoUpdate,
): Promise<Publicacao> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('publicacoes')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) {
    logger.error('midia', 'update_publicacao_error', error, { id, payload })
    throw error
  }
  logger.info('midia', 'update_publicacao_success', `Publicação atualizada: "${data.title}"`, { publicacaoId: id })
  return data
}

/** Admin: exclui uma publicacao. */
export async function deletePublicacao(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('publicacoes').delete().eq('id', id)
  if (error) {
    logger.error('midia', 'delete_publicacao_error', error, { id })
    throw error
  }
  logger.info('midia', 'delete_publicacao_success', `Publicação excluída`, { publicacaoId: id })
}
