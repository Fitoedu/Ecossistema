export type Publicacao = {
  id: string
  source: string
  date: string
  title: string
  description: string
  image: string
  href: string
  category?: string
}

export type Video = {
  id: string
  href: string
}

export const publicacoes: Publicacao[] = [
  {
    id: 'g1-amapa',
    source: 'G1 Amapá',
    date: '15 de Outubro, 2024',
    title: 'Projeto EducaFito leva educação fitossanitária às comunidades rurais do Amapá',
    description:
      'Ação conjunta com pesquisadores locais visa fortalecer o manejo sustentável de plantas medicinais e a identificação de pragas agrícolas em regiões de difícil acesso.',
    image: '/assets/midia/g1-amapa.webp',
    href: '#',
    category: 'Reportagem',
  },
  {
    id: 'techagro-rural',
    source: 'TechAgro Rural',
    date: '02 de Setembro, 2024',
    title: 'Gamificação como ferramenta no combate às pragas: o caso EducaFito',
    description:
      'Como o novo aplicativo do EducaFito está transformando a forma como pequenos agricultores aprendem a proteger suas lavouras usando mecânicas de jogos educativos.',
    image: '/assets/midia/techagro-rural.webp',
    href: '#',
    category: 'Tecnologia',
  },
  {
    id: 'radio-universitaria',
    source: 'Rádio Universitária',
    date: '18 de Agosto, 2024',
    title: 'Entrevista: A importância da ciência cidadã na fitossanidade do Amapá',
    description:
      'Nossa equipe conversou com a rádio local sobre o impacto da participação popular no monitoramento de doenças vegetais e como o app FitoEdu democratiza o acesso ao conhecimento científico.',
    image: '/assets/midia/radio-universitaria.webp',
    href: '#',
    category: 'Entrevista',
  },
  {
    id: 'agencia-ap',
    source: 'Agência AP Notícias',
    date: '05 de Julho, 2024',
    title: 'UNIFAP e EducaFito firmam parceria para pesquisa em agroecologia sustentável',
    description:
      'A universidade federal do Amapá se une ao ecossistema EducaFito para ampliar a base de conhecimento sobre plantas medicinais nativas e desenvolver materiais didáticos interativos.',
    image: '/assets/midia/g1-amapa.webp',
    href: '#',
    category: 'Parceria',
  },
  {
    id: 'portal-amazonia',
    source: 'Portal Amazônia',
    date: '20 de Junho, 2024',
    title: 'Aplicativo amazônico ensina crianças a reconhecer plantas medicinais da floresta',
    description:
      'Com ilustrações e quizzes interativos, o FitoEdu se destaca como ferramenta lúdica e científica para escolas públicas da região amazônica, conectando saberes tradicionais e modernos.',
    image: '/assets/midia/techagro-rural.webp',
    href: '#',
    category: 'Educação',
  },
]

export const videos: Video[] = [
  { id: 'video-1', href: 'https://www.youtube.com/embed/u_wfgjzPFHU?si=-FmJxD2lZR6BTz-R' },
  { id: 'video-2', href: 'https://www.youtube.com/embed/5HbNqU54kFY?si=u9RMiS7DS7qli6Kf' },
  { id: 'video-3', href: 'https://www.youtube.com/embed/CIsDBpxREYQ?si=7LkKlg9ja13pf3l8' },
  { id: 'video-4', href: 'https://www.youtube.com/embed/dyoO432cvw4?si=Tn_1lAiV06pUqyqj' },
]