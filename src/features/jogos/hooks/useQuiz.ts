'use client'

import { useCallback } from 'react'
import { getQuizQuestions, saveQuizSession, getUserQuizHistory } from '@/lib/services/quizService'
import { useDataCache } from '@/hooks/useDataCache'
import type { QuizQuestionWithOptions, QuizSession, QuizSessionInsert } from '@/lib/types'

export function useQuizQuestions(category: string) {
  const fetcher = useCallback(async () => {
    if (!category) return []
    return await getQuizQuestions(category)
  }, [category])

  const {
    data: questions,
    loading,
    isRevalidating,
    error,
    refetch,
  } = useDataCache<QuizQuestionWithOptions[]>(
    category ? `quiz-questions:${category}` : null,
    fetcher,
    [],
    {
      enabled: !!category,
      ttl: 15 * 60 * 1000, // 15 minutos
    }
  )

  return {
    questions,
    loading: category ? loading : false,
    isRevalidating,
    error: error ? error.message : null,
    refetch,
  }
}

export function useQuizHistory(userId: string | null) {
  const fetcher = useCallback(async () => {
    if (!userId) return []
    return await getUserQuizHistory(userId)
  }, [userId])

  const {
    data: history,
    loading,
    isRevalidating,
    error,
    refetch,
    mutate,
  } = useDataCache<QuizSession[]>(
    userId ? `quiz-history:${userId}` : null,
    fetcher,
    [],
    {
      enabled: !!userId,
      ttl: 5 * 60 * 1000,
    }
  )

  const submitSession = useCallback(
    async (payload: QuizSessionInsert) => {
      const saved = await saveQuizSession(payload)
      mutate((prev) => [saved, ...prev])
      refetch(true)
      return saved
    },
    [mutate, refetch],
  )

  return {
    history,
    loading: userId ? loading : false,
    isRevalidating,
    error: error ? error.message : null,
    submitSession,
    refetch,
  }
}
