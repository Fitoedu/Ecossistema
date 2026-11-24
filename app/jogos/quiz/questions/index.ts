import {fitossanidadeQuestions} from './fitossanidade'
import {plantasQuestions} from './plantas'
import {pragasDoSoloQuestions} from './pragas-do-solo'
import {pragasQuestions} from './pragas'
import type {QuizQuestion} from './types'

export type QuizCategoryId = 'pragas' | 'plantas' | 'fitossanidade' | 'pragas-do-solo'
export type {QuizQuestion} from './types'

export const quizQuestionsByCategory: Record<QuizCategoryId, QuizQuestion[]> = {
    pragas: pragasQuestions,
    plantas: plantasQuestions,
    fitossanidade: fitossanidadeQuestions,
    'pragas-do-solo': pragasDoSoloQuestions,
}
