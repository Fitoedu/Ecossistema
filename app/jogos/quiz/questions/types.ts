export type QuizOption = {
    id: string
    text: string
}

export type QuizQuestion = {
    id: number
    text: string
    options: QuizOption[]
    correctId: string
}

export const question = (id: number, text: string, correctId: string, options: string[]): QuizQuestion => ({
    id,
    text,
    correctId,
    options: options.map((option, index) => ({id: String.fromCharCode(97 + index), text: option})),
})
