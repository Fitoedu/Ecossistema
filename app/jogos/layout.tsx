import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jogos',
  description: 'Aprenda sobre plantas medicinais e fitossanidade brincando com quiz, memória, bingo, caça-palavras, quebra-cabeça e simulador.',
}

export default function JogosLayout({ children }: { children: React.ReactNode }) {
  return children
}
