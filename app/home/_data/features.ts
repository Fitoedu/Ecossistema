import {
  Info,
  GraduationCap,
  BookOpen,
  Gamepad2,
  CalendarDays,
  Users,
  type LucideIcon,
} from 'lucide-react'

export type Feature = {
  icon: LucideIcon
  title: string
  desc: string
  href: string
  iconBg: string
  cardBg: string
  cardBorder: string
  dark?: boolean
}

export const features: Feature[] = [
  {
    icon: GraduationCap,
    title: 'Educação Fitossanitária',
    desc: 'Aprenda os conceitos básicos para proteger a natureza.',
    href: '/educacao',
    iconBg: 'primary.800',
    cardBg: 'neutral.100',
    cardBorder: 'neutral.200',
  },
  {
    icon: BookOpen,
    title: 'Cartilha Interativa',
    desc: 'Explore nosso material didático animado.',
    href: '/cartilha',
    iconBg: 'primary.700',
    cardBg: 'primary.200',
    cardBorder: 'primary.300',
  },
  {
    icon: Gamepad2,
    title: 'Jogos',
    desc: 'Aprender brincando é muito mais divertido!',
    href: '/jogos',
    iconBg: 'accent.600',
    cardBg: 'accent.100',
    cardBorder: 'accent.200',
  },
  {
    icon: CalendarDays,
    title: 'Na Mídia',
    desc: 'Notícias, vídeos e destaques do projeto.',
    href: '/midia',
    iconBg: 'tertiary.800',
    cardBg: 'tertiary.600',
    cardBorder: 'tertiary.700',
    dark: true,
  },
  {
    icon: Users,
    title: 'Equipe',
    desc: 'Conheça os profissionais por trás do EducaFito.',
    href: '/equipe',
    iconBg: 'neutral.600',
    cardBg: 'neutral.100',
    cardBorder: 'neutral.200',
  },
  {
    icon: Info,
    title: 'Sobre o Projeto',
    desc: 'Nossa missão e parceiros institucionais.',
    href: '/sobre',
    iconBg: 'neutral.500',
    cardBg: 'neutral.50',
    cardBorder: 'neutral.100',
  },
]