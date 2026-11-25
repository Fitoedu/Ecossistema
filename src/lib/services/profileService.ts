import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import type { Profile, ProfileInsert, ProfileUpdate } from '@/lib/types'

/** Busca o perfil do usuario pelo ID. */
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return null
  return data
}

/**
 * Cria ou atualiza o perfil do usuario.
 * O trigger handle_new_user ja cria o perfil no signup;
 * esta funcao e usada para atualizacoes posteriores.
 */
export async function upsertProfile(
  userId: string,
  payload: Omit<ProfileUpdate, 'updated_at'>,
): Promise<Profile> {
  const supabase = createClient()
  const upsertData: ProfileInsert = {
    id: userId,
    ...payload,
    updated_at: new Date().toISOString(),
  }
  const { data, error } = await supabase
    .from('profiles')
    .upsert(upsertData)
    .select()
    .single()
  if (error) {
    logger.error('perfil', 'upsert_profile_error', error, { userId, payload }, userId)
    throw error
  }
  logger.info('perfil', 'update_profile_success', 'Perfil do usuário atualizado', { userId }, userId)
  return data
}

/** Exclui a propria conta do usuario autenticado. */
export async function deleteAccount(): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.rpc('delete_user')
  if (error) {
    logger.error('perfil', 'delete_account_error', error)
    throw error
  }
  logger.warn('perfil', 'delete_account_success', 'Conta de usuário excluída')
}
