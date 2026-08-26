export type Stat = {
  value: string
  label: string
  suffix?: string
}

export type Technology = {
  name: string
  description: string
}

export type MissaoVision = {
  missao: {
    heading: string
    paragraph: string
  }
  visao: {
    heading: string
    paragraph: string
  }
  valores: string[]
}

export type SobreContent = {
  badge: string
  title: string
  description: string
  stats: Stat[]
  historia: {
    heading: string
    paragraphs: string[]
  }
  porqueDigital: {
    heading: string
    paragraph: string
    footerLabel: string
    vantagens: string[]
  }
  missaoVisao: MissaoVision
  technologies: Technology[]
}

export const sobreContent: SobreContent = {
  badge: 'Educação Digital na Amazônia',
  title: 'Transformando a Educação Fitossanitária no Amapá.',
  description:
    'O EducaFito nasceu da necessidade de conectar o conhecimento científico agronômico com a comunidade local de forma acessível, interativa e amigável, utilizando tecnologia como ponte para a preservação ambiental.',

  stats: [
    { value: '3', label: 'Módulos Interativos', suffix: '+' },
    { value: '12', label: 'Pragas Catalogadas', suffix: '+' },
    { value: '500', label: 'Acessos Realizados', suffix: '+' },
    { value: '100', label: 'Conteúdo Gratuito', suffix: '%' },
  ],

  historia: {
    heading: 'História do Projeto',
    paragraphs: [
      'Originado como um Trabalho de Conclusão de Curso (TCC), o EducaFito foi idealizado para suprir uma lacuna histórica na comunicação de riscos e práticas agronômicas na região Norte do Brasil, com foco especial no estado do Amapá.',
      'A barreira da linguagem técnica frequentemente afastava produtores rurais familiares, estudantes e a comunidade em geral do conhecimento vital sobre pragas e doenças vegetais. A criação da personagem "Dona Fito" e a digitalização do conteúdo através de cartilhas interativas marcaram o início de uma nova era na extensão rural digital.',
    ],
  },

  porqueDigital: {
    heading: 'Por que Digital?',
    paragraph:
      'A gamificação e o design focado no usuário (UX) transformam manuais complexos em experiências de aprendizado retentivas.',
    footerLabel: 'ABORDAGEM CIENTÍFICA',
    vantagens: [
      'Acesso offline via PWA em áreas remotas',
      'Linguagem simples e visual atrativo',
      'Conteúdo gamificado com quizzes interativos',
      'Atualizações contínuas e gratuitas',
    ],
  },

  missaoVisao: {
    missao: {
      heading: 'Nossa Missão',
      paragraph:
        'Democratizar o conhecimento fitossanitário na Amazônia por meio de tecnologia acessível, levando educação agrícola de qualidade a produtores rurais, estudantes e comunidades distantes dos centros urbanos.',
    },
    visao: {
      heading: 'Nossa Visão',
      paragraph:
        'Ser a principal referência digital em educação agronômica na região Norte do Brasil, contribuindo para a segurança alimentar e a sustentabilidade ambiental do Amapá e estados vizinhos.',
    },
    valores: [
      'Acessibilidade',
      'Ciência',
      'Inclusão',
      'Sustentabilidade',
      'Inovação',
    ],
  },

  technologies: [
    { name: 'Next.js', description: 'Framework React para web' },
    { name: 'PWA', description: 'Funciona offline' },
    { name: 'Chakra UI', description: 'Design System acessível' },
    { name: 'TypeScript', description: 'Tipagem estática' },
    { name: 'Vercel', description: 'Deploy em nuvem' },
    { name: 'Lucide Icons', description: 'Iconografia moderna' },
  ],
}