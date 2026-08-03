export type Publicacao = {
  id: string
  source: string
  date: string
  title: string
  description: string
  image: string
  href: string
}

export type Video = {
  id: string
  title: string
  thumbnail: string
}

export const publicacoes: Publicacao[] = [
  {
    id: 'g1-amapa',
    source: 'G1 Amapá',
    date: '15 de Outubro, 2024',
    title: 'Projeto EducaFito leva educação fitossanitária...',
    description: 'Ação conjunta com pesquisadores locais visa...',
    image: '/imgs/midia/g1-amapa.jpg',
    href: '#',
  },
  {
    id: 'techagro-rural',
    source: 'TechAgro Rural',
    date: '02 de Setembro, 2024',
    title: 'Gamificação como ferramenta no combate...',
    description: 'Como o novo app do EducaFito está transformando a...',
    image: '/imgs/midia/techagro-rural.jpg',
    href: '#',
  },
  {
    id: 'radio-universitaria',
    source: 'Rádio Universitária',
    date: '18 de Agosto, 2024',
    title: 'Entrevista: A importância da ciência cidadã na...',
    description: 'Nossa equipe conversou com a rádio local sobre o impacto da...',
    image: '/imgs/midia/radio-universitaria.jpg',
    href: '#',
  },
]

export const videos: Video[] = [
  {
    id: 'video-1',
    title: 'Vídeo introdutório',
    thumbnail: '/imgs/midia/video-1-thumb.jpg',
  },
  {
    id: 'video-2',
    title: 'Demonstração do app',
    thumbnail: '/imgs/midia/video-2-thumb.jpg',
  },
]