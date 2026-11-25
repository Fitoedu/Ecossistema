import type { IconType } from 'react-icons'
import { LuBrain, LuBug, LuMicroscope, LuPuzzle, LuTractor } from 'react-icons/lu'
import { PiCardsBold } from 'react-icons/pi'

export type Game = {
  id: string
  icon: IconType
  emoji: string
  title: string
  desc: string
  tag: string
  tagColor: string
  gradient: string
  iconBg: string
  accentColor: string
  href: string
  available: boolean
}

export const games: Game[] = [
  {
    id: 'quiz',
    icon: LuBrain,
    emoji: '🧠',
    title: 'Quiz Fitossanitário',
    desc: 'Teste seus conhecimentos sobre pragas, doenças e boas práticas fitossanitárias em perguntas de múltipla escolha.',
    tag: 'Conhecimento',
    tagColor: '#0f6b3d',
    gradient: 'linear-gradient(145deg, #e6f9ee 0%, #cff0df 100%)',
    iconBg: '#0f6b3d',
    accentColor: '#0f6b3d',
    href: '/jogos/quiz',
    available: true,
  },
  {
    id: 'memoria',
    icon: PiCardsBold,
    emoji: '🃏',
    title: 'Jogo da Memória',
    desc: 'Encontre os pares de pragas, doenças e sintomas virando as cartas com concentração.',
    tag: 'Memória',
    tagColor: '#7c3aed',
    gradient: 'linear-gradient(145deg, #f0ebff 0%, #e0d4fd 100%)',
    iconBg: '#7c3aed',
    accentColor: '#7c3aed',
    href: '/jogos/memoria',
    available: false,
  },
  {
    id: 'bingo',
    icon: LuBug,
    emoji: '🐞',
    title: 'Bingo dos Insetos',
    desc: 'Marque os insetos sorteados na sua cartela e seja o primeiro a completar uma linha!',
    tag: 'Sorte & Atenção',
    tagColor: '#c2410c',
    gradient: 'linear-gradient(145deg, #fff3e6 0%, #fde0c0 100%)',
    iconBg: '#ea580c',
    accentColor: '#ea580c',
    href: '/jogos/bingo',
    available: false,
  },
  {
    id: 'caca-palavras',
    icon: LuMicroscope,
    emoji: '🔬',
    title: 'Caça-Palavras dos Microrganismos',
    desc: 'Encontre os nomes de fungos, bactérias e vírus escondidos em um grid de letras antes do tempo acabar.',
    tag: 'Vocabulário',
    tagColor: '#0369a1',
    gradient: 'linear-gradient(145deg, #e6f4ff 0%, #c8e8fd 100%)',
    iconBg: '#0369a1',
    accentColor: '#0369a1',
    href: '/jogos/caca-palavras',
    available: false,
  },
  {
    id: 'quebra-cabeca',
    icon: LuPuzzle,
    emoji: '🧩',
    title: 'Quebra-Cabeça das Doenças',
    desc: 'Monte imagens de doenças em plantas peça por peça e aprenda a reconhecer cada sintoma.',
    tag: 'Raciocínio',
    tagColor: '#b45309',
    gradient: 'linear-gradient(145deg, #fffbeb 0%, #fef3c3 100%)',
    iconBg: '#d97706',
    accentColor: '#d97706',
    href: '/jogos/quebra-cabeca',
    available: false,
  },
  {
    id: 'simulador',
    icon: LuTractor,
    emoji: '🌱',
    title: 'Salve a Plantação',
    desc: 'Simule o manejo de uma plantação, combata pragas e doenças e descubra as melhores práticas agrícolas.',
    tag: 'Simulação',
    tagColor: '#166534',
    gradient: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)',
    iconBg: '#16a34a',
    accentColor: '#16a34a',
    href: '/jogos/simulador',
    available: false,
  },
]