import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiz',
  description: 'Teste seus conhecimentos sobre plantas medicinais, pragas e fitossanidade com quizzes interativos.',
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children
}
