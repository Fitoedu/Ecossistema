'use client'

import { useState, useEffect, useCallback } from 'react'
import { getModuleQuiz, ModuleQuizQuestion } from '../data/educacao'
import { saveQuizSession, getUserQuizHistory } from '@/lib/services/quizService'

export interface QuizAttemptResult {
  score: number
  total: number
  correct: number
  passed: boolean
  date: string
}

export function useModuleQuiz(topicSlug: string, category: string, userId?: string | null) {
  const [questions, setQuestions] = useState<ModuleQuizQuestion[]>([])
  const [isPassed, setIsPassed] = useState(false)
  const [bestScore, setBestScore] = useState<number>(0)
  const [lastAttempt, setLastAttempt] = useState<QuizAttemptResult | null>(null)
  const [loading, setLoading] = useState(true)

  const loadQuizData = useCallback(async () => {
    setLoading(true)
    const localQuestions = getModuleQuiz(topicSlug)
    setQuestions(localQuestions)

    let passedState = false
    let maxScore = 0
    let lastResult: QuizAttemptResult | null = null

    // Check localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(`educafito_quiz_${topicSlug}`)
        if (stored) {
          const parsed: QuizAttemptResult = JSON.parse(stored)
          lastResult = parsed
          maxScore = parsed.score
          passedState = parsed.passed
        }
      } catch {
        // ignore
      }
    }

    // Check Supabase history if logged in
    if (userId) {
      try {
        const history = await getUserQuizHistory(userId)
        const topicSessions = history.filter((s) => s.category.toLowerCase() === category.toLowerCase())
        if (topicSessions.length > 0) {
          const highest = Math.max(...topicSessions.map((s) => s.score))
          if (highest > maxScore) maxScore = highest
          if (maxScore >= 70) passedState = true
        }
      } catch {
        // silent catch
      }
    }

    setIsPassed(passedState)
    setBestScore(maxScore)
    setLastAttempt(lastResult)
    setLoading(false)
  }, [topicSlug, category, userId])

  useEffect(() => {
    loadQuizData()
  }, [loadQuizData])

  const recordAttempt = useCallback(
    async (correctAnswers: number, totalQuestions: number) => {
      const scorePct = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
      const passed = scorePct >= 70

      const result: QuizAttemptResult = {
        score: scorePct,
        total: totalQuestions,
        correct: correctAnswers,
        passed,
        date: new Date().toISOString(),
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(`educafito_quiz_${topicSlug}`, JSON.stringify(result))
      }

      setLastAttempt(result)
      if (scorePct > bestScore) setBestScore(scorePct)
      if (passed) setIsPassed(true)

      // Save to Supabase if logged in
      if (userId) {
        try {
          await saveQuizSession({
            user_id: userId,
            category: category,
            score: scorePct,
            total_questions: totalQuestions,
            correct_answers: correctAnswers,
          })
        } catch {
          // silent fallback
        }
      }

      return result
    },
    [topicSlug, category, userId, bestScore],
  )

  return {
    questions,
    isPassed,
    bestScore,
    lastAttempt,
    recordAttempt,
    loading,
    refetch: loadQuizData,
  }
}

