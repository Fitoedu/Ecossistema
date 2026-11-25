import { createClient } from '@/lib/supabase/client'
import { logger } from '@/lib/logger'
import type {
  QuizQuestion,
  QuizQuestionInsert,
  QuizQuestionUpdate,
  QuizQuestionWithOptions,
  QuizOption,
  QuizOptionInsert,
  QuizSession,
  QuizSessionInsert,
} from '@/lib/types'

/** Lista perguntas publicadas de uma categoria com suas opcoes. */
export async function getQuizQuestions(
  category: string,
): Promise<QuizQuestionWithOptions[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*, quiz_options(*)')
    .eq('category', category)
    .eq('published', true)
    .order('created_at')
  if (error) {
    logger.error('quiz', 'get_quiz_questions_error', error, { category })
    throw error
  }
  return data as QuizQuestionWithOptions[]
}

/** Admin: lista todas as perguntas (incluindo nao publicadas). */
export async function getAllQuestionsAdmin(): Promise<QuizQuestionWithOptions[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*, quiz_options(*)')
    .order('created_at', { ascending: false })
  if (error) {
    logger.error('quiz', 'get_all_questions_admin_error', error)
    throw error
  }
  return data as QuizQuestionWithOptions[]
}

/** Admin: cria uma pergunta com suas opcoes em sequencia. */
export async function createQuestion(
  question: QuizQuestionInsert,
  options: Omit<QuizOptionInsert, 'question_id'>[],
): Promise<QuizQuestion> {
  const supabase = createClient()
  const { data: q, error: qError } = await supabase
    .from('quiz_questions')
    .insert(question)
    .select()
    .single()
  if (qError) {
    logger.error('quiz', 'create_question_error', qError, { question })
    throw qError
  }

  const optionsPayload: QuizOptionInsert[] = options.map((o, i) => ({
    ...o,
    question_id: q.id,
    order_index: i,
  }))
  const { error: oError } = await supabase.from('quiz_options').insert(optionsPayload)
  if (oError) {
    logger.error('quiz', 'create_options_error', oError, { questionId: q.id })
    throw oError
  }

  logger.info('quiz', 'create_question_success', `Pergunta criada na categoria "${question.category}"`, { questionId: q.id })
  return q
}

/** Admin: atualiza uma pergunta. */
export async function updateQuestion(
  id: string,
  payload: QuizQuestionUpdate,
): Promise<QuizQuestion> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('quiz_questions')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) {
    logger.error('quiz', 'update_question_error', error, { id, payload })
    throw error
  }
  logger.info('quiz', 'update_question_success', `Pergunta atualizada`, { questionId: id })
  return data
}

/** Admin: substitui todas as opcoes de uma pergunta. */
export async function replaceOptions(
  questionId: string,
  options: Omit<QuizOptionInsert, 'question_id'>[],
): Promise<QuizOption[]> {
  const supabase = createClient()
  const { error: delError } = await supabase
    .from('quiz_options')
    .delete()
    .eq('question_id', questionId)
  if (delError) {
    logger.error('quiz', 'delete_options_error', delError, { questionId })
    throw delError
  }

  const payload: QuizOptionInsert[] = options.map((o, i) => ({
    ...o,
    question_id: questionId,
    order_index: i,
  }))
  const { data, error } = await supabase.from('quiz_options').insert(payload).select()
  if (error) {
    logger.error('quiz', 'insert_options_error', error, { questionId })
    throw error
  }
  return data
}

/** Admin: exclui uma pergunta (opcoes excluidas em cascata). */
export async function deleteQuestion(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('quiz_questions').delete().eq('id', id)
  if (error) {
    logger.error('quiz', 'delete_question_error', error, { id })
    throw error
  }
  logger.info('quiz', 'delete_question_success', `Pergunta excluída`, { questionId: id })
}

/** Salva o resultado de uma sessao de quiz. */
export async function saveQuizSession(payload: QuizSessionInsert): Promise<QuizSession> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('quiz_sessions')
    .insert(payload)
    .select()
    .single()
  if (error) {
    logger.error('quiz', 'save_quiz_session_error', error, { payload })
    throw error
  }
  logger.info('quiz', 'quiz_session_completed', `Partida de quiz concluída: ${payload.score} pontos`, {
    category: payload.category,
    score: payload.score,
    correct: payload.correct_answers,
    total: payload.total_questions,
  }, payload.user_id)
  return data
}

/** Busca o historico de sessoes do usuario. */
export async function getUserQuizHistory(userId: string): Promise<QuizSession[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('quiz_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
  if (error) {
    logger.error('quiz', 'get_user_quiz_history_error', error, { userId }, userId)
    throw error
  }
  return data
}
