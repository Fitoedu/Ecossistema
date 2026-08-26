'use client'

import { useState, useEffect, useCallback } from 'react'
import { getQuizQuestions, saveQuizSession, getUserQuizHistory } from '@/lib/services/quizService'
import type { QuizQuestionWithOptions, QuizSession, QuizSessionInsert } from '@/lib/types'

export function useQuizQuestions(category: string) {
  const [questions, setQuestions] = useState<QuizQuestionWithOptions[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    if (!category) return
    setLoading(true)
    setError(null)
    try {
      const data = await getQuizQuestions(category)
      setQuestions(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => { fetch() }, [fetch])

  return { questions, loading, error, refetch: fetch }
}

export function useQuizHistory(userId: string | null) {
  const [history, setHistory] = useState<QuizSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    setLoading(true)
    setError(null)
    try {
      const data = await getUserQuizHistory(userId)
      setHistory(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => { fetch() }, [fetch])

  const submitSession = useCallback(
    async (payload: QuizSessionInsert) => {
      await saveQuizSession(payload)
      await fetch()
    },
    [fetch],
  )

  return { history, loading, error, submitSession, refetch: fetch }
}
